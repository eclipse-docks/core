import type { BufferMap, Chunk, EmotionalState, Intent, Need } from '../types';
import { blendStates, createNeutralState, diffStates, valenceScore } from './plutchik';
import { dominantNeed } from './needs';

export interface CoreState {
  conscious: EmotionalState;
  subconscious: EmotionalState;
  needs: Need[];
}

export interface CoreTickInput {
  state: CoreState;
  buffers: BufferMap;
  context?: Chunk | null;
}

export interface CoreTickResult {
  state: CoreState;
  buffers: BufferMap;
  intent: Intent | null;
  valenceDelta: number;
  qualia: EmotionalState;
}

function contextDelta(context: Chunk | null | undefined): Partial<EmotionalState> {
  if (!context) return {};
  const kind = String(context.slots.kind ?? context.type);
  if (kind === 'error' || kind === 'failure') {
    return { fear: 0.15, sadness: 0.1, anticipation: -0.05 };
  }
  if (kind === 'success' || kind === 'progress') {
    return { joy: 0.2, anticipation: 0.1, trust: 0.05 };
  }
  if (kind === 'isolation' || kind === 'empty') {
    return { sadness: 0.2, fear: 0.05, surprise: 0.1 };
  }
  if (kind === 'user') {
    return { anticipation: 0.15, trust: 0.05 };
  }
  return { surprise: 0.05 };
}

export function createCoreState(needs: Need[]): CoreState {
  return {
    conscious: createNeutralState(),
    subconscious: createNeutralState(),
    needs: [...needs],
  };
}

export function emptyBuffers(): BufferMap {
  return {
    goal: null,
    retrieval: null,
    imaginal: null,
    emotion: null,
    motor: null,
  };
}

/** One ICOM-inspired Core tick: update valence from context + needs, emit intent when useful. */
export function coreTick(input: CoreTickInput): CoreTickResult {
  const prev = input.state.conscious;
  const need = dominantNeed(input.state.needs);
  const delta = contextDelta(input.context ?? input.buffers.retrieval);

  const needBias: Partial<EmotionalState> =
    need.id === 'safety'
      ? { fear: 0.05 * need.urgency, trust: 0.02 }
      : need.id === 'progress'
        ? { anticipation: 0.08 * need.urgency, joy: 0.03 * need.urgency }
        : need.id === 'clarity'
          ? { surprise: 0.05 * need.urgency, anticipation: 0.04 * need.urgency }
          : { trust: 0.03 * need.urgency };

  const conscious = blendStates(blendStates(prev, delta), needBias);
  const subconscious = blendStates(input.state.subconscious, delta, 0.5);
  const qualia = diffStates(prev, conscious);
  const valenceDelta = valenceScore(conscious) - valenceScore(prev);

  const summary =
    (input.context?.slots.summary as string | undefined) ??
    (input.buffers.goal?.slots.summary as string | undefined) ??
    need.label;

  const shouldAct = valenceDelta !== 0 || Boolean(input.context) || Boolean(input.buffers.goal);
  const intent: Intent | null = shouldAct
    ? {
        id: `intent-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        summary: String(summary),
        motivation: need.id,
        valenceDelta,
        createdAt: Date.now(),
      }
    : null;

  const goalChunk: Chunk | null = intent
    ? {
        id: `goal-${intent.id}`,
        type: 'goal',
        slots: { summary: intent.summary, motivation: intent.motivation, intentId: intent.id },
        activation: 1,
        createdAt: intent.createdAt,
        updatedAt: intent.createdAt,
        scope: 'session',
      }
    : input.buffers.goal;

  const emotionChunk: Chunk = {
    id: `emotion-${Date.now()}`,
    type: 'emotion',
    slots: { conscious, valence: valenceScore(conscious) },
    activation: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    scope: 'run',
  };

  return {
    state: { conscious, subconscious, needs: input.state.needs },
    buffers: { ...input.buffers, goal: goalChunk, emotion: emotionChunk, motor: null },
    intent,
    valenceDelta,
    qualia,
  };
}
