import { html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { DocksPart } from "../parts/part";
import { appLoaderService, type ReleaseEntry } from "../core/apploader";
import { parseMarkdownHtml } from "../core/markdown-html";
import { createLogger } from "../core/logger";

const logger = createLogger("ReleaseHistory");

async function loadReleases(
    releaseHistory?: ReleaseEntry[] | (() => ReleaseEntry[] | Promise<ReleaseEntry[]>),
): Promise<ReleaseEntry[]> {
    if (!releaseHistory) return [];
    if (typeof releaseHistory !== "function") return releaseHistory;

    try {
        return await releaseHistory();
    } catch (error) {
        logger.error(
            `Failed to load release history from app: ${error instanceof Error ? error.message : String(error)}`,
        );
        return [];
    }
}

function semverEqual(a: string, b: string): boolean {
    return a.replace(/^v/i, "") === b.replace(/^v/i, "");
}

function isNewerThan(releaseTag: string, currentVersion: string): boolean {
    const currentParts = currentVersion.replace(/^v/i, "").split(".").map(Number);
    const releaseParts = releaseTag.replace(/^v/i, "").split(".").map(Number);
    for (let i = 0; i < Math.max(currentParts.length, releaseParts.length); i++) {
        const current = currentParts[i] || 0;
        const releasePart = releaseParts[i] || 0;
        if (releasePart > current) return true;
        if (releasePart < current) return false;
    }
    return false;
}

export type ReleaseHistoryNavState = {
    hasMultiple: boolean;
    atOldest: boolean;
    atNewest: boolean;
};

@customElement("docks-release-history")
export class DocksReleaseHistory extends DocksPart {
    protected scrollMode: "scroller" | "native" | "none" = "none";

    @state()
    private appVersion = "0.0.0";

    @state()
    private releases: ReleaseEntry[] = [];

    @state()
    private currentReleaseIndex = 0;

    static styles = [
        css`
            .release-panel {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                padding: 0.75rem;
                box-sizing: border-box;
            }

            .release-body {
                white-space: normal;
            }
        `,
    ];

    protected doInitUI() {
        void this.load();
    }

    private async load() {
        const app = appLoaderService.getCurrentApp();
        this.appVersion = app?.version ?? "0.0.0";
        this.releases = await loadReleases(app?.releaseHistory);
        const currentIndex = this.releases.findIndex((release) =>
            semverEqual(release.tag_name, this.appVersion),
        );
        this.currentReleaseIndex = currentIndex >= 0 ? currentIndex : 0;
        this.notifyChanged();
    }

    public getNavState(): ReleaseHistoryNavState {
        return {
            hasMultiple: this.releases.length > 1,
            atOldest: this.currentReleaseIndex >= this.releases.length - 1,
            atNewest: this.currentReleaseIndex <= 0,
        };
    }

    public showOlder() {
        if (this.currentReleaseIndex < this.releases.length - 1) {
            this.currentReleaseIndex += 1;
            this.notifyChanged();
        }
    }

    public showNewer() {
        if (this.currentReleaseIndex > 0) {
            this.currentReleaseIndex -= 1;
            this.notifyChanged();
        }
    }

    private notifyChanged() {
        this.dispatchEvent(new CustomEvent("release-history-changed", { bubbles: true, composed: true }));
    }

    protected renderContent() {
        const release = this.releases[this.currentReleaseIndex];
        if (!release) {
            return html`<div class="release-panel">No release history available.</div>`;
        }

        const isCurrent = semverEqual(release.tag_name, this.appVersion);
        const showUpdateHint = !isCurrent && isNewerThan(release.tag_name, this.appVersion);
        const bodyHtml = release.body ? parseMarkdownHtml(release.body) : "";

        return html`
            <div class="release-panel">
                <p>
                    <strong>Version:</strong> ${release.tag_name}${isCurrent ? " (Current)" : ""}
                </p>
                <p>
                    <strong>Released:</strong>
                    <wa-format-date
                        .date=${release.published_at}
                        month="short"
                        day="numeric"
                        year="numeric"
                    ></wa-format-date>
                </p>
                ${showUpdateHint
                    ? html`
                        <wa-callout variant="warning">
                            <wa-icon slot="icon" name="triangle-exclamation"></wa-icon>
                            Update available — reload the page to update
                        </wa-callout>
                    `
                    : ""}
                ${bodyHtml
                    ? html`<div class="release-body">${unsafeHTML(bodyHtml)}</div>`
                    : ""}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "docks-release-history": DocksReleaseHistory;
    }
}
