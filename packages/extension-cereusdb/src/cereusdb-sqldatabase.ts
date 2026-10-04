import { promptDialog, toastError } from '@eclipse-docks/core';
import type {
  SqlAdapterContribution,
  SqlConnectionInfo,
  SqlDatabase,
} from '@eclipse-docks/extension-sqleditor';
import type { CereusVariantId } from './cereusdb-variants';

export type { CereusVariantId } from './cereusdb-variants';
export { CEREUS_VARIANTS } from './cereusdb-variants';

const IN_MEMORY_KEY = '';
const DB_NAME_REGEX = /^[a-zA-Z0-9_.-]+$/;

type WorkerFactory = new () => Worker;

let workerFactory: WorkerFactory | null = null;

async function loadWorkerFactory(): Promise<WorkerFactory> {
  if (!workerFactory) {
    workerFactory = (await import('./cereusdb-worker.ts?worker&inline')).default;
  }
  return workerFactory;
}

const wasmUrlLoaders: Record<CereusVariantId, () => Promise<{ default: string }>> = {
  minimal: () => import('@cereusdb/minimal/wasm?url&no-inline'),
  standard: () => import('@cereusdb/standard/wasm?url&no-inline'),
  full: () => import('@cereusdb/full/wasm?url&no-inline'),
  global: () => import('@cereusdb/global/wasm?url&no-inline'),
};

async function loadWasmUrl(variant: CereusVariantId): Promise<string> {
  const load = wasmUrlLoaders[variant];
  if (!load) {
    throw new Error(`Unknown CereusDB variant: ${String(variant)}`);
  }
  return (await load()).default;
}

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

type PendingCall = {
  resolve: (value: WorkerResult) => void;
  reject: (error: Error) => void;
};

class ConnectionSlot {
  worker: Worker | null = null;
  connected = false;
  msgId = 0;
  pending = new Map<number, PendingCall>();
}

export class CereusSqlDatabase implements SqlDatabase {
  readonly engineId: string;

  private readonly variant: CereusVariantId;
  private readonly names = new Set<string>();
  private readonly slots = new Map<string, ConnectionSlot>();
  private wasmUrl: string | null = null;
  private selectedConnectionId: string | null = null;

  constructor(engineId: string, variant: CereusVariantId) {
    this.engineId = engineId;
    this.variant = variant;
  }

  get currentConnectionId(): string | null {
    return this.selectedConnectionId;
  }

  private slotKey(id: string | null): string {
    return id ?? IN_MEMORY_KEY;
  }

  private slotFor(id: string | null): ConnectionSlot {
    const key = this.slotKey(id);
    let slot = this.slots.get(key);
    if (!slot) {
      slot = new ConnectionSlot();
      this.slots.set(key, slot);
    }
    return slot;
  }

  private disposeSlot(slot: ConnectionSlot): void {
    slot.pending.forEach(({ reject }) => {
      reject(new Error('CereusDB worker terminated'));
    });
    slot.pending.clear();
    slot.worker?.terminate();
    slot.worker = null;
    slot.connected = false;
  }

  private async resolveWasmUrl(): Promise<string> {
    if (!this.wasmUrl) {
      this.wasmUrl = await loadWasmUrl(this.variant);
    }
    return this.wasmUrl;
  }

  private async spawnWorker(slot: ConnectionSlot): Promise<void> {
    if (slot.worker) return;
    const WorkerCtor = await loadWorkerFactory();
    const worker = new WorkerCtor();
    worker.onmessage = (ev: MessageEvent) => {
      const { id, ok, error, rows, version } = ev.data as {
        id: number;
        ok: boolean;
        error?: string;
        rows?: Record<string, unknown>[];
        version?: string;
      };
      const pending = slot.pending.get(id);
      if (!pending) return;
      slot.pending.delete(id);
      if (!ok) {
        pending.reject(new Error(error ?? 'CereusDB worker error'));
        return;
      }
      pending.resolve({ rows, version });
    };
    slot.worker = worker;
  }

  private async rpc(
    slot: ConnectionSlot,
    type: 'init' | 'sql' | 'version',
    sql?: string,
  ): Promise<WorkerResult> {
    await this.spawnWorker(slot);
    const wasmUrl = type === 'init' ? await this.resolveWasmUrl() : undefined;
    const variant = type === 'init' ? this.variant : undefined;
    const id = ++slot.msgId;
    return new Promise((resolve, reject) => {
      slot.pending.set(id, { resolve, reject });
      slot.worker!.postMessage({
        id,
        type,
        sql,
        wasmUrl,
        variant,
      });
    });
  }

  private async ensureConnected(): Promise<void> {
    const slot = this.slotFor(this.selectedConnectionId);
    if (slot.connected) return;
    await this.selectConnection(this.selectedConnectionId);
  }

  async listConnections(): Promise<SqlConnectionInfo[]> {
    const named = [...this.names].sort().map((name) => ({
      id: name,
      label: name,
    }));
    return [
      {
        id: null,
        label: 'In-memory',
        isDefault: true,
      },
      ...named,
    ];
  }

  async selectConnection(id: string | null): Promise<void> {
    if (id !== null && !this.names.has(id)) {
      throw new Error(`Unknown CereusDB database: ${id}`);
    }
    const slot = this.slotFor(id);
    if (slot.connected && this.selectedConnectionId === id) return;
    this.selectedConnectionId = id;
    if (slot.connected) return;
    await this.rpc(slot, 'init');
    slot.connected = true;
  }

  async createConnection(): Promise<SqlConnectionInfo | null> {
    const raw = await promptDialog('New CereusDB database name', '');
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
    if (this.names.has(name)) {
      toastError(`Database "${name}" already exists`);
      return null;
    }
    this.names.add(name);
    return { id: name, label: name };
  }

  async deleteConnection(id: string): Promise<void> {
    if (!id || !this.names.has(id)) return;
    const slot = this.slots.get(id);
    if (slot) this.disposeSlot(slot);
    this.slots.delete(id);
    this.names.delete(id);
    if (this.selectedConnectionId === id) {
      this.selectedConnectionId = null;
    }
  }

  async runQuery(
    sql: string,
  ): Promise<{ columns: string[]; rows: unknown[][] }> {
    await this.ensureConnected();
    const slot = this.slotFor(this.selectedConnectionId);
    const { rows = [] } = await this.rpc(slot, 'sql', sql);
    return rowsToMatrix(rows);
  }

  async readVersion(): Promise<string> {
    await this.ensureConnected();
    const slot = this.slotFor(this.selectedConnectionId);
    const { version = '' } = await this.rpc(slot, 'version');
    return version;
  }

  async close(): Promise<void> {
    for (const slot of this.slots.values()) {
      this.disposeSlot(slot);
    }
    this.slots.clear();
    this.names.clear();
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
