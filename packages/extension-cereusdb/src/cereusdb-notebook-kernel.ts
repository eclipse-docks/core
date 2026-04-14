import type {
  NotebookExecutionResult,
  NotebookKernel,
  NotebookKernelContribution,
} from '@eclipse-docks/extension-notebook';
import type { CereusVariantId } from './cereusdb-variants';
import { CereusSqlDatabase } from './cereusdb-sqldatabase';

function formatResult(columns: string[], rows: unknown[][]): string {
  if (columns.length === 0 && rows.length === 0) return '';
  const pad = (s: string, w: number) => s.padEnd(w);
  const colWidths = columns.map((c, i) => {
    const maxVal = rows.reduce(
      (m, r) => Math.max(m, String(r[i] ?? '').length),
      0,
    );
    return Math.max(c.length, maxVal, 1);
  });
  const sep = colWidths.map((w) => '-'.repeat(w)).join('-+-');
  const header = columns.map((c, i) => pad(c, colWidths[i])).join(' | ');
  const lineRows = rows.map((row) =>
    row.map((v, i) => pad(String(v ?? ''), colWidths[i])).join(' | '),
  );
  return [header, sep, ...lineRows].join('\n');
}

class CereusNotebookKernel implements NotebookKernel {
  readonly id: string;
  readonly label: string;
  readonly language = 'sql';

  private readonly variant: CereusVariantId;
  private db: CereusSqlDatabase | null = null;

  constructor(engineId: string, label: string, variant: CereusVariantId) {
    this.id = engineId;
    this.label = label;
    this.variant = variant;
  }

  private async getDb(): Promise<CereusSqlDatabase> {
    if (!this.db) {
      this.db = new CereusSqlDatabase(this.id, this.variant);
      await this.db.selectConnection(null);
    }
    return this.db;
  }

  async getVersion(): Promise<string | undefined> {
    try {
      const db = await this.getDb();
      return await db.readVersion();
    } catch {
      return undefined;
    }
  }

  async execute(code: string): Promise<NotebookExecutionResult> {
    try {
      const db = await this.getDb();
      const result = await db.runQuery(code);
      const data = formatResult(result.columns, result.rows);
      return { data: data || undefined };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }

  close(): void {
    if (this.db) {
      void this.db.close();
      this.db = null;
    }
  }
}

export function cereusNotebookKernelContributionFor(
  engineId: string,
  label: string,
  variant: CereusVariantId,
): NotebookKernelContribution {
  return {
    id: engineId,
    label,
    language: 'sql',
    loadKernel: async (): Promise<NotebookKernel> =>
      new CereusNotebookKernel(engineId, label, variant),
  };
}
