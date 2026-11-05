import { css, html, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { icon } from '../core/icon-utils';
import { appSettings } from '../core/settingsservice';
import { DocksWidget } from './widget';

const DEFAULT_POSITION = { x: 100, y: 100 };
const MIN_WIDTH = 240;
const MIN_HEIGHT = 140;
const RESIZE_EDGES = ['n', 's', 'e', 'w', 'nw', 'se', 'sw'] as const;

export interface FloatingPanelGeometry {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface PanelPosition {
    x: number;
    y: number;
}

interface PanelSize {
    width: number;
    height: number;
}

interface FrameBox extends PanelPosition, PanelSize {}

interface ResizeStart extends FrameBox {
    pointerX: number;
    pointerY: number;
}

const RESIZE_CURSORS: Record<(typeof RESIZE_EDGES)[number], string> = {
    n: 'ns-resize',
    s: 'ns-resize',
    e: 'ew-resize',
    w: 'ew-resize',
    sw: 'nesw-resize',
    nw: 'nwse-resize',
    se: 'nwse-resize',
};

function isPanelPosition(value: unknown): value is PanelPosition {
    if (!value || typeof value !== 'object') return false;
    const position = value as PanelPosition;
    return typeof position.x === 'number' && typeof position.y === 'number';
}

function isPanelSize(value: unknown): value is PanelSize {
    if (!value || typeof value !== 'object') return false;
    const size = value as PanelSize;
    return Number.isFinite(size.width) && size.width > 0 && Number.isFinite(size.height) && size.height > 0;
}

function resizeFrame(start: FrameBox, edge: string, dx: number, dy: number, viewport: PanelSize): FrameBox {
    const right = start.x + start.width;
    const bottom = start.y + start.height;
    const minWidth = Math.min(MIN_WIDTH, viewport.width);
    const minHeight = Math.min(MIN_HEIGHT, viewport.height);
    let width = start.width;
    let height = start.height;

    if (edge.includes('e')) width = start.width + dx;
    if (edge.includes('w')) width = start.width - dx;
    if (edge.includes('s')) height = start.height + dy;
    if (edge.includes('n')) height = start.height - dy;

    width = Math.max(minWidth, width);
    height = Math.max(minHeight, height);

    let x = edge.includes('w') ? right - width : start.x;
    let y = edge.includes('n') ? bottom - height : start.y;

    if (x < 0) {
        width += x;
        x = 0;
    }
    if (y < 0) {
        height += y;
        y = 0;
    }
    if (x + width > viewport.width) {
        if (edge.includes('w')) x = Math.max(0, viewport.width - width);
        else width = viewport.width - x;
    }
    if (y + height > viewport.height) {
        if (edge.includes('n')) y = Math.max(0, viewport.height - height);
        else height = viewport.height - y;
    }

    return {
        x: Math.round(x),
        y: Math.round(y),
        width: Math.round(Math.max(minWidth, width)),
        height: Math.round(Math.max(minHeight, height)),
    };
}

/**
 * Frame for a window over the editor. Callers fill the default slot and decide
 * when the element is created and removed. The panel does not remove itself.
 */
@customElement('docks-floating-panel')
export class DocksFloatingPanel extends DocksWidget {
    @property({ type: String })
    label = '';

    /** Icon spec shown beside the title, for example `folder` or `docks mark-github`. */
    @property({ type: String })
    icon?: string;

    @property({ type: Boolean })
    minimized = false;

    /** Dialog-settings key for position and size. Unset geometry stays on the element. */
    @property({ type: String })
    persistKey?: string;

    @state()
    private positionX = DEFAULT_POSITION.x;

    @state()
    private positionY = DEFAULT_POSITION.y;

    @state()
    private frameWidth: number | null = null;

    @state()
    private frameHeight: number | null = null;

    @state()
    private previewPosition: PanelPosition | null = null;

    private dragging = false;
    private dragOffsetX = 0;
    private dragOffsetY = 0;
    private resizing = false;
    private resizeEdge = '';
    private resizeStart: ResizeStart | null = null;
    private positionEpoch = 0;
    private positionOwned = false;
    private appliedPersistKey = '';
    private loadingKey: string | null = null;

    protected override doBeforeUI(): void {
        document.addEventListener('mousemove', this.onPointerMove);
        document.addEventListener('mouseup', this.onPointerUp);
        void this.loadPosition();
    }

    protected override doInitUI(): void {
        this.reclamp();
    }

    protected override doClose(): void {
        document.removeEventListener('mousemove', this.onPointerMove);
        document.removeEventListener('mouseup', this.onPointerUp);
        this.dragging = false;
        this.previewPosition = null;
        this.resizing = false;
        this.resizeStart = null;
        document.body.style.cursor = '';
    }

    protected override updated(changed: PropertyValues): void {
        super.updated(changed);
        if (changed.has('persistKey')) {
            void this.loadPosition();
        }
    }

    /** Move the panel. Coordinates are clamped to the viewport. */
    place(x: number, y: number): void {
        this.positionEpoch++;
        this.positionOwned = true;
        this.setPosition(x, y);
        void this.persistGeometry();
    }

    /** Set the frame size in pixels. The panel keeps the slot inside that box. */
    size(width: number, height: number): void {
        const next = resizeFrame(
            { x: this.positionX, y: this.positionY, width, height },
            'se',
            0,
            0,
            { width: window.innerWidth, height: window.innerHeight },
        );
        this.frameWidth = next.width;
        this.frameHeight = next.height;
        this.positionX = next.x;
        this.positionY = next.y;
    }

    /** Position and size last applied to the frame. */
    geometry(): FloatingPanelGeometry {
        const frame = this.frameElement();
        return {
            x: this.positionX,
            y: this.positionY,
            width: this.frameWidth ?? frame?.offsetWidth ?? 0,
            height: this.frameHeight ?? frame?.offsetHeight ?? 0,
        };
    }

    private async loadPosition(): Promise<void> {
        const key = this.persistKey?.trim() ?? '';
        if (!key || key === this.appliedPersistKey || key === this.loadingKey) return;

        this.loadingKey = key;
        const epoch = this.positionEpoch;
        try {
            const settings = await appSettings.getDialogSetting(key);
            if (this.persistKey?.trim() !== key) return;
            this.appliedPersistKey = key;
            if (epoch !== this.positionEpoch) return;
            const position = settings?.position;
            if (isPanelPosition(position)) this.setPosition(position.x, position.y);
            const size = settings?.size;
            if (isPanelSize(size) && this.frameWidth == null && this.frameHeight == null) {
                this.frameWidth = size.width;
                this.frameHeight = size.height;
            }
        } finally {
            if (this.loadingKey === key) this.loadingKey = null;
        }
    }

    private async persistGeometry(): Promise<void> {
        const key = this.persistKey?.trim();
        if (!key) return;

        const current = await appSettings.getDialogSetting(key);
        const base = current !== null && typeof current === 'object' ? current : {};
        const next: Record<string, unknown> = {
            ...base,
            position: { x: this.positionX, y: this.positionY },
        };
        if (this.frameWidth != null && this.frameHeight != null) {
            next.size = { width: this.frameWidth, height: this.frameHeight };
        }
        await appSettings.setDialogSetting(key, next);
    }

    private setPosition(x: number, y: number): void {
        const next = this.clamp(x, y);
        this.positionX = next.x;
        this.positionY = next.y;
    }

    private reclamp(): void {
        const next = this.clamp(this.positionX, this.positionY);
        if (next.x === this.positionX && next.y === this.positionY) return;
        this.positionX = next.x;
        this.positionY = next.y;
        if (!this.positionOwned) return;
        void this.persistGeometry();
    }

    private frameElement(): HTMLElement | null {
        const frame = this.shadowRoot?.querySelector('.panel');
        return frame instanceof HTMLElement ? frame : null;
    }

    private clamp(x: number, y: number): PanelPosition {
        const frame = this.frameElement();
        const width = frame?.offsetWidth ?? 0;
        const height = frame?.offsetHeight ?? 0;
        const maxX = Math.max(0, window.innerWidth - width);
        const maxY = Math.max(0, window.innerHeight - height);
        return {
            x: Math.min(Math.max(0, x), maxX),
            y: Math.min(Math.max(0, y), maxY),
        };
    }

    private raiseHost(): void {
        const parent = this.parentNode;
        if (!parent) return;
        if (parent.lastChild !== this) {
            parent.appendChild(this);
        }
        if (!(parent instanceof ShadowRoot)) return;

        const wrapper = parent.host;
        const wrapperParent = wrapper.parentNode;
        if (!wrapperParent || wrapperParent.lastChild === wrapper) return;
        wrapperParent.appendChild(wrapper);
    }

    private eventFromHeaderActions(event: Event): boolean {
        return event.composedPath().some((node) =>
            node instanceof Element && node.classList.contains('header-actions')
        );
    }

    private onHeaderPointerDown = (event: MouseEvent): void => {
        if (event.button !== 0) return;
        this.raiseHost();
        if (this.eventFromHeaderActions(event)) return;

        const frame = this.frameElement();
        if (!frame) return;

        const rect = frame.getBoundingClientRect();
        this.dragOffsetX = event.clientX - rect.left;
        this.dragOffsetY = event.clientY - rect.top;
        this.positionEpoch++;
        this.dragging = true;
        this.previewPosition = { x: this.positionX, y: this.positionY };
        event.preventDefault();
    };

    private onResizePointerDown = (event: MouseEvent): void => {
        if (event.button !== 0 || this.minimized) return;
        const handle = event.currentTarget;
        if (!(handle instanceof HTMLElement)) return;
        const edge = handle.dataset.edge ?? '';
        if (!RESIZE_CURSORS[edge as keyof typeof RESIZE_CURSORS]) return;

        const frame = this.frameElement();
        if (!frame) return;
        const width = this.frameWidth ?? frame.offsetWidth;
        const height = this.frameHeight ?? frame.offsetHeight;
        if (width <= 0 || height <= 0) return;

        event.preventDefault();
        event.stopPropagation();
        this.raiseHost();
        this.resizing = true;
        this.resizeEdge = edge;
        this.resizeStart = {
            x: this.positionX,
            y: this.positionY,
            width,
            height,
            pointerX: event.clientX,
            pointerY: event.clientY,
        };
        document.body.style.cursor = RESIZE_CURSORS[edge as keyof typeof RESIZE_CURSORS];
    };

    private updateResize(clientX: number, clientY: number): void {
        const start = this.resizeStart;
        if (!start) return;
        const next = resizeFrame(
            start,
            this.resizeEdge,
            clientX - start.pointerX,
            clientY - start.pointerY,
            { width: window.innerWidth, height: window.innerHeight },
        );
        if (
            next.x === this.positionX
            && next.y === this.positionY
            && next.width === this.frameWidth
            && next.height === this.frameHeight
        ) return;
        this.positionX = next.x;
        this.positionY = next.y;
        this.frameWidth = next.width;
        this.frameHeight = next.height;
    }

    private onPointerMove = (event: MouseEvent): void => {
        if (this.resizing) {
            this.updateResize(event.clientX, event.clientY);
            return;
        }
        if (!this.dragging) return;
        const next = this.clamp(event.clientX - this.dragOffsetX, event.clientY - this.dragOffsetY);
        if (this.previewPosition?.x === next.x && this.previewPosition?.y === next.y) return;
        this.previewPosition = next;
    };

    private onPointerUp = (): void => {
        if (this.resizing) {
            this.resizing = false;
            this.resizeStart = null;
            document.body.style.cursor = '';
            this.positionEpoch++;
            this.positionOwned = true;
            void this.persistGeometry();
            return;
        }
        if (!this.dragging || !this.previewPosition) return;
        const preview = this.previewPosition;
        this.dragging = false;
        this.previewPosition = null;
        this.positionEpoch++;
        this.positionOwned = true;
        this.setPosition(preview.x, preview.y);
        void this.persistGeometry();
    };

    private toggleMinimized = (): void => {
        this.minimized = !this.minimized;
    };

    private requestClose = (): void => {
        this.dispatchEvent(new CustomEvent('floating-close', { bubbles: true, composed: true }));
    };

    render() {
        const frame = this.frameElement();
        const preview = this.previewPosition;
        const minimizeLabel = this.minimized ? 'Expand' : 'Minimize';

        return html`
            ${preview ? html`
                <div
                    class="drag-preview"
                    style=${styleMap({
                        left: `${preview.x}px`,
                        top: `${preview.y}px`,
                        width: `${frame?.offsetWidth ?? 0}px`,
                        height: `${frame?.offsetHeight ?? 0}px`,
                    })}
                ></div>
            ` : nothing}
            <div
                class="panel ${this.minimized ? 'minimized' : ''} ${this.frameWidth != null ? 'sized' : ''} ${preview ? 'dragging' : ''}"
                style=${styleMap({
                    left: `${this.positionX}px`,
                    top: `${this.positionY}px`,
                    width: this.frameWidth == null ? undefined : `${this.frameWidth}px`,
                    height: this.minimized || this.frameHeight == null ? undefined : `${this.frameHeight}px`,
                })}
            >
                <div class="panel-header" @mousedown=${this.onHeaderPointerDown}>
                    <div class="header-title">${this.icon ? icon(this.icon, { label: this.label }) : nothing}<span>${this.label}</span></div>
                    <div class="header-actions">
                        <wa-button
                            size="xs"
                            appearance="plain"
                            title=${minimizeLabel}
                            aria-label=${minimizeLabel}
                            @click=${this.toggleMinimized}
                        >
                            <wa-icon name=${this.minimized ? 'chevron-up' : 'chevron-down'}></wa-icon>
                        </wa-button>
                        <wa-button
                            size="xs"
                            appearance="plain"
                            title="Close"
                            aria-label="Close"
                            @click=${this.requestClose}
                        >
                            <wa-icon name="xmark"></wa-icon>
                        </wa-button>
                    </div>
                </div>
                <div class="panel-body" ?hidden=${this.minimized}>
                    <slot></slot>
                </div>
                ${this.minimized ? nothing : RESIZE_EDGES.map((edge) => html`
                    <div
                        class="resize-handle ${edge}"
                        data-edge=${edge}
                        role="separator"
                        aria-label="Resize"
                        @mousedown=${this.onResizePointerDown}
                    ></div>
                `)}
            </div>
        `;
    }

    static styles = css`
        :host {
            display: block;
            position: fixed;
            z-index: 10000;
            pointer-events: none;
        }

        .drag-preview {
            position: fixed;
            border: 3px dashed var(--wa-color-primary-50, #0066cc);
            background: var(--wa-color-primary-05, rgba(0, 102, 204, 0.05));
            border-radius: var(--wa-border-radius-medium, 8px);
            z-index: 10001;
            pointer-events: none;
            opacity: 0.8;
            box-sizing: border-box;
        }

        :host-context(.wa-light) .drag-preview {
            background: var(--wa-color-primary-95);
            border-color: var(--wa-color-primary-50);
        }

        .panel {
            --panel-header-size: 1.5rem;
            position: fixed;
            width: max-content;
            max-width: 100vw;
            box-sizing: border-box;
            background: var(--wa-color-surface-raised, var(--wa-color-neutral-05));
            border: var(--wa-border-width-s, 1px) solid var(--wa-color-neutral-border-loud, var(--wa-color-neutral-25));
            border-radius: var(--wa-border-radius-medium, 8px);
            box-shadow: var(--wa-shadow-large, 0 8px 24px rgba(0, 0, 0, 0.8));
            pointer-events: all;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        :host-context(.wa-light) .panel {
            background: var(--wa-color-surface-raised, var(--wa-color-neutral-95));
            border-color: var(--wa-color-neutral-border-loud, var(--wa-color-neutral-75));
            box-shadow: var(--wa-shadow-large, 0 8px 24px rgba(0, 0, 0, 0.2));
        }

        .panel.dragging {
            opacity: 0.5;
        }

        .panel-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0;
            margin: 0;
            padding: 0;
            background: var(--wa-color-surface-lowered, var(--wa-color-neutral-10));
            border-bottom: var(--wa-border-width-s, 1px) solid var(--wa-color-neutral-border-loud, var(--wa-color-neutral-25));
            cursor: move;
            user-select: none;
            font-size: var(--wa-font-size-s, 0.875rem);
            line-height: 1.2;
        }

        :host-context(.wa-light) .panel-header {
            background: var(--wa-color-surface-lowered, var(--wa-color-neutral-90));
            border-bottom-color: var(--wa-color-neutral-border-loud, var(--wa-color-neutral-75));
        }

        .header-title {
            display: flex;
            align-items: center;
            gap: 0.35rem;
            flex: 1 1 auto;
            min-width: 0;
            margin: 0;
            padding: 0 0.4rem;
            font-weight: 600;
            color: var(--wa-color-text-normal, var(--wa-color-neutral-90));
        }

        .header-title span {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .header-title wa-icon {
            flex: none;
        }

        :host-context(.wa-light) .header-title {
            color: var(--wa-color-text-normal, var(--wa-color-neutral-10));
        }

        .header-actions {
            display: flex;
            gap: 0;
            margin: 0;
            padding: 0;
            cursor: default;
        }

        .header-actions wa-button {
            --wa-form-control-height: var(--panel-header-size);
            --wa-form-control-padding-inline: 0.25rem;
        }

        .panel.sized .panel-body {
            flex: 1 1 auto;
            min-height: 0;
            min-width: 0;
            overflow: auto;
            display: flex;
            flex-direction: column;
        }

        .panel.sized ::slotted(*) {
            flex: 1 1 auto;
            min-width: 0;
            min-height: 0;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
        }

        .panel-body[hidden] {
            display: none;
        }

        .resize-handle {
            position: absolute;
            z-index: 2;
            touch-action: none;
        }

        .resize-handle.n,
        .resize-handle.s {
            left: 12px;
            height: 6px;
        }

        .resize-handle.n {
            top: 0;
            right: calc(var(--panel-header-size) * 2);
            cursor: ns-resize;
        }
        .resize-handle.s { right: 12px; bottom: 0; cursor: ns-resize; }

        .resize-handle.e,
        .resize-handle.w {
            bottom: 12px;
            width: 6px;
        }

        .resize-handle.e { top: var(--panel-header-size); right: 0; cursor: ew-resize; }
        .resize-handle.w { top: 12px; left: 0; cursor: ew-resize; }

        .resize-handle.nw,
        .resize-handle.se,
        .resize-handle.sw {
            width: 14px;
            height: 14px;
        }

        .resize-handle.nw { top: 0; left: 0; cursor: nwse-resize; }
        .resize-handle.se { right: 0; bottom: 0; cursor: nwse-resize; }
        .resize-handle.sw { left: 0; bottom: 0; cursor: nesw-resize; }

        .resize-handle.se::after {
            content: '';
            position: absolute;
            right: 3px;
            bottom: 3px;
            width: 7px;
            height: 7px;
            border-right: 2px solid var(--wa-color-neutral-border-loud, var(--wa-color-neutral-40));
            border-bottom: 2px solid var(--wa-color-neutral-border-loud, var(--wa-color-neutral-40));
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'docks-floating-panel': DocksFloatingPanel;
    }
}
