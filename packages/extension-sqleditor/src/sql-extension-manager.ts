import { rootContext, taskService, toastError } from '@eclipse-docks/core';
import {
  css,
  customElement,
  html,
  LitElement,
  property,
  repeat,
  state,
} from '@eclipse-docks/core/externals/lit';
import type { SqlDatabase, SqlDatabaseExtensionInfo } from './sql-api';

export interface SqlExtensionManagerOptions {
  db: SqlDatabase | null;
  databaseLabel: string;
}

@customElement('docks-sql-extension-manager')
export class DocksSqlExtensionManager extends LitElement {
  @property({ type: Boolean })
  open = false;

  @property({ attribute: false })
  db: SqlDatabase | null = null;

  @property()
  databaseLabel = '';

  @state()
  private extensions: SqlDatabaseExtensionInfo[] = [];

  @state()
  private loading = false;

  @state()
  private updatingId: string | null = null;

  @state()
  private error: string | null = null;

  @state()
  private filterText = '';

  public configure(options: SqlExtensionManagerOptions): void {
    this.db = options.db;
    this.databaseLabel = options.databaseLabel;
    this.extensions = [];
    this.error = null;
    void this.refreshExtensions();
  }

  public show(): void {
    if (!this.db || !this.db.listDbExtensions) return;
    this.open = true;
  }

  public hide(): void {
    this.open = false;
  }

  private async refreshExtensions(): Promise<void> {
    if (!this.db || !this.db.listDbExtensions) {
      this.extensions = [];
      return;
    }
    this.loading = true;
    this.error = null;
    try {
      const result = await taskService.runAsync(
        'Loading database extensions',
        async () => this.db!.listDbExtensions!(),
      );
      this.extensions = Array.isArray(result) ? result : [];
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.error = msg;
      toastError(msg);
    } finally {
      this.loading = false;
    }
  }

  private async enableExtension(ext: SqlDatabaseExtensionInfo): Promise<void> {
    if (!this.db || !this.db.enableDbExtension) return;
    this.updatingId = ext.id;
    this.error = null;
    try {
      await taskService.runAsync(
        `Enabling extension ${ext.label || ext.id}`,
        async () => this.db!.enableDbExtension!(ext.id),
      );
      await this.refreshExtensions();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.error = msg;
      toastError(msg);
    } finally {
      this.updatingId = null;
    }
  }

  private async disableExtension(ext: SqlDatabaseExtensionInfo): Promise<void> {
    if (!this.db || !this.db.disableDbExtension) return;
    this.updatingId = ext.id;
    this.error = null;
    try {
      await taskService.runAsync(
        `Disabling extension ${ext.label || ext.id}`,
        async () => this.db!.disableDbExtension!(ext.id),
      );
      await this.refreshExtensions();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.error = msg;
      toastError(msg);
    } finally {
      this.updatingId = null;
    }
  }

  private renderExtensionRow(ext: SqlDatabaseExtensionInfo) {
    const installed = Boolean(ext.installed);
    const canDisable = installed && !!this.db?.disableDbExtension;
    const isUpdating = this.updatingId === ext.id;

    return html`
      <div class="extension-item">
        <div class="extension-main">
          <div class="extension-name">${ext.label || ext.id}</div>
          ${ext.description
            ? html`<div class="extension-desc">${ext.description}</div>`
            : null}
        </div>
        <div class="extension-meta">
          <span
            class=${installed ? 'badge badge-installed' : 'badge badge-available'}
          >
            ${installed ? 'Installed' : 'Available'}
          </span>
          <div class="extension-actions">
            ${installed
              ? html`
                  <wa-button
                    size="s"
                    appearance="plain"
                    ?disabled=${!canDisable || isUpdating}
                    @click=${() => void this.disableExtension(ext)}
                  >
                    <wa-icon
                      name="circle-minus"
                      label="Disable"
                    ></wa-icon>
                  </wa-button>
                `
              : html`
                  <wa-button
                    size="s"
                    appearance="plain"
                    ?disabled=${isUpdating}
                    @click=${() => void this.enableExtension(ext)}
                  >
                    <wa-icon
                      name="plug-circle-plus"
                      label="Enable"
                    ></wa-icon>
                  </wa-button>
                `}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const hasDb = Boolean(this.db && this.db.listDbExtensions);
    const filter = this.filterText.trim().toLowerCase();
    const filteredExtensions = !filter
      ? this.extensions
      : this.extensions.filter((ext) => {
          const text = `${ext.label ?? ''} ${ext.id} ${
            ext.description ?? ''
          }`.toLowerCase();
          return text.includes(filter);
        });
    const hasItems = filteredExtensions.length > 0;

    return html`
      <wa-dialog
        label="Database extensions"
        ?open=${this.open}
        @wa-after-hide=${() => {
          this.open = false;
          this.dispatchEvent(
            new CustomEvent('hide', { bubbles: true, composed: true }),
          );
        }}
      >
        <div class="extension-manager">
          <p class="extension-manager-description">
            Database:
            <strong>${this.databaseLabel || 'Current connection'}</strong>
          </p>

          ${!hasDb
            ? html`
                <wa-alert variant="warning" open>
                  <wa-icon slot="icon" name="triangle-exclamation"></wa-icon>
                  The current SQL engine does not expose any extension information.
                </wa-alert>
              `
            : null}

          ${this.error
            ? html`
                <wa-alert
                  variant="danger"
                  open
                  closable
                  @wa-after-hide=${() => {
                    this.error = null;
                  }}
                >
                  <wa-icon slot="icon" name="circle-exclamation"></wa-icon>
                  ${this.error}
                </wa-alert>
              `
            : null}

          <wa-input
              size="s"
              placeholder="Filter extensions…"
              .value=${this.filterText}
              @input=${(event: Event) => {
                const target = event.target as HTMLInputElement | null;
                this.filterText = target?.value ?? '';
              }}
              @wa-clear=${() => {
                this.filterText = '';
              }}
              with-clear
            >
              <wa-icon slot="prefix" name="magnifying-glass"></wa-icon>
            </wa-input>

          <div class="extension-list">
            ${this.loading
              ? html`<div class="extension-list-empty">Loading extensions…</div>`
              : !hasItems
                  ? html`
                      <div class="extension-list-empty">
                        No extensions available for this connection.
                      </div>
                    `
                  : repeat(
                      filteredExtensions,
                      (ext) => ext.id,
                      (ext) => this.renderExtensionRow(ext),
                    )}
          </div>
        </div>
        <div slot="footer" class="extension-manager-footer">
          <wa-button variant="default" @click=${() => this.hide()}>
            Close
          </wa-button>
        </div>
      </wa-dialog>
    `;
  }

  static styles = css`
    :host {
      display: contents;
    }

    .extension-manager {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      height: 420px;
      box-sizing: border-box;
    }

    .extension-toolbar {
      display: flex;
      justify-content: flex-end;
    }

    .extension-manager-description {
      margin: 0;
      font-size: 0.95rem;
      opacity: 0.9;
    }

    .extension-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      flex: 1;
      min-height: 0;
      max-height: 100%;
      overflow-y: auto;
    }

    .extension-list-empty {
      font-size: 0.9rem;
      opacity: 0.8;
      padding: 0.5rem 0;
    }

    .extension-item {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 0.75rem;
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--wa-color-neutral-200, #e5e7eb);
    }

    .extension-main {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
      min-width: 0;
    }

    .extension-name {
      font-weight: 500;
      font-size: 0.95rem;
    }

    .extension-desc {
      font-size: 0.85rem;
      opacity: 0.8;
    }

    .extension-meta {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.35rem;
    }

    .extension-actions {
      display: flex;
      gap: 0.25rem;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      padding: 0.15rem 0.4rem;
      border-radius: 999px;
      font-size: 0.75rem;
      border: 1px solid var(--wa-color-neutral-200, #e5e7eb);
    }

    .badge-installed {
      background-color: var(--wa-color-success-50, #ecfdf3);
    }

    .badge-available {
      background-color: var(--wa-color-neutral-50, #f9fafb);
    }

    .extension-manager-footer {
      display: flex;
      justify-content: flex-end;
      padding-top: 1rem;
      border-top: 1px solid var(--wa-color-neutral-200, #e5e7eb);
    }
  `;
}

class SqlExtensionManagerService {
  private managerInstance: DocksSqlExtensionManager | null = null;

  public showExtensionManager(
    options: SqlExtensionManagerOptions,
  ): DocksSqlExtensionManager | null {
    if (!options.db || !options.db.listDbExtensions) {
      toastError('The current SQL engine does not support extensions.');
      return null;
    }
    if (!this.managerInstance) {
      this.managerInstance = document.createElement(
        'docks-sql-extension-manager',
      ) as DocksSqlExtensionManager;
      document.body.appendChild(this.managerInstance);
    }
    this.managerInstance.configure(options);
    this.managerInstance.show();
    return this.managerInstance;
  }

  public getManager(): DocksSqlExtensionManager | null {
    return this.managerInstance;
  }
}

export const sqlExtensionManagerService = new SqlExtensionManagerService();
rootContext.put('sqlExtensionManagerService', sqlExtensionManagerService);

declare global {
  interface HTMLElementTagNameMap {
    'docks-sql-extension-manager': DocksSqlExtensionManager;
  }
}

