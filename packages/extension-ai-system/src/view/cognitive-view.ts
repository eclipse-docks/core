import '@eclipse-docks/core/externals/webawesome';
import {
  html,
  css,
  nothing,
  customElement,
  query,
  state,
  type TemplateResult,
} from '@eclipse-docks/core/externals/lit';
import { DocksPart } from '@eclipse-docks/core';
import {
  OPEN_AI_SETTINGS_COMMAND,
  TOPIC,
  cognitiveRuntime,
  detectEffortCapability,
  estimateSessionContextUsage,
  formatBucketDetail,
  formatContextPercent,
  formatTokenCount,
} from '../runtime';
import type {
  ChatMessage,
  CognitiveSession,
  ContextUsage,
  EffortLevel,
  MessagePart,
  ModelPolicy,
  PermissionAction,
  ToolApprovalMode,
} from '../runtime';

interface PermissionRequest {
  requestId: string;
  toolName: string;
  args: Record<string, unknown>;
  sessionId: string;
}

@customElement('docks-cognitive-view')
export class DocksCognitiveView extends DocksPart {
  protected scrollMode: 'scroller' | 'native' | 'none' = 'none';

  static styles = css`
    :host {
      height: 100%;
      min-height: 0;
      background: var(--wa-color-surface-default);
      color: var(--wa-color-text-normal);
      font-family: var(--wa-font-family-body);
    }

    .part-content,
    .part-content-inner {
      height: 100%;
      min-height: 0;
    }

    .cognitive-shell {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
      overflow: hidden;
      /* Establish a definite containing block for wa-scroller's height: 100%. */
      position: relative;
    }

    wa-dropdown.history-menu::part(menu) {
      min-width: 18rem;
      max-width: min(24rem, 92vw);
      max-height: min(28rem, 70vh);
      overflow-y: auto;
      padding-top: 0;
    }

    .history-search {
      position: sticky;
      top: 0;
      z-index: 1;
      display: block;
      padding: var(--wa-space-s);
      background: var(--wa-color-surface-raised);
      border-bottom: var(--wa-border-width-s) solid var(--wa-color-border-normal);
    }

    .history-search wa-input {
      width: 100%;
    }

    .history-item-title {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .history-item-meta {
      color: var(--wa-color-text-quiet);
      font-size: var(--wa-font-size-xs);
      flex-shrink: 0;
    }

    .history-empty {
      padding: var(--wa-space-m);
      color: var(--wa-color-text-quiet);
      font-size: var(--wa-font-size-s);
      text-align: center;
    }

    wa-scroller.transcript {
      /* flex-basis 0 so the host gets a definite height; wa-scroller vertical uses height:100%. */
      flex: 1 1 0;
      min-height: 0;
      height: 100%;
      overflow: hidden;
    }

    .transcript-inner {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-m);
      padding: var(--wa-space-m);
      min-height: 100%;
      box-sizing: border-box;
    }

    /* Pushes short threads to the bottom without breaking overflow scroll. */
    .transcript-spacer {
      flex: 1 0 0;
      min-height: 0;
    }

    .msg {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-2xs);
      max-width: 100%;
    }

    .msg.user {
      align-items: flex-end;
    }

    .msg-meta {
      position: absolute;
      right: var(--wa-space-2xs);
      bottom: var(--wa-space-2xs);
      z-index: 1;
      display: flex;
      gap: var(--wa-space-2xs);
      align-items: center;
      flex-wrap: wrap;
      justify-content: flex-end;
      max-width: calc(100% - var(--wa-space-s));
      padding: var(--wa-space-3xs) var(--wa-space-2xs);
      border-radius: var(--wa-border-radius-m);
      background: color-mix(in srgb, var(--wa-color-surface-default) 88%, transparent);
      font-size: var(--wa-font-size-xs);
      color: var(--wa-color-text-quiet);
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--wa-transition-fast, 120ms) ease;
    }

    .msg:hover .msg-meta,
    .msg:focus-within .msg-meta {
      opacity: 1;
      pointer-events: auto;
    }

    .bubble {
      padding: var(--wa-space-s) var(--wa-space-m);
      border-radius: var(--wa-border-radius-l);
      background: var(--wa-color-surface-raised);
      border: var(--wa-border-width-s) solid var(--wa-color-border-normal);
      white-space: pre-wrap;
      line-height: var(--wa-line-height-normal);
      max-width: 100%;
    }

    .msg.user .bubble {
      background: color-mix(in srgb, var(--wa-color-brand-fill-normal) 22%, transparent);
      border-color: color-mix(in srgb, var(--wa-color-brand-fill-normal) 40%, transparent);
    }

    .streaming-meta {
      display: flex;
      gap: var(--wa-space-2xs);
      align-items: center;
      color: var(--wa-color-text-quiet);
      font-size: var(--wa-font-size-s);
    }

    .composer-shell {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-s);
      padding: var(--wa-space-s) var(--wa-space-m) var(--wa-space-m);
      border-top: var(--wa-border-width-s) solid var(--wa-color-border-normal);
      flex-shrink: 0;
    }

    wa-dropdown.settings-menu::part(menu) {
      min-width: 16rem;
      max-width: min(28rem, 92vw);
    }

    wa-dropdown.context-menu::part(menu) {
      min-width: 17rem;
      max-width: min(22rem, 92vw);
      padding: var(--wa-space-s);
    }

    .context-ring {
      --size: 1.35rem;
      --track-width: 2.5px;
      --indicator-width: 2.5px;
      font-size: 0;
    }

    .context-panel {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-s);
    }

    .context-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: var(--wa-space-s);
    }

    .context-header strong {
      font-size: var(--wa-font-size-s);
    }

    .context-header span {
      color: var(--wa-color-text-quiet);
      font-size: var(--wa-font-size-xs);
    }

    .context-bars {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-2xs);
    }

    .context-row {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: var(--wa-space-2xs);
      font-size: var(--wa-font-size-xs);
    }

    .context-row-label {
      color: var(--wa-color-text-quiet);
    }

    .context-meter {
      grid-column: 1 / -1;
      height: 0.35rem;
      border-radius: var(--wa-border-radius-pill);
      background: var(--wa-color-neutral-fill-quiet);
      overflow: hidden;
    }

    .context-meter > span {
      display: block;
      height: 100%;
      border-radius: inherit;
      background: var(--bucket-color, var(--wa-color-brand-fill-normal));
    }

    .context-footer {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-2xs);
    }

    .context-remaining {
      color: var(--wa-color-text-quiet);
      font-size: var(--wa-font-size-xs);
    }

    .composer {
      display: flex;
      gap: var(--wa-space-s);
      align-items: flex-end;
    }

    .composer wa-textarea {
      flex: 1;
      min-width: 0;
    }

    .composer-actions {
      display: flex;
      align-items: center;
      gap: var(--wa-space-2xs);
      flex-shrink: 0;
    }

    .approval-actions {
      display: flex;
      gap: var(--wa-space-s);
      margin-top: var(--wa-space-s);
      flex-wrap: wrap;
    }

    pre.args {
      margin: var(--wa-space-s) 0 0;
      font-family: var(--wa-font-family-code, var(--wa-font-mono));
      font-size: var(--wa-font-size-xs);
      white-space: pre-wrap;
      overflow-x: auto;
    }

    wa-details {
      font-size: var(--wa-font-size-s);
    }

    wa-details.msg-details {
      width: 100%;
      font-size: var(--wa-font-size-s);
    }

    wa-details.msg-details::part(base),
    wa-details.msg-details::part(details) {
      border: none;
      background: transparent;
    }

    wa-details.msg-details::part(header) {
      align-items: flex-start;
      gap: var(--wa-space-2xs);
      padding: 0;
    }

    wa-details.msg-details::part(summary) {
      flex: 1;
      min-width: 0;
    }

    wa-details.msg-details::part(content) {
      padding: var(--wa-space-s) 0 0;
    }

    .msg-summary {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-2xs);
      width: 100%;
    }

    .msg-tech {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-s);
      margin-inline-start: var(--wa-space-l);
      padding-inline-start: var(--wa-space-m);
      border-inline-start: var(--wa-border-width-s) solid var(--wa-color-border-normal);
    }

    .tool-heading {
      font-size: var(--wa-font-size-xs);
      color: var(--wa-color-text-quiet);
      margin-bottom: var(--wa-space-2xs);
    }
  `;

  @query('wa-textarea') private textarea?: HTMLTextAreaElement & { value: string };

  @state() private sessions: CognitiveSession[] = [];
  @state() private focusedId: string | null = null;
  @state() private draft = '';
  @state() private busy = false;
  @state() private pendingPermission: PermissionRequest | null = null;
  @state() private policyMode: 'auto' | 'manual' = 'auto';
  @state() private optimizeFor: 'cost' | 'balance' | 'intelligence' = 'balance';
  @state() private manualModel = '';
  @state() private manualEffort: EffortLevel | 'auto' = 'auto';
  @state() private approvalMode: ToolApprovalMode = 'auto_safe';
  @state() private modelIds: string[] = [];
  @state() private streamingParts: MessagePart[] = [];
  @state() private historyOpen = false;
  @state() private historyQuery = '';
  private unsubs: Array<() => void> = [];
  private scrollDebounceTimer?: ReturnType<typeof setTimeout>;

  protected doBeforeUI(): void {
    cognitiveRuntime.start();
    this.syncSessions();
    this.syncModels();
    this.approvalMode = cognitiveRuntime.getApprovalMode();
    void cognitiveRuntime.whenReady().then(() => {
      this.syncSessions();
      this.syncModels();
      this.approvalMode = cognitiveRuntime.getApprovalMode();
      this.scheduleScrollToBottom();
    });
    this.unsubs.push(
      cognitiveRuntime.events.subscribe(TOPIC.sessionChanged, () => {
        this.syncSessions();
        this.scheduleScrollToBottom();
      }),
      cognitiveRuntime.events.subscribe(TOPIC.providersChanged, () => this.syncModels()),
      cognitiveRuntime.events.subscribe(TOPIC.approvalModeChanged, (mode) => {
        this.approvalMode = mode as ToolApprovalMode;
      }),
      cognitiveRuntime.events.subscribe(TOPIC.permissionAsked, (payload) => {
        this.pendingPermission = payload as PermissionRequest;
        this.scheduleScrollToBottom();
      }),
      cognitiveRuntime.events.subscribe(TOPIC.messagePart, (payload) => {
        const { sessionId, part } = payload as { sessionId: string; part: MessagePart };
        if (sessionId !== this.focusedId) return;
        this.streamingParts = mergePart(this.streamingParts, part);
        this.scheduleScrollToBottom();
      }),
      cognitiveRuntime.events.subscribe(TOPIC.messageDone, () => {
        this.streamingParts = [];
        this.syncSessions();
        this.scheduleScrollToBottom();
      }),
    );
  }

  protected doClose(): void {
    if (this.scrollDebounceTimer) clearTimeout(this.scrollDebounceTimer);
    this.scrollDebounceTimer = undefined;
    for (const u of this.unsubs) u();
    this.unsubs = [];
  }

  private syncSessions(): void {
    const byRecency = cognitiveRuntime.sessions.list();
    this.sessions = [...byRecency].sort((a, b) => a.createdAt - b.createdAt);
    const focused = cognitiveRuntime.sessions.focused();
    const activeId = focused?.id ?? byRecency[0]?.id ?? null;
    if (activeId && focused?.id !== activeId) {
      cognitiveRuntime.sessions.focus(activeId);
    }
    this.focusedId = activeId;
  }

  private scheduleScrollToBottom(): void {
    if (this.scrollDebounceTimer) clearTimeout(this.scrollDebounceTimer);
    this.scrollDebounceTimer = setTimeout(() => {
      this.scrollDebounceTimer = undefined;
      void this.scrollToBottom();
    }, 50);
  }

  private async scrollToBottom(): Promise<void> {
    await this.updateComplete;
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    const scroller = this.renderRoot.querySelector('wa-scroller.transcript');
    if (!scroller?.shadowRoot) return;

    const container = scroller.shadowRoot.querySelector('#content');
    if (!(container instanceof HTMLElement)) return;
    container.scrollTop = container.scrollHeight;
  }

  private focusedSession(): CognitiveSession | undefined {
    return this.sessions.find((s) => s.id === this.focusedId) ?? this.sessions[0];
  }

  private deleteSession(sessionId: string): void {
    if (this.sessions.length <= 1) {
      cognitiveRuntime.sessions.createSession({ title: 'Chat' });
      cognitiveRuntime.sessions.remove(sessionId);
    } else {
      cognitiveRuntime.sessions.remove(sessionId);
    }
    this.streamingParts = [];
    this.syncSessions();
    cognitiveRuntime.commitSessions();
  }

  private openSession(sessionId: string): void {
    if (!cognitiveRuntime.sessions.focus(sessionId)) return;
    this.streamingParts = [];
    this.syncSessions();
    this.historyOpen = false;
    this.historyQuery = '';
    cognitiveRuntime.commitSessions();
    this.scheduleScrollToBottom();
  }

  private newSession(): void {
    cognitiveRuntime.sessions.createSession({ title: 'Chat' });
    this.streamingParts = [];
    this.historyOpen = false;
    this.historyQuery = '';
    this.syncSessions();
    cognitiveRuntime.commitSessions();
  }

  private historySessions(): CognitiveSession[] {
    const q = this.historyQuery.trim().toLowerCase();
    const sorted = [...this.sessions].sort((a, b) => b.updatedAt - a.updatedAt);
    if (!q) return sorted;
    return sorted.filter((s) => {
      if (s.title.toLowerCase().includes(q)) return true;
      return s.history.some((m) =>
        m.parts.some((p) => p.type === 'text' && p.text.toLowerCase().includes(q)),
      );
    });
  }

  private syncModels(): void {
    this.modelIds = cognitiveRuntime.listConfiguredModels();
    if (!this.manualModel || !this.modelIds.includes(this.manualModel)) {
      this.manualModel = this.modelIds[0] ?? cognitiveRuntime.defaultModelId();
    }
  }

  private effortChoices(): Array<EffortLevel | 'auto'> {
    const cap = detectEffortCapability(this.manualModel || cognitiveRuntime.defaultModelId());
    if (!cap.supported) return ['auto', 'none'];
    return ['auto', ...cap.levels];
  }

  private routerValue(): string {
    return this.policyMode === 'auto' ? `auto:${this.optimizeFor}` : `model:${this.manualModel}`;
  }

  private routerLabel(): string {
    if (this.policyMode === 'auto') return `Auto · ${capitalize(this.optimizeFor)}`;
    if (!this.modelIds.length) return 'No models';
    return shortModelLabel(this.manualModel || this.modelIds[0]!);
  }

  private activeModelRef(): string {
    const session = this.focusedSession();
    const routed = [...(session?.history ?? [])]
      .reverse()
      .find((m) => m.role === 'assistant' && m.routedModel)?.routedModel;
    if (routed) return routed;
    if (this.policyMode === 'manual') {
      return this.manualModel || this.modelIds[0] || cognitiveRuntime.defaultModelId();
    }
    return this.modelIds[0] || cognitiveRuntime.defaultModelId();
  }

  private contextUsage(): ContextUsage {
    return estimateSessionContextUsage(this.focusedSession(), this.activeModelRef());
  }

  private async compactFocused(): Promise<void> {
    if (!this.focusedId) return;
    await cognitiveRuntime.compactSession(this.focusedId);
    this.syncSessions();
  }

  private onRouterSelect(value: string): void {
    if (value.startsWith('auto:')) {
      const optimize = value.slice(5);
      if (optimize === 'cost' || optimize === 'balance' || optimize === 'intelligence') {
        this.policyMode = 'auto';
        this.optimizeFor = optimize;
      }
      return;
    }
    if (value.startsWith('model:')) {
      const model = value.slice(6);
      if (!model) return;
      this.policyMode = 'manual';
      this.manualModel = model;
    }
  }

  private applyPolicy(): void {
    const policy: ModelPolicy =
      this.policyMode === 'manual'
        ? {
            mode: 'manual',
            model: this.manualModel || cognitiveRuntime.defaultModelId(),
            effort: this.manualEffort,
          }
        : { mode: 'auto', optimizeFor: this.optimizeFor };
    cognitiveRuntime.setModelPolicy(policy);
  }

  private async clearComposer(): Promise<void> {
    this.draft = '';
    await this.updateComplete;
    if (this.textarea) this.textarea.value = '';
  }

  private async send(): Promise<void> {
    const text = this.draft.trim();
    if (!text || this.busy) return;
    this.applyPolicy();
    await this.clearComposer();
    this.busy = true;
    this.streamingParts = [];
    try {
      await cognitiveRuntime.prompt({ sessionId: this.focusedId ?? undefined, text });
    } finally {
      this.busy = false;
      this.syncSessions();
      this.scheduleScrollToBottom();
      this.textarea?.focus();
    }
  }

  private resolvePermission(action: PermissionAction): void {
    if (!this.pendingPermission) return;
    cognitiveRuntime.resolvePermission(this.pendingPermission.requestId, action);
    this.pendingPermission = null;
  }

  protected renderToolbar(): TemplateResult {
    const session = this.focusedSession();
    const title = session?.title || 'Chat';
    return html`
      <span class="toolbar-title" title=${title}>${title}</span>
      <wa-button size="s" appearance="plain" title="New chat" @click=${() => this.newSession()}>
        <wa-icon name="plus" label="New chat"></wa-icon>
      </wa-button>
      ${this.renderHistoryDropdown()}
      <wa-button
        size="s"
        appearance="plain"
        title="Checkpoint"
        @click=${() => {
          if (!this.focusedId) return;
          cognitiveRuntime.sessions.checkpoint(this.focusedId);
          this.syncSessions();
          cognitiveRuntime.commitSessions();
        }}
      >
        <wa-icon name="floppy-disk" label="Checkpoint"></wa-icon>
      </wa-button>
      ${this.renderSettingsDropdown()}
    `;
  }

  private contextRingStyle(level: ContextUsage['level']): string {
    const tone = level === 'critical' ? 'danger' : level === 'warn' ? 'warning' : 'success';
    // Match Web Awesome docs: quiet track + loud indicator.
    return [
      `--track-color: var(--wa-color-${tone}-fill-quiet)`,
      `--indicator-color: var(--wa-color-${tone}-fill-loud)`,
    ].join(';');
  }

  private renderContextDropdown() {
    const usage = this.contextUsage();
    const canCompact = (this.focusedSession()?.history.length ?? 0) > 12;
    const percentLabel = formatContextPercent(usage.percent);
    const title = `Context ${percentLabel} · ${formatTokenCount(usage.used)} / ${formatTokenCount(usage.limit)} tokens`;
    const ringValue = Math.min(100, Math.max(usage.percent, usage.used > 0 ? 1 : 0));

    return html`
      <wa-dropdown
        class="context-menu"
        size="s"
        placement="top-end"
        distance="4"
      >
        <wa-button
          slot="trigger"
          appearance="plain"
          size="s"
          title=${title}
        >
          <wa-progress-ring
            class="context-ring"
            style=${this.contextRingStyle(usage.level)}
            value=${ringValue}
            label=${title}
          ></wa-progress-ring>
        </wa-button>

        <div
          class="context-panel"
          @click=${(e: Event) => e.stopPropagation()}
          @keydown=${(e: Event) => e.stopPropagation()}
        >
          <div class="context-header">
            <strong>Context tokens</strong>
            <span>${percentLabel}</span>
          </div>
          <div class="context-bars">
            ${usage.buckets.map((bucket) => {
              const share = usage.limit > 0 ? (bucket.tokens / usage.limit) * 100 : 0;
              return html`
                <div class="context-row">
                  <span class="context-row-label">${bucket.label}</span>
                  <span>${formatBucketDetail(bucket)}</span>
                  <div class="context-meter">
                    <span
                      style="width:${Math.max(share, bucket.tokens > 0 ? 0.5 : 0)}%; --bucket-color: var(--wa-color-brand-fill-normal)"
                    ></span>
                  </div>
                </div>
              `;
            })}
          </div>
          <div class="context-footer">
            <span class="context-remaining">
              ~${formatTokenCount(usage.used)} used · ${formatTokenCount(usage.remaining)} free of
              ${formatTokenCount(usage.limit)}
              · ${shortModelLabel(usage.modelRef)}
            </span>
            <wa-button
              size="s"
              variant=${usage.level === 'critical' ? 'danger' : 'neutral'}
              appearance=${canCompact ? 'filled' : 'outlined'}
              ?disabled=${!canCompact || this.busy}
              @click=${() => this.compactFocused()}
            >
              <wa-icon slot="start" name="arrows-down-to-line"></wa-icon>
              Compact conversation
            </wa-button>
          </div>
        </div>
      </wa-dropdown>
    `;
  }

  protected renderContent() {
    const session = this.focusedSession();
    return html`
      <div class="cognitive-shell">
        <wa-scroller class="transcript" orientation="vertical">
          <div class="transcript-inner">
            <div class="transcript-spacer" aria-hidden="true"></div>
            ${session ? this.renderTranscript(session) : nothing}
          </div>
        </wa-scroller>

        <div class="composer-shell">
          <div class="composer">
            <wa-textarea
              placeholder="Message the cognitive agent…"
              size="s"
              resize="auto"
              rows="1"
              .value=${this.draft}
              ?disabled=${this.busy}
              @input=${(e: Event) => {
                this.draft = (e.target as HTMLTextAreaElement).value;
              }}
              @keydown=${(e: KeyboardEvent) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  void this.send();
                }
              }}
            ></wa-textarea>
            <div class="composer-actions">
              <wa-button
                variant="brand"
                size="s"
                ?disabled=${this.busy}
                ?loading=${this.busy}
                title="Send"
                @click=${() => void this.send()}
              >
                <wa-icon name="paper-plane" label="Send"></wa-icon>
              </wa-button>
              ${this.renderContextDropdown()}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderTranscript(session: CognitiveSession) {
    const showStreaming = this.streamingParts.length > 0;
    const showPermission =
      this.pendingPermission && this.pendingPermission.sessionId === session.id;

    return html`
      ${session.history.map((m) => this.renderMessage(m))}
      ${showStreaming
        ? this.renderAssistantMessage(
            {
              id: 'streaming',
              role: 'assistant',
              parts: this.streamingParts,
              createdAt: Date.now(),
            },
            { streaming: true },
          )
        : nothing}
      ${showPermission
        ? html`
            <wa-callout variant="warning" appearance="outlined">
              <wa-icon slot="icon" name="shield-halved"></wa-icon>
              Allow tool <code>${this.pendingPermission!.toolName}</code>?
              <pre class="args">${JSON.stringify(this.pendingPermission!.args, null, 2)}</pre>
              <div class="approval-actions">
                <wa-button size="s" variant="success" @click=${() => this.resolvePermission('allow')}>
                  <wa-icon slot="start" name="check"></wa-icon>
                  Allow
                </wa-button>
                <wa-button
                  size="s"
                  variant="neutral"
                  appearance="outlined"
                  @click=${() => this.resolvePermission('deny')}
                >
                  <wa-icon slot="start" name="xmark"></wa-icon>
                  Deny
                </wa-button>
              </div>
            </wa-callout>
          `
        : nothing}
    `;
  }

  private renderHistoryDropdown() {
    const items = this.historySessions();
    const groups = groupSessionsByRecency(items);

    return html`
      <wa-dropdown
        class="history-menu"
        size="s"
        placement="bottom-end"
        distance="4"
        ?open=${this.historyOpen}
        @wa-after-show=${() => {
          this.historyOpen = true;
        }}
        @wa-after-hide=${() => {
          this.historyOpen = false;
          this.historyQuery = '';
        }}
      >
        <wa-button
          slot="trigger"
          appearance="plain"
          size="s"
          with-caret
          title="Chat history"
          @click=${(e: Event) => {
            e.stopPropagation();
            this.historyOpen = !this.historyOpen;
          }}
        >
          <wa-icon name="clock-rotate-left" label="Chat history"></wa-icon>
        </wa-button>

        <div
          class="history-search"
          @click=${(e: Event) => e.stopPropagation()}
          @keydown=${(e: Event) => e.stopPropagation()}
        >
          <wa-input
            size="s"
            clearable
            placeholder="Search chats…"
            .value=${this.historyQuery}
            @input=${(e: Event) => {
              this.historyQuery = (e.target as HTMLInputElement).value;
            }}
          >
            <wa-icon slot="start" name="magnifying-glass"></wa-icon>
          </wa-input>
        </div>

        ${groups.length
          ? groups.map(
              (group) => html`
                <h3>${group.label}</h3>
                ${group.sessions.map(
                  (s) => html`
                    <wa-dropdown-item @click=${() => this.openSession(s.id)}>
                      <wa-icon
                        slot="icon"
                        name=${s.id === this.focusedId ? 'check' : 'message'}
                      ></wa-icon>
                      <span class="history-item-title" title=${s.title}>${s.title}</span>
                      <div slot="details" style="display:flex;align-items:center;gap:0.25rem">
                        <span class="history-item-meta">${relativeTime(s.updatedAt)}</span>
                        <wa-button
                          appearance="plain"
                          size="s"
                          title="Delete chat"
                          @click=${(e: Event) => {
                            e.stopPropagation();
                            this.deleteSession(s.id);
                          }}
                        >
                          <wa-icon name="trash" label="Delete chat"></wa-icon>
                        </wa-button>
                      </div>
                    </wa-dropdown-item>
                  `,
                )}
              `,
            )
          : html`<div class="history-empty">${this.historyQuery ? 'No matching chats' : 'No chats yet'}</div>`}
      </wa-dropdown>
    `;
  }

  private onSettingsSelect(value: string): void {
    if (value === 'settings') {
      void this.executeCommand(OPEN_AI_SETTINGS_COMMAND, {});
      return;
    }
    if (value.startsWith('approval:')) {
      const mode = value.slice('approval:'.length);
      if (mode === 'manual' || mode === 'auto_safe' || mode === 'auto_all') {
        this.approvalMode = mode;
        cognitiveRuntime.setApprovalMode(mode);
      }
      return;
    }
    if (value.startsWith('effort:')) {
      this.manualEffort = (value.slice(7) as EffortLevel | 'auto') || 'auto';
      return;
    }
    this.onRouterSelect(value);
  }

  private renderSettingsDropdown() {
    const selected = this.routerValue();
    const autoOptions = [
      { value: 'auto:cost', label: 'Auto · Cost' },
      { value: 'auto:balance', label: 'Auto · Balance' },
      { value: 'auto:intelligence', label: 'Auto · Intelligence' },
    ];
    const effortOptions = this.effortChoices();

    return html`
      <wa-dropdown
        class="settings-menu"
        size="s"
        placement="bottom-end"
        distance="4"
        @wa-select=${(e: CustomEvent<{ item?: { value?: string } }>) => {
          const value = e.detail?.item?.value;
          if (value != null) this.onSettingsSelect(value);
        }}
      >
        <wa-button
          slot="trigger"
          appearance="plain"
          size="s"
          with-caret
          title=${`AI · ${this.routerLabel()}`}
        >
          <wa-icon name="gear" label="AI settings"></wa-icon>
        </wa-button>

        <h3>Auto</h3>
        ${autoOptions.map(
          (option) => html`
            <wa-dropdown-item
              value=${option.value}
              type="checkbox"
              ?checked=${option.value === selected}
            >
              ${option.label}
            </wa-dropdown-item>
          `,
        )}

        <wa-divider></wa-divider>
        <h3>Models</h3>
        ${this.modelIds.length
          ? this.modelIds.map(
              (id) => html`
                <wa-dropdown-item
                  value=${`model:${id}`}
                  type="checkbox"
                  ?checked=${selected === `model:${id}`}
                >
                  ${id}
                </wa-dropdown-item>
              `,
            )
          : html`<wa-dropdown-item disabled>No models configured</wa-dropdown-item>`}

        ${this.policyMode === 'manual'
          ? html`
              <wa-divider></wa-divider>
              <h3>Effort</h3>
              ${effortOptions.map(
                (level) => html`
                  <wa-dropdown-item
                    value=${`effort:${level}`}
                    type="checkbox"
                    ?checked=${this.manualEffort === level}
                  >
                    ${level}
                  </wa-dropdown-item>
                `,
              )}
            `
          : nothing}

        <wa-divider></wa-divider>
        <h3>Tool approvals</h3>
        ${APPROVAL_OPTIONS.map(
          (option) => html`
            <wa-dropdown-item
              value=${`approval:${option.value}`}
              type="checkbox"
              ?checked=${this.approvalMode === option.value}
            >
              ${option.label}
            </wa-dropdown-item>
          `,
        )}

        <wa-divider></wa-divider>
        <wa-dropdown-item value="settings">
          <wa-icon slot="icon" name="sliders"></wa-icon>
          Settings…
        </wa-dropdown-item>
      </wa-dropdown>
    `;
  }

  private renderMessage(message: ChatMessage) {
    if (message.role === 'user') {
      return html`
        <div class="msg user">
          ${message.parts.map((p) => this.renderTextPart(p))}
          ${this.renderMessageMeta(message)}
        </div>
      `;
    }
    return this.renderAssistantMessage(message);
  }

  private renderAssistantMessage(message: ChatMessage, opts: { streaming?: boolean } = {}) {
    const textParts = message.parts.filter((p) => p.type === 'text');
    const techParts = message.parts.filter((p) => p.type !== 'text');
    const open =
      opts.streaming === true ||
      techParts.some((p) => (p.type === 'reasoning' || p.type === 'tool') && p.status === 'streaming');

    const summary = html`
      <div slot="summary" class="msg-summary">
        ${opts.streaming
          ? html`
              <div class="streaming-meta">
                <wa-spinner style="font-size: 0.85rem"></wa-spinner>
                <span>streaming…</span>
              </div>
            `
          : nothing}
        ${textParts.length
          ? textParts.map((p) => this.renderTextPart(p))
          : html`<div class="bubble">${technicalSummary(techParts)}</div>`}
      </div>
    `;

    if (!techParts.length) {
      return html`
        <div class="msg assistant">
          ${opts.streaming
            ? html`
                <div class="streaming-meta">
                  <wa-spinner style="font-size: 0.85rem"></wa-spinner>
                  <span>streaming…</span>
                </div>
              `
            : nothing}
          ${textParts.map((p) => this.renderTextPart(p))}
          ${message.id !== 'streaming' ? this.renderMessageMeta(message) : nothing}
        </div>
      `;
    }

    return html`
      <div class="msg assistant">
        <wa-details class="msg-details" appearance="plain" ?open=${open}>
          ${summary}
          <div class="msg-tech">${techParts.map((p) => this.renderTechnicalPart(p))}</div>
        </wa-details>
        ${message.id !== 'streaming' ? this.renderMessageMeta(message) : nothing}
      </div>
    `;
  }

  private renderMessageMeta(message: ChatMessage) {
    const timeLabel = formatMessageTime(message.createdAt);
    return html`
      <div class="msg-meta">
        <wa-tag size="s" appearance="outlined" title=${new Date(message.createdAt).toLocaleString()}>
          ${timeLabel}
        </wa-tag>
        ${message.routedModel
          ? html`<wa-tag size="s" appearance="outlined">${message.routedModel}</wa-tag>`
          : nothing}
        ${message.effort
          ? html`<wa-tag size="s" appearance="outlined">${message.effort}</wa-tag>`
          : nothing}
      </div>
    `;
  }

  private renderTextPart(part: MessagePart) {
    if (part.type === 'text') return html`<div class="bubble">${part.text}</div>`;
    return nothing;
  }

  private renderTechnicalPart(part: MessagePart) {
    if (part.type === 'reasoning') {
      return html`
        <div>
          <div class="tool-heading">Thinking</div>
          <div class="bubble">${part.text}</div>
        </div>
      `;
    }
    if (part.type === 'tool') {
      const heading = `${part.name} · ${part.status}${part.durationMs != null ? ` · ${part.durationMs}ms` : ''}`;
      return html`
        <div>
          <div class="tool-heading">${heading}</div>
          <pre class="args">${JSON.stringify({ args: part.args, result: part.result }, null, 2)}</pre>
        </div>
      `;
    }
    if (part.type === 'step') {
      return html`<div class="tool-heading">Step: ${part.title} · ${part.status}</div>`;
    }
    return nothing;
  }
}

const APPROVAL_OPTIONS: Array<{ value: ToolApprovalMode; label: string }> = [
  { value: 'manual', label: 'Manual' },
  { value: 'auto_safe', label: 'Auto-approve non-critical' },
  { value: 'auto_all', label: 'Approve all' },
];

function capitalize(value: string): string {
  return value ? value[0]!.toUpperCase() + value.slice(1) : value;
}

function technicalSummary(parts: MessagePart[]): string {
  const tools = parts.filter((p): p is Extract<MessagePart, { type: 'tool' }> => p.type === 'tool');
  const reasoning = parts.some((p) => p.type === 'reasoning');
  const steps = parts.filter((p): p is Extract<MessagePart, { type: 'step' }> => p.type === 'step');

  const bits: string[] = [];
  if (tools.length) {
    bits.push(
      tools
        .map((t) => `${t.name} · ${t.status}${t.durationMs != null ? ` · ${t.durationMs}ms` : ''}`)
        .join(', '),
    );
  }
  if (reasoning) bits.push('Thinking');
  if (steps.length) bits.push(`${steps.length} step${steps.length === 1 ? '' : 's'}`);
  return bits.join(' · ') || 'Details';
}

function startOfDay(ts: number): number {
  const d = new Date(ts);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function groupSessionsByRecency(sessions: CognitiveSession[]): Array<{ label: string; sessions: CognitiveSession[] }> {
  const now = Date.now();
  const today = startOfDay(now);
  const yesterday = today - 86_400_000;
  const week = today - 7 * 86_400_000;
  const buckets: Record<'today' | 'yesterday' | 'week' | 'older', CognitiveSession[]> = {
    today: [],
    yesterday: [],
    week: [],
    older: [],
  };

  for (const s of sessions) {
    const day = startOfDay(s.updatedAt);
    if (day >= today) buckets.today.push(s);
    else if (day >= yesterday) buckets.yesterday.push(s);
    else if (day >= week) buckets.week.push(s);
    else buckets.older.push(s);
  }

  return (
    [
      { label: 'Today', sessions: buckets.today },
      { label: 'Yesterday', sessions: buckets.yesterday },
      { label: 'Previous 7 Days', sessions: buckets.week },
      { label: 'Older', sessions: buckets.older },
    ] as const
  ).filter((g) => g.sessions.length > 0);
}

function relativeTime(ts: number): string {
  const delta = Math.max(0, Date.now() - ts);
  const mins = Math.floor(delta / 60_000);
  if (mins < 1) return 'now';
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function formatMessageTime(ts: number): string {
  const date = new Date(ts);
  const now = new Date();
  const sameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();
  const time = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  if (sameDay) return time;
  return `${date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} ${time}`;
}

function shortModelLabel(modelRef: string): string {
  const slash = modelRef.indexOf('/');
  return slash === -1 ? modelRef : modelRef.slice(slash + 1);
}

function mergePart(parts: MessagePart[], part: MessagePart): MessagePart[] {
  const next = [...parts];
  const last = next[next.length - 1];
  if (part.type === 'text' && last?.type === 'text') {
    next[next.length - 1] = { ...last, text: last.text + part.text };
    return next;
  }
  if (part.type === 'reasoning' && last?.type === 'reasoning') {
    next[next.length - 1] = { ...last, text: last.text + part.text, status: part.status };
    return next;
  }
  if (part.type === 'tool' && last?.type === 'tool' && last.id === part.id) {
    next[next.length - 1] = part;
    return next;
  }
  next.push(part);
  return next;
}

declare global {
  interface HTMLElementTagNameMap {
    'docks-cognitive-view': DocksCognitiveView;
  }
}
