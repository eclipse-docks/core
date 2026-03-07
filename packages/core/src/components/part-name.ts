import {customElement} from "lit/decorators.js";
import {LyraElement} from "../parts/element";
import {html} from "lit";
import {activePartSignal} from "../core/appstate";
import {contributionRegistry, HTMLContribution} from "../core/contributionregistry";
import {TOOLBAR_BOTTOM_CENTER} from "../core/constants";
import '../widgets/icon';
import {i18n} from "../core/i18n";

const t = i18n('partname');

contributionRegistry.registerContribution(TOOLBAR_BOTTOM_CENTER, {
    component: "<lyra-part-name></lyra-part-name>"
} as HTMLContribution)

@customElement('lyra-part-name')
export class LyraPartName extends LyraElement {
    protected doBeforeUI() {
        this.watch(activePartSignal, () => {
            this.requestUpdate();
        });
    }
    
    private getPartName(): string {
        const activePart = activePartSignal.get();
        if (!activePart) {
            return t('NO_PART');
        }

        return activePart.tabContribution?.label || activePart.getAttribute('id') || t('NO_PART');
    }

    protected render() {
        const activePart = activePartSignal.get();
        const partIcon = activePart?.tabContribution?.icon || "box";
        
        return html`
            <wa-button 
                appearance="plain"
                size="small"
                title="${t('ACTIVE_PART')}">
                <lyra-icon slot="start" name="${partIcon}" label="Part"></lyra-icon>
                ${this.getPartName()}
            </wa-button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'lyra-part-name': LyraPartName
    }
}

