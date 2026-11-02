---
name: eclipse-docks-canvas
description: >-
  Create or edit interactive Eclipse Docks canvases (.canvas.js): LitElement UIs,
  dashboards, todo apps, widgets, maps, and previewable tools. Use when the user
  wants an interactive view, canvas, widget, or .canvas.js file — even if they do
  not say "canvas".
---

# Eclipse Docks canvas

Write a workspace file ending in `.canvas.js`. Default-export a `LitElement` subclass from `docks/lit`. Do **not** extend `HTMLElement`. Do **not** call `customElements.define` — the host registers the tag.

## Hard rules

1. **`canvasHost` is unavailable in `constructor`.** The host sets `this.canvasHost` after construction. Read/write persisted state in `connectedCallback` (after `super`) or later. Always guard: `this.canvasHost?.getState` / `setState`.
2. Pure JavaScript only — no TypeScript, no decorators. Declare reactive fields with `static properties = { … }`. Initialize plain defaults in `constructor`; hydrate from `canvasHost` only after connect.
3. Build controls and chrome with Web Awesome (`wa-button`, `wa-input`, `wa-checkbox`, `wa-card`, `wa-callout`, `wa-spinner`). `import "docks/webawesome"` only registers the elements; a raw `<button>` or `<input>` is not a substitute. Load `eclipse-docks-webawesome` before a non-trivial UI, and use `--wa-color-*` tokens instead of hardcoded colors.
4. Emit complete, valid JavaScript — no truncated objects or unfinished strings.
5. The page uses `Cross-Origin-Embedder-Policy: require-corp`. A cross-origin response loads only when the request is CORS and the server sends `Access-Control-Allow-Origin`, or when the server sends `Cross-Origin-Resource-Policy: cross-origin`. An `<iframe srcdoc>` inherits this policy; `sandbox="allow-same-origin"` does not exempt it. Keep `docks/lit`, `docks/webawesome`, and `canvasHost` on the LitElement.

## Minimal pattern

```js
import { LitElement, html, css } from "docks/lit";
import "docks/webawesome";

export default class extends LitElement {
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

  connectedCallback() {
    super.connectedCallback();
    const saved = this.canvasHost?.getState("items", null);
    if (Array.isArray(saved)) this.items = saved;
  }

  persist() {
    this.canvasHost?.setState("items", this.items);
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

APIs: `this.canvasHost.getState(key, fallback)`, `this.canvasHost.setState(key, value)`, `this.canvasHost.openFile(path)`.

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

- `docks/lit`, `docks/webawesome`, `docks/core` → running app
- Relative imports → workspace files (compiler inlines them: JSON → value, text/CSS → string, binaries → data URL)

Before non-trivial UI or shell integration, load companion skills as needed:

- `skills.load` `eclipse-docks-lit` — reactive properties, templates, directives (pure JS)
- `skills.load` `eclipse-docks-webawesome` — `wa-*` components and layout utilities
- `skills.load` `eclipse-docks-core` — workspace, editors, commands, dialogs, events

## Workflow

1. `workspace_write` a durable `<root>/….canvas.js` (qualify with a root from `workspace_list`).
2. `canvas.open` with that path — returns `ready` or the compile/runtime error.
3. Change a canvas with `canvas.apply_source`. If that canvas is open in an editor, the editor marks itself dirty and recompiles the preview and does not save. If it is not open in an editor, the tool writes the file. Do not `workspace_write` a canvas that is already open.
4. Optional: `canvas.capture_preview` to attach a screenshot (iframe contents may be blank).

Extension-registered canvases live on `system.canvases` and open by name via `canvas.open`.
