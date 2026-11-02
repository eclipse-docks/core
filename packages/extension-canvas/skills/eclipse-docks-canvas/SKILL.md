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
3. Prefer Web Awesome via `import "docks/webawesome"` (`wa-button`, `wa-input`, `wa-checkbox`, …).
4. Emit complete, valid JavaScript — no truncated objects or unfinished strings.
5. Cross-origin isolation: third-party pages that omit CORP (maps, many CDNs) must load in an iframe `srcdoc`, not as top-level fetches from the LitElement. Keep `docks/*` and `canvasHost` on the LitElement.

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
    const text = this.draft.trim();
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
        @input=${(e) => { this.draft = e.target.value; }}
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
3. Fix with `workspace_write` / `canvas.apply_source`, then re-open or apply.
4. Optional: `canvas.capture_preview` to attach a screenshot (iframe contents may be blank).

Extension-registered canvases live on `system.canvases` and open by name via `canvas.open`.
