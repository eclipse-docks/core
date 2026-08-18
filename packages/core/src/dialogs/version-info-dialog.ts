import { html, css } from "lit";
import { customElement } from "lit/decorators.js";
import type { PropertyValues } from "lit";
import { DocksDialogContent } from "../parts/dialog-content";
import { contributionRegistry } from "../core/contributionregistry";
import {
    DIALOG_CONTRIBUTION_TARGET,
    CLOSE_BUTTON,
    type DialogContribution,
    type DialogButton,
    dialogService,
} from "../core/dialogservice";
import { ABOUT_TABS } from "../core/contribution-targets";
import { appLoaderService } from "../core/apploader";

const CLOSE_PRIMARY: DialogButton = { ...CLOSE_BUTTON, variant: "primary" };

@customElement("docks-version-info-dialog-content")
export class DocksVersionInfoDialogContent extends DocksDialogContent {
    static styles = [
        ...DocksDialogContent.styles,
        css`
            :host {
                display: block;
            }

            .dialog-body {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                min-width: 32rem;
                height: 600px;
            }

            .dialog-body docks-tabs {
                flex: 1;
                min-height: 0;
            }
        `,
    ];

    protected firstUpdated(changed: PropertyValues) {
        super.firstUpdated(changed);
        const dialog = this.closest("wa-dialog");
        if (dialog) {
            dialog.style.setProperty("--width", "600px");
            dialog.setAttribute("light-dismiss", "");
        }
    }

    render() {
        const app = appLoaderService.getCurrentApp();

        return html`
            <div class="dialog-body">
                ${app?.description ? html`<small>${app.description}</small>` : ""}
                <docks-tabs id=${ABOUT_TABS}></docks-tabs>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "docks-version-info-dialog-content": DocksVersionInfoDialogContent;
    }
}

contributionRegistry.registerContribution<DialogContribution>(DIALOG_CONTRIBUTION_TARGET, {
    id: "version-info",
    label: "About",
    buttons: [CLOSE_PRIMARY],
    component: () => html`<docks-version-info-dialog-content></docks-version-info-dialog-content>`,
    onButton: async () => true,
});

export function versionInfoDialog(): Promise<void> {
    const app = appLoaderService.getCurrentApp();
    return dialogService.open("version-info", {
        label: `About ${app?.name ?? ""} - ${app?.version ?? "0.0.0"}`,
    });
}
