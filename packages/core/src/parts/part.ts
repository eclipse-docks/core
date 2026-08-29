import { DocksContainer } from "./container";
import { property } from "lit/decorators.js";
import { css, CSSResultGroup, html, PropertyValues, TemplateResult, nothing } from "lit";
import { partDirtySignal, activePartSignal, activeEditorSignal } from "../core/appstate";
import { CommandStack } from "../core/commandregistry";
import { TabContribution } from "../core/contributionregistry";
import type { DocksTabs } from "./tabs";
import { ifDefined } from "lit/directives/if-defined.js";
import { DocksContextMenu } from "./contextmenu";

export abstract class DocksPart extends DocksContainer {
    /** `scroller`: wrap content in wa-scroller; `native`: overflow on part-content; `none`: no outer scroll (child manages scroll). */
    protected scrollMode: 'scroller' | 'native' | 'none' = 'scroller';

    @property()
    private dirty: boolean = false

    @property({ attribute: false })
    public tabContribution?: TabContribution;
    
    @property({ type: Boolean, attribute: false })
    public isEditor: boolean = false;

    /** Compact layout for dialog/tab embedding (no fill-height shell or nested scroll). */
    @property({ type: Boolean, reflect: true })
    embedded = false;

    protected commandStack?: CommandStack;

    public getCommandStack(): CommandStack | undefined {
        return this.commandStack;
    }

    /**
     * Override this method to provide toolbar content for this part.
     * This is a lightweight alternative to registering toolbar contributions
     * for actions that are scoped to this part instance.
     * 
     * IMPORTANT: Event handlers MUST use arrow functions to preserve the component's 'this' context.
     * The toolbar template is rendered in a different component (docks-toolbar), so direct method 
     * references lose their binding.
     * 
     * ✅ Correct:
     *   @click=${() => this.myMethod()}
     *   @click=${(e) => this.handleClick(e)}
     * 
     * ❌ Wrong (this will be bound to the toolbar, not your component):
     *   @click=${this.myMethod}
     * 
     * Example:
     * ```typescript
     * protected renderToolbar() {
     *     return html`
     *         <wa-button @click=${() => this.save()} title="Save">
     *             <wa-icon name="save"></wa-icon>
     *         </wa-button>
     *     `;
     * }
     * ```
     * 
     * @returns TemplateResult with toolbar items, or nothing if no toolbar needed
     */
    protected renderToolbar(): TemplateResult | typeof nothing {
        return nothing;
    }

    /**
     * Activates the tab that contains this part by walking up the DOM to the first
     * docks-tabs ancestor and activating the tab panel that contains this part.
     * Crosses Shadow DOM boundaries (e.g. wa-tab-group) via getRootNode().host.
     * No-op if this part is not inside a docks-tabs / wa-tab-panel.
     */
    protected activateContainingTab(): void {
        let el: Element | null = this;
        let panelName: string | null = null;
        let tabsEl: Element | null = null;
        while (el) {
            const tag = el.tagName?.toLowerCase();
            if (tag === 'wa-tab-panel') {
                panelName = el.getAttribute('name');
            }
            if (tag === 'docks-tabs') {
                tabsEl = el;
                break;
            }
            const parent: Element | null = el.parentElement;
            if (parent) {
                el = parent;
            } else {
                const root = el.getRootNode();
                el = root instanceof ShadowRoot ? (root.host as Element) : null;
            }
        }
        if (tabsEl && panelName != null && panelName !== '') {
            (tabsEl as DocksTabs).activate(panelName);
        }
    }

    /**
     * Override this method to provide context menu content for this part.
     * This is a lightweight alternative to registering context menu contributions
     * for actions that are scoped to this part instance.
     * 
     * IMPORTANT: Event handlers MUST use arrow functions to preserve the component's 'this' context.
     * The context menu is rendered in a different component (contextmenu), so direct method 
     * references lose their binding.
     * 
     * ✅ Correct:
     *   @click=${() => this.myMethod()}
     *   @click=${(e) => this.handleClick(e)}
     * 
     * ❌ Wrong (this will be bound to the context menu, not your component):
     *   @click=${this.myMethod}
     * 
     * Example:
     * ```typescript
     * protected renderContextMenu() {
     *     return html`
     *         <wa-dropdown-item @click=${() => this.open()}>
     *             <wa-icon name="folder-open"></wa-icon>
     *             Open
     *         </wa-dropdown-item>
     *         <wa-divider></wa-divider>
     *         <wa-dropdown-item @click=${() => this.delete()}>
     *             <wa-icon name="trash"></wa-icon>
     *             Delete
     *         </wa-dropdown-item>
     *     `;
     * }
     * ```
     * 
     * @returns TemplateResult with context menu items, or nothing if no context menu needed
     */
    protected renderContextMenu(): TemplateResult | typeof nothing {
        return nothing;
    }

    protected renderContent(): TemplateResult | typeof nothing {
        return nothing;
    }

    /** Part-level toolbar contributions (`toolbar:${partId}`). */
    private getToolbarTarget(): string | undefined {
        const contributionKey = this.tabContribution?.editorId ?? this.id ?? this.tabContribution?.name;
        return contributionKey ? `toolbar:${contributionKey}` : undefined;
    }

    /** Part-level context-menu contributions (`contextmenu:${partId}`). */
    private getContextMenuTarget(): string | undefined {
        const contributionKey = this.tabContribution?.editorId ?? this.id ?? this.tabContribution?.name;
        return contributionKey ? `contextmenu:${contributionKey}` : undefined;
    }

    private onContentContextMenu = async (event: MouseEvent): Promise<void> => {
        const contextMenu = this.renderRoot.querySelector('docks-contextmenu') as DocksContextMenu | null;
        if (!contextMenu) return;
        if (await contextMenu.show({ x: event.clientX, y: event.clientY }, event)) {
            event.preventDefault();
        }
    };

    private syncIsEditorCapability(): void {
        const next = this.save !== DocksPart.prototype.save;
        if (next === this.isEditor) return;
        this.isEditor = next;
    }

    private maybeActivateForCoupledEditors(): void {
        const coupled = this.tabContribution?.coupledEditors;
        if (!coupled?.length) return;
        const active = activeEditorSignal.get();
        if (!(active instanceof DocksPart)) return;
        const editorId = active.tabContribution?.editorId;
        if (!editorId || !coupled.includes(editorId)) return;
        this.activateContainingTab();
    }

    protected render() {
        const toolbarTarget = this.getToolbarTarget();
        const contextMenuTarget = this.getContextMenuTarget();
        const toolbarEnabled = this.tabContribution?.toolbar !== false;
        const contextMenuEnabled = this.tabContribution?.contextMenu !== false;
        const scrollMode = this.scrollMode;
        const scopeTokens = this.isEditor ? ['system.editors', '.system.editors'] : [];
        const content = this.renderContent();
        const contentNode = scrollMode === 'scroller'
            ? html`
                <wa-scroller class="part-content-scroll" orientation="vertical">
                    <div class="part-content-inner">${content}</div>
                </wa-scroller>
            `
            : html`<div class="part-content-inner">${content}</div>`;
        return html`
            <div class="part-shell">
                ${toolbarEnabled ? html`
                    <docks-toolbar
                        class="part-toolbar"
                        id=${ifDefined(toolbarTarget)}
                        .scopeTokens=${scopeTokens}
                        .partToolbarRenderer=${() => this.renderToolbar()}>
                    </docks-toolbar>
                ` : nothing}
                <div class="part-content ${scrollMode === 'native' ? 'native-scroll' : ''}" @contextmenu=${contextMenuEnabled ? this.onContentContextMenu : undefined}>
                    ${contentNode}
                </div>
                ${contextMenuEnabled ? html`
                    <docks-contextmenu
                        id=${ifDefined(contextMenuTarget)}
                        .scopeTokens=${scopeTokens}
                        .partContextMenuRenderer=${() => this.renderContextMenu()}>
                    </docks-contextmenu>
                ` : nothing}
            </div>
        `;
    }

    protected updated(_changedProperties: PropertyValues) {
        super.updated(_changedProperties);
        this.syncIsEditorCapability();
        if (_changedProperties.has("tabContribution")) {
            this.maybeActivateForCoupledEditors();
        }

        if (_changedProperties.has("dirty")) {
            const dirty = _changedProperties.get("dirty")
            if (dirty !== undefined) {
                this.dispatchEvent(new CustomEvent("dirty", {detail: this.dirty, bubbles: true}))
            }
        }
    }

    protected doClose() {
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        // Don't automatically close when disconnected - the element might just be moving
        // Call close() explicitly when actually closing the part
    }

    public close() {
        this.doClose()
    }

    connectedCallback() {
        super.connectedCallback();
        this.syncIsEditorCapability();
        queueMicrotask(() => this.syncIsEditorCapability());
        this.watch(activeEditorSignal, () => this.maybeActivateForCoupledEditors());
    }

    save() {
    }

    public isDirty() {
        return this.dirty
    }

    public markDirty(dirty: boolean) {
        this.dirty = dirty
        partDirtySignal.set(null as unknown as DocksPart)
        partDirtySignal.set(this)
        activePartSignal.set(null as unknown as DocksPart)
        activePartSignal.set(this)
    }

    private static readonly baseStyles = css`
        :host {
            display: block;
        }

        .part-shell {
            display: grid;
            grid-template-rows: auto minmax(0, 1fr);
            height: 100%;
            width: 100%;
            position: relative;
            overflow: hidden;
        }

        .part-content {
            min-height: 0;
            overflow: hidden;
            position: relative;
        }

        .part-content.native-scroll {
            overflow: auto;
        }

        .part-content-scroll {
            width: 100%;
            height: 100%;
        }

        .part-content-inner {
            height: 100%;
            min-height: 100%;
        }

        :host([embedded]) {
            height: auto;
        }

        :host([embedded]) .part-shell {
            height: auto;
            overflow: visible;
            grid-template-rows: auto;
        }

        :host([embedded]) .part-content {
            overflow: visible;
            min-height: 0;
        }

        :host([embedded]) .part-content-inner {
            height: auto;
            min-height: 0;
        }

        .part-toolbar {
            min-height: 0;
        }
    `;

    static finalizeStyles(styles?: CSSResultGroup) {
        const own = super.finalizeStyles(styles);
        return [DocksPart.baseStyles, ...own];
    }
}