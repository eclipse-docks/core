import '@eclipse-docks/core/externals/webawesome';
import {
  DocksPart,
  EditorInput,
  confirmDialog,
  toastError,
  toastInfo,
} from '@eclipse-docks/core';
import { css, customElement, html, property, state } from '@eclipse-docks/core/externals/lit';
import {
  cognitiveRuntime,
  TOPIC,
  defaultProvidersSettings,
  fetchOpenAICompatibleModels,
  parseModelIds,
} from '../runtime';
import type { ProviderConfig, ProvidersSettings, RemoteModelInfo, ToolApprovalMode } from '../runtime';

const APPROVAL_OPTIONS: Array<{ value: ToolApprovalMode; label: string; hint: string }> = [
  {
    value: 'auto_safe',
    label: 'Auto-approve non-critical',
    hint: 'The agent classifies each tool as safe or critical; only critical ones ask for approval',
  },
  { value: 'manual', label: 'Manual', hint: 'Confirm every tool before it runs' },
  { value: 'auto_all', label: 'Approve all', hint: 'Run every tool without asking' },
];

@customElement('docks-cognitive-settings-editor')
export class DocksCognitiveSettingsEditor extends DocksPart {
  @property({ attribute: false }) public input?: EditorInput;

  @state() private settings: ProvidersSettings = defaultProvidersSettings();
  @state() private approvalMode: ToolApprovalMode = 'auto_safe';
  @state() private availableModels: Record<number, RemoteModelInfo[]> = {};
  @state() private loadingModels: Record<number, boolean> = {};
  @state() private modelErrors: Record<number, string> = {};

  private unsubs: Array<() => void> = [];
  private fetchControllers = new Map<number, AbortController>();
  private fetchTimers = new Map<number, ReturnType<typeof setTimeout>>();
  private autoFetchedKeys = new Set<string>();

  protected doInitUI(): void {
    cognitiveRuntime.start();
    this.loadFromRuntime();
    this.unsubs.push(
      cognitiveRuntime.events.subscribe(TOPIC.providersChanged, () => {
        if (!this.isDirty()) this.loadFromRuntime();
      }),
      cognitiveRuntime.events.subscribe(TOPIC.approvalModeChanged, (mode) => {
        this.approvalMode = mode as ToolApprovalMode;
      }),
    );
  }

  disconnectedCallback(): void {
    for (const unsub of this.unsubs) unsub();
    this.unsubs = [];
    for (const timer of this.fetchTimers.values()) clearTimeout(timer);
    this.fetchTimers.clear();
    for (const controller of this.fetchControllers.values()) controller.abort();
    this.fetchControllers.clear();
    super.disconnectedCallback();
  }

  private loadFromRuntime(): void {
    this.settings = cognitiveRuntime.getProvidersSettings();
    this.approvalMode = cognitiveRuntime.getApprovalMode();
    this.availableModels = {};
    this.loadingModels = {};
    this.modelErrors = {};
    this.autoFetchedKeys.clear();
    this.markDirty(false);
    this.settings.providers.forEach((provider, index) => {
      if (provider.apiKey.trim() && provider.baseUrl.trim()) {
        void this.fetchModels(index, { auto: true });
      }
    });
  }

  private setApprovalMode(mode: ToolApprovalMode): void {
    this.approvalMode = mode;
    cognitiveRuntime.setApprovalMode(mode);
  }

  private touch(next: ProvidersSettings): void {
    this.settings = next;
    this.markDirty(true);
  }

  private updateProvider(index: number, patch: Partial<ProviderConfig>): void {
    const prev = this.settings.providers[index];
    const providers = this.settings.providers.map((p, i) => (i === index ? { ...p, ...patch } : p));
    let defaultProviderId = this.settings.defaultProviderId;
    if (patch.id && prev?.id === defaultProviderId) {
      defaultProviderId = patch.id;
    }
    this.touch({ ...this.settings, defaultProviderId, providers });

    if (patch.apiKey !== undefined || patch.baseUrl !== undefined) {
      const next = providers[index];
      if (next?.apiKey.trim() && next.baseUrl.trim()) {
        this.scheduleFetchModels(index);
      } else if (!next?.apiKey.trim()) {
        this.clearModels(index);
      }
    }
  }

  private clearModels(index: number): void {
    this.fetchTimers.get(index) && clearTimeout(this.fetchTimers.get(index)!);
    this.fetchTimers.delete(index);
    this.fetchControllers.get(index)?.abort();
    this.fetchControllers.delete(index);
    const { [index]: _a, ...available } = this.availableModels;
    const { [index]: _b, ...loading } = this.loadingModels;
    const { [index]: _c, ...errors } = this.modelErrors;
    this.availableModels = available;
    this.loadingModels = loading;
    this.modelErrors = errors;
  }

  private scheduleFetchModels(index: number): void {
    const existing = this.fetchTimers.get(index);
    if (existing) clearTimeout(existing);
    this.fetchTimers.set(
      index,
      setTimeout(() => {
        this.fetchTimers.delete(index);
        void this.fetchModels(index, { auto: true });
      }, 400),
    );
  }

  private async fetchModels(index: number, opts: { auto?: boolean } = {}): Promise<void> {
    const provider = this.settings.providers[index];
    if (!provider?.baseUrl.trim()) {
      toastError('Set a base URL before fetching models');
      return;
    }
    if (opts.auto && !provider.apiKey.trim()) return;

    const fingerprint = `${provider.baseUrl}|${provider.apiKey}`;
    if (opts.auto && this.autoFetchedKeys.has(fingerprint) && this.availableModels[index]?.length) {
      return;
    }

    this.fetchControllers.get(index)?.abort();
    const controller = new AbortController();
    this.fetchControllers.set(index, controller);
    this.loadingModels = { ...this.loadingModels, [index]: true };
    this.modelErrors = { ...this.modelErrors, [index]: '' };

    try {
      const models = await fetchOpenAICompatibleModels(
        provider.baseUrl,
        provider.apiKey || undefined,
        controller.signal,
      );
      if (controller.signal.aborted) return;
      this.availableModels = { ...this.availableModels, [index]: models };
      this.autoFetchedKeys.add(fingerprint);
      if (!opts.auto) toastInfo(`Loaded ${models.length} models`);
    } catch (err) {
      if (controller.signal.aborted) return;
      const message = err instanceof Error ? err.message : String(err);
      this.modelErrors = { ...this.modelErrors, [index]: message };
      this.availableModels = { ...this.availableModels, [index]: [] };
      if (!opts.auto) toastError(message);
    } finally {
      if (this.fetchControllers.get(index) === controller) {
        this.fetchControllers.delete(index);
        this.loadingModels = { ...this.loadingModels, [index]: false };
      }
    }
  }

  private onModelsSelect(index: number, e: Event): void {
    const target = e.target as HTMLSelectElement & { value: string | string[] };
    const value = target.value;
    const selected = Array.isArray(value) ? value : value ? [value] : [];
    this.updateProvider(index, { models: selected.join(',') });
  }

  private addProvider(): void {
    const id = uniqueProviderId(this.settings.providers);
    this.touch({
      ...this.settings,
      providers: [
        ...this.settings.providers,
        { id, baseUrl: '', apiKey: '', models: '', enabled: true },
      ],
      defaultProviderId: this.settings.defaultProviderId || id,
    });
  }

  private async deleteProvider(index: number): Promise<void> {
    const provider = this.settings.providers[index];
    if (!provider) return;
    if (!(await confirmDialog(`Delete provider "${provider.id || '(unnamed)'}"?`))) return;
    this.clearModels(index);
    const providers = this.settings.providers.filter((_, i) => i !== index);
    const defaultProviderId =
      this.settings.defaultProviderId === provider.id
        ? (providers.find((p) => p.enabled)?.id ?? '')
        : this.settings.defaultProviderId;
    this.touch({ providers, defaultProviderId });
    this.reindexModelState(index);
  }

  /** Shift per-row model fetch state after a row is removed. */
  private reindexModelState(removed: number): void {
    const remap = <T,>(src: Record<number, T>): Record<number, T> => {
      const next: Record<number, T> = {};
      for (const [key, value] of Object.entries(src)) {
        const i = Number(key);
        if (Number.isNaN(i) || i === removed) continue;
        next[i > removed ? i - 1 : i] = value;
      }
      return next;
    };
    this.availableModels = remap(this.availableModels);
    this.loadingModels = remap(this.loadingModels);
    this.modelErrors = remap(this.modelErrors);
  }

  private setDefault(id: string): void {
    this.touch({ ...this.settings, defaultProviderId: id });
  }

  override async save(): Promise<void> {
    if (!this.isDirty()) return;
    try {
      await cognitiveRuntime.setProvidersSettings(this.settings);
      this.loadFromRuntime();
      toastInfo('AI providers saved');
    } catch (err) {
      toastError(err instanceof Error ? err.message : String(err));
    }
  }

  protected renderContent() {
    const rows = this.settings.providers;
    return html`
      <div class="editor">
        <section class="section">
          <header class="header">
            <div>
              <h2>AI Providers</h2>
              <p class="hint">OpenAI-compatible endpoints. Edit cells in place, then save from the toolbar.</p>
            </div>
            <wa-button size="s" variant="brand" appearance="filled" @click=${() => this.addProvider()}>
              <wa-icon slot="start" name="plus"></wa-icon>
              Add provider
            </wa-button>
          </header>

          ${rows.length === 0
            ? html`<wa-callout variant="neutral" appearance="outlined">No providers configured.</wa-callout>`
            : html`
                <div class="table-wrap">
                  <table class="providers">
                    <thead>
                      <tr>
                        <th class="col-on">On</th>
                        <th class="col-id">ID</th>
                        <th class="col-url">Base URL</th>
                        <th class="col-key">API Key</th>
                        <th class="col-models">Models</th>
                        <th class="col-default">Default</th>
                        <th class="col-actions"></th>
                      </tr>
                    </thead>
                    <tbody>
                      ${rows.map((provider, index) => this.renderRow(provider, index))}
                    </tbody>
                  </table>
                </div>
              `}

          <wa-callout variant="neutral" appearance="plain" size="s">
            <wa-icon slot="icon" name="circle-info"></wa-icon>
            Enter an API key to load available models. Catalog ids become
            <code>providerId/modelId</code> for Auto routing.
          </wa-callout>
        </section>

        <section class="section">
          <header class="header">
            <div>
              <h2>Tool approvals</h2>
              <p class="hint">How the agent handles tool confirmation — same options as GitHub Copilot.</p>
            </div>
          </header>
          <wa-radio-group
            name="approval-mode"
            label="Approval mode"
            orientation="vertical"
            .value=${this.approvalMode}
            @change=${(e: Event) => {
              const value = (e.target as HTMLInputElement).value;
              if (value === 'manual' || value === 'auto_safe' || value === 'auto_all') {
                this.setApprovalMode(value);
              }
            }}
          >
            ${APPROVAL_OPTIONS.map(
              (option) => html`
                <wa-radio value=${option.value}>
                  <span class="approval-option">
                    <span class="approval-label">${option.label}</span>
                    <span class="approval-hint">${option.hint}</span>
                  </span>
                </wa-radio>
              `,
            )}
          </wa-radio-group>
        </section>
      </div>
    `;
  }

  private renderRow(provider: ProviderConfig, index: number) {
    const isDefault = this.settings.defaultProviderId === provider.id;
    return html`
      <tr class=${isDefault ? 'is-default' : ''}>
        <td>
          <wa-checkbox
            ?checked=${provider.enabled}
            @change=${(e: Event) =>
              this.updateProvider(index, { enabled: (e.target as HTMLInputElement).checked })}
          ></wa-checkbox>
        </td>
        <td>
          <wa-input
            size="s"
            .value=${provider.id}
            placeholder="openai"
            @input=${(e: Event) => this.updateProvider(index, { id: (e.target as HTMLInputElement).value })}
          ></wa-input>
        </td>
        <td>
          <wa-input
            size="s"
            .value=${provider.baseUrl}
            placeholder="https://api.openai.com/v1"
            @input=${(e: Event) =>
              this.updateProvider(index, { baseUrl: (e.target as HTMLInputElement).value })}
          ></wa-input>
        </td>
        <td>
          <wa-input
            size="s"
            type="password"
            password-toggle
            .value=${provider.apiKey}
            placeholder="optional"
            @input=${(e: Event) =>
              this.updateProvider(index, { apiKey: (e.target as HTMLInputElement).value })}
          ></wa-input>
        </td>
        <td>${this.renderModelsCell(provider, index)}</td>
        <td class="col-default">
          ${isDefault
            ? html`<wa-tag size="s" variant="brand" pill>Default</wa-tag>`
            : html`
                <wa-button
                  size="s"
                  appearance="plain"
                  ?disabled=${!provider.id}
                  @click=${() => this.setDefault(provider.id)}
                >
                  Set
                </wa-button>
              `}
        </td>
        <td class="col-actions">
          <wa-button
            size="s"
            appearance="plain"
            variant="danger"
            title="Delete"
            @click=${() => void this.deleteProvider(index)}
          >
            <wa-icon name="trash" label="Delete"></wa-icon>
          </wa-button>
        </td>
      </tr>
    `;
  }

  private renderModelsCell(provider: ProviderConfig, index: number) {
    const hasKey = Boolean(provider.apiKey.trim());
    const remote = this.availableModels[index] ?? [];
    const loading = Boolean(this.loadingModels[index]);
    const error = this.modelErrors[index];
    const selected = parseModelIds(provider.models);
    const showPicker = hasKey || remote.length > 0;

    if (!showPicker) {
      return html`
        <div class="models-cell">
          <wa-input
            size="s"
            .value=${provider.models}
            placeholder="gpt-4o-mini,gpt-4o"
            @input=${(e: Event) =>
              this.updateProvider(index, { models: (e.target as HTMLInputElement).value })}
          ></wa-input>
          <wa-button
            size="s"
            appearance="plain"
            title="Fetch models"
            ?disabled=${!provider.baseUrl.trim() || loading}
            ?loading=${loading}
            @click=${() => void this.fetchModels(index)}
          >
            <wa-icon name="arrows-rotate" label="Reload models"></wa-icon>
          </wa-button>
        </div>
      `;
    }

    return html`
      <div class="models-cell">
        <wa-select
          size="s"
          multiple
          with-clear
          placeholder=${loading ? 'Loading models…' : 'Select models'}
          .value=${selected}
          ?disabled=${loading && remote.length === 0}
          @change=${(e: Event) => this.onModelsSelect(index, e)}
        >
          ${remote.map(
            (m) => html`<wa-option value=${m.id}>${m.name === m.id ? m.id : `${m.name} (${m.id})`}</wa-option>`,
          )}
          ${selected
            .filter((id) => !remote.some((m) => m.id === id))
            .map((id) => html`<wa-option value=${id}>${id}</wa-option>`)}
        </wa-select>
        <wa-button
          size="s"
          appearance="plain"
          title="Reload models"
          ?disabled=${!provider.baseUrl.trim() || loading}
          ?loading=${loading}
          @click=${() => void this.fetchModels(index)}
        >
          <wa-icon name="arrows-rotate" label="Reload models"></wa-icon>
        </wa-button>
      </div>
      ${error ? html`<div class="models-error">${error}</div>` : ''}
    `;
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    .editor {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-2xl);
      padding: var(--wa-space-l);
      min-width: 0;
    }

    .section {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-l);
      min-width: 0;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: var(--wa-space-m);
      flex-wrap: wrap;
    }

    .header h2 {
      margin: 0;
      font-size: var(--wa-font-size-l);
    }

    wa-radio-group {
      max-width: 36rem;
    }

    .approval-option {
      display: flex;
      flex-direction: column;
      gap: var(--wa-space-3xs);
      padding-block: var(--wa-space-3xs);
    }

    .approval-label {
      font-weight: 500;
    }

    .approval-hint {
      color: var(--wa-color-text-quiet);
      font-size: var(--wa-font-size-s);
    }

    .hint {
      margin: var(--wa-space-2xs) 0 0;
      color: var(--wa-color-text-quiet);
      font-size: var(--wa-font-size-s);
    }

    .table-wrap {
      overflow: auto;
      border: var(--wa-border-width-s) solid var(--wa-color-border-normal);
      border-radius: var(--wa-border-radius-m);
    }

    table.providers {
      width: 100%;
      border-collapse: collapse;
      min-width: 56rem;
    }

    th,
    td {
      padding: var(--wa-space-2xs) var(--wa-space-s);
      border-bottom: var(--wa-border-width-s) solid var(--wa-color-border-normal);
      text-align: left;
      vertical-align: middle;
    }

    th {
      font-size: var(--wa-font-size-xs);
      font-weight: 600;
      color: var(--wa-color-text-quiet);
      background: var(--wa-color-surface-lowered);
      white-space: nowrap;
    }

    tr.is-default td {
      background: color-mix(in srgb, var(--wa-color-brand-fill-normal) 8%, transparent);
    }

    tbody tr:last-child td {
      border-bottom: none;
    }

    .col-on {
      width: 2.5rem;
    }

    .col-id {
      width: 8rem;
    }

    .col-key {
      width: 11rem;
    }

    .col-models {
      min-width: 16rem;
    }

    .col-default {
      width: 5.5rem;
      white-space: nowrap;
    }

    .col-actions {
      width: 2.75rem;
      text-align: end;
    }

    td wa-input {
      width: 100%;
    }

    .models-cell {
      display: flex;
      gap: var(--wa-space-2xs);
      align-items: flex-start;
      min-width: 14rem;
    }

    .models-cell wa-input,
    .models-cell wa-select {
      flex: 1;
      min-width: 0;
    }

    .models-error {
      margin-top: var(--wa-space-3xs);
      color: var(--wa-color-danger-on-quiet);
      font-size: var(--wa-font-size-xs);
    }

    code {
      font-family: var(--wa-font-family-code, var(--wa-font-mono));
      font-size: 0.9em;
    }
  `;
}

function uniqueProviderId(existing: ProviderConfig[]): string {
  const used = new Set(existing.map((p) => p.id));
  if (!used.has('provider')) return 'provider';
  let n = 2;
  while (used.has(`provider-${n}`)) n += 1;
  return `provider-${n}`;
}

declare global {
  interface HTMLElementTagNameMap {
    'docks-cognitive-settings-editor': DocksCognitiveSettingsEditor;
  }
}
