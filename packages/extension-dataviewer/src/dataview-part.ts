import { customElement, property, state } from 'lit/decorators.js';
import { css, html } from 'lit';
import { LyraPart, toastError, filebrowserDialog } from '@eclipse-lyra/core';
import { dataviewerService, type DataviewListEntry } from './dataviewer-service';
import type { DataView } from './api';
import { TOPIC_DATAVIEW_ADDED } from './api';
import { when } from '@eclipse-lyra/core/externals/lit';
import './lyra-data-table';

@customElement('lyra-dataview')
export class DataViewPart extends LyraPart {
  @property({ attribute: false })
  dataview: DataView | null = null;

  @state()
  private persistedList: DataviewListEntry[] = [];

  @state()
  private selectedStorageKey = '';

  @state()
  private selectedView: DataView | null = null;

  @state()
  private loadingList = true;

  @state()
  private autoActivateTab = true;

  private get displayed(): DataView | null {
    return this.selectedView ?? this.dataview;
  }

  private get hasData(): boolean {
    const dv = this.displayed;
    if (!dv) return false;
    const { columns, rows } = dv.data;
    return Array.isArray(columns) && Array.isArray(rows) && (columns.length > 0 || rows.length > 0);
  }

  private toCsv(dv: DataView): string {
    const { columns, rows } = dv.data;
    const escapeCell = (value: unknown): string => {
      if (value === null || value === undefined) return '';
      const str = String(value);
      if (!/[",\n]/.test(str)) return str;
      return `"${str.replace(/"/g, '""')}"`;
    };
    const header = columns.map(escapeCell).join(',');
    const body = rows.map((row) => row.map(escapeCell).join(',')).join('\n');
    return body ? `${header}\n${body}` : header;
  }

  private async onExportCsv(): Promise<void> {
    const dv = this.displayed;
    if (!dv || !this.hasData) return;
    try {
      const csv = this.toCsv(dv);
      const safeTitle = dv.title?.trim() || 'dataview';
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileName = `${safeTitle.replace(/[^a-zA-Z0-9-_]+/g, '_')}-${timestamp}.csv`;
      const targetDir = await filebrowserDialog('directory');
      if (!targetDir) return;
      this.executeCommand('touch', {
        path: `${targetDir}/${fileName}`,
        contents: csv,
      });
    } catch (err) {
      toastError(err instanceof Error ? err.message : String(err));
    }
  }

  protected async doInitUI() {
    const persisted = await this.getDialogSetting();
    if (persisted && typeof persisted.autoActivateTab === 'boolean') this.autoActivateTab = persisted.autoActivateTab;
    this.subscribe(TOPIC_DATAVIEW_ADDED, async () => {
      await this.refreshPersistedList(true);
      if (this.autoActivateTab) this.activateContainingTab();
    });
    await this.refreshPersistedList(false);
  }

  private async refreshPersistedList(selectLatest: boolean): Promise<void> {
    this.loadingList = true;
    this.requestUpdate();
    try {
      this.persistedList = await dataviewerService.listViews();
      if (selectLatest && this.persistedList.length > 0) {
        const latest = this.persistedList[this.persistedList.length - 1];
        this.selectedStorageKey = latest.storageKey;
        this.selectedView = await dataviewerService.getView(latest.storageKey);
      } else if (this.selectedStorageKey) {
        this.selectedView = await dataviewerService.getView(this.selectedStorageKey);
      } else {
        this.selectedView = null;
      }
    } catch (e) {
      toastError(e instanceof Error ? e.message : String(e));
      this.persistedList = [];
      this.selectedView = null;
    } finally {
      this.loadingList = false;
      this.requestUpdate();
      this.updateToolbar();
    }
  }

  private async selectStorageKey(key: string): Promise<void> {
    this.selectedStorageKey = key;
    if (!key) {
      this.selectedView = null;
      this.requestUpdate();
      this.updateToolbar();
      return;
    }
    try {
      this.selectedView = await dataviewerService.getView(key);
    } catch (err) {
      toastError(err instanceof Error ? err.message : String(err));
      this.selectedView = null;
    }
    this.requestUpdate();
    this.updateToolbar();
  }

  private async onAutoActivateChange(e: Event): Promise<void> {
    const checked = (e.target as HTMLInputElement).checked;
    this.autoActivateTab = checked;
    const current = (await this.getDialogSetting()) ?? {};
    await this.setDialogSetting({ ...current, autoActivateTab: checked });
    this.updateToolbar();
  }

  private async onHistorySelect(e: CustomEvent<{ item?: { value?: string } }>): Promise<void> {
    const value = e.detail?.item?.value ?? '';
    if (!value || value === '__stats__') {
      return;
    }
    await this.selectStorageKey(value);
  }

  private async onDeleteView(e: Event, storageKey: string): Promise<void> {
    e.stopPropagation();
    e.preventDefault();
    try {
      await dataviewerService.deleteView(storageKey);
      const deletedWasSelected = this.selectedStorageKey === storageKey;
      if (deletedWasSelected) {
        this.selectedStorageKey = '';
        this.selectedView = null;
      }
      await this.refreshPersistedList(true);
    } catch (err) {
      toastError(err instanceof Error ? err.message : String(err));
    }
  }

  private async onClearHistory(): Promise<void> {
    try {
      await dataviewerService.clearAllViews();
      this.selectedStorageKey = '';
      this.selectedView = null;
      await this.refreshPersistedList(false);
    } catch (err) {
      toastError(err instanceof Error ? err.message : String(err));
    }
  }

  protected renderToolbar() {
    const current = this.selectedView ?? this.dataview;
    const selectedMeta = this.persistedList.find((e) => e.storageKey === this.selectedStorageKey);
    const baseTitle = selectedMeta?.title ?? current?.title ?? (this.persistedList.length > 0 ? 'Latest data view' : 'No data');
    const formattedCreatedAt =
      (selectedMeta?.createdAt ?? (current as any)?.createdAt)
        ? new Date(selectedMeta?.createdAt ?? (current as any)?.createdAt).toLocaleString()
        : null;
    const engineLabel = current?.source ?? null;
    const titleWithEngine = engineLabel ? `${baseTitle} · ${engineLabel}` : baseTitle;
    const currentLabel = formattedCreatedAt ? `${titleWithEngine} (${formattedCreatedAt})` : titleWithEngine;
    return html`
        <wa-dropdown
          placement="bottom-start"
          distance="4"
          size="small"
          hoist
          @wa-select=${(e: CustomEvent) => this.onHistorySelect(e as any)}
        >
          <wa-button
            slot="trigger"
            appearance="plain"
            size="small"
            with-caret
            title="Data view history"
          >
            <wa-icon name="clock-rotate-left" label="History"></wa-icon>
          </wa-button>

          <wa-dropdown-item value="__stats__" disabled>
            ${this.persistedList.length} data view${this.persistedList.length === 1 ? '' : 's'}
            ${this.persistedList.length > 0
              ? html`
                  <wa-button
                    slot="details"
                    appearance="plain"
                    size="small"
                    title="Clear history"
                    @click=${() => this.onClearHistory()}
                  >
                    <wa-icon name="trash" label="Clear history"></wa-icon>
                  </wa-button>
                `
              : null}
          </wa-dropdown-item>

          ${this.persistedList.map(
            (entry) => html`
              <wa-dropdown-item value=${entry.storageKey}>
                ${entry.source ? `${entry.title} · ${entry.source}` : entry.title}
                ${entry.createdAt
                  ? html`<span style="opacity: 0.7; margin-left: 0.5rem; font-size: 0.75em;">
                      (${new Date(entry.createdAt).toLocaleString()})
                    </span>`
                  : null}
                <wa-button
                  slot="details"
                  appearance="plain"
                  size="small"
                  title="Delete data view"
                  @click=${(e: Event) => this.onDeleteView(e, entry.storageKey)}
                >
                  <wa-icon name="trash" label="Delete"></wa-icon>
                </wa-button>
              </wa-dropdown-item>
            `
          )}

        </wa-dropdown>

        <wa-divider orientation="vertical"></wa-divider>

        <wa-button
          size="small"
          appearance="plain"
          title="Export current data view to CSV"
          ?disabled=${!this.hasData}
          @click=${() => this.onExportCsv()}
        >
          <wa-icon name="file-csv" label="Export CSV"></wa-icon>
        </wa-button>

        <wa-switch
          ?checked=${this.autoActivateTab}
          size="small"
          title="Switch to this tab when new results arrive"
          @change=${(e: Event) => this.onAutoActivateChange(e)}
          style="margin-top: 0.5rem;"
        >
          Auto-show
        </wa-switch>

        ${when(current, () => html`<wa-divider orientation="vertical"></wa-divider><span>${currentLabel}</span>`)}
    `;
  }

  private renderTable(dv: DataView) {
    if (!this.hasData) {
      return html`<div class="result-empty">No data.</div>`;
    }
    return html`<lyra-data-table .data=${dv.data}></lyra-data-table>`;
  }

  render() {
    const dv = this.displayed;
    if (dv != null) return this.renderTable(dv);
    return html`<div class="result-empty">No data.</div>`;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .result-empty {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }
  `;

}

declare global {
  interface HTMLElementTagNameMap {
    'lyra-dataview': DataViewPart;
  }
}
