import { beforeAll, describe, expect, it } from 'vitest';
import { detectEffortCapability, loadModelsCatalog } from '../src/runtime/models/effort-support';
import { ModelRouter } from '../src/runtime/models';

describe('detectEffortCapability (Models.dev)', () => {
  beforeAll(async () => {
    await loadModelsCatalog();
  }, 30_000);

  it('marks gpt-4o as non-reasoning', () => {
    expect(detectEffortCapability('openai/gpt-4o-mini')).toMatchObject({
      supported: false,
      withTools: false,
    });
  });

  it('marks gpt-5-mini as reasoning but not effort+tools on chat/completions', () => {
    const cap = detectEffortCapability('openai/gpt-5-mini');
    expect(cap.supported).toBe(true);
    expect(cap.withTools).toBe(false);
    expect(cap.levels).toContain('medium');
  });

  it('marks o3-mini similarly', () => {
    expect(detectEffortCapability('openai/o3-mini')).toMatchObject({
      supported: true,
      withTools: false,
    });
  });

  it('unknown models stay conservative', () => {
    expect(detectEffortCapability('local/totally-unknown-model-xyz')).toEqual({
      supported: false,
      withTools: false,
      levels: ['none'],
      default: 'none',
    });
  });
});

describe('ModelRouter effort + tools', () => {
  beforeAll(async () => {
    await loadModelsCatalog();
  }, 30_000);

  it('omits reasoning_effort for gpt-5-mini when tools are required', () => {
    const router = new ModelRouter();
    router.setCatalog([
      {
        id: 'openai/gpt-5-mini',
        providerId: 'openai',
        tier: 'standard',
        strengths: ['code'],
        effort: detectEffortCapability('openai/gpt-5-mini'),
      },
    ]);

    const resolved = router.resolve(
      { role: 'build', requireTools: true },
      { mode: 'manual', model: 'openai/gpt-5-mini', effort: 'medium' },
    );

    expect(resolved.effort).toBe('none');
    expect(resolved.providerOptions).toEqual({ reasoning_effort: 'none' });
  });

  it('sends reasoning_effort for gpt-5-mini when tools are not required', () => {
    const router = new ModelRouter();
    router.setCatalog([
      {
        id: 'openai/gpt-5-mini',
        providerId: 'openai',
        tier: 'standard',
        strengths: ['code'],
        effort: detectEffortCapability('openai/gpt-5-mini'),
      },
    ]);

    const resolved = router.resolve(
      { role: 'plan', requireTools: false },
      { mode: 'manual', model: 'openai/gpt-5-mini', effort: 'medium' },
    );

    expect(resolved.effort).toBe('medium');
    expect(resolved.providerOptions).toEqual({ reasoning_effort: 'medium' });
  });
});
