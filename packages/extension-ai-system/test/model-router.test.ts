import { describe, expect, it } from 'vitest';
import { ModelRouter } from '../src/runtime/models';

describe('ModelRouter', () => {
  it('routes compact to economy and respects max effort', () => {
    const router = new ModelRouter();
    router.setCatalog([
      {
        id: 'openai/gpt-4o-mini',
        providerId: 'openai',
        tier: 'economy',
        strengths: ['fast'],
        effort: {
          supported: true,
          withTools: true,
          levels: ['none', 'low', 'medium'],
          default: 'low',
        },
      },
      {
        id: 'openai/gpt-4o',
        providerId: 'openai',
        tier: 'frontier',
        strengths: ['reason'],
        effort: {
          supported: true,
          withTools: true,
          levels: ['none', 'low', 'medium', 'high'],
          default: 'medium',
        },
      },
    ]);

    const resolved = router.resolve(
      { role: 'compact', complexity: 0.1 },
      { mode: 'auto', optimizeFor: 'cost', maxEffort: 'low' },
    );

    expect(resolved.model).toBe('openai/gpt-4o-mini');
    expect(['none', 'low']).toContain(resolved.effort);
  });

  it('honors manual model pin', () => {
    const router = new ModelRouter();
    router.setCatalog([
      {
        id: 'openai/gpt-5',
        providerId: 'openai',
        tier: 'frontier',
        strengths: ['reason'],
        effort: {
          supported: true,
          withTools: true,
          levels: ['none', 'low', 'medium', 'high'],
          default: 'medium',
        },
      },
    ]);
    const resolved = router.resolve(
      { role: 'build', requireTools: false },
      { mode: 'manual', model: 'openai/gpt-5', effort: 'high' },
    );
    expect(resolved.model).toBe('openai/gpt-5');
    expect(resolved.effort).toBe('high');
    expect(resolved.providerOptions).toEqual({ reasoning_effort: 'high' });
  });
});
