import { describe, expect, it } from 'vitest';
import {
  catalogFromSettings,
  defaultProvidersSettings,
  listProviderPresets,
  normalizeProvidersSettings,
  parseModelIds,
} from '../src/runtime/models/provider-config';
import { ProviderRegistry } from '../src/runtime/models/provider-registry';
import type { ModelProvider } from '../src/runtime/models/types';

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

  it('offers OpenAI and Ollama by default and appends an activated plugin provider', () => {
    const webllm: ModelProvider = {
      id: 'webllm',
      label: 'WebLLM',
      listModels: () => [
        { id: 'Llama-3.2-1B-Instruct-q4f16_1-MLC', name: 'Llama 3.2 1B (WebLLM)' },
      ],
      stream: async function* () {},
    };
    expect(listProviderPresets().map((preset) => preset.id)).toEqual(['openai', 'ollama']);
    const withDefault: ModelProvider = {
      ...webllm,
      listModels: () => [
        { id: 'Llama-3.2-1B-Instruct-q4f16_1-MLC', name: 'Llama 3.2 1B (WebLLM)' },
        { id: 'Llama-3.2-3B-Instruct-q4f16_1-MLC', name: 'Llama 3.2 3B (WebLLM)' },
      ],
      defaultModelIds: ['Llama-3.2-1B-Instruct-q4f16_1-MLC'],
    };
    expect(listProviderPresets([withDefault])[2]).toMatchObject({
      models: 'Llama-3.2-1B-Instruct-q4f16_1-MLC',
      catalog: [
        { id: 'Llama-3.2-1B-Instruct-q4f16_1-MLC', name: 'Llama 3.2 1B (WebLLM)' },
        { id: 'Llama-3.2-3B-Instruct-q4f16_1-MLC', name: 'Llama 3.2 3B (WebLLM)' },
      ],
    });
    expect(listProviderPresets([webllm])).toEqual([
      expect.objectContaining({ id: 'openai', label: 'OpenAI', requiresApiKey: true }),
      expect.objectContaining({ id: 'ollama', label: 'Ollama', requiresApiKey: false }),
      {
        id: 'webllm',
        label: 'WebLLM',
        baseUrl: '',
        models: 'Llama-3.2-1B-Instruct-q4f16_1-MLC',
        requiresApiKey: false,
        catalog: [{ id: 'Llama-3.2-1B-Instruct-q4f16_1-MLC', name: 'Llama 3.2 1B (WebLLM)' }],
      },
    ]);
  });

  it('keeps hardware groups on a provider catalog', () => {
    const provider: ModelProvider = {
      id: 'webllm',
      label: 'WebLLM',
      listModels: () => [
        { id: 'gpu-model', name: 'GPU model', group: 'GPU' },
        { id: 'cpu-model', name: 'CPU model', group: 'CPU' },
        { id: 'npu-model', name: 'NPU model', group: 'NPU' },
      ],
      stream: async function* () {},
    };
    expect(listProviderPresets([provider])[2]?.catalog).toEqual([
      { id: 'gpu-model', name: 'GPU model', group: 'GPU' },
      { id: 'cpu-model', name: 'CPU model', group: 'CPU' },
      { id: 'npu-model', name: 'NPU model', group: 'NPU' },
    ]);
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

  it('prefers an in-browser provider over an HTTP client with the same id', () => {
    const http: ModelProvider = {
      id: 'webllm',
      baseUrl: 'http://127.0.0.1',
      listModels: () => [],
      stream: async function* () {},
    };
    const local: ModelProvider = {
      id: 'webllm',
      listModels: () => [{ id: 'Llama-3.2-1B-Instruct-q4f16_1-MLC', name: 'Llama 3.2 1B' }],
      stream: async function* () {},
    };
    const registry = new ProviderRegistry();
    registry.register(http);
    registry.registerExternal(local);
    expect(registry.get('webllm')).toBe(local);
    expect(registry.resolveProvider('webllm/Llama-3.2-1B-Instruct-q4f16_1-MLC')).toBe(local);
    expect(registry.list()).toEqual([local]);
  });
});
