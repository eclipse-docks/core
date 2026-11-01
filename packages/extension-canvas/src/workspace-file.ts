import { File, workspaceService } from '@eclipse-docks/core';
import type { CanvasFileBytes } from './compile';

const TEXT_EXT = new Set(['js', 'mjs', 'css', 'json', 'svg', 'txt', 'md', 'html', 'csv']);

export async function readWorkspaceFile(path: string): Promise<CanvasFileBytes | null> {
    const workspace = workspaceService.getWorkspaceSync() ?? await workspaceService.getWorkspace();
    if (!workspace) return null;
    const resource = await workspace.getResource(path.replace(/^\/+/, ''));
    if (!(resource instanceof File)) return null;
    const ext = path.split('.').pop()?.toLowerCase() ?? '';
    if (TEXT_EXT.has(ext) || path.endsWith('.canvas.js')) {
        const text = await resource.getContents();
        return { text: typeof text === 'string' ? text : String(text ?? '') };
    }
    const blob = await resource.getContents({ blob: true });
    if (blob instanceof Blob) return { bytes: new Uint8Array(await blob.arrayBuffer()) };
    if (blob instanceof Uint8Array) return { bytes: blob };
    if (typeof blob === 'string') return { text: blob };
    return null;
}

export async function writeWorkspaceFile(path: string, contents: string): Promise<File | null> {
    const workspace = workspaceService.getWorkspaceSync() ?? await workspaceService.getWorkspace();
    if (!workspace) return null;
    const resource = await workspace.getResource(path.replace(/^\/+/, ''), { create: true });
    if (!(resource instanceof File)) return null;
    await resource.saveContents(contents);
    return resource;
}
