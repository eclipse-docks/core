import {
    rootContext,
    registerAll,
    commandRegistry,
    workspaceService,
    toastInfo,
    toastError,
    editorRegistry,
    File,
    type EditorInput,
} from "@eclipse-lyra/core";
import { html } from "lit";

type EditorWithLanguage = { isLanguage?(lang: string): boolean };
import { PyEnv } from "./pyservice";
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
            await pyenv.init(undefined, { params: context.params });
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
    icon: "python",
    lazyInit: async () => {
        await import("./python-editor");
    },
    canHandle: (input: unknown) =>
        input instanceof File && input.getName().toLowerCase().endsWith(".py"),
    ranking: 1000,
    handle: async (input: File) => {
        const editorInput: EditorInput = {
            title: input.getName(),
            data: input,
            key: input.getName(),
            icon: "python",
            noOverflow: false,
            state: {},
            component: () => null as any,
        };

        editorInput.component = () =>
            html`<lyra-python-editor .input=${editorInput}></lyra-python-editor>`;

        return editorInput;
    },
});
