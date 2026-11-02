import { activeEditorSignal, commandRegistry, contributionRegistry, SIDEBAR_MAIN } from '@eclipse-docks/core';
import { SYSTEM_CANVASES } from '../src/contribution';
import { describe, expect, it } from 'vitest';
import { listRegisteredCanvases } from '../src/canvases';
import { canvasToolIsActive, registerCanvasTools } from '../src/canvas-tools';

describe('system.canvases', () => {
    it('lists a registered canvas and does not place it on a sidebar', () => {
        contributionRegistry.registerContribution(SYSTEM_CANVASES, {
            name: 'test.canvas.list',
            label: 'Listed',
            icon: 'table-columns',
            settingsKey: 'test.canvas.list',
            load: async () => ({ default: class extends HTMLElement {} }),
        });
        const listed = listRegisteredCanvases().find(canvas => canvas.name === 'test.canvas.list');
        expect(listed?.label).toBe('Listed');
        expect(contributionRegistry.getContributions(SIDEBAR_MAIN).some(canvas => canvas.name === 'test.canvas.list')).toBe(false);
        contributionRegistry.unregisterContribution(SYSTEM_CANVASES, 'test.canvas.list');
        expect(listRegisteredCanvases().some(canvas => canvas.name === 'test.canvas.list')).toBe(false);
    });

    it('lists a canvas that only provides source', () => {
        contributionRegistry.registerContribution(SYSTEM_CANVASES, {
            name: 'test.canvas.source',
            label: 'Sourced',
            settingsKey: 'test.canvas.source',
            source: 'export default class extends HTMLElement {}',
        });
        expect(listRegisteredCanvases().some(canvas => canvas.name === 'test.canvas.source')).toBe(true);
        contributionRegistry.unregisterContribution(SYSTEM_CANVASES, 'test.canvas.source');
    });

    it('ignores a canvas contribution without a settings key', () => {
        contributionRegistry.registerContribution(SYSTEM_CANVASES, {
            name: 'test.canvas.nokey',
            label: 'No key',
            source: 'export default class extends HTMLElement {}',
        });
        expect(listRegisteredCanvases().some(canvas => canvas.name === 'test.canvas.nokey')).toBe(false);
        contributionRegistry.unregisterContribution(SYSTEM_CANVASES, 'test.canvas.nokey');
    });

    it('enables a canvas tool only while that canvas editor is active', () => {
        registerCanvasTools({
            name: 'test.canvas.tool',
            label: 'Tool',
            settingsKey: 'test.canvas.tool',
            load: async () => ({ default: class extends HTMLElement {} }),
            tools: [{
                id: 'test.canvas.tool.run',
                name: 'Run',
                description: 'Runs the canvas tool',
                parameters: [],
                execute: () => 'ran',
            }],
        });
        activeEditorSignal.set(null as never);
        expect(canvasToolIsActive('test.canvas.tool')).toBe(false);
        activeEditorSignal.set({
            localName: 'docks-canvas-editor',
            kind: 'registered',
            canvasName: 'test.canvas.tool',
        } as never);
        expect(canvasToolIsActive('test.canvas.tool')).toBe(true);
        const handler = commandRegistry.getHandler('test.canvas.tool.run')?.[0];
        expect(handler?.canExecute?.(commandRegistry.createExecutionContext())).toBe(true);
        activeEditorSignal.set({ localName: 'docks-canvas-editor', kind: 'workspace' } as never);
        expect(handler?.canExecute?.(commandRegistry.createExecutionContext())).toBe(false);
        activeEditorSignal.set({
            localName: 'docks-canvas-readonly',
            kind: 'registered',
            canvasName: 'test.canvas.tool',
        } as never);
        expect(canvasToolIsActive('test.canvas.tool')).toBe(false);
        expect(handler?.canExecute?.(commandRegistry.createExecutionContext())).toBe(false);
        activeEditorSignal.set(null as never);
    });
});
