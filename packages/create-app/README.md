# @eclipse-docks/create-app

Scaffold a new Eclipse Docks app with a single command.

## Testing locally

From the Eclipse Docks monorepo root, run the CLI with Node (no publish needed):

```bash
node packages/create-app/index.js my-app
# or non-interactive:
node packages/create-app/index.js my-app --yes
```

Or use `npx` with the package path:

```bash
npx file:./packages/create-app my-app --yes
```

Then `cd my-app && npm run dev` to run the scaffolded app.

## Usage (published package)

```bash
npm create @eclipse-docks/app
```

With a project name (directory):

```bash
npm create @eclipse-docks/app my-app
```

To skip prompts when a project name is provided:

```bash
npm create @eclipse-docks/app my-app -- --yes
```

## Next steps

After scaffolding:

```bash
cd my-app
npm run dev
```

From the created project root, `npm run dev` runs the app (Vite). Use `npm run build` and `npm run preview` to build and preview.

## What you get

- A **monorepo** with two workspace packages:
  - **`packages/app`** – the Docks app (Vite, core + extensions from npm), including **PWA** (web app manifest, injectManifest service worker, `@eclipse-docks/extension-pwa` for install/update in the toolbar).
  - **`packages/example-extension`** – a minimal example extension you can copy or extend.
- The app registers a **logo contribution** on the left main toolbar (slot `start`) with the text `my!app`; you can change it in `packages/app/src/main.ts`.
- The example extension is loaded by the app and adds an "Example" view in the left side panel.

## Example extension

The template includes an example extension in **`packages/example-extension`** to show how to build your own extensions without publishing a separate npm package.

- **`src/index.ts`** – Registers the extension with `extensionRegistry.registerExtension()` (id, name, description, loader, icon). Same pattern as published extensions like `@eclipse-docks/extension-howto-system` and `@eclipse-docks/extension-utils`.
- **`src/example-extension-loader.ts`** – Loaded when the extension is activated. Registers a **TabContribution** to `SIDEBAR_MAIN` (the left side panel), so the "Example" tab appears alongside the workspace file browser.
- **`tsconfig.json`** – TypeScript config for the extension (IDE and type-checking).
- **`vite.config.ts`** – Vite lib build; run `npm run build -w example-extension` to output `dist/` when you want to publish the extension.

You can edit `packages/example-extension` in place, add more views or contributions, or copy it to start a new extension. The app depends on it via `"example-extension": "*"` in `packages/app/package.json` (npm links the workspace package). The app compiles the extension from source in dev; use the extension’s build script if you publish it as a separate package.
