import type {
  Checkpoint,
  ChatMessage,
  AiSession,
  ModelPolicy,
  SpecialistRole,
} from '../types';
import { compactHistory } from '../compact/compaction';

function sid(): string {
  return `session-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Drop `buffers` left on sessions saved before that field was removed. */
function withoutLegacyBuffers<T extends object>(value: T): Omit<T, 'buffers'> {
  const { buffers: _legacy, ...rest } = value as T & { buffers?: unknown };
  return rest;
}

export class SessionRuntime {
  private sessions = new Map<string, AiSession>();
  private checkpoints = new Map<string, Checkpoint[]>();
  private focusedId: string | null = null;

  createSession(input: { title?: string; parentSessionId?: string; specialistMode?: SpecialistRole } = {}): AiSession {
    const session: AiSession = {
      id: sid(),
      title: input.title ?? 'New session',
      status: 'idle',
      history: [],
      attachments: [],
      specialistMode: input.specialistMode ?? 'build',
      parentSessionId: input.parentSessionId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.sessions.set(session.id, session);
    this.checkpoints.set(session.id, []);
    this.focusedId = session.id;
    return session;
  }

  get(sessionId: string): AiSession | undefined {
    return this.sessions.get(sessionId);
  }

  list(): AiSession[] {
    return [...this.sessions.values()].sort((a, b) => b.updatedAt - a.updatedAt);
  }

  focus(sessionId: string): boolean {
    if (!this.sessions.has(sessionId)) return false;
    this.focusedId = sessionId;
    return true;
  }

  focused(): AiSession | undefined {
    return this.focusedId ? this.sessions.get(this.focusedId) : undefined;
  }

  remove(sessionId: string): boolean {
    if (!this.sessions.has(sessionId)) return false;
    this.sessions.delete(sessionId);
    this.checkpoints.delete(sessionId);
    if (this.focusedId === sessionId) {
      this.focusedId = this.list()[0]?.id ?? null;
    }
    return true;
  }

  update(sessionId: string, patch: Partial<AiSession>): AiSession | undefined {
    const session = this.sessions.get(sessionId);
    if (!session) return undefined;
    const next = { ...session, ...patch, updatedAt: Date.now() };
    this.sessions.set(sessionId, next);
    return next;
  }

  addMessage(sessionId: string, message: ChatMessage): void {
    const session = this.sessions.get(sessionId);
    if (!session) return;
    session.history = [...session.history, message];
    session.updatedAt = Date.now();
    this.sessions.set(sessionId, session);
  }

  checkpoint(sessionId: string, label?: string, toolEffectCount = 0): Checkpoint | undefined {
    const session = this.sessions.get(sessionId);
    if (!session) return undefined;
    const cp: Checkpoint = {
      id: `cp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      sessionId,
      label: label ?? `Checkpoint ${new Date().toLocaleString()}`,
      createdAt: Date.now(),
      messageSeq: session.history.length,
      compactionSummary: session.compactionSummary,
      specialistMode: session.specialistMode,
      toolEffectCount,
    };
    const list = this.checkpoints.get(sessionId) ?? [];
    list.push(cp);
    this.checkpoints.set(sessionId, list);
    return cp;
  }

  listCheckpoints(sessionId: string): Checkpoint[] {
    return [...(this.checkpoints.get(sessionId) ?? [])];
  }

  restore(input: {
    sessionId: string;
    checkpointId: string;
    mode?: 'in-place' | 'fork';
  }): { sessionId: string } | undefined {
    const session = this.sessions.get(input.sessionId);
    const list = this.checkpoints.get(input.sessionId) ?? [];
    const cp = list.find((c) => c.id === input.checkpointId);
    if (!session || !cp) return undefined;

    const history = session.history.slice(0, cp.messageSeq);

    if (input.mode === 'fork') {
      const forked = this.createSession({
        title: `${session.title} (restored)`,
        specialistMode: cp.specialistMode,
      });
      this.update(forked.id, {
        history,
        compactionSummary: cp.compactionSummary,
        status: 'idle',
      });
      return { sessionId: forked.id };
    }

    this.update(input.sessionId, {
      history,
      compactionSummary: cp.compactionSummary,
      specialistMode: cp.specialistMode,
      status: 'idle',
    });
    return { sessionId: input.sessionId };
  }

  /**
   * Truncate history and store a compaction summary.
   * Pass `summary` to override the extractive default (e.g. LLM summary).
   * Returns whether history was shortened.
   */
  compact(
    sessionId: string,
    keepCount = 12,
    summary?: string,
  ): { didCompact: boolean; summary: string } {
    const session = this.sessions.get(sessionId);
    if (!session) return { didCompact: false, summary: '' };
    const result = compactHistory(session.history, {
      keepCount,
      previousSummary: session.compactionSummary,
    });
    if (!result.didCompact) {
      return { didCompact: false, summary: session.compactionSummary ?? '' };
    }
    const nextSummary = (summary?.trim() || result.summary || session.compactionSummary || '').trim();
    this.update(sessionId, {
      history: result.kept,
      compactionSummary: nextSummary,
    });
    return { didCompact: true, summary: nextSummary };
  }

  /** Preview a compact without mutating (for LLM summarization of dropped turns). */
  prepareCompact(sessionId: string, keepCount = 12) {
    const session = this.sessions.get(sessionId);
    if (!session) return null;
    return compactHistory(session.history, {
      keepCount,
      previousSummary: session.compactionSummary,
    });
  }

  snapshot(): { sessions: AiSession[]; checkpoints: Record<string, Checkpoint[]> } {
    const checkpoints: Record<string, Checkpoint[]> = {};
    for (const [id, list] of this.checkpoints) checkpoints[id] = list.map((c) => ({ ...c }));
    return {
      sessions: this.list().map((s) => ({
        ...s,
        attachments: [...(s.attachments ?? [])],
        history: s.history.map((m) => ({ ...m, parts: [...m.parts] })),
      })),
      checkpoints,
    };
  }

  loadSnapshot(data: { sessions: AiSession[]; checkpoints: Record<string, Checkpoint[]> }): void {
    this.sessions.clear();
    this.checkpoints.clear();
    for (const raw of data.sessions) {
      const session = withoutLegacyBuffers(raw);
      this.sessions.set(session.id, {
        ...session,
        attachments: [...(session.attachments ?? [])],
        history: [...session.history],
      });
    }
    for (const [id, list] of Object.entries(data.checkpoints ?? {})) {
      this.checkpoints.set(
        id,
        list.map((c) => withoutLegacyBuffers(c)),
      );
    }
    this.focusedId = this.list()[0]?.id ?? null;
  }
}

export type { ModelPolicy };
