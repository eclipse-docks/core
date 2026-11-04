import { customElement } from '@eclipse-docks/core/externals/lit';
import type { CanvasContribution } from './contribution';
import { DocksCanvasPart } from './canvas-part';
import { createContributionHost } from './host';

/** Read-only preview for a canvas opened from the canvases dropdown. */
@customElement('docks-canvas-viewer')
export class CanvasViewer extends DocksCanvasPart {
    readonly kind = 'registered' as const;

    private contribution?: CanvasContribution;

    /**
     * A part is the active editor only when `save` is overridden.
     * This one writes nothing.
     */
    override async save(): Promise<void> {}

    protected async doInitUI() {
        const data = this.input?.data as { contribution?: CanvasContribution } | undefined;
        const contribution = data?.contribution;
        if (!contribution) {
            this.previewError = 'No canvas contribution';
            this.ready = true;
            return;
        }
        this.contribution = contribution;
        this.canvasName = contribution.name;
        this.host = await createContributionHost(contribution);
        this.ready = true;
        await this.mount();
    }

    private async mount() {
        const contribution = this.contribution;
        if (!contribution) return;
        if (contribution.load) {
            await this.mountLoadedConstructor(contribution.load, this.source);
            return;
        }
        const source = await this.contributedSource(contribution);
        await this.mountCompiledSource(source, `${contribution.name}.canvas.js`);
    }

    private async contributedSource(contribution: CanvasContribution): Promise<string> {
        if (this.source) return this.source;
        if (typeof contribution.source === 'function') return contribution.source();
        return contribution.source ?? '';
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'docks-canvas-viewer': CanvasViewer;
    }
}
