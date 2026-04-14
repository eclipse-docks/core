import type {
  SqlAdapterContribution,
  SqlConnectionInfo,
  SqlDatabase,
} from '@eclipse-docks/extension-sqleditor';
import CereusQueryWorker from './cereusdb-query-worker.ts?worker';
import type { CereusVariantId } from './cereusdb-variants';

export type { CereusVariantId } from './cereusdb-variants';
export { CEREUS_VARIANTS } from './cereusdb-variants';

function rowsToMatrix(rows: Record<string, unknown>[]): {
  columns: string[];
  rows: unknown[][];
} {
  if (!rows.length) {
    return { columns: [], rows: [] };
  }
  const columns = Object.keys(rows[0]);
  const matrix = rows.map((row) => columns.map((c) => row[c]));
  return { columns, rows: matrix };
}

type WorkerResult = {
  rows?: Record<string, unknown>[];
  version?: string;
};

export class CereusSqlDatabase implements SqlDatabase {
  readonly engineId: string;

  private readonly variant: CereusVariantId;
  private worker: Worker | null = null;
  private msgId = 0;
  private pending = new Map<
    number,
    {
      resolve: (value: WorkerResult) => void;
      reject: (error: Error) => void;
    }
  >();
  private connected = false;
  private selectedConnectionId: string | null = null;

  constructor(engineId: string, variant: CereusVariantId) {
    this.engineId = engineId;
    this.variant = variant;
  }

  get currentConnectionId(): string | null {
    return this.selectedConnectionId;
  }

  private async spawnWorker(): Promise<void> {
    if (this.worker) return;
    const w = new CereusQueryWorker();
    w.onmessage = (ev: MessageEvent) => {
      const { id, ok, error, rows, version } = ev.data as {
        id: number;
        ok: boolean;
        error?: string;
        rows?: Record<string, unknown>[];
        version?: string;
      };
      const p = this.pending.get(id);
      if (!p) return;
      this.pending.delete(id);
      if (!ok) {
        p.reject(new Error(error ?? 'CereusDB worker error'));
        return;
      }
      p.resolve({ rows, version });
    };
    this.worker = w;
  }

  private async rpc(
    type: 'init' | 'sql' | 'version',
    sql?: string,
  ): Promise<WorkerResult> {
    await this.spawnWorker();
    const id = ++this.msgId;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.worker!.postMessage({
        id,
        type,
        sql,
        variant: this.variant,
      });
    });
  }

  private async ensureConnected(): Promise<void> {
    if (!this.connected) {
      await this.selectConnection(null);
    }
  }

  async listConnections(): Promise<SqlConnectionInfo[]> {
    return [
      {
        id: null,
        label: 'In-memory',
        isDefault: true,
      },
    ];
  }

  async selectConnection(id: string | null): Promise<void> {
    if (this.connected && id === this.selectedConnectionId) {
      return;
    }
    await this.rpc('init');
    this.connected = true;
    this.selectedConnectionId = id;
  }

  async runQuery(
    sql: string,
  ): Promise<{ columns: string[]; rows: unknown[][] }> {
    await this.ensureConnected();
    const { rows = [] } = await this.rpc('sql', sql);
    return rowsToMatrix(rows);
  }

  async readVersion(): Promise<string> {
    await this.ensureConnected();
    const { version = '' } = await this.rpc('version');
    return version;
  }

  async close(): Promise<void> {
    this.pending.forEach(({ reject }) => {
      reject(new Error('CereusDB worker terminated'));
    });
    this.pending.clear();
    this.worker?.terminate();
    this.worker = null;
    this.connected = false;
    this.selectedConnectionId = null;
  }
}

export function cereusSqlAdapterContributionFor(
  engineId: string,
  label: string,
  variant: CereusVariantId,
): SqlAdapterContribution {
  return {
    id: engineId,
    label,
    icon: 'database',
    loader: async () => new CereusSqlDatabase(engineId, variant),
  };
}
