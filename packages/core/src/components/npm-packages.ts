import { html, css, nothing, type TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { DocksPart } from "../parts/part";
import { appLoaderService } from "../core/apploader";
import {
    normalizeDependencyInfo,
    type ResolvedDependencyInfo,
} from "../core/resolved-package-info";

function packageLink(info: ResolvedDependencyInfo): string | undefined {
    return info.homepage ?? info.repository;
}

@customElement("docks-npm-packages")
export class DocksNpmPackages extends DocksPart {
    protected scrollMode: "scroller" | "native" | "none" = "none";

    static styles = [
        css`
            .packages-panel {
                padding: 0.75rem;
                box-sizing: border-box;
            }

            .pkg-name a {
                color: inherit;
                text-decoration: underline;
                text-underline-offset: 0.12em;
            }

            .pkg-meta {
                color: var(--wa-color-neutral-60);
                font-size: 0.875em;
            }

            .pkg-meta-label {
                font-weight: 600;
                color: var(--wa-color-neutral-50);
            }
        `,
    ];

    private renderPackageName(name: string, info: ResolvedDependencyInfo) {
        const link = packageLink(info);
        return html`
            <span class="pkg-name">
                ${link
                    ? html`<a href=${link} target="_blank" rel="noopener noreferrer">${name}</a>`
                    : name}
            </span>
        `;
    }

    private renderMetaRows(info: ResolvedDependencyInfo) {
        return html`
            ${info.license
                ? html`
                      <wa-tree-item>
                          <span class="pkg-meta">
                              <span class="pkg-meta-label">License:</span> ${info.license}
                          </span>
                      </wa-tree-item>
                  `
                : nothing}
            ${info.description
                ? html`
                      <wa-tree-item>
                          <span class="pkg-meta">
                              <span class="pkg-meta-label">Description:</span> ${info.description}
                          </span>
                      </wa-tree-item>
                  `
                : nothing}
        `;
    }

    private renderDependencyNode(
        name: string,
        info: ResolvedDependencyInfo | undefined,
        nested: Record<string, string[]>,
        allDependencies: Record<string, ResolvedDependencyInfo>,
    ): TemplateResult | typeof nothing {
        if (!info) {
            return nothing;
        }

        const children = nested[name] ?? [];
        const hasChildren = children.length > 0 || info.license || info.description;

        return html`
            <wa-tree-item ?expanded=${hasChildren}>
                ${this.renderPackageName(name, info)}
                ${this.renderMetaRows(info)}
                ${children.map((childName) => {
                    const childInfo = normalizeDependencyInfo(allDependencies[childName]);
                    if (!childInfo) {
                        return nothing;
                    }
                    return this.renderDependencyNode(
                        childName,
                        childInfo,
                        nested,
                        allDependencies,
                    );
                })}
            </wa-tree-item>
        `;
    }

    protected renderContent() {
        const app = appLoaderService.getCurrentApp();
        const dependencies = app?.dependencies ?? {};
        const directDependencies =
            app?.directDependencies && app.directDependencies.length > 0
                ? app.directDependencies
                : Object.keys(dependencies);
        const nestedDependencies = app?.nestedDependencies ?? {};

        if (directDependencies.length === 0) {
            return html`<div class="packages-panel">No package information available.</div>`;
        }

        return html`
            <div class="packages-panel">
                <wa-tree style="--indent-guide-width: 1px;">
                    <wa-tree-item expanded>
                        <span>${app?.name ?? ""}</span>
                        ${directDependencies.map((name) =>
                            this.renderDependencyNode(
                                name,
                                normalizeDependencyInfo(dependencies[name]),
                                nestedDependencies,
                                dependencies,
                            ),
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
