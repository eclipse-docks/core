/**
 * DocksResizableGrid - A simple resizable grid layout component
 * 
 * Uses CSS Grid with explicit column/row templates and manual resize handles.
 * Much simpler and more predictable than flex-based layouts.
 * 
 * Features:
 * - Horizontal or vertical orientation
 * - Custom size distribution via 'sizes' attribute
 * - Interactive resize handles between children
 * - Min size constraints (5% of container)
 * 
 * Example usage:
 * <docks-resizable-grid orientation="horizontal" sizes="20%, 60%, 20%">
 *   <div>Left</div>
 *   <div>Center</div>
 *   <div>Right</div>
 * </docks-resizable-grid>
 */
import {customElement, property, state} from "lit/decorators.js";
import {html, nothing} from "lit";
import {DocksElement} from "./element";

@customElement('docks-resizable-grid')
export class DocksResizableGrid extends DocksElement {
    private static readonly HANDLE_VISUAL_SIZE_PX = 1;
    private static readonly HANDLE_HITBOX_PADDING_PX = 4;

    @property()
    orientation: 'horizontal' | 'vertical' = 'horizontal';

    @property()
    sizes?: string; // e.g., "20%, 60%, 20%"

    @state()
    private gridSizes: string[] = [];

    @state()
    private gridChildren: HTMLElement[] = [];

    private resizing: {
        handleIndex: number;
        startPos: number;
        startSizes: number[];
        currentSizes?: number[];
    } | null = null;
    
    private resizeOverlay: HTMLDivElement | null = null;
    private childStylesApplied = false;
    private mutationObserver?: MutationObserver;
    private refreshScheduled = false;
    private layoutGeneration = 0;

    createRenderRoot() {
        // intentionally disabling shadow DOM for the resizable grid
        return this;
    }

    // ============= Lifecycle Methods =============

    protected doBeforeUI() {
        this.mutationObserver = new MutationObserver(() => {
            this.scheduleRefreshGridLayout();
        });
        this.mutationObserver.observe(this, { childList: true, subtree: false });
        this.scheduleRefreshGridLayout();
    }

    private scheduleRefreshGridLayout() {
        if (this.refreshScheduled) {
            return;
        }
        this.refreshScheduled = true;
        queueMicrotask(() => {
            this.refreshScheduled = false;
            void this.refreshGridLayout();
        });
    }

    private getGridChildrenFromDom(): HTMLElement[] {
        return Array.from(this.children).filter(
            (child) =>
                child.tagName !== 'STYLE' &&
                child.tagName !== 'SCRIPT' &&
                !child.classList.contains('resize-handle'),
        ) as HTMLElement[];
    }

    private static isNestedResizableGrid(child: HTMLElement): boolean {
        return child.tagName.toLowerCase() === 'docks-resizable-grid';
    }

    private applyChildLayoutStyles(): void {
        this.gridChildren.forEach((child, index) => {
            child.style.overflow = 'hidden';
            child.style.height = '100%';
            child.style.width = '100%';
            child.style.gridColumn = this.orientation === 'horizontal' ? `${index * 2 + 1}` : '1';
            child.style.gridRow = this.orientation === 'vertical' ? `${index * 2 + 1}` : '1';
            if (!DocksResizableGrid.isNestedResizableGrid(child)) {
                child.style.display = 'flex';
                child.style.flexDirection = 'column';
            }
        });
    }

    private resolveGridSizes(childCount: number): string[] {
        const parsedSizes = this.sizes?.split(',').map((s) => s.trim()).filter(Boolean) ?? [];
        if (parsedSizes.length === childCount) {
            return parsedSizes;
        }
        const equalSize = `${100 / childCount}%`;
        return Array.from({ length: childCount }, () => equalSize);
    }

    private resolvePersistedSizes(persisted: unknown, childCount: number): string[] | null {
        if (!persisted || typeof persisted !== 'object') {
            return null;
        }

        const record = persisted as {
            sizes?: unknown;
            sizesByCount?: Record<string, unknown>;
        };
        const byCount = record.sizesByCount?.[String(childCount)];
        if (Array.isArray(byCount) && byCount.length === childCount && byCount.every((size) => typeof size === 'string')) {
            return byCount;
        }

        if (Array.isArray(record.sizes) && record.sizes.length === childCount && record.sizes.every((size) => typeof size === 'string')) {
            return record.sizes;
        }

        return null;
    }

    private async refreshGridLayout() {
        const generation = ++this.layoutGeneration;
        const potentialChildren = this.getGridChildrenFromDom();
        if (potentialChildren.length === 0) {
            this.gridChildren = [];
            this.gridSizes = [];
            this.childStylesApplied = false;
            this.requestUpdate();
            return;
        }

        const countChanged = potentialChildren.length !== this.gridChildren.length;
        const identityChanged = countChanged
            || potentialChildren.some((child, index) => child !== this.gridChildren[index]);
        this.gridChildren = potentialChildren;

        const persisted = await this.getDialogSetting();
        if (generation !== this.layoutGeneration) {
            return;
        }

        const restoredSizes = this.resolvePersistedSizes(persisted, this.gridChildren.length);
        if (restoredSizes) {
            const sizesChanged = restoredSizes.join('|') !== this.gridSizes.join('|');
            this.gridSizes = restoredSizes;
            if (identityChanged || sizesChanged) {
                this.childStylesApplied = false;
            }
            this.requestUpdate();
            return;
        }

        const nextSizes = this.resolveGridSizes(this.gridChildren.length);
        const sizesChanged = nextSizes.join('|') !== this.gridSizes.join('|');
        this.gridSizes = nextSizes;

        if (identityChanged || sizesChanged) {
            this.childStylesApplied = false;
        }
        this.requestUpdate();
    }

    protected doInitUI() {
        this.scheduleRefreshGridLayout();
    }

    private async saveSizes() {
        if (this.gridSizes.length === 0) {
            return;
        }

        const persisted = await this.getDialogSetting();
        const existingByCount = persisted && typeof persisted === 'object'
            ? (persisted as { sizesByCount?: Record<string, string[]> }).sizesByCount ?? {}
            : {};

        await this.setDialogSetting({
            sizes: this.gridSizes,
            sizesByCount: {
                ...existingByCount,
                [String(this.gridSizes.length)]: this.gridSizes,
            },
            orientation: this.orientation,
        });
    }

    updated(changedProperties: Map<string, any>) {
        super.updated(changedProperties);

        if (changedProperties.has('sizes')) {
            this.scheduleRefreshGridLayout();
        }

        // Only apply child styles once when children are first loaded
        // This prevents interfering with nested resizable grids during resize operations
        if (!this.childStylesApplied && this.gridChildren.length > 0) {
            this.childStylesApplied = true;

            /**
             * Direct style manipulation is intentionally used here.
             *
             * Reasoning:
             * - Grid positioning (gridColumn/gridRow) must be computed dynamically based on
             *   the number of children and orientation at runtime
             * - Shadow DOM is disabled (see createRenderRoot), so we cannot use ::slotted()
             *   or scoped CSS selectors to style children
             * - CSS classes alone cannot express the dynamic grid positioning logic
             *   (e.g., child at index 0 → column 1, index 1 → column 3, etc.)
             * - This is a layout container whose primary job is to programmatically position
             *   its children within a CSS grid system
             * - Nested resizable grids manage their own display mode and must not receive flex
             */
            this.applyChildLayoutStyles();
        }
    }

    // ============= Resize Handling Methods =============

    private startResize(e: MouseEvent, handleIndex: number) {
        e.preventDefault();
        
        if (handleIndex >= this.gridChildren.length - 1) return;

        const startPos = this.orientation === 'horizontal' ? e.clientX : e.clientY;
        
        // Convert all sizes to pixels at the start of resize
        const containerSize = this.orientation === 'horizontal' 
            ? this.offsetWidth 
            : this.offsetHeight;
        
        const startSizes = this.gridSizes.map(size => {
            if (size.endsWith('%')) {
                return (parseFloat(size) / 100) * containerSize;
            } else if (size.endsWith('px')) {
                return parseFloat(size);
            } else {
                return parseFloat(size);
            }
        });

        this.resizing = {
            handleIndex,
            startPos,
            startSizes
        };

        // Create overlay to prevent iframes from capturing mouse events
        this.resizeOverlay = document.createElement('div');
        this.resizeOverlay.style.position = 'fixed';
        this.resizeOverlay.style.top = '0';
        this.resizeOverlay.style.left = '0';
        this.resizeOverlay.style.width = '100%';
        this.resizeOverlay.style.height = '100%';
        this.resizeOverlay.style.zIndex = '9999';
        this.resizeOverlay.style.cursor = this.orientation === 'horizontal' ? 'col-resize' : 'row-resize';
        document.body.appendChild(this.resizeOverlay);

        document.addEventListener('mousemove', this.handleResize);
        document.addEventListener('mouseup', this.stopResize);
        
        document.body.style.cursor = this.orientation === 'horizontal' ? 'col-resize' : 'row-resize';
        document.body.style.userSelect = 'none';
    }

    private handleResize = (e: MouseEvent) => {
        if (!this.resizing) return;

        const currentPos = this.orientation === 'horizontal' ? e.clientX : e.clientY;
        const delta = currentPos - this.resizing.startPos;

        const newSizes = [...this.resizing.startSizes];
        newSizes[this.resizing.handleIndex] += delta;
        newSizes[this.resizing.handleIndex + 1] -= delta;

        // Apply min constraints (5% of container)
        const containerSize = this.orientation === 'horizontal' 
            ? this.offsetWidth 
            : this.offsetHeight;
        const minSize = containerSize * 0.05;

        if (newSizes[this.resizing.handleIndex] >= minSize && 
            newSizes[this.resizing.handleIndex + 1] >= minSize) {
            this.resizing.currentSizes = newSizes;
            
            // Update visual preview directly without triggering requestUpdate()
            const gridTemplate = newSizes.map((size, index) => {
                const percent = (size / containerSize) * 100;
                const sizeStr = `${percent.toFixed(2)}%`;
                if (index === newSizes.length - 1) {
                    return sizeStr;
                }
                return `${sizeStr} ${DocksResizableGrid.HANDLE_VISUAL_SIZE_PX}px`;
            }).join(' ');
            
            if (this.orientation === 'horizontal') {
                this.style.gridTemplateColumns = gridTemplate;
            } else {
                this.style.gridTemplateRows = gridTemplate;
            }
        }
    }

    private stopResize = async () => {
        if (this.resizing?.currentSizes) {
            const containerSize = this.orientation === 'horizontal' 
                ? this.offsetWidth 
                : this.offsetHeight;
            
            this.gridSizes = this.resizing.currentSizes.map(size => {
                const percent = (size / containerSize) * 100;
                return `${percent.toFixed(2)}%`;
            });
            
            await this.saveSizes();
            this.requestUpdate();
        }
        
        // Remove overlay
        if (this.resizeOverlay) {
            document.body.removeChild(this.resizeOverlay);
            this.resizeOverlay = null;
        }
        
        this.resizing = null;
        document.removeEventListener('mousemove', this.handleResize);
        document.removeEventListener('mouseup', this.stopResize);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    }

    // ============= Render Methods =============

    render() {
        if (this.gridChildren.length === 0 || this.gridSizes.length === 0) {
            // Show children with default styling while grid is initializing
            return nothing;
        }

        // Build grid template with resize handles
        // For 3 children: "size1 4px size2 4px size3"
        const gridTemplate = this.gridSizes.flatMap((size, index) => {
            if (index === this.gridSizes.length - 1) {
                return [size];
            }
            return [size, `${DocksResizableGrid.HANDLE_VISUAL_SIZE_PX}px`];
        }).join(' ');

        // Apply grid layout to the custom element itself
        this.style.display = 'grid';
        if (this.orientation === 'horizontal') {
            this.style.gridTemplateColumns = gridTemplate;
            this.style.gridTemplateRows = '100%';
        } else {
            this.style.gridTemplateColumns = '100%';
            this.style.gridTemplateRows = gridTemplate;
        }
        this.style.overflow = 'hidden';

        // Render resize handles
        // Child styling is applied in updated() when gridChildren/gridSizes change
        return html`
            <style>
                .resize-handle {
                    position: relative;
                    z-index: 10;
                    background-color: var(--wa-color-neutral-border-quiet);
                    transition: background-color var(--wa-transition-fast);
                }

                .resize-handle::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                }

                .resize-handle.horizontal::before {
                    right: -${DocksResizableGrid.HANDLE_HITBOX_PADDING_PX}px;
                    left: -${DocksResizableGrid.HANDLE_HITBOX_PADDING_PX}px;
                }

                .resize-handle.vertical::before {
                    top: -${DocksResizableGrid.HANDLE_HITBOX_PADDING_PX}px;
                    bottom: -${DocksResizableGrid.HANDLE_HITBOX_PADDING_PX}px;
                }
                
                .resize-handle:hover {
                    background-color: var(--wa-color-brand-fill-normal);
                }
            </style>
            
            ${this.gridChildren.map((_, index) => {
                if (index < this.gridChildren.length - 1) {
                    const gridCol = this.orientation === 'horizontal' ? `${index * 2 + 2}` : '1';
                    const gridRow = this.orientation === 'vertical' ? `${index * 2 + 2}` : '1';
                    return html`
                        <div 
                            class="resize-handle ${this.orientation === 'horizontal' ? 'horizontal' : 'vertical'}"
                            style="
                                cursor: ${this.orientation === 'horizontal' ? 'col-resize' : 'row-resize'};
                                grid-column: ${gridCol};
                                grid-row: ${gridRow};
                            "
                            @mousedown=${(e: MouseEvent) => this.startResize(e, index)}
                        ></div>
                    `;
                }
                return nothing;
            })}
        `;
    }

    // ============= Cleanup Methods =============

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.resizing) {
            this.stopResize();
        }
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
            this.mutationObserver = undefined;
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.style.height = '100%';
        this.style.width = '100%';
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'docks-resizable-grid': DocksResizableGrid
    }
}

