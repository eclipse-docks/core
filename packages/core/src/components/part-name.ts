import {customElement} from "lit/decorators.js";
import {DocksElement} from "../parts/element";
import {html} from "lit";
import {activePartSignal} from "../core/appstate";
import {getActivePartDisplayName} from "./document-title";
import {contributionRegistry, HTMLContribution} from "../core/contributionregistry";
import {TOOLBAR_BOTTOM_CENTER} from "../core/constants";
import { icon } from '../core/icon-utils';
import { i18n } from '../core/i18n';

const t = await i18n(import.meta.glob('./partname*.json'));

contributionRegistry.registerContribution(TOOLBAR_BOTTOM_CENTER, {
    component: "<docks-part-name></docks-part-name>"
} as HTMLContribution)

@customElement('docks-part-name')
export class DocksPartName extends DocksElement {
    protected doBeforeUI() {
        this.watch(activePartSignal, () => {
            this.requestUpdate();
        });
    }
    
    protected render() {
        const activePart = activePartSignal.get();
        const partIcon = activePart?.tabContribution?.icon || "box";
        
        return html`
            <wa-button 
                appearance="plain"
                size="small"
                title="${t.ACTIVE_PART}">
                ${icon(partIcon, { label: 'Part', slot: 'start' })}
                ${getActivePartDisplayName()}
            </wa-button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'docks-part-name': DocksPartName
    }
}

