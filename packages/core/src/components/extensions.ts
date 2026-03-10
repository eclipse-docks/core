import {css, html} from 'lit'
import {when} from "lit/directives/when.js";
import {customElement, state} from 'lit/decorators.js'
import { LyraPart } from "../parts/part";
import {Extension, extensionRegistry, TOPIC_EXTENSIONS_CHANGED} from "../core/extensionregistry";
import '../widgets/icon';
import {subscribe} from "../core/events";
import {appLoaderService} from "../core/apploader";
import {i18n} from "../core/i18n";
import {promptDialog} from "../dialogs/prompt-dialog";
import {toastError, toastInfo} from "../core/toast";
import {esmShService, EsmShSource} from "../core/esmsh-service";
import {taskService} from "../core/taskservice";
import {createLogger} from "../core/logger";

const logger = createLogger('LyraExtensions');

const t = await i18n(import.meta.glob('./extensions*.json'));


@customElement('lyra-extensions')
export class LyraExtensions extends LyraPart {
    @state()
    private selectedExtension?: Extension;

    @state()
    private filterText: string = '';

    @state()
    private showRegisterDialog: boolean = false;

    @state()
    private registerExtensionData: Partial<Extension> = {};



    protected doInitUI() {
        subscribe(TOPIC_EXTENSIONS_CHANGED, () => {
            this.requestUpdate()
        })
    }

    onExtensionDblClick() {

    }

    enable(extension: Extension) {
        extensionRegistry.enable(extension.id, true);
        this.requestUpdate()
    }

    disable(extension: Extension) {
        extensionRegistry.disable(extension.id, true);
        this.requestUpdate()
    }


    private isExtensionRequired(extensionId: string): boolean {
        const currentApp = appLoaderService.getCurrentApp();
        if (!currentApp || !currentApp.extensions) {
            return false;
        }
        return currentApp.extensions.includes(extensionId);
    }

    selectionChanged(e: CustomEvent) {
        const selection = e.detail.selection || [];
        if (selection.length > 0 && selection[0].model) {
            // @ts-ignore
            this.selectedExtension = selection[0].model;
        } else {
            this.selectedExtension = undefined;
        }
    }

    private getFilteredExtensions(): Extension[] {
        if (!this.filterText.trim()) {
            return extensionRegistry.getExtensions();
        }
        const filter = this.filterText.toLowerCase();
        return extensionRegistry.getExtensions().filter(ext => {
            return String(ext.name).toLowerCase().includes(filter) ||
                   (ext.description ? String(ext.description).toLowerCase().includes(filter) : false) ||
                   ext.id.toLowerCase().includes(filter);
        });
    }


    private getGroupedExtensions(): { enabled: Extension[], available: Extension[] } {
        const filtered = this.getFilteredExtensions();
        const enabled: Extension[] = [];
        const available: Extension[] = [];
        
        filtered.forEach(ext => {
            if (extensionRegistry.isEnabled(ext.id)) {
                enabled.push(ext);
            } else {
                available.push(ext);
            }
        });
        
        enabled.sort((a, b) => String(a.name).localeCompare(String(b.name)));
        available.sort((a, b) => String(a.name).localeCompare(String(b.name)));
        
        return { enabled, available };
    }

    private isExternalExtension(extension: Extension): boolean {
        return extension.external === true;
    }


    private handleFilterInput(e: Event) {
        this.filterText = (e.target as HTMLInputElement).value;
        this.requestUpdate();
    }

    private clearFilter() {
        this.filterText = '';
        this.requestUpdate();
    }

    private async handleRegisterExtension() {
        try {
            const url = await promptDialog("Enter extension URL or source identifier:", "", false);
            if (!url) {
                return;
            }

            await taskService.runAsync("Registering extension", async () => {
                let finalUrl = url;
                
                if (esmShService.isGitHubUrl(url)) {
                    finalUrl = esmShService.convertGitHubUrlToSource(url);
                }
                
                const parsed = esmShService.parseSource(finalUrl);
                
                if (parsed?.type === 'github') {
                    await this.fetchGitHubMetadata(parsed, finalUrl);
                } else {
                    this.registerExtensionData = {
                        url: finalUrl,
                        id: '',
                        name: '',
                        description: ''
                    };
                    this.showRegisterDialog = true;
                    this.requestUpdate();
                }
            });
        } catch (error) {
            toastError(`Failed to register extension: ${error}`);
        }
    }

    private async fetchGitHubMetadata(parsed: EsmShSource, url: string) {
        try {
            const packageJson = await esmShService.fetchGitHubPackageJson(parsed);
            
            const owner = parsed.owner!;
            const repo = parsed.repo!;
            const extensionId = packageJson.name || `ext.${owner}-${repo}`;
            const extensionName = packageJson.name || `${owner}/${repo}`;
            const description = packageJson.description || '';
            const version = packageJson.version || '';
            const author = packageJson.author || (typeof packageJson.author === 'string' ? packageJson.author : packageJson.author?.name) || '';
            
            this.registerExtensionData = {
                id: extensionId,
                name: extensionName,
                description: description,
                url: url,
                version: version,
                author: author,
                icon: 'puzzle-piece',
                external: true
            };
            
            this.showRegisterDialog = true;
            this.requestUpdate();
        } catch (error) {
            logger.warn(`Could not fetch package.json, using defaults: ${error}`);
            this.registerExtensionData = {
                url: url,
                id: '',
                name: '',
                description: ''
            };
            this.showRegisterDialog = true;
            this.requestUpdate();
        }
    }

    private async confirmRegisterExtension() {
        if (!this.registerExtensionData.url) {
            toastError("URL is required");
            return;
        }

        if (!this.registerExtensionData.id) {
            toastError("Extension ID is required");
            return;
        }

        if (!this.registerExtensionData.name) {
            toastError("Extension name is required");
            return;
        }

        try {
            await taskService.runAsync("Registering extension", async () => {
                const extension: Extension = {
                    id: this.registerExtensionData.id!,
                    name: this.registerExtensionData.name!,
                    description: this.registerExtensionData.description,
                    url: this.registerExtensionData.url!,
                    version: this.registerExtensionData.version,
                    author: this.registerExtensionData.author,
                    icon: this.registerExtensionData.icon || 'puzzle-piece',
                    external: true
                };

                extensionRegistry.registerExtension(extension);
                await extensionRegistry.loadExtensionFromUrl(this.registerExtensionData.url!, extension.id);
                
                toastInfo(`Extension ${extension.name} registered successfully`);
                this.showRegisterDialog = false;
                this.registerExtensionData = {};
                this.requestUpdate();
            });
        } catch (error) {
            toastError(`Failed to register extension: ${error}`);
        }
    }

    private cancelRegisterExtension() {
        this.showRegisterDialog = false;
        this.registerExtensionData = {};
        this.requestUpdate();
    }

    protected renderToolbar() {
        return html`
            <wa-input
                placeholder="${t.FILTER_PLACEHOLDER}"
                .value=${this.filterText}
                @input=${(e: Event) => this.handleFilterInput(e)}
                @wa-clear=${() => this.clearFilter()}
                with-clear
                size="small"
                style="width: 300px;">
                <wa-icon slot="start" name="magnifying-glass" label="Filter"></wa-icon>
            </wa-input>
            <wa-button 
                variant="primary" 
                appearance="plain"
                @click=${() => this.handleRegisterExtension()}
                title="Register a new extension">
                <wa-icon name="plus" label="Add"></wa-icon>
                Register Extension
            </wa-button>
        `;
    }

    render() {
        const grouped = this.getGroupedExtensions();
        const hasAnyExtensions = grouped.enabled.length > 0 || grouped.available.length > 0;
        
        return html`
            ${when(this.showRegisterDialog, () => html`
                <wa-dialog 
                    label="Register Extension"
                    open
                    @wa-request-close=${() => this.cancelRegisterExtension()}
                    style="--wa-dialog-width: 500px;">
                    <div style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem;">
                        <wa-input
                            label="Extension ID *"
                            .value=${this.registerExtensionData.id || ''}
                            @input=${(e: Event) => {
                                this.registerExtensionData.id = (e.target as HTMLInputElement).value;
                                this.requestUpdate();
                            }}
                            required
                            hint="Unique identifier for the extension (e.g., 'ext.my-extension')">
                        </wa-input>
                        
                        <wa-input
                            label="Name *"
                            .value=${this.registerExtensionData.name || ''}
                            @input=${(e: Event) => {
                                this.registerExtensionData.name = (e.target as HTMLInputElement).value;
                                this.requestUpdate();
                            }}
                            required
                            hint="Display name of the extension">
                        </wa-input>
                        
                        <wa-input
                            label="Description"
                            .value=${this.registerExtensionData.description || ''}
                            @input=${(e: Event) => {
                                this.registerExtensionData.description = (e.target as HTMLInputElement).value;
                                this.requestUpdate();
                            }}
                            hint="Description of what the extension does">
                        </wa-input>
                        
                        <wa-input
                            label="URL *"
                            .value=${this.registerExtensionData.url || ''}
                            @input=${(e: Event) => {
                                this.registerExtensionData.url = (e.target as HTMLInputElement).value;
                                this.requestUpdate();
                            }}
                            required
                            readonly
                            hint="Extension source URL or identifier">
                        </wa-input>
                        
                        <div style="display: flex; gap: 0.5rem;">
                            <wa-input
                                label="Version"
                                .value=${this.registerExtensionData.version || ''}
                                @input=${(e: Event) => {
                                    this.registerExtensionData.version = (e.target as HTMLInputElement).value;
                                    this.requestUpdate();
                                }}
                                style="flex: 1;"
                                hint="Extension version">
                            </wa-input>
                            
                            <wa-input
                                label="Author"
                                .value=${this.registerExtensionData.author || ''}
                                @input=${(e: Event) => {
                                    this.registerExtensionData.author = (e.target as HTMLInputElement).value;
                                    this.requestUpdate();
                                }}
                                style="flex: 1;"
                                hint="Extension author">
                            </wa-input>
                        </div>
                        
                        <wa-input
                            label="Icon"
                            .value=${this.registerExtensionData.icon || 'puzzle-piece'}
                            @input=${(e: Event) => {
                                this.registerExtensionData.icon = (e.target as HTMLInputElement).value;
                                this.requestUpdate();
                            }}
                            hint="Icon name (FontAwesome icon)">
                        </wa-input>
                        
                        <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 1rem;">
                            <wa-button 
                                variant="default" 
                                @click=${() => this.cancelRegisterExtension()}>
                                Cancel
                            </wa-button>
                            <wa-button 
                                variant="primary" 
                                @click=${() => this.confirmRegisterExtension()}
                                ?disabled=${!this.registerExtensionData.id || !this.registerExtensionData.name || !this.registerExtensionData.url}>
                                Register
                            </wa-button>
                        </div>
                    </div>
                </wa-dialog>
            `)}
            <wa-split-panel position="30" style="height: 100%">
                <wa-tree 
                    selection="leaf"
                    style="--indent-guide-width: 1px;" 
                    slot="start"
                    @wa-selection-change="${this.selectionChanged}">
                    ${hasAnyExtensions ? html`
                        ${grouped.enabled.length > 0 ? html`
                            <wa-tree-item expanded>
                                <span>
                                    <wa-icon name="check-circle" style="color: var(--wa-color-success-50);"></wa-icon>
                                    ${t.INSTALLED} (${grouped.enabled.length})
                                </span>
                                ${grouped.enabled.map(e => {
                                    const isExternal = this.isExternalExtension(e);
                                    return html`
                                        <wa-tree-item @dblclick=${this.nobubble(this.onExtensionDblClick)} .model=${e}>
                                            <span><lyra-icon name="${e.icon}"></lyra-icon></span> ${e.name}${isExternal ? html` <span style="opacity: 0.6; font-size: 0.9em; margin-left: 0.5rem;">(External)</span>` : ''}
                                        </wa-tree-item>
                                    `;
                                })}
                            </wa-tree-item>
                        ` : ''}
                        ${grouped.available.length > 0 ? html`
                            <wa-tree-item expanded>
                                <span>
                                    <wa-icon name="circle" style="color: var(--wa-color-neutral-50);"></wa-icon>
                                    ${t.AVAILABLE} (${grouped.available.length})
                                </span>
                                ${grouped.available.map(e => {
                                    const isExternal = this.isExternalExtension(e);
                                    return html`
                                        <wa-tree-item @dblclick=${this.nobubble(this.onExtensionDblClick)} .model=${e}>
                                            <span><lyra-icon name="${e.icon}"></lyra-icon></span> ${e.name}${isExternal ? html` <span style="opacity: 0.6; font-size: 0.9em; margin-left: 0.5rem;">(External)</span>` : ''}
                                        </wa-tree-item>
                                    `;
                                })}
                            </wa-tree-item>
                        ` : ''}
                    ` : ''}
                    ${!hasAnyExtensions ? html`
                        <div style="padding: 1em; text-align: center; opacity: 0.7;">
                            ${t.NO_MATCHES({ filterText: this.filterText })}
                        </div>
                    ` : ''}
                </wa-tree>
                <div slot="end" style="padding: 1em;">
                    ${when(this.selectedExtension, (e) => {
                            const isExternal = this.isExternalExtension(e);
                            const isEnabled = extensionRegistry.isEnabled(e.id);
                            
                            return html`
                                <h1><lyra-icon name="${e.icon}"></lyra-icon> ${e.name}${isExternal ? ' (External)' : ''}</h1>
                                ${when(isExternal, () => html`
                                    <div class="marketplace-badge">
                                        <wa-icon name="store"></wa-icon>
                                        <span>${t.EXTERNAL_EXTENSION}</span>
                                    </div>
                                `)}
                                <hr>
                                <div>
                                    ${when(isEnabled, () => html`
                                        <wa-button 
                                            title="${this.isExtensionRequired(e.id) ? t.REQUIRED_HINT : t.DISABLE_TITLE}" 
                                            @click="${() => this.disable(e)}"
                                            variant="danger" 
                                            appearance="plain"
                                            ?disabled=${this.isExtensionRequired(e.id)}>
                                            <wa-icon name="xmark" label="Uninstall"></wa-icon>&nbsp;${t.UNINSTALL}
                                        </wa-button>
                                        ${when(this.isExtensionRequired(e.id), () => html`
                                            <div class="required-hint">
                                                <wa-icon name="info-circle" style="color: var(--wa-color-primary-50);"></wa-icon>
                                                <span>${t.REQUIRED_HINT}</span>
                                            </div>
                                        `)}
                                    `, () => html`
                                        <wa-button 
                                            title="${t.ENABLE_TITLE}" 
                                            @click="${() => this.enable(e)}"
                                            variant="brand" 
                                            appearance="plain">
                                            <wa-icon name="download" label="Install"></wa-icon>&nbsp;${t.INSTALL}
                                        </wa-button>
                                    `)}
                                </div>

                                ${when(e.experimental, () => html`
                                    <div style="margin-top: 1em;">
                                        <wa-button size="small" variant="warning" appearance="plain">
                                            <wa-icon name="triangle-exclamation" label="Warning"></wa-icon>
                                        </wa-button>
                                        <small><i>${t.EXPERIMENTAL}</i></small>
                                    </div>
                                `)}

                                ${when(e.version || e.author, () => html`
                                    <div style="margin-top: 1em; display: flex; flex-direction: column; gap: 0.5rem;">
                                        ${when(e.version, () => html`
                                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                                <wa-icon name="tag" style="font-size: 0.9em; opacity: 0.7;"></wa-icon>
                                                <span style="font-size: 0.9em; opacity: 0.8;">${t.VERSION} <strong>${e.version}</strong></span>
                                            </div>
                                        `)}
                                        ${when(e.author, () => html`
                                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                                <wa-icon name="user" style="font-size: 0.9em; opacity: 0.7;"></wa-icon>
                                                <span style="font-size: 0.9em; opacity: 0.8;">${t.AUTHOR} <strong>${e.author}</strong></span>
                                            </div>
                                        `)}
                                    </div>
                                `)}

                                <p style="margin-top: 1em;">${e.description}</p>

                                ${when(e.dependencies && e.dependencies.length > 0, () => html`
                                    <div style="margin-top: 1.5em;">
                                        <h3 style="margin-bottom: 0.5em;">
                                            <wa-icon name="puzzle-piece" style="font-size: 0.9em;"></wa-icon>
                                            ${t.DEPENDENCIES}
                                        </h3>
                                        <div class="dependencies-list">
                                            ${e.dependencies!.map(depId => {
                                                const depExt = extensionRegistry.getExtensions().find(ex => ex.id === depId);
                                                const isEnabled = extensionRegistry.isEnabled(depId);
                                                return html`
                                                    <div class="dependency-item">
                                                        <wa-icon 
                                                            name="${isEnabled ? 'check-circle' : 'circle'}" 
                                                            style="color: ${isEnabled ? 'var(--wa-color-success-50)' : 'var(--wa-color-neutral-50)'};">
                                                        </wa-icon>
                                                        <lyra-icon name="${depExt?.icon || 'puzzle-piece'}"></lyra-icon>
                                                        <span>${depExt?.name || depId}</span>
                                                        ${!isEnabled ? html`
                                                            <span class="dependency-badge">${t.NOT_INSTALLED}</span>
                                                        ` : ''}
                                                    </div>
                                                `;
                                            })}
                                        </div>
                                        <small style="opacity: 0.7; display: block; margin-top: 0.5em;">
                                            <wa-icon name="info-circle" style="font-size: 0.9em;"></wa-icon>
                                            ${t.DEPENDENCIES_HINT}
                                        </small>
                                    </div>
                                `)}
                            `;
                        })}
                </div>
            </wa-split-panel>
        `
    }

    static styles = css`
        :host {
        }

        wa-tree-item > span {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        wa-tree-item:has(> wa-tree-item) {
            font-weight: 500;
        }

        .dependencies-list {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .dependency-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem;
            border-radius: 4px;
            background: var(--wa-color-surface-variant);
        }

        .dependency-item wa-icon:first-child {
            flex-shrink: 0;
        }

        .dependency-item icon {
            flex-shrink: 0;
        }

        .dependency-item span:not(.dependency-badge) {
            flex: 1;
        }

        .dependency-badge {
            font-size: 0.85rem;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            background: var(--wa-color-warning-100);
            color: var(--wa-color-warning-900);
        }

        .required-hint {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-top: 0.75rem;
            padding: 0.5rem;
            border-radius: 4px;
            background: var(--wa-color-primary-10);
            color: var(--wa-color-primary-70);
            font-size: 0.875rem;
        }

        .required-hint wa-icon {
            flex-shrink: 0;
        }

        .required-hint span {
            line-height: 1.4;
        }

        .marketplace-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.375rem 0.875rem;
            border-radius: 4px;
            background: var(--wa-color-primary-10);
            color: var(--wa-color-primary-70);
            font-size: 0.875rem;
            font-weight: 500;
            margin-top: 0.75rem;
            margin-bottom: 0.5rem;
            border: 1px solid var(--wa-color-primary-30);
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'lyra-extensions': LyraExtensions
    }
}
