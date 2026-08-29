import { html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { DocksElement } from "../parts/element";
import { icon } from '../core/icon-utils';
import {
    DEFAULT_LAYOUT_PANEL_VISIBILITY,
    findStandardLayout,
    LAYOUT_PANEL_OPTIONS,
    type LayoutPanelVisibility,
} from "../core/layout-panels";

@customElement('docks-layout-switcher')
export class DocksLayoutSwitcher extends DocksElement {
    @state()
    private panels: LayoutPanelVisibility = { ...DEFAULT_LAYOUT_PANEL_VISIBILITY };

    protected doBeforeUI() {
        const syncPanels = () => {
            const layout = findStandardLayout();
            this.panels = layout?.getPanelVisibility() ?? { ...DEFAULT_LAYOUT_PANEL_VISIBILITY };
            this.requestUpdate();
        };
        syncPanels();
        window.addEventListener('app-loaded', syncPanels);
        window.addEventListener('layout-panels-changed', syncPanels);
        return () => {
            window.removeEventListener('app-loaded', syncPanels);
            window.removeEventListener('layout-panels-changed', syncPanels);
        };
    }

    private async handleSelect(e: CustomEvent) {
        const layout = findStandardLayout();
        if (!layout) {
            return;
        }

        const item = e.detail?.item as (HTMLElement & { value?: string; checked?: boolean }) | undefined;
        const key = item?.value as keyof LayoutPanelVisibility | undefined;
        if (!item || !key) {
            return;
        }
        try {
            await layout.setPanelVisibility({
                [key]: item.checked ?? false,
            });
            this.panels = layout.getPanelVisibility();
        } catch (err) {
            console.error('Failed to update layout panels:', err);
        }
    }

    protected render() {
        if (!findStandardLayout()) {
            return html``;
        }

        return html`
            <wa-dropdown
                placement="bottom-end"
                distance="4"
                size="s"
                @wa-select=${this.handleSelect}>
                <wa-button
                    slot="trigger"
                    appearance="plain"
                    size="s"
                    with-caret
                    title="Show or hide layout panels">
                    <wa-icon name="table-cells" label="Layout panels"></wa-icon>
                </wa-button>
                ${LAYOUT_PANEL_OPTIONS.map(
                    (panel) => html`
                        <wa-dropdown-item
                            value="${panel.key}"
                            type="checkbox"
                            ?checked=${this.panels[panel.key]}>
                            ${icon(panel.icon, { label: panel.label, slot: 'icon' })}
                            ${panel.label}
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
        'docks-layout-switcher': DocksLayoutSwitcher;
    }
}
