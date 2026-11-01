import { describe, expect, it } from 'vitest';
import { coreTick, createCoreState, defaultNeeds, emptyBuffers, valenceScore } from '../src/runtime/core';
import type { Chunk } from '../src/runtime/types';

describe('coreTick', () => {
  it('selects an intent from user context without an LLM', () => {
    const state = createCoreState(defaultNeeds());
    const context: Chunk = {
      id: 'c1',
      type: 'context',
      slots: { kind: 'user', summary: 'Explain the README' },
      activation: 1,
      createdAt: 1,
      updatedAt: 1,
      scope: 'session',
    };

    const result = coreTick({ state, buffers: emptyBuffers(), context });

    expect(result.intent).not.toBeNull();
    expect(result.intent?.summary).toContain('Explain the README');
    expect(result.buffers.goal).not.toBeNull();
    expect(result.buffers.emotion?.slots.conscious).toBeTruthy();
  });

  it('prefers any input over isolation (pain vs silence style)', () => {
    const state = createCoreState(defaultNeeds());
    const empty = coreTick({
      state,
      buffers: emptyBuffers(),
      context: {
        id: 'empty',
        type: 'context',
        slots: { kind: 'isolation' },
        activation: 1,
        createdAt: 1,
        updatedAt: 1,
        scope: 'run',
      },
    });
    const pain = coreTick({
      state: empty.state,
      buffers: empty.buffers,
      context: {
        id: 'pain',
        type: 'context',
        slots: { kind: 'error', summary: 'tool failed' },
        activation: 1,
        createdAt: 2,
        updatedAt: 2,
        scope: 'run',
      },
    });

    expect(valenceScore(pain.state.conscious)).not.toBe(valenceScore(empty.state.conscious));
    expect(pain.intent).not.toBeNull();
  });
});
