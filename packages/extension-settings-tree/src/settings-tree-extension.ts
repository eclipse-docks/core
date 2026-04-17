import { html } from "lit";
import {
    type EditorInput,
    editorRegistry,
    commandRegistry,
    contributionRegistry,
    SIDEBAR_MAIN_TOOLBAR,
} from "@eclipse-docks/core";
import "./settings-tree";

export default (_uiContext: unknown) => {
    editorRegistry.registerEditorInputHandler({
        editorId: "system.settings-tree",
        label: "Settings",
        ranking: 1000,
        canHandle: (input: EditorInput) => input.key === '.system.settings',
        handle: async (input: EditorInput) => {
            input.component = (id: string) => html`
                <docks-settings-tree id="${id}" .input=${input}></docks-settings-tree>
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
                icon: "docks settings",
                state: {},
            } as EditorInput;
            editorRegistry.loadEditor(editorInput);
        },
    });

    contributionRegistry.registerContribution(SIDEBAR_MAIN_TOOLBAR, {
        command: "open_settings",
        icon: "docks settings",
        label: "Settings",
    });

    contributionRegistry.registerContribution(SIDEBAR_MAIN_TOOLBAR, {
        command: "open_extensions",
        icon: "docks extensions",
        label: "Extensions",
    });
};
