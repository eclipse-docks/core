---
name: eclipse-docks-webawesome
description: >-
  Web Awesome UI components in Eclipse Docks via docks/webawesome. Use when
  building buttons, inputs, selects, checkboxes, dialogs, drawers, tabs, toasts,
  forms, icons, or layout utilities (wa-stack, wa-cluster, wa-grid) in canvases
  or Docks UI.
---

# Eclipse Docks Web Awesome (`docks/webawesome`)

Side-effect import once — Docks already registers components, themes, and the `docks` icon library:

```js
import "docks/webawesome";
```

Do **not** import individual `@awesome.me/webawesome/dist/components/...` paths from a canvas; the bridge loads the set used by the app. Always use **closing tags** (`<wa-input></wa-input>`, never `<wa-input />`).

## Official agent skills (direct URLs)

Docs overview: https://webawesome.com/docs/ai/agent-skills

When you need exact props/events/slots, layout, or theming beyond this cheat sheet, `fetch` these markdown URLs directly (do not scrape the HTML docs page):

**Component skill**

- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome/SKILL.md
- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome/references/choosing-components.md
- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome/references/usage.md
- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome/references/form-controls.md
- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome/references/themes.md
- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome/references/tokens/color.md
- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome/references/utilities/layout.md
- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome/references/utilities/color.md

**Common component APIs** (`wa-*` → same stem)

- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome/references/components/button.md
- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome/references/components/input.md
- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome/references/components/textarea.md
- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome/references/components/checkbox.md
- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome/references/components/switch.md
- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome/references/components/select.md
- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome/references/components/option.md
- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome/references/components/radio-group.md
- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome/references/components/dialog.md
- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome/references/components/drawer.md
- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome/references/components/dropdown.md
- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome/references/components/tab-group.md
- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome/references/components/card.md
- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome/references/components/callout.md
- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome/references/components/icon.md
- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome/references/components/toast.md

Other components: `https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome/references/components/<name>.md` (e.g. `number-input`, `slider`, `tooltip`).

**Design skill**

- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome-design/SKILL.md
- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome-design/references/getting-started.md
- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome-design/references/layouts-page.md
- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome-design/references/layouts-inpage.md
- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome-design/references/composition.md
- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome-design/references/patterns.md
- https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome-design/references/theming.md

Fetch only the URLs needed for the current task. Prefer these over inventing `wa-*` APIs.

## Lit bindings

```js
html`
  <wa-input
    label="Name"
    .value=${this.name}
    @wa-input=${(e) => { this.name = e.target.value; }}
  ></wa-input>
  <wa-button variant="brand" @click=${() => this.save()}>Save</wa-button>
`
```

- Prefer property binding (`.value`, `.checked`) over attributes for controlled values.
- Listen to Web Awesome events (`wa-input`, `wa-change`, `wa-select`, …), not only native `input`/`change`, when the component documents `wa-*` events.
- Slots: `<wa-icon slot="start" name="plus"></wa-icon>` inside buttons/inputs.

## Icons

```html
<wa-icon name="gear"></wa-icon>
```

Default library is Font Awesome names. Docks also registers library `docks` for app SVGs: `<wa-icon library="docks" name="…"></wa-icon>`.

## Layout utilities

Use Web Awesome utility classes in templates/styles when useful: `wa-stack`, `wa-cluster`, `wa-grid`, `wa-flank`, `wa-split`, `wa-gap-s` / `wa-gap-m`, `wa-align-items-center`, etc.

```js
html`<div class="wa-stack wa-gap-m">${/* children */}</div>`
```

## Component cheat sheet (common)

| Need | Component |
| --- | --- |
| Action | `wa-button`, `wa-button-group`, `wa-copy-button` |
| Text | `wa-input`, `wa-textarea`, `wa-number-input` |
| Choice | `wa-checkbox`, `wa-switch`, `wa-radio-group` + `wa-radio`, `wa-select` + `wa-option` |
| Overlay | `wa-dialog`, `wa-drawer`, `wa-popover`, `wa-tooltip`, `wa-dropdown` + `wa-dropdown-item` |
| Nav / structure | `wa-tab-group` + `wa-tab` + `wa-tab-panel`, `wa-breadcrumb`, `wa-divider` |
| Feedback | `wa-callout`, `wa-spinner`, `wa-progress-bar`, `wa-badge`, `wa-tag` |
| Content | `wa-card`, `wa-details`, `wa-accordion` + `wa-accordion-item`, `wa-markdown` |
| Toast host | `wa-toast` + `wa-toast-item` (prefer Docks `toastInfo` / `toastError` from `docks/core` when available) |

Pick **`wa-select`** for form values; pick **`wa-dropdown`** for action menus — do not confuse them.

## Theming & color tokens

Components follow the loaded Web Awesome theme (Docks imports default theme CSS). Prefer `variant`, `appearance`, and `size` on components before custom CSS.

**Prefer Web Awesome color tokens over custom colors** (`#hex`, `rgb()`, named colors). Tokens track light/dark and palette changes; hardcoded colors do not.

Use semantic / theme tokens first:

- Surfaces & text: `var(--wa-color-surface-default)`, `var(--wa-color-surface-raised)`, `var(--wa-color-surface-border)`, `var(--wa-color-text-normal)`, `var(--wa-color-text-quiet)`, `var(--wa-color-text-link)`
- Variants: `var(--wa-color-brand-fill-loud)`, `var(--wa-color-success-fill-normal)`, `var(--wa-color-warning-on-loud)`, `var(--wa-color-danger-border-normal)`, …
- Utility classes when enough: `wa-color-brand`, `wa-bg-surface-raised`, etc. (see utilities/color.md)

Reserve raw palette tints (`--wa-color-blue-50`, …) for rare cases. For deeper theming, `fetch` `tokens/color.md` and `webawesome-design/references/theming.md`.

```js
static styles = css`
  :host {
    display: block;
    color: var(--wa-color-text-normal);
    background: var(--wa-color-surface-default);
    border: 1px solid var(--wa-color-surface-border);
  }
  .accent { color: var(--wa-color-brand-on-quiet); }
`;
```

## Anti-patterns

- Self-closing custom elements
- Per-component package imports inside `.canvas.js`
- Using `wa-dropdown` where a form `wa-select` is required
- Hardcoded colors in CSS/templates instead of `--wa-*` color tokens
- Putting third-party map/CDN documents in the Lit tree — use iframe `srcdoc` (see canvas skill); keep WA on the host element
