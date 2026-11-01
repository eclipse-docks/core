/**
 * @vitest-environment jsdom
 */
import { activeEditorSignal, registerAll } from '@eclipse-docks/core';
import { describe, expect, it } from 'vitest';
import { refreshCommandTools } from '../src/runtime/tools/command-adapter';
import { ToolBroker } from '../src/runtime/tools/broker';

describe('refreshCommandTools', () => {
    it('omits a command whose canExecute is false for the current editor', () => {
        registerAll({
            command: {
                id: 'canvas.test.only_when_marked',
                name: 'Marked',
                description: 'only when the active editor is marked',
                parameters: [],
            },
            handler: {
                canExecute: context => (context.activeEditor as { marked?: boolean } | null)?.marked === true,
                execute: () => 'ok',
            },
        });
        const broker = new ToolBroker();
        activeEditorSignal.set(null as never);
        refreshCommandTools(broker, 'build');
        expect(broker.listDefinitions('build').some(tool => tool.name === 'canvas_test_only_when_marked')).toBe(false);

        activeEditorSignal.set({ marked: true } as never);
        refreshCommandTools(broker, 'build');
        expect(broker.listDefinitions('build').some(tool => tool.name === 'canvas_test_only_when_marked')).toBe(true);
        activeEditorSignal.set(null as never);
    });
});
