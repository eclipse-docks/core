import { Directory, File } from "../core/filesys";
import { toastError } from "../core/toast";
import { workspaceService } from "../core/filesys";

export async function getTextFileFromPath(path: string): Promise<File | null> {
    const workspaceDir = await workspaceService.getWorkspace();
    if (!workspaceDir) {
        toastError("No workspace selected.");
        return null;
    }

    try {
        const resource = await workspaceDir.getResource(path);
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
