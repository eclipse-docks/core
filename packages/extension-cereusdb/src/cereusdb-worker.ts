import type { CereusVariantId } from './cereusdb-variants';

type CereusDbApi = {
  sqlJSON: (sql: string) => Promise<Record<string, unknown>[]>;
  version: () => string;
};

type CereusModule = {
  CereusDB: {
    create(options: { wasmUrl: string }): Promise<CereusDbApi>;
  };
};

const modules: Record<CereusVariantId, () => Promise<CereusModule>> = {
  minimal: () => import('@cereusdb/minimal/external'),
  standard: () => import('@cereusdb/standard/external'),
  full: () => import('@cereusdb/full/external'),
  global: () => import('@cereusdb/global/external'),
};

type CereusWorkerMessage = {
  id: number;
  type: 'init' | 'sql' | 'version';
  sql?: string;
  wasmUrl?: string;
  variant?: CereusVariantId;
};

async function createDb(variant: CereusVariantId, wasmUrl: string): Promise<CereusDbApi> {
  const load = modules[variant];
  if (!load) {
    throw new Error(`Unknown CereusDB variant: ${String(variant)}`);
  }
  const { CereusDB } = await load();
  return CereusDB.create({ wasmUrl });
}

let db: CereusDbApi | null = null;

const ensureDb = (): CereusDbApi => {
  if (!db) {
    throw new Error('CereusDB worker is not initialized');
  }
  return db;
};

self.onmessage = async (e: MessageEvent<CereusWorkerMessage>) => {
  const { id, type, sql, wasmUrl, variant } = e.data;
  try {
    if (type === 'init') {
      if (!wasmUrl || !variant) {
        throw new Error('CereusDB worker init requires variant and wasmUrl');
      }
      db = await createDb(variant, wasmUrl);
      self.postMessage({ id, ok: true });
      return;
    }
    if (type === 'sql' && typeof sql === 'string') {
      const rows = await ensureDb().sqlJSON(sql);
      self.postMessage({ id, ok: true, rows });
      return;
    }
    if (type === 'version') {
      const version = ensureDb().version();
      self.postMessage({ id, ok: true, version });
      return;
    }
    throw new Error(`Unknown CereusDB worker message: ${String(type)}`);
  } catch (err) {
    self.postMessage({
      id,
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    });
  }
};
