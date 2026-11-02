import { publish, TOPIC_WORKSPACE_CHANGED } from '@eclipse-docks/core';
import { customElement, html } from '@eclipse-docks/core/externals/lit';
import { afterEach, describe, expect, it, vi } from 'vitest';

const compileCanvas = vi.hoisted(() => vi.fn(async (input: { entrySource: string }) => ({ ok: true as const, code: input.entrySource })));
const readWorkspaceFile = vi.hoisted(() => vi.fn());

vi.mock('../src/compile', () => ({ compileCanvas }));
vi.mock('../src/workspace-file', () => ({ readWorkspaceFile }));
vi.mock('../src/mount', () => ({
    mountCompiled: vi.fn(async () => ({
        ok: true,
        element: document.createElement('div'),
        dispose: () => undefined,
    })),
    elementFromConstructor: vi.fn(),
}));
vi.mock('../src/bridges/urls', () => ({
    canvasBridges: () => ({ lit: '', webawesome: '', core: '', coreSubpaths: {} }),
}));
vi.mock('../src/preview-image', () => ({
    attachPreviewShot: vi.fn(),
    rasterizeElement: vi.fn(),
}));
vi.mock('@eclipse-docks/extension-monaco-editor/widget', () => ({}));

import { DocksCanvasEditor } from '../src/canvas-editor';

@customElement('docks-canvas-reload-test')
class ReloadTestEditor extends DocksCanvasEditor {
    protected override render() {
        return html``;
    }
}

const initial = 'export default class A {}';
const updated = 'export default class B {}';

async function openEditor(): Promise<ReloadTestEditor> {
    readWorkspaceFile.mockResolvedValue({ text: initial });
    const editor = document.createElement('docks-canvas-reload-test') as ReloadTestEditor;
    editor.entryPath = 'demo.canvas.js';
    editor.source = initial;
    document.body.append(editor);
    await vi.waitFor(() => expect(compileCanvas).toHaveBeenCalled());
    return editor;
}

describe('canvas preview reload', () => {
    afterEach(async () => {
        document.body.replaceChildren();
        compileCanvas.mockClear();
        readWorkspaceFile.mockReset();
        await new Promise(resolve => setTimeout(resolve, 300));
    });

    it('recompiles the open preview when the workspace file changes', async () => {
        const editor = await openEditor();
        compileCanvas.mockClear();
        readWorkspaceFile.mockResolvedValue({ text: updated });

        publish(TOPIC_WORKSPACE_CHANGED, undefined);

        await vi.waitFor(() => expect(compileCanvas).toHaveBeenCalled());
        expect(compileCanvas.mock.calls.at(-1)?.[0].entrySource).toBe(updated);
        expect(editor.getContent()).toBe(updated);
    });

    it('keeps a buffer edit that lands while the file is being read', async () => {
        const editor = await openEditor();
        let release: (value: { text: string }) => void = () => undefined;
        readWorkspaceFile.mockImplementation(() => new Promise(resolve => { release = resolve; }));
        compileCanvas.mockClear();

        publish(TOPIC_WORKSPACE_CHANGED, undefined);
        await Promise.resolve();
        editor.setSource('local edit');
        release({ text: updated });
        await Promise.resolve();
        await Promise.resolve();

        expect(editor.getContent()).toBe('local edit');
        expect(compileCanvas.mock.calls.some(call => call[0].entrySource === updated)).toBe(false);
    });
});
