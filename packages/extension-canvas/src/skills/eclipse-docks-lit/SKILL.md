---
name: eclipse-docks-lit
description: >-
  LitElement patterns for Eclipse Docks canvases and UI code via docks/lit.
  Use when writing or fixing .canvas.js, Lit templates, reactive properties,
  directives, or styles — pure JavaScript only (no TypeScript decorators).
---

# Eclipse Docks Lit (`docks/lit`)

Import from `docks/lit` (same module as `@eclipse-docks/core/externals/lit`). In `.canvas.js` files use **pure JavaScript only** — no TypeScript, no decorators (`@property`, `@state`, `@customElement` are unavailable).

## Essentials

```js
import { LitElement, html, css, nothing } from "docks/lit";
```

- Default-export a `LitElement` subclass for canvases. Do **not** call `customElements.define` in a canvas — the host registers the tag.
- Reactive fields: `static properties = { count: { state: true }, label: { type: String } }`.
- Initialize defaults in `constructor` after `super()`.
- Styles: `static styles = css\`:host { display: block; }\`;` (or an array of `css` results).
- Templates: `render() { return html\`...\`; }` — use `nothing` for empty branches.

## Property options (common)

| Option | Meaning |
| --- | --- |
| `state: true` | Internal reactive state (not an attribute) |
| `type: String` / `Number` / `Boolean` / `Object` / `Array` | Attribute reflection helpers |
| `attribute: false` | Do not mirror to an attribute |
| `reflect: true` | Reflect property → attribute |

Assign **new** values for objects/arrays (`this.items = [...this.items, next]`), do not mutate in place if you need an update.

## Directives

Named exports from `docks/lit` (also available as in Lit docs):

```js
import { repeat, when, classMap, styleMap, ifDefined, live, ref, keyed } from "docks/lit";
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

`docks/lit` also re-exports `@lit-labs/signals` helpers: `signal`, `computed`, `watch`, `SignalWatcher`, `withWatch`. Prefer `static properties` for simple canvas state unless you already use signals.

## Anti-patterns

- Decorators or `.ts` syntax in `.canvas.js`
- Mutating arrays/objects in place without reassignment
- Relying on `this` inside a non-arrow inline handler incorrectly
- Calling `customElements.define` from a workspace canvas module
