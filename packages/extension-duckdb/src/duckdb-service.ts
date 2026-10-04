import { createLogger, workspaceService } from '@eclipse-docks/core';
import type { File } from '@eclipse-docks/core';
import * as DuckDBWasm from '@duckdb/duckdb-wasm';
import * as duckdb from '@duckdb/duckdb-wasm';

const logger = createLogger('DuckDBService');

const JSDELIVR_BUNDLES = duckdb.getJsDelivrBundles();

const IN_MEMORY_KEY = '__memory__';
const OPFS_DB_DIR = 'duckdb-databases';
const EXTENSION_NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]*$/;
const DB_NAME_REGEX = /^[a-zA-Z0-9_.-]+$/;
const WORKSPACE_PREFIX = '/workspace/';

const LEGACY_FILE_SUFFIXES = [
  '.duckdb',
  '.duckdb.wal',
  '.duckdb.wal.checkpoint',
  '.duckdb.wal.recovery',
] as const;

function folderPathFor(name: string): string {
  return `opfs://${OPFS_DB_DIR}/${name}/${name}.duckdb`;
}

function legacyPathFor(name: string): string {
  return `opfs://${OPFS_DB_DIR}/${name}.duckdb`;
}

type AsyncDuckDB = duckdb.AsyncDuckDB;
type AsyncDuckDBConnection = Awaited<ReturnType<AsyncDuckDB['connect']>>;
type DuckDBDataProtocol = DuckDBWasm.DuckDBDataProtocol;

/** Plain JS result: columns in order, rows as array of value arrays. */
export interface DuckDBQueryResult {
  columns: string[];
  rows: unknown[][];
}

function toPlainValue(v: unknown): unknown {
  if (v === null || v === undefined) return v;
  if (typeof v === 'bigint') return Number(v);
  if (v instanceof Date) return v.toISOString();
  if (typeof v === 'object' && v !== null && typeof (v as { toJSON: unknown }).toJSON === 'function') {
    return (v as { toJSON: () => unknown }).toJSON();
  }
  return v;
}

function tableToPlainArrays(table: { toArray?: () => unknown[] }): { columns: string[]; rows: unknown[][] } {
  const raw = table.toArray?.();
  const rowObjects = Array.isArray(raw) ? (raw as Record<string, unknown>[]) : [];
  if (rowObjects.length === 0) return { columns: [], rows: [] };
  const columns = Object.keys(rowObjects[0]);
  const rows = rowObjects.map((obj) => columns.map((col) => toPlainValue(obj[col])));
  return { columns, rows };
}

async function opfsDbDir(create: boolean): Promise<FileSystemDirectoryHandle | null> {
  const root = await navigator.storage.getDirectory();
  try {
    return await root.getDirectoryHandle(OPFS_DB_DIR, { create });
  } catch (err) {
    if (!create && err instanceof DOMException && err.name === 'NotFoundError') return null;
    throw err;
  }
}

async function resolveDatabasePath(name: string): Promise<string> {
  const dir = await opfsDbDir(true);
  if (!dir) throw new Error('OPFS is not available');
  try {
    await dir.getDirectoryHandle(name);
    return folderPathFor(name);
  } catch (err) {
    if (!(err instanceof DOMException && err.name === 'NotFoundError')) throw err;
  }
  try {
    await dir.getFileHandle(`${name}.duckdb`);
    return legacyPathFor(name);
  } catch (err) {
    if (!(err instanceof DOMException && err.name === 'NotFoundError')) throw err;
  }
  await dir.getDirectoryHandle(name, { create: true });
  return folderPathFor(name);
}

async function createConnection(path: string | null): Promise<{
  db: AsyncDuckDB;
  conn: AsyncDuckDBConnection;
  worker: Worker;
}> {
  const bundle = await duckdb.selectBundle(JSDELIVR_BUNDLES);
  const workerUrl = URL.createObjectURL(
    new Blob([`importScripts("${bundle.mainWorker}");`], { type: 'text/javascript' }),
  );
  const worker = new Worker(workerUrl);
  URL.revokeObjectURL(workerUrl);
  const log = new duckdb.ConsoleLogger();
  const db = new duckdb.AsyncDuckDB(log, worker);
  await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
  if (path) {
    await db.open({
      path,
      accessMode: duckdb.DuckDBAccessMode.READ_WRITE,
    });
    logger.info(`DuckDB-WASM opened: ${path} (read-write)`);
  }
  const conn = await db.connect();
  logger.info('DuckDB-WASM initialized');
  return { db, conn, worker };
}

async function registerWorkspaceFilesForQuery(
  db: AsyncDuckDB,
  sql: string,
  alreadyRegistered: Set<string>,
): Promise<void> {
  const literalRegex = /'\/workspace\/([^']+)'/g;
  const matches = new Map<string, string>();

  let match: RegExpExecArray | null;
  while ((match = literalRegex.exec(sql)) !== null) {
    const relPath = match[1];
    if (!matches.has(relPath)) {
      matches.set(relPath, `${WORKSPACE_PREFIX}${relPath}`);
    }
  }

  if (matches.size === 0) return;

  const workspaceRoot = await workspaceService.getWorkspace();
  if (!workspaceRoot) {
    throw new Error('Workspace is not available');
  }

  for (const [relPath, vfsPath] of matches) {
    if (alreadyRegistered.has(vfsPath)) {
      // Already registered for this database, skip.
      // If the underlying workspace file changes, users can reopen the connection.
      // This keeps query overhead low.
      // eslint-disable-next-line no-continue
      continue;
    }

    const resource = await workspaceRoot.getResource(relPath);
    if (!resource) {
      throw new Error(`Workspace file not found: ${relPath}`);
    }

    const file = resource as File;
    const url = await file.getContents({ uri: true });

    if (typeof url !== 'string') {
      throw new Error(`Unable to obtain URL for workspace file: ${relPath}`);
    }

    await db.registerFileURL(vfsPath, url, DuckDBWasm.DuckDBDataProtocol.HTTP, false);
    alreadyRegistered.add(vfsPath);
  }
}

/**
 * Abstraction over a single DuckDB database. Use runQuery, enableExtension, close, or delete.
 */
export class DuckDBDatabase {
  private readonly key: string;
  private readonly registeredWorkspaceFiles = new Set<string>();

  constructor(
    readonly name: string | null,
    private db: AsyncDuckDB,
    private conn: AsyncDuckDBConnection,
    private worker: Worker,
    private onClose: (key: string) => void,
    private onDeleteFromOPFS?: (name: string) => Promise<void>,
  ) {
    this.key = name ?? IN_MEMORY_KEY;
  }

  async runQuery(sql: string): Promise<DuckDBQueryResult> {
    const trimmed = sql.trim();
    if (!trimmed) return { rows: [], columns: [] };

    try {
      await registerWorkspaceFilesForQuery(this.db, trimmed, this.registeredWorkspaceFiles);
      const table = await this.conn.query(trimmed);
      const result = tableToPlainArrays(table);
      if (this.name) {
        await this.conn.query('CHECKPOINT');
      }
      return result;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.error(`Query failed: ${msg}`);
      throw new Error(`Query failed: ${msg}`);
    }
  }

  async enableExtension(extensionName: string): Promise<void> {
    if (!EXTENSION_NAME_REGEX.test(extensionName)) {
      throw new Error(`Invalid extension name: ${extensionName}`);
    }
    const installSql = `INSTALL ${extensionName}`;
    const loadSql = `LOAD ${extensionName}`;
    try {
      await this.conn.query(installSql);
      await this.conn.query(loadSql);
      logger.info(`DuckDB extension enabled: ${extensionName}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.error(`Failed to enable extension ${extensionName}: ${msg}`);
      throw new Error(`Failed to enable extension ${extensionName}: ${msg}`);
    }
  }

  async close(): Promise<void> {
    try {
      await this.conn.close();
    } catch (e) {
      logger.warn('Error closing DuckDB connection: ' + (e instanceof Error ? e.message : String(e)));
    }
    try {
      this.db.terminate();
    } catch (e) {
      logger.warn('Error terminating DuckDB: ' + (e instanceof Error ? e.message : String(e)));
    }
    this.onClose(this.key);
  }
}

export class DuckDBService {
  private databases = new Map<string, DuckDBDatabase>();

  private keyFor(name: string | undefined): string {
    return name === undefined || name === '' ? IN_MEMORY_KEY : name;
  }

  /**
   * Create a new OPFS database and flush it so it shows up in {@link listDatabases}.
   * Returns the open database.
   */
  async createPersisted(name: string): Promise<DuckDBDatabase> {
    const trimmed = name.trim();
    if (!trimmed) {
      throw new Error('Name cannot be empty');
    }
    if (!DB_NAME_REGEX.test(trimmed)) {
      throw new Error('Name may only contain letters, numbers, and . _ -');
    }
    const existing = await this.listDatabases();
    if (existing.includes(trimmed) || this.databases.has(trimmed)) {
      throw new Error(`Database "${trimmed}" already exists`);
    }
    const db = await this.open(trimmed);
    try {
      await db.runQuery('CHECKPOINT');
    } catch (err) {
      await db.close();
      throw err;
    }
    return db;
  }

  /**
   * Open a database by name. Stored in OPFS as `duckdb-databases/<name>/<name>.duckdb`. Omit name for in-memory.
   * Returns the same abstraction if that database is already open.
   */
  async open(name?: string): Promise<DuckDBDatabase> {
    const key = this.keyFor(name);
    const existing = this.databases.get(key);
    if (existing) return existing;

    if (key !== IN_MEMORY_KEY && !DB_NAME_REGEX.test(name!)) {
      throw new Error(`Invalid database name: ${name}`);
    }

    const nameOrNull = name === undefined || name === '' ? null : name;
    const path = nameOrNull ? await resolveDatabasePath(nameOrNull) : null;
    const { db, conn, worker } = await createConnection(path);

    const dbObj = new DuckDBDatabase(
      nameOrNull,
      db,
      conn,
      worker,
      (k) => this.databases.delete(k),
      nameOrNull ? (n) => this.removeOPFSDatabase(n) : undefined,
    );
    this.databases.set(key, dbObj);
    return dbObj;
  }

  /**
   * List persisted database names. New databases are directories under duckdb-databases/.
   * Older databases are a `<name>.duckdb` file in that directory.
   */
  async listDatabases(): Promise<string[]> {
    try {
      const dir = await opfsDbDir(false);
      if (!dir) return [];
      const names = new Set<string>();
      for await (const [entryName, handle] of dir.entries()) {
        if (handle.kind === 'directory') {
          names.add(entryName);
          continue;
        }
        if (handle.kind === 'file' && entryName.endsWith('.duckdb')) {
          names.add(entryName.slice(0, -'.duckdb'.length));
        }
      }
      return [...names].sort();
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'NotFoundError') return [];
      const msg = err instanceof Error ? err.message : String(err);
      logger.error(`listDatabases failed: ${msg}`);
      return [];
    }
  }

  /**
   * Close the database if open and remove its file from OPFS. Name is the simple database name (e.g. `mydb`).
   */
  async delete(name: string): Promise<void> {
    if (!DB_NAME_REGEX.test(name)) {
      throw new Error(`Invalid database name: ${name}`);
    }
    const existing = this.databases.get(name);
    if (existing) await existing.close();
    await this.removeOPFSDatabase(name);
  }

  private async removeOPFSDatabase(name: string): Promise<void> {
    const dir = await opfsDbDir(false);
    if (!dir) {
      throw new Error(`Failed to delete database: ${name} was not found`);
    }
    let removed = false;
    try {
      await dir.removeEntry(name, { recursive: true });
      removed = true;
    } catch (err) {
      if (!(err instanceof DOMException && err.name === 'NotFoundError')) {
        const msg = err instanceof Error ? err.message : String(err);
        logger.error(`Failed to delete database ${name}: ${msg}`);
        throw new Error(`Failed to delete database: ${msg}`);
      }
    }
    for (const suffix of LEGACY_FILE_SUFFIXES) {
      try {
        await dir.removeEntry(`${name}${suffix}`);
        removed = true;
      } catch (err) {
        if (err instanceof DOMException && err.name === 'NotFoundError') continue;
        const msg = err instanceof Error ? err.message : String(err);
        logger.error(`Failed to delete database ${name}: ${msg}`);
        throw new Error(`Failed to delete database: ${msg}`);
      }
    }
    if (!removed) {
      throw new Error(`Failed to delete database: ${name} was not found`);
    }
    logger.info(`DuckDB removed: ${name}`);
  }
}

export const duckdbService = new DuckDBService();
