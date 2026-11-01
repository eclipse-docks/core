import { Models } from '@opencode-ai/models';
import type { ProviderMap, ReasoningEffort, ReasoningOption } from '@opencode-ai/models';
import type { EffortLevel } from '../types';

export interface EffortCapability {
  /** Model accepts `reasoning_effort` (per Models.dev `reasoning`). */
  supported: boolean;
  /**
   * Whether effort can be combined with function tools on our current transport
   * (`/v1/chat/completions`). Models.dev may list both reasoning + tool_call, but
   * OpenAI chat/completions rejects that combo — keep false until Responses API.
   */
  withTools: boolean;
  levels: EffortLevel[];
  default: EffortLevel;
}

const NO_EFFORT: EffortCapability = {
  supported: false,
  withTools: false,
  levels: ['none'],
  default: 'none',
};

const EFFORT_ORDER: EffortLevel[] = ['none', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max'];

const KNOWN_EFFORTS = new Set<string>(EFFORT_ORDER);

let providersCache: ProviderMap | undefined;
let loadPromise: Promise<void> | undefined;

/** Load Models.dev provider catalog (network, then offline snapshot fallback). */
export async function loadModelsCatalog(force = false): Promise<void> {
  if (providersCache && !force) return;
  if (!loadPromise || force) {
    loadPromise = (async () => {
      try {
        providersCache = await Models.make().providers({
          signal: AbortSignal.timeout(10_000),
        });
      } catch {
        const snap = await import('@opencode-ai/models/snapshot');
        providersCache = snap.providers;
      }
    })();
  }
  await loadPromise;
}

export function isModelsCatalogReady(): boolean {
  return providersCache != null;
}

/** Strip `providerId/` prefix when present. */
export function bareModelId(modelId: string): string {
  const slash = modelId.indexOf('/');
  return (slash === -1 ? modelId : modelId.slice(slash + 1)).trim();
}

export function splitModelRef(modelRef: string): { providerId?: string; modelId: string } {
  const trimmed = modelRef.trim();
  const slash = trimmed.indexOf('/');
  if (slash === -1) return { modelId: trimmed };
  return { providerId: trimmed.slice(0, slash), modelId: trimmed.slice(slash + 1) };
}

export function findCatalogModel(modelRef: string) {
  if (!providersCache) return undefined;
  const { providerId, modelId } = splitModelRef(modelRef);
  if (!modelId) return undefined;

  if (providerId) {
    const exact = providersCache[providerId]?.models?.[modelId];
    if (exact) return exact;
  }

  const lower = modelId.toLowerCase();
  for (const provider of Object.values(providersCache)) {
    const models = provider?.models;
    if (!models) continue;
    if (models[modelId]) return models[modelId];
    for (const [id, meta] of Object.entries(models)) {
      if (id.toLowerCase() === lower) return meta;
    }
  }
  return undefined;
}

const DEFAULT_CONTEXT_LIMIT = 128_000;

/** Context window size from Models.dev (`limit.context`), with a safe default. */
export function getModelContextLimit(modelRef: string): number {
  const meta = findCatalogModel(modelRef) as { limit?: { context?: number } } | undefined;
  const limit = meta?.limit?.context;
  return typeof limit === 'number' && limit > 0 ? limit : DEFAULT_CONTEXT_LIMIT;
}

function mapEffortValue(value: ReasoningEffort): EffortLevel | undefined {
  if (value === null || value === 'none' || value === 'default') return 'none';
  if (typeof value === 'string' && KNOWN_EFFORTS.has(value)) return value as EffortLevel;
  return undefined;
}

function levelsFromOptions(options: ReasoningOption[] | undefined): EffortLevel[] {
  const found = new Set<EffortLevel>();
  for (const opt of options ?? []) {
    if (opt.type === 'toggle') {
      found.add('none');
      continue;
    }
    if (opt.type === 'effort') {
      for (const value of opt.values) {
        const mapped = mapEffortValue(value);
        if (mapped) found.add(mapped);
      }
    }
    // budget_tokens: expose a coarse ladder; actual budgets mapped later if needed
    if (opt.type === 'budget_tokens') {
      found.add('low');
      found.add('medium');
      found.add('high');
    }
  }
  if (!found.size) return ['none', 'low', 'medium', 'high'];
  if (![...found].some((l) => l !== 'none')) found.add('medium');
  return EFFORT_ORDER.filter((level) => found.has(level));
}

function pickDefault(levels: EffortLevel[]): EffortLevel {
  if (levels.includes('medium')) return 'medium';
  if (levels.includes('low')) return 'low';
  return levels.find((l) => l !== 'none') ?? 'none';
}

/**
 * Resolve effort capability from Models.dev catalog.
 * Unknown / unloaded models → no effort (safe for chat/completions).
 */
export function detectEffortCapability(modelRef: string): EffortCapability {
  const meta = findCatalogModel(modelRef);
  if (!meta?.reasoning) return NO_EFFORT;

  const levels = levelsFromOptions(meta.reasoning_options);
  return {
    supported: true,
    // Chat Completions rejects reasoning_effort + function tools together.
    withTools: false,
    levels,
    default: pickDefault(levels),
  };
}
