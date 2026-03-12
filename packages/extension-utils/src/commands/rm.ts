import { workspaceService, activeSelectionSignal, confirmDialog, toastError, toastInfo, registerAll } from "@eclipse-lyra/core";

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

      const resourcePath = resource.getWorkspacePath();
      const confirmParam = context.params && context.params["confirm"];
      let yes = true;
      if (confirmParam === undefined || confirmParam === true) {
        yes = await confirmDialog(`Are you sure you want to delete ${resourcePath}?`);
      }

      if (!yes) {
        return;
      }

      try {
        await resource.delete();
        toastInfo("Resource deleted: " + resourcePath);
      } catch (err: any) {
        toastError(
          `Resource ${resourcePath} could not be deleted: ${err.message ?? err}`
        );
      }
    }
  }
});

