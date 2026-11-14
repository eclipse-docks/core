import { contributionRegistry } from "../core/contributionregistry";
import { TOOLBAR_BOTTOM_END } from "../core/contribution-targets";
import { TOOLBAR_TOASTS } from "../core/contribution-names";
import { customElement } from "lit/decorators.js";
import { DocksElement } from "../parts/element";
import { css, html, nothing } from "lit";
import { icon } from "../core/icon-utils";
import { i18n } from "../core/i18n";
import {
    clearToasts,
    listToasts,
    toastsSignal,
    type ToastEntry,
} from "../core/toast";

const t = await i18n(import.meta.glob('./toasts*.json'));

contributionRegistry.registerContribution(TOOLBAR_BOTTOM_END, {
    name: TOOLBAR_TOASTS,
    label: "Toasts",
    ranking: 50,
    component: "<docks-toasts></docks-toasts>",
});

function toastIcon(entry: ToastEntry): string {
    if (entry.variant === 'danger') return 'circle-exclamation';
    if (entry.variant === 'warning') return 'triangle-exclamation';
    return 'circle-info';
}

@customElement('docks-toasts')
export class DocksToasts extends DocksElement {
    static styles = css`
        :host {
            display: flex;
            align-items: center;
        }

        wa-dropdown::part(menu) {
            max-width: 24rem;
            max-height: 18rem;
        }

        wa-dropdown-item {
            white-space: normal;
        }

        /* The trigger caret hides the button end slot, and the badge's corner placement is clipped by the toolbar. */
        wa-badge {
            position: static !important;
            translate: none !important;
            inset: auto !important;
            margin-inline-start: var(--wa-space-2xs);
        }
    `;

    protected doBeforeUI() {
        this.watch(toastsSignal, () => this.requestUpdate());
    }

    private handleSelect(event: CustomEvent) {
        const item = event.detail?.item as { value?: string } | undefined;
        if (item?.value !== 'clear') return;
        clearToasts();
    }

    protected render() {
        toastsSignal.get();
        const entries = listToasts();
        if (!entries.length) return html``;

        const pending = entries.filter((entry) => entry.state === 'pending').length;
        const title = String(t.TOASTS_TITLE({
            pending: String(pending),
            emitted: String(entries.length - pending),
        }));
        const pendingDanger = entries.some((entry) => entry.state === 'pending' && entry.variant === 'danger');

        return html`
            <wa-dropdown placement="top-end" distance="4" size="s" @wa-select=${this.handleSelect}>
                <wa-button slot="trigger" appearance="plain" size="s" with-caret title=${title}>
                    ${icon('bell', { label: String(t.TOASTS), slot: 'start' })}
                    ${pending > 0
                        ? html`<wa-badge variant=${pendingDanger ? 'danger' : 'warning'} pill>${pending}</wa-badge>`
                        : nothing}
                </wa-button>
                <wa-dropdown-item value="clear">
                    ${icon('trash', { label: String(t.CLEAR), slot: 'icon' })}
                    ${t.CLEAR}
                </wa-dropdown-item>
                ${entries.map((entry) => html`
                    <wa-dropdown-item>
                        ${icon(toastIcon(entry), { label: entry.variant, slot: 'icon' })}
                        ${entry.message}
                        ${entry.state === 'pending'
                            ? html`<span slot="details">${t.PENDING}</span>`
                            : nothing}
                    </wa-dropdown-item>
                `)}
            </wa-dropdown>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'docks-toasts': DocksToasts;
    }
}
