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

Alias: `@eclipse-docks/core`. `publish`, `subscribe`, and `unsubscribe` come from this module.

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
- A canvas opens a path in the editor with `this.openFile(path)` and does not import core for that call. Reading or writing file bytes still uses `workspaceService` and `File`.

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

Common slots: sidebars, panel bottom, toolbars, settings. Canvas modules contributed by extensions use `system.canvases` (`SYSTEM_CANVASES` from `@eclipse-docks/extension-canvas/contribution`). Each contribution sets a unique `settingsKey` for the state behind `getState` / `setState`. `load()` returns `{ default: CustomElementConstructor }`, or `source` is the canvas module text and the preview compiles it. A contributed canvas is not editable and opens without a toolbar.

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

- A canvas subclasses `CanvasView` from `docks/canvas`. Persist with `this.getState` / `this.setState` inside `onConnect` and later. Use `appSettings` only to share app-wide settings.
- `this.openFile(path)` opens a workspace path. Dialogs, toasts, and file contents stay on `docks/core`.
- A canvas listens and publishes with `this.subscribe`, `this.unsubscribe`, and `this.publish`. It does not import those functions.
- Cross-origin loads follow the canvas skill: CORS plus `Access-Control-Allow-Origin`, or `Cross-Origin-Resource-Policy: cross-origin`. An iframe `srcdoc` does not opt out.

## Anti-patterns

- Bare filenames at the composite workspace root when a durable root prefix is required
- Calling `getState`, `setState`, or `openFile` before `onConnect`
- Re-implementing toast/dialog with `alert` when core helpers are available
