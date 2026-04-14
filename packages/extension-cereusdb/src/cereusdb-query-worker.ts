import type { CereusVariantId } from './cereusdb-variants';

/** Shared surface used by the worker; each `@cereusdb/*` package declares its own `CereusDB` class. */
type CereusDbApi = {
  sqlJSON: (sql: string) => Promise<Record<string, unknown>[]>;
  version: () => string;
};

async function loadModule(variant: CereusVariantId) {
  switch (variant) {
    case 'minimal':
      return import('@cereusdb/minimal');
    case 'standard':
      return import('@cereusdb/standard');
    case 'full':
      return import('@cereusdb/full');
    case 'global':
      return import('@cereusdb/global');
    default: {
      const v: never = variant;
      throw new Error(`Unknown CereusDB variant: ${String(v)}`);
    }
  }
}

let db: CereusDbApi | null = null;
let loadedVariant: CereusVariantId | null = null;

async function ensureDb(variant: CereusVariantId): Promise<CereusDbApi> {
  if (loadedVariant !== null && loadedVariant !== variant) {
    throw new Error('CereusDB worker: variant mismatch');
  }
  if (!db) {
    const mod = await loadModule(variant);
    loadedVariant = variant;
    db = (await mod.CereusDB.create()) as CereusDbApi;
  }
  return db;
}

self.onmessage = async (e: MessageEvent) => {
  const { id, type, sql, variant } = e.data as {
    id: number;
    type: string;
    sql?: string;
    variant?: CereusVariantId;
  };
  try {
    if (!variant) {
      throw new Error('CereusDB worker: missing variant');
    }
    if (type === 'init') {
      await ensureDb(variant);
      (self as unknown as Worker).postMessage({ id, ok: true });
      return;
    }
    if (type === 'sql' && typeof sql === 'string') {
      const rows = await (await ensureDb(variant)).sqlJSON(sql);
      (self as unknown as Worker).postMessage({ id, ok: true, rows });
      return;
    }
    if (type === 'version') {
      const version = (await ensureDb(variant)).version();
      (self as unknown as Worker).postMessage({ id, ok: true, version });
      return;
    }
    throw new Error(`Unknown CereusDB worker message: ${type}`);
  } catch (err) {
    (self as unknown as Worker).postMessage({
      id,
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    });
  }
};
