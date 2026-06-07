import {
    registerAll,
    toastInfo,
    toastError,
    editorRegistry,
    File,
    type EditorInput,
    contributionRegistry,
} from "@eclipse-docks/core";
import { TARGET_NOTEBOOK_KERNELS } from "@eclipse-docks/extension-notebook";
import { registerTerminalProfile } from "@eclipse-docks/extension-terminal/api";
import { html } from "@eclipse-docks/core/externals/lit";

type EditorWithLanguage = { isLanguage?(lang: string): boolean };
import { PyEnv } from "./pyservice";
import { pythonNotebookKernelContribution } from "./python-notebook-kernel";
import { PythonReplBackend, PYTHON_REPL_PROFILE_ID } from "./python-terminal-backend";

contributionRegistry.registerContribution(TARGET_NOTEBOOK_KERNELS, pythonNotebookKernelContribution);

registerTerminalProfile({
  id: PYTHON_REPL_PROFILE_ID,
  label: "Python REPL",
  icon: "docks python",
  create: async () => new PythonReplBackend(),
});

import { parsePackagesFromContent } from "./editor-python-run";
import { pythonPackageManagerService } from "./package-manager";

export { PyEnv } from "./pyservice";
export { pythonPackageManagerService } from "./package-manager";

registerAll({
    command: {
        id: "python",
        name: "Run Python Script",
        description: "Executes a Python script given its file path",
        parameters: [
            { name: "script", description: "the path to a Python script to run", required: false },
        ],
    },
    handler: {
        execute: async (context: any) => {
            const script: string = context.params?.["script"];
            if (!script) return;
            const pyenv = new PyEnv();
            await pyenv.init({ params: context.params });
            await pyenv.execScript(script);
        },
    },
});

registerAll({
    command: {
        id: "python.openEditorPackageManager",
        name: "Manage packages",
        description: "Manage Python packages for the editor environment",
        parameters: [],
    },
    handler: {
        canExecute: (ctx) => !!(ctx.activeEditor as EditorWithLanguage)?.isLanguage?.("python"),
        execute: async (ctx) => {
            const ed = ctx.activeEditor as { getContent?: () => string; getPyEnv?: () => PyEnv | undefined } | undefined;
            if (!ed) {
                toastError("No active editor");
                return;
            }
            const content = ed?.getContent?.() ?? "";
            const packages = parsePackagesFromContent(content);
            const pyenv = ed.getPyEnv?.();
            pythonPackageManagerService.showPackageManager({
                packages,
                pyenv,
            });
        },
    },
});

editorRegistry.registerEditorInputHandler({
    editorId: "system.python-editor",
    label: "Python",
    icon: "docks python",
    lazyInit: async () => {
        await import("./python-editor");
    },
    canHandle: (input: unknown) =>
        input instanceof File && input.getName().toLowerCase().endsWith(".py"),
    ranking: 1000,
    handle: async (input: File) => {
        const editorInput: EditorInput = {
            title: input.getWorkspacePath(),
            data: input,
            key: input.getWorkspacePath(),
            icon: editorRegistry.getFileIcon(input.getName()),
            state: {},
            component: () => null as any,
        };

        editorInput.component = (id: string) =>
            html`<docks-python-editor id="${id}" .input=${editorInput}></docks-python-editor>`;

        return editorInput;
    },
});
