import "./dashboard-views";
import { html } from "@eclipse-lyra/core/externals/lit";
import {
    contributionRegistry,
    type HTMLContribution,
    type TabContribution,
    SYSTEM_VIEWS,
    TOOLBAR_MAIN_RIGHT,
    LyraPart,
    EDITOR_AREA_MAIN,
    commandRegistry,
    appLoaderService,
} from "@eclipse-lyra/core";
import { customElement } from "@eclipse-lyra/core/externals/lit";

const dashboardLogo = () => html`
    <div style="padding: var(--wa-space-m); display: flex; justify-content: center; min-width: 48px; min-height: 48px; box-sizing: border-box;">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="4" y="4" width="14" height="14" rx="3" fill="var(--wa-color-brand-fill, #0d6efd)"/>
            <rect x="22" y="4" width="14" height="14" rx="3" fill="var(--wa-color-neutral-fill-subtle, #e9ecef)" stroke="var(--wa-color-neutral-stroke, #dee2e6)" stroke-width="1"/>
            <rect x="4" y="22" width="14" height="14" rx="3" fill="var(--wa-color-neutral-fill-subtle, #e9ecef)" stroke="var(--wa-color-neutral-stroke, #dee2e6)" stroke-width="1"/>
            <rect x="22" y="22" width="14" height="14" rx="3" fill="var(--wa-color-neutral-fill-subtle, #e9ecef)" stroke="var(--wa-color-neutral-stroke, #dee2e6)" stroke-width="1"/>
        </svg> <i>My Dashboard</i>
    </div>
`;

contributionRegistry.registerContribution("dashboard-toolbar-top", {
    label: "Dashboard",
    slot: "start",
    component: dashboardLogo
} as HTMLContribution);

@customElement('lyra-view-wrapper')
export class LyraViewWrapper extends LyraPart {
    protected render() {
        return html`<slot></slot>`
    }
}

type ViewComponent = () => ReturnType<typeof html>;

const makeView = (
    name: string,
    label: string,
    icon: string,
    component: ViewComponent,
    closable?: boolean
): TabContribution => ({
    name,
    label,
    icon,
    closable: closable ?? false,
    toolbar: false,
    component: (_id: string) => component(),
});

const viewDefs: [string, string, string, ViewComponent, boolean][] = [
    ["dashboard-home", "Overview", "house", () => html`<lyra-dashboard-welcome></lyra-dashboard-welcome>`, false],
    ["dashboard-tasks", "My Tasks", "list-check", () => html`<lyra-dashboard-my-tasks></lyra-dashboard-my-tasks>`, true],
    ["dashboard-meetings", "Meetings", "calendar-days", () => html`<lyra-dashboard-meetings></lyra-dashboard-meetings>`, true],
];

for (const [name, label, icon, component, closable] of viewDefs) {
    contributionRegistry.registerContribution(SYSTEM_VIEWS, makeView(name, label, icon, component, closable));
    contributionRegistry.registerContribution("dashboard-views", {
        label,
        icon,
        showLabel: true,
        command: "open_view_as_editor",
        params: { name },
    });
}

contributionRegistry.registerContribution("dashboard-views-toolbar-bottom", {
    label: "Profile",
    icon: "user",
    command: "open_user_profile"
});

contributionRegistry.registerContribution("dashboard-views-toolbar-bottom", {
    label: "Settings",
    icon: "gear",
    command: "open_settings"
});

appLoaderService.registerApp({
    id: 'dev-dashboard-app',
    name: 'Dashboard Demo',
    version: '0.0.0',
    description: 'Demo dashboard layout with left navigation and views.',
    extensions: [
        '@eclipse-lyra/extension-utils',
        '@eclipse-lyra/extension-md-editor',
        '@eclipse-lyra/extension-monaco-editor',
        '@eclipse-lyra/extension-media-viewer',
        '@eclipse-lyra/extension-settings-tree'
    ],
    component: () =>
        html`<style>
          .dashboard-shell {
            display: flex;
            flex-direction: column;
            height: 100vh;
            width: 100%;
            box-sizing: border-box;
            padding: var(--wa-space-m);
            gap: var(--wa-space-m);
          }
  
          .dashboard-main {
            flex: 1;
            min-height: 0;
          }
  
          .toolbar-top {
            display: grid;
            grid-template-columns: auto 1fr auto;
            align-items: center;
            border-radius: var(--wa-radius-l);
            padding: 0 var(--wa-space-m);
            min-height: 48px;
            background-color: var(--wa-color-neutral-fill-surface);
          }
        </style>
  
        <div class="dashboard-shell">
          <div class="toolbar-top">
            <lyra-toolbar id="dashboard-toolbar-top"></lyra-toolbar>
            <lyra-toolbar id="dashboard-toolbar-top-center"></lyra-toolbar>
            <lyra-toolbar id=${TOOLBAR_MAIN_RIGHT}></lyra-toolbar>
          </div>
          <lyra-resizable-grid class="dashboard-main" orientation="horizontal" sizes="15%, 85%">
            <lyra-toolbar id="dashboard-views" size="large" orientation="vertical"></lyra-toolbar>
            <lyra-tabs style="padding: 10px;" id=${EDITOR_AREA_MAIN}></lyra-tabs>
          </lyra-resizable-grid>
        </div>`,
    initialize() {
        requestAnimationFrame(() => {
            commandRegistry.execute('open_view_as_editor', { params: { name: 'dashboard-home' } });
        });
    },
});