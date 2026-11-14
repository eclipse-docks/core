/**
 * @vitest-environment jsdom
 */
import { activeEditorSignal, COMMAND_TAG_SHELL, registerAll } from '@eclipse-docks/core';
import { describe, expect, it } from 'vitest';
import { refreshCommandTools } from '../src/runtime/tools/command-adapter';
import { ToolBroker } from '../src/runtime/tools/broker';
import { setShellPromptHandler } from '../src/runtime/tools/shell-prompt';

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

    it('exposes shell and omits shell-tagged verbs', () => {
        registerAll({
            command: {
                id: 'shell',
                name: 'Shell',
                description: 'placeholder',
                parameters: [
                    { name: 'line', description: 'line', required: false },
                    { name: 'cwd', description: 'cwd', required: false },
                ],
            },
            handler: { execute: () => 'ok' },
        });
        registerAll({
            command: {
                id: 'shelltest_verb',
                name: 'Verb',
                description: 'a test verb',
                tags: [COMMAND_TAG_SHELL],
                grants: ['r', 'w'],
                parameters: [],
            },
            handler: { execute: () => 'v' },
        });
        const broker = new ToolBroker();
        refreshCommandTools(broker, 'build');
        const tools = broker.listDefinitions('build');
        expect(tools.some((tool) => tool.name === 'ls')).toBe(false);
        expect(tools.some((tool) => tool.name === 'mkdir')).toBe(false);
        expect(tools.some((tool) => tool.name === 'shelltest_verb')).toBe(false);
        const shell = tools.find((tool) => tool.name === 'shell');
        expect(shell?.description).toContain('ls (r)');
        expect(shell?.description).toContain('mkdir (w)');
        expect(shell?.description).toContain('shelltest_verb (r, w)');
        expect(shell?.description).toContain('&&');
        expect(shell?.parameters && 'properties' in (shell.parameters as object)).toBe(true);
        expect(shell?.description).toContain('one shell');
        expect(shell?.description).toContain('commands');
    });

    it('continues shell in the same directory and blocks writes while planning', async () => {
        registerAll({
            command: {
                id: 'shell',
                name: 'Shell',
                description: 'shell',
                parameters: [
                    { name: 'line', description: 'line', required: false },
                    { name: 'cwd', description: 'cwd', required: false },
                ],
            },
            handler: {
                ranking: 100,
                execute: (context) => {
                    const line = String(context.params?.line ?? '');
                    if (line.startsWith('cd ')) {
                        return { cwd: line.slice(3).trim(), success: true, results: [], jobs: [] };
                    }
                    return { cwd: context.cwd ?? '', success: true, results: [context.cwd ?? ''], jobs: [] };
                },
            },
        });
        const broker = new ToolBroker();
        refreshCommandTools(broker, 'build');
        const listed = await broker.execute(
            { id: '1', name: 'shell', arguments: { commands: ['cd IndexedDB', 'ls'] } },
            'chat-shell-1',
            'build',
            { risk: 'safe' },
        );
        expect(listed.ok).toBe(true);
        expect(listed.output).toMatchObject({
            cwd: 'IndexedDB',
            commands: [
                { command: 'cd IndexedDB', ok: true },
                { command: 'ls', ok: true, output: { results: ['IndexedDB'] } },
            ],
        });

        const other = await broker.execute(
            { id: '2', name: 'shell', arguments: { commands: ['ls'] } },
            'chat-shell-2',
            'build',
            { risk: 'safe' },
        );
        expect(other.output).toMatchObject({
            cwd: '',
            commands: [{ command: 'ls', ok: true, output: { results: [''] } }],
        });

        refreshCommandTools(broker, 'plan');
        const denied = await broker.execute(
            { id: '3', name: 'shell', arguments: { commands: ['mkdir notes'] } },
            'chat-shell-1',
            'plan',
            { risk: 'safe' },
        );
        expect(denied.ok).toBe(false);
        expect(denied.error).toContain('(r)');
    });

    it('asks the chat when a shell command needs an answer', async () => {
        registerAll({
            command: {
                id: 'shell',
                name: 'Shell',
                description: 'shell',
                parameters: [{ name: 'line', description: 'line', required: false }],
            },
            handler: {
                ranking: 200,
                execute: async (context) => {
                    const answer = await context.ask?.({
                        kind: 'choice',
                        message: 'Delete notes?',
                        choices: ['Yes', 'No'],
                        custom: false,
                    });
                    return { cwd: '', success: true, results: [answer ?? ''], jobs: [] };
                },
            },
        });
        const previous = setShellPromptHandler(async (request) => {
            expect(request.sessionId).toBe('chat-ask');
            expect(request.kind).toBe('choice');
            expect(request.choices).toEqual(['Yes', 'No']);
            expect(request.message).toBe('Delete notes?');
            return 'Yes';
        });
        try {
            const broker = new ToolBroker();
            refreshCommandTools(broker, 'build');
            const result = await broker.execute(
                { id: 'q', name: 'shell', arguments: { commands: ['rm notes'] } },
                'chat-ask',
                'build',
                { risk: 'safe' },
            );
            expect(result.ok).toBe(true);
            expect(result.output).toMatchObject({
                commands: [{ command: 'rm notes', ok: true, output: { results: ['Yes'] } }],
            });
        } finally {
            setShellPromptHandler(previous);
        }
    });
});
