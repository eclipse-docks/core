import { COMMAND_TAG_SHELL, registerAll } from "../core/commandregistry";
import { activeSelectionSignal } from "../core/appstate";
import { Directory, File, workspaceService } from "../core/filesys";
import { askText, askYes } from "./prompt";
import { toastError, toastInfo } from "../core/toast";

registerAll({
    command: {
        id: "touch",
        name: "Touch - Create new file",
        description: "Creates a new file within the workspace. For .docks map files, use create_map_file instead.",
        tags: [COMMAND_TAG_SHELL],
        grants: ["w"],
        parameters: [
            {
                name: "path",
                description: "the path including name of the file to be created, must be relative to the workspace",
                required: false
            },
            {
                name: "contents",
                description: "the textual contents of the file",
                required: false
            },
            {
                name: "ask",
                description: "whether to prompt the user for the file path",
                required: false
            },
            {
                name: "extension",
                description: "required file extension (e.g., '.docks'), will be appended if missing",
                required: false
            }
        ],
        output: [
            {
                name: "path",
                description: "the path of the created file"
            }
        ]
    },
    handler: {
        execute: async (context: any) => {
            const params = context.params;
            let path = params?.path as string | undefined | null;
            const contents = params?.contents as string | undefined;
            const ask = params?.ask;
            const extension = params?.extension as string | undefined;

            if (ask || !path) {
                path = await askText(context, "Enter path to new file (directories will be created if not exist):", path || "");
                if (!path) return;
            }

            if (extension && !path.endsWith(extension)) {
                path += extension;
            }

            const isAbsolute = path.startsWith("/");
            if (!isAbsolute) {
                const selection = activeSelectionSignal.get();
                const dirPath = selection instanceof Directory
                    ? selection.getWorkspacePath()
                    : selection instanceof File
                        ? selection.getParent()?.getWorkspacePath()
                        : undefined;
                if (dirPath && !path.startsWith(dirPath + "/")) {
                    path = dirPath + "/" + path;
                }
            } else {
                path = path.slice(1);
            }

            const workspaceDir = await workspaceService.getWorkspace();
            if (!workspaceDir) {
                toastError("No workspace selected.");
                return;
            }

            const existingResource = await workspaceDir.getResource(path);
            if (existingResource) {
                const overwrite = await askYes(context, `File "${path}" already exists. Do you want to overwrite it?`);
                if (!overwrite) return;
            }

            const createdResource = await workspaceDir.getResource(path, { create: true });
            if (!(createdResource instanceof File)) {
                toastError("Could not create file: " + path);
                return;
            }

            if (contents) {
                await createdResource.saveContents(contents);
            }

            toastInfo(`File created: ${path}`);
            return path;
        }
    }
});
