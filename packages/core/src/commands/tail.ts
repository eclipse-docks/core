import { registerAll } from "../core/commandregistry";
import { toastError } from "../core/toast";
import { getTextFileFromPath, readTextFile } from "./shared";

registerAll({
    command: {
        id: "tail",
        name: "Tail - Show last lines",
        description: "Shows the last N lines of a file",
        parameters: [
            {
                name: "path",
                description: "the path of the file to read",
                required: true
            },
            {
                name: "lines",
                description: "number of lines to show from the end (default: 10)",
                type: "number",
                required: false
            }
        ],
        output: [
            {
                name: "content",
                description: "the last N lines of the file"
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

            const numLines = params?.lines ? parseInt(params.lines, 10) : 10;
            if (Number.isNaN(numLines) || numLines < 1) {
                toastError("Number of lines must be a positive integer");
                return;
            }

            const contents = await readTextFile(file);
            if (!contents) return;

            return contents.split("\n").slice(-numLines).join("\n");
        }
    }
});
