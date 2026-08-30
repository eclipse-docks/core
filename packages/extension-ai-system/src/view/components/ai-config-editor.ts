import { css, customElement, html, property, repeat, state, when } from '@eclipse-docks/core/externals/lit';
import { DocksPart } from '@eclipse-docks/core';
import { EditorInput } from '@eclipse-docks/core';
import { appSettings, TOPIC_SETTINGS_CHANGED } from '@eclipse-docks/core';
import { KEY_AI_CONFIG, TOPIC_AICONFIG_CHANGED, CID_CHAT_PROVIDERS } from '../../core/constants';
import { subscribe } from '@eclipse-docks/core';
import { confirmDialog } from '@eclipse-docks/core';
import { contributionRegistry } from '@eclipse-docks/core';
import { ProviderFactory } from '../../providers/provider-factory';
import type { AIConfig, ChatProvider } from '../../core/types';
import type { ChatProviderContribution } from '../../core/interfaces';

@customElement('docks-ai-config-editor')
export class DocksAIConfigEditor extends DocksPart {
    @property({ attribute: false }) public input?: EditorInput;

    @state() private providers: ChatProvider[] = [];
    @state() private defaultProvider = '';
    @state() private hasChanges = false;
    @state() private availableModels: Array<{ id: string; name?: string }> = [];
    @state() private loadingModels = false;
    @state() private requireToolApproval = true;
    @state() private smartToolDetection = false;

    // Editing state for each provider field
    @state() private editingState: Record<number, Partial<ChatProvider>> = {};

    private aiConfig?: AIConfig;
    private providerFactory = new ProviderFactory();

    protected async doInitUI() {
        await this.loadConfig();
        subscribe(TOPIC_AICONFIG_CHANGED, () => this.loadConfig());
        subscribe(TOPIC_SETTINGS_CHANGED, () => this.loadConfig());
    }

    private async loadConfig() {
        const config = await appSettings.get(KEY_AI_CONFIG) as AIConfig | undefined;
        this.aiConfig = config;

        const contributed = (contributionRegistry.getContributions(CID_CHAT_PROVIDERS) as ChatProviderContribution[]).map(c => c.provider);
        const configProviders = config?.providers || [];
        const existingNames = new Set(configProviders.map(p => p.name));
        this.providers = [...configProviders, ...contributed.filter(p => !existingNames.has(p.name))];

        this.defaultProvider = config?.defaultProvider || '';
        this.requireToolApproval = config?.requireToolApproval !== false;
        this.smartToolDetection = config?.smartToolDetection !== undefined ? config.smartToolDetection : false;
        this.editingState = {};
        this.hasChanges = false;
        this.markDirty(false);
    }

    private getEditValue(index: number, field: keyof ChatProvider): string {
        const editing = this.editingState[index];
        if (editing && field in editing) return (editing as any)[field] ?? '';
        const provider = this.providers[index];
        return provider ? ((provider as any)[field] ?? '') : '';
    }

    private setEditValue(index: number, field: keyof ChatProvider, value: string) {
        this.editingState = {
            ...this.editingState,
            [index]: { ...(this.editingState[index] || {}), [field]: value }
        };
        this.providers = this.providers.map((p, i) =>
            i === index ? { ...p, [field]: value } : p
        );
        this.markDirtyAndUpdate();
    }

    private markDirtyAndUpdate() {
        this.hasChanges = true;
        this.markDirty(true);
    }

    private async fetchModels(index: number): Promise<void> {
        const provider = this.providers[index];
        if (!provider) return;
        this.loadingModels = true;
        this.availableModels = [];
        try {
            const instance = this.providerFactory.getProvider(provider);
            if (instance.getAvailableModels) {
                const models = await instance.getAvailableModels(provider);
                this.availableModels = Array.isArray(models) ? models : [];
            }
        } finally {
            this.loadingModels = false;
        }
    }

    private async saveConfig() {
        const updatedConfig: AIConfig = {
            ...(this.aiConfig ?? {}),
            defaultProvider: this.defaultProvider,
            providers: this.providers,
            requireToolApproval: this.requireToolApproval,
            smartToolDetection: this.smartToolDetection
        };
        await appSettings.set(KEY_AI_CONFIG, updatedConfig);
        this.aiConfig = updatedConfig;
        this.hasChanges = false;
        this.markDirty(false);
    }

    async save() {
        if (!this.hasChanges) return;
        await this.saveConfig();
    }

    private addProvider() {
        this.providers = [...this.providers, { name: 'new-provider', model: '', apiKey: '', chatApiEndpoint: '' }];
        this.markDirtyAndUpdate();
    }

    private async deleteProvider(index: number) {
        const provider = this.providers[index];
        if (!await confirmDialog(`Delete provider "${provider.name}"?`)) return;
        if (this.defaultProvider === provider.name) this.defaultProvider = '';
        this.providers = this.providers.filter((_, i) => i !== index);
        this.markDirtyAndUpdate();
    }

    private renderProviderField(index: number, field: keyof ChatProvider, type: 'text' | 'password' = 'text') {
        const value = this.getEditValue(index, field);
        return html`
            <wa-input
                type="${type}"
                ?password-toggle="${type === 'password'}"
                .value="${value}"
                @input="${(e: Event) => this.setEditValue(index, field, (e.target as any).value)}">
            </wa-input>
        `;
    }

    protected renderContent() {
        return html`
            <div class="editor">
                <div class="editor-header">
                    <h2>AI Providers</h2>
                    <wa-button variant="brand" appearance="filled" @click="${this.addProvider}">
                        Add Provider
                    </wa-button>
                </div>

                ${when(this.providers.length === 0, () => html`
                    <div class="empty-state"><p>No providers configured.</p></div>
                `, () => html`
                    <div class="providers-list">
                        ${repeat(this.providers, (_, i) => i, (provider, index) => html`
                            <div class="provider-card">
                                <div class="provider-card-header ${this.defaultProvider === provider.name ? 'is-default' : ''}">
                                    <span class="provider-name">${provider.name}</span>
                                    ${this.defaultProvider === provider.name
                                        ? html`<span class="default-badge">Default</span>`
                                        : html`<wa-button appearance="plain" size="s" title="Set as default"
                                                @click="${() => { this.defaultProvider = provider.name; this.markDirtyAndUpdate(); }}">
                                                Set default
                                            </wa-button>`
                                    }
                                    <wa-button variant="danger" appearance="plain" size="s"
                                        @click="${() => this.deleteProvider(index)}">
                                        Delete
                                    </wa-button>
                                </div>
                                <div class="provider-fields">
                                    <div class="field-row">
                                        <label>Name</label>
                                        ${this.renderProviderField(index, 'name')}
                                    </div>
                                    <div class="field-row">
                                        <label>Model</label>
                                        <div class="model-row">
                                            ${this.renderProviderField(index, 'model')}
                                            <wa-button appearance="plain" size="s"
                                                @click="${async () => { await this.fetchModels(index); }}"
                                                title="Fetch available models">
                                                <wa-icon name="refresh" label="Refresh"></wa-icon>
                                            </wa-button>
                                        </div>
                                        ${when(this.loadingModels, () => html`
                                            <wa-progress-ring indeterminate size="s"></wa-progress-ring>
                                        `)}
                                        ${when(this.availableModels.length > 0, () => html`
                                            <wa-dropdown
                                                @wa-select="${(e: CustomEvent) => {
                                                    if (e.detail.item?.value) this.setEditValue(index, 'model', e.detail.item.value);
                                                }}">
                                                <wa-button slot="trigger" size="s" appearance="plain" with-caret>
                                                    Select model
                                                </wa-button>
                                                ${this.availableModels.map(m => html`
                                                    <wa-dropdown-item value="${m.id}">${m.name || m.id}</wa-dropdown-item>
                                                `)}
                                            </wa-dropdown>
                                        `)}
                                    </div>
                                    <div class="field-row">
                                        <label>API Endpoint</label>
                                        ${this.renderProviderField(index, 'chatApiEndpoint')}
                                    </div>
                                    <div class="field-row">
                                        <label>API Key</label>
                                        ${this.renderProviderField(index, 'apiKey', 'password')}
                                    </div>
                                </div>
                            </div>
                        `)}
                    </div>
                `)}

                <div class="settings-section">
                    <h3>Tool Settings</h3>
                    <wa-checkbox
                        ?checked="${this.requireToolApproval}"
                        @change="${(e: Event) => { this.requireToolApproval = (e.target as any).checked; this.markDirtyAndUpdate(); }}">
                        Require approval before executing tools
                    </wa-checkbox>
                    <wa-checkbox
                        ?checked="${this.smartToolDetection}"
                        @change="${(e: Event) => { this.smartToolDetection = (e.target as any).checked; this.markDirtyAndUpdate(); }}">
                        Smart tool detection (use ML to detect when tools are needed)
                    </wa-checkbox>
                </div>
            </div>
        `;
    }

    static styles = css`
        :host { display: block; height: 100%; overflow: auto; }

        .editor {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            padding: 1rem;
        }

        .editor-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .editor-header h2 { margin: 0; font-size: 1.25rem; }

        .providers-list { display: flex; flex-direction: column; gap: 1rem; }

        .provider-card {
            border: solid var(--wa-border-width-s) var(--wa-color-neutral-border-loud);
            border-radius: var(--wa-border-radius-m);
            overflow: hidden;
        }

        .provider-card-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.5rem 0.75rem;
            background: var(--wa-color-surface-lowered);
            border-bottom: solid var(--wa-border-width-s) var(--wa-color-neutral-border-subtle);
        }

        .provider-card-header.is-default {
            background: var(--wa-color-brand-fill-quiet);
            border-bottom-color: var(--wa-color-brand-border-quiet);
        }

        .default-badge {
            font-size: 0.75rem;
            font-weight: 600;
            padding: 0.1rem 0.4rem;
            background: var(--wa-color-brand-fill-loud);
            color: var(--wa-color-brand-on-loud);
            border-radius: var(--wa-border-radius-s);
            text-transform: uppercase;
            letter-spacing: 0.04em;
        }

        .provider-name {
            font-weight: 500;
            flex: 1;
        }

        .provider-fields {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            padding: 0.75rem;
        }

        .field-row {
            display: grid;
            grid-template-columns: 120px 1fr;
            align-items: start;
            gap: 0.5rem;
        }

        .field-row label {
            font-size: 0.875rem;
            color: var(--wa-color-text-quiet);
            padding-top: 0.4rem;
        }

        .model-row { display: flex; gap: 0.25rem; align-items: center; }
        .model-row wa-input { flex: 1; }

        .settings-section {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            padding-top: 1rem;
            border-top: solid var(--wa-border-width-s) var(--wa-color-neutral-border-subtle);
        }

        .settings-section h3 { margin: 0 0 0.5rem 0; font-size: 1rem; }

        .empty-state {
            display: flex;
            justify-content: center;
            padding: 3rem;
            color: var(--wa-color-text-subtle);
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'docks-ai-config-editor': DocksAIConfigEditor;
    }
}
