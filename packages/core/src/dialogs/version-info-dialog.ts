import { html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { PropertyValues } from "lit";
import { DocksDialogContent } from "../parts/dialog-content";
import { contributionRegistry } from "../core/contributionregistry";
import {
    DIALOG_CONTRIBUTION_TARGET,
    type DialogContribution,
    dialogService,
} from "../core/dialogservice";
import { ABOUT_TABS } from "../core/contribution-targets";
import { ABOUT_TAB_RELEASE } from "../core/contribution-names";
import { appLoaderService } from "../core/apploader";
import { DocksReleaseHistory, type ReleaseHistoryNavState } from "../components/release-history";
import type { DocksTabs } from "../parts/tabs";

const EMPTY_NAV: ReleaseHistoryNavState = {
    hasMultiple: false,
    atOldest: true,
    atNewest: true,
};

@customElement("docks-version-info-dialog")
export class DocksVersionInfoDialog extends DocksDialogContent {
    @property({ type: String })
    label = "";

    @property({ attribute: false })
    close?: () => void;

    @property({ attribute: false })
    onAfterHide?: () => void;

    @state()
    private activeTab: string | null = null;

    @state()
    private releaseNav: ReleaseHistoryNavState = EMPTY_NAV;

    static styles = [
        ...DocksDialogContent.styles,
        css`
            :host {
                display: block;
            }

            wa-dialog {
                --width: 600px;
            }

            wa-dialog::part(body) {
                display: flex;
                flex-direction: column;
                min-height: 0;
                overflow: hidden;
            }

            .dialog-body {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                min-width: 32rem;
                height: min(70vh, 36rem);
                min-height: min(70vh, 36rem);
                overflow: hidden;
            }

            .dialog-body docks-tabs {
                flex: 1 1 auto;
                min-height: 0;
                overflow: hidden;
            }

            .dialog-footer {
                display: flex;
                gap: 0.5rem;
                justify-content: flex-end;
                width: 100%;
            }
        `,
    ];

    protected firstUpdated(changed: PropertyValues) {
        super.firstUpdated(changed);
        this.addEventListener("release-history-changed", this.onReleaseHistoryChanged);
        this.updateComplete.then(() => {
            this.attachTabListener();
            this.syncActiveTab();
            this.syncReleaseNav();
        });
    }

    disconnectedCallback() {
        this.removeEventListener("release-history-changed", this.onReleaseHistoryChanged);
        super.disconnectedCallback();
    }

    private onReleaseHistoryChanged = () => {
        this.syncReleaseNav();
    };

    private attachTabListener() {
        const tabGroup = this.getAboutTabs()?.shadowRoot?.querySelector("wa-tab-group");
        if (!tabGroup || tabGroup.hasAttribute("data-version-info-listener")) {
            return;
        }
        tabGroup.setAttribute("data-version-info-listener", "");
        tabGroup.addEventListener("wa-tab-show", (event: Event) => {
            const name = (event as CustomEvent<{ name: string }>).detail?.name;
            if (name) {
                this.activeTab = name;
            }
        });
    }

    private getAboutTabs(): DocksTabs | null {
        return this.renderRoot.querySelector("docks-tabs") as DocksTabs | null;
    }

    private getReleaseHistory(): DocksReleaseHistory | null {
        const part = this.getAboutTabs()?.getTabPart(ABOUT_TAB_RELEASE);
        return part instanceof DocksReleaseHistory ? part : null;
    }

    private syncActiveTab() {
        const tabGroup = this.getAboutTabs()?.shadowRoot?.querySelector("wa-tab-group") as
            | (HTMLElement & { active?: string })
            | null;
        this.activeTab = tabGroup?.getAttribute("active") || tabGroup?.active || null;
    }

    private syncReleaseNav() {
        this.releaseNav = this.getReleaseHistory()?.getNavState() ?? EMPTY_NAV;
    }

    private handleClose() {
        const dialog = this.renderRoot.querySelector("wa-dialog") as (HTMLElement & { open?: boolean }) | null;
        if (dialog?.open !== false) {
            dialog.open = false;
            return;
        }
        this.close?.();
    }

    private handleAfterHide() {
        this.onAfterHide?.();
    }

    private showOlderRelease() {
        this.getReleaseHistory()?.showOlder();
    }

    private showNewerRelease() {
        this.getReleaseHistory()?.showNewer();
    }

    render() {
        const app = appLoaderService.getCurrentApp();
        const onReleaseTab = this.activeTab === ABOUT_TAB_RELEASE;
        const showReleaseNav = onReleaseTab && this.releaseNav.hasMultiple;

        return html`
            <wa-dialog
                label=${this.label}
                open
                light-dismiss
                with-footer
                @wa-after-hide=${this.handleAfterHide}
            >
                <div class="dialog-body">
                    ${app?.description ? html`<small>${app.description}</small>` : ""}
                    <docks-tabs id=${ABOUT_TABS} fill-height></docks-tabs>
                </div>
                <div slot="footer" class="dialog-footer">
                    ${showReleaseNav
                        ? html`
                            <wa-button
                                variant="default"
                                ?disabled=${this.releaseNav.atOldest}
                                @click=${this.showOlderRelease}
                            >
                                ← Previous
                            </wa-button>
                            <wa-button
                                variant="default"
                                ?disabled=${this.releaseNav.atNewest}
                                @click=${this.showNewerRelease}
                            >
                                Next →
                            </wa-button>
                        `
                        : nothing}
                    <wa-button variant="primary" @click=${this.handleClose}>Close</wa-button>
                </div>
            </wa-dialog>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "docks-version-info-dialog": DocksVersionInfoDialog;
    }
}

contributionRegistry.registerContribution<DialogContribution>(DIALOG_CONTRIBUTION_TARGET, {
    id: "version-info",
    label: "About",
    selfContained: true,
    component: (state) => html`
        <docks-version-info-dialog
            .label=${state?.label ?? ""}
            .close=${state?.close}
            .onAfterHide=${state?.onAfterHide}
        ></docks-version-info-dialog>
    `,
});

export function versionInfoDialog(): Promise<void> {
    const app = appLoaderService.getCurrentApp();
    return dialogService.open("version-info", {
        label: `About ${app?.name ?? ""} - ${app?.version ?? "0.0.0"}`,
    });
}
