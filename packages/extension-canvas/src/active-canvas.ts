import { activeEditorSignal } from '@eclipse-docks/core';
import type { PreviewShot } from './preview-image';

type CanvasElement = ActiveCanvas & { localName?: string };

export interface ActiveCanvas {
    kind: 'workspace' | 'registered';
    canvasName?: string;
    editor: boolean;
    getContent?: () => string | null;
    getFilePath?: () => string | null;
    setSource?: (source: string) => void;
    reload?: () => Promise<string>;
    capturePreview?: () => Promise<PreviewShot>;
    getState?: (key: string) => unknown;
    setState?: (key: string, value: unknown) => void;
}

export function readActiveCanvas(): ActiveCanvas | null {
    return fromElement(activeEditorSignal.get() as unknown as CanvasElement | null);
}

/** Active canvas editor, or any open canvas part when focus has moved elsewhere. */
export function findOpenCanvas(): ActiveCanvas | null {
    const active = readActiveCanvas();
    if (active?.capturePreview) return active;
    for (const node of document.querySelectorAll('docks-canvas-editor, docks-canvas-surface')) {
        const mapped = fromElement(node as unknown as CanvasElement);
        if (mapped?.capturePreview) return mapped;
    }
    return active;
}

function fromElement(active: CanvasElement | null): ActiveCanvas | null {
    if (!active) return null;
    const localName = active.localName;
    if (localName !== 'docks-canvas-editor' && localName !== 'docks-canvas-surface') return null;
    return {
        kind: active.kind === 'registered' ? 'registered' : 'workspace',
        canvasName: active.canvasName,
        editor: localName === 'docks-canvas-editor',
        getContent: active.getContent?.bind(active),
        getFilePath: active.getFilePath?.bind(active),
        setSource: active.setSource?.bind(active),
        reload: active.reload?.bind(active),
        capturePreview: active.capturePreview?.bind(active),
        getState: active.getState?.bind(active),
        setState: active.setState?.bind(active),
    };
}
