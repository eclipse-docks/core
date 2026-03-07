# Build your own app

Use **`packages/app`** as a template: copy it or add a new workspace package.

## Steps

1. **Create or copy the app package**  
   Add a new package under `packages/` (e.g. `packages/my-app`) or duplicate `packages/app`. Ensure the root `package.json` `workspaces` includes `packages/*`.

2. **Install and wire the app**  
   In the app package, depend on `@eclipse-lyra/core` and the extensions you need (`@eclipse-lyra/extension-*`).

3. **Entry point**  
   In your app entry (e.g. `main.ts`):
   - Import the extensions you need (side-effect imports so they register).
   - Call `appLoaderService.registerApp(appDefinition, { autoStart: true, hostConfig: true })`. Add `marketplaceCatalogUrls` and optionally `dependencies` to the app definition if you use the marketplace or want to show dependency versions in About.

4. **App definition**  
   Minimal example (default layout is `standard`, i.e. IDE):

```ts
import { appLoaderService } from '@eclipse-lyra/core';

appLoaderService.registerApp(
  {
    extensions: [
      '@eclipse-lyra/extension-command-palette',
      '@eclipse-lyra/extension-settings-tree',
      '@eclipse-lyra/extension-ai-system',
    ],
    layoutId: 'standard',
  },
  { autoStart: true, hostConfig: true }
);
```

To add another layout (e.g. dashboard), register a **LayoutContribution** to the `SYSTEM_LAYOUTS` slot (`id`, `name`, `component`, optional `onShow`). Users switch between layouts via the toolbar layout switcher.

5. **Run and build**  
   From the repo root: `npm run dev` (or run the app package's dev script). For production: `npm run build` then build the app package; output will be in the app's `dist/`.

See [Concepts: Apps](/concepts/apps) for all `AppDefinition` options and layout registration.
