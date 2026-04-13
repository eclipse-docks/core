# {{APP_NAME}}

Application built with [Eclipse Docks](https://github.com/eclipse-docks/core).

## Getting started

```bash
npm run dev
```

Then open the URL shown in the terminal (e.g. https://localhost:5173/).

## Scripts

- **dev** – Start the development server
- **build** – Build for production
- **preview** – Preview the production build locally

## Structure

- **packages/app** – The Docks app (entry point, UI)
- **packages/example-extension** – Example extension; use it as a reference to add your own

## Extensions

Add `@eclipse-docks/extension-*` packages to `packages/app/package.json`, then list them in `packages/app/src/main.ts` (`registerApp({ extensions: [...] })`). Vite loads their side-effect entry points automatically via `resolveDepVersionsPlugin()` in `vite.config.ts` (no separate `extensions.ts` file). Pass `extensionSideEffects: false` if you need to disable that.

## PWA

The app is set up with **vite-plugin-pwa** (injectManifest), a **service worker** at `packages/app/src/sw.ts`, and **`@eclipse-docks/extension-pwa`** for install / update controls in the main center toolbar. Production `npm run build` emits the web app manifest and precached assets. To opt out, remove the PWA extension from `packages/app/package.json` and `packages/app/src/main.ts`, delete `src/sw.ts`, and strip the `VitePWA(...)` block from `packages/app/vite.config.ts` (and set `resolveDepVersionsPlugin({ extensionSideEffects: false })` if you no longer want automatic extension imports).
