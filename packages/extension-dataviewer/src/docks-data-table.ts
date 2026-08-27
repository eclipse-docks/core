import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { css, html } from 'lit';
import type { TabularData } from './api';

type SortDirection = 'asc' | 'desc';

function cellString(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value);
}

function isNumericColumn(rows: unknown[][], colIndex: number): boolean {
  if (rows.length === 0) return false;
  return rows.every((row) => {
    const v = row[colIndex];
    if (v === null || v === undefined) return true;
    const n = Number(v);
    return Number.isFinite(n);
  });
}

function compareCells(a: unknown, b: unknown, numeric: boolean): number {
  if (numeric) {
    const na = Number(a);
    const nb = Number(b);
    if (!Number.isFinite(na)) return Number.isFinite(nb) ? 1 : 0;
    if (!Number.isFinite(nb)) return -1;
    return na - nb;
  }
  return cellString(a).localeCompare(cellString(b), undefined, { numeric: true });
}

@customElement('docks-data-table')
export class DocksDataTable extends LitElement {
  @property({ attribute: false })
  data: TabularData = { columns: [], rows: [] };

  @property({ type: String })
  emptyMessage = 'No data.';

  @state()
  private sortColumnIndex: number | null = null;

  @state()
  private sortDirection: SortDirection = 'asc';

  @state()
  private filterQuery = '';

  @state()
  private pageSize = 25;

  @state()
  private currentPage = 0;

  private static readonly PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

  private get columns(): string[] {
    return Array.isArray(this.data?.columns) ? this.data.columns : [];
  }

  private get rows(): unknown[][] {
    return Array.isArray(this.data?.rows) ? this.data.rows : [];
  }

  private get filteredRows(): unknown[][] {
    const q = this.filterQuery.trim().toLowerCase();
    if (!q) return this.rows;
    return this.rows.filter((row) =>
      row.some((cell) => cellString(cell).toLowerCase().includes(q))
    );
  }

  private get sortedRows(): unknown[][] {
    const filtered = this.filteredRows;
    if (this.sortColumnIndex == null || this.sortColumnIndex < 0) return filtered;
    const col = this.sortColumnIndex;
    const numeric = isNumericColumn(filtered, col);
    const dir = this.sortDirection === 'asc' ? 1 : -1;
    return [...filtered].sort((rowA, rowB) => {
      const a = rowA[col];
      const b = rowB[col];
      return dir * compareCells(a, b, numeric);
    });
  }

  private get totalRows(): number {
    return this.sortedRows.length;
  }

  private get pageCount(): number {
    const total = this.totalRows;
    if (total === 0) return 1;
    return Math.ceil(total / this.pageSize);
  }

  private get pagedRows(): unknown[][] {
    const all = this.sortedRows;
    const page = this.clampedPage;
    const start = page * this.pageSize;
    return all.slice(start, start + this.pageSize);
  }

  private get clampedPage(): number {
    const count = this.pageCount;
    return count <= 0 ? 0 : Math.min(this.currentPage, count - 1);
  }

  private goToPage(page: number): void {
    const last = Math.max(0, this.pageCount - 1);
    this.currentPage = Math.max(0, Math.min(page, last));
    this.requestUpdate();
  }

  private onPageSizeChange(e: Event): void {
    const val = (e.target as HTMLSelectElement).value;
    const n = parseInt(val, 10);
    if (!Number.isFinite(n) || n < 1) return;
    this.pageSize = n;
    this.currentPage = 0;
    this.requestUpdate();
  }

  private onSort(colIndex: number): void {
    if (this.sortColumnIndex === colIndex) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumnIndex = colIndex;
      this.sortDirection = 'asc';
    }
    this.requestUpdate();
  }

  private onFilterInput(e: Event): void {
    this.filterQuery = (e.target as HTMLInputElement).value;
    this.requestUpdate();
  }

  private clearFilter(): void {
    this.filterQuery = '';
    this.requestUpdate();
  }

  private getSortAria(colIndex: number): string {
    if (this.sortColumnIndex !== colIndex) return 'none';
    return this.sortDirection === 'asc' ? 'ascending' : 'descending';
  }

  render() {
    const { columns } = this;
    const total = this.totalRows;
    const displayRows = this.pagedRows;
    const page = this.clampedPage;
    const count = this.pageCount;
    const start = total === 0 ? 0 : page * this.pageSize + 1;
    const end = Math.min((page + 1) * this.pageSize, total);

    if (columns.length === 0 && total === 0 && this.rows.length === 0) {
      return html`<div class="table-empty">${this.emptyMessage}</div>`;
    }

    return html`
      <div class="table-toolbar">
        <wa-input
          class="filter-input"
          placeholder="Filter…"
          .value=${this.filterQuery}
          @input=${this.onFilterInput}
          @wa-clear=${this.clearFilter}
          with-clear
          size="s"
          aria-label="Filter rows"
        >
          <wa-icon slot="start" name="magnifying-glass" label="Filter"></wa-icon>
        </wa-input>
        <div class="paging-controls">
          <wa-select
            class="page-size-select"
            size="s"
            .value=${String(this.pageSize)}
            title="Rows per page"
            @change=${this.onPageSizeChange}
          >
            ${DocksDataTable.PAGE_SIZE_OPTIONS.map(
              (n) => html`<wa-option value=${String(n)}>${n}</wa-option>`
            )}
          </wa-select>
          <span class="paging-summary" aria-live="polite">
            ${total === 0 ? '0 rows' : `${start}–${end} of ${total}`}
          </span>
          <wa-button
            size="s"
            appearance="plain"
            title="Previous page"
            ?disabled=${count <= 1 || page <= 0}
            @click=${() => this.goToPage(page - 1)}
          >
            <wa-icon name="chevron-left" label="Previous"></wa-icon>
          </wa-button>
          <wa-button
            size="s"
            appearance="plain"
            title="Next page"
            ?disabled=${count <= 1 || page >= count - 1}
            @click=${() => this.goToPage(page + 1)}
          >
            <wa-icon name="chevron-right" label="Next"></wa-icon>
          </wa-button>
        </div>
      </div>
      <div class="table-wrap">
        <table class="result-table">
          <thead>
            <tr>
              ${columns.map(
                (col, i) => html`
                  <th scope="col" role="columnheader" aria-sort=${this.getSortAria(i)}>
                    <button
                      type="button"
                      class="th-sort"
                      @click=${() => this.onSort(i)}
                      title="Sort by ${col}"
                    >
                      <span class="th-label">${col}</span>
                      ${this.sortColumnIndex === i
                        ? html`<wa-icon
                            name=${this.sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'}
                            label=${this.sortDirection}
                          ></wa-icon>`
                        : html`<wa-icon name="arrows-up-down" label="Sort"></wa-icon>`}
                    </button>
                  </th>
                `
              )}
            </tr>
          </thead>
          <tbody>
            ${displayRows.length === 0
              ? html`<tr><td colspan=${columns.length} class="table-empty-cell">No matching rows.</td></tr>`
              : displayRows.map(
                  (row) => html`
                    <tr>
                      ${row.map((cell) => html`<td>${cellString(cell)}</td>`)}
                    </tr>
                  `
                )}
          </tbody>
        </table>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
    }
    .table-empty {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }
    .table-toolbar {
      flex: none;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.25rem 0;
      flex-wrap: wrap;
    }
    .filter-input {
      max-width: 280px;
    }
    .paging-controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-left: auto;
    }
    .page-size-select {
    }
    .paging-summary {
      font-size: 0.8125rem;
      color: var(--wa-color-text-quiet);
      min-width: 5rem;
    }
    .table-wrap {
      flex: 1;
      min-height: 0;
      overflow: auto;
      border: 1px solid var(--wa-color-neutral-border-quiet);
      border-radius: var(--wa-border-radius-medium, 0.25rem);
    }
    .result-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
      color: var(--wa-color-text-normal);
    }
    .result-table th,
    .result-table td {
      padding: 0.5rem 0.75rem;
      text-align: left;
      border-bottom: 1px solid var(--wa-color-neutral-border-quiet);
    }
    .result-table th {
      position: sticky;
      top: 0;
      z-index: 1;
      background: var(--wa-color-surface-lowered);
      font-weight: 600;
      white-space: nowrap;
      color: var(--wa-color-text-normal);
      box-shadow: 0 1px 0 0 var(--wa-color-neutral-border-quiet);
    }
    .result-table tbody tr:nth-child(even) td {
      background: var(--wa-color-surface-default);
    }
    .result-table tbody tr:nth-child(odd) td {
      background: var(--wa-color-surface-lowered);
    }
    .result-table tbody tr:hover td {
      background: var(--wa-color-neutral-fill-normal);
    }
    .th-sort {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      width: 100%;
      padding: 0;
      border: none;
      background: none;
      font: inherit;
      cursor: pointer;
      color: inherit;
      text-align: left;
    }
    .th-sort:hover {
      opacity: 0.85;
    }
    .th-label {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .th-sort wa-icon {
      flex-shrink: 0;
      opacity: 0.7;
      font-size: 0.75em;
    }
    .table-empty-cell {
      color: var(--wa-color-text-quiet);
      font-style: italic;
      text-align: center;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'docks-data-table': DocksDataTable;
  }
}
