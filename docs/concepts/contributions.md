# Contributions

**Contributions** are declarative UI: tabs, toolbar buttons, HTML blocks, and icons. They are registered with `contributionRegistry.registerContribution(target, contribution)`.

## Targets

Contribution targets define where UI appears:

| Constant | Role |
|----------|------|
| `SIDEBAR_MAIN` | Main sidebar (e.g. file tree). |
| `SIDEBAR_MAIN_BOTTOM` | Bottom of main sidebar. |
| `SIDEBAR_AUXILIARY` | Secondary sidebar. |
| `EDITOR_AREA_MAIN` | Editor area. |
| `PANEL_BOTTOM` | Bottom panel. |
| `TOOLBAR_MAIN` | Main toolbar. |
| `TOOLBAR_MAIN_RIGHT`, `TOOLBAR_MAIN_CENTER` | Main toolbar slots. |
| `TOOLBAR_BOTTOM`, `TOOLBAR_BOTTOM_END`, `TOOLBAR_BOTTOM_CENTER` | Bottom toolbar. |
| `SYSTEM_LAYOUTS` | Layout contributions (id, name, component, optional onShow). See [Apps](/concepts/apps#layouts). |
| `SYSTEM_ATTRIBUTIONS` | License and third-party notices. `HTMLContribution`s collected by `docks-attribution`. |
| `ABOUT_TABS` | About dialog tabs. Same `TabContribution` model as `docks-tabs` (id is the contribution target). |

Import these from `@eclipse-docks/core`.

Contribution **names** (`name` on the contribution) identify which item it is and are used for remapping. Those constants are also exported from `@eclipse-docks/core` (for example `VIEW_FILEBROWSER`, `ABOUT_TAB_ATTRIBUTIONS`).

## Contribution types

- **CommandContribution** — `command`, `label`, `icon`, optional `params`, `showLabel`, `disabled`. Used for toolbar buttons and menu items.
- **TabContribution** — `name`, optional `editorId`, optional `coupledEditors` (list of main-area `editorId` values; when the active editor matches, the tab’s `DocksPart` can auto-activate its sidebar/panel tab), `closable`, `noOverflow`, `component` (function returning a Lit template). Used for sidebar and editor area tabs, and for About dialog tabs on `ABOUT_TABS`. Core registers **Release History** (`docks-release-history`), **NPM Packages** (`docks-npm-packages`), and **Attributions** (`docks-attribution`).
- **HTMLContribution** — `component` (string or function returning a Lit `TemplateResult`). Raw HTML or template in a slot. Register on `SYSTEM_ATTRIBUTIONS` for notices that downstream apps must show (collected by `docks-attribution`).
- **LayoutContribution** — For `SYSTEM_LAYOUTS`: `id`, `name`, `component` (Lit template), optional `onShow`. Defines a layout shell; the app root is the chosen layout's component.
- **IconContribution** — `mappings` (map of icon keys to identifiers), optional `priority`.

All contributions can include `target`, `label`, `icon`, `slot`, and `ranking` from the base `Contribution` interface where applicable. Higher `ranking` appears first (default 0); equal ranks keep registration order.

Packages that must be named in the product UI register an `HTMLContribution` on `SYSTEM_ATTRIBUTIONS`. `docks-attribution` (the About **Attributions** tab) renders them:

```ts
import { contributionRegistry, SYSTEM_ATTRIBUTIONS, type HTMLContribution } from '@eclipse-docks/core';
import { html } from '@eclipse-docks/core/externals/lit';

contributionRegistry.registerContribution(SYSTEM_ATTRIBUTIONS, {
  name: 'attribution.example-lib',
  label: 'Example Lib',
  component: () => html`<p>Example Lib is used under the MIT License.</p>`,
} as HTMLContribution);
```

See [Add a sidebar tab](/guide/add-sidebar-tab) and [Add a command and toolbar button](/guide/add-command-toolbar).

## Per-app contribution remapping

In many cases, the **platform or an extension decides where UI is contributed** (e.g. the AI view in the auxiliary sidebar, or the file browser in the main sidebar). Downstream apps may want to:

- Move a view to a different container (e.g. AI view from right sidebar to left).
- Show the same contribution in multiple places.
- Disable a contribution entirely (e.g. no AI view in this app).

To support this without forking core or extension code, Docks provides a **remapping layer**:

- Each contribution can declare a globally unique `name` (semantic ID), such as:
  - `view.filebrowser`
  - `view.aiview`
  - `toolbar.brand.eclipse-docks`
- An app can then provide `remaps` on its `AppDefinition`:

```ts
const app: AppDefinition = {
  name: 'my-app',
  remaps: [
    // Move AI view from auxiliary sidebar to main sidebar
    { name: 'view.aiview', targets: ['sidebar-main'] },

    // Show the same view in multiple places
    { name: 'view.filebrowser', targets: ['sidebar-main', 'sidebar-auxiliary'] },

    // Disable a contribution completely (no effective targets)
    { name: 'view.aiview', targets: [] },
  ],
  extensions: [
    '@eclipse-docks/extension-utils',
    '@eclipse-docks/extension-ai-system',
    // ...
  ],
};
```

### Semantics

- If a **remap exists** for a `name`:
  - `targets` non-empty → the contribution is shown in those slots (fan-out supported).
  - `targets` empty (`[]`) → the contribution is **disabled** for that app (no slots).
- If **no remap exists** for a `name`, the contribution is shown in its original slot, as registered by the platform or extension (`registerContribution(target, contribution)`).

Internally, the mapping layer is applied when `contributionRegistry.getContributions(slot)` is called, so:

- Extensions and core continue to register contributions against concrete targets.
- Apps decide, via `AppDefinition.remaps`, where those contributions are ultimately rendered—or whether they are rendered at all.
