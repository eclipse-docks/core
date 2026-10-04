import { promptDialog, toastError } from '@eclipse-docks/core';
import type {
  SqlAdapterContribution,
  SqlConnectionInfo,
  SqlDatabase,
  SqlDatabaseExtensionInfo,
} from '@eclipse-docks/extension-sqleditor';
import {
  duckdbService,
  DuckDBDatabase,
} from './duckdb-service';

class DuckdbSqlDatabase implements SqlDatabase {
  readonly engineId = 'duckdb';

  private current: DuckDBDatabase | null = null;
  private currentId: string | null = null;
  private enabledExtensions = new Set<string>();

  get currentConnectionId(): string | null {
    return this.currentId;
  }

  async listConnections(): Promise<SqlConnectionInfo[]> {
    const names = await duckdbService.listDatabases();
    const result: SqlConnectionInfo[] = [
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
    return result;
  }

  async selectConnection(id: string | null): Promise<void> {
    if (this.current && this.currentId === id) return;
    if (this.current) {
      await this.current.close();
      this.current = null;
    }
    const db =
      id === null
        ? await duckdbService.open()
        : await duckdbService.open(id);
    this.current = db;
    this.currentId = db.name ?? null;
  }

  async runQuery(sql: string): Promise<{ columns: string[]; rows: unknown[][] }> {
    if (!this.current) {
      await this.selectConnection(null);
    }
    if (!this.current) {
      return { columns: [], rows: [] };
    }
    const result = await this.current.runQuery(sql);
    return { columns: result.columns, rows: result.rows };
  }

  async createConnection(): Promise<SqlConnectionInfo | null> {
    const raw = await promptDialog('New DuckDB database name', '');
    if (raw == null) return null;
    try {
      const db = await duckdbService.createPersisted(raw);
      const id = db.name ?? raw.trim();
      return { id, label: id };
    } catch (err) {
      toastError(err instanceof Error ? err.message : String(err));
      return null;
    }
  }

  async deleteConnection(id: string): Promise<void> {
    if (!id) return;
    if (this.current && this.current.name === id) {
      await this.current.close();
      this.current = null;
      this.currentId = null;
    }
    await duckdbService.delete(id);
  }

  async listDbExtensions(): Promise<SqlDatabaseExtensionInfo[]> {
    if (!this.current) {
      await this.selectConnection(null);
    }
    if (!this.current) {
      return [];
    }

    try {
      const result = await this.current.runQuery(
        'SELECT extension_name, installed, loaded, description FROM duckdb_extensions();',
      );
      const nameIndex = result.columns.indexOf('extension_name');
      if (nameIndex === -1) {
        return [];
      }
      const installedIndex = result.columns.indexOf('installed');
      const loadedIndex = result.columns.indexOf('loaded');
      const descriptionIndex = result.columns.indexOf('description');

      return result.rows.map<SqlDatabaseExtensionInfo>((row) => {
        const cells = row as unknown[];
        const id = String(cells[nameIndex] ?? '').trim();
        const installedValue =
          installedIndex >= 0 ? cells[installedIndex] : undefined;
        const loadedValue =
          loadedIndex >= 0 ? cells[loadedIndex] : undefined;
        const descriptionValue =
          descriptionIndex >= 0 ? cells[descriptionIndex] : undefined;
        const isInstalledFromDb =
          loadedValue === true ||
          loadedValue === 1 ||
          loadedValue === 't' ||
          loadedValue === 'true' ||
          installedValue === true ||
          installedValue === 1 ||
          installedValue === 't' ||
          installedValue === 'true';
        const isInstalled =
          isInstalledFromDb || this.enabledExtensions.has(id);

        return {
          id,
          label: id,
          description:
            typeof descriptionValue === 'string' ? descriptionValue : undefined,
          installed: isInstalled,
        };
      });
    } catch {
      return [];
    }
  }

  async enableDbExtension(id: string): Promise<void> {
    if (!this.current) return;
    await this.current.enableExtension(id);
    this.enabledExtensions.add(id);
  }

  async readVersion(): Promise<string> {
    try {
      if (!this.current) return '';
      const result = await this.current.runQuery('SELECT version()');
      return String((result.rows[0]?.[0] as string) ?? '');
    } catch {
      return '';
    }
  }

  async close(): Promise<void> {
    if (!this.current) return;
    await this.current.close();
    this.current = null;
    this.currentId = null;
  }
}

export const duckdbSqlAdapterContribution: SqlAdapterContribution = {
  id: 'duckdb',
  label: 'DuckDB',
  icon: 'database',
  loader: async () => new DuckdbSqlDatabase(),
};

