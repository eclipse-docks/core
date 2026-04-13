# `@eclipse-docks/app-e2e`

Minimal Docks shell for Playwright only (not the public demo app in `packages/app`).

## Commands

- **From repo root:** `npm run test:e2e` / `npm run test:e2e:ui` (UI mode).
- **Browsers:** first-time setup from repo root: `npm run playwright:install-chromium`. On Linux CI images use `npm run playwright:install-chromium-ci` (installs Chromium plus system dependencies).

## Config

- [playwright.config.ts](./playwright.config.ts) — `webServer` builds core + this package, then serves preview on `127.0.0.1:4173`; `use.baseURL` matches that origin.
- **Artifacts:** `screenshot: 'on'`, `trace: 'on-first-retry'`; outputs under `test-results/` (gitignored).

## CI

[`.github/workflows/ci.yml`](../../.github/workflows/ci.yml) runs `npm run test:e2e` after installing Chromium. Playwright is **headless** by default. `CI=true` adjusts retries, workers, reporter, and `forbidOnly`.

## Harness

Entry is [src/main.ts](./src/main.ts): `registerApp` plus auxiliary/toolbar contributions as specs require.

- **Extensions:** list them in `AppDefinition.extensions` (e.g. `@eclipse-docks/extension-ai-system`, `@eclipse-docks/extension-monaco-editor` for workspace file editing in E2E).
- **Side-effect imports:** [vite.config.ts](./vite.config.ts) uses `resolveDepVersionsPlugin()` (automatic `@eclipse-docks/extension-*` side-effect imports are on by default). [src/main.ts](./src/main.ts) additionally imports the in-repo [`extension-ai-system/src/ai-system-extension.ts`](../../packages/extension-ai-system/src/ai-system-extension.ts) so that registration runs after the package entry and **before** the rest of `main.ts` adds E2E auxiliary tabs — order **`[aiview, …e2e tabs]`** — avoiding `wa-tab-group` “first tab” fallbacks being mistaken for successful `coupledEditors` coupling.

### `coupledEditors` example

- [e2e/coupled-editors.spec.ts](./e2e/coupled-editors.spec.ts) — select AI Assistant, open AI Config, assert `wa-tab-group`’s `active` and panels.
- **Two contributions:** real tab (`e2e-coupled-ai-config` + `system.ai-config-editor`) and decoy (`e2e-decoy-coupled-ai-config` + `system.ai-config-editor-FAKE`). One test checks the match; the other checks the decoy never activates when the real editor is active.

## HTTP preview

`webServer` sets `E2E_HTTP_PREVIEW=1` so [vite.config.ts](./vite.config.ts) skips **mkcert** for the preview server and keeps the readiness URL check reliable in CI.

## Missing functional tests (TODO)

Coverage today:

- [coupled-editors.spec.ts](./e2e/coupled-editors.spec.ts) — `TabContribution.coupledEditors` + auxiliary `wa-tab-group`.
- [workspace-indexeddb-persist.spec.ts](./e2e/workspace-indexeddb-persist.spec.ts) — default IndexedDB workspace, `touch` → Monaco edit → `Ctrl+S` → close → reopen, assert content.

The harness loads **core** (default layout, workspace, toolbars, file browser, log panel contributions — see `packages/core/src/contributions/default-ui-contributions.ts` and `default-layout-contributions.ts`), **`@eclipse-docks/extension-ai-system`**, **`@eclipse-docks/extension-monaco-editor`**, and the E2E auxiliary tabs in [src/main.ts](./src/main.ts). The [demo app](../../packages/app) pulls in many more extensions; add them to the harness only when a spec needs them.

### Core shell (already in the harness — high value)

- [ ] **Boot smoke** — `docks-standard-layout`, `#sidebar-main`, `#editor-area-main`, `#sidebar-auxiliary` present; optional `page.on('console')` filter for errors.
- [ ] **Layout switcher** — `docks-layout-switcher` on the main toolbar (`TOOLBAR_MAIN_RIGHT`) switches `layoutId` (e.g. `standard` ↔ `standard-full`); bottom panel / bottom sidebar regions appear or hide per [default layout definitions](../../packages/core/src/contributions/default-layout-contributions.ts).
- [ ] **Main sidebar** — further smoke beyond [workspace-indexeddb-persist.spec.ts](./e2e/workspace-indexeddb-persist.spec.ts) (e.g. connect extra root, rename).
- [ ] **Bottom panel** — `PANEL_BOTTOM` / log terminal when layout exposes bottom panel (`show-bottom-panel`).
- [ ] **Bottom toolbar** — `TOOLBAR_BOTTOM_END`: Info/version command, Fast Views control, language selector ([default-ui-contributions](../../packages/core/src/contributions/default-ui-contributions.ts)).
- [ ] **Editor area** — second editor or tab switch: open another editor from workspace or command, assert `docks-tabs#editor-area-main` selection (beyond single AI Config editor).
- [ ] **Coupling lifecycle** — after coupled auxiliary is active, **switch active editor away** from the coupled id → auxiliary should follow `DocksPart` / `activeEditorSignal` (reverse path vs. current spec).
- [ ] **Closable auxiliary tab** — extra `SIDEBAR_AUXILIARY` contribution with `closable: true`; close does not corrupt `wa-tab-group` state.

### Workspace (IndexedDB) — create, edit, save, reopen

This is the flow you described: prove **browser storage** round-trips through the real workspace + editor stack.

**Default backend:** On startup, if no workspace roots are restored from persistence, `WorkspaceService` connects an IndexedDB root automatically (`connectFolder({ indexeddb: true, … })` in [`packages/core/src/core/filesys/common.ts`](../../packages/core/src/core/filesys/common.ts)). No extra “connect WebDAV” step is required for a first-run harness.

**Why Monaco (not markdown):** [`@eclipse-docks/extension-md-editor`](../../packages/extension-md-editor/src/md-editor-extension.ts) renders Markdown as HTML and does **not** implement a save path for editing. For **type → save → reload**, add [`@eclipse-docks/extension-monaco-editor`](../../packages/extension-monaco-editor/src/monaco-editor-extension.ts) to the harness: it handles any `File`, and `docks-monaco-editor` calls `saveContents` from the global **`save`** command (`CTRL+S` — [`packages/core/src/commands/global.ts`](../../packages/core/src/commands/global.ts)).

**Suggested E2E sequence (scoped to IndexedDB):**

1. Open the **Workspace** sidebar (`docks-filebrowser`); ensure the default IndexedDB root (e.g. “My Folder”) is visible.
2. **Create** a file — e.g. `touch` via the file browser **Create** control (`dropdown="filebrowser.create"` → [`touch`](../../packages/core/src/commands/touch.ts)), with a **unique path** per run (`e2e-${Date.now()}.txt`) to avoid clashes with leftover IndexedDB data in the same origin.
3. **Open** the file in the editor (double-click / context **Open**); wait for `docks-monaco-editor` (Monaco lazy-loads).
4. **Edit** the buffer — focus the Monaco surface and type; assert persisted text via `toContainText` on `docks-monaco-editor` (Monaco’s visible text lives in the view layer, not the IME `textarea`).
5. **Save** — `Ctrl+S` (`save` command when the part is dirty).
6. **Close** the editor tab, then **reopen** the file from the tree.
7. **Assert** the same unique line is visible in the editor.

**Implemented:** [workspace-indexeddb-persist.spec.ts](./e2e/workspace-indexeddb-persist.spec.ts). **CI / isolation:** unique filename per run; IndexedDB is per-origin (`127.0.0.1:4173`).

### `@eclipse-docks/extension-ai-system` (already in the harness)

- [ ] **`docks-aiview`** — AI Assistant tab smoke (input present / send disabled-or-enabled as designed).
- [ ] **Token usage** — `docks-token-usage` in bottom toolbar contribution ([`ai-system-extension.ts`](../../packages/extension-ai-system/src/ai-system-extension.ts)).
- [ ] **`open_ai_config` / command** — same user outcome as toolbar button; optional duplicate if command palette exists later.

### Opt-in extensions (match [packages/app](../../packages/app) when relevant)

- [ ] **Command palette** — `@eclipse-docks/extension-command-palette`: open, filter, execute a command with visible effect.
- [ ] **Markdown / settings / catalog / …** — one focused spec per extension once listed in harness `extensions[]` (Monaco already covered for workspace persist; avoid bloating default CI time).

### Quality / infra

- [ ] **Keyboard & a11y** — stable selectors for tab lists / toolbars; `aria-selected` on tabs already used in coupled spec.
- [ ] **Cross-browser** — extra Playwright projects (Firefox/WebKit) if CI budget allows.
