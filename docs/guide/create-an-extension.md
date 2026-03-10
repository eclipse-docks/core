# Create an extension

## 1. New package

Create a new package under `packages/` (e.g. `packages/extension-myfeature`) with:

- `package.json` — name `@eclipse-lyra/extension-myfeature`, dependency on `@eclipse-lyra/core`.
- `tsconfig.json` — extends or matches the repo TypeScript setup.
- `src/index.ts` — entry that registers the extension.

Ensure the root `package.json` workspaces include `packages/*`.

## 2. Register the extension

In `src/index.ts`, register with `extensionRegistry` and provide a **loader** that runs when the extension is enabled:

```ts
import { extensionRegistry, i18n } from '@eclipse-lyra/core';
import pkg from '../package.json';

const t = await i18n(import.meta.glob('./i18n*.json'), true);

extensionRegistry.registerExtension({
  id: pkg.name,
  name: t.EXT_MYFEATURE_NAME,
  description: t.EXT_MYFEATURE_DESC,
  loader: () => import('./myfeature-extension'),
  icon: 'puzzle-piece',
  dependencies: ['@eclipse-lyra/extension-someother'], // optional
});
```

Add `src/i18n.en.json` (and optionally `src/i18n.de.json`) with flat key-value objects, e.g. `{ "EXT_MYFEATURE_NAME": "My Feature", "EXT_MYFEATURE_DESC": "Description." }`.

The extension id should match the package name (e.g. `@eclipse-lyra/extension-myfeature`).

The **loader** should dynamically import the module that performs the actual registration (commands, contributions, editors).

## 3. Loader module

In `myfeature-extension.ts` (or similar), register commands and optionally the UI contribution (e.g. toolbar button) in one call:

```ts
import { registerAll, TOOLBAR_MAIN_RIGHT } from '@eclipse-lyra/core';

registerAll({
  command: {
    id: 'myfeature.do-something',
    name: 'Do something',
    description: 'Runs the feature action',
  },
  handler: {
    execute: (_context) => { /* ... */ },
    canExecute: (context) => true, // optional
  },
  contribution: {
    target: TOOLBAR_MAIN_RIGHT,
    label: 'Do something',
    icon: 'bolt',
  },
});
```

You can also register the contribution separately with `contributionRegistry.registerContribution(target, { command, label, icon, ... })` if you prefer.

## 4. i18n (optional)

Use **i18n(import.meta.glob('./i18n*.json'), true)** with co-located locale files (`i18n.en.json`, `i18n.de.json`) so the extension name and description update when the user changes language.

See [Concepts: Extensions](/concepts/extensions) and [Add a sidebar tab](/guide/add-sidebar-tab), [Add a command and toolbar button](/guide/add-command-toolbar).
