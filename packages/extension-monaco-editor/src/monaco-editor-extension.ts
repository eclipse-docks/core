import { html } from "lit";
import { EditorInput, editorRegistry, File } from "@eclipse-lyra/core";

import "./monaco-widget";

editorRegistry.registerEditorInputHandler({
    editorId: "system.monaco-editor",
    label: "Code",
    icon: "file-pen",
    lazyInit: async () => {
        await import('./monaco-editor');
    },
    canHandle: (input: unknown) =>
        input instanceof File && !input.getName().toLowerCase().endsWith(".py"),
    handle: async (input: File) => {
        const editorInput = {
            title: input.getName(),
            data: input,
            key: input.getName(),
            icon: "file-pen",
            noOverflow: false,
            state: {},
        } as EditorInput
        editorInput.component = () => html`
            <lyra-monaco-editor .input=${editorInput}></lyra-monaco-editor>`
        return editorInput;
    }
})
