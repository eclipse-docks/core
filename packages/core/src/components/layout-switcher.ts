import { html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { LyraElement } from "../parts/element";
import { appLoaderService } from "../core/apploader";

@customElement('lyra-layout-switcher')
export class LyraLayoutSwitcher extends LyraElement {
    @state()
    private currentLayoutId = 'standard';

    protected doBeforeUI() {
        this.currentLayoutId = appLoaderService.getCurrentLayoutId();
        const updateLayout = () => {
            this.currentLayoutId = appLoaderService.getCurrentLayoutId();
            this.requestUpdate();
        };
        window.addEventListener('app-loaded', updateLayout);
        window.addEventListener('layout-changed', updateLayout);
        return () => {
            window.removeEventListener('app-loaded', updateLayout);
            window.removeEventListener('layout-changed', updateLayout);
        };
    }

    private async handleSelect(e: CustomEvent) {
        const layoutId = e.detail?.item?.value;
        if (!layoutId || layoutId === this.currentLayoutId) return;
        try {
            await appLoaderService.setPreferredLayoutId(layoutId);
        } catch (err) {
            console.error('Failed to switch layout:', err);
        }
    }

    protected render() {
        const layouts = appLoaderService.getRegisteredLayouts();
        if (layouts.length <= 1) {
            return html``;
        }

        const currentLayout = layouts.find((l) => l.id === this.currentLayoutId);
        const layoutName = currentLayout?.name ?? this.currentLayoutId;

        return html`
            <wa-dropdown
                placement="bottom-end"
                distance="4"
                size="small"
                @wa-select=${this.handleSelect}>
                <wa-button
                    slot="trigger"
                    appearance="plain"
                    size="small"
                    with-caret
                    title="Switch layout (current: ${layoutName})">
                    <wa-icon name="table-cells" label="Layout"></wa-icon>
                </wa-button>
                ${layouts.map(
                    (layout) => html`
                        <wa-dropdown-item
                            value="${layout.id}"
                            type="checkbox"
                            ?checked=${layout.id === this.currentLayoutId}>
                            ${layout.name}
                        </wa-dropdown-item>
                    `
                )}
            </wa-dropdown>
        `;
    }

    static styles = css`
        :host {
            display: inline-block;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'lyra-layout-switcher': LyraLayoutSwitcher;
    }
}
