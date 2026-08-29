# Build your own app

## Recommended: scaffold with create-app

The easiest way to start is to scaffold a new app with the official CLI. You get a monorepo with an app package and an example extension.

```bash
npm create @eclipse-docks/app my-app
cd my-app
npm run dev
```

This creates a project with:

- **`packages/app`** — The Docks app (entry point, extension list, logo). Edit `packages/app/src/main.ts` to add or remove extensions and customize the toolbar.
- **`packages/example-extension`** — A sample extension that adds a view to the left sidebar (same tab bar as the Workspace / file browser). Use it as a reference for your own extensions.

### Customizing the logo

The main toolbar uses **`public/logo.svg`**. The startup splash uses **`public/logo-loading.svg`** by default (injected at build time by `appSplashPlugin()` from `@eclipse-docks/core/vite-plugin-app-splash`, wired in the app’s `vite.config.ts`). Replace those files to brand the app, or pass **`logo: { src, alt?, width?, height? }`** for a different asset or size. Pass **`description`** for a short tagline under the logo if you want one.

### Splash screen

The HTML for the loading overlay (progress text, `app-load-progress` / `app-loaded` listeners, and keyframes) comes from core via **`appSplashPlugin()`**, not from a long copy-paste in `index.html`. Keep a minimal `index.html` with `<div id="app-root"></div>` and add the plugin next to `resolveDepVersionsPlugin()` and `localAliasesPlugin()`. To fully customize the overlay, omit the plugin and provide your own markup, or keep a manual `#app-loading-overlay` block—the plugin skips injection when that id is already present.

From the new project root: `npm run dev` starts the app, `npm run build` builds it, `npm run preview` previews the production build. See the generated `README.md` in the project for a short overview.

## Alternative: manual setup in the monorepo

If you prefer to work inside the Eclipse Docks repo or copy the default app by hand:

1. **Create or copy the app package**  
   Add a new package under `packages/` (e.g. `packages/my-app`) or duplicate `packages/app`. Ensure the root `package.json` `workspaces` includes `packages/*`.

2. **Install and wire the app**  
   In the app package, depend on `@eclipse-docks/core` and the extensions you need (`@eclipse-docks/extension-*`).

3. **Entry point**  
   In your app entry (e.g. `main.ts`):
   - Import the extensions you need (side-effect imports so they register).
   - Call `appLoaderService.registerApp(appDefinition, { autoStart: true, hostConfig: true })`. Add `marketplaceCatalogUrls` and optionally `dependencies` to the app definition if you use the marketplace or want to show dependency versions in About.

4. **App definition**  
   Minimal example with the standard IDE layout and default panel visibility:

```ts
import { appLoaderService } from '@eclipse-docks/core';

appLoaderService.registerApp(
  {
    extensions: [
      '@eclipse-docks/extension-command-palette',
      '@eclipse-docks/extension-settings-tree',
      '@eclipse-docks/extension-ai-system',
    ],
    layout: {
      id: 'standard',
      props: {
        showLeftSidebar: true,
        showAuxSidebar: true,
        showBottomPanel: false,
        showLeftAux: false,
        showRightAux: false,
      },
    },
  },
  { autoStart: true, hostConfig: true }
);
```

Adjust `layout.props` to control which regions are visible on first load (users can still toggle them from the layout menu). Omit `layout` entirely to use the same defaults via the framework default (`standard`).

To add another layout (e.g. dashboard), register a **LayoutContribution** to the `SYSTEM_LAYOUTS` slot (`id`, `name`, `component`, optional `onShow`). Users switch between layouts via the toolbar layout switcher.

5. **Run and build**  
   From the repo root: `npm run dev` (or run the app package's dev script). For production: `npm run build` then build the app package; output will be in the app's `dist/`.  
   For branding, add or replace **`public/logo.svg`** (toolbar) and **`public/logo-loading.svg`** (splash), and use **`appSplashPlugin()`** in Vite config unless you replace the splash HTML yourself.

See [Concepts: Apps](/concepts/apps) for all `AppDefinition` options and layout registration.
