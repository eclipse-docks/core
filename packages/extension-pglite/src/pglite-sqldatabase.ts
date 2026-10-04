import type { Extension, Extensions } from '@electric-sql/pglite';
import type {
  SqlAdapterContribution,
  SqlConnectionInfo,
  SqlDatabase,
  SqlDatabaseExtensionInfo,
} from '@eclipse-docks/extension-sqleditor';
import { toastError, toastInfo, promptDialog } from '@eclipse-docks/core';
import {
  listPgliteExtensions,
  loadPgliteExtensionModule,
} from './pglite-extensions';

const OPFS_ROOT = 'pglite-databases';
const DB_NAME_REGEX = /^[a-zA-Z0-9_.-]+$/;

type ActiveDatabase = {
  query(sql: string): Promise<{ rows: unknown }>;
  close(): Promise<void>;
};

function opfsDataDir(name: string): string {
  return `opfs-ahp://${OPFS_ROOT}/${name}`;
}

async function opfsRoot(create: boolean): Promise<FileSystemDirectoryHandle | null> {
  const root = await navigator.storage.getDirectory();
  try {
    return await root.getDirectoryHandle(OPFS_ROOT, { create });
  } catch (err) {
    if (!create && err instanceof DOMException && err.name === 'NotFoundError') {
      return null;
    }
    throw err;
  }
}

async function listDatabaseNames(): Promise<string[]> {
  const dir = await opfsRoot(false);
  if (!dir) return [];
  const names: string[] = [];
  for await (const [name, handle] of dir.entries()) {
    if (handle.kind === 'directory') names.push(name);
  }
  return names.sort();
}

async function createDatabaseDir(name: string): Promise<void> {
  const dir = await opfsRoot(true);
  if (!dir) throw new Error('OPFS is not available');
  await dir.getDirectoryHandle(name, { create: true });
}

async function removeDatabaseDir(name: string): Promise<void> {
  const dir = await opfsRoot(false);
  if (!dir) return;
  await dir.removeEntry(name, { recursive: true });
}

async function createPglite(
  persistentId: string | undefined,
  extensions: Extensions | undefined,
  extensionIds: string[],
): Promise<ActiveDatabase> {
  if (!persistentId) {
    const { PGlite: PGliteCtor } = await import('@electric-sql/pglite');
    return PGliteCtor.create(extensions ? { extensions } : undefined);
  }
  const [{ PGliteWorker }, workerModule] = await Promise.all([
    import('@electric-sql/pglite/worker'),
    import('./pglite-opfs-worker.ts?worker'),
  ]);
  return PGliteWorker.create(new workerModule.default(), {
    dataDir: opfsDataDir(persistentId),
    meta: { extensionIds },
  });
}

class PgliteSqlDatabase implements SqlDatabase {
  readonly engineId = 'pglite';

  private db: ActiveDatabase | null = null;
  private currentId: string | null = null;
  private enabledExtensions = new Set<string>();

  get currentConnectionId(): string | null {
    return this.currentId;
  }

  async listConnections(): Promise<SqlConnectionInfo[]> {
    const names = await listDatabaseNames();
    return [
      {
        id: null,
        label: 'In-memory',
        isDefault: true,
      },
      ...names.map((name) => ({
        id: name,
        label: name,
      })),
    ];
  }

  async selectConnection(id: string | null): Promise<void> {
    await this.open(id);
  }

  private async open(id: string | null): Promise<ActiveDatabase> {
    if (this.db && this.currentId === id) return this.db;
    if (this.db) await this.db.close();
    const persistentId = id ?? undefined;
    const extensions = persistentId
      ? undefined
      : await this.resolveEnabledExtensions();
    const db = await createPglite(
      persistentId,
      extensions,
      [...this.enabledExtensions],
    );
    this.db = db;
    this.currentId = id;
    return db;
  }

  async readVersion(): Promise<string> {
    try {
      if (!this.db) return '';
      const result = await this.runQuery('SELECT version()');
      const full = (result.rows[0]?.[0] as string) ?? '';
      const short = full.match(/^PostgreSQL \d+\.\d+/)?.[0];
      return short ?? full;
    } catch {
      return '';
    }
  }

  async runQuery(sql: string): Promise<{ columns: string[]; rows: unknown[][] }> {
    if (!this.db) {
      await this.selectConnection(null);
    }
    if (!this.db) {
      return { columns: [], rows: [] };
    }
    const result = await this.db.query(sql);
    const rows = Array.isArray(result.rows) ? (result.rows as Record<string, unknown>[]) : [];
    if (!rows.length) return { columns: [], rows: [] };
    const columns = Object.keys(rows[0]);
    const matrix = rows.map((row) => columns.map((c) => row[c]));
    return { columns, rows: matrix };
  }

  async close(): Promise<void> {
    if (!this.db) return;
    await this.db.close?.();
    this.db = null;
    this.currentId = null;
  }

  async createConnection(): Promise<SqlConnectionInfo | null> {
    const raw = await promptDialog('New PGlite database name', '');
    if (raw == null) return null;
    const name = raw.trim();
    if (!name) {
      toastError('Name cannot be empty');
      return null;
    }
    if (!DB_NAME_REGEX.test(name)) {
      toastError('Name may only contain letters, numbers, and . _ -');
      return null;
    }
    const existing = await listDatabaseNames();
    if (existing.includes(name)) {
      toastError(`Database "${name}" already exists`);
      return null;
    }
    try {
      await createDatabaseDir(name);
    } catch (err) {
      toastError(err instanceof Error ? err.message : 'Failed to create database');
      return null;
    }
    toastInfo(`Database "${name}" created`);
    return {
      id: name,
      label: name,
      isDefault: false,
    };
  }

  async deleteConnection(id: string): Promise<void> {
    if (!id) return;
    if (this.currentId === id) {
      await this.close();
    }
    await removeDatabaseDir(id);
  }

  async listDbExtensions(): Promise<SqlDatabaseExtensionInfo[]> {
    if (!this.db) {
      await this.selectConnection(null);
    }
    if (!this.db) {
      return listPgliteExtensions().map<SqlDatabaseExtensionInfo>((def) => ({
        id: def.id,
        label: def.label,
        description: def.description,
        installed: false,
      }));
    }

    const result = await this.db.query('SELECT extname FROM pg_extension');
    const rows = Array.isArray(result.rows)
      ? (result.rows as Record<string, unknown>[])
      : [];
    const installedNames = new Set(
      rows
        .map((row) => row.extname)
        .filter((name): name is string => typeof name === 'string'),
    );

    return listPgliteExtensions().map<SqlDatabaseExtensionInfo>((def) => ({
      id: def.id,
      label: def.label,
      description: def.description,
      installed: installedNames.has(def.id),
    }));
  }

  async enableDbExtension(id: string): Promise<void> {
    this.enabledExtensions.add(id);
    const connectionId = this.currentId;
    if (this.db) {
      await this.db.close();
      this.db = null;
    }
    const db = await this.open(connectionId);
    await db.query(`CREATE EXTENSION IF NOT EXISTS ${id};`);
  }

  private async resolveEnabledExtensions(): Promise<Extensions | undefined> {
    if (!this.enabledExtensions.size) return undefined;
    const entries = await Promise.all(
      [...this.enabledExtensions].map(async (extId) => {
        const ext = await loadPgliteExtensionModule(extId);
        return [extId, ext as Extension] as const;
      }),
    );
    const result: Extensions = {};
    for (const [extId, ext] of entries) {
      result[extId] = ext;
    }
    return result;
  }
}

export const pgliteSqlAdapterContribution: SqlAdapterContribution = {
  id: 'pglite',
  label: 'PostgreSQL (PGlite)',
  icon: 'database',
  loader: async () => new PgliteSqlDatabase(),
};

