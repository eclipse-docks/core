import { DocksPart, type EditorInput, type EditorContentProvider, toastError, toastInfo, confirmDialog, publish, contributionRegistry, subscribe, unsubscribe, TOPIC_CONTRIBUTEIONS_CHANGED, taskService } from '@eclipse-docks/core';
import {
  createRef,
  css,
  customElement,
  html,
  property,
  ref,
  state,
  styleMap,
} from '@eclipse-docks/core/externals/lit';
import type { SqlAdapterContribution, SqlConnectionInfo, SqlDatabase } from './sql-api';
import { sqlExtensionManagerService } from './sql-extension-manager';
import { DocksMonacoWidget } from '@eclipse-docks/extension-monaco-editor/widget';

const MAX_TAB_LABEL = 28;

function truncateLabel(sql: string): string {
  const oneLine = sql.replace(/\s+/g, ' ').trim();
  if (oneLine.length <= MAX_TAB_LABEL) return oneLine;
  return `${oneLine.slice(0, MAX_TAB_LABEL)}…`;
}

@customElement('docks-sql-editor')
export class DocksSqlEditor extends DocksPart implements EditorContentProvider {
  @property({ attribute: false })
  public input?: EditorInput;

  @property({ type: Boolean })
  public readOnly = false;

  @state()
  private initialContent: string | undefined = undefined;

  @state()
  private initialUri: string | undefined = undefined;

  @state()
  private running = false;

  @state()
  private availableAdapters: SqlAdapterContribution[] = [];

  @state()
  private selectedEngineId: string | null = null;

  @state()
  private availableConnections: SqlConnectionInfo[] = [];

  /** `undefined` = user has not chosen a connection yet (placeholder). */
  @state()
  private selectedConnectionId: string | null | undefined = undefined;

  @state()
  private sqlEngineLoading = false;

  @state()
  private dbVersion: string | undefined = undefined;

  @state()
  private sqlVersionLoading = false;

  private widgetRef = createRef<DocksMonacoWidget>();
  private databases = new Map<string, SqlDatabase>();
  private unsubscribeContributionsToken?: string;

  protected async doInitUI() {
    const file = this.input!.data;
    const textContents = await file.getContents();
    this.initialContent =
      typeof textContents === 'string'
        ? textContents
        : textContents == null
          ? ''
          : String(textContents);
    this.initialUri = file.getWorkspacePath();
    this.unsubscribeContributionsToken = subscribe(TOPIC_CONTRIBUTEIONS_CHANGED, (event: { target?: string } | undefined) => {
      if (event?.target === 'system.sqladapters') {
        void this.refreshAdapters();
      }
    });

    await this.updateComplete;
    void this.refreshAdapters().catch((err) => {
      toastError(err instanceof Error ? err.message : String(err));
    });
  }

  private async refreshAdapters(): Promise<void> {
    const contributions = contributionRegistry.getContributions<SqlAdapterContribution>('system.sqladapters');
    this.availableAdapters = contributions;
    if (!contributions.length) {
      this.selectedEngineId = null;
      this.availableConnections = [];
      this.selectedConnectionId = undefined;
      this.dbVersion = undefined;
      this.sqlVersionLoading = false;
      await this.updateComplete;
      return;
    }
    if (!this.selectedEngineId) {
      const duckdbAdapter = contributions.find((c) => c.id === 'duckdb');
      this.selectedEngineId = (duckdbAdapter ?? contributions[0]).id;
    }
    this.requestUpdate();
    await this.refreshConnections();
    await this.updateComplete;
  }

  private async getOrLoadDatabase(engineId: string): Promise<SqlDatabase | null> {
    const cached = this.databases.get(engineId);
    if (cached) return cached;
    const adapter = this.availableAdapters.find((c) => c.id === engineId);
    if (!adapter) return null;
    try {
      const label = adapter.label || adapter.id;
      const database = await taskService.runAsync(`Opening ${label} database`, async (progress) => {
        progress.message = `Connecting to ${label}…`;
        return adapter.loader();
      });
      this.databases.set(engineId, database);
      return database;
    } catch (err) {
      toastError(err instanceof Error ? err.message : String(err));
      return null;
    }
  }

  private async refreshConnections(): Promise<void> {
    const engineId = this.selectedEngineId;
    if (!engineId) {
      this.availableConnections = [];
      this.selectedConnectionId = undefined;
      this.dbVersion = undefined;
      this.sqlEngineLoading = false;
      this.sqlVersionLoading = false;
      await this.updateComplete;
      return;
    }
    this.sqlEngineLoading = true;
    this.dbVersion = undefined;
    this.requestUpdate();
    try {
      const db = await this.getOrLoadDatabase(engineId);
      if (!db) {
        this.availableConnections = [];
        this.selectedConnectionId = undefined;
        return;
      }
      const infos = await db.listConnections();
      this.availableConnections = infos;
      const currentId = db.currentConnectionId;
      if (currentId !== null && currentId !== undefined) {
        this.selectedConnectionId = currentId;
        await this.updateDbVersion();
      } else {
        this.selectedConnectionId = undefined;
      }
    } finally {
      this.sqlEngineLoading = false;
      await this.updateComplete;
      this.requestUpdate();
    }
  }

  private async updateDbVersion(): Promise<void> {
    this.dbVersion = undefined;
    this.sqlVersionLoading = false;
    const engineId = this.selectedEngineId;
    if (!engineId || this.selectedConnectionId === undefined) return;
    const db = this.databases.get(engineId);
    if (!db?.readVersion) return;
    this.sqlVersionLoading = true;
    try {
      this.dbVersion = await db.readVersion();
    } catch {
      this.dbVersion = undefined;
    } finally {
      this.sqlVersionLoading = false;
    }
    this.requestUpdate();
  }

  private async onEngineChange(e: Event): Promise<void> {
    const select = e.target as { value?: string };
    const value = select?.value ?? '';
    if (this.selectedEngineId === value) return;
    this.selectedEngineId = value || null;
    this.selectedConnectionId = undefined;
    this.dbVersion = undefined;
    this.sqlVersionLoading = false;
    await this.refreshConnections();
    this.requestUpdate();
  }

  private async onConnectionChange(e: Event): Promise<void> {
    const select = e.target as { value?: string };
    const value = select?.value ?? '';
    const next = value === '' ? null : value;
    if (this.selectedConnectionId === next) return;
    this.selectedConnectionId = next;
    this.dbVersion = undefined;
    this.sqlVersionLoading = false;
    const engineId = this.selectedEngineId;
    if (!engineId) return;
    const db = await this.getOrLoadDatabase(engineId);
    if (!db) return;
    await db.selectConnection(next);
    await this.updateDbVersion();
    this.requestUpdate();
  }

  private async onEngineDropdownSelect(
    e: CustomEvent<{ item?: { value?: string } }>,
  ): Promise<void> {
    const value = e.detail?.item?.value ?? '';
    if (this.selectedEngineId === value) return;
    this.selectedEngineId = value || null;
    this.selectedConnectionId = undefined;
    this.dbVersion = undefined;
    this.sqlVersionLoading = false;
    await this.refreshConnections();
    this.requestUpdate();
  }

  private async onConnectionDropdownSelect(
    e: CustomEvent<{ item?: { value?: string } }>,
  ): Promise<void> {
    const value = e.detail?.item?.value ?? '';
    const next = value === '' ? null : value;
    if (this.selectedConnectionId === next) return;
    this.selectedConnectionId = next;
    this.dbVersion = undefined;
    this.sqlVersionLoading = false;
    const engineId = this.selectedEngineId;
    if (!engineId) return;
    const db = await this.getOrLoadDatabase(engineId);
    if (!db) return;
    await db.selectConnection(next);
    await this.updateDbVersion();
    this.requestUpdate();
  }

  private async deleteConnectionById(e: Event, id: string | null): Promise<void> {
    e.stopPropagation();
    e.preventDefault();
    const engineId = this.selectedEngineId;
    if (!engineId) return;
    const db = await this.getOrLoadDatabase(engineId);
    if (!db || !db.deleteConnection) return;
    const connectionLabel =
      this.availableConnections.find((info) => info.id === id)?.label ??
      (id === null ? 'In-memory' : id ?? 'Current connection');
    const ok = await confirmDialog(`Delete connection "${connectionLabel}"?`);
    if (!ok) return;
    if (id !== null) {
      await db.deleteConnection(id);
    } else {
      await db.selectConnection(null);
    }
    await this.refreshConnections();
    this.requestUpdate();
  }

  private _onContentChange = () => {
    this.markDirty(true);
  };

  save(): void {
    const value = this.widgetRef.value?.getContent() ?? '';
    this.input?.data.saveContents(value);
    this.markDirty(false);
  }

  protected async doClose() {
    if (this.unsubscribeContributionsToken) {
      unsubscribe(this.unsubscribeContributionsToken);
      this.unsubscribeContributionsToken = undefined;
    }
    this.widgetRef.value?.dispose();
    for (const db of this.databases.values()) {
      await db.close();
    }
    this.databases.clear();
  }

  public getLanguage(): string | null {
    return 'sql';
  }

  public isLanguage(lang: string): boolean {
    return lang.toLowerCase() === 'sql';
  }

  public getContent(): string | null {
    return this.widgetRef.value?.getContent() ?? null;
  }

  public getSelection(): string | null {
    return this.widgetRef.value?.getSelection() ?? null;
  }

  public getSnippet(lines: number = 5): { snippet: string; cursorLine: number } | null {
    return this.widgetRef.value?.getSnippet(lines) ?? null;
  }

  public getFilePath(): string | null {
    return this.input?.data?.getWorkspacePath() ?? null;
  }

  private async runQuery(useSelectionOnly = false): Promise<void> {
    const selection = this.getSelection()?.trim();
    const content = this.getContent()?.trim();
    const sql = useSelectionOnly ? selection : content;
    if (!sql) {
      toastError(useSelectionOnly ? 'No selection to run' : 'No SQL to run');
      return;
    }
    if (this.running) return;

    const engineId = this.selectedEngineId;
    if (!engineId) {
      toastError('No SQL engine available');
      return;
    }

    const db = await this.getOrLoadDatabase(engineId);
    if (!db) {
      toastError('Could not initialize SQL engine');
      return;
    }

    if (this.selectedConnectionId === undefined) {
      toastError('Select a connection');
      return;
    }

    this.running = true;
    const label = truncateLabel(sql);
    this.requestUpdate();

    const timeoutMs = 60_000;
    const timeoutId = window.setTimeout(() => this.clearRunningState(), timeoutMs);

    try {
      const result = await db.runQuery(sql);
      const adapter = this.availableAdapters.find((c) => c.id === engineId);
      publish('dataview/publish', {
        title: label,
        data: { columns: result.columns, rows: result.rows },
        source: adapter?.label ?? engineId,
      });
    } catch (err) {
      toastError(err instanceof Error ? err.message : String(err));
    } finally {
      window.clearTimeout(timeoutId);
      this.running = false;
      this.requestUpdate();
    }
  }

  private clearRunningState(): void {
    if (!this.running) return;
    this.running = false;
    this.requestUpdate();
  }

  private async createConnection(): Promise<void> {
    const engineId = this.selectedEngineId;
    if (!engineId) return;
    const db = await this.getOrLoadDatabase(engineId);
    if (!db || !db.createConnection) return;
    const info = await db.createConnection();
    if (!info) return;
    await this.refreshConnections();
    this.selectedConnectionId = info.id;
    await db.selectConnection(info.id ?? null);
    await this.updateDbVersion();
    toastInfo(`Connection "${info.label}" created`);
    this.requestUpdate();
  }

  private async deleteConnection(): Promise<void> {
    const engineId = this.selectedEngineId;
    if (!engineId) return;
    if (this.selectedConnectionId === undefined) return;
    const db = await this.getOrLoadDatabase(engineId);
    if (!db || !db.deleteConnection) return;
    const id = this.selectedConnectionId;
    const connectionLabel =
      this.availableConnections.find((info) => info.id === id)?.label ??
      (id === null ? 'In-memory' : id ?? 'Current connection');
    const ok = await confirmDialog(`Delete connection "${connectionLabel}"?`);
    if (!ok) return;
    if (id !== null) {
      await db.deleteConnection(id);
    } else {
      await db.selectConnection(null);
    }
    await this.refreshConnections();
    this.requestUpdate();
  }

  private getCurrentConnectionLabel(): string | null {
    const id = this.selectedConnectionId;
    if (id === undefined) return null;
    if (id === null) return 'In-memory';
    const info = this.availableConnections.find((c) => c.id === id);
    return info?.label ?? id;
  }

  private async openExtensionManager(): Promise<void> {
    const engineId = this.selectedEngineId;
    if (!engineId) return;
    if (this.selectedConnectionId === undefined) {
      toastError('Select a connection');
      return;
    }
    const db = await this.getOrLoadDatabase(engineId);
    if (!db || !db.listDbExtensions) {
      toastInfo('Extensions are not available for the selected SQL engine.');
      return;
    }
    const adapter =
      this.availableAdapters.find((c) => c.id === engineId) ?? null;
    const engineLabel = adapter?.label ?? engineId;
    const connectionLabel = this.getCurrentConnectionLabel();
    const databaseLabel = connectionLabel
      ? `${engineLabel} – ${connectionLabel}`
      : engineLabel;
    sqlExtensionManagerService.showExtensionManager({
      db,
      databaseLabel,
    });
  }

  protected renderToolbar() {
    const adapters = this.availableAdapters;
    const hasEngines = adapters.length > 0;
    const hasConnections = this.availableConnections.length > 0;
    const engineId = this.selectedEngineId;
    const dbForEngine = engineId ? this.databases.get(engineId) : null;
    const supportsExtensions = Boolean(dbForEngine?.listDbExtensions);
    const connectionButtonLabel = this.sqlEngineLoading
      ? 'Loading…'
      : this.selectedConnectionId === undefined
        ? 'Select connection'
        : this.selectedConnectionId === null
          ? 'In-memory'
          : this.availableConnections.find(
              (c) => c.id === this.selectedConnectionId,
            )?.label ?? 'Connection';
    const runDisabled =
      this.running ||
      this.sqlEngineLoading ||
      this.sqlVersionLoading ||
      this.selectedConnectionId === undefined;

    const dbSupportsVersion = Boolean(dbForEngine?.readVersion);
    const awaitingVersion =
      this.selectedConnectionId !== undefined &&
      dbSupportsVersion &&
      (this.sqlEngineLoading || this.sqlVersionLoading || !this.dbVersion);
    const isConnecting = this.sqlEngineLoading || awaitingVersion;
    const sqlConnected =
      this.selectedConnectionId !== undefined && !isConnecting;
    const statusTitle = isConnecting
      ? 'Connecting…'
      : sqlConnected
        ? 'SQL engine connected'
        : 'No connection selected';
    const statusIconColor = isConnecting
      ? 'var(--wa-color-warning-500)'
      : sqlConnected
        ? 'var(--wa-color-green-40)'
        : 'var(--wa-color-red-40)';
    const statusText = isConnecting
      ? ''
      : this.dbVersion
        ? this.dbVersion
        : sqlConnected
          ? 'Connected'
          : 'Not connected';

    // Toolbar markup renders under docks-toolbar; host static styles do not apply there.
    const sqlToolbarPartStyle = {
      display: 'flex',
      flex: '1',
      minWidth: '0',
      alignItems: 'center',
      gap: 'var(--wa-space-2xs)',
      flexWrap: 'nowrap',
    } as const;
    const sqlToolbarLeadStyle = {
      display: 'flex',
      flex: '1',
      minWidth: '0',
      flexWrap: 'nowrap',
      alignItems: 'center',
      gap: 'var(--wa-space-2xs)',
      overflowX: 'auto',
    } as const;
    const sqlToolbarStatusStyle = {
      flexShrink: '0',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      minHeight: '1.25rem',
      whiteSpace: 'nowrap',
    } as const;
    const sqlToolbarVersionStyle = {
      fontSize: '0.8rem',
      opacity: '0.85',
      whiteSpace: 'nowrap',
      maxWidth: '14rem',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    } as const;

    return html`
      <div class="sql-toolbar-part" style=${styleMap(sqlToolbarPartStyle)}>
        <div class="sql-toolbar-lead" style=${styleMap(sqlToolbarLeadStyle)}>
      <wa-dropdown
        class="engine-select"
        placement="bottom-start"
        distance="4"
        size="s"
        @wa-select=${(e: CustomEvent) => void this.onEngineDropdownSelect(e)}
      >
        <wa-button
          slot="trigger"
          appearance="plain"
          size="s"
          with-caret
          title="SQL engine"
        >
          ${this.selectedEngineId
            ? adapters.find((a) => a.id === this.selectedEngineId)?.label ??
              this.selectedEngineId
            : 'Select engine'}
        </wa-button>
        ${adapters.map(
          (adapter) => html`
            <wa-dropdown-item
              value=${adapter.id}
              type="checkbox"
              ?checked=${adapter.id === this.selectedEngineId}
            >
              ${adapter.label}
            </wa-dropdown-item>
          `,
        )}
      </wa-dropdown>
      <wa-dropdown
        class="connection-select"
        placement="bottom-start"
        distance="4"
        size="s"
        @wa-select=${(e: CustomEvent) =>
          void this.onConnectionDropdownSelect(e)}
      >
        <wa-button
          slot="trigger"
          appearance="plain"
          size="s"
          with-caret
          title="Connection"
          ?disabled=${!hasEngines || !hasConnections || this.sqlEngineLoading}
        >
          ${connectionButtonLabel}
        </wa-button>
        ${this.availableConnections.map(
          (info) => html`
            <wa-dropdown-item
              value=${info.id ?? ''}
              type="checkbox"
              ?checked=${info.id === this.selectedConnectionId}
            >
              ${info.label}
              <wa-button
                slot="details"
                appearance="plain"
                size="s"
                title=${info.id === null
                  ? 'Reset in-memory connection'
                  : 'Delete connection'}
                @click=${(e: Event) => this.deleteConnectionById(e, info.id)}
              >
                <wa-icon
                  name=${info.id === null ? 'rotate-right' : 'trash'}
                  label=${info.id === null ? 'Reset' : 'Delete'}
                ></wa-icon>
              </wa-button>
            </wa-dropdown-item>
          `,
        )}
      </wa-dropdown>
      <wa-button
        size="s"
        appearance="plain"
        title="New connection"
        ?disabled=${this.sqlEngineLoading}
        @click=${() => void this.createConnection()}
      >
        <wa-icon name="plus" label="New"></wa-icon>
      </wa-button>
      ${supportsExtensions
        ? html`
            <wa-button
              size="s"
              appearance="plain"
              title="Manage extensions"
              ?disabled=${!hasEngines ||
              !hasConnections ||
              this.selectedConnectionId === undefined ||
              this.sqlEngineLoading}
              @click=${() => void this.openExtensionManager()}
            >
              <wa-icon name="puzzle-piece" label="Extensions"></wa-icon>
              Extensions
            </wa-button>
          `
        : null}
      <wa-button
        size="s"
        appearance="plain"
        ?disabled=${runDisabled}
        @click=${() => void this.runQuery(true)}
        title="Run selection only"
      >
        <wa-icon name="i-cursor" label="Run selection"></wa-icon>
        ${this.running ? 'Running…' : 'Run selection'}
      </wa-button>
      <wa-button
        size="s"
        appearance="plain"
        ?disabled=${runDisabled}
        @click=${() => void this.runQuery(false)}
        title="Run all SQL"
      >
        <wa-icon name="play" label="Run"></wa-icon>
        ${this.running ? 'Running…' : 'Run all'}
      </wa-button>
        </div>
      <span
        class="sql-toolbar-status"
        aria-live="polite"
        title=${statusTitle}
        style=${styleMap(sqlToolbarStatusStyle)}
      >
        <wa-icon
          name="circle"
          label="SQL engine status"
          style=${styleMap({ color: statusIconColor })}
        ></wa-icon>
        ${isConnecting
          ? html`<wa-spinner style="font-size: 0.9rem"></wa-spinner>`
          : html`<span
              class="sql-toolbar-version"
              style=${styleMap(sqlToolbarVersionStyle)}
              >${statusText}</span
            >`}
      </span>
      </div>
    `;
  }

  protected renderContent() {
    if (this.initialContent === undefined) {
      return html`<div class="editor-placeholder"></div>`;
    }

    return html`
      <div class="editor-area">
        <docks-monaco-widget
          .value=${this.initialContent}
          .uri=${this.initialUri}
          .language=${'sql'}
          .readOnly=${this.readOnly}
          @content-change=${this._onContentChange}
          ${ref(this.widgetRef)}
        ></docks-monaco-widget>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      position: relative;
      width: 100%;
      height: 100%;
    }
    .engine-select {
      max-width: 10rem;
    }
    .connection-select {
      max-width: 12rem;
    }
    .editor-area {
      flex: 1;
      min-height: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .editor-area docks-monaco-widget,
    .editor-area monaco-widget {
      flex: 1;
      min-height: 0;
    }
    .editor-placeholder {
      flex: 1;
      min-height: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'docks-sql-editor': DocksSqlEditor;
  }
}

