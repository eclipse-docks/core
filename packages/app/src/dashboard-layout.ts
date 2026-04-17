import "./dashboard-views";
import { html } from "@eclipse-docks/core/externals/lit";
import {
    contributionRegistry,
    type HTMLContribution,
    type TabContribution,
    SYSTEM_VIEWS,
    SYSTEM_LAYOUTS,
    TOOLBAR_MAIN_RIGHT,
    DocksPart,
    EDITOR_AREA_MAIN,
    commandRegistry,
} from "@eclipse-docks/core";
import { customElement } from "@eclipse-docks/core/externals/lit";

const dashboardLogo = () => html`
    <div
      style="padding: var(--wa-space-m); display: flex; justify-content: center; align-items: center; gap: var(--wa-space-s); min-width: 48px; min-height: 48px; box-sizing: border-box;"
    >
      <img src="/favicon.svg" width="40" height="40" alt="" />
      <i>My Dashboard</i>
    </div>
`;

contributionRegistry.registerContribution("dashboard-toolbar-top", {
    label: "Dashboard",
    slot: "start",
    component: dashboardLogo
} as HTMLContribution);

@customElement('docks-view-wrapper')
export class DocksViewWrapper extends DocksPart {
    protected renderContent() {
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
    ["dashboard-home", "Overview", "house", () => html`<docks-dashboard-welcome></docks-dashboard-welcome>`, false],
    ["dashboard-tasks", "My Tasks", "list-check", () => html`<docks-dashboard-my-tasks></docks-dashboard-my-tasks>`, true],
    ["dashboard-meetings", "Meetings", "calendar-days", () => html`<docks-dashboard-meetings></docks-dashboard-meetings>`, true],
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
    icon: "docks settings",
    command: "open_settings"
});

const dashboardShellTemplate = () =>
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
        <docks-toolbar id="dashboard-toolbar-top"></docks-toolbar>
        <docks-toolbar id="dashboard-toolbar-top-center"></docks-toolbar>
        <docks-toolbar id=${TOOLBAR_MAIN_RIGHT}></docks-toolbar>
      </div>
      <docks-resizable-grid class="dashboard-main" orientation="horizontal" sizes="15%, 85%">
        <docks-toolbar id="dashboard-views" size="large" orientation="vertical"></docks-toolbar>
        <docks-tabs style="padding: 10px;" id=${EDITOR_AREA_MAIN}></docks-tabs>
      </docks-resizable-grid>
    </div>`;

contributionRegistry.registerContribution(SYSTEM_LAYOUTS, {
    id: "dashboard",
    name: "Dashboard",
    label: "Dashboard",
    icon: "table-cells",
    component: dashboardShellTemplate,
    onShow() {
        requestAnimationFrame(() => {
            void commandRegistry
                .execute("open_view_as_editor", { params: { name: "dashboard-home" } })
                .catch(() => {});
        });
    },
});
