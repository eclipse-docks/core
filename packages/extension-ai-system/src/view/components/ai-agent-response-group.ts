import { css, customElement, html, LitElement, property, repeat, when } from '@eclipse-docks/core/externals/lit';
import type { ChatMessage } from '../../core/types';
import type { AgentResponseGroup, AgentResponseInfo } from '../agent-group-manager';
import './ai-chat-message';

@customElement('docks-ai-agent-response-group')
export class AIAgentResponseGroup extends LitElement {
    @property({ type: Object, attribute: false })
    public group?: AgentResponseGroup;

    @property({ type: Function, attribute: false })
    public findStreamingMessage?: (role: string) => ChatMessage | undefined;

    private copyToClipboard(text: string) {
        navigator.clipboard.writeText(text).catch(err => console.error('Failed to copy:', err));
    }

    private renderStatusIcon(status: AgentResponseInfo['status']) {
        switch (status) {
            case 'streaming': return html`<wa-icon name="spinner" class="spinning"></wa-icon>`;
            case 'completed': return html`<wa-icon name="check-circle" class="status-success"></wa-icon>`;
            case 'error': return html`<wa-icon name="exclamation-circle" class="status-error"></wa-icon>`;
        }
    }

    private renderCard(agentInfo: AgentResponseInfo, message: ChatMessage | undefined) {
        if (!message) {
            return html`
                <div class="agent-card status-${agentInfo.status}">
                    <div class="agent-card-header">
                        <wa-icon name="${agentInfo.icon}" label="${agentInfo.label}"></wa-icon>
                        <span>${agentInfo.label}</span>
                        ${this.renderStatusIcon(agentInfo.status)}
                    </div>
                    <div class="agent-card-content waiting">Waiting for response...</div>
                </div>
            `;
        }

        return html`
            <div class="agent-card status-${agentInfo.status}">
                <div class="agent-card-header">
                    <wa-icon name="${agentInfo.icon}" label="${agentInfo.label}"></wa-icon>
                    <span>${agentInfo.label}</span>
                    ${this.renderStatusIcon(agentInfo.status)}
                    <div class="agent-card-actions">
                        <wa-button variant="neutral" appearance="plain" size="s" title="Copy"
                            @click="${() => this.copyToClipboard(message.content || '')}">
                            <wa-icon name="copy" label="Copy"></wa-icon>
                        </wa-button>
                    </div>
                </div>
                <div class="agent-card-content">
                    <docks-ai-chat-message
                        .message="${message}"
                        .isStreaming="${agentInfo.status === 'streaming'}"
                        .showHeader="${false}"
                        .messageIndex="${agentInfo.messageIndex}">
                    </docks-ai-chat-message>
                </div>
            </div>
        `;
    }

    render() {
        if (!this.group) return html``;

        const agents = Array.from(this.group.agents.values());
        const completedCount = agents.filter(a => a.status === 'completed').length;
        const streamingCount = agents.filter(a => a.status === 'streaming').length;
        const errorCount = agents.filter(a => a.status === 'error').length;
        const allDone = agents.length > 0 && completedCount + errorCount === agents.length;
        const isSingle = agents.length === 1;

        return html`
            <div class="agent-response-group">
                ${when(!isSingle, () => html`
                    <div class="group-header">
                        <wa-icon name="robot" label="Multiple Agents"></wa-icon>
                        <span>Multiple Agents</span>
                        <span class="status-badge">
                            ${when(streamingCount > 0, () => html`<span class="streaming">${streamingCount} responding</span>`)}
                            ${when(allDone, () => html`<span class="done">All completed (${completedCount})</span>`)}
                        </span>
                    </div>
                `)}
                <div class="group-content">
                    ${repeat(agents, a => a.role, (agentInfo) => {
                        const message = agentInfo.message ||
                            (agentInfo.status === 'streaming' && this.findStreamingMessage
                                ? this.findStreamingMessage(agentInfo.role)
                                : undefined);
                        return this.renderCard(agentInfo, message);
                    })}
                </div>
            </div>
        `;
    }

    static styles = css`
        :host { display: block; width: 100%; box-sizing: border-box; }

        .agent-response-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            width: 100%;
        }

        .group-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 0.75rem;
            background-color: var(--wa-color-surface-lowered);
            border: solid var(--wa-border-width-s) var(--wa-color-surface-border);
            font-weight: 500;
        }

        .status-badge {
            display: flex;
            gap: 0.5rem;
            margin-left: auto;
            font-size: 0.875rem;
        }

        .streaming { color: var(--wa-color-brand-50); }
        .done { color: var(--wa-color-success-70); font-weight: 600; }

        .group-content {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            width: 100%;
        }

        .agent-card {
            display: flex;
            flex-direction: column;
            border: solid var(--wa-border-width-s) var(--wa-color-surface-border);
            background-color: var(--wa-color-surface-default);
        }

        .agent-card.status-streaming { border-color: var(--wa-color-brand-border-quiet); }
        .agent-card.status-completed { border-color: var(--wa-color-success-border-quiet); }
        .agent-card.status-error { border-color: var(--wa-color-danger-border-quiet); }

        .agent-card-header {
            display: flex;
            align-items: center;
            gap: 0.375rem;
            padding: 0.375rem 0.5rem;
            border-bottom: solid var(--wa-border-width-s) var(--wa-color-surface-border);
            background-color: var(--wa-color-surface-lowered);
            font-weight: 500;
            font-size: 0.875rem;
        }

        .agent-card-actions { margin-left: auto; display: flex; gap: 0.25rem; }
        .agent-card-content { padding: 0.375rem; }
        .waiting { padding: 1rem; text-align: center; color: var(--wa-color-text-quiet); }

        .spinning { animation: spin 1s linear infinite; }
        .status-success { color: var(--wa-color-success-60); }
        .status-error { color: var(--wa-color-danger-60); }

        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'docks-ai-agent-response-group': AIAgentResponseGroup;
    }
}
