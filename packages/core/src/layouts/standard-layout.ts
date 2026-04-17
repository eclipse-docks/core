import {html, nothing} from "lit";
import {customElement, property} from "lit/decorators.js";

import {
    EDITOR_AREA_MAIN,
    SIDEBAR_MAIN,
    SIDEBAR_MAIN_BOTTOM,
    SIDEBAR_AUXILIARY,
    PANEL_BOTTOM,
    TOOLBAR_MAIN,
    TOOLBAR_MAIN_CENTER,
    TOOLBAR_MAIN_RIGHT,
    TOOLBAR_BOTTOM,
    TOOLBAR_BOTTOM_CENTER,
    TOOLBAR_BOTTOM_END
} from "../core/constants";
import {DocksContainer} from "../parts/container";

@customElement('docks-standard-layout')
export class DocksStandardLayout extends DocksContainer {
    @property({type: Boolean, attribute: 'show-bottom-sidebar'})
    showBottomSidebar: boolean = false;

    @property({type: Boolean, attribute: 'show-bottom-panel'})
    showBottomPanel: boolean = false;

    @property({type: Boolean, attribute: 'show-left-sidebar'})
    showLeftSidebar: boolean = true;

    @property({type: Boolean, attribute: 'show-aux-sidebar'})
    showAuxSidebar: boolean = true;

    createRenderRoot() {
        return this;
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
                        ${this.showBottomSidebar
                            ? html`
                                <docks-resizable-grid 
                                    id="left-sidebar-split" 
                                    orientation="vertical" 
                                    sizes="50%, 50%">
                                    <docks-tabs id="${SIDEBAR_MAIN}" placement="start" icon-only with-toolbar></docks-tabs>
                                    <docks-tabs id="${SIDEBAR_MAIN_BOTTOM}"  placement="start" icon-only></docks-tabs>
                                </docks-resizable-grid>
                            `
                            : html`<docks-tabs id="${SIDEBAR_MAIN}" placement="start" icon-only with-toolbar></docks-tabs>`
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
                    ? html`<docks-tabs id="${SIDEBAR_AUXILIARY}"></docks-tabs>`
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
