import { activeEditorSignal, commandRegistry } from '@eclipse-docks/core';
import { afterEach, describe, expect, it } from 'vitest';
import { findOpenCanvas } from '../src/active-canvas';
import { registerCanvasCommands } from '../src/commands';
import { PREVIEW_IMAGE_KEY, previewFileName, previewToolOutput, type PreviewShot } from '../src/preview-image';

const shot: PreviewShot = {
    dataUrl: 'data:image/png;base64,aaaa',
    byteLength: 3,
    mime: 'image/png',
};

describe('canvas preview attachment', () => {
    afterEach(() => {
        activeEditorSignal.set(null as never);
    });

    it('names the image after the canvas file', () => {
        expect(previewFileName('notes/hello.canvas.js', 'image/png')).toBe('hello.preview.png');
        expect(previewFileName('welcome', 'image/jpeg')).toBe('welcome.preview.jpg');
    });

    it('returns a vision payload for a stored attachment', () => {
        const output = previewToolOutput(shot, 'hello.preview.png', {
            id: 'att-1',
            name: 'hello.preview.png',
            path: 'in-memory://session/att-1-hello.preview.png',
        });
        expect(output[PREVIEW_IMAGE_KEY]).toBe(true);
        expect(output.dataUrl).toBe(shot.dataUrl);
        expect(output.id).toBe('att-1');
        expect(output.path).toBe('in-memory://session/att-1-hello.preview.png');
        expect(output.stored).toBe(true);
    });

    it('still presents the image when the session cannot store it', () => {
        const output = previewToolOutput(shot, 'hello.preview.png', null);
        expect(output[PREVIEW_IMAGE_KEY]).toBe(true);
        expect(output.dataUrl).toBe(shot.dataUrl);
        expect(output.stored).toBe(false);
    });

    it('offers capture only while a canvas part is open', () => {
        registerCanvasCommands();
        const handler = commandRegistry.getHandler('canvas.capture_preview')?.[0];
        expect(handler?.canExecute?.(commandRegistry.createExecutionContext())).toBe(false);
        expect(findOpenCanvas()).toBeNull();
    });
});
