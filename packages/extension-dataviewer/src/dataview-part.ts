import { customElement, property, state } from 'lit/decorators.js';
import { css, html } from 'lit';
import { LyraPart } from '@eclipse-lyra/core';
import { toastError } from '@eclipse-lyra/core';
import { dataviewerService, type DataviewListEntry } from './dataviewer-service';
import type { DataView } from './api';
import { TOPIC_DATAVIEW_PUBLISH } from './api';

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

  private get displayed(): DataView | null {
    return this.selectedView ?? this.dataview;
  }

  protected async doInitUI() {
    this.subscribe(TOPIC_DATAVIEW_PUBLISH, () => this.refreshPersistedList(true));
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
      return;
    }
    try {
      this.selectedView = await dataviewerService.getView(key);
    } catch (err) {
      toastError(err instanceof Error ? err.message : String(err));
      this.selectedView = null;
    }
    this.requestUpdate();
  }

  private async onHistorySelect(e: CustomEvent<{ item?: { value?: string } }>): Promise<void> {
    const value = e.detail?.item?.value ?? '';
    if (!value || value === '__stats__') {
      // Ignore the stats item and empty
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

  protected renderToolbar() {
    const current = this.selectedView ?? this.dataview;
    const selectedMeta = this.persistedList.find((e) => e.storageKey === this.selectedStorageKey);
    const baseTitle = selectedMeta?.title ?? current?.title ?? (this.persistedList.length > 0 ? 'Latest data view' : 'No data');
    const formattedCreatedAt =
      (selectedMeta?.createdAt ?? (current as any)?.createdAt)
        ? new Date(selectedMeta?.createdAt ?? (current as any)?.createdAt).toLocaleString()
        : null;
    const currentLabel = formattedCreatedAt ? `${baseTitle} (${formattedCreatedAt})` : baseTitle;
    return html`
        <span>${currentLabel}</span>
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
          </wa-dropdown-item>

          ${this.persistedList.map(
            (entry) => html`
              <wa-dropdown-item value=${entry.storageKey}>
                ${entry.title}
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
    `;
  }

  private renderTable(dv: DataView) {
    const { columns, rows } = dv.data;
    if (columns.length === 0 && rows.length === 0) {
      return html`<div class="result-empty">No data.</div>`;
    }
    return html`
      <div class="result-table-wrap">
        <table class="result-table">
          <thead>
            <tr>
              ${columns.map((col) => html`<th>${col}</th>`)}
            </tr>
          </thead>
          <tbody>
            ${rows.map(
              (row) => html`
                <tr>
                  ${row.map((cell) => html`<td>${String(cell ?? '')}</td>`)}
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
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
