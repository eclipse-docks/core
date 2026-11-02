---
name: eclipse-docks-webawesome
description: >-
  Web Awesome UI in Eclipse Docks via docks/webawesome. Use when building
  buttons, inputs, selects, checkboxes, dialogs, forms, icons, or layout
  utilities in canvases or Docks UI. Fetch the official component page before
  writing wa-* markup.
---

# Eclipse Docks Web Awesome (`docks/webawesome`)

```js
import "docks/webawesome";
```

That import registers the components, the theme, and the `docks` icon library. Canvas files use this import. Custom elements take a closing tag: `<wa-input></wa-input>`.

## Look up the component, then write it

Fetch the official page for each tag before using its props, slots, or events. Use that page's events table. Ignore the overview line that says to listen for `wa-input` or `wa-change`.

- Index: https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome/SKILL.md
- One component: `https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome/references/components/<name>.md` (`button`, `input`, `checkbox`, `select`, …)
- Which component: https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome/references/choosing-components.md
- Layout, tokens, theming: https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@3/dist/skills/webawesome-design/SKILL.md

Bind properties (`.value`, `.checked`). Listen for the events that page lists.

## `wa-input` and `wa-number-input`

Their pages list an `input` event. This build copies keystrokes onto `.value` and does not re-dispatch `input`, so a host `@input` listener never runs. `change` fires on blur, after a click handler.

Read `.value` in the click or Enter handler. For live text, use `@keyup` and assign `e.target.value`. `wa-textarea` does re-dispatch `input`.

## Docks

- Shell icons: `<wa-icon library="docks" name="…"></wa-icon>`. Other icons use the names on the icon page.
- Color comes from `--wa-color-*` tokens so the loaded theme covers light and dark.
- Shell toasts: `toastInfo` / `toastError` from `docks/core` when that module is already loaded.
