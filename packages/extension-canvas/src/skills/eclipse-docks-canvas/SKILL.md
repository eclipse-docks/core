---
name: eclipse-docks-canvas
description: >-
  Create or edit interactive Eclipse Docks canvases (.canvas.js and the matching
  .canvas.md spec): CanvasView UIs, dashboards, todo apps, widgets, maps, and
  previewable tools. Use when the user wants an interactive view, canvas, widget,
  or .canvas.js file, or when a .canvas.md spec is open — even if they do not say
  "canvas".
---

# Eclipse Docks canvas

Write a workspace file ending in `.canvas.js`. Default-export a `CanvasView` subclass from `docks/canvas`. The host registers the tag.

```js
import { CanvasView, html, css, nothing } from "docks/canvas";
```

`docks/canvas` exports `CanvasView`, the Lit module (`html`, `css`, `nothing`, `repeat`, and the rest), and the Web Awesome module (`registerIconLibrary`). `CanvasView` registers the Web Awesome elements. A canvas does not import `docks/lit` or `docks/webawesome`, and it does not extend `LitElement` or `HTMLElement`.

## CanvasView

| Call | Role |
| --- | --- |
| `this.getState(key, fallback)` | Read persisted state. Returns `fallback` when the key is missing. |
| `this.setState(key, value)` | Write persisted state. Creates a sidecar `canvas.json` for this canvas. |
| `this.openFile(path)` | Open a workspace path in the editor. |
| `this.subscribe(topic, callback)` | Listen on the app event bus. The subscription ends when this canvas disconnects. |
| `this.unsubscribe(token)` | End one subscription early. |
| `this.publish(topic, data)` | Publish on the app event bus. |
| `onConnect()` | The element is connected and the host is attached. Hydrate state here. |
| `onDisconnect()` | The element is leaving the document. Release timers, streams, and object URLs. |

The host attaches after construction and before `onConnect`. From `constructor`, `getState` returns the fallback, and `setState` and `openFile` do nothing. Leave `connectedCallback` and `disconnectedCallback` on `CanvasView`. The subclass still owns `render`, `static properties`, and `static styles`.

A canvas app consists of three files with the same stem: `….canvas.js`, `….canvas.json`, and `….canvas.md`. The `….canvas.md` file is the input that drives generation of the `….canvas.js` app. `setState` creates the `….canvas.json`. The canvas does not import either sidecar.

Write `….canvas.md` in this order. `# Requirements` is the user's request. `# Spec` is the behavior contract the module must satisfy. `# State` and `# Interface` are what generation needs and the behavior contract leaves out.

```md
# Requirements

What the user asked for, in their words.

# Spec

## Purpose

One or two sentences on what this canvas is for.

## Requirements

### Requirement: Add an item

The canvas SHALL append a non-empty draft to the list and clear the draft.

#### Scenario: Submit a non-empty draft

- WHEN the user submits a non-empty draft
- THEN the list gains one item with that text and the draft is empty

#### Scenario: Empty draft

- WHEN the user submits an empty draft
- THEN the list is unchanged

# State

Keys stored through `setState`, and the shape of each value.

# Interface

Controls and layout the behavior depends on.
```

Spec rules:

- One behavior per `### Requirement:`. State it with SHALL or MUST.
- Every requirement has at least one `#### Scenario:`. Every scenario has a WHEN line and a THEN line. Add AND lines for further outcomes.
- A scenario states observable behavior: what the user does, what the canvas shows, and what it stores. Class names, Lit details, and component choices stay out of `# Spec`.
- `# State` names each `setState` key and the shape of its value. `# Interface` names the controls and layout a scenario depends on. It is not a widget catalog.

## Hard rules

1. Pure JavaScript only — no TypeScript, no decorators. Declare reactive fields with `static properties = { … }`. Initialize plain defaults in `constructor`; hydrate with `getState` in `onConnect`.
2. Build controls and chrome with Web Awesome (`wa-button`, `wa-input`, `wa-checkbox`, `wa-card`, `wa-callout`, `wa-spinner`). A raw `<button>` or `<input>` is not a substitute. Load `eclipse-docks-webawesome` before a non-trivial UI, and use `--wa-color-*` tokens instead of hardcoded colors.
3. Emit complete, valid JavaScript — no truncated objects or unfinished strings.
4. The page uses `Cross-Origin-Embedder-Policy: require-corp`. A cross-origin response loads only when the request is CORS and the server sends `Access-Control-Allow-Origin`, or when the server sends `Cross-Origin-Resource-Policy: cross-origin`. An `<iframe srcdoc>` inherits this policy; `sandbox="allow-same-origin"` does not exempt it.
5. The `….canvas.md` file is the input that drives the `….canvas.js` app. When the request changes, update the requirement and its scenarios first, and `# State` or `# Interface` when those change, then regenerate the module so each scenario still holds.

## Code

Follow clean code, DRY, SOLID, KISS, YAGNI, AHA, separation of concerns, fail fast, least astonishment, and the usual design patterns. Make the UI accessible and responsive. Format the file for a person to read: 2-space indentation, semicolons, double quotes, and templates and CSS broken across lines.

## Minimal pattern

```js
import { CanvasView, html, css } from "docks/canvas";

export default class extends CanvasView {
  static properties = {
    items: { state: true },
    draft: { state: true },
  };

  static styles = css`
    :host { display: block; padding: 1rem; box-sizing: border-box; }
  `;

  constructor() {
    super();
    this.items = [];
    this.draft = "";
  }

  onConnect() {
    const saved = this.getState("items", null);
    if (Array.isArray(saved)) this.items = saved;
  }

  persist() {
    this.setState("items", this.items);
  }

  addItem() {
    const input = this.renderRoot.querySelector("wa-input");
    const text = String(input?.value ?? "").trim();
    if (!text) return;
    this.items = [...this.items, { id: crypto.randomUUID(), text, done: false }];
    this.draft = "";
    this.persist();
  }

  render() {
    return html`
      <wa-input
        placeholder="New item"
        .value=${this.draft}
        @keydown=${(e) => { if (e.key === "Enter") this.addItem(); }}
      ></wa-input>
      <wa-button @click=${() => this.addItem()}>Add</wa-button>
      <ul>
        ${this.items.map((item) => html`<li>${item.text}</li>`)}
      </ul>
    `;
  }
}
```

## Cross-origin resources

`<img>`, `<link>`, and `<script>` tags without `crossorigin` are no-cors. A no-cors response that omits `Cross-Origin-Resource-Policy` fails with `not-set cross-origin-resource-policy`, even when it sends `Access-Control-Allow-Origin: *`. Moving that URL into an `<iframe srcdoc>` does not change the check. Subresources inside the frame follow the same rule.

When the server only sends `Access-Control-Allow-Origin`, request the resource as CORS. `fetch()` already does. For an element, set `crossorigin="anonymous"`. When a library creates the element, set its equivalent option (often `crossOrigin: "anonymous"`). A missing `Access-Control-Allow-Origin` header on that request is a CORS error, not the CORP error.

```html
<img crossorigin="anonymous" src="https://cdn.example/asset.png" />
<script crossorigin="anonymous" src="https://cdn.example/lib.js"></script>
```

A host that sends neither header cannot be embedded in this page. Pass the string `"anonymous"` to a library option (`crossOrigin: "anonymous"`). A boolean `true` is not that option.

## Styles inside the shadow root

The canvas renders in a shadow root. A `<link>` or `<style>` added to `document.head` does not apply to nodes inside that root. A widget that positions its own DOM with classes will load its images and still draw them in the wrong place until its stylesheet is on the shadow root.

Fetch the stylesheet as CORS and adopt it before constructing the widget:

```js
const cssText = await (await fetch(stylesheetUrl, { mode: "cors" })).text();
const sheet = new CSSStyleSheet();
sheet.replaceSync(cssText);
this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, sheet];
```

`static styles` is for the host. Do not rely on a document-level stylesheet for DOM the library creates inside the shadow root.

## Imports

- `docks/canvas` — `CanvasView`, the Lit exports (`html`, `css`, `nothing`, `repeat`, `when`, `classMap`, and the rest), and the Web Awesome exports (`registerIconLibrary`). The elements are already registered.
- `docks/core` — workspace files, dialogs, toasts, and commands. `openFile` does not need this import.
- Relative imports → workspace files (compiler inlines them: JSON → value, text/CSS → string, binaries → data URL)

Before non-trivial UI or shell integration, load companion skills as needed:

- `skills.load` `eclipse-docks-lit` — reactive properties, templates, directives (pure JS)
- `skills.load` `eclipse-docks-webawesome` — `wa-*` components and layout utilities
- `skills.load` `eclipse-docks-core` — workspace, editors, commands, dialogs, events

## Workflow

1. `workspace_write` the `<root>/….canvas.md` input in the structure above (qualify with a root from `workspace_list`).
2. `workspace_write` the `<root>/….canvas.js` app that this markdown drives, with the same stem in the same folder. Each scenario in `# Spec` holds in the module.
3. `canvas.open` with that path — returns `ready` or the compile/runtime error.
4. Before changing a canvas, `workspace_read` its `….canvas.md`. If the request changed, update the requirement and its scenarios in that file, then `canvas.apply_source`. If that canvas is open in an editor, the editor marks itself dirty and recompiles the preview and does not save. If it is not open in an editor, the tool writes the file. Do not `workspace_write` a canvas that is already open.
5. Optional: `canvas.capture_preview` to attach a screenshot (iframe contents may be blank).

Extension-registered canvases live on `system.canvases` and open by name via `canvas.open`. That opens a read-only viewer. Do not edit it: `canvas.apply_source`, `canvas.get_source`, `canvas.set_state`, and any tools declared by that canvas are not available while it is active.
