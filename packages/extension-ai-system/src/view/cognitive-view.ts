import '@eclipse-docks/core/externals/webawesome';
import {
  html,
  css,
  nothing,
  customElement,
  query,
  state,
  unsafeHTML,
  type TemplateResult,
} from '@eclipse-docks/core/externals/lit';
import {
  DocksPart,
  File as WorkspaceFile,
  FileContentType,
  filebrowserDialog,
  parseMarkdownHtml,
  toastError,
  toastInfo,
  subscribe,
  unsubscribe,
  workspaceService,
} from '@eclipse-docks/core';
import {
  ATTACHMENT_FILE_ACCEPT,
  MAX_ATTACHMENTS,
  OPEN_AI_SETTINGS_COMMAND,
  TOPIC,
  cognitiveRuntime,
  detectEffortCapability,
  estimateSessionContextUsage,
  formatBucketDetail,
  formatContextPercent,
  formatTokenCount,
  readPromptAttachmentFromFile,
} from '../runtime';
import type {
  ChatMessage,
  CognitiveSession,
  ContextUsage,
  EffortLevel,
  MessagePart,
  ModelPolicy,
  PermissionAction,
  PromptAttachment,
  SessionAttachment,
  ToolApprovalMode,
} from '../runtime';
import {
  INITIAL_BUSY_STATUS,
  busyStatusRotateMs,
  nextBusyStatus,
} from './busy-status';

interface PermissionRequest {
  requestId: string;
  toolName: string;
  args: Record<string, unknown>;
  sessionId: string;
}

const WORKSPACE_FILE_DRAG_TYPE = 'application/x-workspace-file';

function transferHasType(transfer: DataTransfer, type: string): boolean {
  return Array.from(transfer.types ?? []).includes(type);
}

function workspaceDragPaths(payload: string): string[] {
  return payload
    .split(/\r?\n/)
    .map((path) => path.trim())
    .filter(Boolean);
}

function browserFileFromContents(contents: unknown, name: string): File | null {
  if (contents instanceof File) {
    return contents.name === name ? contents : new File([contents], name, { type: contents.type });
  }
  if (contents instanceof Blob) {
    return new File([contents], name, { type: contents.type || 'application/octet-stream' });
  }
  if (typeof contents === 'string') {
    return new File([contents], name, { type: 'text/plain' });
  }
  if (contents instanceof ArrayBuffer) {
    return new File([contents], name);
  }
  if (ArrayBuffer.isView(contents)) {
    const bytes = new Uint8Array(contents.buffer, contents.byteOffset, contents.byteLength);
    return new File([bytes], name);
  }
  return null;
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

    .cognitive-shell.drag-over {
      outline: 2px dashed var(--wa-color-brand-border-normal);
      outline-offset: -2px;
      background: color-mix(in srgb, var(--wa-color-brand-fill-quiet) 35%, transparent);
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
      width: 90%;
      min-width: 90%;
      max-width: 90%;
      align-self: flex-start;
      align-items: stretch;
    }

    .msg.user {
      align-self: flex-end;
    }

    .msg .bubble,
    .msg wa-details.msg-details {
      width: 100%;
      box-sizing: border-box;
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
      overflow-wrap: anywhere;
    }

    .bubble.markdown {
      white-space: normal;
    }

    .bubble.markdown > :first-child {
      margin-block-start: 0;
    }

    .bubble.markdown > :last-child {
      margin-block-end: 0;
    }

    .bubble.markdown pre {
      overflow-x: auto;
      padding: var(--wa-space-s);
      border-radius: var(--wa-border-radius-m);
      background: color-mix(in srgb, var(--wa-color-neutral-fill-quiet) 55%, transparent);
    }

    .bubble.markdown code {
      font-family: var(--wa-font-family-code, ui-monospace, monospace);
      font-size: 0.92em;
    }

    .bubble.markdown pre code {
      font-size: inherit;
    }

    .bubble.markdown a {
      color: var(--wa-color-brand-on-normal);
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
      padding-inline: var(--wa-space-2xs);
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

    .composer-meter {
      display: flex;
      align-items: center;
      gap: var(--wa-space-2xs);
      margin-bottom: var(--wa-space-2xs);
    }

    .context-bar {
      --track-height: 1rem;
      flex: 1 1 auto;
      min-width: 0;
      cursor: pointer;
    }

    .context-bar::part(progress-bar) {
      border-radius: 0;
    }

    .context-bar:focus-visible::part(progress-bar) {
      outline: var(--wa-focus-ring-width, 2px) solid var(--wa-color-focus, #3b82f6);
      outline-offset: -2px;
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

    .context-io {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--wa-space-2xs);
      padding-top: var(--wa-space-s);
      border-top: var(--wa-border-width-s) solid var(--wa-color-border-normal);
      font-size: var(--wa-font-size-xs);
    }

    .context-io-heading {
      grid-column: 1 / -1;
      font-weight: var(--wa-font-weight-semibold, 600);
    }

    .context-io-item {
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
    }

    .context-io-item span {
      color: var(--wa-color-text-quiet);
    }

    .context-io-item strong {
      font-variant-numeric: tabular-nums;
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
      flex-direction: column;
      gap: var(--wa-space-2xs);
      flex: 1;
      min-width: 0;
    }

    .queued-prompt {
      display: flex;
      align-items: center;
      gap: var(--wa-space-2xs);
      padding: var(--wa-space-2xs) var(--wa-space-s);
      border-radius: var(--wa-border-radius-m);
      border: var(--wa-border-width-s) solid var(--wa-color-border-normal);
      background: color-mix(in srgb, var(--wa-color-brand-fill-quiet) 40%, transparent);
      color: var(--wa-color-text-quiet);
      font-size: var(--wa-font-size-s);
      min-width: 0;
    }

    .queued-prompt-text {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .composer-row {
      display: flex;
      gap: var(--wa-space-s);
      align-items: flex-end;
    }

    .composer wa-textarea {
      flex: 1;
      min-width: 0;
      margin: 0;
    }

    .composer wa-textarea[appearance='plain']::part(textarea-wrapper) {
      background-color: transparent;
      border-color: transparent;
      margin: 0;
      padding: 0;
    }

    .composer wa-textarea[appearance='plain']::part(textarea) {
      margin: 0;
      padding: var(--wa-space-2xs);
    }

    .composer-actions {
      display: flex;
      align-items: center;
      gap: var(--wa-space-2xs);
      flex-shrink: 0;
    }

    .composer-meter wa-button.attach-count {
      display: flex;
      align-items: center;
      flex: 0 0 auto;
      height: 1rem;
      --wa-form-control-height: 1rem;
      --wa-form-control-padding-inline: 0;
      margin: 0;
      line-height: 1;
      overflow: visible;
    }

    .composer-meter wa-button.attach-count::part(label) {
      display: flex;
      align-items: center;
      line-height: 1;
    }

    .attach-count-mark {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      min-width: 1rem;
      height: 1rem;
      padding-inline: var(--wa-space-2xs);
      border-radius: var(--wa-border-radius-s);
      background-color: var(--wa-color-brand-fill-loud);
      color: var(--wa-color-brand-on-loud);
      font-size: 0.75rem;
      line-height: 1;
    }

    wa-dropdown.attach-menu::part(menu) {
      min-width: 18rem;
      max-width: min(24rem, 92vw);
      padding: var(--wa-space-2xs);
    }

    .attach-panel {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-2xs);
      max-height: min(22rem, 50vh);
    }

    .attach-list {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-2xs);
      overflow: auto;
      min-height: 0;
    }

    .attach-row {
      display: flex;
      align-items: center;
      gap: var(--wa-space-2xs);
      min-width: 0;
    }

    .attach-preview-btn {
      display: flex;
      align-items: center;
      gap: var(--wa-space-s);
      flex: 1;
      min-width: 0;
      margin: 0;
      padding: var(--wa-space-2xs);
      border: none;
      border-radius: var(--wa-border-radius-s);
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: start;
      cursor: pointer;
    }

    .attach-preview-btn:hover {
      background: var(--wa-color-neutral-fill-quiet);
    }

    .attach-thumb,
    .msg-file-thumb {
      width: 2.5rem;
      height: 2.5rem;
      object-fit: cover;
      border-radius: var(--wa-border-radius-s);
      border: var(--wa-border-width-s) solid var(--wa-color-border-normal);
      flex-shrink: 0;
    }

    .attach-file-icon {
      display: grid;
      place-items: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: var(--wa-border-radius-s);
      border: var(--wa-border-width-s) solid var(--wa-color-border-normal);
      color: var(--wa-color-text-quiet);
      flex-shrink: 0;
    }

    .attach-name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: var(--wa-font-size-s);
    }

    .attach-empty {
      color: var(--wa-color-text-quiet);
      font-size: var(--wa-font-size-xs);
      padding: var(--wa-space-s);
    }

    .msg-file-thumb {
      width: 4.5rem;
      height: 4.5rem;
    }

    .attach-dialog-body {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-s);
      max-height: min(70vh, 40rem);
      overflow: auto;
    }

    .attach-dialog-image {
      max-width: 100%;
      height: auto;
      border-radius: var(--wa-border-radius-m);
    }

    .attach-dialog-text {
      margin: 0;
      white-space: pre-wrap;
      word-break: break-word;
      font-family: var(--wa-font-family-code, ui-monospace, monospace);
      font-size: var(--wa-font-size-s);
    }

    .msg-files {
      display: flex;
      flex-wrap: wrap;
      gap: var(--wa-space-2xs);
      margin-bottom: var(--wa-space-2xs);
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

    .tool-row {
      display: flex;
      align-items: center;
      gap: var(--wa-space-2xs);
      flex-wrap: wrap;
    }

    .tool-row .tool-heading {
      margin-bottom: 0;
      flex: 1;
      min-width: 0;
    }

    .tool-detail-body {
      max-height: min(70vh, 36rem);
      overflow: auto;
    }

    .tool-detail-body pre {
      margin: 0;
      font-family: var(--wa-font-family-code, var(--wa-font-mono));
      font-size: var(--wa-font-size-xs);
      white-space: pre-wrap;
      word-break: break-word;
    }
  `;

  @query('wa-textarea') private textarea?: HTMLElement & { value: string; shadowRoot: ShadowRoot | null };
  @query('#attach-file-input') private fileInput?: HTMLInputElement;
  private composerPasteBound = false;

  @state() private sessions: CognitiveSession[] = [];
  @state() private focusedId: string | null = null;
  @state() private draft = '';
  /** Session attachment ids to publish with the next user turn. */
  @state() private pendingAttachmentIds: string[] = [];
  @state() private attachmentLanded = false;
  @state() private dragOver = false;
  @state() private previewAttachmentId: string | null = null;
  @state() private toolDetail: Extract<MessagePart, { type: 'tool' }> | null = null;
  @state() private busy = false;
  @state() private busyStatus = INITIAL_BUSY_STATUS;
  /** Follow-up composed while a turn is running; sent automatically when the turn ends. */
  @state() private queuedPrompt: { text: string; attachmentIds: string[] } | null = null;
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
  private unsubs: string[] = [];
  private scrollDebounceTimer?: ReturnType<typeof setTimeout>;
  private busyStatusTimer?: ReturnType<typeof setTimeout>;
  private promptController: AbortController | null = null;
  private nativePasteHandler = (e: Event) => void this.onComposerPaste(e as ClipboardEvent);
  private cancelKeyHandler = (e: KeyboardEvent) => {
    if (!this.busy || e.key !== 'Escape') return;
    e.preventDefault();
    this.cancelTurn();
  };

  protected updated(): void {
    this.bindComposerPaste();
  }

  private bindComposerPaste(): void {
    if (this.composerPasteBound) return;
    const native = this.textarea?.shadowRoot?.querySelector('textarea');
    if (!native) return;
    native.addEventListener('paste', this.nativePasteHandler);
    this.composerPasteBound = true;
  }

  protected doBeforeUI(): void {
    cognitiveRuntime.start();
    this.syncSessions();
    this.syncModels();
    this.approvalMode = cognitiveRuntime.getApprovalMode();
    void cognitiveRuntime.whenReady().then(() => {
      this.syncSessions();
      this.restoreRoutingFromRuntime();
      this.scheduleScrollToBottom();
    });
    this.unsubs.push(
      subscribe(TOPIC.sessionChanged, () => {
        this.syncSessions();
        this.scheduleScrollToBottom();
      }),
      subscribe(TOPIC.providersChanged, () => this.onProvidersChanged()),
      subscribe(TOPIC.approvalModeChanged, (mode) => {
        this.approvalMode = mode as ToolApprovalMode;
      }),
      subscribe(TOPIC.permissionAsked, (payload) => {
        this.pendingPermission = payload as PermissionRequest;
        this.scheduleScrollToBottom();
      }),
      subscribe(TOPIC.messagePart, (payload) => {
        const { sessionId, part } = payload as { sessionId: string; part: MessagePart };
        if (sessionId !== this.focusedId) return;
        this.streamingParts = mergePart(this.streamingParts, part);
        this.scheduleScrollToBottom();
      }),
      subscribe(TOPIC.messageDone, () => {
        this.streamingParts = [];
        this.syncSessions();
        this.scheduleScrollToBottom();
      }),
    );
  }

  protected doClose(): void {
    if (this.scrollDebounceTimer) clearTimeout(this.scrollDebounceTimer);
    this.scrollDebounceTimer = undefined;
    this.cancelTurn();
    this.stopBusyStatus();
    const native = this.textarea?.shadowRoot?.querySelector('textarea');
    native?.removeEventListener('paste', this.nativePasteHandler);
    this.composerPasteBound = false;
    for (const token of this.unsubs) unsubscribe(token);
    this.unsubs = [];
  }

  private startBusyStatus(): void {
    this.stopBusyStatus();
    this.busyStatus = INITIAL_BUSY_STATUS;
    window.addEventListener('keydown', this.cancelKeyHandler);
    const schedule = () => {
      this.busyStatusTimer = setTimeout(() => {
        this.busyStatus = nextBusyStatus(this.busyStatus);
        schedule();
      }, busyStatusRotateMs());
    };
    schedule();
  }

  private stopBusyStatus(): void {
    if (this.busyStatusTimer) clearTimeout(this.busyStatusTimer);
    this.busyStatusTimer = undefined;
    this.busyStatus = INITIAL_BUSY_STATUS;
    window.removeEventListener('keydown', this.cancelKeyHandler);
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
      cognitiveRuntime.removeSession(sessionId);
    } else {
      cognitiveRuntime.removeSession(sessionId);
    }
    this.streamingParts = [];
    this.syncSessions();
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
        m.parts.some((p) => {
          if (p.type === 'text') return p.text.toLowerCase().includes(q);
          if (p.type === 'file') {
            return (
              p.name.toLowerCase().includes(q) ||
              p.id.toLowerCase().includes(q) ||
              (p.path?.toLowerCase().includes(q) ?? false)
            );
          }
          return false;
        }),
      );
    });
  }

  private syncModels(): void {
    this.modelIds = cognitiveRuntime.listConfiguredModels();
    if (!this.manualModel || !this.modelIds.includes(this.manualModel)) {
      this.manualModel = this.modelIds[0] ?? cognitiveRuntime.defaultModelId();
    }
  }

  /** Mirror persisted runtime policy into the gear menu after hydrate. */
  private restoreRoutingFromRuntime(): void {
    this.syncModels();
    const policy = cognitiveRuntime.getModelPolicy();
    if (policy.mode === 'auto') {
      this.policyMode = 'auto';
      this.optimizeFor = policy.optimizeFor;
    } else {
      this.policyMode = 'manual';
      this.manualModel = policy.model;
      this.manualEffort = policy.effort ?? 'auto';
      if (!this.manualModel || !this.modelIds.includes(this.manualModel)) {
        this.manualModel = this.modelIds[0] ?? cognitiveRuntime.defaultModelId();
        this.applyPolicy();
      }
    }
    this.approvalMode = cognitiveRuntime.getApprovalMode();
  }

  private onProvidersChanged(): void {
    this.syncModels();
    if (this.policyMode !== 'manual') return;
    if (this.manualModel && this.modelIds.includes(this.manualModel)) return;
    this.manualModel = this.modelIds[0] ?? cognitiveRuntime.defaultModelId();
    this.applyPolicy();
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
        this.applyPolicy();
      }
      return;
    }
    if (value.startsWith('model:')) {
      const model = value.slice(6);
      if (!model) return;
      this.policyMode = 'manual';
      this.manualModel = model;
      this.applyPolicy();
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

  private async setComposerText(value: string): Promise<void> {
    this.draft = value;
    await this.updateComplete;
    if (this.textarea) this.textarea.value = value;
  }

  private async clearComposer(): Promise<void> {
    this.pendingAttachmentIds = [];
    if (this.fileInput) this.fileInput.value = '';
    await this.setComposerText('');
  }

  private sessionAttachments(): SessionAttachment[] {
    return this.focusedSession()?.attachments ?? [];
  }

  private previewAttachment(): SessionAttachment | undefined {
    if (!this.previewAttachmentId) return undefined;
    return this.sessionAttachments().find((a) => a.id === this.previewAttachmentId);
  }

  private openAttachmentPreview(attachmentId: string): void {
    this.previewAttachmentId = attachmentId;
  }

  private closeAttachmentPreview(): void {
    this.previewAttachmentId = null;
  }

  private removeSessionAttachment(attachmentId: string): void {
    const sessionId = this.focusedId ?? cognitiveRuntime.ensureSessionId();
    cognitiveRuntime.removeAttachment(sessionId, attachmentId);
    this.pendingAttachmentIds = this.pendingAttachmentIds.filter((id) => id !== attachmentId);
    if (this.previewAttachmentId === attachmentId) this.previewAttachmentId = null;
    this.syncSessions();
  }

  private async saveAttachmentToWorkspace(attachmentId: string): Promise<void> {
    const attachment = this.sessionAttachments().find((a) => a.id === attachmentId);
    if (!attachment) return;

    const preferredName = attachmentSaveFileName(attachment);
    const parent = await filebrowserDialog('directory');
    if (!parent) return;

    try {
      const workspace = await workspaceService.getWorkspace();
      if (!workspace) {
        toastError('No workspace connected');
        return;
      }
      const parentPath = parent.replace(/\/$/, '');
      const fileName = await uniqueWorkspaceFileName(workspace, parentPath, preferredName);
      const path = `${parentPath}/${fileName}`;
      const resource = await workspace.getResource(path, { create: true });
      if (!(resource instanceof WorkspaceFile)) {
        toastError('Could not create file in the selected folder');
        return;
      }

      if (attachment.dataUrl) {
        const blob = await (await fetch(attachment.dataUrl)).blob();
        const named = new globalThis.File([blob], fileName, {
          type: blob.type || attachment.mime || '',
        });
        await resource.saveContents(named, { contentType: FileContentType.BINARY });
      } else if (attachment.text != null) {
        await resource.saveContents(attachment.text);
      } else {
        toastError('Attachment has no payload to save');
        return;
      }
      toastInfo(`Saved ${fileName}`);
    } catch (err) {
      toastError(err instanceof Error ? err.message : String(err));
    }
  }

  private async addFiles(fileList: FileList | File[]): Promise<void> {
    const files = [...fileList];
    if (!files.length) return;

    const sessionId = cognitiveRuntime.ensureSessionId(this.focusedId ?? undefined);
    this.focusedId = sessionId;
    const existing = this.sessionAttachments();
    const accepted: PromptAttachment[] = [];

    for (const file of files) {
      if (existing.length + accepted.length >= MAX_ATTACHMENTS) {
        toastError(`At most ${MAX_ATTACHMENTS} files per session`);
        break;
      }
      if (
        existing.some((a) => a.name === file.name && a.byteLength === file.size) ||
        accepted.some((a) => a.name === file.name && a.byteLength === file.size)
      ) {
        continue;
      }
      const result = await readPromptAttachmentFromFile(file);
      if (!result.ok) {
        toastError(result.error);
        continue;
      }
      accepted.push(result.attachment);
    }

    const stored = await cognitiveRuntime.addAttachments(sessionId, accepted);
    if (stored.length) {
      this.pendingAttachmentIds = [
        ...this.pendingAttachmentIds,
        ...stored.map((a) => a.id).filter((id) => !this.pendingAttachmentIds.includes(id)),
      ];
      this.playAttachmentLanded();
    }
    this.syncSessions();
  }

  private playAttachmentLanded(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!this.attachmentLanded) {
      this.attachmentLanded = true;
      return;
    }
    this.attachmentLanded = false;
    void this.updateComplete.then(() => {
      this.attachmentLanded = true;
    });
  }

  private openFilePicker(): void {
    this.fileInput?.click();
  }

  private async onFileInputChange(e: Event): Promise<void> {
    const input = e.target as HTMLInputElement;
    if (input.files?.length) await this.addFiles(input.files);
    input.value = '';
  }

  private acceptsAttachmentDrag(transfer: DataTransfer | null): boolean {
    if (!transfer) return false;
    return transferHasType(transfer, 'Files') || transferHasType(transfer, WORKSPACE_FILE_DRAG_TYPE);
  }

  private onViewDragOver(e: DragEvent): void {
    if (!this.acceptsAttachmentDrag(e.dataTransfer)) return;
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
    this.dragOver = true;
  }

  private onViewDragLeave(e: DragEvent): void {
    const shell = e.currentTarget as HTMLElement;
    const next = e.relatedTarget as Node | null;
    if (next && shell.contains(next)) return;
    this.dragOver = false;
  }

  private async onViewDrop(e: DragEvent): Promise<void> {
    e.preventDefault();
    this.dragOver = false;
    const transfer = e.dataTransfer;
    if (!transfer) return;
    if (transfer.files?.length) {
      await this.addFiles(transfer.files);
      return;
    }
    if (transferHasType(transfer, WORKSPACE_FILE_DRAG_TYPE)) {
      await this.addWorkspaceFiles(transfer.getData(WORKSPACE_FILE_DRAG_TYPE));
    }
  }

  private async addWorkspaceFiles(payload: string): Promise<void> {
    const paths = workspaceDragPaths(payload);
    if (!paths.length) return;

    const workspace = await workspaceService.getWorkspace();
    if (!workspace) {
      toastError('No workspace connected');
      return;
    }

    const files: File[] = [];
    let skippedFolder = false;
    for (const path of paths) {
      const resource = await workspace.getResource(path);
      if (!resource) {
        toastError(`Not found: ${path}`);
        continue;
      }
      if (!(resource instanceof WorkspaceFile)) {
        skippedFolder = true;
        continue;
      }
      const contents = await resource.getContents({ blob: true });
      const file = browserFileFromContents(contents, resource.getName());
      if (!file) {
        toastError(`Couldn't read ${resource.getName()}`);
        continue;
      }
      files.push(file);
    }

    if (skippedFolder) toastInfo('Only files can be attached');
    if (files.length) await this.addFiles(files);
  }

  /** Attach clipboard files/images (e.g. Ctrl+V screenshot) when focused in the prompt. */
  private async onComposerPaste(e: ClipboardEvent): Promise<void> {
    const files = filesFromClipboard(e.clipboardData);
    if (!files.length) return;
    e.preventDefault();
    await this.addFiles(files);
  }

  private cancelTurn(): void {
    if (!this.busy && !this.promptController) return;
    this.promptController?.abort();
    if (this.pendingPermission) this.resolvePermission('deny');
  }

  private clearQueuedPrompt(): void {
    this.queuedPrompt = null;
  }

  private async queueFollowUp(text: string, attachmentIds: string[]): Promise<void> {
    this.queuedPrompt = { text, attachmentIds };
    this.pendingAttachmentIds = [];
    if (this.fileInput) this.fileInput.value = '';
    await this.setComposerText('');
  }

  private async send(): Promise<void> {
    const text = this.draft.trim();
    const attachmentIds = [...this.pendingAttachmentIds];
    if (!text && !attachmentIds.length) return;

    // Cursor-like: keep typing during a run; Enter queues a follow-up for after this turn.
    if (this.busy) {
      await this.queueFollowUp(text, attachmentIds);
      return;
    }

    this.applyPolicy();
    this.pendingAttachmentIds = [];
    if (this.fileInput) this.fileInput.value = '';
    await this.setComposerText('');
    const controller = new AbortController();
    this.promptController = controller;
    this.busy = true;
    this.streamingParts = [];
    this.startBusyStatus();
    try {
      await cognitiveRuntime.prompt({
        sessionId: this.focusedId ?? undefined,
        text,
        attachmentIds,
        signal: controller.signal,
      });
    } finally {
      if (this.promptController === controller) this.promptController = null;
      this.stopBusyStatus();
      this.busy = false;
      this.streamingParts = [];
      this.syncSessions();
      this.scheduleScrollToBottom();
      const next = this.queuedPrompt;
      this.queuedPrompt = null;
      if (next && (next.text.trim() || next.attachmentIds.length)) {
        this.draft = next.text;
        this.pendingAttachmentIds = next.attachmentIds;
        await this.updateComplete;
        if (this.textarea) this.textarea.value = next.text;
        await this.send();
        return;
      }
      this.textarea?.focus();
    }
  }

  private renderAttachmentDropdown() {
    const attachments = this.sessionAttachments();
    const count = attachments.length;
    return html`
      <wa-dropdown class="attach-menu" size="s" placement="top-end" distance="4">
        <wa-button
          slot="trigger"
          class="attach-count"
          size="s"
          appearance="plain"
          title=${count ? `${count} attachment${count === 1 ? '' : 's'}` : 'Attachments'}
          aria-label=${count ? `${count} attachment${count === 1 ? '' : 's'}` : 'Attachments'}
        >
          <wa-animation
            name="bounce"
            duration="2000"
            iterations="1"
            ?play=${this.attachmentLanded}
            @wa-finish=${() => {
              this.attachmentLanded = false;
            }}
          >
            <span class="attach-count-mark">
              ${count > 0
                ? count
                : html`<wa-icon name="paperclip" label="Attachments"></wa-icon>`}
            </span>
          </wa-animation>
        </wa-button>
        <div
          class="attach-panel"
          @click=${(e: Event) => e.stopPropagation()}
          @keydown=${(e: Event) => e.stopPropagation()}
        >
          ${count
            ? html`
                <div class="attach-list">
                  ${attachments.map(
                    (file) => html`
                      <div class="attach-row">
                        <button
                          type="button"
                          class="attach-preview-btn"
                          title="Open ${file.name}"
                          @click=${() => this.openAttachmentPreview(file.id)}
                        >
                          ${file.kind === 'image' && file.dataUrl
                            ? html`<img
                                class="attach-thumb"
                                src=${file.dataUrl}
                                alt=${file.name}
                              />`
                            : html`
                                <span class="attach-file-icon">
                                  <wa-icon name="file" label=""></wa-icon>
                                </span>
                              `}
                          <span class="attach-name">${file.name}</span>
                        </button>
                        <wa-button
                          size="s"
                          appearance="plain"
                          title=${`Save ${file.name} to workspace folder`}
                          @click=${() => void this.saveAttachmentToWorkspace(file.id)}
                        >
                          <wa-icon name="floppy-disk" label=${`Save ${file.name}`}></wa-icon>
                        </wa-button>
                        <wa-button
                          size="s"
                          appearance="plain"
                          title="Remove from session"
                          @click=${() => this.removeSessionAttachment(file.id)}
                        >
                          <wa-icon name="xmark" label="Remove"></wa-icon>
                        </wa-button>
                      </div>
                    `,
                  )}
                </div>
              `
            : html`<div class="attach-empty">No attachments in this session</div>`}
          <wa-button
            size="s"
            appearance="outlined"
            ?disabled=${count >= MAX_ATTACHMENTS}
            @click=${() => this.openFilePicker()}
          >
            <wa-icon slot="start" name="plus"></wa-icon>
            Add files…
          </wa-button>
        </div>
      </wa-dropdown>
    `;
  }

  private renderAttachmentDialog() {
    const preview = this.previewAttachment();
    if (!preview) return nothing;
    return html`
      <wa-dialog
        label=${preview.name}
        open
        light-dismiss
        with-footer
        style="--width: min(40rem, 94vw)"
        @wa-after-hide=${() => this.closeAttachmentPreview()}
      >
        <div class="attach-dialog-body">
          ${preview.kind === 'image' && preview.dataUrl
            ? html`<img class="attach-dialog-image" src=${preview.dataUrl} alt=${preview.name} />`
            : nothing}
          ${preview.text
            ? html`<pre class="attach-dialog-text">${preview.text}</pre>`
            : preview.kind === 'image' && preview.dataUrl
              ? nothing
              : html`<pre class="attach-dialog-text"></pre>`}
        </div>
        <div slot="footer">
          <wa-button
            variant="danger"
            appearance="outlined"
            @click=${() => this.removeSessionAttachment(preview.id)}
          >
            Remove
          </wa-button>
          <wa-button variant="brand" @click=${() => this.closeAttachmentPreview()}>Close</wa-button>
        </div>
      </wa-dialog>
    `;
  }

  private openToolDetail(part: Extract<MessagePart, { type: 'tool' }>): void {
    this.toolDetail = part;
  }

  private closeToolDetail(): void {
    this.toolDetail = null;
  }

  private renderToolDetailDialog() {
    const tool = this.toolDetail;
    if (!tool) return nothing;
    const label = `${tool.name} · ${tool.status}${tool.durationMs != null ? ` · ${tool.durationMs}ms` : ''}`;
    const body = JSON.stringify({ args: tool.args ?? {}, result: tool.result ?? null }, null, 2);
    return html`
      <wa-dialog
        label=${label}
        open
        light-dismiss
        with-footer
        style="--width: min(44rem, 96vw)"
        @wa-after-hide=${() => this.closeToolDetail()}
      >
        <div class="tool-detail-body">
          <pre>${body}</pre>
        </div>
        <div slot="footer">
          <wa-button variant="brand" @click=${() => this.closeToolDetail()}>Close</wa-button>
        </div>
      </wa-dialog>
    `;
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

  private activateOnKey(event: KeyboardEvent): void {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    (event.currentTarget as HTMLElement).click();
  }

  private contextMeterStyle(level: ContextUsage['level']): string {
    const tone = level === 'critical' ? 'danger' : level === 'warn' ? 'warning' : 'success';
    return [
      `--track-color: var(--wa-color-${tone}-fill-quiet)`,
      `--indicator-color: var(--wa-color-${tone}-fill-loud)`,
    ].join(';');
  }

  private renderContextDropdown() {
    const usage = this.contextUsage();
    const canCompact = (this.focusedSession()?.history.length ?? 0) > 12;
    const percentLabel = formatContextPercent(usage.percent);
    const title = `Context window ${percentLabel} · ~${formatTokenCount(usage.used)} / ${formatTokenCount(usage.limit)}`;
    const meterValue = Math.min(100, Math.max(usage.percent, usage.used > 0 ? 1 : 0));

    return html`
      <wa-dropdown
        class="context-menu"
        size="s"
        placement="top-end"
        distance="4"
      >
        <wa-progress-bar
          slot="trigger"
          class="context-bar"
          style=${this.contextMeterStyle(usage.level)}
          value=${meterValue}
          label=${title}
          title=${title}
          tabindex="0"
          @keydown=${(e: KeyboardEvent) => this.activateOnKey(e)}
        ></wa-progress-bar>

        <div
          class="context-panel"
          @click=${(e: Event) => e.stopPropagation()}
          @keydown=${(e: Event) => e.stopPropagation()}
        >
          <div class="context-header">
            <strong>Context window</strong>
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
              ~${formatTokenCount(usage.used)} in window · ${formatTokenCount(usage.remaining)} free of
              ${formatTokenCount(usage.limit)}
              · ${shortModelLabel(usage.modelRef)}
            </span>
          </div>
          <div
            class="context-io"
            title="Sum of provider-reported tokens across every model request in this chat. Each tool-loop call re-sends the prompt, so API input grows much faster than the context window fill."
          >
            <div class="context-io-heading">API usage (this chat)</div>
            <div class="context-io-item">
              <span>Input</span>
              <strong>${usage.inputTokens ? formatTokenCount(usage.inputTokens) : '—'}</strong>
            </div>
            <div class="context-io-item">
              <span>Output</span>
              <strong>${usage.outputTokens ? formatTokenCount(usage.outputTokens) : '—'}</strong>
            </div>
          </div>
          <div class="context-footer">
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
      <div
        class="cognitive-shell ${this.dragOver ? 'drag-over' : ''}"
        @dragover=${(e: DragEvent) => this.onViewDragOver(e)}
        @dragleave=${(e: DragEvent) => this.onViewDragLeave(e)}
        @drop=${(e: DragEvent) => void this.onViewDrop(e)}
      >
        <wa-scroller class="transcript" orientation="vertical">
          <div class="transcript-inner">
            <div class="transcript-spacer" aria-hidden="true"></div>
            ${session ? this.renderTranscript(session) : nothing}
          </div>
        </wa-scroller>

        <div class="composer-shell">
          <input
            id="attach-file-input"
            type="file"
            multiple
            accept=${ATTACHMENT_FILE_ACCEPT}
            hidden
            @change=${(e: Event) => void this.onFileInputChange(e)}
          />
          <div class="composer">
            ${this.queuedPrompt
              ? html`
                  <div class="queued-prompt" title="Sends automatically when the current turn finishes">
                    <wa-icon name="clock"></wa-icon>
                    <span class="queued-prompt-text">
                      Queued: ${this.queuedPrompt.text.trim() || `(${this.queuedPrompt.attachmentIds.length} attachment${this.queuedPrompt.attachmentIds.length === 1 ? '' : 's'})`}
                    </span>
                    <wa-button
                      size="s"
                      appearance="plain"
                      title="Remove queued follow-up"
                      @click=${() => this.clearQueuedPrompt()}
                    >
                      <wa-icon name="xmark" label="Remove queue"></wa-icon>
                    </wa-button>
                  </div>
                `
              : nothing}
            <div class="composer-row">
              <wa-textarea
                placeholder=${this.busy ? 'Add a follow-up…' : 'Prompt...'}
                size="s"
                appearance="plain"
                resize="auto"
                rows="1"
                .value=${this.draft}
                @input=${(e: Event) => {
                  this.draft = (e.target as HTMLTextAreaElement).value;
                }}
                @keydown=${(e: KeyboardEvent) => {
                  if (e.key === 'Escape' && this.busy) {
                    e.preventDefault();
                    this.cancelTurn();
                    return;
                  }
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    void this.send();
                  }
                }}
              ></wa-textarea>
              ${this.busy
                ? html`
                    <div class="composer-actions">
                      <wa-button
                        size="s"
                        appearance="plain"
                        variant="danger"
                        title="Stop (Esc)"
                        @click=${() => this.cancelTurn()}
                      >
                        <wa-icon name="stop" label="Stop"></wa-icon>
                      </wa-button>
                    </div>
                  `
                : nothing}
            </div>
          </div>
          <div class="composer-meter">
            ${this.renderContextDropdown()}
            ${this.renderAttachmentDropdown()}
          </div>
        </div>
        ${this.renderAttachmentDialog()}
        ${this.renderToolDetailDialog()}
      </div>
    `;
  }

  private renderTranscript(session: CognitiveSession) {
    // Show the live assistant row as soon as the turn starts (busy), not only after
    // the first streamed part — otherwise the transcript stays blank until tools/text arrive.
    const showStreaming = this.busy || this.streamingParts.length > 0;
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
      this.applyPolicy();
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
              .checked=${option.value === selected}
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
                  .checked=${selected === `model:${id}`}
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
                    .checked=${this.manualEffort === level}
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
              .checked=${this.approvalMode === option.value}
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

  private resolveAttachmentDataUrl(fileId: string): string | undefined {
    return this.focusedSession()?.attachments?.find((a) => a.id === fileId)?.dataUrl;
  }

  private renderMessage(message: ChatMessage) {
    if (message.role === 'user') {
      const files = message.parts.filter((p): p is Extract<MessagePart, { type: 'file' }> => p.type === 'file');
      const texts = message.parts.filter((p) => p.type === 'text');
      return html`
        <div class="msg user">
          ${files.length
            ? html`
                <div class="msg-files">
                  ${files.map((file) => {
                    const dataUrl =
                      file.kind === 'image' ? this.resolveAttachmentDataUrl(file.id) : undefined;
                    return dataUrl
                      ? html`<img
                          class="msg-file-thumb"
                          src=${dataUrl}
                          alt=${file.name}
                          title=${`${file.name} (${file.id})`}
                        />`
                      : html`
                          <wa-tag
                            size="s"
                            appearance="outlined"
                            title=${`${file.path || file.name} (${file.id})`}
                          >
                            <wa-icon slot="start" name=${file.kind === 'image' ? 'image' : 'file'}></wa-icon>
                            ${file.name}
                          </wa-tag>
                        `;
                  })}
                </div>
              `
            : nothing}
          ${texts.map((p) => this.renderTextPart(p))}
          ${this.renderMessageMeta(message)}
        </div>
      `;
    }
    return this.renderAssistantMessage(message);
  }

  private renderAssistantMessage(message: ChatMessage, opts: { streaming?: boolean } = {}) {
    const { summaryText, techParts } = splitAssistantPresentation(message.parts);
    const open =
      opts.streaming === true ||
      techParts.some((p) => (p.type === 'reasoning' || p.type === 'tool') && p.status === 'streaming');

    const summaryBubble = summaryText.length
      ? summaryText.map((p) => this.renderTextPart(p, { markdown: true }))
      : opts.streaming
        ? nothing
        : html`<div class="bubble">${technicalSummary(techParts)}</div>`;

    const summary = html`
      <div slot="summary" class="msg-summary">
        ${opts.streaming
          ? html`
              <div class="streaming-meta">
                <wa-spinner style="font-size: 0.85rem"></wa-spinner>
                <span>${this.busy ? this.busyStatus : 'streaming…'}</span>
              </div>
            `
          : nothing}
        ${summaryBubble}
      </div>
    `;

    if (!techParts.length) {
      return html`
        <div class="msg assistant">
          ${opts.streaming
            ? html`
                <div class="streaming-meta">
                  <wa-spinner style="font-size: 0.85rem"></wa-spinner>
                  <span>${this.busy ? this.busyStatus : 'streaming…'}</span>
                </div>
              `
            : nothing}
          ${summaryBubble}
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

  private renderTextPart(part: MessagePart, opts: { markdown?: boolean } = {}) {
    if (part.type !== 'text') return nothing;
    if (opts.markdown) {
      return html`<div class="bubble markdown">${unsafeHTML(parseMarkdownHtml(part.text))}</div>`;
    }
    return html`<div class="bubble">${part.text}</div>`;
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
      const hasDetail = part.args != null || part.result != null || part.status === 'error';
      return html`
        <div class="tool-row">
          <div class="tool-heading">${heading}</div>
          ${hasDetail
            ? html`
                <wa-button
                  size="s"
                  appearance="plain"
                  variant="neutral"
                  @click=${() => this.openToolDetail(part)}
                >
                  Details
                </wa-button>
              `
            : nothing}
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
  { value: 'auto_safe', label: 'Auto-approve non-critical' },
  { value: 'manual', label: 'Manual' },
  { value: 'auto_all', label: 'Approve all' },
];

function capitalize(value: string): string {
  return value ? value[0]!.toUpperCase() + value.slice(1) : value;
}

/** Basename used when saving an attachment into a workspace folder. */
function attachmentSaveFileName(attachment: SessionAttachment): string {
  const fromName = attachment.name.trim().split(/[/\\]/).pop()?.trim();
  if (fromName) return fromName;
  const fromPath = attachment.path?.split(/[/\\]/).pop()?.trim();
  if (fromPath) return fromPath;
  if (attachment.kind === 'image') {
    return attachment.mime === 'image/jpeg' ? 'attachment.jpg' : 'attachment.png';
  }
  return 'attachment.txt';
}

/** `photo.png` → `photo (1).png`, `photo (2).png`, … when the path is taken. */
function withNumericSuffix(fileName: string, n: number): string {
  const dot = fileName.lastIndexOf('.');
  if (dot > 0) {
    return `${fileName.slice(0, dot)} (${n})${fileName.slice(dot)}`;
  }
  return `${fileName} (${n})`;
}

async function uniqueWorkspaceFileName(
  workspace: { getResource(path: string): Promise<unknown> },
  parentPath: string,
  fileName: string,
): Promise<string> {
  const candidatePath = (name: string) => `${parentPath}/${name}`;
  if (!(await workspace.getResource(candidatePath(fileName)))) return fileName;
  for (let n = 1; n < 10_000; n++) {
    const next = withNumericSuffix(fileName, n);
    if (!(await workspace.getResource(candidatePath(next)))) return next;
  }
  return withNumericSuffix(fileName, Date.now());
}

/**
 * Prefer text after the last tool/reasoning as the visible reply.
 * Interim narration stays out of the bubble — tool details cover the execution trail.
 */
function splitAssistantPresentation(parts: MessagePart[]): {
  summaryText: Array<Extract<MessagePart, { type: 'text' }>>;
  techParts: MessagePart[];
} {
  const techParts = parts.filter((p) => p.type !== 'text');
  let lastTechIndex = -1;
  for (let i = 0; i < parts.length; i++) {
    if (parts[i]!.type !== 'text') lastTechIndex = i;
  }

  if (lastTechIndex < 0) {
    return {
      summaryText: parts.filter((p): p is Extract<MessagePart, { type: 'text' }> => p.type === 'text'),
      techParts,
    };
  }

  const afterTools = parts
    .slice(lastTechIndex + 1)
    .filter((p): p is Extract<MessagePart, { type: 'text' }> => p.type === 'text')
    .filter((p) => p.text.trim());

  if (afterTools.length) {
    return { summaryText: afterTools, techParts };
  }

  // Tools ran but no trailing reply yet (streaming) — keep the bubble light.
  return { summaryText: [], techParts };
}

function technicalSummary(parts: MessagePart[]): string {
  const tools = parts.filter((p): p is Extract<MessagePart, { type: 'tool' }> => p.type === 'tool');
  const done = tools.filter((t) => t.status === 'done').length;
  const errors = tools.filter((t) => t.status === 'error').length;
  if (!tools.length) {
    if (parts.some((p) => p.type === 'reasoning')) return 'Thinking…';
    return 'Details';
  }
  if (errors && done) return `Finished with ${errors} issue${errors === 1 ? '' : 's'} (${done} ok).`;
  if (errors) return `Couldn't complete ${errors} step${errors === 1 ? '' : 's'}.`;
  if (tools.some((t) => t.status === 'running' || t.status === 'preparing')) {
    return 'Working…';
  }
  return done === 1 ? 'Done.' : `Done · ${done} steps.`;
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

function filesFromClipboard(data: DataTransfer | null): File[] {
  if (!data) return [];

  const fromFiles = [...(data.files ?? [])].filter((f) => f && f.size > 0);
  if (fromFiles.length) return fromFiles;

  const fromItems: File[] = [];
  for (const item of data.items ?? []) {
    if (item.kind !== 'file') continue;
    const file = item.getAsFile();
    if (!file || file.size <= 0) continue;
    fromItems.push(nameClipboardFile(file, item.type));
  }
  return fromItems;
}

function nameClipboardFile(file: File, mimeHint?: string): File {
  const mime = (file.type || mimeHint || 'application/octet-stream').toLowerCase();
  if (file.name && file.name !== 'image.png' && file.name !== 'blob') return file;
  const ext =
    mime === 'image/jpeg' || mime === 'image/jpg'
      ? 'jpg'
      : mime === 'image/png'
        ? 'png'
        : mime === 'image/gif'
          ? 'gif'
          : mime === 'image/webp'
            ? 'webp'
            : mime === 'image/svg+xml'
              ? 'svg'
              : mime.startsWith('image/')
                ? 'png'
                : 'bin';
  const name = `clipboard-${Date.now()}.${ext}`;
  return new File([file], name, { type: mime || file.type, lastModified: file.lastModified });
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
