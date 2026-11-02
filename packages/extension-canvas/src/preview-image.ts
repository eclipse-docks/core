import { domToBlob } from 'modern-screenshot';

/** Same field the specialist loop reads to schedule a follow-up vision message. */
export const PREVIEW_IMAGE_KEY = '_presentImage';

const MAX_BYTES = 3_500_000;
const MAX_EDGE = 1600;

export interface PreviewShot {
    dataUrl: string;
    byteLength: number;
    mime: string;
}

export interface StoredPreview {
    id: string;
    name: string;
    path?: string;
}

export async function rasterizeElement(element: HTMLElement): Promise<PreviewShot> {
    const rect = element.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) throw new Error('Canvas preview has no visible size');
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);
    const options = {
        width,
        height,
        scale: Math.min(2, MAX_EDGE / Math.max(width, height)),
        backgroundColor: opaqueBackground(element),
        font: false as const,
        features: { restoreScrollPosition: true },
    };
    let mime = 'image/png';
    let blob = await domToBlob(element, options);
    if (blob.size > MAX_BYTES) {
        mime = 'image/jpeg';
        blob = await domToBlob(element, { ...options, type: 'image/jpeg', quality: 0.8 });
    }
    if (blob.size > MAX_BYTES) throw new Error('Canvas preview image is too large to attach');
    const bytes = new Uint8Array(await blob.arrayBuffer());
    return { mime, byteLength: bytes.byteLength, dataUrl: `data:${mime};base64,${bytesToBase64(bytes)}` };
}

export function previewFileName(sourceName: string | null | undefined, mime: string): string {
    const base = (sourceName?.split('/').pop() || 'canvas').replace(/\.canvas\.js$/i, '').replace(/[^\w.-]+/g, '_') || 'canvas';
    const ext = mime === 'image/jpeg' ? 'jpg' : 'png';
    return `${base}.preview.${ext}`;
}

export async function attachPreviewShot(active: {
    capturePreview?: () => Promise<PreviewShot>;
    getFilePath?: () => string | null;
    canvasName?: string;
}): Promise<Record<string, unknown> | string> {
    if (!active.capturePreview) return 'No canvas is open';
    const shot = await active.capturePreview();
    const name = previewFileName(active.getFilePath?.() ?? active.canvasName, shot.mime);
    const { cognitiveRuntime } = await import('@eclipse-docks/extension-ai-system/api');
    const stored = await cognitiveRuntime.addAttachments(undefined, [{
        name,
        mime: shot.mime,
        kind: 'image',
        dataUrl: shot.dataUrl,
        byteLength: shot.byteLength,
    }]);
    return previewToolOutput(shot, name, stored[0]);
}

export function previewToolOutput(
    shot: PreviewShot,
    name: string,
    stored?: StoredPreview | null,
    presentKey = PREVIEW_IMAGE_KEY,
): Record<string, unknown> {
    return {
        id: stored?.id ?? '',
        name: stored?.name ?? name,
        path: stored?.path,
        mime: shot.mime,
        kind: 'image',
        byteLength: shot.byteLength,
        stored: Boolean(stored),
        [presentKey]: true,
        dataUrl: shot.dataUrl,
        note: stored
            ? 'Image bytes will be provided to the model in the next message for vision inspection.'
            : 'Image bytes follow for inspection. The preview was not stored because the session attachment limit is full.',
    };
}

function opaqueBackground(start: Element): string {
    let current: Element | null = start;
    while (current) {
        const color = getComputedStyle(current).backgroundColor;
        if (color && color !== 'transparent' && color !== 'rgba(0, 0, 0, 0)') return color;
        const root = current.getRootNode();
        current = current.parentElement ?? (root instanceof ShadowRoot ? root.host : null);
    }
    return '#ffffff';
}

function bytesToBase64(bytes: Uint8Array): string {
    const chunk = 0x8000;
    let binary = '';
    for (let i = 0; i < bytes.length; i += chunk) {
        binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
    }
    return btoa(binary);
}
