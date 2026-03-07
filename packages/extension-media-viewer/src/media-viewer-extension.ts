import { customElement, property, state } from "lit/decorators.js";
import { css, html, nothing } from "lit";
import { LyraPart, EditorInput, editorRegistry, File } from "@eclipse-lyra/core";

const SUPPORTED_EXTENSIONS = [
    '.pdf',
    '.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.bmp', '.ico'
];

const getFileIcon = (fileName: string): string => {
    const lowerName = fileName.toLowerCase();
    if (lowerName.endsWith('.pdf')) return 'file-pdf';
    if (lowerName.match(/\.(jpg|jpeg|png|gif|webp|bmp|ico|svg)$/)) return 'image';
    return 'file';
};

const isSupportedMediaFile = (file: File): boolean => {
    const fileName = file.getName().toLowerCase();
    return SUPPORTED_EXTENSIONS.some(ext => fileName.endsWith(ext));
};

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.bmp', '.ico'];

const isImageFile = (file: File): boolean => {
    const name = file.getName().toLowerCase();
    return IMAGE_EXTENSIONS.some(ext => name.endsWith(ext));
};

/** Normalized bounding box overlay (0–1). Used by extensions to draw on the image. */
export interface BboxOverlay {
    type: 'bbox';
    left: number;
    top: number;
    width: number;
    height: number;
    label?: string;
    /** CSS color for border and label (e.g. by category). */
    color?: string;
}

/** Segment mask overlay: PNG data URL (alpha where segment is), drawn over the image. */
export interface MaskOverlay {
    type: 'mask';
    /** Data URL of the mask image (e.g. image/png with alpha). */
    dataUrl: string;
    label?: string;
    color?: string;
}

export type MediaViewerOverlay = BboxOverlay | MaskOverlay;

editorRegistry.registerEditorInputHandler({
    editorId: "system.media-viewer",
    label: "Media viewer",
    canHandle: input => input instanceof File && isSupportedMediaFile(input),
    handle: async (input: File) => {
        const editorInput = {
            title: input.getName(),
            data: input,
            key: input.getName(),
            icon: getFileIcon(input.getName()),
            noOverflow: false,
            state: {},
        } as EditorInput
        editorInput.component = () => html`
            <lyra-media-viewer .input=${editorInput}></lyra-media-viewer>`
        return editorInput;
    },
    ranking: 1000
})

@customElement('lyra-media-viewer')
export class LyraMediaViewer extends LyraPart {
    @property({attribute: false})
    public input?: EditorInput

    @state()
    private mediaUrl?: string

    @state()
    private imageNaturalWidth = 0

    @state()
    private imageNaturalHeight = 0

    @state()
    private overlays: MediaViewerOverlay[] = []

    getMediaUrl(): string | undefined {
        return this.mediaUrl;
    }

    getIsImage(): boolean {
        return !!(this.input?.data instanceof File && this.mediaUrl && isImageFile(this.input.data));
    }

    getImageDimensions(): { width: number; height: number } {
        return { width: this.imageNaturalWidth, height: this.imageNaturalHeight };
    }

    /** Set overlays drawn on the image (e.g. from object detection or other extensions). Coordinates in 0–1. */
    setOverlays(overlays: MediaViewerOverlay[]): void {
        this.overlays = overlays ?? [];
    }

    getOverlays(): MediaViewerOverlay[] {
        return [...this.overlays];
    }

    clearOverlays(): void {
        this.overlays = [];
    }

    protected doClose() {
        if (this.mediaUrl && this.mediaUrl.startsWith('blob:')) {
            URL.revokeObjectURL(this.mediaUrl)
        }
        this.input = undefined
        this.mediaUrl = undefined
        this.overlays = []
        this.imageNaturalWidth = 0
        this.imageNaturalHeight = 0
    }

    protected async doInitUI() {
        await this.loadMedia()
    }

    private async loadMedia() {
        if (!this.input?.data || !(this.input.data instanceof File)) {
            return
        }

        const file = this.input.data
        const url = await file.getContents({uri: true}) as string
        this.mediaUrl = url
        this.overlays = []
    }

    private onImageLoad = (e: Event): void => {
        const img = e.target as HTMLImageElement;
        if (img?.naturalWidth && img?.naturalHeight) {
            this.imageNaturalWidth = img.naturalWidth;
            this.imageNaturalHeight = img.naturalHeight;
        }
    }

    protected render() {
        if (!this.mediaUrl) {
            return html`
                <div style="display: flex; align-items: center; justify-content: center; height: 100%;">
                    <wa-spinner></wa-spinner>
                </div>
            `
        }

        const isImage = this.getIsImage();
        if (isImage) {
            const w = this.imageNaturalWidth || 1;
            const h = this.imageNaturalHeight || 1;
            const aspectRatio = w / h;
            return html`
                <div class="image-container">
                    <div
                        class="image-wrapper"
                        style="aspect-ratio: ${aspectRatio};"
                    >
                        <img
                            class="media-image"
                            src="${this.mediaUrl}"
                            alt=""
                            @load=${this.onImageLoad}
                        />
                        ${this.overlays.length > 0 ? html`
                            <div class="overlay-layer">
                                ${this.overlays.map((o) => o.type === 'bbox' ? html`
                                    <div
                                        class="overlay-bbox"
                                        style="left: ${o.left * 100}%; top: ${o.top * 100}%; width: ${o.width * 100}%; height: ${o.height * 100}%;${o.color ? ` --overlay-color: ${o.color};` : ''}"
                                        title="${o.label ?? ''}"
                                    >
                                        ${o.label ? html`<span class="overlay-label">${o.label}</span>` : nothing}
                                    </div>
                                ` : o.type === 'mask' ? html`
                                    <img
                                        class="overlay-mask"
                                        src="${o.dataUrl}"
                                        alt="${o.label ?? ''}"
                                        title="${o.label ?? ''}"
                                    />
                                ` : nothing)}
                            </div>
                        ` : nothing}
                    </div>
                </div>
            `;
        }

        return html`
            <div class="media-iframe-container">
                <iframe
                    src="${this.mediaUrl}"
                    class="media-iframe"
                    title="Media Viewer"></iframe>
            </div>
        `
    }

    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            position: relative;
            width: 100%;
            height: 100%;
            background: var(--wa-color-surface-default, #1a1a1a);
        }

        .image-container {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }

        .image-wrapper {
            position: relative;
            max-width: 100%;
            max-height: 100%;
        }

        .media-iframe-container {
            position: absolute;
            inset: 0;
            min-height: 0;
        }

        .media-iframe {
            display: block;
            width: 100%;
            height: 100%;
            border: 0;
        }

        .media-image {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        .overlay-layer {
            position: absolute;
            inset: 0;
            pointer-events: none;
        }

        .overlay-bbox {
            position: absolute;
            border: 2px solid var(--overlay-color, var(--wa-color-brand-fill, #0d6efd));
            background: color-mix(in srgb, var(--overlay-color, #0d6efd) 15%, transparent);
            pointer-events: auto;
            box-sizing: border-box;
        }

        .overlay-label {
            position: absolute;
            left: 0;
            top: -1.25em;
            font-size: 0.7rem;
            white-space: nowrap;
            background: var(--overlay-color, var(--wa-color-brand-fill, #0d6efd));
            color: var(--wa-color-surface-default, #fff);
            padding: 1px 4px;
            border-radius: 2px;
        }

        .overlay-mask {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: fill;
            pointer-events: none;
        }
    `
}

declare global {
    interface HTMLElementTagNameMap {
        'lyra-media-viewer': LyraMediaViewer
    }
}

