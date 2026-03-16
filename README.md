<p align="center">
  <img src="packages/app/public/logo.svg" alt="Eclipse Lyra" width="280" />
</p>

<p align="center">
  <a href="https://deepwiki.com/eclipse-lyra/core"><img src="https://deepwiki.com/badge.svg" alt="DeepWiki" /></a>
  <a href="https://github.com/eclipse-lyra/core/actions/workflows/ci.yml"><img src="https://github.com/eclipse-lyra/core/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
  <a href="https://www.npmjs.com/package/@eclipse-lyra/core"><img src="https://img.shields.io/npm/v/@eclipse-lyra/core" alt="npm @eclipse-lyra/core" /></a>
  <a href="https://github.com/eclipse-lyra/core/blob/main/LICENSE"><img src="https://img.shields.io/github/license/eclipse-lyra/core" alt="License EPL-2.0" /></a>
</p>

# Eclipse Lyra

Eclipse Lyra is a runtime web platform for building modular, extensible desktop- and dashboard-style web applications, running fully in the browser and integrating with any existing backend.

**Demo app:** [https://app.kispace.de](https://app.kispace.de)

**Docs:** [https://app.kispace.de/docs/](https://app.kispace.de/docs/)

**DeepWiki (interactive docs):** [talk to the code and architecture](https://deepwiki.com/eclipse-lyra/core) — the recommended way to explore internals and ask questions about the codebase.

---

## How to get started

### Create a new Lyra app (recommended)

Use the official scaffolder to create a new Eclipse Lyra app (monorepo with app + example extension):

```bash
npm create @eclipse-lyra/app my-app
cd my-app
npm run dev
```

This gives you a project with:

- `packages/app` — your Lyra app (configure logo, layout, and extensions).
- `packages/example-extension` — a sample extension that adds a view to the left sidebar.

Common places to start customizing:

- Update app metadata, logo, and the extensions list in the app entry file under `packages/app/src/`.
- Use `packages/example-extension` as a template for your own domain-specific extensions.

### Explore and learn the internals

- Use **DeepWiki** at [https://deepwiki.com/eclipse-lyra/core](https://deepwiki.com/eclipse-lyra/core) to ask questions about architecture, services, and extension points directly against the codebase.
- Browse the docs at [https://app.kispace.de/docs/](https://app.kispace.de/docs/) for conceptual overviews and examples.

### Advanced: work on this repo

If you want to work on the Lyra core itself or run the default example app from this repository:

```bash
git clone https://github.com/eclipse-lyra/core.git
cd core
npm install
npm run dev
```

This builds core, then starts the default app (Vite dev server). Open the URL shown in the terminal (e.g. `http://localhost:5173`).

To build for production:

```bash
npm run build        # build core only
npm run build:app    # build the default app (depends on core)
```

---

## Architecture (for app authors)

At a high level, a downstream Lyra app wires together an app definition, extensions, and the core services and UI components.

```mermaid
flowchart TD
  app["DownstreamApp (packages/app)"] --> appLoader["AppLoader"]
  app --> extensions["Extensions (packages/extension-*)"]
  appLoader --> registries["Registries (extensions, contributions, commands)"]
  registries --> ui["UI Components (Lit + WebAwesome)"]
  ui --> coreServices["Core Services (workspace, settings, editors, tasks)"]
```

- **App** — defines which extensions are enabled, which layout to use, and high-level contributions (tabs, toolbars, views).
- **Extensions** — feature bundles that register views, commands, and services for your domain.
- **Registries** — keep track of extensions, UI contributions, and commands so they can be enabled, disabled, or remapped per app.
- **UI components** — Lit-based `lyra-*` components plus WebAwesome UI primitives.
- **Core services** — workspace, settings, editors, tasks, events, and dependency injection.

For a deeper, more detailed tour of the architecture (including concepts like contribution remapping), use **DeepWiki** on the `eclipse-lyra/core` project or see the docs under `docs/concepts/`.

### Monorepo layout

| Path | Role |
|------|------|
| **`packages/core`** (`@eclipse-lyra/core`) | Platform: registries, services, parts, widgets, dialogs, default UI contributions. No extension logic; extensions are separate packages. |
| **`packages/extension-*`** | One package per extension (e.g. `extension-ai-system`, `extension-settings-tree`, `extension-monaco-editor`). Each depends on core and registers commands/contributions/editors. |
| **`packages/app`** | Default app: imports core + extensions, defines `AppDefinition` and `extensions[]`, registers with app loader. Use as template for your own app. |
| **Root** | Workspace root. Scripts: `dev`, `build`, `build:app`, `test`. |

### Main concepts

- **Apps** — One or more apps register via `AppDefinition`: `name`, `version`, `extensions[]`, optional `layout` (id string or `{ id, props }` to parameterize), `contributions`, `initialize` / `dispose`. The app root is always the chosen layout's component.
- **Layouts** — Registered via `LayoutContribution` (slot `system.layouts`): `id`, `name`, `component` (Lit template), optional `onShow`. Core registers the standard (IDE) layout; apps can register additional layouts (e.g. dashboard). Users switch layout via the toolbar layout switcher.
- **Extensions** — Register with `extensionRegistry`; provide a loader that runs when the extension is enabled. Register commands, contributions, editors, services.
- **Contributions** — Declarative UI: tabs (sidebars, editor area), toolbar buttons, HTML blocks. Targets include `SIDEBAR_MAIN`, `SIDEBAR_AUXILIARY`, `TOOLBAR_MAIN_RIGHT`, `TOOLBAR_BOTTOM_END`, etc.
- **Commands** — Id + handlers (with optional `canExecute`). Toolbar/menus reference commands; AI and command palette can execute them.
- **Contribution remapping (per app)** — Apps can opt into a mapping layer (via `AppDefinition.remaps`) that **decouples where a contribution is defined from where it is rendered**. This allows downstream apps to move or hide platform and extension UI (e.g. moving the AI view from the right sidebar to the left, or disabling it entirely) without forking core or the extension. See the docs under `docs/concepts/contributions.md` for detailed usage.

---

## Technology stack

Eclipse Lyra is built on a lightweight, browser-native stack:

- **Lit** — Web components for core and extensions ([Lit docs](https://lit.dev/)).
- **WebAwesome** — UI primitives and theming.
- **TypeScript** — Typed public APIs.
- **Vite** — Build and dev server.

Optional extensions add capabilities like the Monaco editor, Pyodide, WebLLM, WebMCP, RxDB, and Xenova transformers.

---

## Comparison with other frameworks

For those comparing frameworks, here is how Eclipse Lyra lines up with Angular, React, and Vue on common dimensions.

| Dimension | **Eclipse Lyra** | **Angular** | **React** | **Vue** |
| --------- | ------------ | ----------- | --------- | ------- |
| **Paradigm** | App framework for IDE-like and dashboard-like apps; declarative contributions (tabs, toolbars, commands) | Full framework; components + services + modules | Library; components + hooks | Progressive framework; SFCs + composition API |
| **Component tech** | Lit web components (`lyra-*` custom elements) | Angular components (decorators/templates) | JSX/TSX components | Single-File Components (`.vue`) or JSX |
| **Templating** | Lit `html` tagged templates | HTML-like templates + directives | JSX | HTML-like template or JSX |
| **TypeScript** | First-class; strict, declarations published | First-class; full TS support | Supported (TS + React types) | First-class; full TS in SFC and script |
| **State management** | `@lit-labs/signals` in core; `watchSignal()`; signals for app state (active part, editor, selection, tasks) | RxJS + services; optional NgRx/Akita | useState/useReducer; ecosystem (Redux, Zustand, Jotai) | reactivity (ref, reactive); Pinia optional |
| **Routing / Navigation** | No URL router; contribution targets and slots (IDE: sidebars/editor/panel; dashboard: custom shell + views) | Angular Router (URL-based, lazy loading) | React Router (community); URL-based | Vue Router (official); URL-based |
| **Forms** | No built-in form framework; ad-hoc with WebAwesome/Lit | Reactive Forms / Template-driven forms | Uncontrolled/controlled components; Formik, React Hook Form | v-model + validation; VeeValidate, etc. |
| **HTTP / Data** | No built-in HTTP client; fetch or extensions (e.g. GitHub, ESM.sh) | HttpClient; interceptors | fetch / axios; TanStack Query common | fetch / axios; TanStack Query common |
| **i18n** | Built-in: `i18n()` (typed namespace, co-located JSON), `currentLanguageSignal`, locales discovered from bundles | @angular/localize; build-time or runtime | react-i18next, react-intl | vue-i18n (official) |
| **Testing** | Vitest (unit tests in core) | Jasmine/Karma or Jest; Angular Testing Library | Jest + React Testing Library; Vitest | Jest/Vitest + Vue Test Utils |
| **Build / Bundling** | Vite 7; core as library (ES, multiple entries); app as Vite SPA | Angular CLI (esbuild/webpack) | Vite, Create React App, Next.js, etc. | Vite (default), Vue CLI, Nuxt |
| **Runtime footprint** | **Browser-native** tech stack (Lit, standard DOM, Web APIs); **very lightweight** runtime; no heavy framework runtime layer | Full framework runtime; larger baseline | Small library; ecosystem can add weight | Small core; ecosystem can add weight |
| **CLI** | `npm create @eclipse-lyra/app` (scaffold new app); npm scripts: dev, build, build:app, test | Angular CLI (generate, build, serve) | Create React App, Vite templates | Vue CLI, create-vue; Nuxt CLI |
| **SSR** | Client-only; no app-level SSR | Angular Universal | Next.js, Remix, etc. | Nuxt, Vite SSR |
| **Styling / Theming** | WebAwesome themes (theme classes, palettes); CSS in components | Encapsulated CSS; Angular Material theming | CSS Modules, styled-components, Tailwind | Scoped CSS; Vuetify/Quasar theming |
| **Dependency injection** | Built-in: `rootContext`, `uiContext`; services (appLoader, commandRegistry, workspace, settings, etc.) | Built-in hierarchical injector | Context API or external (Inversify, etc.) | provide/inject (composition API) |
| **Plugin / Extension model** | Core feature: extensions (per-app), contribution + command registries; loaders; enable/disable at runtime; **marketplace**: install external extensions from catalog URLs (e.g. appspace-marketplace) | NgModules; lazy-loaded feature modules | No standard; plugin patterns ad-hoc | Plugins (use()); Nuxt modules |
| **Commands / shortcuts** | Built-in: command registry, keybindings, command palette | No built-in; custom or libs | No built-in; custom or libs | No built-in; custom or libs |
| **Layouts / App modes** | Layout contributions (slot `system.layouts`); default `standard` (IDE); optional layouts (e.g. dashboard); layout switcher in toolbar | App shell + router-outlet | App shell + router; layout is component tree | App shell + router; layout is component tree |
| **Primary use case** | IDE-like apps and dashboard-like apps (tabs, workspace, editors, views, AI, extensions) | Enterprise SPAs, large teams | SPAs, dashboards, content apps | SPAs, progressive enhancement |
| **License** | EPL-2.0 | MIT | MIT | MIT |

## Repository and license

- **Repository:** [github.com/eclipse-lyra/core](https://github.com/eclipse-lyra/core)
- **License:** EPL-2.0 (see [LICENSE](LICENSE) and [NOTICE](NOTICE))
- **Contributing:** See [CONTRIBUTING.md](CONTRIBUTING.md)

Publishing of `@eclipse-lyra/core` and extensions is done via GitHub Actions on version tags; see workflow and npm trusted publishing in the repo.
