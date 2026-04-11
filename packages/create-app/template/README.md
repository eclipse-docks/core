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

- **packages/app** – The Docks app (entry point, extensions, UI)
- **packages/example-extension** – Example extension; use it as a reference to add your own

## PWA

The app is set up with **vite-plugin-pwa** (injectManifest), a **service worker** at `packages/app/src/sw.ts`, and **`@eclipse-docks/extension-pwa`** for install / update controls in the bottom toolbar. Production `npm run build` emits the web app manifest and precached assets. To opt out, remove the PWA extension from `packages/app/src/main.ts` and `extensions.ts`, delete `src/sw.ts`, and strip the `VitePWA(...)` block from `packages/app/vite.config.ts`.
