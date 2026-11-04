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
    save?: () => Promise<void>;
    syncFromFile?: () => Promise<boolean>;
    reload?: () => Promise<string>;
    capturePreview?: () => Promise<PreviewShot>;
    getState?: (key: string) => unknown;
    setState?: (key: string, value: unknown) => void;
}

export function readActiveCanvas(): ActiveCanvas | null {
    return fromElement(activeEditorSignal.get() as unknown as CanvasElement | null);
}

/** Contributed canvas opened from the dropdown. It is not an editable editor. */
export function isCanvasViewer(active: ActiveCanvas | null = readActiveCanvas()): boolean {
    return !!active && !active.editor && active.kind === 'registered';
}

/** Connected workspace canvas editors. Optional path keeps only that file. */
export function connectedWorkspaceEditors(path?: string): ActiveCanvas[] {
    const editors = [...document.querySelectorAll('docks-canvas-editor')]
        .filter(node => (node as HTMLElement).isConnected)
        .map(node => fromElement(node as unknown as CanvasElement))
        .filter((item): item is ActiveCanvas => !!item && item.editor && item.kind === 'workspace');
    if (!path) return editors;
    const normalized = path.replace(/^\/+/, '');
    return editors.filter(item => (item.getFilePath?.() ?? '').replace(/^\/+/, '') === normalized);
}

/** Active canvas editor, or any open canvas part when focus has moved elsewhere. */
export function findOpenCanvas(): ActiveCanvas | null {
    const active = readActiveCanvas();
    if (active?.capturePreview) return active;
    for (const node of document.querySelectorAll('docks-canvas-editor, docks-canvas-surface, docks-canvas-viewer')) {
        const mapped = fromElement(node as unknown as CanvasElement);
        if (mapped?.capturePreview) return mapped;
    }
    return active;
}

function fromElement(active: CanvasElement | null): ActiveCanvas | null {
    if (!active) return null;
    const localName = active.localName;
    if (localName !== 'docks-canvas-editor' && localName !== 'docks-canvas-surface' && localName !== 'docks-canvas-viewer') return null;
    return {
        kind: active.kind === 'registered' ? 'registered' : 'workspace',
        canvasName: active.canvasName,
        editor: localName === 'docks-canvas-editor',
        getContent: active.getContent?.bind(active),
        getFilePath: active.getFilePath?.bind(active),
        setSource: active.setSource?.bind(active),
        save: active.save?.bind(active),
        syncFromFile: active.syncFromFile?.bind(active),
        reload: active.reload?.bind(active),
        capturePreview: active.capturePreview?.bind(active),
        getState: active.getState?.bind(active),
        setState: active.setState?.bind(active),
    };
}
