# Architecture

## Layers

```
┌─────────────────────────────────────────────────────────────┐
│  Applications (packages/app, or custom apps)                 │
│  – AppDefinition: extensions, optional layout (id or { id, props }) │
│  – Layouts registered via LayoutContribution (system.layouts)│
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  App Loader (core)                                          │
│  – App registration & lifecycle  – Extension enable/disable │
│  – Layout resolution & preferred layout  – Render layout root│
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐   ┌─────────────────┐   ┌───────────────┐
│  Extensions   │   │  Contributions   │   │   Commands    │
│  Registry     │   │  Registry       │   │   Registry    │
│  (per-app)    │   │  (tabs, toolbars)│   │   (handlers)  │
└───────────────┘   └─────────────────┘   └───────────────┘
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  UI (core)                                                   │
│  docks-standard-layout · docks-tabs · docks-toolbar · docks-filebrowser · …    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  Core services                                               │
│  Workspace · Settings · Editor registry · Tasks · Events · DI│
└─────────────────────────────────────────────────────────────┘
```

## Monorepo layout

| Path | Role |
|------|------|
| **`packages/core`** (`@eclipse-docks/core`) | Platform: registries, services, parts, widgets, dialogs. No extension logic; extensions live in separate packages. |
| **`packages/extension-*`** | One package per extension. Each depends on core and registers commands, contributions, and optionally editors. |
| **`packages/create-app`** | Scaffolder: `npm create @eclipse-docks/app` generates a new app elsewhere (monorepo with app + example extension). |
| **`packages/app`** | Default app in this repo: imports core and extensions, defines `AppDefinition` and `extensions[]`, registers with the app loader. Use as reference when working in the monorepo. |
| **Root** | Workspace root. Scripts: `dev`, `build`, `build:app`, `test`, `docs:dev`, `docs:build`. |

## Main concepts

- **Apps** — Register via `AppDefinition`: `name`, `version`, `extensions[]`, optional `layout` (id or `{ id, props }`), `contributions`, `initialize` / `dispose`. The app root is the chosen layout's component.
- **Layouts** — Registered via `LayoutContribution` (slot `system.layouts`): `id`, `name`, `component`, optional `onShow`. Core provides the standard (IDE) layout; apps can add layouts (e.g. dashboard). Users switch via the toolbar layout switcher.
- **Extensions** — Register with `extensionRegistry`; provide a loader that runs when the extension is enabled. Register commands, contributions, editors.
- **Contributions** — Declarative UI: tabs (sidebars, editor area), toolbar buttons, HTML blocks. Targets include `SIDEBAR_MAIN`, `SIDEBAR_AUXILIARY`, `TOOLBAR_MAIN_RIGHT`, `TOOLBAR_BOTTOM_END`, `SYSTEM_LAYOUTS`, etc.
- **Commands** — Id and handlers (optional `canExecute`). Toolbars and menus reference commands; the command palette and AI can execute them.

Next: [Apps](/concepts/apps), [Extensions](/concepts/extensions), [Docks vs Theia](/concepts/docks-vs-theia), [Security and safety](/concepts/security), [Contributions](/concepts/contributions), [Commands](/concepts/commands).
