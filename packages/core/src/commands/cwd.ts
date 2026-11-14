import { COMMAND_TAG_SHELL, registerAll } from "../core/commandregistry";
import { toastError } from "../core/toast";

registerAll({
    command: {
        id: "cwd",
        name: "cwd",
        description: "Prints the shell working directory",
        tags: [COMMAND_TAG_SHELL],
        grants: ["r"],
        parameters: [],
        output: [
            {
                name: "cwd",
                description: "the shell working directory. / is the workspace root"
            }
        ]
    },
    handler: {
        execute: async (context) => {
            if (context.cwd === undefined) {
                toastError("No shell session.");
                return;
            }
            return context.cwd === "" ? "/" : context.cwd;
        }
    }
});
