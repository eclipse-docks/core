import { html } from "lit";
import type { EditorInput } from "@eclipse-docks/core";
import { File } from "@eclipse-docks/core";
import { activeEditorSignal } from "@eclipse-docks/core";
import type { ExecutionContext } from "@eclipse-docks/core";
import { registerAll, commandRegistry, contributionRegistry } from "@eclipse-docks/core";
import { registerNotebookCatalog } from "./notebook-catalog";
import { isNotebookEditorLike } from "./notebook-types";
import { TARGET_NOTEBOOK_KERNELS, type NotebookKernelContribution } from "./notebook-kernel-api";
import { javascriptKernelContribution } from "./javascript-kernel";
import { buildDefaultNotebook } from "./notebook-default-content";

function resolveKernel(kernelId?: string) {
    const contributions = contributionRegistry.getContributions<NotebookKernelContribution>(TARGET_NOTEBOOK_KERNELS);
    if (kernelId) {
        return contributions.find((c) => c.id === kernelId) ?? javascriptKernelContribution;
    }
    return javascriptKernelContribution;
}

export default ({ editorRegistry }: any) => {
    registerNotebookCatalog();
    contributionRegistry.registerContribution(TARGET_NOTEBOOK_KERNELS, javascriptKernelContribution);

    registerAll({
        command: {
            id: "notebook.runCell",
            name: "Run notebook cell",
            description: "Executes the focused or specified code cell in the active notebook editor",
            parameters: [
                {
                    name: "cellIndex",
                    description: "Zero-based index of the cell to run",
                    required: false,
                },
            ],
        },
        handler: {
            ranking: 10,
            canExecute: (context: ExecutionContext) => {
                const activeEditor = activeEditorSignal.get();
                if (isNotebookEditorLike(activeEditor)) {
                    const cellIndex = context.params?.cellIndex;
                    if (cellIndex !== undefined) {
                        return cellIndex >= 0 && cellIndex < (activeEditor.notebook?.cells.length ?? 0);
                    }
                    return activeEditor.focusedCellIndex >= 0;
                }
                return false;
            },
            execute: async (context: ExecutionContext) => {
                const activeEditor = activeEditorSignal.get();
                if (isNotebookEditorLike(activeEditor)) {
                    const cellIndex = context.params?.cellIndex ?? activeEditor.focusedCellIndex;
                    if (cellIndex >= 0) {
                        await activeEditor.executeCell(cellIndex);
                    }
                }
            },
        },
    });

    registerAll({
        command: {
            id: "notebook.create",
            name: "Create Jupyter Notebook",
            description: "Creates a new .ipynb notebook with starter cells for the selected kernel",
            parameters: [
                {
                    name: "path",
                    description: "File path relative to the workspace",
                    required: false,
                },
                {
                    name: "ask",
                    description: "Whether to prompt the user for the file path",
                    required: false,
                },
                {
                    name: "kernel",
                    description: "Notebook kernel id (e.g. javascript, python)",
                    required: false,
                },
            ],
            output: [
                {
                    name: "path",
                    description: "Path of the created notebook",
                },
            ],
        },
        handler: {
            execute: async (context: ExecutionContext) => {
                const kernel = resolveKernel(context.params?.kernel);
                const contents = JSON.stringify(buildDefaultNotebook(kernel), null, 2);
                return commandRegistry.execute(
                    "touch",
                    commandRegistry.createExecutionContext({
                        path: context.params?.path ?? "notebook.ipynb",
                        extension: ".ipynb",
                        ask: context.params?.ask ?? true,
                        contents,
                    }),
                );
            },
        },
        contribution: {
            target: "filebrowser.create",
            name: "filebrowser.create.notebook",
            label: "Jupyter Notebook",
            icon: "docks jupyter",
            params: {
                path: "notebook.ipynb",
                ask: true,
            },
        },
    });

    editorRegistry.registerEditorInputHandler({
        editorId: "system.notebooeditor",
        label: "Jupyter Notebook",
        icon: "docks jupyter",
        lazyInit: () => import('./notebook-runtime'),
        canHandle: (input: any) => input instanceof File && input.getName().toLowerCase().endsWith(".ipynb"),
        handle: async (input: File) => {
            const editorInput = {
                title: input.getWorkspacePath(),
                data: input,
                key: input.getWorkspacePath(),
                icon: editorRegistry.getFileIcon(input.getName()),
                state: {},
            } as EditorInput;
            editorInput.component = (id: string) => html`
                <docks-notebook-editor id="${id}" .input=${editorInput}></docks-notebook-editor>`;
            return editorInput;
        },
        ranking: 100,
    });
};
