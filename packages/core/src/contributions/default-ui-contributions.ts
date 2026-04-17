import { html } from "lit";
import { contributionRegistry, type HTMLContribution } from "../core/contributionregistry";
import {
    PANEL_BOTTOM,
    SIDEBAR_MAIN,
    TOOLBAR_BOTTOM_END,
    TOOLBAR_MAIN_RIGHT
} from "../core/constants";
import {
    VIEW_FILEBROWSER,
    VIEW_LOG_TERMINAL,
    TOOLBAR_APP_SWITCHER,
    TOOLBAR_FAST_VIEWS,
    TOOLBAR_INFO,
    TOOLBAR_LANGUAGE_SELECTOR
} from "../core/ui-ids";

contributionRegistry.registerContribution(SIDEBAR_MAIN, {
    name: VIEW_FILEBROWSER,
    label: "Workspace",
    icon: "folder",
    component: (id: string) => html`<docks-filebrowser id="${id}"></docks-filebrowser>`
});

contributionRegistry.registerContribution(PANEL_BOTTOM, {
    name: VIEW_LOG_TERMINAL,
    label: "Log Messages",
    icon: "list",
    component: (id: string) => html`<docks-log-terminal id="${id}"></docks-log-terminal>`
});

contributionRegistry.registerContribution(TOOLBAR_BOTTOM_END, {
    name: TOOLBAR_INFO,
    label: "Info",
    icon: "circle-info",
    command: "show_version_info",
    showLabel: true,
});

contributionRegistry.registerContribution(TOOLBAR_BOTTOM_END, {
    name: TOOLBAR_FAST_VIEWS,
    label: `Fast Views`,
    component: `<docks-fastviews target="system.fastviews-bottomend" icon="bolt" title="Fast Views"></docks-fastviews>`
});

contributionRegistry.registerContribution(TOOLBAR_BOTTOM_END, {
    name: TOOLBAR_LANGUAGE_SELECTOR,
    label: "Language",
    component: () => html`<docks-language-selector></docks-language-selector>`
});

contributionRegistry.registerContribution(TOOLBAR_MAIN_RIGHT, {
    name: TOOLBAR_APP_SWITCHER,
    label: "App Switcher",
    component: () => html`<docks-layout-switcher></docks-layout-switcher>`
} as HTMLContribution);

