import {customElement, property, state} from "lit/decorators.js";
import {css, html, nothing} from "lit";
import {LyraContainer} from "./container";
import {contributionRegistry, ContributionChangeEvent, TabContribution, TOPIC_CONTRIBUTEIONS_CHANGED} from "../core/contributionregistry";
import {when} from "lit/directives/when.js";
import {repeat} from "lit/directives/repeat.js";
import {createRef, ref} from "lit/directives/ref.js";
import { icon } from "../core/icon-utils";
import {subscribe} from "../core/events";
import { LyraPart } from "./part";
import { LyraToolbar } from "./toolbar";
import {LyraContextMenu} from "./contextmenu";
import {MouseButton, EDITOR_AREA_MAIN} from "../core/constants";
import {activePartSignal, activeEditorSignal, partDirtySignal} from "../core/appstate";
import {watchSignal} from "../core/signals";
import {confirmDialog} from "../dialogs";
import {appLoaderService} from "../core/apploader";

/**
 * LyraTabs - A dynamic tab container component
 * 
 * Architecture:
 * - Fixed layout (VS Code style) - each tab is registered to a specific container
 * - Tabs are created/destroyed as needed (no instance reuse)
 * - Support for both static (views) and dynamic (editors) tabs
 * 
 * Lifecycle:
 * 1. doInitUI():      Load contributions, activate first tab
 * 2. render():        Create tab UI from contributions
 * 3. open/closeTab(): Dynamic tab operations
 */
@customElement('lyra-tabs')
export class LyraTabs extends LyraContainer {
    @property({reflect: true})
    placement: "top" | "bottom" | "start" | "end" = "top";

    /** Tab contributions for this container */
    @state()
    private contributions: TabContribution[] = [];

    /** Reference to the underlying wa-tab-group element */
    private tabGroup = createRef()

    /** Cached container ID (this element's 'id' attribute) */
    private containerId: string | null = null;

    /** Map to track ResizeObservers for cleanup */
    private resizeObservers = new WeakMap<HTMLElement, ResizeObserver>();

    private tabGroupListenersAttached = false;

    private dirtySignalCleanup?: () => void;

    // ============= Lifecycle Methods =============

    protected doBeforeUI() {
        this.containerId = this.getAttribute("id");
        if (!this.containerId) {
            throw new Error("lyra-tabs requires an 'id' attribute to function");
        }
        this.loadAndResolveContributions();
    }

    protected doInitUI() {
        this.updateComplete.then(() => this.ensureTabGroupListenersAndActivate());
        
        subscribe(TOPIC_CONTRIBUTEIONS_CHANGED, (event: ContributionChangeEvent) => {
            if (!this.containerId || event.target !== this.containerId) return;
            
            this.loadAndResolveContributions();
            this.requestUpdate();
            
            this.updateComplete.then(() => {
                this.activateNextAvailableTab();
            });
        });
    }

    updated(changedProperties: Map<string, any>) {
        super.updated(changedProperties);
        if (this.contributions.length > 0 && this.tabGroup.value) {
            this.updateComplete.then(() => this.ensureTabGroupListenersAndActivate());
        }
        if (changedProperties.has('contributions')) {
            if (this.contributions.length === 0) this.tabGroupListenersAttached = false;
            const isEditorArea = this.containerId === EDITOR_AREA_MAIN;
            this.contributions.forEach(contribution => {
                const tabPanel = this.getTabPanel(contribution.name);
                if (!tabPanel) return;
                
                const contentDiv = tabPanel.querySelector('.tab-content');
                if (contentDiv && contentDiv.firstElementChild) {
                    const part = contentDiv.firstElementChild;
                    if (part instanceof LyraPart) {
                        part.tabContribution = contribution;
                        part.isEditor = isEditorArea;
                    }
                }
                
                requestAnimationFrame(() => this.updateToolbarHeightVariable(tabPanel));
            });
        }
    }

    // ============= Public API Methods =============
    
    has(key: string): boolean {
        if (!this.tabGroup.value) return false;
        return !!this.getTabPanel(key);
    }

    activate(key: string): void {
        if (!this.tabGroup.value) return;
        this.tabGroup.value.setAttribute("active", key);
    }

    public getActiveEditor(): string | null {
        if (!this.tabGroup.value) return null;
        return this.tabGroup.value.getAttribute("active");
    }

    open(contribution: TabContribution): void {
        const existing = this.contributions.find(c => c.name === contribution.name);
        if (existing) {
            this.activate(contribution.name);
            const tabPanel = this.getTabPanel(contribution.name);
            if (tabPanel) this.syncActiveSignalsFromPanel(tabPanel);
            return;
        }
        
        this.contributions.push(contribution);
        this.requestUpdate();
        
        this.updateComplete.then(() => {
            requestAnimationFrame(() => {
                this.activate(contribution.name);
                const tabPanel = this.getTabPanel(contribution.name);
                if (!tabPanel) return;
                const contentDiv = tabPanel.querySelector('.tab-content');
                if (contentDiv?.firstElementChild instanceof LyraPart) {
                    const part = contentDiv.firstElementChild;
                    part.tabContribution = contribution;
                    part.isEditor = this.containerId === EDITOR_AREA_MAIN;
                }
                this.syncActiveSignalsFromPanel(tabPanel);
                requestAnimationFrame(() => {
                    this.updateToolbarFromComponent(tabPanel);
                    this.updateToolbarHeightVariable(tabPanel);
                    this.setupToolbarResizeObserver(tabPanel);
                });
            });
        });
    }

    handleTabAuxClick(event: MouseEvent, contribution: TabContribution): void {
        if (event.button === MouseButton.MIDDLE && contribution.closable) {
            this.closeTab(event, contribution.name);
        }
    }

    async closeTab(event: Event, tabName: string): Promise<void> {
        event.stopPropagation();
        
        if (this.isDirty(tabName) && !await confirmDialog("Unsaved changes will be lost: Do you really want to close?")) {
            return;
        }
        
        const tabPanel = this.getTabPanel(tabName);
        if (!tabPanel) return;
        
        const contribution = this.contributions.find(c => c.name === tabName);
        if (!contribution) return;
        
        this.cleanupTabInstance(tabPanel);
        this.clearActiveSignalsIfPartInPanel(tabPanel);

        const index = this.contributions.indexOf(contribution);
        if (index > -1) {
            this.contributions.splice(index, 1);
        }

        this.requestUpdate();
        
        this.updateComplete.then(() => {
            this.activateNextAvailableTab();
        });
    }

    markDirty(name: string, dirty: boolean): void {
        const tab = this.getTab(name);
        if (!tab) return;
        tab.classList.toggle("part-dirty", dirty);
    }
    
    isDirty(name: string): boolean {
        const tab = this.getTab(name);
        return !!tab && tab.classList.contains("part-dirty");
    }

    // ============= Private Helper Methods =============
    
    /**
     * Loads tab contributions from the registry.
     */
    private loadAndResolveContributions(): void {
        if (!this.containerId) return;
        this.contributions = contributionRegistry.getContributions(this.containerId) as TabContribution[];
        this.requestUpdate();
    }

    /**
     * Cleans up a tab instance when the tab is closed.
     * 
     * Cleanup Process:
     * 1. Disconnect ResizeObserver if one exists
     * 2. Call component's close() method if available (disposes resources)
     * 3. DOM element is removed by caller (closeTab method)
     */
    private cleanupTabInstance(tabPanel: HTMLElement): void {
        // Clean up ResizeObserver
        const observer = this.resizeObservers.get(tabPanel);
        if (observer) {
            observer.disconnect();
            this.resizeObservers.delete(tabPanel);
        }
        
        // Explicitly close the component inside the tab before removing
        // This allows components to dispose resources (e.g., Monaco editor models, event listeners)
        const contentDiv = tabPanel.querySelector('.tab-content');
        if (contentDiv && contentDiv.firstElementChild) {
            const component = contentDiv.firstElementChild;
            if ('close' in component && typeof component.close === 'function') {
                component.close();
            }
        }
    }

    private ensureTabGroupListenersAndActivate(): void {
        if (!this.tabGroup.value || this.tabGroupListenersAttached) {
            this.activateNextAvailableTab();
            return;
        }
        this.tabGroupListenersAttached = true;
        const el = this.tabGroup.value;

        // @ts-ignore
        el.addEventListener("wa-tab-show", (event: CustomEvent) => {
            const tabPanel = this.getTabPanel(event.detail.name);
            if (tabPanel) {
                this.syncActiveSignalsFromPanel(tabPanel);
                this.updateToolbarFromComponent(tabPanel);
                requestAnimationFrame(() => {
                    this.updateToolbarHeightVariable(tabPanel);
                    this.setupToolbarResizeObserver(tabPanel);
                });
            }
        });

        el.addEventListener("part-toolbar-changed", (event: Event) => {
            const component = event.target as HTMLElement;
            const tabPanel = component.closest('wa-tab-panel') as HTMLElement | null;
            if (tabPanel) {
                this.updateToolbarFromComponent(tabPanel);
                requestAnimationFrame(() => this.updateToolbarHeightVariable(tabPanel));
            }
        });

        el.addEventListener("part-contextmenu-changed", (event: Event) => {
            const component = event.target as HTMLElement;
            const tabPanel = component.closest('wa-tab-panel') as HTMLElement | null;
            if (tabPanel) this.updateContextMenuFromComponent(tabPanel);
        });

        el.addEventListener('click', (event: Event) => {
            const target = event.target as HTMLElement;
            const tab = target.closest('wa-tab');
            if (tab) {
                const panelName = tab.getAttribute('panel');
                if (panelName) {
                    const tabPanel = this.getTabPanel(panelName);
                    if (tabPanel) this.syncActiveSignalsFromPanel(tabPanel);
                }
                return;
            }
            const scroller = target.closest('wa-scroller.tab-content');
            if (!scroller) return;
            const tabPanel = scroller.closest('wa-tab-panel') as HTMLElement;
            if (tabPanel) this.syncActiveSignalsFromPanel(tabPanel);
        });

        el.addEventListener('contextmenu', (event: Event) => {
            const mouseEvent = event as MouseEvent;
            const scroller = (mouseEvent.target as HTMLElement).closest('wa-scroller.tab-content');
            if (!scroller) return;
            mouseEvent.preventDefault();
            const tabPanel = scroller.closest('wa-tab-panel') as HTMLElement;
            if (!tabPanel) return;
            requestAnimationFrame(() => {
                this.updateContextMenuFromComponent(tabPanel);
                const contextMenu = tabPanel.querySelector('lyra-contextmenu') as LyraContextMenu;
                if (contextMenu) {
                    contextMenu.show({ x: mouseEvent.clientX, y: mouseEvent.clientY }, mouseEvent);
                }
            });
        });

        this.dirtySignalCleanup?.();
        this.dirtySignalCleanup = watchSignal(partDirtySignal, (part: LyraPart | null) => {
            if (!part) return;
            const panel = part.closest('wa-tab-panel') as HTMLElement | null;
            if (!panel) return;
            const name = panel.getAttribute('name');
            if (!name) return;
            this.markDirty(name, part.isDirty());
        });

        this.activateNextAvailableTab();
    }

    disconnectedCallback() {
        this.dirtySignalCleanup?.();
        this.dirtySignalCleanup = undefined;
        super.disconnectedCallback();
    }

    private activateNextAvailableTab(): void {
        if (!this.tabGroup.value) return;
        
        const allRemainingTabs = this.tabGroup.value.querySelectorAll("wa-tab");
        if (allRemainingTabs.length > 0) {
            const newActive = allRemainingTabs.item(0).getAttribute("panel");
            if (newActive) {
                this.tabGroup.value.setAttribute("active", newActive);
            }
        } else {
            this.tabGroup.value.removeAttribute("active");
        }
    }

    private getTabPanel(name: string): HTMLElement | null {
        if (!this.tabGroup.value) return null;
        return this.tabGroup.value.querySelector(`wa-tab-panel[name='${name}']`) as HTMLElement | null;
    }

    private getTab(name: string): HTMLElement | null {
        if (!this.tabGroup.value) return null;
        return this.tabGroup.value.querySelector(`wa-tab[panel='${name}']`) as HTMLElement | null;
    }

    private syncActiveSignalsFromPanel(tabPanel: HTMLElement): void {
        const contentDiv = tabPanel.querySelector('.tab-content');
        const part = contentDiv?.firstElementChild;
        if (!(part instanceof LyraPart)) return;

        // Always update the active part to reflect current focus
        activePartSignal.set(null as unknown as LyraPart);
        activePartSignal.set(part);

        // Only update the active editor when an editor in the main editor area changes.
        // Do NOT clear the existing active editor when non-editor parts gain focus so
        // commands depending on the active editor keep working while other views are active.
        if (this.containerId === EDITOR_AREA_MAIN && part.isEditor) {
            activeEditorSignal.set(null as unknown as LyraPart);
            activeEditorSignal.set(part);
        }
    }

    private clearActiveSignalsIfPartInPanel(tabPanel: HTMLElement): void {
        const parts = Array.from(tabPanel.querySelectorAll('*')).filter(
            (el): el is LyraPart => el instanceof LyraPart
        );
        for (const part of parts) {
            if (activePartSignal.get() === part) activePartSignal.set(null as unknown as LyraPart);
            if (activeEditorSignal.get() === part) activeEditorSignal.set(null as unknown as LyraPart);
        }
    }

    /**
     * Updates the toolbar for a tab panel by querying the component for its toolbar content.
     * This allows LyraPart components to provide their own toolbar items directly.
     */
    private updateToolbarFromComponent(tabPanel: HTMLElement): void {
        const contentDiv = tabPanel.querySelector('.tab-content');
        if (!contentDiv || !contentDiv.firstElementChild) return;
        
        const component = contentDiv.firstElementChild;
        if (!(component instanceof LyraPart)) return;
        
        // Check if component has renderToolbar method
        if (!component['renderToolbar']) return;
        
        // Query for lyra-toolbar directly since there's only one per tab panel
        const toolbar = tabPanel.querySelector('lyra-toolbar') as LyraToolbar | null;
        if (toolbar) {
            // Pass a bound render function to maintain component context
            toolbar.partToolbarRenderer = () => component['renderToolbar']();
            toolbar.requestUpdate();
        }
    }

    /**
     * Updates the context menu for a tab panel by querying the component for its context menu content.
     * This allows LyraPart components to provide their own context menu items directly.
     */
    private updateContextMenuFromComponent(tabPanel: HTMLElement): void {
        const contentDiv = tabPanel.querySelector('.tab-content');
        if (!contentDiv || !contentDiv.firstElementChild) return;
        
        const component = contentDiv.firstElementChild;
        if (!(component instanceof LyraPart)) return;
        
        // Check if component has renderContextMenu method
        if (!component['renderContextMenu']) return;
        
        // Query for contextmenu directly since there's only one per tab panel
        const contextMenu = tabPanel.querySelector('lyra-contextmenu') as LyraContextMenu | null;
        if (contextMenu) {
            // Pass a bound render function to maintain component context
            contextMenu.partContextMenuRenderer = () => component['renderContextMenu']();
            contextMenu.requestUpdate();
        }
    }

    /**
     * Updates the toolbar height CSS variable for calc() positioning.
     */
    private updateToolbarHeightVariable(tabPanel: HTMLElement): void {
        const toolbar = tabPanel.querySelector('.tab-toolbar') as HTMLElement | null;
        if (!toolbar) return;
        
        const toolbarHeight = toolbar.offsetHeight;
        tabPanel.style.setProperty('--toolbar-height', `${toolbarHeight}px`);
    }

    /**
     * Sets up a ResizeObserver to update toolbar height variable when toolbar size changes.
     * Reuses existing observer if one already exists for this tab panel.
     */
    private setupToolbarResizeObserver(tabPanel: HTMLElement): void {
        // Check if observer already exists
        if (this.resizeObservers.has(tabPanel)) return;
        
        const toolbar = tabPanel.querySelector('.tab-toolbar') as HTMLElement | null;
        if (!toolbar) return;

        const observer = new ResizeObserver(() => {
            this.updateToolbarHeightVariable(tabPanel);
        });
        observer.observe(toolbar);
        this.resizeObservers.set(tabPanel, observer);
    }

    // ============= Render Method =============

    private static readonly MAX_TAB_LABEL = 16;

    private truncateTabLabel(label: string): string {
        if (!label || label.length <= LyraTabs.MAX_TAB_LABEL) return label;
        const ellipsis = '…';
        const take = LyraTabs.MAX_TAB_LABEL - ellipsis.length;
        const startLen = Math.floor(take / 2);
        return label.slice(0, startLen) + ellipsis + label.slice(-(take - startLen));
    }

    private renderEmptyState() {
        const currentApp = appLoaderService.getCurrentApp();
        return html`
            <div class="empty-state">
                ${when(
                    currentApp,
                    () => html`
                        <div class="empty-content">
                            <h2 class="empty-title">${currentApp!.name}</h2>
                            ${when(
                                currentApp!.description,
                                () => html`<p class="empty-description">${currentApp!.description}</p>`
                            )}
                        </div>
                    `,
                    () => html`<wa-icon name="folder-open" class="empty-icon"></wa-icon>`
                )}
            </div>
        `;
    }

    render() {
        if (this.contributions.length === 0) {
            return this.renderEmptyState();
        }
        return html`
            <wa-tab-group ${ref(this.tabGroup)} placement=${this.placement}>
                ${repeat(
                    this.contributions,
                    (c) => c.name,
                    (c) => {
                        const fullLabel = c.label ?? c.name;
                        const shortLabel = this.truncateTabLabel(fullLabel);
                        return html`
                        <wa-tab panel="${c.name}"
                                title="${fullLabel}"
                                @auxclick="${(e: MouseEvent) => this.handleTabAuxClick(e, c)}">
                            ${icon(c.icon, { label: fullLabel })}
                            ${shortLabel}
                            ${when(c.closable, () => html`
                                <wa-icon name="xmark" label="Close"  @click="${(e: Event) => this.closeTab(e, c.name)}"></wa-icon>
                            `)}
                        </wa-tab>
                        <wa-tab-panel name="${c.name}">
                            ${when(c.toolbar !== false, () => html`
                                <lyra-toolbar id="toolbar:${c.editorId ?? c.name}"
                                           class="tab-toolbar"
                                           ?is-editor="${this.containerId === EDITOR_AREA_MAIN}"></lyra-toolbar>
                            `)}
                            <wa-scroller class="tab-content" orientation="vertical">
                                ${c.component ? c.component(c.name) : nothing}
                            </wa-scroller>
                            ${when(c.contextMenu !== false, () => html`
                                <lyra-contextmenu id="contextmenu:${c.name}"
                                               ?is-editor="${this.containerId === EDITOR_AREA_MAIN}"></lyra-contextmenu>
                            `)}
                        </wa-tab-panel>
                    `;
                    }
                )}
            </wa-tab-group>
        `;
    }

    static styles = css`
        :host {
            height: 100%;
            width: 100%;
        }

        wa-tab-group {
            height: 100%;
            width: 100%;
        }

        wa-tab-group::part(base) {
            display: grid;
            grid-template-rows: auto minmax(0, 1fr);
            height: 100%;
            width: 100%;
        }

        wa-tab-panel[active] {
            display: grid;
            grid-template-rows: minmax(0, 1fr);
            height: 100%;
            width: 100%;
            overflow: hidden;
            position: relative;
        }

        .tab-content {
            position: absolute;
            top: calc(var(--toolbar-height, 0px));
            right: 0;
            left: 0;
            height: calc(100% - var(--toolbar-height, 0px));
        }

        wa-tab::part(base) {
            padding: 3px 0.5rem;
        }

        wa-tab-panel {
            --padding: 0px;
        }

        .part-dirty::part(base) {
            font-style: italic;
            color: var(--wa-color-danger-fill-loud)
        }

        .empty-state {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            grid-row: 2;
        }

        .empty-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 2rem;
            gap: 0.75rem;
            opacity: 0.3;
        }

        .empty-title {
            margin: 0;
            font-size: 1.5rem;
            font-weight: 500;
            color: var(--wa-color-text-quiet);
        }

        .empty-description {
            margin: 0;
            font-size: 1rem;
            color: var(--wa-color-text-quiet);
            max-width: 500px;
        }

        .empty-icon {
            font-size: 6rem;
            opacity: 0.2;
            color: var(--wa-color-text-quiet);
        }
    `
}
