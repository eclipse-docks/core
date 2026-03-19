import { registerAll } from "../core/commandregistry";
import { activeSelectionSignal } from "../core/appstate";
import { Directory, File, workspaceService } from "../core/filesys";
import { promptDialog } from "../dialogs";
import { toastError, toastInfo } from "../core/toast";

function normalizeTargetPath(inputPath: string): string {
    return inputPath.replace(/^\/+/, "").replace(/\/+$/, "");
}

function resolveSelectionBasePath(): string | undefined {
    const selection = activeSelectionSignal.get();
    if (selection instanceof Directory) {
        return selection.getWorkspacePath();
    }
    if (selection instanceof File) {
        return selection.getParent()?.getWorkspacePath();
    }
    return undefined;
}

function joinPath(basePath: string | undefined, name: string): string {
    if (!basePath) return name;
    return `${basePath}/${name}`;
}

async function getDefaultFolderPath(basePath: string | undefined): Promise<string | undefined> {
    const workspaceDir = await workspaceService.getWorkspace();
    if (!workspaceDir) {
        toastError("No workspace selected.");
        return;
    }

    const baseName = "New Folder";
    let candidate = joinPath(basePath, baseName);
    let existing = await workspaceDir.getResource(candidate);
    if (!existing) {
        return candidate;
    }

    let suffix = 0;
    while (true) {
        candidate = joinPath(basePath, `${baseName} (${suffix})`);
        existing = await workspaceDir.getResource(candidate);
        if (!existing) {
            return candidate;
        }
        suffix++;
    }
}

registerAll({
    command: {
        id: "mkdir",
        name: "mkdir - Create new folder",
        description: "Creates a new folder within the workspace.",
        parameters: [
            {
                name: "path",
                description: "the folder path to create, relative to the workspace",
                required: false
            },
            {
                name: "ask",
                description: "whether to prompt the user for the folder path",
                required: false
            }
        ],
        output: [
            {
                name: "path",
                description: "the path of the created folder"
            }
        ]
    },
    handler: {
        execute: async ({ params }: any) => {
            const ask = params?.ask;
            let path = params?.path as string | undefined | null;
            const defaultPath = await getDefaultFolderPath(resolveSelectionBasePath());
            if (!defaultPath) return;

            if (ask || !path) {
                path = await promptDialog("Enter path to new folder:", path || defaultPath);
                if (!path) return;
            }

            const isAbsolute = path.startsWith("/");
            let normalizedPath = normalizeTargetPath(path);
            if (!normalizedPath) {
                toastError("Folder path must not be empty.");
                return;
            }

            if (!isAbsolute) {
                const basePath = resolveSelectionBasePath();
                if (basePath && !normalizedPath.startsWith(basePath + "/")) {
                    normalizedPath = `${basePath}/${normalizedPath}`;
                }
            }

            const workspaceDir = await workspaceService.getWorkspace();
            if (!workspaceDir) {
                toastError("No workspace selected.");
                return;
            }

            const existingResource = await workspaceDir.getResource(normalizedPath);
            if (existingResource instanceof Directory) {
                toastInfo(`Folder already exists: ${normalizedPath}`);
                return normalizedPath;
            }
            if (existingResource instanceof File) {
                toastError(`Cannot create folder. A file already exists at "${normalizedPath}".`);
                return;
            }

            const createdDirectory = await workspaceDir.getResource(`${normalizedPath}/`, { create: true });
            if (!(createdDirectory instanceof Directory)) {
                toastError(`Could not create folder: ${normalizedPath}`);
                return;
            }

            toastInfo(`Folder created: ${normalizedPath}`);
            return normalizedPath;
        }
    }
});
