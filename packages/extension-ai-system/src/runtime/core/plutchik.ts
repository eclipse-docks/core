import type { EmotionalState, PlutchikEmotion } from '../types';

export const PLUTCHIK_EMOTIONS: PlutchikEmotion[] = [
  'joy',
  'trust',
  'fear',
  'surprise',
  'sadness',
  'disgust',
  'anger',
  'anticipation',
];

export function createNeutralState(): EmotionalState {
  return Object.fromEntries(PLUTCHIK_EMOTIONS.map((e) => [e, 0])) as EmotionalState;
}

export function clampEmotion(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.max(-1, Math.min(1, value));
}

export function blendStates(base: EmotionalState, delta: Partial<EmotionalState>, weight = 1): EmotionalState {
  const next = { ...base };
  for (const key of PLUTCHIK_EMOTIONS) {
    const d = delta[key];
    if (d === undefined) continue;
    next[key] = clampEmotion(base[key] + d * weight);
  }
  return next;
}

export function valenceScore(state: EmotionalState): number {
  const positive = state.joy + state.trust + state.anticipation + state.surprise;
  const negative = state.fear + state.sadness + state.disgust + state.anger;
  return (positive - negative) / 4;
}

export function diffStates(prev: EmotionalState, next: EmotionalState): EmotionalState {
  const out = createNeutralState();
  for (const key of PLUTCHIK_EMOTIONS) {
    out[key] = clampEmotion(next[key] - prev[key]);
  }
  return out;
}
