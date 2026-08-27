import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import type { ToolCall } from '../../core/types';

export interface ToolApprovalRequest {
    toolCalls: ToolCall[];
    message: string;
}

export interface PendingApproval {
    role: string;
    request: ToolApprovalRequest;
    resolve: (approved: boolean) => void;
    alwaysAllowSelections: Map<string, boolean>;
}

@customElement('docks-ai-tool-approval')
export class AIToolApproval extends LitElement {
    @property({ type: Map, attribute: false })
    public pendingApprovals = new Map<string, PendingApproval>();

    private approve(approvalId: string, approval: PendingApproval) {
        this.dispatchEvent(new CustomEvent('approve', {
            detail: { approvalId, approval },
            bubbles: true, composed: true
        }));
        approval.resolve(true);
        this.pendingApprovals.delete(approvalId);
        this.requestUpdate();
    }

    private deny(approvalId: string, approval: PendingApproval) {
        approval.resolve(false);
        this.pendingApprovals.delete(approvalId);
        this.requestUpdate();
    }

    private formatArgs(argsStr: string): string {
        let parsed: any = {};
        try { parsed = JSON.parse(argsStr); } catch { /* noop */ }
        return Object.entries(parsed).map(([k, v]) => `${k}=${JSON.stringify(v)}`).join(', ');
    }

    render() {
        if (this.pendingApprovals.size === 0) return html``;

        return html`
            <div class="approval-container">
                ${Array.from(this.pendingApprovals.entries()).map(([id, approval]) => {
                    const toolCalls = approval.request.toolCalls;
                    const first = toolCalls[0];
                    const summaryText = toolCalls.length === 1
                        ? `AI wants to execute: ${first?.function.name}()`
                        : `AI wants to execute ${toolCalls.length} tools`;

                    return html`
                        <wa-details class="approval-item">
                            <span slot="summary" class="approval-summary">
                                <span>${summaryText}</span>
                                <div class="approval-inline-actions">
                                    <wa-button appearance="plain" size="s" variant="neutral"
                                        @click="${(e: Event) => { e.stopPropagation(); this.deny(id, approval); }}">
                                        <wa-icon name="xmark" label="Deny"></wa-icon>
                                    </wa-button>
                                    <wa-button appearance="plain" size="s" variant="success"
                                        @click="${async (e: Event) => { e.stopPropagation(); this.approve(id, approval); }}">
                                        <wa-icon name="check" label="Approve"></wa-icon>
                                    </wa-button>
                                </div>
                            </span>
                            <div class="approval-detail">
                                <strong>${approval.role} wants to execute:</strong>
                                <ul class="tool-list">
                                    ${repeat(toolCalls, tc => tc.id, (tc) => {
                                        const argsStr = this.formatArgs(tc.function.arguments || '{}');
                                        const isSelected = approval.alwaysAllowSelections.get(tc.id) || false;
                                        return html`
                                            <li class="tool-item">
                                                <label class="always-allow-label">
                                                    <wa-checkbox
                                                        ?checked="${isSelected}"
                                                        @change="${(e: Event) => {
                                                            approval.alwaysAllowSelections.set(tc.id, (e.target as any).checked);
                                                            this.requestUpdate();
                                                        }}">
                                                    </wa-checkbox>
                                                    <span>Always allow</span>
                                                </label>
                                                <code>${tc.function.name}(${argsStr})</code>
                                            </li>
                                        `;
                                    })}
                                </ul>
                            </div>
                        </wa-details>
                    `;
                })}
            </div>
        `;
    }

    static styles = css`
        :host { display: block; }

        .approval-container {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            padding: 0.75rem 1rem;
            border-top: solid var(--wa-border-width-s) var(--wa-color-warning-border-normal);
            background-color: var(--wa-color-warning-fill-quiet);
        }

        .approval-summary {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            width: 100%;
        }

        .approval-inline-actions { display: flex; gap: 0.5rem; flex-shrink: 0; }

        .approval-detail {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            padding: 0.75rem 0;
            font-size: 0.875rem;
        }

        .tool-list { margin: 0.5rem 0 0 1.5rem; padding: 0; list-style: disc; }

        .tool-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin: 0.5rem 0;
        }

        .always-allow-label {
            display: flex;
            align-items: center;
            gap: 0.375rem;
            cursor: pointer;
        }

        code {
            font-family: var(--wa-font-mono);
            font-size: 0.875rem;
            padding: 0.125rem 0.25rem;
            background-color: var(--wa-color-neutral-fill-subtle);
            border-radius: var(--wa-border-radius-s);
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'docks-ai-tool-approval': AIToolApproval;
    }
}
