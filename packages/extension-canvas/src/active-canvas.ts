import { activeEditorSignal } from '@eclipse-docks/core';

export interface ActiveCanvas {
    kind: 'workspace' | 'registered';
    canvasName?: string;
    editor: boolean;
    getContent?: () => string | null;
    getFilePath?: () => string | null;
    setSource?: (source: string) => void;
    reload?: () => Promise<string>;
    getState?: (key: string) => unknown;
    setState?: (key: string, value: unknown) => void;
}

export function readActiveCanvas(): ActiveCanvas | null {
    const active = activeEditorSignal.get() as unknown as (ActiveCanvas & { localName?: string }) | null;
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
        getState: active.getState?.bind(active),
        setState: active.setState?.bind(active),
    };
}
