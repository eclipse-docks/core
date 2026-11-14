import { COMMAND_TAG_SHELL, registerAll } from "../core/commandregistry";
import { Directory, workspaceService } from "../core/filesys";
import { toastError } from "../core/toast";
import { namesWorkspaceRoot, resolveWorkspacePath } from "./shell-path";

registerAll({
    command: {
        id: "cd",
        name: "cd",
        description: "Changes the shell working directory",
        tags: [COMMAND_TAG_SHELL],
        grants: ["r"],
        parameters: [
            {
                name: "path",
                description: "directory to enter, relative to the current shell directory. Omit to return to the directory the session was opened with",
                required: false
            }
        ],
        output: [
            {
                name: "cwd",
                description: "the shell working directory after the change"
            }
        ]
    },
    handler: {
        execute: async (context) => {
            if (context.cwd === undefined) {
                toastError("No shell session.");
                return;
            }

            const requested = context.params?.path as string | undefined;
            if (!requested) {
                return { cwd: context.initialCwd ?? "" };
            }

            const rootNames = (await workspaceService.getFolders()).map((folder) => folder.name);
            const base = namesWorkspaceRoot(requested, rootNames) ? "" : context.cwd;
            const next = resolveWorkspacePath(base, requested);
            if (next === null) {
                toastError("Cannot leave the workspace root.");
                return;
            }
            if (!next) {
                return { cwd: "" };
            }

            const workspace = await workspaceService.getWorkspace();
            if (!workspace) {
                toastError("No workspace selected.");
                return;
            }
            const resource = await workspace.getResource(next);
            if (!(resource instanceof Directory)) {
                toastError(`Not a directory: ${next}`);
                return;
            }
            return { cwd: next };
        }
    }
});
