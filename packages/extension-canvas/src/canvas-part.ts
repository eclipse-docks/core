import { DocksPart, type EditorInput } from '@eclipse-docks/core';
import { css, html, nothing, type PropertyValues } from '@eclipse-docks/core/externals/lit';
import { property, state } from '@eclipse-docks/core/externals/lit';
import type { CanvasContribution } from './contribution';
import { compileCanvas } from './compile';
import './bridges/canvas';
import './bridges/core';
import type { CanvasHost } from './host';
import { elementFromConstructor, mountCompiled, type CanvasViewElement } from './mount';
import { rasterizeElement, type PreviewShot } from './preview-image';
import { readWorkspaceFile } from './workspace-file';

/** Shared preview host for the canvas editor and the read-only contribution canvas. */
export abstract class DocksCanvasPart extends DocksPart {
    @property({ attribute: false }) input?: EditorInput;
    @property() canvasName?: string;
    @property() source = '';

    @state() protected previewError?: string;
    @state() protected previewElement?: CanvasViewElement;

    protected scrollMode: 'scroller' | 'native' | 'none' = 'none';
    protected host: CanvasHost = { getState: (_key, fallback) => fallback, setState: () => undefined, openFile: () => undefined };
    protected ready = false;
    protected reloadGeneration = 0;

    private previewDispose?: () => void;

    protected doClose() {
        this.reloadGeneration++;
        this.previewDispose?.();
        this.previewDispose = undefined;
    }

    async capturePreview(): Promise<PreviewShot> {
        return this.rasterizePreview();
    }

    /** Compile workspace or contribution source and mount the exported element. */
    protected async mountCompiledSource(source: string, entryPath: string): Promise<string> {
        const generation = ++this.reloadGeneration;
        const compiled = await compileCanvas({
            entryPath,
            entrySource: source,
            read: readWorkspaceFile,
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

    /** Mount a contribution that already provides its element constructor. */
    protected async mountLoadedConstructor(load: NonNullable<CanvasContribution['load']>, source: string): Promise<string> {
        const generation = ++this.reloadGeneration;
        try {
            const mod = await load();
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

    /** Called when a preview element is installed. `source` is the text that produced it. */
    protected adoptPreview(_source: string): void {}

    protected replacePreview(element: CanvasViewElement, source: string, dispose?: () => void) {
        const previous = this.previewDispose;
        this.previewDispose = dispose ?? (() => element.remove());
        this.previewElement = element;
        this.previewError = undefined;
        this.adoptPreview(source);
        this.placePreview();
        this.requestUpdate();
        previous?.();
    }

    /** The mount has no Lit child part, so replacing its children leaves part markers intact. */
    protected placePreview() {
        const mount = this.renderRoot.querySelector('.canvas-mount');
        const element = this.previewElement;
        if (!mount || !element) return;
        if (mount.childElementCount === 1 && mount.firstElementChild === element) return;
        mount.replaceChildren(element);
    }

    protected updated(changed: PropertyValues) {
        super.updated(changed);
        this.placePreview();
    }

    protected renderPreview(hidden = false) {
        return html`
            <div class="canvas-preview ${hidden ? 'canvas-hidden' : ''}">
                ${this.previewError ? html`<pre class="canvas-error">${this.previewError}</pre>` : nothing}
                <wa-scroller class="canvas-scroll" orientation="vertical">
                    <div class="canvas-mount"></div>
                </wa-scroller>
            </div>
        `;
    }

    protected renderContent() {
        if (!this.ready) return html``;
        return this.renderPreview();
    }

    protected async rasterizePreview(): Promise<PreviewShot> {
        await this.updateComplete;
        const preview = this.renderRoot.querySelector('.canvas-preview') as HTMLElement | null;
        if (!preview) throw new Error('Canvas preview is not rendered');
        const view = this.previewElement as { updateComplete?: Promise<unknown> } | undefined;
        if (view?.updateComplete) await view.updateComplete;
        return rasterizeElement(preview);
    }

    static styles = css`
        :host { display: flex; flex-direction: column; height: 100%; min-height: 0; }
        .canvas-preview { display: flex; flex-direction: column; height: 100%; min-height: 0; overflow: hidden; }
        wa-scroller.canvas-scroll { flex: 1 1 0; min-height: 0; height: 100%; }
        .canvas-mount > * { display: block; }
        .canvas-error {
            margin: 0;
            padding: var(--wa-space-s, 8px);
            white-space: pre-wrap;
            color: var(--wa-color-danger-on-quiet, #b42318);
        }
    `;
}
