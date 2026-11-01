import { persistenceService } from '@eclipse-docks/core';
import type {
  ChatMessage,
  EffortLevel,
  MessagePart,
  ModelPolicy,
  PermissionAction,
  PromptAttachment,
  SessionAttachment,
  SpecialistRole,
  ToolApprovalMode,
} from './types';
import { MAX_ATTACHMENTS, toFileRefPart, toSessionAttachment } from './attachments';
import { createCoreState, coreTick, defaultNeeds } from './core';
import { CognitiveMemory } from './memory';
import {
  ModelRouter,
  OpenAICompatibleProvider,
  ProviderRegistry,
  PROVIDERS_PERSIST_KEY,
  catalogFromSettings,
  defaultProvidersSettings,
  listConfiguredModelIds,
  loadModelsCatalog,
  normalizeProvidersSettings,
  parseModelIds,
} from './models';
import type { ModelCatalogEntry, ModelProvider, ProvidersSettings, RouteRequest } from './models';
import { ToolBroker, registerWorkspaceTools, refreshCommandTools } from './tools';
import type { PermissionHandler } from './tools';
import { SessionRuntime } from './session';
import {
  attachmentUri,
  projectInMemoryMountToFolder,
  removeAttachmentFromWorkspace,
  removeSessionWorkspaceFolder,
  syncAttachmentsToWorkspace,
} from './session-workspace';
import { runSpecialistLoop, systemPromptFor } from './specialists';
import type { SystemPromptEnhancer } from './specialists';
import { summarizeDroppedHistory } from './compact/compaction';
import { RuntimeEvents, TOPIC } from './events';
import { detectEffortCapability } from './models/effort-support';

const PERSIST_KEY = 'cognitive/v1/state';
/** Auto-compact after a turn when live history exceeds this many messages. */
const AUTO_COMPACT_AFTER = 40;
/** Messages retained in the live transcript after compaction. */
const COMPACT_KEEP_COUNT = 12;

export class CognitiveRuntime {
  readonly events = new RuntimeEvents();
  readonly sessions = new SessionRuntime();
  readonly memory = new CognitiveMemory();
  readonly providers = new ProviderRegistry();
  readonly models = new ModelRouter();
  readonly tools = new ToolBroker();

  private core = createCoreState(defaultNeeds());
  private policy: ModelPolicy = { mode: 'auto', optimizeFor: 'balance' };
  private providersSettings: ProvidersSettings = defaultProvidersSettings();
  private approvalMode: ToolApprovalMode = 'auto_safe';
  private promptEnhancers: SystemPromptEnhancer[] = [];
  private permissionResolvers = new Map<string, (action: PermissionAction) => void>();
  private started = false;
  private ready: Promise<void> = Promise.resolve();

  start(): void {
    if (this.started) return;
    this.started = true;
    this.applyProvidersSettings(defaultProvidersSettings(), { persist: false, emit: false });
    registerWorkspaceTools(this.tools);
    this.tools.setApprovalMode(this.approvalMode);
    this.tools.setPermissionHandler(async (req) => this.requestPermission(req));
    this.ready = this.hydrateAll();
  }

  /** Resolves after initial provider/settings hydrate. */
  whenReady(): Promise<void> {
    this.start();
    return this.ready;
  }

  getProvidersSettings(): ProvidersSettings {
    return structuredClone(this.providersSettings);
  }

  /** Models available for routing (`providerId/modelId`), including external plugins. */
  listConfiguredModels(): string[] {
    const ids = listConfiguredModelIds(this.providersSettings);
    const seen = new Set(ids);
    for (const provider of this.providers.listExternal()) {
      const models = provider.listModels();
      if (!Array.isArray(models)) continue;
      for (const model of models) {
        const id = `${provider.id}/${model.id}`;
        if (seen.has(id)) continue;
        seen.add(id);
        ids.push(id);
      }
    }
    return ids;
  }

  async setProvidersSettings(settings: ProvidersSettings): Promise<void> {
    this.applyProvidersSettings(settings, { persist: true, emit: true });
  }

  /**
   * Register a plugin ModelProvider (e.g. WebLLM) that survives settings rebuilds.
   * Models from listModels() are merged into the router catalog as `providerId/modelId`.
   */
  registerExternalProvider(provider: ModelProvider): void {
    this.providers.registerExternal(provider);
    this.rebuildCatalog();
    this.events.publish(TOPIC.providersChanged, this.providersSettings);
  }

  unregisterExternalProvider(id: string): void {
    this.providers.unregisterExternal(id);
    this.rebuildCatalog();
    this.events.publish(TOPIC.providersChanged, this.providersSettings);
  }

  /** Append instructions to the specialist system prompt (e.g. RAG guidance). */
  addSystemPromptEnhancer(enhancer: SystemPromptEnhancer): () => void {
    this.promptEnhancers.push(enhancer);
    return () => {
      this.promptEnhancers = this.promptEnhancers.filter((e) => e !== enhancer);
    };
  }

  /** First catalog model for the default provider — used by Manual routing. */
  defaultModelId(): string {
    const catalog = catalogFromSettings(this.providersSettings);
    const preferred = catalog.find((e) => e.providerId === this.providersSettings.defaultProviderId);
    return preferred?.id ?? catalog[0]?.id ?? 'openai/gpt-4o-mini';
  }

  setModelPolicy(policy: ModelPolicy): void {
    const next = normalizeModelPolicy(policy) ?? this.policy;
    if (sameModelPolicy(this.policy, next)) return;
    this.policy = next;
    void this.persist();
  }

  getModelPolicy(): ModelPolicy {
    return this.policy;
  }

  getApprovalMode(): ToolApprovalMode {
    return this.approvalMode;
  }

  setApprovalMode(mode: ToolApprovalMode): void {
    const changed = this.approvalMode !== mode;
    this.approvalMode = mode;
    this.tools.setRules([]);
    this.tools.setApprovalMode(mode);
    this.tools.setPermissionHandler(async (req) => this.requestPermission(req));
    if (!changed) return;
    this.events.publish(TOPIC.approvalModeChanged, mode);
    void this.persist();
  }

  /** Low-level override; prefer {@link setApprovalMode} for the convenience modes. */
  setPermissionPolicy(policy: 'ask' | 'allow' | 'deny' | PermissionHandler): void {
    if (typeof policy === 'function') {
      this.tools.setPermissionHandler(policy);
      return;
    }
    if (policy === 'allow') this.setApprovalMode('auto_all');
    else if (policy === 'ask') this.setApprovalMode('manual');
    else {
      this.setApprovalMode('manual');
      this.tools.setRules([{ pattern: '*', action: 'deny' }]);
    }
    this.tools.setPermissionHandler(
      policy === 'allow' ? null : async (req) => this.requestPermission(req),
    );
  }

  resolvePermission(requestId: string, action: PermissionAction): void {
    const resolve = this.permissionResolvers.get(requestId);
    if (!resolve) return;
    this.permissionResolvers.delete(requestId);
    const focused = this.sessions.focused();
    if (focused?.status === 'waiting_approval') {
      this.sessions.update(focused.id, { status: 'running' });
      this.emitSessions();
    }
    resolve(action);
  }

  /** Emit session list changes and persist them. */
  commitSessions(): void {
    this.emitSessions();
    void this.persist();
  }

  /** Ensure a focused session exists and return its id. */
  ensureSessionId(sessionId?: string): string {
    this.start();
    if (sessionId && this.sessions.get(sessionId)) {
      this.sessions.focus(sessionId);
      return sessionId;
    }
    const focused = this.sessions.focused();
    if (focused) return focused.id;
    return this.sessions.createSession().id;
  }

  /** Store attachment payloads on the session and mirror them into in-memory/<sessionId>/. */
  async addAttachments(
    sessionId: string | undefined,
    attachments: PromptAttachment[],
  ): Promise<SessionAttachment[]> {
    const id = this.ensureSessionId(sessionId);
    const session = this.sessions.get(id);
    if (!session || !attachments.length) return [];

    const room = Math.max(0, MAX_ATTACHMENTS - (session.attachments?.length ?? 0));
    const accepted = attachments.slice(0, room).map((attachment) => {
      const stored = toSessionAttachment(attachment);
      return { ...stored, path: attachmentUri(id, stored) };
    });
    if (!accepted.length) return [];

    this.sessions.update(id, {
      attachments: [...(session.attachments ?? []), ...accepted],
    });
    this.commitSessions();
    await this.mirrorAttachments(id, accepted).catch(() => undefined);
    return accepted;
  }

  /** Remove an attachment payload from the session store and in-memory workspace. */
  removeAttachment(sessionId: string, attachmentId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;
    const removed = (session.attachments ?? []).find((a) => a.id === attachmentId);
    const next = (session.attachments ?? []).filter((a) => a.id !== attachmentId);
    if (next.length === (session.attachments?.length ?? 0)) return false;
    this.sessions.update(sessionId, { attachments: next });
    this.commitSessions();
    if (removed) void removeAttachmentFromWorkspace(sessionId, removed);
    return true;
  }

  /** Drop a session and its in-memory attachment folder. */
  removeSession(sessionId: string): boolean {
    const ok = this.sessions.remove(sessionId);
    if (ok) {
      void removeSessionWorkspaceFolder(sessionId);
      this.commitSessions();
    }
    return ok;
  }

  /**
   * Compact a session: drop older turns, store a summary (LLM when possible),
   * and persist. The summary is injected into later model calls.
   */
  async compactSession(
    sessionId: string,
    keepCount = COMPACT_KEEP_COUNT,
    signal?: AbortSignal,
  ): Promise<{ didCompact: boolean }> {
    this.start();
    await this.ready;
    const prepared = this.sessions.prepareCompact(sessionId, keepCount);
    if (!prepared?.didCompact) return { didCompact: false };

    this.sessions.update(sessionId, { status: 'compact' });
    this.emitSessions();

    let summary = prepared.summary;
    const resolved = this.models.resolve(
      { role: 'compact', complexity: 0.2, requireTools: false },
      this.policy,
    );
    const provider = this.providers.resolveProvider(resolved.model) ?? this.providers.list()[0];
    if (provider) {
      const llmSummary = await summarizeDroppedHistory({
        provider,
        model: resolved.model,
        dropped: prepared.dropped,
        previousSummary: this.sessions.get(sessionId)?.compactionSummary,
        providerOptions: resolved.providerOptions,
        signal,
      });
      if (llmSummary) summary = llmSummary;
    }

    this.sessions.update(sessionId, {
      history: prepared.kept,
      compactionSummary: summary,
      status: 'idle',
    });
    this.commitSessions();
    return { didCompact: true };
  }

  async prompt(input: {
    sessionId?: string;
    text: string;
    /** New payloads to store on the session and publish as refs in this turn. */
    attachments?: PromptAttachment[];
    /** Already-stored session attachment ids to publish as refs in this turn. */
    attachmentIds?: string[];
    role?: SpecialistRole;
    signal?: AbortSignal;
  }): Promise<ChatMessage> {
    this.start();
    await loadModelsCatalog().catch(() => undefined);
    const session =
      (input.sessionId ? this.sessions.get(input.sessionId) : this.sessions.focused()) ??
      this.sessions.createSession();

    const text = input.text.trim();
    const messageId = `msg-${Date.now()}-u`;
    const fresh = (input.attachments ?? []).slice(0, MAX_ATTACHMENTS).map((attachment) => {
      const stored = toSessionAttachment(attachment, { messageId });
      return { ...stored, path: attachmentUri(session.id, stored) };
    });
    if (fresh.length) {
      this.sessions.update(session.id, {
        attachments: [...(this.sessions.get(session.id)?.attachments ?? []), ...fresh],
      });
      await this.mirrorAttachments(session.id, fresh);
    }

    const existingIds = (input.attachmentIds ?? []).filter(Boolean);
    const stored = this.sessions.get(session.id)?.attachments ?? [];
    const byId = new Map(stored.map((a) => [a.id, a]));
    const published: SessionAttachment[] = [];
    for (const item of fresh) published.push(item);
    for (const id of existingIds) {
      const found = byId.get(id);
      if (found && !published.some((p) => p.id === found.id)) published.push(found);
    }

    if (!text && !published.length) {
      throw new Error('Prompt requires text or at least one attachment');
    }

    // Ensure already-stored attachments are present in the in-memory workspace.
    if (published.length) {
      await this.mirrorAttachments(session.id, published).catch(() => undefined);
    }

    const parts: MessagePart[] = [];
    if (text) parts.push({ type: 'text', text });
    for (const item of published) {
      parts.push(toFileRefPart({ ...item, path: item.path || attachmentUri(session.id, item) }));
    }

    const promptSummary = summarizePrompt(
      text,
      published.map((a) => ({ name: a.name, kind: a.kind })),
    );

    const userMessage: ChatMessage = {
      id: messageId,
      role: 'user',
      parts,
      createdAt: Date.now(),
    };
    this.sessions.addMessage(session.id, userMessage);
    if (isDefaultChatTitle(session.title)) {
      this.sessions.update(session.id, { title: titleFromPrompt(promptSummary) });
    }

    const contextChunk = this.memory.upsert({
      type: 'context',
      slots: { kind: 'user', summary: promptSummary },
      scope: 'session',
      sessionId: session.id,
      activation: 0.8,
    });
    const retrieved = this.memory.retrieveForContext(promptSummary.split(/\s+/).slice(0, 12));
    const buffers = {
      ...session.buffers,
      retrieval: retrieved[0] ?? contextChunk,
    };

    const tick = coreTick({ state: this.core, buffers, context: contextChunk });
    this.core = tick.state;
    this.sessions.update(session.id, { buffers: tick.buffers, status: 'running' });
    this.events.publish(TOPIC.coreTick, {
      valenceDelta: tick.valenceDelta,
      intent: tick.intent,
      conscious: tick.state.conscious,
    });

    const role = input.role ?? session.specialistMode ?? 'build';
    refreshCommandTools(this.tools, role);

    const routeReq: RouteRequest = {
      role,
      complexity: Math.min(1, text.length / 800),
      requireTools: true,
    };
    const resolved = this.models.resolve(routeReq, this.policy);
    this.events.publish(TOPIC.modelRouted, resolved);

    const provider = this.providers.resolveProvider(resolved.model) ?? this.providers.list()[0];
    if (!provider) {
      const err: ChatMessage = {
        id: `msg-${Date.now()}-e`,
        role: 'assistant',
        parts: [{ type: 'text', text: 'No model provider configured. Open AI Settings to add one.' }],
        createdAt: Date.now(),
      };
      this.sessions.addMessage(session.id, err);
      this.sessions.update(session.id, { status: 'idle' });
      this.emitSessions();
      return err;
    }

    const goal = tick.intent?.summary ?? promptSummary;
    const hasAttachments =
      published.length > 0 || (this.sessions.get(session.id)?.attachments?.length ?? 0) > 0;
    let systemPrompt = systemPromptFor(role, goal, { hasAttachments });
    for (const enhance of this.promptEnhancers) {
      systemPrompt = await enhance(systemPrompt, { role, goal, sessionId: session.id });
    }
    const liveSession = this.sessions.get(session.id)!;
    const result = await runSpecialistLoop({
      role,
      systemPrompt,
      history: liveSession.history,
      compactionSummary: liveSession.compactionSummary,
      resolved,
      provider,
      broker: this.tools,
      refreshTools: () => refreshCommandTools(this.tools, role),
      sessionId: session.id,
      signal: input.signal,
      onPart: (part) => this.events.publish(TOPIC.messagePart, { sessionId: session.id, part }),
    });

    this.models.recordOutcome(role, resolved.model, resolved.effort, result.success);
    this.sessions.addMessage(session.id, result.message);
    this.memory.upsert({
      type: 'episodic',
      slots: { kind: result.success ? 'progress' : 'error', summary: goal },
      scope: 'workspace',
      sessionId: session.id,
      activation: 0.7,
    });

    const aborted = Boolean(input.signal?.aborted);
    if (!aborted && (this.sessions.get(session.id)?.history.length ?? 0) > AUTO_COMPACT_AFTER) {
      await this.compactSession(session.id, COMPACT_KEEP_COUNT, input.signal);
    }

    this.sessions.update(session.id, { status: 'idle' });
    this.events.publish(TOPIC.messageDone, { sessionId: session.id, message: result.message });
    this.emitSessions();
    void this.persist();
    return result.message;
  }

  private applyProvidersSettings(
    settings: ProvidersSettings,
    opts: { persist: boolean; emit: boolean },
  ): void {
    const normalized = normalizeProvidersSettings(settings);
    this.providersSettings = normalized;
    this.providers.clear();
    const externalIds = new Set(this.providers.listExternal().map((p) => p.id));
    for (const entry of normalized.providers) {
      if (!entry.enabled || !entry.id) continue;
      // External plugins own this id (e.g. webllm) — skip OpenAI-compatible wrapper.
      if (externalIds.has(entry.id)) continue;
      const modelIds = parseModelIds(entry.models);
      this.providers.register(
        new OpenAICompatibleProvider({
          id: entry.id,
          baseUrl: entry.baseUrl || 'http://127.0.0.1',
          apiKey: entry.apiKey || undefined,
          defaultModels: modelIds.map((id) => ({ id, name: id })),
        }),
      );
    }
    this.rebuildCatalog();
    if (opts.emit) this.events.publish(TOPIC.providersChanged, normalized);
    if (opts.persist) void this.persistProviders();
  }

  private rebuildCatalog(): void {
    const catalog = catalogFromSettings(this.providersSettings);
    const seen = new Set(catalog.map((e) => e.id));
    for (const provider of this.providers.listExternal()) {
      const models = provider.listModels();
      const list = Array.isArray(models) ? models : [];
      for (const model of list) {
        const id = `${provider.id}/${model.id}`;
        if (seen.has(id)) continue;
        seen.add(id);
        catalog.push(externalCatalogEntry(id, provider.id));
      }
    }
    this.models.setCatalog(catalog);
  }

  private async requestPermission(req: {
    toolName: string;
    args: Record<string, unknown>;
    sessionId: string;
  }): Promise<PermissionAction> {
    const requestId = `perm-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    this.sessions.update(req.sessionId, { status: 'waiting_approval' });
    this.emitSessions();
    return new Promise((resolve) => {
      this.permissionResolvers.set(requestId, resolve);
      this.events.publish(TOPIC.permissionAsked, { requestId, ...req });
    });
  }

  private emitSessions(): void {
    const focusedId = this.sessions.focused()?.id ?? null;
    projectInMemoryMountToFolder(focusedId);
    this.events.publish(TOPIC.sessionChanged, {
      sessions: this.sessions.list(),
      focusedId,
    });
  }

  /** Live in-memory file refs that resolve payloads from the session store. */
  private mirrorAttachments(sessionId: string, attachments: SessionAttachment[]): Promise<void> {
    return syncAttachmentsToWorkspace(sessionId, attachments, (attachmentId) =>
      this.sessions.get(sessionId)?.attachments?.find((a) => a.id === attachmentId),
    );
  }

  private async hydrateAll(): Promise<void> {
    await loadModelsCatalog().catch(() => undefined);
    await this.hydrateProviders();
    // Re-apply so catalog effort flags use Models.dev metadata.
    this.applyProvidersSettings(this.providersSettings, { persist: false, emit: true });
    await this.hydrate();
    if (!this.sessions.list().length) this.sessions.createSession({ title: 'Chat' });
    const mostRecent = this.sessions.list()[0];
    if (mostRecent) this.sessions.focus(mostRecent.id);
    for (const session of this.sessions.list()) {
      const list = session.attachments ?? [];
      if (!list.length) continue;
      const stamped = list.map((a) =>
        a.path ? a : { ...a, path: attachmentUri(session.id, a) },
      );
      if (stamped.some((a, i) => a.path !== list[i]?.path)) {
        this.sessions.update(session.id, { attachments: stamped });
      }
      await this.mirrorAttachments(session.id, stamped).catch(() => undefined);
    }
    this.emitSessions();
  }

  private async hydrateProviders(): Promise<void> {
    try {
      const saved = (await persistenceService.getObject(PROVIDERS_PERSIST_KEY)) as ProvidersSettings | null;
      if (!saved?.providers?.length) return;
      this.applyProvidersSettings(saved, { persist: false, emit: true });
    } catch {
      // first run / unavailable persistence
    }
  }

  private async persistProviders(): Promise<void> {
    try {
      await persistenceService.persistObject(PROVIDERS_PERSIST_KEY, this.providersSettings);
    } catch {
      // ignore
    }
  }

  private async hydrate(): Promise<void> {
    try {
      const saved = (await persistenceService.getObject(PERSIST_KEY)) as
        | {
            sessions?: ReturnType<SessionRuntime['snapshot']>;
            memory?: ReturnType<CognitiveMemory['snapshot']>;
            approvalMode?: ToolApprovalMode;
            modelPolicy?: ModelPolicy;
          }
        | null;
      if (!saved) return;
      if (saved.sessions) this.sessions.loadSnapshot(saved.sessions);
      if (saved.memory) this.memory.restore(saved.memory);
      if (saved.approvalMode && isToolApprovalMode(saved.approvalMode)) {
        this.approvalMode = saved.approvalMode;
        this.tools.setApprovalMode(saved.approvalMode);
      }
      const policy = normalizeModelPolicy(saved.modelPolicy);
      if (policy) this.policy = policy;
    } catch {
      // first run / unavailable persistence
    }
  }

  private async persist(): Promise<void> {
    try {
      await persistenceService.persistObject(PERSIST_KEY, {
        sessions: this.sessions.snapshot(),
        memory: this.memory.snapshot(),
        approvalMode: this.approvalMode,
        modelPolicy: this.policy,
      });
    } catch {
      // ignore persistence failures in constrained environments
    }
  }
}

function isToolApprovalMode(value: unknown): value is ToolApprovalMode {
  return value === 'manual' || value === 'auto_safe' || value === 'auto_all';
}

function isOptimizeFor(value: unknown): value is 'cost' | 'balance' | 'intelligence' {
  return value === 'cost' || value === 'balance' || value === 'intelligence';
}

function isEffortOrAuto(value: unknown): value is EffortLevel | 'auto' {
  return (
    value === 'auto' ||
    value === 'none' ||
    value === 'minimal' ||
    value === 'low' ||
    value === 'medium' ||
    value === 'high' ||
    value === 'xhigh' ||
    value === 'max'
  );
}

function normalizeModelPolicy(value: unknown): ModelPolicy | null {
  if (!value || typeof value !== 'object') return null;
  const raw = value as Record<string, unknown>;
  if (raw.mode === 'auto' && isOptimizeFor(raw.optimizeFor)) {
    return { mode: 'auto', optimizeFor: raw.optimizeFor };
  }
  if (raw.mode === 'manual' && typeof raw.model === 'string' && raw.model.trim()) {
    return {
      mode: 'manual',
      model: raw.model.trim(),
      ...(isEffortOrAuto(raw.effort) ? { effort: raw.effort } : {}),
    };
  }
  return null;
}

function sameModelPolicy(a: ModelPolicy, b: ModelPolicy): boolean {
  if (a.mode !== b.mode) return false;
  if (a.mode === 'auto' && b.mode === 'auto') return a.optimizeFor === b.optimizeFor;
  if (a.mode === 'manual' && b.mode === 'manual') {
    return a.model === b.model && (a.effort ?? 'auto') === (b.effort ?? 'auto');
  }
  return false;
}

function externalCatalogEntry(id: string, providerId: string): ModelCatalogEntry {
  return {
    id,
    providerId,
    tier: 'standard',
    strengths: ['fast'],
    effort: detectEffortCapability(id),
  };
}

export const cognitiveRuntime = new CognitiveRuntime();

function isDefaultChatTitle(title: string): boolean {
  const t = title.trim().toLowerCase();
  return !t || t === 'chat' || t === 'new chat' || t === 'new session';
}

function titleFromPrompt(text: string): string {
  const trimmed = text.trim().replace(/\s+/g, ' ');
  if (!trimmed) return 'Chat';
  return trimmed.length <= 42 ? trimmed : `${trimmed.slice(0, 42).trimEnd()}…`;
}

function summarizePrompt(text: string, attachments: PromptAttachment[]): string {
  if (text) return text;
  if (!attachments.length) return '';
  if (attachments.length === 1) return `Attached ${attachments[0]!.name}`;
  return `Attached ${attachments.map((a) => a.name).join(', ')}`;
}
