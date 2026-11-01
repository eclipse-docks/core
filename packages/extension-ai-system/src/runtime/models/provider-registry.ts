import type { ModelProvider } from './types';

export class ProviderRegistry {
  private settingsProviders = new Map<string, ModelProvider>();
  private externalProviders = new Map<string, ModelProvider>();

  /** Settings-backed providers — cleared on each settings rebuild. */
  register(provider: ModelProvider): void {
    this.settingsProviders.set(provider.id, provider);
  }

  /** Plugin providers (e.g. WebLLM) that survive settings rebuilds. */
  registerExternal(provider: ModelProvider): void {
    this.externalProviders.set(provider.id, provider);
  }

  unregisterExternal(id: string): void {
    this.externalProviders.delete(id);
  }

  clear(): void {
    this.settingsProviders.clear();
  }

  get(id: string): ModelProvider | undefined {
    return this.settingsProviders.get(id) ?? this.externalProviders.get(id);
  }

  list(): ModelProvider[] {
    const byId = new Map<string, ModelProvider>();
    for (const provider of this.externalProviders.values()) byId.set(provider.id, provider);
    for (const provider of this.settingsProviders.values()) byId.set(provider.id, provider);
    return [...byId.values()];
  }

  listExternal(): ModelProvider[] {
    return [...this.externalProviders.values()];
  }

  resolveProvider(modelId: string): ModelProvider | undefined {
    const slash = modelId.indexOf('/');
    if (slash === -1) return this.list()[0];
    return this.get(modelId.slice(0, slash));
  }
}
