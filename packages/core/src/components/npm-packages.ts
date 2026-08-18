import { html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { DocksPart } from "../parts/part";
import { appLoaderService } from "../core/apploader";

@customElement("docks-npm-packages")
export class DocksNpmPackages extends DocksPart {
    static styles = [
        css`
            .packages-panel {
                padding: 0.75rem;
                box-sizing: border-box;
            }

            wa-tree-item > span small {
                color: var(--wa-color-neutral-60);
                font-size: 0.875em;
                margin-left: 0.5rem;
            }
        `,
    ];

    protected renderContent() {
        const app = appLoaderService.getCurrentApp();
        const entries = Object.entries(app?.dependencies ?? {});
        if (entries.length === 0) {
            return html`<div class="packages-panel">No package information available.</div>`;
        }

        return html`
            <div class="packages-panel">
                <wa-tree style="--indent-guide-width: 1px;">
                    <wa-tree-item expanded>
                        <span>${app?.name ?? ""}</span>
                        ${entries.map(
                            ([name, version]) => html`
                                <wa-tree-item>
                                    <span>${name} <small>${version}</small></span>
                                </wa-tree-item>
                            `,
                        )}
                    </wa-tree-item>
                </wa-tree>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "docks-npm-packages": DocksNpmPackages;
    }
}
