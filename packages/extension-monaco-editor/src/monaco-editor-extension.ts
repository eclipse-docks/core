import { html } from "lit";
import { EditorInput, editorRegistry, File } from "@eclipse-docks/core";

editorRegistry.registerEditorInputHandler({
    editorId: "system.monaco-editor",
    label: "Code",
    icon: "file-pen",
    lazyInit: async () => {
        await import('./monaco-widget');
        await import('./monaco-editor');
    },
    canHandle: (input: unknown) =>
        input instanceof File,
    handle: async (input: File) => {
        const editorInput = {
            title: input.getWorkspacePath(),
            data: input,
            key: input.getWorkspacePath(),
            icon: editorRegistry.getFileIcon(input.getName()),
            state: {},
        } as EditorInput
        editorInput.component = (id: string) => html`
            <docks-monaco-editor id=${id} .input=${editorInput}></docks-monaco-editor>`
        return editorInput;
    }
})
