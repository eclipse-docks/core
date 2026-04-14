# extension-example

Example Eclipse Docks extension that adds a view to the **left side panel** – the same tab bar as **Workspace** (file browser). You get an "Example" tab next to the workspace; use it as a reference to build your own extensions.

## What it does

- Registers an extension with the Docks extension registry.
- Contributes a tab to `SIDEBAR_MAIN` (the left sidebar). The "Example" view appears in the same folder as the Workspace / file browser tab; switch between them via the sidebar icons.
- The tab content is a minimal HTML snippet; you can replace it with your own UI.

## Files

- **src/index.ts** – Registers the extension (`extensionRegistry.registerExtension`) and points to the loader.
- **src/example-extension-loader.ts** – Loaded when the extension starts. Registers a `TabContribution` to `SIDEBAR_MAIN` with name, label, icon, and component.

## Extending

Copy this package or add new contributions in the loader (e.g. more tabs, or contributions to other slots like `TOOLBAR_MAIN_RIGHT`). See [@eclipse-docks/core](https://github.com/eclipse-docks/core) and published extensions (e.g. `@eclipse-docks/extension-utils`) for more patterns.
