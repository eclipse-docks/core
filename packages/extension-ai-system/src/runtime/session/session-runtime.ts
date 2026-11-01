import type {
  BufferMap,
  Checkpoint,
  ChatMessage,
  CognitiveSession,
  ModelPolicy,
  SpecialistRole,
} from '../types';
import { emptyBuffers } from '../core/tick';
import { compactHistory } from '../compact/compaction';

function sid(): string {
  return `session-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function cloneBuffers(buffers: BufferMap): BufferMap {
  return {
    goal: buffers.goal ? { ...buffers.goal, slots: { ...buffers.goal.slots } } : null,
    retrieval: buffers.retrieval ? { ...buffers.retrieval, slots: { ...buffers.retrieval.slots } } : null,
    imaginal: buffers.imaginal ? { ...buffers.imaginal, slots: { ...buffers.imaginal.slots } } : null,
    emotion: buffers.emotion ? { ...buffers.emotion, slots: { ...buffers.emotion.slots } } : null,
    motor: buffers.motor ? { ...buffers.motor, slots: { ...buffers.motor.slots } } : null,
  };
}

export class SessionRuntime {
  private sessions = new Map<string, CognitiveSession>();
  private checkpoints = new Map<string, Checkpoint[]>();
  private focusedId: string | null = null;

  createSession(input: { title?: string; parentSessionId?: string; specialistMode?: SpecialistRole } = {}): CognitiveSession {
    const session: CognitiveSession = {
      id: sid(),
      title: input.title ?? 'New session',
      status: 'idle',
      history: [],
      buffers: emptyBuffers(),
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

  get(sessionId: string): CognitiveSession | undefined {
    return this.sessions.get(sessionId);
  }

  list(): CognitiveSession[] {
    return [...this.sessions.values()].sort((a, b) => b.updatedAt - a.updatedAt);
  }

  focus(sessionId: string): boolean {
    if (!this.sessions.has(sessionId)) return false;
    this.focusedId = sessionId;
    return true;
  }

  focused(): CognitiveSession | undefined {
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

  update(sessionId: string, patch: Partial<CognitiveSession>): CognitiveSession | undefined {
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
      buffers: cloneBuffers(session.buffers),
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
    const buffers = cloneBuffers(cp.buffers);

    if (input.mode === 'fork') {
      const forked = this.createSession({
        title: `${session.title} (restored)`,
        specialistMode: cp.specialistMode,
      });
      this.update(forked.id, {
        history,
        buffers,
        compactionSummary: cp.compactionSummary,
        status: 'idle',
      });
      return { sessionId: forked.id };
    }

    this.update(input.sessionId, {
      history,
      buffers,
      compactionSummary: cp.compactionSummary,
      specialistMode: cp.specialistMode,
      status: 'idle',
    });
    return { sessionId: input.sessionId };
  }

  compact(sessionId: string, keepCount = 12): void {
    const session = this.sessions.get(sessionId);
    if (!session) return;
    const result = compactHistory(session.history, {
      keepCount,
      previousSummary: session.compactionSummary,
    });
    this.update(sessionId, {
      history: result.kept,
      compactionSummary: result.summary || session.compactionSummary,
    });
  }

  snapshot(): { sessions: CognitiveSession[]; checkpoints: Record<string, Checkpoint[]> } {
    const checkpoints: Record<string, Checkpoint[]> = {};
    for (const [id, list] of this.checkpoints) checkpoints[id] = list.map((c) => ({ ...c, buffers: cloneBuffers(c.buffers) }));
    return {
      sessions: this.list().map((s) => ({
        ...s,
        history: s.history.map((m) => ({ ...m, parts: [...m.parts] })),
        buffers: cloneBuffers(s.buffers),
      })),
      checkpoints,
    };
  }

  loadSnapshot(data: { sessions: CognitiveSession[]; checkpoints: Record<string, Checkpoint[]> }): void {
    this.sessions.clear();
    this.checkpoints.clear();
    for (const session of data.sessions) {
      this.sessions.set(session.id, {
        ...session,
        buffers: cloneBuffers(session.buffers),
        history: [...session.history],
      });
    }
    for (const [id, list] of Object.entries(data.checkpoints ?? {})) {
      this.checkpoints.set(
        id,
        list.map((c) => ({ ...c, buffers: cloneBuffers(c.buffers) })),
      );
    }
    this.focusedId = this.list()[0]?.id ?? null;
  }
}

export type { ModelPolicy };
