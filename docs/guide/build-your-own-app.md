# Build your own app

Use **`packages/app`** as a template: copy it or add a new workspace package.

## Steps

1. **Create or copy the app package**  
   Add a new package under `packages/` (e.g. `packages/my-app`) or duplicate `packages/app`. Ensure the root `package.json` `workspaces` includes `packages/*`.

2. **Install and wire the app**  
   In the app package, depend on `@eclipse-lyra/core` and the extensions you need (`@eclipse-lyra/extension-*`).

3. **Entry point**  
   In your app entry (e.g. `main.ts`):
   - Call `applyAppHostConfig({ packageInfo, marketplaceCatalogUrls })` if you use the marketplace.
   - Import the extensions you need (side-effect imports so they register).
   - Call `appLoaderService.registerApp(appDefinition, { autoStart: true })`.

4. **App definition**  
   Minimal example:

```ts
import { appLoaderService, type RenderDescriptor } from '@eclipse-lyra/core';

appLoaderService.registerApp(
  {
    id: 'my-app',
    name: 'My App',
    version: '1.0.0',
    extensions: [
      '@eclipse-lyra/extension-command-palette',
      '@eclipse-lyra/extension-settings-tree',
      '@eclipse-lyra/extension-ai-system',
    ],
    component: {
      tag: 'lyra-standard-layout',
      attributes: { 'show-bottom-panel': 'true' },
    } satisfies RenderDescriptor,
  },
  { autoStart: true }
);
```

5. **Run and build**  
   From the repo root: `npm run dev` (or run the app package’s dev script). For production: `npm run build` then build the app package; output will be in the app’s `dist/`.

See [Concepts: Apps](/concepts/apps) for all `AppDefinition` options.
