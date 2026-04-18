import {css, html, nothing} from 'lit'
import {customElement, property, state} from 'lit/decorators.js'
import {DocksElement} from "./element";
import {styleMap} from 'lit/directives/style-map.js';
import {
    CommandContribution,
    Contribution,
    ContributionChangeEvent,
    contributionRegistry,
    HTMLContribution,
    TOPIC_CONTRIBUTEIONS_CHANGED
} from "../core/contributionregistry";
import {Signal} from '@lit-labs/signals';
import {unsafeHTML} from "lit/directives/unsafe-html.js";
import {subscribe} from "../core/events";
import { icon } from "../core/icon-utils";

const RESIZE_DEBOUNCE_MS = 150;

type ToolbarSlotName = 'start' | undefined | 'end';

function renderButtonGroup(
    slotName: ToolbarSlotName,
    orientation: 'horizontal' | 'vertical',
    contributions: Contribution[],
    isToolbarItem: (c: Contribution) => boolean,
    contributionCreator: (c: Contribution) => unknown
) {
    const slot = slotName ?? 'default';
    const label = `Toolbar ${slot}`;
    const items = contributions.filter(c => c.slot === slotName && isToolbarItem(c));
    const slotHtml = slotName === 'start'
        ? html`<slot name="start"></slot>`
        : slotName === 'end'
            ? html`<slot name="end"></slot>`
            : html`<slot></slot>`;
    return html`
        <wa-button-group orientation=${orientation} label=${label}>
            ${slotHtml}
            ${items.map(contributionCreator)}
        </wa-button-group>
    `;
}

@customElement('docks-toolbar')
export class DocksToolbar extends DocksElement {
    @property()
    private position: "start" | "center" | "end" = "start";

    @property({reflect: true})
    orientation: "horizontal" | "vertical" = "horizontal";

    @property({reflect: true})
    align: "start" | "center" | "end" = "start";

    @property({reflect: true})
    size: "small" | "medium" | "large" = "small";

    @property({attribute: false})
    scopeTokens: string[] = [];

    @property({attribute: false})
    public partToolbarContent?: any = undefined;

    @property({attribute: false})
    public partToolbarRenderer?: () => any = undefined;

    @state()
    private contributions: Contribution[] = [];

    @state()
    private compact = false;

    private resizeObserver: ResizeObserver | null = null;
    private resizeDebounceTimer: ReturnType<typeof setTimeout> | null = null;
    private overflowCheckScheduled = false;

    private updateCompactFromSpace() {
        const toolbarItems = this.shadowRoot?.querySelector('.toolbar-items') as HTMLElement | null;
        if (!toolbarItems) return;
        const trimmed = toolbarItems.scrollWidth > toolbarItems.clientWidth;
        if (this.compact !== trimmed) {
            this.compact = trimmed;
            this.requestUpdate();
        }
    }

    private scheduleOverflowCheck() {
        if (this.overflowCheckScheduled) return;
        this.overflowCheckScheduled = true;
        requestAnimationFrame(() => {
            this.overflowCheckScheduled = false;
            this.updateCompactFromSpace();
        });
    }

    private onResize = () => {
        if (this.resizeDebounceTimer !== null) clearTimeout(this.resizeDebounceTimer);
        this.resizeDebounceTimer = setTimeout(() => {
            this.resizeDebounceTimer = null;
            this.updateCompactFromSpace();
        }, RESIZE_DEBOUNCE_MS);
    };

    connectedCallback() {
        super.connectedCallback();
        this.resizeObserver = new ResizeObserver(this.onResize);
        this.resizeObserver.observe(this);
    }

    disconnectedCallback() {
        this.resizeObserver?.disconnect();
        this.resizeObserver = null;
        if (this.resizeDebounceTimer !== null) {
            clearTimeout(this.resizeDebounceTimer);
            this.resizeDebounceTimer = null;
        }
        super.disconnectedCallback();
    }

    updated(changedProperties: Map<string, unknown>) {
        super.updated?.(changedProperties);
        if (!this.compact) this.scheduleOverflowCheck();
        if (changedProperties.has('scopeTokens')) {
            this.refreshContributions();
        }
    }

    attributeChangedCallback(name: string, old: string | null, value: string | null) {
        super.attributeChangedCallback(name, old, value);
        if (name === 'id' && old !== value) {
            this.refreshContributions();
        }
    }

    protected doBeforeUI() {
        this.refreshContributions();

        subscribe(TOPIC_CONTRIBUTEIONS_CHANGED, (event: ContributionChangeEvent) => {
            const id = this.getAttribute("id");
            if (!id) return;
            
            const shouldReload = this.matchesTarget(id, event.target);
            if (shouldReload) {
                this.refreshContributions();
                this.requestUpdate()
            }
        })
    }

    private refreshContributions() {
        const id = this.getAttribute("id");
        if (!id) {
            this.contributions = [];
            return;
        }
        this.loadContributions(id);
    }


    private matchesTarget(id: string, target: string): boolean {
        if (target === id) return true;
        
        if (!id.includes(':')) return false;
        
        const [prefix] = id.split(':');
        if (target === `${prefix}:*`) return true;
        
        const targetParts = target.split(':');
        if (targetParts.length === 2) {
            const categoryToken = targetParts[1];
            if (this.scopeTokens.includes(categoryToken)) {
                return id.startsWith(`${prefix}:`);
            }
        }
        
        return false;
    }

    private loadContributions(id: string) {
        const specific = contributionRegistry.getContributions(id);
        
        if (!id.includes(':')) {
            this.contributions = specific;
            return;
        }
        
        const [prefix] = id.split(':');
        const wildcardId = `${prefix}:*`;
        const wildcard = contributionRegistry.getContributions(wildcardId);
        
        const categoryMatches: Contribution[] = [];

        for (const category of this.scopeTokens) {
            const categoryId = `${prefix}:${category}`;
            const matches = contributionRegistry.getContributions(categoryId);
            categoryMatches.push(...matches);
        }
        
        this.contributions = [...wildcard, ...categoryMatches, ...specific];
    }

    private isToolbarItem(contribution: Contribution): boolean {
        return "command" in contribution || "component" in contribution;
    }

    contributionCreator(contribution: Contribution) {
        if ("command" in contribution) {
            const commandContribution = contribution as CommandContribution;
            const showLabel = !this.compact && !!commandContribution.showLabel;
            return html`
                <wa-button @click=${() => void this.executeCommand(commandContribution.command, commandContribution.params || {})}
                           title=${commandContribution.label}
                           ?disabled="${(commandContribution.disabled as Signal.Computed<boolean>)?.get()}"
                           appearance="plain" size=${this.size}>
                    ${icon(commandContribution.icon, { label: commandContribution.label })}
                    ${showLabel ? commandContribution.label : ''}
                </wa-button>
            `;
        }
        if ("component" in contribution) {
            const contents = (contribution as HTMLContribution).component
            if (contents instanceof Function) {
                return contents()
            }
            return unsafeHTML(contents)
        }
        return html`<span>unknown contribution type: ${typeof contribution}</span>`
    }

    render() {
        const partContent = this.partToolbarRenderer ? this.partToolbarRenderer() :
            (this.partToolbarContent ? this.partToolbarContent : '');
        const flexDir = this.orientation === "vertical" ? "column" : "row";
        const alignMap = { start: "flex-start", center: "center", end: "flex-end" } as const;
        const bindCreator = this.contributionCreator.bind(this);
        const bindIsItem = this.isToolbarItem.bind(this);
        return html`
            <div class="toolbar-items" style=${styleMap({
                "flex-direction": flexDir,
                "align-items": alignMap[this.align],
                "justify-content": this.position
            })}>
                ${renderButtonGroup('start', this.orientation, this.contributions, bindIsItem, bindCreator)}
                ${partContent}
                ${renderButtonGroup(undefined, this.orientation, this.contributions, bindIsItem, bindCreator)}
                ${renderButtonGroup('end', this.orientation, this.contributions, bindIsItem, bindCreator)}
            </div>
        `;
    }

    static styles = css`
        :host {
            display: flex;
            flex-direction: row;
            --wa-form-control-padding-inline: var(--wa-space-2xs);
        }

        :host([orientation="vertical"]) {
            flex-direction: column;
        }

        .toolbar-items {
            display: flex;
            flex: 1;
            gap: var(--wa-space-2xs);
        }
    `
}

declare global {
    interface HTMLElementTagNameMap {
        'docks-toolbar': DocksToolbar
    }
}
