import type { EffortLevel, ModelPolicy, OptimizeFor, SpecialistRole } from '../types';
import { detectEffortCapability } from './effort-support';
import type { ModelCatalogEntry, ResolvedModel, RouteRequest } from './types';

const EFFORT_ORDER: EffortLevel[] = ['none', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max'];

const ROLE_TIER: Record<SpecialistRole, ModelCatalogEntry['tier']> = {
  compact: 'economy',
  title: 'economy',
  summary: 'economy',
  explore: 'economy',
  plan: 'standard',
  build: 'standard',
  general: 'standard',
};

const ROLE_EFFORT: Record<SpecialistRole, EffortLevel> = {
  compact: 'none',
  title: 'none',
  summary: 'low',
  explore: 'low',
  plan: 'medium',
  build: 'medium',
  general: 'medium',
};

function effortIndex(level: EffortLevel): number {
  return EFFORT_ORDER.indexOf(level);
}

function clampEffort(level: EffortLevel, max?: EffortLevel): EffortLevel {
  if (!max) return level;
  return effortIndex(level) > effortIndex(max) ? max : level;
}

function resolveEffort(
  entry: ModelCatalogEntry,
  desired: EffortLevel,
  requireTools?: boolean,
): EffortLevel {
  if (!entry.effort.supported) return 'none';
  // chat/completions rejects reasoning_effort + function tools together.
  if (requireTools) return 'none';
  if (!entry.effort.levels.includes(desired)) return entry.effort.default;
  return desired;
}

function mapEffortOptions(
  entry: ModelCatalogEntry,
  effort: EffortLevel,
  requireTools?: boolean,
): Record<string, unknown> {
  if (!entry.effort.supported) return {};
  // With tools on chat/completions, force explicit none (omitting uses model default).
  if (requireTools) return { reasoning_effort: 'none' };
  if (effort === 'none') return { reasoning_effort: 'none' };
  return { reasoning_effort: effort };
}

export class ModelRouter {
  private catalog: ModelCatalogEntry[] = [];
  private utility = new Map<string, number>();

  setCatalog(entries: ModelCatalogEntry[]): void {
    this.catalog = [...entries];
  }

  recordOutcome(role: SpecialistRole, model: string, effort: EffortLevel, success: boolean, cost = 1): void {
    const key = `${role}|${model}|${effort}`;
    const prev = this.utility.get(key) ?? 0;
    this.utility.set(key, prev + (success ? 1 : -0.5) - cost * 0.05);
  }

  resolve(request: RouteRequest, policy: ModelPolicy): ResolvedModel {
    if (policy.mode === 'manual') {
      const model = policy.model;
      const entry = this.catalog.find((c) => c.id === model) ?? this.fallbackEntry(model);
      const desired =
        policy.effort && policy.effort !== 'auto'
          ? policy.effort
          : this.pickEffort(request, policy.maxEffort ?? entry.effort.default, 'balance');
      const effort = resolveEffort(entry, desired, request.requireTools);
      return {
        model: entry.id,
        providerId: entry.providerId,
        effort,
        providerOptions: mapEffortOptions(entry, effort, request.requireTools),
        reason: `manual:${entry.id}+effort:${effort}`,
      };
    }

    const optimizeFor = request.optimizeFor ?? policy.optimizeFor;
    const complexity = request.complexity ?? 0.3;
    let tier = ROLE_TIER[request.role];
    if (optimizeFor === 'intelligence' || complexity > 0.7) tier = 'frontier';
    if (optimizeFor === 'cost' && complexity < 0.5) tier = 'economy';

    const candidates = this.catalog.filter((c) => c.tier === tier);
    const pool = candidates.length ? candidates : this.catalog;
    const ranked = [...pool].sort((a, b) => {
      const ua = this.utility.get(`${request.role}|${a.id}|${ROLE_EFFORT[request.role]}`) ?? 0;
      const ub = this.utility.get(`${request.role}|${b.id}|${ROLE_EFFORT[request.role]}`) ?? 0;
      return ub - ua;
    });
    const entry = ranked[0] ?? this.fallbackEntry(`${this.catalog[0]?.providerId ?? 'openai'}/default`);
    const desired = this.pickEffort(request, policy.maxEffort, optimizeFor);
    const effort = resolveEffort(entry, desired, request.requireTools);

    return {
      model: entry.id,
      providerId: entry.providerId,
      effort,
      providerOptions: mapEffortOptions(entry, effort, request.requireTools),
      reason: `auto:${optimizeFor}+role:${request.role}+tier:${entry.tier}+effort:${effort}`,
    };
  }

  private pickEffort(request: RouteRequest, maxEffort: EffortLevel | undefined, optimizeFor: OptimizeFor): EffortLevel {
    if (request.manualEffort && request.manualEffort !== 'auto') {
      return clampEffort(request.manualEffort, maxEffort);
    }
    let effort = ROLE_EFFORT[request.role];
    const complexity = request.complexity ?? 0.3;
    if (optimizeFor === 'intelligence' || complexity > 0.6) {
      effort = EFFORT_ORDER[Math.min(EFFORT_ORDER.length - 1, effortIndex(effort) + 1)];
    }
    if (optimizeFor === 'cost') {
      effort = EFFORT_ORDER[Math.max(0, effortIndex(effort) - 1)];
    }
    return clampEffort(effort, maxEffort);
  }

  private fallbackEntry(model: string): ModelCatalogEntry {
    const slash = model.indexOf('/');
    const providerId = slash === -1 ? 'openai' : model.slice(0, slash);
    const id = slash === -1 ? `${providerId}/${model}` : model;
    return {
      id,
      providerId,
      tier: 'standard',
      strengths: ['code'],
      effort: detectEffortCapability(id),
    };
  }
}
