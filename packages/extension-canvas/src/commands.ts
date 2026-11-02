import {
    contributionRegistry,
    editorRegistry,
    File,
    registerAll,
    SIDEBAR_AUXILIARY,
    SIDEBAR_MAIN,
    PANEL_BOTTOM,
    workspaceService,
    type EditorInput,
} from '@eclipse-docks/core';
import { html } from '@eclipse-docks/core/externals/lit';
import { connectedWorkspaceEditors, findOpenCanvas, readActiveCanvas } from './active-canvas';
import { listRegisteredCanvases } from './canvases';
import type { CanvasContribution } from './contribution';
import { attachPreviewShot } from './preview-image';
import { writeWorkspaceFile } from './workspace-file';
import './canvas-editor';

const VIEW_SLOTS = new Set([SIDEBAR_MAIN, SIDEBAR_AUXILIARY, PANEL_BOTTOM]);

export function canvasEditorInput(contribution: CanvasContribution, sourceText = ''): EditorInput {
    const hasSource = contribution.source !== undefined;
    const input = {
        key: `canvas:${contribution.name}`,
        title: contribution.label,
        icon: contribution.icon ?? 'table-columns',
        data: { contribution },
        state: { mode: 'preview' },
        component: () => html``,
    } as EditorInput;
    input.component = (id: string) => hasSource
        ? html`<docks-canvas-editor id="${id}" .input=${input} .source=${sourceText}></docks-canvas-editor>`
        : html`<docks-canvas-surface id="${id}" .input=${input}></docks-canvas-surface>`;
    (input as unknown as { editorId: string }).editorId = 'system.canvas-editor';
    return input;
}

export async function openCanvasByName(name: string): Promise<string> {
    const contribution = listRegisteredCanvases().find(item => item.name === name);
    if (!contribution) return `No canvas named ${name}`;
    const sourceText = typeof contribution.source === 'function' ? await contribution.source() : (contribution.source ?? '');
    await editorRegistry.loadEditor(canvasEditorInput(contribution, sourceText));
    return 'ready';
}

export async function openCanvasByPath(path: string): Promise<string> {
    const workspace = workspaceService.getWorkspaceSync() ?? await workspaceService.getWorkspace();
    if (!workspace) return 'No workspace is open';
    const resource = await workspace.getResource(path.replace(/^\/+/, ''));
    if (!(resource instanceof File)) return `Cannot find workspace file "${path}"`;
    await editorRegistry.loadEditor(resource, 'system.canvas-editor');
    return 'ready';
}

function viewName(path: string): string {
    return `canvas-view:${path}`;
}

export function showCanvasView(slot: string, path: string, source: string): string {
    if (!VIEW_SLOTS.has(slot)) return `Unsupported view slot ${slot}`;
    const name = viewName(path);
    contributionRegistry.unregisterContribution(slot, name);
    contributionRegistry.registerContribution(slot, {
        name,
        label: path.split('/').pop() || path,
        icon: 'table-columns',
        closable: true,
        component: (id: string) => html`<docks-canvas-surface id="${id}" .entryPath=${path} .source=${source}></docks-canvas-surface>`,
    });
    return 'ready';
}

export function hideCanvasView(slot: string, path: string): string {
    if (!VIEW_SLOTS.has(slot)) return `Unsupported view slot ${slot}`;
    contributionRegistry.unregisterContribution(slot, viewName(path));
    return 'ready';
}

function workspaceCanvas() {
    const active = readActiveCanvas();
    if (!active?.editor || active.kind !== 'workspace') return null;
    return active;
}

async function waitForCanvas(match: (active: NonNullable<ReturnType<typeof readActiveCanvas>>) => boolean) {
    for (let attempt = 0; attempt < 30; attempt++) {
        const active = readActiveCanvas();
        if (active?.reload && match(active)) return active;
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    return null;
}

export function registerCanvasCommands(): void {
    registerAll({
        command: {
            id: 'canvas.open',
            name: 'Open canvas',
            description: 'Opens a workspace .canvas.js path or a canvas registered on system.canvases and returns ready or a compile error',
            parameters: [
                { name: 'path', description: 'Workspace path of a .canvas.js file', required: false },
                { name: 'name', description: 'Name of a canvas registered on system.canvases', required: false },
            ],
        },
        handler: {
            execute: async ({ params }) => {
                const name = params?.name as string | undefined;
                const path = params?.path as string | undefined;
                if (name) {
                    const opened = await openCanvasByName(name);
                    if (opened !== 'ready') return opened;
                    const active = await waitForCanvas(item => item.canvasName === name);
                    return active?.reload ? active.reload() : opened;
                }
                if (path) {
                    const opened = await openCanvasByPath(path);
                    if (opened !== 'ready') return opened;
                    const normalized = path.replace(/^\/+/, '');
                    const active = await waitForCanvas(item => item.getFilePath?.()?.replace(/^\/+/, '') === normalized);
                    if (!active?.reload) return opened;
                    await active.syncFromFile?.();
                    return active.reload();
                }
                return 'Provide a workspace path or a registered canvas name';
            },
        },
    });

    registerAll({
        command: {
            id: 'canvas.apply_source',
            name: 'Apply canvas source',
            description: 'Updates an open canvas editor and recompiles its preview without saving. When that canvas is not open in an editor, writes the file instead.',
            parameters: [
                { name: 'source', description: 'Full canvas module source', required: true },
                { name: 'path', description: 'Workspace path of the canvas file. Required when that canvas is not open in an editor.', required: false },
            ],
        },
        handler: {
            execute: async ({ params }) => {
                const source = String(params?.source ?? '');
                const requested = typeof params?.path === 'string' ? params.path : undefined;
                const path = requested ?? workspaceCanvas()?.getFilePath?.() ?? undefined;
                const targets = path ? connectedWorkspaceEditors(path) : [];
                if (targets.length) {
                    let compiled = 'ready';
                    for (const editor of targets) {
                        if (!editor.setSource || !editor.reload) continue;
                        editor.setSource(source);
                        compiled = await editor.reload();
                    }
                    return compiled;
                }
                if (!path) return 'Provide a workspace path';
                return writeWorkspaceFile(path, source);
            },
        },
    });

    registerAll({
        command: {
            id: 'canvas.get_source',
            name: 'Get canvas source',
            description: 'Returns the current source buffer of the active workspace canvas',
            parameters: [],
        },
        handler: {
            canExecute: () => !!workspaceCanvas(),
            execute: async () => workspaceCanvas()?.getContent?.() ?? '',
        },
    });

    registerAll({
        command: {
            id: 'canvas.get_state',
            name: 'Get canvas state',
            description: 'Reads one persisted state value from the active workspace canvas',
            parameters: [{ name: 'key', description: 'State key', required: true }],
        },
        handler: {
            canExecute: () => !!workspaceCanvas(),
            execute: async ({ params }) => workspaceCanvas()?.getState?.(String(params?.key ?? '')),
        },
    });

    registerAll({
        command: {
            id: 'canvas.set_state',
            name: 'Set canvas state',
            description: 'Writes one persisted state value on the active workspace canvas',
            parameters: [
                { name: 'key', description: 'State key', required: true },
                { name: 'value', description: 'JSON value', required: true },
            ],
        },
        handler: {
            canExecute: () => !!workspaceCanvas(),
            execute: async ({ params }) => {
                const active = workspaceCanvas();
                if (!active?.setState) return 'No workspace canvas is active';
                active.setState(String(params?.key ?? ''), params?.value);
                return 'ready';
            },
        },
    });

    registerAll({
        command: {
            id: 'canvas.capture_preview',
            name: 'Capture canvas preview',
            description: 'Renders the open canvas preview to an image, attaches it to the session, and returns it for visual inspection. Content inside an iframe may be blank.',
            parameters: [],
        },
        handler: {
            canExecute: () => !!findOpenCanvas()?.capturePreview,
            execute: async () => {
                const active = findOpenCanvas();
                if (!active) return 'No canvas is open';
                return attachPreviewShot(active);
            },
        },
    });

    registerAll({
        command: {
            id: 'canvas.show_as_view',
            name: 'Show canvas as view',
            description: 'Pins the active workspace canvas preview into a sidebar or the bottom panel',
            parameters: [
                { name: 'slot', description: 'sidebar-main, sidebar-auxiliary, or panel-bottom', required: true },
            ],
        },
        handler: {
            canExecute: () => !!workspaceCanvas(),
            execute: async ({ params }) => {
                const active = workspaceCanvas();
                const path = active?.getFilePath?.();
                if (!active || !path) return 'No workspace canvas is active';
                return showCanvasView(String(params?.slot ?? ''), path, active.getContent?.() ?? '');
            },
        },
    });

    registerAll({
        command: {
            id: 'canvas.hide_view',
            name: 'Hide canvas view',
            description: 'Removes a pinned canvas preview from a sidebar or the bottom panel',
            parameters: [
                { name: 'slot', description: 'sidebar-main, sidebar-auxiliary, or panel-bottom', required: true },
                { name: 'path', description: 'Workspace path of the canvas file', required: false },
            ],
        },
        handler: {
            canExecute: () => !!workspaceCanvas(),
            execute: async ({ params }) => {
                const path = (params?.path as string | undefined) ?? workspaceCanvas()?.getFilePath?.() ?? '';
                if (!path) return 'No canvas path';
                return hideCanvasView(String(params?.slot ?? ''), path);
            },
        },
    });
}
