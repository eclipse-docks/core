import { detectEffortCapability } from './effort-support';
import type { ModelCatalogEntry, ModelProvider } from './types';

export interface ProviderModelChoice {
  id: string;
  name: string;
  /** Picker section, such as GPU, CPU, or NPU. */
  group?: string;
}

/** A provider the AI settings ID column can offer. */
export interface ProviderPreset {
  id: string;
  label: string;
  baseUrl: string;
  /** Comma-separated model ids (without provider prefix). */
  models: string;
  requiresApiKey: boolean;
  /** Models the provider can list without a remote fetch. */
  catalog: ProviderModelChoice[];
}

/** Always available, even before a plugin provider is activated. */
export const BUILTIN_PROVIDER_PRESETS: readonly ProviderPreset[] = [
  {
    id: 'openai',
    label: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    models: 'gpt-4o-mini,gpt-4o',
    requiresApiKey: true,
    catalog: [],
  },
  {
    id: 'ollama',
    label: 'Ollama',
    baseUrl: 'http://127.0.0.1:11434/v1',
    models: 'llama3.2',
    requiresApiKey: false,
    catalog: [],
  },
];

export function providerConfigFromPreset(preset: ProviderPreset): ProviderConfig {
  return {
    id: preset.id,
    baseUrl: preset.baseUrl,
    apiKey: '',
    models: preset.models,
    enabled: true,
  };
}

/**
 * Built-in presets, plus any plugin provider registered after its extension activates.
 * A plugin id that matches a built-in id does not replace the built-in entry.
 */
export function listProviderPresets(external: ModelProvider[] = []): ProviderPreset[] {
  const presets = BUILTIN_PROVIDER_PRESETS.map((preset) => ({
    ...preset,
    catalog: preset.catalog.length ? preset.catalog.map((model) => ({ ...model })) : catalogFromModelIds(preset.models),
  }));
  const seen = new Set(presets.map((preset) => preset.id));
  for (const provider of external) {
    const id = provider.id.trim();
    if (!id || seen.has(id)) continue;
    seen.add(id);
    presets.push(presetFromProvider(provider));
  }
  return presets;
}

/** Models reported by a provider, including when `listModels` is async. */
export async function listedProviderModels(provider: ModelProvider): Promise<ProviderModelChoice[]> {
  const listed = provider.listModels();
  const models = Array.isArray(listed) ? listed : await listed;
  return modelChoices(models);
}

function presetFromProvider(provider: ModelProvider): ProviderPreset {
  const listed = provider.listModels();
  const catalog = Array.isArray(listed) ? modelChoices(listed) : [];
  const known = new Set(catalog.map((model) => model.id));
  const defaults = provider.defaultModelIds?.map((id) => id.trim()).filter((id) => known.has(id));
  const models = defaults?.length ? defaults : catalog.map((model) => model.id);
  return {
    id: provider.id.trim(),
    label: provider.label?.trim() || provider.id.trim(),
    baseUrl: provider.baseUrl?.trim() ?? '',
    models: models.join(','),
    requiresApiKey: provider.requiresApiKey === true,
    catalog,
  };
}

function catalogFromModelIds(models: string): ProviderModelChoice[] {
  return modelChoices(parseModelIds(models).map((id) => ({ id })));
}

function modelChoices(models: Array<{ id: string; name?: string; group?: string }>): ProviderModelChoice[] {
  return models
    .map((model) => {
      const id = model.id.trim();
      const name = model.name?.trim() || id;
      const group = model.group?.trim();
      return group ? { id, name, group } : { id, name };
    })
    .filter((model) => model.id);
}

export interface ProviderConfig {
  id: string;
  baseUrl: string;
  apiKey: string;
  /** Comma-separated model ids (without provider prefix). */
  models: string;
  enabled: boolean;
  /** Optional free-form fields (e.g. OCR endpoint overrides). */
  extra?: Record<string, string>;
}

export interface ProvidersSettings {
  defaultProviderId: string;
  providers: ProviderConfig[];
}

export const PROVIDERS_PERSIST_KEY = 'cognitive/v1/providers';

export function defaultProvidersSettings(): ProvidersSettings {
  return {
    defaultProviderId: BUILTIN_PROVIDER_PRESETS[0]?.id ?? '',
    providers: BUILTIN_PROVIDER_PRESETS.map(providerConfigFromPreset),
  };
}

export function parseModelIds(models: string): string[] {
  return models
    .split(',')
    .map((m) => m.trim())
    .filter(Boolean);
}

/** Model refs (`providerId/modelId`) the user enabled in AI Settings. */
export function listConfiguredModelIds(settings: ProvidersSettings): string[] {
  const ids: string[] = [];
  for (const provider of settings.providers) {
    if (!provider.enabled || !provider.id.trim()) continue;
    for (const modelId of parseModelIds(provider.models)) {
      ids.push(`${provider.id}/${modelId}`);
    }
  }
  return ids;
}

export function catalogFromSettings(settings: ProvidersSettings): ModelCatalogEntry[] {
  const entries: ModelCatalogEntry[] = [];
  for (const provider of settings.providers) {
    if (!provider.enabled || !provider.id.trim()) continue;
    const modelIds = parseModelIds(provider.models);
    modelIds.forEach((modelId, index) => {
      const tier =
        modelIds.length === 1
          ? 'standard'
          : index === 0
            ? 'economy'
            : index === modelIds.length - 1
              ? 'frontier'
              : 'standard';
      entries.push({
        id: `${provider.id}/${modelId}`,
        providerId: provider.id,
        tier,
        strengths: ['code', 'fast'],
        effort: detectEffortCapability(`${provider.id}/${modelId}`),
      });
    });
  }
  return entries;
}

export function normalizeProvidersSettings(raw: ProvidersSettings): ProvidersSettings {
  const providers = raw.providers.map((p) => ({
    id: p.id.trim(),
    baseUrl: p.baseUrl.trim(),
    apiKey: p.apiKey ?? '',
    models: p.models ?? '',
    enabled: p.enabled !== false,
    ...(p.extra && Object.keys(p.extra).length ? { extra: { ...p.extra } } : {}),
  }));
  const defaultProviderId =
    providers.find((p) => p.id === raw.defaultProviderId)?.id ?? providers.find((p) => p.enabled)?.id ?? '';
  return { defaultProviderId, providers };
}
