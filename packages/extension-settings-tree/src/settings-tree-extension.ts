import { html } from "lit";
import {
    type EditorInput,
    editorRegistry,
    commandRegistry,
    contributionRegistry,
    TOOLBAR_MAIN_RIGHT,
} from "@eclipse-lyra/core";
import "./settings-tree";

export default (_uiContext: unknown) => {
    editorRegistry.registerEditorInputHandler({
        editorId: "system.settings-tree",
        label: "Settings",
        ranking: 1000,
        canHandle: (input: EditorInput) => input.key === '.system.settings',
        handle: async (input: EditorInput) => {
            input.component = () => html`
                <lyra-settings-tree .input=${input}></lyra-settings-tree>
            `;
            return input;
        },
    });

    commandRegistry.registerHandler("open_settings", {
        ranking: 100,
        execute: () => {
            const editorInput = {
                title: "Settings",
                data: {},
                key: ".system.settings",
                icon: "gear",
                state: {},
            } as EditorInput;
            editorRegistry.loadEditor(editorInput);
        },
    });

    contributionRegistry.registerContribution(TOOLBAR_MAIN_RIGHT, {
        command: "open_settings",
        icon: "gear",
        label: "Settings",
    });
};
