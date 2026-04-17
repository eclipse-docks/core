import {customElement, property, state} from "lit/decorators.js";
import {css, html, nothing} from "lit";
import {DocksContainer} from "./container";
import {appLoaderService} from "../core/apploader";
import {contributionRegistry, ContributionChangeEvent, TabContribution, TOPIC_CONTRIBUTEIONS_CHANGED} from "../core/contributionregistry";
import {when} from "lit/directives/when.js";
import {repeat} from "lit/directives/repeat.js";
import {createRef, ref} from "lit/directives/ref.js";
import { icon } from "../core/icon-utils";
import {subscribe} from "../core/events";
import { DocksPart } from "./part";
import {MouseButton, EDITOR_AREA_MAIN} from "../core/constants";
import {activePartSignal, activeEditorSignal, partDirtySignal} from "../core/appstate";
import {watchSignal} from "../core/signals";
import {confirmDialog} from "../dialogs";
/**
 * DocksTabs - A dynamic tab container component
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
@customElement('docks-tabs')
export class DocksTabs extends DocksContainer {
    @property({reflect: true})
    placement: "top" | "bottom" | "start" | "end" = "top";

    /** When true, tab contributions show icons only (labels remain on title + wa-icon for a11y). */
    @property({type: Boolean, reflect: true, attribute: 'icon-only'})
    iconOnly: boolean = false;

    /**
     * When true, render a `docks-toolbar` in the tab group `nav` slot after tabs (extensions contribute via id `${containerId}-toolbar`).
     */
    @property({type: Boolean, reflect: true, attribute: 'with-toolbar'})
    withToolbar: boolean = false;

    /** Tab contributions for this container */
    @state()
    private contributions: TabContribution[] = [];

    /** Reference to the underlying wa-tab-group element */
    private tabGroup = createRef()

    /** Cached container ID (this element's 'id' attribute) */
    private containerId: string | null = null;

    private tabGroupListenersAttached = false;

    private dirtySignalCleanup?: () => void;

    // ============= Lifecycle Methods =============

    protected doBeforeUI() {
        this.containerId = this.getAttribute("id");
        if (!this.containerId) {
            throw new Error("docks-tabs requires an 'id' attribute to function");
        }
        this.loadAndResolveContributions();
    }

    protected doInitUI() {
        this.updateComplete.then(() => this.ensureTabGroupListenersAndActivate());
        
        subscribe(TOPIC_CONTRIBUTEIONS_CHANGED, (event: ContributionChangeEvent) => {
            if (!this.containerId) return;
            const navToolbarId = `${this.containerId}-toolbar`;
            if (event.target === navToolbarId) return;
            if (event.target !== this.containerId) return;

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
            this.contributions.forEach(contribution => {
                const tabPanel = this.getTabPanel(contribution.name);
                if (!tabPanel) return;

                const part = this.getPartFromPanel(tabPanel);
                if (part) {
                    part.tabContribution = contribution;
                }
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
        const tabPanel = this.getTabPanel(key);
        if (tabPanel) this.syncActiveSignalsFromPanel(tabPanel);
    }

    public getActiveEditor(): string | null {
        if (!this.tabGroup.value) return null;
        return this.tabGroup.value.getAttribute("active");
    }

    open(contribution: TabContribution): void {
        const existing = this.contributions.find(c => c.name === contribution.name);
        if (existing) {
            this.activate(contribution.name);
            return;
        }
        
        this.contributions.push(contribution);
        this.requestUpdate();
        
        this.updateComplete.then(() => {
            requestAnimationFrame(() => {
                const tabPanel = this.getTabPanel(contribution.name);
                if (!tabPanel) return;
                const part = this.getPartFromPanel(tabPanel);
                if (part) {
                    part.tabContribution = contribution;
                }
                this.activate(contribution.name);
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
        // Explicitly close the component inside the tab before removing
        // This allows components to dispose resources (e.g., Monaco editor models, event listeners)
        const part = this.getPartFromPanel(tabPanel);
        if (part && 'close' in part && typeof part.close === 'function') {
            part.close();
        }
    }

    private ensureTabGroupListenersAndActivate(): void {
        if (!this.tabGroup.value) {
            return;
        }
        if (this.tabGroupListenersAttached) {
            return;
        }
        this.tabGroupListenersAttached = true;
        const el = this.tabGroup.value;

        // @ts-ignore
        el.addEventListener("wa-tab-show", (event: CustomEvent) => {
            const tabPanel = this.getTabPanel(event.detail.name);
            if (tabPanel) {
                this.syncActiveSignalsFromPanel(tabPanel);
            }
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
            const tabPanel = target.closest('wa-tab-panel') as HTMLElement | null;
            if (tabPanel) this.syncActiveSignalsFromPanel(tabPanel);
        });


        this.dirtySignalCleanup?.();
        this.dirtySignalCleanup = watchSignal(partDirtySignal, (part: DocksPart | null) => {
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
        const part = this.getPartFromPanel(tabPanel);
        if (!(part instanceof DocksPart)) return;

        // Always update the active part to reflect current focus
        activePartSignal.set(null as unknown as DocksPart);
        activePartSignal.set(part);

        // Only update the active editor when an editor in the main editor area changes.
        // Do NOT clear the existing active editor when non-editor parts gain focus so
        // commands depending on the active editor keep working while other views are active.
        if (this.containerId === EDITOR_AREA_MAIN && part.isEditor) {
            activeEditorSignal.set(null as unknown as DocksPart);
            activeEditorSignal.set(part);
        }
    }

    private clearActiveSignalsIfPartInPanel(tabPanel: HTMLElement): void {
        const parts = Array.from(tabPanel.querySelectorAll('*')).filter(
            (el): el is DocksPart => el instanceof DocksPart
        );
        for (const part of parts) {
            if (activePartSignal.get() === part) activePartSignal.set(null as unknown as DocksPart);
            if (activeEditorSignal.get() === part) activeEditorSignal.set(null as unknown as DocksPart);
        }
    }

    private getPartFromPanel(tabPanel: HTMLElement): DocksPart | null {
        const first = tabPanel.firstElementChild;
        return first instanceof DocksPart ? first : null;
    }

    // ============= Render Method =============

    private static readonly MAX_TAB_LABEL = 16;

    private truncateTabLabel(label: string): string {
        if (!label || label.length <= DocksTabs.MAX_TAB_LABEL) return label;
        const ellipsis = '…';
        const take = DocksTabs.MAX_TAB_LABEL - ellipsis.length;
        const startLen = Math.floor(take / 2);
        return label.slice(0, startLen) + ellipsis + label.slice(-(take - startLen));
    }

    /** Aligns `docks-toolbar` with `placement`: side rails → vertical, top/bottom tab strip → horizontal. */
    private withToolbarOrientation(): "horizontal" | "vertical" {
        return this.placement === "start" || this.placement === "end" ? "vertical" : "horizontal";
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
        const navToolbarId = this.containerId ? `${this.containerId}-toolbar` : '';
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
                            ${this.iconOnly ? nothing : shortLabel}
                            ${when(c.closable, () => html`
                                <wa-icon name="xmark" label="Close"  @click="${(e: Event) => this.closeTab(e, c.name)}"></wa-icon>
                            `)}
                        </wa-tab>
                        <wa-tab-panel name="${c.name}">
                            ${c.component ? c.component(c.name) : nothing}
                        </wa-tab-panel>
                    `;
                    }
                )}
                ${this.withToolbar && navToolbarId
                    ? html`
                        <div class="nav-toolbar-spacer" slot="nav" aria-hidden="true"></div>
                        <docks-toolbar
                            slot="nav"
                            id=${navToolbarId}
                            orientation=${this.withToolbarOrientation()}
                            align="center"
                            size="large"
                        ></docks-toolbar>
                    `
                    : nothing}
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
            min-height: 0;
        }

        :host(:is([placement="top"], [placement="bottom"])) wa-tab-group::part(base) {
            display: grid;
            grid-template-rows: auto minmax(0, 1fr);
            height: 100%;
            width: 100%;
        }

        :host(:is([placement="start"], [placement="end"])) wa-tab-group::part(base) {
            height: 100%;
            width: 100%;
            min-height: 0;
        }

        wa-tab-panel[active] {
            display: grid;
            grid-template-rows: minmax(0, 1fr);
            height: 100%;
            width: 100%;
            overflow: hidden;
            position: relative;
        }

        wa-tab-panel > * {
            width: 100%;
            height: 100%;
            min-height: 0;
        }

        wa-tab::part(base) {
            padding: 3px 0.5rem;
        }

        :host([icon-only]) wa-tab::part(base) {
            justify-content: center;
        }

        :host([icon-only]:is([placement="top"], [placement="bottom"])) wa-tab::part(base) {
            padding: var(--wa-space-s);
        }

        :host([icon-only]:is([placement="start"], [placement="end"])) wa-tab::part(base) {
            padding-inline: 0;
            padding-block: var(--wa-space-s);
        }

        :host([icon-only]) wa-tab wa-icon {
            font-size: var(--wa-font-size-l);
        }

        :host([icon-only]:is([placement="start"], [placement="end"])) wa-tab-group::part(nav),
        :host([icon-only]:is([placement="start"], [placement="end"])) wa-tab-group::part(tabs) {
            padding: 0;
            margin: 0;
        }

        :host([icon-only]:is([placement="start"], [placement="end"])) wa-tab-group::part(nav) {
            flex: 0 0 auto;
        }

        :host([with-toolbar]) .nav-toolbar-spacer {
            flex: 1 1 auto;
            min-height: 0;
            min-width: 0;
            pointer-events: none;
        }

        :host([with-toolbar]:is([placement="start"], [placement="end"])) wa-tab-group::part(nav) {
            display: grid;
            grid-template-rows: 1fr;
            height: 100%;
            min-height: 0;
        }

        :host([with-toolbar]:is([placement="start"], [placement="end"])) wa-tab-group::part(tabs) {
            display: flex;
            flex-direction: column;
            min-height: 0;
            height: 100%;
            flex: 1 1 auto;
            align-self: stretch;
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
