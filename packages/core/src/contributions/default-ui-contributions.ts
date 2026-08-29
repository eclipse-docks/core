import { html } from "lit";
import { contributionRegistry, type HTMLContribution } from "../core/contributionregistry";
import {
    ABOUT_TABS,
    PANEL_BOTTOM,
    SIDEBAR_MAIN,
    SIDEBAR_MAIN_TOOLBAR,
    SYSTEM_ATTRIBUTIONS,
    TOOLBAR_BOTTOM_END,
    TOOLBAR_MAIN_RIGHT
} from "../core/contribution-targets";
import {
    ABOUT_TAB_ATTRIBUTIONS,
    ABOUT_TAB_PACKAGES,
    ABOUT_TAB_RELEASE,
    ATTRIBUTION_ECLIPSE_DOCKS,
    VIEW_FILEBROWSER,
    VIEW_LOG_TERMINAL,
    TOOLBAR_LAYOUT_SWITCHER,
    TOOLBAR_FAST_VIEWS,
    TOOLBAR_INFO,
    TOOLBAR_LANGUAGE_SELECTOR,
    SIDEBAR_TOOLBAR_EXTENSIONS
} from "../core/contribution-names";

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

contributionRegistry.registerContribution(ABOUT_TABS, {
    name: ABOUT_TAB_ATTRIBUTIONS,
    label: "Attributions",
    icon: "copyright",
    ranking: 100,
    toolbar: false,
    contextMenu: false,
    component: (id: string) => html`<docks-attribution id="${id}" embedded></docks-attribution>`
});

contributionRegistry.registerContribution(ABOUT_TABS, {
    name: ABOUT_TAB_RELEASE,
    label: "Release History",
    icon: "clock-rotate-left",
    ranking: 50,
    toolbar: false,
    contextMenu: false,
    component: (id: string) => html`<docks-release-history id="${id}" embedded></docks-release-history>`
});

contributionRegistry.registerContribution(ABOUT_TABS, {
    name: ABOUT_TAB_PACKAGES,
    label: "NPM Packages",
    icon: "cubes",
    ranking: 0,
    toolbar: false,
    contextMenu: false,
    component: (id: string) => html`<docks-npm-packages id="${id}" embedded></docks-npm-packages>`
});

contributionRegistry.registerContribution(SYSTEM_ATTRIBUTIONS, {
    name: ATTRIBUTION_ECLIPSE_DOCKS,
    label: "Eclipse Docks",
    component: () => html`
        <p>
            Eclipse Docks is made available under the
            <a href="https://www.eclipse.org/legal/epl-2.0" target="_blank" rel="noopener noreferrer">Eclipse Public License 2.0</a>.
        </p>
    `
} as HTMLContribution);

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
    name: TOOLBAR_LAYOUT_SWITCHER,
    label: "Layout panels",
    component: () => html`<docks-layout-switcher></docks-layout-switcher>`
} as HTMLContribution);

contributionRegistry.registerContribution(SIDEBAR_MAIN_TOOLBAR, {
    name: SIDEBAR_TOOLBAR_EXTENSIONS,
    command: "open_extensions",
    icon: "docks extensions",
    label: "Extensions",
});