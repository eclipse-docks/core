import { css, customElement, html, nothing, repeat, state, TemplateResult, when } from '@eclipse-docks/core/externals/lit';
import { DocksPart } from '@eclipse-docks/core';
import { commandRegistry as globalCommandRegistry } from '@eclipse-docks/core';
import { taskService, uiContext, appSettings } from '@eclipse-docks/core';
import { toastError } from '@eclipse-docks/core';

import type { ChatMessage, ChatHistory, ChatProvider, TaskPlan, Artifact } from '../core/types';
import { TOPIC_AICONFIG_CHANGED, KEY_AI_CONFIG } from '../core/constants';
import { aiService } from '../service/ai-service';

import { SessionManager } from './session-manager';
import { StreamManager } from './stream-manager';
import { ProviderManager } from './provider-manager';
import { AgentGroupManager } from './agent-group-manager';

import './components/ai-chat-message';
import './components/ai-chat-input';
import './components/ai-agent-response-group';
import './components/ai-tool-approval';
import './components/ai-empty-state';
import './task-progress-panel';
import './workspace-panel';
import type { PendingApproval } from './components/ai-tool-approval';

@customElement('docks-aiview')
export class DocksAIView extends DocksPart {
    private sessionManager = new SessionManager();
    private scrollDebounceTimer?: ReturnType<typeof setTimeout>;

    private streamManager = new StreamManager(() => {
        this.requestUpdate();
        if (this.scrollDebounceTimer) clearTimeout(this.scrollDebounceTimer);
        this.scrollDebounceTimer = setTimeout(async () => {
            await this.updateComplete;
            this.scrollToBottom();
            this.scrollDebounceTimer = undefined;
        }, 100);
    });

    private providerManager = new ProviderManager(aiService);
    private agentGroupManager = new AgentGroupManager();

    @state() private busy = false;
    @state() private inputValue = '';
    @state() private requireToolApproval = true;
    @state() private showHistory = false;
    @state() private currentTaskPlan?: TaskPlan;
    @state() private currentArtifacts: Artifact[] = [];
    @state() private pendingToolApprovals = new Map<string, PendingApproval>();

    private toolApprovalAllowlist = new Set<string>();
    private abortController?: AbortController;

    protected async doBeforeUI() {
        this.subscribe(TOPIC_AICONFIG_CHANGED, () => this.onAIConfigChanged());
        await this.sessionManager.load();
        if (!this.sessionManager.getActiveSession()) {
            this.sessionManager.createSession();
        }
        await this.providerManager.initialize();
        await this.loadSettings();
        this.requestUpdate();
    }

    private async onAIConfigChanged() {
        await this.providerManager.initialize();
        await this.loadSettings();
        this.requestUpdate();
    }

    private async loadSettings() {
        const config = await appSettings.get(KEY_AI_CONFIG) as any || {};
        this.requireToolApproval = config.requireToolApproval !== false;
        const allowlist = await this.providerManager.loadToolApprovalAllowlist();
        this.toolApprovalAllowlist = new Set(allowlist);
    }

    private async scrollToBottom() {
        await this.updateComplete;
        const scroller = this.shadowRoot?.querySelector('wa-scroller.chat-messages') as any;
        if (!scroller) return;
        const container = scroller.shadowRoot?.querySelector('.scroll-container') as HTMLElement;
        if (container) {
            container.scrollTop = container.scrollHeight;
        } else if (scroller.scrollTo) {
            scroller.scrollTo({ top: scroller.scrollHeight, behavior: 'smooth' });
        }
    }

    private resetViewState() {
        this.inputValue = '';
        this.showHistory = false;
        this.currentTaskPlan = undefined;
        this.currentArtifacts = [];
        this.requestUpdate();
    }

    private createNewSession() {
        this.sessionManager.createSession();
        this.resetViewState();
    }

    private switchToSession(sessionId: string) {
        if (!this.sessionManager.switchToSession(sessionId)) return;
        this.resetViewState();
    }

    private deletePastSession(sessionId: string) {
        this.sessionManager.deletePastSession(sessionId);
        this.requestUpdate();
    }

    private async sendMessage() {
        const prompt = this.inputValue.trim();
        if (!prompt || this.busy) return;
        this.inputValue = '';
        await this.handlePrompt(prompt);
    }

    private async handleResend(message: ChatMessage) {
        if (!message || message.role !== 'user') return;
        await this.handlePrompt(message.content);
    }

    private cancelStream() {
        this.abortController?.abort();
        this.abortController = undefined;
        this.busy = false;
        this.streamManager.cancelUpdates();
    }

    public async handlePrompt(prompt: string): Promise<void> {
        if (prompt.startsWith('/')) {
            await this.runCommand(prompt.substring(1));
            return;
        }

        const selectedProvider = this.providerManager.getSelectedProvider();
        if (!selectedProvider) {
            toastError('Please configure an AI provider in settings');
            return;
        }

        const session = this.sessionManager.getActiveSession();
        if (!session) return;

        const message = aiService.createMessage(prompt);
        this.sessionManager.addMessage(message);

        if (session.history.length === 1) {
            this.sessionManager.setTitle(this.sessionManager.generateTitle(prompt));
        }

        this.requestUpdate();
        await this.updateComplete;
        this.scrollToBottom();
        this.busy = true;
        this.currentTaskPlan = undefined;
        this.currentArtifacts = [];

        this.abortController = new AbortController();
        const streamingAgents = new Map<string, number>();
        const chatContext: ChatHistory = { history: [...session.history] };
        const sessionId = session.id;

        const execContext = globalCommandRegistry.createExecutionContext();
        const callContext = uiContext.createChild({ ...execContext });
        const contributions = aiService.getAgentContributions();

        if (contributions.length === 0) {
            toastError('No agents are registered.');
            this.busy = false;
            return;
        }

        const matchingAgents = contributions.filter(c =>
            !c.canHandle || c.canHandle({ ...callContext.getProxy(), userPrompt: prompt })
        ).sort((a, b) => (b.priority || 0) - (a.priority || 0));

        if (matchingAgents.length === 0) {
            toastError(`No agents available. Available: ${contributions.map(c => c.role).join(', ')}`);
            this.busy = false;
            return;
        }

        const roles = matchingAgents.map(a => a.role);
        const currentSession = this.sessionManager.getActiveSession();
        if (!currentSession) return;

        const groupId = this.agentGroupManager.createGroup(
            sessionId,
            currentSession.history.length - 1,
            message,
            roles,
            (role: string) => {
                const contrib = contributions.find(c => c.role === role);
                return { label: (contrib as any)?.label || role, icon: (contrib as any)?.icon || 'robot' };
            }
        );

        taskService.runAsync('Calling AI assistant', async () => {
            return aiService.executeAgentWorkflow({
                chatContext,
                chatConfig: selectedProvider,
                callContext,
                execution: 'parallel',
                stream: true,
                signal: this.abortController!.signal,
                roles,
                requireToolApproval: this.requireToolApproval,
                onToolApprovalRequest: async (role: string, request: any): Promise<boolean> => {
                    const allAllowed = request.toolCalls.every((tc: any) => this.toolApprovalAllowlist.has(tc.function.name));
                    if (allAllowed) return true;

                    return new Promise<boolean>((resolve) => {
                        const approvalId = `approval-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
                        const pending: PendingApproval = {
                            role,
                            request,
                            resolve,
                            alwaysAllowSelections: new Map()
                        };
                        this.pendingToolApprovals.set(approvalId, pending);
                        this.requestUpdate();
                    });
                },
                onAgentStart: async (role: string) => {
                    const streamIndex = this.streamManager.createStreamingMessage(role);
                    streamingAgents.set(role, streamIndex);
                    this.agentGroupManager.updateAgentStatus(groupId, role, 'streaming');
                    this.requestUpdate();
                    await this.updateComplete;
                    this.scrollToBottom();
                },
                onToken: (role: string, token: string) => {
                    const streamIndex = streamingAgents.get(role);
                    if (streamIndex !== undefined) this.streamManager.updateStreamingMessage(streamIndex, token);
                },
                onAgentComplete: async (role: string, completedMessage: ChatMessage) => {
                    const targetSession = this.sessionManager.getActiveSession();
                    if (!targetSession || targetSession.id !== sessionId) return;

                    const streamIndex = streamingAgents.get(role);
                    if (streamIndex !== undefined) {
                        this.streamManager.completeStreamingMessage(streamIndex, completedMessage);
                        const messageIndex = targetSession.history.length;
                        this.sessionManager.addMessage(completedMessage);
                        streamingAgents.delete(role);
                        this.streamManager.removeStreamingMessage(streamIndex);
                        this.agentGroupManager.updateAgentStatus(groupId, role, 'completed', completedMessage, messageIndex);
                        this.requestUpdate();
                        await this.updateComplete;
                        this.scrollToBottom();
                    }
                },
                onAgentError: (role: string, error: Error) => {
                    const streamIndex = streamingAgents.get(role);
                    if (streamIndex !== undefined) {
                        this.streamManager.removeStreamingMessage(streamIndex);
                        streamingAgents.delete(role);
                    }
                    this.agentGroupManager.updateAgentStatus(groupId, role, 'error', { role, content: `Error: ${error.message}` });
                    this.requestUpdate();
                    toastError(`Agent ${role} error: ${error.message}`);
                }
            }).then(() => { this.agentGroupManager.clearCurrentGroup(); });
        }).catch((error: any) => {
            if (error?.name !== 'AbortError') toastError(`${error}`);
        }).finally(async () => {
            this.busy = false;
            this.abortController = undefined;
            this.streamManager.reset();
            this.agentGroupManager.clearCurrentGroup();
            this.requestUpdate();
        });
    }

    private async runCommand(prompt: string) {
        const splits = prompt.trim().split(/\s+/);
        if (splits.length === 0) return;
        const commandId = splits.shift()!;
        const command = globalCommandRegistry.getCommand(commandId);
        if (!command) { toastError(`Command not found: ${commandId}`); return; }
        const params: Record<string, string> = {};
        splits.forEach((c, i) => {
            if (command.parameters?.[i]) params[command.parameters[i].name] = c;
        });
        await globalCommandRegistry.execute(commandId, globalCommandRegistry.createExecutionContext(params));
        this.requestUpdate();
    }

    private handleToolApproval(e: CustomEvent) {
        const { approvalId, approval } = e.detail;
        const alwaysAllowed = Array.from((approval.alwaysAllowSelections as Map<string, boolean>).entries())
            .filter(([, v]) => v)
            .map(([k]) => k);
        alwaysAllowed.forEach(name => this.toolApprovalAllowlist.add(name));
        this.pendingToolApprovals.delete(approvalId);
        this.requestUpdate();
    }

    private renderMessage(message: ChatMessage, index: number, isStreaming = false): TemplateResult {
        return html`
            <docks-ai-chat-message
                .message="${message}"
                .isStreaming="${isStreaming}"
                .showHeader="${true}"
                .messageIndex="${index}"
                @resend="${(e: CustomEvent) => this.handleResend(e.detail.message)}">
            </docks-ai-chat-message>
        `;
    }

    protected renderToolbar() {
        const past = this.sessionManager.getPastSessions();
        const session = this.sessionManager.getActiveSession();

        return html`
            <span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:0.875rem;font-weight:500;padding:0 0.25rem;">${session?.title || 'New Chat'}</span>
            <wa-button appearance="plain" size="s" title="New chat"
                @click="${() => this.createNewSession()}">
                <wa-icon name="plus" label="New chat"></wa-icon>
            </wa-button>
            ${past.length > 0 ? html`
                <wa-dropdown
                    ?open="${this.showHistory}"
                    @wa-after-hide="${() => { this.showHistory = false; }}"
                    placement="bottom-start">
                    <wa-button slot="trigger" appearance="plain" size="s" with-caret
                        title="Chat history"
                        @click="${() => { this.showHistory = !this.showHistory; }}">
                        <wa-icon name="clock-rotate-left" label="History"></wa-icon>
                    </wa-button>
                    ${past.map(s => html`
                        <wa-dropdown-item @click="${() => this.switchToSession(s.id)}">
                            <wa-icon name="message" label="Session" slot="icon"></wa-icon>
                            <span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${s.title || 'Unnamed Chat'}</span>
                            <wa-button slot="details" appearance="plain" size="s" title="Delete"
                                @click="${(e: Event) => { e.stopPropagation(); this.deletePastSession(s.id); }}">
                                <wa-icon name="trash" label="Delete"></wa-icon>
                            </wa-button>
                        </wa-dropdown-item>
                    `)}
                </wa-dropdown>
            ` : nothing}
            <docks-command cmd="open_ai_config" icon="gear" title="AI Settings"></docks-command>
        `;
    }

    protected renderContent() {
        const session = this.sessionManager.getActiveSession();
        const selectedProvider = this.providerManager.getSelectedProvider();

        return html`
            <div class="chat-container">
                <wa-scroller class="chat-messages" orientation="vertical">
                    <div class="chat-content">
                        ${when(!selectedProvider, () => html`
                            <docks-ai-empty-state
                                message="No AI provider configured"
                                hint='Click the settings icon below to configure an AI provider'>
                            </docks-ai-empty-state>
                        `, () => when(!session || session.history.length === 0, () => html`
                            <docks-ai-empty-state message="How can I help you?" hint=""></docks-ai-empty-state>
                        `, () => html`
                            ${session!.history.map((message: ChatMessage, idx: number) => {
                                const group = this.agentGroupManager.findGroupForUserMessage(session!.id, idx, message);
                                if (group && message.role === 'user') {
                                    return html`
                                        <docks-ai-chat-message
                                            .message="${message}"
                                            .isStreaming="${false}"
                                            .showHeader="${true}"
                                            .messageIndex="${idx}"
                                            @resend="${(e: CustomEvent) => this.handleResend(e.detail.message)}">
                                        </docks-ai-chat-message>
                                        <docks-ai-agent-response-group
                                            .group="${group}"
                                            .findStreamingMessage="${(role: string) => this.streamManager.findStreamingMessage(role)}">
                                        </docks-ai-agent-response-group>
                                    `;
                                }

                                if (this.agentGroupManager.findGroupForMessage(session!.id, message.role, idx)) {
                                    return html``;
                                }

                                return this.renderMessage(message, idx);
                            })}

                            ${this.streamManager.getAllStreamingMessages()
                                .filter(m => !this.agentGroupManager.getAllGroups()
                                    .some(g => g.sessionId === session!.id && g.agents.has(m.message.role)))
                                .map(m => this.renderMessage(m.message, -1, m.isStreaming))}

                            ${when(this.busy && this.streamManager.getAllStreamingMessages().length === 0, () => html`
                                <div class="thinking-indicator">
                                    <wa-progress-ring indeterminate size="s"></wa-progress-ring>
                                    <span>Thinking…</span>
                                </div>
                            `)}
                        `))}

                        ${when(this.currentTaskPlan, () => html`
                            <docks-ai-task-progress-panel .plan="${this.currentTaskPlan}"></docks-ai-task-progress-panel>
                        `)}

                        ${when(this.currentArtifacts.length > 0, () => html`
                            <docks-ai-workspace-panel .artifacts="${this.currentArtifacts}"></docks-ai-workspace-panel>
                        `)}
                    </div>
                </wa-scroller>

                ${when(this.pendingToolApprovals.size > 0, () => html`
                    <docks-ai-tool-approval
                        .pendingApprovals="${this.pendingToolApprovals}"
                        @approve="${(e: CustomEvent) => this.handleToolApproval(e)}">
                    </docks-ai-tool-approval>
                `)}

                <div class="input-area">
                    <docks-ai-chat-input
                        .value="${this.inputValue}"
                        .busy="${this.busy}"
                        .disabled="${!selectedProvider}"
                        .hasProvider="${!!selectedProvider}"
                        @input-change="${(e: CustomEvent) => { this.inputValue = e.detail.value; }}"
                        @send="${(e: CustomEvent) => { this.inputValue = e.detail.value; this.sendMessage(); }}"
                        @cancel="${() => this.cancelStream()}">
                    </docks-ai-chat-input>
                </div>
            </div>
        `;
    }

    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow: hidden;
            background: var(--wa-color-surface-default);
        }

        .chat-container {
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow: hidden;
        }

        .chat-messages {
            flex: 1;
            overflow: hidden;
        }

        .chat-content {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            padding: 1rem;
            min-height: 100%;
            box-sizing: border-box;
        }

        .thinking-indicator {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 0.75rem;
            color: var(--wa-color-text-quiet);
            font-size: 0.875rem;
        }

        .input-area {
            padding: 0.5rem;
            border-top: solid var(--wa-border-width-s) var(--wa-color-neutral-border-subtle);
            flex-shrink: 0;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'docks-aiview': DocksAIView;
    }
}
