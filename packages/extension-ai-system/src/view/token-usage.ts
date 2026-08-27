import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { DocksElement } from '@eclipse-docks/core';
import { subscribe, confirmDialog } from '@eclipse-docks/core';
import { tokenUsageTracker, EMPTY_USAGE } from '../service/token-usage-tracker';
import { TOPIC_AI_STREAM_COMPLETE } from '../core/constants';
import type { ProviderTokenUsage } from '../core/types';

@customElement('docks-token-usage')
export class DocksTokenUsage extends DocksElement {
    private totalUsage: ProviderTokenUsage = { ...EMPTY_USAGE };
    private providerUsage: Record<string, ProviderTokenUsage> = {};

    connectedCallback() {
        super.connectedCallback();
        this.loadUsage();
        subscribe(TOPIC_AI_STREAM_COMPLETE, () => { this.loadUsage(); });
    }

    private async loadUsage() {
        this.totalUsage = await tokenUsageTracker.getTotalUsage();
        this.providerUsage = await tokenUsageTracker.getAllProviderUsage();
        this.requestUpdate();
    }

    private formatNumber(num: number): string {
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + 'M';
        if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
        return num.toString();
    }

    private async handleReset() {
        if (await confirmDialog('Reset all token usage statistics?')) {
            await tokenUsageTracker.reset();
            await this.loadUsage();
        }
    }

    private renderStatItem(label: string, value: number) {
        return html`
            <div class="stat-item">
                <span class="stat-label">${label}</span>
                <span class="stat-value">${this.formatNumber(value)}</span>
            </div>
        `;
    }

    protected render() {
        if (this.totalUsage.totalTokens === 0) return html``;

        return html`
            <wa-dropdown placement="top-end" distance="8">
                <wa-button slot="trigger" appearance="plain" size="s" title="Token usage">
                    <wa-icon name="database" label="Tokens" slot="start"></wa-icon>
                    ${this.formatNumber(this.totalUsage.totalTokens)} tokens
                </wa-button>

                <h3>Token Usage</h3>

                <h6>Total</h6>
                <wa-dropdown-item>
                    <span>All providers</span>
                    <div class="stats-row">
                        ${this.renderStatItem('Prompt', this.totalUsage.promptTokens)}
                        ${this.renderStatItem('Completion', this.totalUsage.completionTokens)}
                        ${this.renderStatItem('Total', this.totalUsage.totalTokens)}
                        ${this.renderStatItem('Requests', this.totalUsage.requestCount)}
                    </div>
                </wa-dropdown-item>

                ${Object.keys(this.providerUsage).length > 0 ? html`
                    <wa-divider></wa-divider>
                    <h6>By Provider</h6>
                    ${Object.entries(this.providerUsage).map(([name, usage]) => html`
                        <wa-dropdown-item>
                            <span class="provider-name">${name}</span>
                            <div class="stats-row">
                                ${this.renderStatItem('Prompt', usage.promptTokens)}
                                ${this.renderStatItem('Completion', usage.completionTokens)}
                                ${this.renderStatItem('Total', usage.totalTokens)}
                                ${this.renderStatItem('Req', usage.requestCount)}
                            </div>
                        </wa-dropdown-item>
                    `)}
                ` : ''}

                <wa-divider></wa-divider>
                <wa-dropdown-item variant="danger" @click="${() => this.handleReset()}">
                    <wa-icon name="trash" slot="icon"></wa-icon>
                    Reset statistics
                </wa-dropdown-item>
            </wa-dropdown>
        `;
    }

    static styles = css`
        :host { display: inline-block; }

        wa-dropdown::part(menu) { min-width: 320px; max-width: 420px; }

        h3 {
            padding: var(--wa-space-s) var(--wa-space-m);
            margin: 0;
            font-weight: 600;
            font-size: 0.95em;
        }

        h6 {
            padding: var(--wa-space-xs) var(--wa-space-m);
            margin: 0;
            font-weight: 600;
            font-size: 0.85em;
            color: var(--wa-color-neutral-text-subtle);
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .provider-name { font-weight: 500; }

        .stats-row { display: flex; gap: var(--wa-space-m); font-size: 0.875rem; }

        .stat-item {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }

        .stat-label { font-size: 0.8em; color: var(--wa-color-neutral-text-subtle); }
        .stat-value { font-weight: 600; }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'docks-token-usage': DocksTokenUsage;
    }
}
