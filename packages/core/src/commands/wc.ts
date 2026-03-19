import { registerAll } from "../core/commandregistry";
import { toastError } from "../core/toast";
import { getTextFileFromPath, readTextFile } from "./shared";

registerAll({
    command: {
        id: "wc",
        name: "Word count",
        description: "Counts lines, words, and characters in a file",
        parameters: [
            {
                name: "path",
                description: "the path of the file to analyze",
                required: true
            }
        ],
        output: [
            {
                name: "lines",
                description: "number of lines in the file"
            },
            {
                name: "words",
                description: "number of words in the file"
            },
            {
                name: "characters",
                description: "number of characters in the file"
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

            const contents = await readTextFile(file);
            if (!contents) return;

            const lines = contents.split("\n");
            const trimmed = contents.trim();
            const wordCount = trimmed === "" ? 0 : trimmed.split(/\s+/).filter(w => w.length > 0).length;

            return {
                lines: lines.length,
                words: wordCount,
                characters: contents.length
            };
        }
    }
});
