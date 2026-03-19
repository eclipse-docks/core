import { registerAll } from "../core/commandregistry";
import { activeSelectionSignal } from "../core/appstate";
import { Directory, workspaceService } from "../core/filesys";
import { confirmDialog } from "../dialogs";
import { toastError, toastInfo } from "../core/toast";

registerAll({
    command: {
        id: "rm",
        name: "rm - Delete a resource (file or directory)",
        description: "Deletes a resource (file or directory)",
        keyBinding: "Delete",
        parameters: [
            {
                name: "path",
                description: "the path of the resource within the workspace to delete or the currently active selection",
                required: false
            },
            {
                name: "confirm",
                description: "whether to ask the user to confirm the deletion, true by default",
                required: false
            }
        ]
    },
    handler: {
        execute: async (context: any) => {
            const workspaceDir = await workspaceService.getWorkspace();
            if (!workspaceDir) {
                toastError("No workspace selected.");
                return;
            }

            const path = context.params?.path as string | undefined;
            let resource: any = null;

            if (path) {
                resource = await workspaceDir.getResource(path);
            }
            if (!resource) {
                resource = activeSelectionSignal.get();
            }
            if (!resource) {
                toastError("No resource to delete provided!");
                return;
            }

            if (resource instanceof Directory && resource.getParent() === undefined) {
                toastError('Root folders cannot be deleted. Use "Disconnect folder" instead.');
                return;
            }

            const resourcePath = resource.getWorkspacePath();
            const confirmParam = context.params?.confirm;
            if (confirmParam === undefined || confirmParam === true) {
                const yes = await confirmDialog(`Are you sure you want to delete ${resourcePath}?`);
                if (!yes) return;
            }

            try {
                await resource.delete();
                toastInfo("Resource deleted: " + resourcePath);
            } catch (err: any) {
                toastError(`Resource ${resourcePath} could not be deleted: ${err.message ?? err}`);
            }
        }
    }
});
