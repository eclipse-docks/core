import { describe, expect, it } from 'vitest';
import { CognitiveMemory } from '../src/runtime/memory';

describe('CognitiveMemory', () => {
  it('retrieves overlapping chunks across conceptual sessions', () => {
    const memory = new CognitiveMemory();
    memory.upsert({
      type: 'episodic',
      slots: { summary: 'auth middleware login flow' },
      scope: 'workspace',
      sessionId: 'a',
      activation: 0.4,
    });
    memory.upsert({
      type: 'episodic',
      slots: { summary: ' unrelated cooking recipe' },
      scope: 'workspace',
      sessionId: 'b',
      activation: 0.9,
    });

    const hits = memory.retrieveForContext(['auth', 'login'], 3);
    expect(hits[0]?.slots.summary).toMatch(/auth/);
  });

  it('decays unpinned memory', () => {
    const memory = new CognitiveMemory();
    const chunk = memory.upsert({
      type: 'episodic',
      slots: { summary: 'temp' },
      scope: 'session',
      activation: 0.05,
    });
    for (let i = 0; i < 5; i++) memory.decay(0.02);
    expect(memory.get(chunk.id)).toBeUndefined();
  });
});
