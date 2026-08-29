import {html, nothing} from "lit";
import {customElement, property} from "lit/decorators.js";

import {
    EDITOR_AREA_MAIN,
    SIDEBAR_MAIN,
    SIDEBAR_MAIN_BOTTOM,
    SIDEBAR_AUXILIARY,
    SIDEBAR_AUXILIARY_BOTTOM,
    PANEL_BOTTOM,
    TOOLBAR_MAIN,
    TOOLBAR_MAIN_CENTER,
    TOOLBAR_MAIN_RIGHT,
    TOOLBAR_BOTTOM,
    TOOLBAR_BOTTOM_CENTER,
    TOOLBAR_BOTTOM_END
} from "../core/contribution-targets";
import { appLoaderService } from "../core/apploader";
import { appSettings } from "../core/settingsservice";
import {
    LAYOUT_PANEL_SETTINGS_KEY,
    resolveStoredPanelVisibility,
    type LayoutPanelVisibility,
} from "../core/layout-panels";
import {DocksContainer} from "../parts/container";

@customElement('docks-standard-layout')
export class DocksStandardLayout extends DocksContainer {
    @property({type: Boolean, attribute: 'show-left-aux'})
    showLeftAux: boolean = false;

    @property({type: Boolean, attribute: 'show-bottom-panel'})
    showBottomPanel: boolean = true;

    @property({type: Boolean, attribute: 'show-left-sidebar'})
    showLeftSidebar: boolean = true;

    @property({type: Boolean, attribute: 'show-aux-sidebar'})
    showAuxSidebar: boolean = true;

    @property({type: Boolean, attribute: 'show-right-aux'})
    showRightAux: boolean = false;

    private panelsInitialized = false;

    createRenderRoot() {
        return this;
    }

    getPanelVisibility(): LayoutPanelVisibility {
        return {
            showLeftSidebar: this.showLeftSidebar,
            showAuxSidebar: this.showAuxSidebar,
            showBottomPanel: this.showBottomPanel,
            showLeftAux: this.showLeftAux,
            showRightAux: this.showRightAux,
        };
    }

    private applyPanelVisibility(panels: LayoutPanelVisibility): void {
        this.showLeftSidebar = panels.showLeftSidebar;
        this.showAuxSidebar = panels.showAuxSidebar;
        this.showBottomPanel = panels.showBottomPanel;
        this.showLeftAux = panels.showLeftAux;
        this.showRightAux = panels.showRightAux;
    }

    async setPanelVisibility(panels: Partial<LayoutPanelVisibility>): Promise<void> {
        const next = { ...this.getPanelVisibility(), ...panels };
        this.applyPanelVisibility(next);
        try {
            await appSettings.set(LAYOUT_PANEL_SETTINGS_KEY, next);
        } catch (error) {
            console.error('Failed to persist layout panel visibility:', error);
            throw error;
        }
        window.dispatchEvent(new CustomEvent('layout-panels-changed', {
            detail: { panels: this.getPanelVisibility() },
        }));
    }

    protected doInitUI() {
        void this.initializePanelVisibility();
    }

    private async initializePanelVisibility(): Promise<void> {
        if (this.panelsInitialized) {
            return;
        }
        this.panelsInitialized = true;

        const appLayout = appLoaderService.getCurrentApp()?.layout;
        const panels = await resolveStoredPanelVisibility(appLayout);
        this.applyPanelVisibility(panels);
        window.dispatchEvent(new CustomEvent('layout-panels-changed', {
            detail: { panels: this.getPanelVisibility() },
        }));
    }

    private getGridSizes(): string {
        if (this.showLeftSidebar && this.showAuxSidebar) {
            return "20%, 60%, 20%";
        }
        if (this.showLeftSidebar) {
            return "20%, 80%";
        }
        if (this.showAuxSidebar) {
            return "80%, 20%";
        }
        return "100%";
    }

    render() {
        return html`
            <style>
                *, *::before, *::after {
                    box-sizing: border-box;
                }
                
                html {
                    height: 100%;
                    margin: 0;
                    padding: 0;
                    overflow: hidden;
                }
                
                body {
                    height: 100%;
                    width: 100%;
                    margin: 0;
                    padding: 0;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }
                
                docks-standard-layout {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    width: 100%;
                }
                
                docks-standard-layout .toolbar-top {
                    width: 100%;
                    display: grid;
                    grid-template-columns: 1fr 2fr 1fr;
                    align-items: center;
                    border-bottom: solid var(--wa-border-width-s) var(--wa-color-neutral-border-loud);
                    flex-shrink: 0;
                    position: relative;
                    z-index: 100;
                }

                docks-standard-layout .toolbar-top > :nth-child(1) {
                    justify-self: start;
                }

                docks-standard-layout .toolbar-top > :nth-child(2) {
                    justify-self: center;
                }
                
                docks-standard-layout .toolbar-bottom {
                    width: 100%;
                    border-top: solid var(--wa-border-width-s) var(--wa-color-neutral-border-loud);
                    display: grid;
                    grid-template-columns: 1fr 2fr auto;
                    align-items: center;
                    flex-shrink: 0;
                    min-height: 32px;
                    padding: 0 var(--wa-space-s);
                    box-sizing: border-box;
                }
                
                docks-standard-layout .main-layout {
                    flex: 1;
                    min-height: 0;
                }
                
                docks-standard-layout .toolbar-end {
                    justify-self: end;
                }
            </style>
            
            <div class="toolbar-top">
                <docks-toolbar id=${TOOLBAR_MAIN}></docks-toolbar>
                <docks-toolbar id=${TOOLBAR_MAIN_CENTER}></docks-toolbar>
                <docks-toolbar class="toolbar-end" id=${TOOLBAR_MAIN_RIGHT}></docks-toolbar>
            </div>
            
            <docks-resizable-grid 
                class="main-layout"
                id="main-layout" 
                orientation="horizontal" 
                sizes=${this.getGridSizes()}>
                
                ${this.showLeftSidebar
                    ? html`
                        ${this.showLeftAux
                            ? html`
                                <docks-resizable-grid 
                                    id="left-sidebar-split" 
                                    orientation="vertical" 
                                    sizes="50%, 50%">
                                    <docks-tabs id="${SIDEBAR_MAIN}" placement="start" icon-only with-toolbar item-size="l"></docks-tabs>
                                    <docks-tabs id="${SIDEBAR_MAIN_BOTTOM}"  placement="start" icon-only></docks-tabs>
                                </docks-resizable-grid>
                            `
                            : html`<docks-tabs id="${SIDEBAR_MAIN}" placement="start" icon-only with-toolbar item-size="l"></docks-tabs>`
                        }
                    `
                    : nothing
                }
                
                ${this.showBottomPanel
                    ? html`
                        <docks-resizable-grid 
                            id="editor-area-split" 
                            orientation="vertical" 
                            sizes="70%, 30%">
                            <docks-tabs id="${EDITOR_AREA_MAIN}"></docks-tabs>
                            <docks-tabs id="${PANEL_BOTTOM}"></docks-tabs>
                        </docks-resizable-grid>
                    `
                    : html`<docks-tabs id="${EDITOR_AREA_MAIN}"></docks-tabs>`
                }
                
                ${this.showAuxSidebar
                    ? html`
                        ${this.showRightAux
                            ? html`
                                <docks-resizable-grid
                                    id="right-sidebar-split"
                                    orientation="vertical"
                                    sizes="50%, 50%">
                                    <docks-tabs id="${SIDEBAR_AUXILIARY}"></docks-tabs>
                                    <docks-tabs id="${SIDEBAR_AUXILIARY_BOTTOM}" placement="start" icon-only></docks-tabs>
                                </docks-resizable-grid>
                            `
                            : html`<docks-tabs id="${SIDEBAR_AUXILIARY}"></docks-tabs>`
                        }
                    `
                    : nothing
                }
            </docks-resizable-grid>
            
            <div class="toolbar-bottom">
                <docks-toolbar id=${TOOLBAR_BOTTOM}></docks-toolbar>
                <docks-toolbar id=${TOOLBAR_BOTTOM_CENTER}></docks-toolbar>
                <docks-toolbar class="toolbar-end" id=${TOOLBAR_BOTTOM_END}></docks-toolbar>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'docks-standard-layout': DocksStandardLayout;
    }
}
