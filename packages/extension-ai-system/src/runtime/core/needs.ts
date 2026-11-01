import type { Need } from '../types';

export function defaultNeeds(): Need[] {
  return [
    { id: 'progress', label: 'Make progress on goals', weight: 1, urgency: 0.4 },
    { id: 'clarity', label: 'Reduce uncertainty', weight: 0.8, urgency: 0.3 },
    { id: 'safety', label: 'Avoid harmful actions', weight: 1.2, urgency: 0.5 },
    { id: 'coherence', label: 'Keep context coherent', weight: 0.7, urgency: 0.2 },
  ];
}

export function dominantNeed(needs: Need[]): Need {
  let best = needs[0];
  for (const need of needs) {
    const score = need.weight * need.urgency;
    if (!best || score > best.weight * best.urgency) best = need;
  }
  return best;
}

export function bumpNeed(needs: Need[], id: string, delta: number): Need[] {
  return needs.map((n) =>
    n.id === id ? { ...n, urgency: Math.max(0, Math.min(1, n.urgency + delta)) } : n,
  );
}
