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
| `SYSTEM_LANGUAGE_BUNDLES` | i18n language bundles (extensions). |

Import these from `@eclipse-lyra/core`.

## Contribution types

- **CommandContribution** — `command`, `label`, `icon`, optional `params`, `showLabel`, `disabled`. Used for toolbar buttons and menu items.
- **TabContribution** — `name`, optional `editorId`, `closable`, `noOverflow`, `component` (function returning a Lit template). Used for sidebar and editor area tabs.
- **HTMLContribution** — `component` (string or function returning a Lit `TemplateResult`). Raw HTML or template in a slot.
- **IconContribution** — `mappings` (map of icon keys to identifiers), optional `priority`.

All contributions can include `target`, `label`, `icon`, `slot` from the base `Contribution` interface where applicable.

See [Add a sidebar tab](/guide/add-sidebar-tab) and [Add a command and toolbar button](/guide/add-command-toolbar).
