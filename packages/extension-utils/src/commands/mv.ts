import { workspaceService, activeSelectionSignal, promptDialog, toastError, toastInfo, registerAll } from "@eclipse-lyra/core";

registerAll({
  command: {
    id: "mv",
    name: "mv - Rename a resource (file or directory)",
    description: "Renames a resource (file or directory)",
    keyBinding: "F2",
    parameters: [
      {
        name: "path",
        description: "the path of the resource within the workspace to rename or the currently active selection",
        required: false
      },
      {
        name: "newName",
        description: "the new name for the resource",
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
        toastError("No resource to rename provided!");
        return;
      }

      const currentName = resource.getName();
      const newName =
        context.params?.newName ??
        (await promptDialog(`Enter new name for "${currentName}":`, currentName));

      if (!newName || newName === currentName) {
        return;
      }

      try {
        await resource.rename(newName);
        toastInfo(`Resource renamed to: ${newName}`);
      } catch (err: any) {
        toastError(`Failed to rename ${currentName}: ${err.message ?? err}`);
      }
    }
  }
});

