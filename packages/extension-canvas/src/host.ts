import { appSettings, editorRegistry, File, workspaceService } from '@eclipse-docks/core';
import type { CanvasContribution } from './contribution';

export interface CanvasHost {
    getState(key: string, fallback?: unknown): unknown;
    setState(key: string, value: unknown): void;
    openFile(path: string): void;
}

export function createMemoryHost(initial: Record<string, unknown>, persist: (state: Record<string, unknown>) => void): CanvasHost {
    const state = { ...initial };
    return {
        getState(key, fallback) {
            return state[key] === undefined ? fallback : state[key];
        },
        setState(key, value) {
            state[key] = value;
            persist(state);
        },
        openFile(path) {
            void openWorkspaceFile(path);
        },
    };
}

export async function createFileHost(file: File): Promise<CanvasHost> {
    const initial = await readSidecar(file);
    return createMemoryHost(initial, state => {
        void writeSidecar(file, state);
    });
}

export async function createContributionHost(contribution: CanvasContribution): Promise<CanvasHost> {
    const key = `canvas.${contribution.name}`;
    const stored = await appSettings.get(key);
    const initial = stored && typeof stored === 'object' ? stored as Record<string, unknown> : {};
    return createMemoryHost(initial, state => {
        void appSettings.set(key, state);
    });
}

function sidecarName(fileName: string): string {
    return fileName.replace(/\.canvas\.js$/i, '.canvas.data.json');
}

async function readSidecar(file: File): Promise<Record<string, unknown>> {
    const parent = file.getParent();
    if (!parent) return {};
    const resource = await parent.getResource(sidecarName(file.getName()));
    if (!(resource instanceof File)) return {};
    try {
        const parsed = JSON.parse(await resource.getContents());
        return parsed && typeof parsed === 'object' ? parsed as Record<string, unknown> : {};
    } catch {
        return {};
    }
}

async function writeSidecar(file: File, state: Record<string, unknown>): Promise<void> {
    const parent = file.getParent();
    if (!parent) return;
    const name = sidecarName(file.getName());
    let resource = await parent.getResource(name);
    if (!(resource instanceof File)) {
        resource = await parent.getResource(name, { create: true }) as File | null;
    }
    if (!(resource instanceof File)) return;
    await resource.saveContents(JSON.stringify(state));
}

async function openWorkspaceFile(path: string): Promise<void> {
    const workspace = workspaceService.getWorkspaceSync() ?? await workspaceService.getWorkspace();
    if (!workspace) return;
    const resource = await workspace.getResource(path.replace(/^\/+/, ''));
    if (resource instanceof File) await editorRegistry.loadEditor(resource);
}
