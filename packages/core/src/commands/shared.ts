import { Directory, File, getInMemoryRoot, IN_MEMORY_ROOT_NAME, workspaceService } from "../core/filesys";
import { toastError } from "../core/toast";

function stripWorkspaceSlashes(path: string): string {
    return path.replace(/^\/+|\/+$/g, "");
}

/** `in-memory` and `in-memory/…` live outside the mounted workspace composite. */
export function isInMemoryWorkspacePath(path: string): boolean {
    const normalized = stripWorkspaceSlashes(path);
    return normalized === IN_MEMORY_ROOT_NAME || normalized.startsWith(`${IN_MEMORY_ROOT_NAME}/`);
}

async function inMemoryResource(path: string): Promise<File | Directory | null> {
    const normalized = stripWorkspaceSlashes(path);
    const root = getInMemoryRoot();
    if (normalized === IN_MEMORY_ROOT_NAME) return root;
    const relative = normalized.slice(`${IN_MEMORY_ROOT_NAME}/`.length);
    return await root.getResource(relative) as File | Directory | null;
}

/** A workspace path, or an `in-memory/…` path that is not mounted in the composite. */
export async function resolveWorkspaceResource(path: string): Promise<File | Directory | null> {
    if (isInMemoryWorkspacePath(path)) return inMemoryResource(path);
    const workspace = await workspaceService.getWorkspace();
    if (!workspace) return null;
    return await workspace.getResource(path) as File | Directory | null;
}

export async function getTextFileFromPath(path: string): Promise<File | null> {
    try {
        if (!isInMemoryWorkspacePath(path)) {
            const workspaceDir = await workspaceService.getWorkspace();
            if (!workspaceDir) {
                toastError("No workspace selected.");
                return null;
            }
        }
        const resource = await resolveWorkspaceResource(path);
        if (!(resource instanceof File)) {
            toastError("File not found: " + path);
            return null;
        }
        return resource;
    } catch (err: any) {
        toastError(`Failed to access file: ${err.message ?? err}`);
        return null;
    }
}

export async function readTextFile(file: File): Promise<string | null> {
    try {
        const contents = await file.getContents();
        if (typeof contents !== "string") {
            toastError("File is not a text file");
            return null;
        }
        return contents;
    } catch (err: any) {
        toastError(`Failed to read file: ${err.message ?? err}`);
        return null;
    }
}

export async function collectFilesRecursive(directory: Directory): Promise<string[]> {
    const files: string[] = [];
    const children = await directory.listChildren(true);

    for (const child of children) {
        if (child instanceof File) {
            files.push(child.getWorkspacePath());
            continue;
        }
        if (child instanceof Directory) {
            files.push(...await collectFilesRecursive(child));
        }
    }

    return files;
}
