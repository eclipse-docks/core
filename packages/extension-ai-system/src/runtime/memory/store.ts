import type { Chunk, MemoryScope } from '../types';

export interface MemoryQuery {
  type?: string;
  scope?: MemoryScope;
  sessionId?: string;
  limit?: number;
  minActivation?: number;
}

function now(): number {
  return Date.now();
}

function id(): string {
  return `chunk-${now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** In-memory declarative/episodic store with ACT-R-like activation ranking. */
export class CognitiveMemory {
  private chunks = new Map<string, Chunk>();

  upsert(input: Omit<Chunk, 'id' | 'activation' | 'createdAt' | 'updatedAt'> & { id?: string; activation?: number }): Chunk {
    const existing = input.id ? this.chunks.get(input.id) : undefined;
    const chunk: Chunk = {
      id: input.id ?? existing?.id ?? id(),
      type: input.type,
      slots: { ...input.slots },
      activation: input.activation ?? existing?.activation ?? 0.5,
      createdAt: existing?.createdAt ?? now(),
      updatedAt: now(),
      scope: input.scope,
      sessionId: input.sessionId,
      pinned: input.pinned ?? existing?.pinned,
    };
    this.chunks.set(chunk.id, chunk);
    return chunk;
  }

  get(chunkId: string): Chunk | undefined {
    return this.chunks.get(chunkId);
  }

  touch(chunkId: string, boost = 0.15): Chunk | undefined {
    const chunk = this.chunks.get(chunkId);
    if (!chunk) return undefined;
    const next = {
      ...chunk,
      activation: Math.min(2, chunk.activation + boost),
      updatedAt: now(),
    };
    this.chunks.set(chunkId, next);
    return next;
  }

  decay(amount = 0.02): void {
    for (const [key, chunk] of this.chunks) {
      if (chunk.pinned) continue;
      const activation = Math.max(0, chunk.activation - amount);
      if (activation <= 0.01 && chunk.scope !== 'workspace') {
        this.chunks.delete(key);
        continue;
      }
      this.chunks.set(key, { ...chunk, activation });
    }
  }

  forget(chunkId: string): boolean {
    return this.chunks.delete(chunkId);
  }

  clear(scope?: MemoryScope): void {
    if (!scope) {
      this.chunks.clear();
      return;
    }
    for (const [key, chunk] of this.chunks) {
      if (chunk.scope === scope) this.chunks.delete(key);
    }
  }

  search(query: MemoryQuery = {}): Chunk[] {
    const min = query.minActivation ?? 0;
    const limit = query.limit ?? 8;
    return [...this.chunks.values()]
      .filter((c) => (query.type ? c.type === query.type : true))
      .filter((c) => (query.scope ? c.scope === query.scope : true))
      .filter((c) => (query.sessionId ? c.sessionId === query.sessionId : true))
      .filter((c) => c.activation >= min || c.pinned)
      .sort((a, b) => b.activation - a.activation || b.updatedAt - a.updatedAt)
      .slice(0, limit);
  }

  /** Spreading-style boost: chunks whose slots overlap context terms rise. */
  retrieveForContext(terms: string[], limit = 5): Chunk[] {
    const lower = terms.map((t) => t.toLowerCase()).filter(Boolean);
    if (lower.length === 0) return this.search({ limit });

    const scored = [...this.chunks.values()].map((chunk) => {
      const hay = `${chunk.type} ${JSON.stringify(chunk.slots)}`.toLowerCase();
      let hits = 0;
      for (const term of lower) {
        if (hay.includes(term)) hits += 1;
      }
      const score = chunk.activation + hits * 0.35 + (chunk.pinned ? 0.5 : 0);
      return { chunk, score };
    });

    return scored
      .filter((s) => s.score > 0.2)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((s) => {
        this.touch(s.chunk.id, 0.05);
        return this.chunks.get(s.chunk.id)!;
      });
  }

  snapshot(): Chunk[] {
    return [...this.chunks.values()].map((c) => ({ ...c, slots: { ...c.slots } }));
  }

  restore(chunks: Chunk[]): void {
    this.chunks.clear();
    for (const chunk of chunks) this.chunks.set(chunk.id, { ...chunk, slots: { ...chunk.slots } });
  }
}
