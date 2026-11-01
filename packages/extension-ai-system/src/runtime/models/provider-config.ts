import { detectEffortCapability } from './effort-support';
import type { ModelCatalogEntry } from './types';

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
    defaultProviderId: 'openai',
    providers: [
      {
        id: 'openai',
        baseUrl: 'https://api.openai.com/v1',
        apiKey: '',
        models: 'gpt-4o-mini,gpt-4o',
        enabled: true,
      },
      {
        id: 'ollama',
        baseUrl: 'http://127.0.0.1:11434/v1',
        apiKey: '',
        models: 'llama3.2',
        enabled: true,
      },
    ],
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
