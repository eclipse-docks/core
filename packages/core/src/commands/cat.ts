import { registerAll } from "../core/commandregistry";
import { toastError } from "../core/toast";
import { getTextFileFromPath, readTextFile } from "./shared";

registerAll({
    command: {
        id: "cat",
        name: "Cat - Show file contents",
        description: "Shows the complete contents of a file",
        parameters: [
            {
                name: "path",
                description: "the path of the file to read",
                required: true
            }
        ],
        output: [
            {
                name: "content",
                description: "the complete contents of the file"
            }
        ]
    },
    handler: {
        execute: async ({ params }: any) => {
            const path = params?.path;
            if (!path) {
                toastError("No file path provided.");
                return;
            }

            const file = await getTextFileFromPath(path);
            if (!file) return;

            return readTextFile(file);
        }
    }
});
