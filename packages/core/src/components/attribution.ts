import { html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { DocksPart } from "../parts/part";
import {
    contributionRegistry,
    getContributionVisible,
    TOPIC_CONTRIBUTEIONS_CHANGED,
    type ContributionChangeEvent,
    type HTMLContribution,
} from "../core/contributionregistry";
import { SYSTEM_ATTRIBUTIONS } from "../core/contribution-targets";

function renderHtmlContribution(contribution: HTMLContribution) {
    const contents = contribution.component;
    if (contents instanceof Function) {
        return contents();
    }
    return unsafeHTML(contents);
}

@customElement("docks-attribution")
export class DocksAttributionPart extends DocksPart {
    @state()
    private attributions: HTMLContribution[] = [];

    static styles = [
        css`
            .attributions {
                display: flex;
                flex-direction: column;
                gap: 1.25rem;
                padding: 0.75rem;
                box-sizing: border-box;
            }

            .attribution h3 {
                margin: 0 0 0.5rem;
                font-size: var(--wa-font-size-m);
            }

            .attribution p {
                margin: 0 0 0.5rem;
            }

            .attribution p:last-child {
                margin-bottom: 0;
            }
        `,
    ];

    protected doBeforeUI() {
        this.loadAttributions();
        this.subscribe(TOPIC_CONTRIBUTEIONS_CHANGED, (event: ContributionChangeEvent) => {
            if (event.target === SYSTEM_ATTRIBUTIONS) {
                this.loadAttributions();
            }
        });
    }

    private loadAttributions() {
        this.attributions = contributionRegistry
            .getContributions<HTMLContribution>(SYSTEM_ATTRIBUTIONS)
            .filter((contribution) => "component" in contribution && getContributionVisible(contribution));
    }

    protected renderContent() {
        if (this.attributions.length === 0) {
            return html`<div class="attributions">No attributions to display.</div>`;
        }

        return html`
            <div class="attributions">
                ${this.attributions.map(
                    (contribution) => html`
                        <section class="attribution">
                            ${contribution.label
                                ? html`<h3>${contribution.label}</h3>`
                                : nothing}
                            ${renderHtmlContribution(contribution)}
                        </section>
                    `,
                )}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "docks-attribution": DocksAttributionPart;
    }
}
