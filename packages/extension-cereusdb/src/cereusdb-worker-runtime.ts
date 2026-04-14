/** Shared surface used by each variant worker entry. */
import pkg from '../package.json';

export type CereusDbApi = {
  sqlJSON: (sql: string) => Promise<Record<string, unknown>[]>;
  version: () => string;
};

type CereusWorkerMessage = {
  id: number;
  type: 'init' | 'sql' | 'version';
  sql?: string;
};

type CreateDb = () => Promise<CereusDbApi>;

const DEFAULT_CEREUS_CDN_BASE = 'https://cdn.jsdelivr.net/npm';
const DEFAULT_CEREUS_VERSION = '0.1.1';

const CEREUS_DEP_VERSIONS = (pkg.dependencies ?? {}) as Record<string, string>;

export function cereusWasmUrl(
  packageName:
    | '@cereusdb/minimal'
    | '@cereusdb/standard'
    | '@cereusdb/full'
    | '@cereusdb/global',
): string {
  const configuredBase = (self as unknown as { __cereusdbCdnBase?: string })
    .__cereusdbCdnBase;
  const base = (configuredBase && configuredBase.trim()) || DEFAULT_CEREUS_CDN_BASE;
  const normalized = base.replace(/\/+$/, '');
  const spec = CEREUS_DEP_VERSIONS[packageName] ?? '';
  const resolvedVersion =
    spec.trim().replace(/^[~^><=\s]*/, '') || DEFAULT_CEREUS_VERSION;
  // Use concrete package path so worker can fetch wasm from CDN and keep host bundles smaller.
  return `${normalized}/${packageName}@${resolvedVersion}/dist/wasm/cereusdb_bg.wasm`;
}

export function runCereusWorker(createDb: CreateDb): void {
  let db: CereusDbApi | null = null;

  const ensureDb = async (): Promise<CereusDbApi> => {
    if (!db) {
      db = await createDb();
    }
    return db;
  };

  self.onmessage = async (e: MessageEvent<CereusWorkerMessage>) => {
    const { id, type, sql } = e.data;
    try {
      if (type === 'init') {
        await ensureDb();
        (self as unknown as Worker).postMessage({ id, ok: true });
        return;
      }
      if (type === 'sql' && typeof sql === 'string') {
        const rows = await (await ensureDb()).sqlJSON(sql);
        (self as unknown as Worker).postMessage({ id, ok: true, rows });
        return;
      }
      if (type === 'version') {
        const version = (await ensureDb()).version();
        (self as unknown as Worker).postMessage({ id, ok: true, version });
        return;
      }
      throw new Error(`Unknown CereusDB worker message: ${String(type)}`);
    } catch (err) {
      (self as unknown as Worker).postMessage({
        id,
        ok: false,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  };
}
