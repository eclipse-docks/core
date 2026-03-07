import { html } from "lit";
import { contributionRegistry, type HTMLContribution } from "../core/contributionregistry";
import {
    SIDEBAR_MAIN,
    TOOLBAR_BOTTOM_END,
    TOOLBAR_MAIN_RIGHT
} from "../core/constants";

contributionRegistry.registerContribution(SIDEBAR_MAIN, {
    name: "filebrowser",
    label: "Workspace",
    icon: "folder-open",
    component: (id: string) => html`<lyra-filebrowser id="${id}"></lyra-filebrowser>`
});

contributionRegistry.registerContribution("system.fastviews-bottomend", {
    name: "log-terminal",
    label: "Log Messages",
    icon: "list",
    component: (id: string) => html`<lyra-log-terminal id="${id}"></lyra-log-terminal>`
});

contributionRegistry.registerContribution(TOOLBAR_BOTTOM_END, {
    label: "Info",
    icon: "circle-info",
    command: "show_version_info",
    showLabel: true,
});

contributionRegistry.registerContribution(TOOLBAR_BOTTOM_END, {
    label: `Fast Views`,
    component: `<lyra-fastviews target="system.fastviews-bottomend" icon="bolt" title="Fast Views"></lyra-fastviews>`
});

contributionRegistry.registerContribution(TOOLBAR_BOTTOM_END, {
    label: "Language",
    component: () => html`<lyra-language-selector></lyra-language-selector>`
});

contributionRegistry.registerContribution(TOOLBAR_MAIN_RIGHT, {
    label: "App Switcher",
    component: () => html`<lyra-layout-switcher></lyra-layout-switcher>`
} as HTMLContribution);

