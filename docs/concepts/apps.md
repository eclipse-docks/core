# Apps

An **app** is the top-level unit of the framework. You define it with an `AppDefinition` and register it with `appLoaderService`. The app root is always the chosen layout's component.

## AppDefinition

| Field | Required | Description |
|-------|----------|-------------|
| `name` | No* | Human-readable name. Set by hostConfig when omitted. |
| `version` | No* | Semantic version string. Set by hostConfig when omitted. |
| `description` | No | Short description. |
| `extensions` | No | List of extension ids (e.g. `@eclipse-lyra/extension-command-palette`) to enable when the app loads. |
| `contributions` | No | App-level contributions (UI and/or extensions). |
| `layoutId` | No | Id of a layout registered to the `system.layouts` slot. The app root is the chosen layout's component. Defaults to `'standard'` (IDE layout). |
| `initialize` | No | Called after extensions and contributions are registered. |
| `dispose` | No | Called when the app is unloaded. |
| `releaseHistory` | No | Static array or callback for release history (used by version-info). |
| `metadata` | No | Custom metadata (e.g. `metadata.github` for release checking). |

\* Use **`hostConfig: true`** in `registerApp` options so the framework fills name, version, and dependencies from the build-time plugin when available.

## Layouts

Layouts are registered via **LayoutContribution** to the slot **`SYSTEM_LAYOUTS`** (`system.layouts`). Each layout has:

- **`id`** — Unique identifier (e.g. `'standard'`, `'dashboard'`).
- **`name`** — Display name (e.g. for the layout switcher).
- **`component`** — Function returning a Lit `TemplateResult` (the layout shell).
- **`onShow`** (optional) — Callback when the layout is shown (e.g. open a default view).

Core registers the **standard** layout (IDE: sidebars, editor area, bottom panel). Your app can register additional layouts (e.g. a dashboard shell) by calling `contributionRegistry.registerContribution(SYSTEM_LAYOUTS, { id, name, component, onShow })`. Users switch between layouts via the **toolbar layout switcher**; the preferred layout is persisted and used on next load.

## Registration

```ts
import { appLoaderService } from '@eclipse-lyra/core';

appLoaderService.registerApp(
  {
    extensions: ['@eclipse-lyra/extension-command-palette', '@eclipse-lyra/extension-settings-tree'],
    layoutId: 'standard',
  },
  { autoStart: true, hostConfig: true }
);
```

- **autoStart** — If `true`, the app loader starts after registration (loads extensions and renders).
- **defaultAppName** — App name to load when no app is specified (e.g. via URL).
- **container** — DOM element to render into (default: `document.body`).

## Package info and marketplace

Add **`dependencies`** and **`marketplaceCatalogUrls`** to your app definition to show resolved dependency versions in About and to register marketplace catalog URLs. Use **`hostConfig: true`** in `registerApp` options so the framework fills name, version, and dependencies from the build-time plugin when available:

```ts
import { appLoaderService } from '@eclipse-lyra/core';
import appPkg from '../package.json';

appLoaderService.registerApp(
  {
    marketplaceCatalogUrls: (appPkg as any).marketplace?.catalogUrls,
    extensions: [/* ... */],
    layoutId: 'standard',
  },
  { autoStart: true, hostConfig: true }
);
```

See [Build your own app](/guide/build-your-own-app).
