import {
    File,
    icon,
    TOPIC_WORKSPACE_CHANGED,
    type EditorContentProvider,
} from '@eclipse-docks/core';
import { css, html, nothing, type CSSResultGroup, type PropertyValues } from '@eclipse-docks/core/externals/lit';
import { customElement, property, query, state } from '@eclipse-docks/core/externals/lit';
import '@eclipse-docks/extension-monaco-editor/widget';
import type { DocksMonacoWidget } from '@eclipse-docks/extension-monaco-editor/widget';
import type { CanvasContribution } from './contribution';
import { DocksCanvasPart } from './canvas-part';
import { createContributionHost, createFileHost } from './host';
import { attachPreviewShot, type PreviewShot } from './preview-image';
import { readWorkspaceFile } from './workspace-file';

@customElement('docks-canvas-editor')
export class DocksCanvasEditor extends DocksCanvasPart implements EditorContentProvider {
    @property() kind: 'workspace' | 'registered' = 'workspace';
    @property() entryPath = '';
    @property({ type: Boolean }) showSource = false;

    @state() protected sourceText = '';
    @state() protected mode: 'preview' | 'source' = 'preview';
    @state() private attachingPreview = false;
    @query('docks-monaco-widget') protected widget?: DocksMonacoWidget;

    private contribution?: CanvasContribution;
    private reloadTail: Promise<void> = Promise.resolve();
    private syncToken = 0;
    private compiledSource = '';
    protected previewStale = false;

    override connectedCallback() {
        super.connectedCallback();
        this.addEventListener('dirty', this.onDirty);
        this.subscribe(TOPIC_WORKSPACE_CHANGED, this.onWorkspaceChanged);
    }

    override disconnectedCallback() {
        this.removeEventListener('dirty', this.onDirty);
        this.reloadGeneration++;
        super.disconnectedCallback();
    }

    protected async doInitUI() {
        const data = this.input?.data;
        if (data instanceof File) {
            this.kind = 'workspace';
            this.entryPath = data.getWorkspacePath();
            this.showSource = true;
            this.sourceText = String(await data.getContents() ?? '');
            this.host = await createFileHost(data);
        } else if (data && typeof data === 'object' && 'contribution' in data) {
            this.contribution = (data as { contribution: CanvasContribution }).contribution;
            this.kind = 'registered';
            this.canvasName = this.contribution.name;
            this.showSource = this.contribution.source !== undefined;
            if (typeof this.contribution.source === 'function') this.sourceText = await this.contribution.source();
            else this.sourceText = this.contribution.source ?? '';
            this.host = await createContributionHost(this.contribution);
        } else if (this.entryPath || this.source) {
            this.kind = 'workspace';
            this.showSource = false;
            this.sourceText = this.source;
            const workspaceFile = await readWorkspaceFile(this.entryPath);
            if (workspaceFile?.text !== undefined && !this.sourceText) this.sourceText = workspaceFile.text;
            this.host = { getState: (_key, fallback) => fallback, setState: () => undefined, openFile: () => undefined };
        }
        this.mode = this.input?.state?.mode === 'source' ? 'source' : 'preview';
        this.ready = true;
        await this.syncFromFile();
        this.requestUpdate();
        if (this.mode === 'preview' || !this.showSource) await this.reload();
    }

    protected override doClose() {
        super.doClose();
        this.widget?.dispose();
    }

    getContent(): string | null {
        return this.widget?.getContent() ?? this.sourceText;
    }

    getSelection(): string | null {
        return this.widget?.getSelection() ?? null;
    }

    getSnippet(lines = 5): { snippet: string; cursorLine: number } | null {
        return this.widget?.getSnippet(lines) ?? null;
    }

    getLanguage(): string | null {
        return 'javascript';
    }

    isLanguage(lang: string): boolean {
        return lang.toLowerCase() === 'javascript';
    }

    getFilePath(): string | null {
        const data = this.input?.data;
        if (data instanceof File) return data.getWorkspacePath();
        return this.entryPath || null;
    }

    getState(key: string): unknown {
        return this.host.getState(key);
    }

    setState(key: string, value: unknown): void {
        this.host.setState(key, value);
    }

    setSource(source: string): void {
        const current = this.getContent() ?? '';
        this.sourceText = source;
        const model = this.widget?.getModel();
        if (model && model.getValue() !== source) model.setValue(source);
        const next = this.getContent() ?? source;
        this.previewStale = next !== this.compiledSource || !this.previewElement;
        if (next !== current || this.previewStale) this.markDirty(true);
        this.requestUpdate();
    }

    async syncFromFile(): Promise<boolean> {
        for (let attempt = 0; attempt < 30 && !this.ready; attempt++) {
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        if (!this.ready || this.kind !== 'workspace' || !this.entryPath) return false;
        const token = ++this.syncToken;
        const before = this.getContent() ?? '';
        const file = await readWorkspaceFile(this.entryPath);
        if (token !== this.syncToken) return false;
        if (file?.text === undefined) return false;
        const current = this.getContent() ?? '';
        if (current !== before || file.text === current) return false;
        this.setSource(file.text);
        return true;
    }

    override async capturePreview(): Promise<PreviewShot> {
        for (let attempt = 0; attempt < 30 && !this.ready; attempt++) {
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        if (!this.ready) throw new Error('Canvas is still opening');
        await this.reload();
        await this.updateComplete;
        const preview = this.renderRoot.querySelector('.canvas-preview') as HTMLElement | null;
        if (!preview) throw new Error('Canvas preview is not rendered');
        const hidden = preview.classList.contains('canvas-hidden') || preview.getBoundingClientRect().width < 2;
        if (hidden) {
            preview.classList.add('canvas-capture');
            preview.style.width = `${this.clientWidth || 960}px`;
            preview.style.height = `${this.clientHeight || 640}px`;
        }
        try {
            await nextFrame();
            await nextFrame();
            return await this.rasterizePreview();
        } finally {
            preview.classList.remove('canvas-capture');
            preview.style.width = '';
            preview.style.height = '';
        }
    }

    reload(): Promise<string> {
        const run = this.reloadTail.then(() => this.reloadLatest());
        this.reloadTail = run.then(() => undefined, () => undefined);
        return run;
    }

    private async reloadLatest(): Promise<string> {
        let result = 'ready';
        for (let pass = 0; pass < 4; pass++) {
            const source = this.getContent() ?? '';
            if (this.previewElement && !this.previewStale && source === this.compiledSource && !this.previewError) return result;
            result = await this.mountSource(source);
            if (!result) continue;
            if ((this.getContent() ?? '') === source) return result;
            this.previewStale = true;
        }
        return result;
    }

    private mountSource(source: string): Promise<string> {
        if (this.kind === 'registered' && this.contribution?.load) {
            return this.mountLoadedConstructor(this.contribution.load, source);
        }
        return this.mountCompiledSource(source, this.entryPath || `${this.canvasName || 'canvas'}.canvas.js`);
    }

    protected override adoptPreview(source: string): void {
        this.compiledSource = source;
        this.previewStale = (this.getContent() ?? '') !== source;
    }

    private onWorkspaceChanged = () => {
        void this.refreshFromFile();
    };

    private async refreshFromFile() {
        const changed = await this.syncFromFile();
        if (!changed) return;
        if (this.mode === 'preview' || !this.showSource) await this.reload();
    }

    private onDirty = (event: Event) => {
        if (!this.ready || (event as CustomEvent<boolean>).detail !== true) return;
        const source = this.getContent() ?? '';
        if (source === this.compiledSource && this.previewElement) return;
        this.previewStale = true;
        if (this.mode === 'preview' || !this.showSource) void this.reload();
    };

    protected override updated(changed: PropertyValues) {
        super.updated(changed);
        if (this.mode === 'source') this.widget?.layout();
    }

    private onContentChange = () => {
        const next = this.widget?.getContent() ?? this.sourceText;
        this.previewStale = next !== this.compiledSource;
        this.sourceText = next;
        this.markDirty(true);
    };

    private toggleMode() {
        if (this.widget) this.sourceText = this.widget.getContent() ?? this.sourceText;
        const next = this.mode === 'preview' ? 'source' : 'preview';
        this.mode = next;
        if (this.input) this.input.state.mode = next;
        if (next === 'preview' && (this.previewStale || !this.previewElement)) void this.reload();
    }

    private attachPreview = async () => {
        if (this.attachingPreview) return;
        this.attachingPreview = true;
        try {
            const result = await attachPreviewShot(this);
            if (typeof result === 'string') {
                this.showError(result);
                return;
            }
            if (result.stored === false) {
                this.showError(String(result.note ?? 'Could not attach the preview'));
                return;
            }
            this.showInfo('Attached preview');
        } catch (err) {
            this.showError(err instanceof Error ? err.message : String(err));
        } finally {
            this.attachingPreview = false;
        }
    };

    protected renderToolbar() {
        if (!this.ready) return nothing;
        const toSource = this.mode === 'preview';
        const label = toSource ? 'Source' : 'Preview';
        return html`
            ${this.showSource ? html`
                <wa-button appearance="plain" size="s" title=${label} @click=${() => this.toggleMode()}>
                    ${icon(toSource ? 'code' : 'eye', { slot: 'start' })}
                    ${label}
                </wa-button>
            ` : nothing}
            <wa-button
                appearance="plain"
                size="s"
                title="Attach a screenshot of the preview"
                ?loading=${this.attachingPreview}
                ?disabled=${this.attachingPreview}
                @click=${() => this.attachPreview()}>
                ${icon('camera', { slot: 'start' })}
                Screenshot
            </wa-button>
        `;
    }

    protected override renderContent() {
        if (!this.ready) return html``;
        const showPreview = !this.showSource || this.mode === 'preview';
        return html`
            ${this.renderPreview(!showPreview)}
            ${this.showSource ? html`
                <docks-monaco-widget
                    class=${this.mode === 'source' ? '' : 'canvas-hidden'}
                    .value=${this.sourceText}
                    .language=${'javascript'}
                    .uri=${this.entryPath || this.canvasName || 'canvas.js'}
                    @content-change=${this.onContentChange}>
                </docks-monaco-widget>
            ` : nothing}
        `;
    }

    static styles = css`
        .canvas-preview.canvas-hidden, docks-monaco-widget.canvas-hidden { display: none; }
        .canvas-preview.canvas-capture {
            display: flex !important;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 2147483000;
            overflow: hidden;
            background: var(--wa-color-surface-default, #fff);
        }
        docks-monaco-widget { display: block; height: 100%; min-height: 0; }
    `;

    static finalizeStyles(styles?: CSSResultGroup) {
        const group = styles === undefined ? DocksCanvasPart.styles : [DocksCanvasPart.styles, styles];
        return super.finalizeStyles(group);
    }

    override async save(): Promise<void> {
        const value = this.getContent() ?? '';
        const data = this.input?.data;
        if (data instanceof File) await data.saveContents(value);
        if ((this.mode === 'preview' || !this.showSource) && this.previewStale) await this.reload();
        this.markDirty(false);
    }
}

function nextFrame(): Promise<void> {
    return new Promise(resolve => requestAnimationFrame(() => resolve()));
}

declare global {
    interface HTMLElementTagNameMap {
        'docks-canvas-editor': DocksCanvasEditor;
    }
}
