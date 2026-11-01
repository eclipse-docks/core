import { DocksElement, icon, subscribe, TOPIC_CONTRIBUTEIONS_CHANGED, unsubscribe } from '@eclipse-docks/core';
import { css, html } from '@eclipse-docks/core/externals/lit';
import { customElement, state } from '@eclipse-docks/core/externals/lit';
import { listRegisteredCanvases } from './canvases';
import { SYSTEM_CANVASES } from './contribution';
import { openCanvasByName } from './commands';

@customElement('docks-canvas-switcher')
export class DocksCanvasSwitcher extends DocksElement {
    @state() private canvases = listRegisteredCanvases();
    private topic?: string;

    protected doBeforeUI() {
        this.topic = subscribe(TOPIC_CONTRIBUTEIONS_CHANGED, (event: { target?: string }) => {
            if (event?.target !== SYSTEM_CANVASES) return;
            this.canvases = listRegisteredCanvases();
        });
    }

    disconnectedCallback() {
        if (this.topic) unsubscribe(this.topic);
        super.disconnectedCallback();
    }

    private onSelect = (event: CustomEvent) => {
        const item = event.detail?.item as HTMLElement & { value?: string } | undefined;
        const name = item?.value || item?.getAttribute('value');
        if (!name) return;
        void openCanvasByName(name);
    };

    protected render() {
        if (this.canvases.length === 0) return html``;
        return html`
            <wa-dropdown placement="bottom-end" distance="4" size="s" @wa-select=${this.onSelect}>
                <wa-button slot="trigger" appearance="plain" size="s" with-caret title="Canvases">
                    ${icon('table-columns', { label: 'Canvases' })}
                </wa-button>
                ${this.canvases.map(canvas => html`
                    <wa-dropdown-item value="${canvas.name ?? ''}">
                        ${icon(canvas.icon, { label: canvas.label, slot: 'icon' })}
                        ${canvas.label}
                    </wa-dropdown-item>
                `)}
            </wa-dropdown>
        `;
    }

    static styles = css`
        :host { display: inline-block; }
    `;
}
