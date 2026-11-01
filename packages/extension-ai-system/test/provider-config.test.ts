import { describe, expect, it } from 'vitest';
import {
  catalogFromSettings,
  defaultProvidersSettings,
  normalizeProvidersSettings,
  parseModelIds,
} from '../src/runtime/models/provider-config';

describe('provider-config', () => {
  it('parses model ids', () => {
    expect(parseModelIds(' gpt-4o-mini, gpt-4o , ')).toEqual(['gpt-4o-mini', 'gpt-4o']);
  });

  it('builds catalog from defaults with per-model effort caps', () => {
    const catalog = catalogFromSettings(defaultProvidersSettings());
    expect(catalog.map((e) => e.id)).toEqual([
      'openai/gpt-4o-mini',
      'openai/gpt-4o',
      'ollama/llama3.2',
    ]);
    expect(catalog[0]?.effort.supported).toBe(false);
    expect(catalog[1]?.effort.supported).toBe(false);
  });

  it('skips disabled providers and fixes default', () => {
    const settings = normalizeProvidersSettings({
      defaultProviderId: 'missing',
      providers: [
        { id: 'a', baseUrl: 'http://a', apiKey: '', models: 'm1', enabled: false },
        { id: 'b', baseUrl: 'http://b', apiKey: '', models: 'm2', enabled: true },
      ],
    });
    expect(settings.defaultProviderId).toBe('b');
    expect(catalogFromSettings(settings)).toEqual([
      expect.objectContaining({ id: 'b/m2', providerId: 'b' }),
    ]);
  });
});
