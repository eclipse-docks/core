---
name: eclipse-docks-lit
description: >-
  Lit templates, reactive properties, and directives for Eclipse Docks canvases.
  Use when writing or fixing .canvas.js render methods, static properties,
  directives, or styles — pure JavaScript only (no TypeScript decorators).
---

# Eclipse Docks Lit

A `.canvas.js` file imports `CanvasView` and every Lit export from `docks/canvas`. Use **pure JavaScript only** — no TypeScript, no decorators (`@property`, `@state`, `@customElement` are unavailable).

## Essentials

```js
import { CanvasView, html, css, nothing } from "docks/canvas";

export default class extends CanvasView {
  static properties = { count: { state: true }, label: { type: String } };
  static styles = css`:host { display: block; }`;

  render() {
    return this.count ? html`<span>${this.label}</span>` : nothing;
  }
}
```

- The host registers the tag. Use `onConnect` and `onDisconnect` for setup and teardown.
- Reactive fields: `static properties = { count: { state: true }, label: { type: String } }`.
- Initialize defaults in `constructor` after `super()`.
- Styles: `static styles = css\`:host { display: block; }\`;` (or an array of `css` results).
- Templates: `render() { return html\`...\`; }` — use `nothing` for empty branches.
- Shell UI that is not a canvas imports Lit from `docks/lit`. A canvas does not.

## Property options (common)

| Option | Meaning |
| --- | --- |
| `state: true` | Internal reactive state (not an attribute) |
| `type: String` / `Number` / `Boolean` / `Object` / `Array` | Attribute reflection helpers |
| `attribute: false` | Do not mirror to an attribute |
| `reflect: true` | Reflect property → attribute |

Assign **new** values for objects/arrays (`this.items = [...this.items, next]`), do not mutate in place if you need an update.

## Directives

Named exports from `docks/canvas` (the same module as `@eclipse-docks/core/externals/lit`):

```js
import { repeat, when, classMap, styleMap, ifDefined, live, ref, keyed } from "docks/canvas";
```

- `repeat(items, (i) => i.id, (i) => html\`...\`)` for keyed lists
- `when(cond, () => html\`...\`)` / `nothing` for conditionals
- `classMap({ active: isOn })`, `styleMap({ width: "1rem" })`
- `live(value)` when binding to form controls that can diverge from the property
- Prefer `.value=${x}` (property) over `value=${x}` (attribute) for form controls

## Events in templates

```js
html`<wa-button @click=${this.onSave}>Save</wa-button>`
```

Use arrow functions or bound methods so `this` stays the element. For `wa-*` props and events, follow `eclipse-docks-webawesome`.

## Signals (optional)

`docks/canvas` also exports the signal helpers `signal`, `computed`, `watch`, `SignalWatcher`, and `withWatch`. Prefer `static properties` for simple canvas state unless you already use signals.

## Anti-patterns

- Extending `LitElement` or calling `customElements.define` in a `.canvas.js` file
- Decorators or `.ts` syntax in `.canvas.js`
- Implementing `connectedCallback` or `disconnectedCallback` on a canvas
- Mutating arrays/objects in place without reassignment
- Relying on `this` inside a non-arrow inline handler incorrectly
