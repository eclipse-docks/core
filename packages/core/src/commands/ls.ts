import { COMMAND_TAG_SHELL, registerAll } from "../core/commandregistry";
import { Directory, File, workspaceService } from "../core/filesys";
import { toastError } from "../core/toast";
import { collectFilesRecursive, resolveWorkspaceResource } from "./shared";

registerAll({
    command: {
        id: "ls",
        name: "List files",
        description: "Lists files from a directory. If recursive is provided, it traverses from the provided directory down to all leaves. If no directory is provided, it will traverse from the workspace root.",
        tags: [COMMAND_TAG_SHELL],
        grants: ["r"],
        parameters: [
            {
                name: "path",
                description: "the path of the directory to list, relative to the workspace. If not provided, uses workspace root",
                required: false
            },
            {
                name: "recursive",
                description: "whether to recursively traverse all subdirectories",
                type: "boolean",
                required: false
            }
        ],
        output: [
            {
                name: "files",
                description: "array of file objects with path and size information"
            }
        ]
    },
    handler: {
        execute: async ({ params }: any) => {
            const path = params?.path as string | undefined;
            const recursive = params?.recursive === true || params?.recursive === "true";

            try {
                let targetDir: Directory;
                if (path) {
                    const resource = await resolveWorkspaceResource(path);
                    if (!resource) {
                        toastError(`Path not found: ${path}`);
                        return [];
                    }
                    if (!(resource instanceof Directory)) {
                        toastError(`Path is not a directory: ${path}`);
                        return [];
                    }
                    targetDir = resource;
                } else {
                    const workspace = await workspaceService.getWorkspace();
                    if (!workspace) {
                        toastError("No workspace available");
                        return [];
                    }
                    targetDir = workspace;
                }

                if (recursive) {
                    const files = await collectFilesRecursive(targetDir);
                    const result: Array<{ path: string; size: number | null }> = [];
                    for (const filePath of files) {
                        const file = await resolveWorkspaceResource(filePath);
                        if (!(file instanceof File)) continue;
                        result.push({ path: filePath, size: await file.size() });
                    }
                    return result;
                }

                const children = await targetDir.listChildren(true);
                const result: Array<{ path: string; kind: 'file' | 'directory'; size: number | null }> = [];
                for (const child of children) {
                    if (child instanceof Directory) {
                        result.push({ path: child.getWorkspacePath(), kind: 'directory', size: null });
                        continue;
                    }
                    if (!(child instanceof File)) continue;
                    result.push({
                        path: child.getWorkspacePath(),
                        kind: 'file',
                        size: await child.size(),
                    });
                }
                return result;
            } catch (err: any) {
                toastError(`Failed to list files: ${err.message ?? err}`);
                return [];
            }
        }
    }
});
