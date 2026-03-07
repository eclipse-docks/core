# Eclipse Lyra default app

Template application built on Eclipse Lyra. Use this package as a starting point for downstream applications.

- **Run dev server**: From repo root, `npm run dev` (or from this directory, `npm run dev`).
- **Build**: From repo root, `npm run build:app` (or from this directory, `npm run build`). Output is in `dist/`.

The app registers a single app definition with extensions; the default layout is `standard` (IDE). Import `./dashboard-layout` to add the Dashboard layout—users can switch between IDE and Dashboard via the toolbar layout switcher.

To create your own app, copy this package, adjust `src/main.ts` (register your app, choose extensions and optional `layoutId`), and add your own dependencies as needed.

**Resolved package info in About:** To show actual installed dependency versions (instead of specifiers like `*` or `^1.0.0`) in the version-info / About UI:

1. In `vite.config.ts`, add `import { resolveDepVersionsPlugin } from '@eclipse-lyra/core/vite-plugin-resolve-deps'` and include `resolveDepVersionsPlugin()` in the `plugins` array.
2. When calling `appLoaderService.registerApp()`, pass `{ hostConfig: true }` in the options. The framework will merge build-injected name, version, and dependencies into the app. Add `marketplaceCatalogUrls` on the app definition (e.g. from package.json) if you use the marketplace.
