---
name: eclipse-docks-core
description: >-
  Eclipse Docks core runtime from docks/core: workspace files, editors, commands,
  contributions, dialogs, toasts, settings, and events. Use when a canvas or
  extension needs to open files, register UI, run commands, or talk to the shell.
---

# Eclipse Docks core (`docks/core`)

```js
import {
  workspaceService,
  File,
  editorRegistry,
  commandRegistry,
  registerAll,
  contributionRegistry,
  publish,
  subscribe,
  unsubscribe,
  appSettings,
  toastInfo,
  toastError,
  confirmDialog,
  promptDialog,
  filebrowserDialog,
} from "docks/core";
```

Alias: `@eclipse-docks/core`. Subpaths map to the same bridges, e.g. `docks/core/parts`, `docks/core/widgets`, `docks/core/externals/lit`.

## Workspace

```js
const workspace = workspaceService.getWorkspaceSync() ?? await workspaceService.getWorkspace();
const resource = await workspace.getResource("folder/note.md");
if (resource instanceof File) {
  const text = await resource.getContents();
  await resource.saveContents(text);
}
```

- Paths are workspace-relative (root-prefixed in the composite workspace).
- Create with `getResource(path, { create: true })` when the API allows.
- Canvases can also open a path via `this.canvasHost.openFile(path)` without importing core.

## Editors

```js
await editorRegistry.loadEditor(file);                 // default handler
await editorRegistry.loadEditor(file, "system.canvas-editor");
```

`EditorInput` objects carry `title`, `key`, `data`, `component`, optional `state`. Prefer opening a `File` when one exists.

## Commands

```js
registerAll({
  command: {
    id: "demo.ping",
    name: "Ping",
    description: "Demo command",
    parameters: [],
  },
  handler: {
    execute: async () => "pong",
  },
});

await commandRegistry.execute("demo.ping", {});
```

Commands registered this way can surface as AI tools when the cognitive runtime refreshes command tools.

## Contributions

```js
import { SIDEBAR_MAIN, TOOLBAR_MAIN_RIGHT } from "docks/core";

contributionRegistry.registerContribution(SIDEBAR_MAIN, {
  name: "demo.view",
  label: "Demo",
  icon: "star",
  component: (id) => /* Lit html template for the view */ null,
});
```

Common slots: sidebars, panel bottom, toolbars, settings. Canvas modules contributed by extensions use `system.canvases` (`SYSTEM_CANVASES` from `@eclipse-docks/extension-canvas/contribution`) with a `load()` that returns `{ default: CustomElementConstructor }`.

## Dialogs & toasts

```js
const ok = await confirmDialog("Replace file?");
const name = await promptDialog("Name?");
toastInfo("Saved");
toastError("Failed");
```

`filebrowserDialog` for folder/file picks; `formDialog` for multi-field forms. Prefer these over ad-hoc `window.prompt` in shell-integrated code.

## Settings & events

```js
await appSettings.set("demo.flag", true);
const flag = await appSettings.get("demo.flag");

const id = subscribe("topic.name", (event) => { /* … */ });
publish("topic.name", { detail: 1 });
unsubscribe(id);
```

## Logging

```js
import { createLogger } from "docks/core";
const log = createLogger("demo");
log.info("ready");
```

## Canvas notes

- Host persistence for a workspace `.canvas.js` is `canvasHost.getState` / `setState`, not `appSettings`, unless you intentionally share app-wide settings.
- Cross-origin isolation applies: third-party documents without CORP belong in iframe `srcdoc`, not naked fetches from the canvas element.
- Keep UI building blocks on `docks/lit` + `docks/webawesome`; use `docks/core` for shell integration.

## Anti-patterns

- Bare filenames at the composite workspace root when a durable root prefix is required
- Assuming `canvasHost` APIs exist on arbitrary LitElements outside a canvas mount
- Re-implementing toast/dialog with `alert` when core helpers are available
