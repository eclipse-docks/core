# What is Eclipse Lyra

Eclipse Lyra is a **modular web framework** for building IDE-like applications. It provides:

- **App layer** — You define an app by its extensions and optional layout; the app root is the chosen layout's component. Layouts (e.g. IDE, dashboard) are registered via contributions; users switch via the toolbar. The framework handles registration, lifecycle, and rendering.
- **Extension system** — Features (editor, terminal, AI, settings, etc.) are packaged as extensions. Each extension registers with the core and can contribute UI and commands.
- **Contributions** — Declarative UI: tabs in sidebars, buttons on toolbars, HTML blocks. Contributions are bound to targets (e.g. main sidebar, bottom panel).
- **Commands** — Named actions with handlers. Toolbars and menus reference commands; the command palette and AI can execute them.
- **Core services** — Workspace, settings, dialogs, tasks, events, and dependency injection.

You can build a **downstream app** by defining an `AppDefinition` and choosing which extensions to enable, or author **new extensions** that register with `extensionRegistry`, `contributionRegistry`, and `commandRegistry`.

See [Architecture](/concepts/architecture) and the [Guide](/guide/getting-started) for details.
