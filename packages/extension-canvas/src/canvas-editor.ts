import {
    DocksPart,
    File,
    icon,
    TOPIC_WORKSPACE_CHANGED,
    type EditorContentProvider,
    type EditorInput,
} from '@eclipse-docks/core';
import { css, html, nothing, type PropertyValues } from '@eclipse-docks/core/externals/lit';
import { customElement, property, query, state } from '@eclipse-docks/core/externals/lit';
import '@eclipse-docks/extension-monaco-editor/widget';
import type { DocksMonacoWidget } from '@eclipse-docks/extension-monaco-editor/widget';
import type { CanvasContribution } from './contribution';
import { compileCanvas } from './compile';
import { createContributionHost, createFileHost, type CanvasHost } from './host';
import { elementFromConstructor, mountCompiled, type CanvasViewElement } from './mount';
import { canvasBridges } from './bridges/urls';
import { attachPreviewShot, rasterizeElement, type PreviewShot } from './preview-image';
import { readWorkspaceFile } from './workspace-file';

@customElement('docks-canvas-surface')
export class DocksCanvasSurface extends DocksPart implements EditorContentProvider {
    @property({ attribute: false }) input?: EditorInput;
    @property() kind: 'workspace' | 'registered' = 'workspace';
    @property() canvasName?: string;
    @property() entryPath = '';
    @property() source = '';
    @property({ type: Boolean }) showSource = false;

    @state() protected sourceText = '';
    @state() protected mode: 'preview' | 'source' = 'preview';
    @state() protected previewError?: string;
    @state() private attachingPreview = false;
    @state() protected previewElement?: CanvasViewElement;
    @query('docks-monaco-widget') protected widget?: DocksMonacoWidget;

    protected scrollMode: 'scroller' | 'native' | 'none' = 'none';
    protected host: CanvasHost = { getState: (_key, fallback) => fallback, setState: () => undefined, openFile: () => undefined };
    private previewDispose?: () => void;
    private contribution?: CanvasContribution;
    private ready = false;
    private reloadGeneration = 0;
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

    protected doClose() {
        this.reloadGeneration++;
        this.previewDispose?.();
        this.previewDispose = undefined;
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

    async capturePreview(): Promise<PreviewShot> {
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
            const view = this.previewElement as { updateComplete?: Promise<unknown> } | undefined;
            if (view?.updateComplete) await view.updateComplete;
            return await rasterizeElement(preview);
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

    private async mountSource(source: string): Promise<string> {
        const generation = ++this.reloadGeneration;
        if (this.kind === 'registered' && this.contribution) {
            try {
                const mod = await this.contribution.load();
                if (generation !== this.reloadGeneration) return '';
                const Ctor = mod.default;
                if (typeof Ctor !== 'function' || !(Ctor.prototype instanceof HTMLElement)) {
                    this.previewError = 'Canvas default export must be an HTMLElement subclass';
                    this.requestUpdate();
                    return this.previewError;
                }
                const element = elementFromConstructor(Ctor);
                element.canvasHost = this.host;
                this.replacePreview(element, source);
                return 'ready';
            } catch (err) {
                if (generation !== this.reloadGeneration) return '';
                this.previewError = err instanceof Error ? err.message : String(err);
                this.requestUpdate();
                return this.previewError;
            }
        }
        const compiled = await compileCanvas({
            entryPath: this.entryPath || 'canvas.js',
            entrySource: source,
            read: readWorkspaceFile,
            bridges: canvasBridges(),
        });
        if (generation !== this.reloadGeneration) return '';
        if (!compiled.ok) {
            this.previewError = compiled.error;
            this.requestUpdate();
            return compiled.error;
        }
        const mounted = await mountCompiled(compiled.code);
        if (generation !== this.reloadGeneration) {
            if (mounted.ok) mounted.dispose();
            return '';
        }
        if (!mounted.ok) {
            this.previewError = mounted.error;
            this.requestUpdate();
            return mounted.error;
        }
        mounted.element.canvasHost = this.host;
        this.replacePreview(mounted.element, source, mounted.dispose);
        return 'ready';
    }

    private replacePreview(element: CanvasViewElement, source: string, dispose?: () => void) {
        const previous = this.previewDispose;
        this.previewDispose = dispose ?? (() => element.remove());
        this.previewElement = element;
        this.previewError = undefined;
        this.compiledSource = source;
        this.previewStale = (this.getContent() ?? '') !== source;
        this.placePreview();
        this.requestUpdate();
        previous?.();
    }

    /** The mount has no Lit child part, so replacing its children leaves part markers intact. */
    private placePreview() {
        const mount = this.renderRoot.querySelector('.canvas-mount');
        const element = this.previewElement;
        if (!mount || !element) return;
        if (mount.childElementCount === 1 && mount.firstElementChild === element) return;
        mount.replaceChildren(element);
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

    protected updated(changed: PropertyValues) {
        super.updated(changed);
        this.placePreview();
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

    protected renderContent() {
        if (!this.ready) return html``;
        const showPreview = !this.showSource || this.mode === 'preview';
        return html`
            <div class="canvas-preview ${showPreview ? '' : 'canvas-hidden'}">
                ${this.previewError ? html`<pre class="canvas-error">${this.previewError}</pre>` : nothing}
                <wa-scroller class="canvas-scroll" orientation="vertical">
                    <div class="canvas-mount"></div>
                </wa-scroller>
            </div>
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
        :host { display: flex; flex-direction: column; height: 100%; min-height: 0; }
        .canvas-preview { display: flex; flex-direction: column; height: 100%; min-height: 0; overflow: hidden; }
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
        wa-scroller.canvas-scroll { flex: 1 1 0; min-height: 0; height: 100%; }
        .canvas-mount > * { display: block; }
        docks-monaco-widget { display: block; height: 100%; min-height: 0; }
        .canvas-error {
            margin: 0;
            padding: var(--wa-space-s, 8px);
            white-space: pre-wrap;
            color: var(--wa-color-danger-on-quiet, #b42318);
        }
    `;
}

@customElement('docks-canvas-editor')
export class DocksCanvasEditor extends DocksCanvasSurface {
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
        'docks-canvas-surface': DocksCanvasSurface;
        'docks-canvas-editor': DocksCanvasEditor;
    }
}
