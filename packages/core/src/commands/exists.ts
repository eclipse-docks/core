import { registerAll } from "../core/commandregistry";
import { File, workspaceService } from "../core/filesys";

registerAll({
    command: {
        id: "exists",
        name: "Exists",
        description: "Checks if a file exists at the given path (like bash test -f)",
        parameters: [
            {
                name: "path",
                description: "Path of the file to check, relative to the workspace",
                required: true
            }
        ],
        output: [
            {
                name: "exists",
                description: "true if the file exists, false otherwise"
            }
        ]
    },
    handler: {
        execute: async ({ params }: any) => {
            const workspace = await workspaceService.getWorkspace();
            if (!workspace) return false;

            const path = params?.path;
            if (!path) return false;

            try {
                const resource = await workspace.getResource(path);
                return resource instanceof File;
            } catch {
                return false;
            }
        }
    }
});
