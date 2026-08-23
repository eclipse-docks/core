---
name: eclipse-docks-contributing
description: "Contributing to the eclipse-docks/core monorepo: ECA/EPL-2.0, workspace layout (packages/core, extension-*, app, app-e2e, create-app), npm scripts, Vitest/Playwright, public API boundaries, Lit/Web Awesome via packages/core externals PRs—not building downstream apps."
---

# Eclipse Docks — contributors (upstream monorepo)

> Work on **`github.com/eclipse-docks/core`**: implementation, fixes, docs, CI. For **shipping your own product** on Docks, load the **`eclipse-docks-core`** skill (`@eclipse-docks/core` app-author skill)—not this one.

---

## Scope

Use this guidance when editing **this repository**:

- **`packages/core`** — platform (**`@eclipse-docks/core`**): registries, services, **`docks-*`** UI parts, dialogs, vite plugins bundled with core, **`src/externals/*`** Lit/Web Awesome wrappers.
- **`packages/extension-*`** — bundled extensions that depend on core and register contributions/commands/editor factories.
- **`packages/app`** — default/example app composing core + extensions.
- **`packages/app-e2e`** — Playwright harness only (minimal shell + specs).
- **`packages/create-app`** — scaffolding template for **`npm create @eclipse-docks/app`**.
- **`docs/`** — published site consumed at [docks.eclipse.dev/docs/](https://docks.eclipse.dev/docs/).

Do **not** use contributor-only internals when helping **downstream apps** unless you are patching core/extensions in this repo.

---

## Prerequisites and license

By contributing you agree contributions are **[EPL-2.0](https://www.eclipse.org/legal/epl-2.0/)**. Eclipse projects require a one-time **[Eclipse Contributor Agreement (ECA)](https://www.eclipse.org/legal/ECA.php)** before merge. Sign commits per project practice (e.g. **`git commit -s`**).

**Process:** Problems and ideas → **[issues](https://github.com/eclipse-docks/core/issues)** / **[discussions](https://github.com/eclipse-docks/core/discussions)** → focused PRs referencing issues. Details: **`CONTRIBUTING.md`** in repo root.

---

## Development commands (workspace root)

```bash
git clone https://github.com/eclipse-docks/core.git
cd core
npm install

npm run dev           # dev server for default app
npm run test          # Vitest unit tests (@eclipse-docks/core)
npm run type-check    # TypeScript
npm run test:e2e      # Playwright (packages/app-e2e); Chromium install: npm run playwright:install-chromium
npm run build         # core only
npm run build:app     # core + app (extensions resolved from source via Vite)
npm run build:extensions  # extension dist/ — needed before npm publish
npm run docs:dev      # docs site (nested tooling)
```

E2E behavior and harness notes: **`packages/app-e2e/README.md`**. CI parity: **`.github/workflows/ci.yml`**.

---

## Where to put code

| Area | Responsibility |
|------|----------------|
| **Core** (`packages/core`) | Stable platform APIs, shells, contributions **defaults**, shared parts/widgets, **`externals/lit`** and **`externals/webawesome`**, diagnostics that apply to every app. Avoid extension-specific business logic unless it belongs in core by design. |
| **Extensions** (`packages/extension-*`) | Optional product features (editors, AI, palettes, notebooks, …): register with **`extensionRegistry`**; keep dependencies lean. |
| **Default app** (`packages/app`) | Reference composition of extensions—useful for demos and regressions—not a dumping ground for non-demo platform code. |
| **Create-app template** (`packages/create-app/template`) | What **`npm create @eclipse-docks/app`** generates—keep onboarding friction low and aligned with docs. |

**Exports:** Treat **`packages/core`** root export and **`package.json` `exports`** as the public contract. Add or change exports deliberately; API changes may need **`docs/`** and changelog-style release notes for consumers.

---

## Lit and Web Awesome inside core

- **Authors (downstream)** import **`@eclipse-docks/core/externals/lit`** and **`externals/webawesome`**.
- **Contributors editing core** extend or adjust **`packages/core/src/externals/lit.ts`** and **`webawesome.ts`** when new directives/components must be centrally registered—then downstream stays on re-exports.

Keep Web Awesome registrations consistent with versioning in **`packages/core/package.json`**; avoid duplicated WA/Lit installs across workspaces without cause.

---

## Docs and QA expectations

- Substantial behavior or UX changes usually need updates under **`docs/`** ([published docs](https://docks.eclipse.dev/docs/)).
- Run **`npm run test`**, **`npm run type-check`**, and when UI/load order/registries shift, **`npm run test:e2e`** before merge (align with **`CONTRIBUTING.md`**).

---

## Optional — quick pitfalls

#### Mixing audiences

Adding long “how to build **your** SaaS app” narratives into **`CONTRIBUTING.md`** / core internals—prefer **`docs/guide/`** and the **`eclipse-docks-core`** skill for downstream authors.

#### Breaking app authors

Publishing deep imports (**`packages/core/src/...`**) as if they were API; shrinking **`exports`** without compatibility story; or encouraging **`lit` / `@awesome.me/webawesome`** direct deps in extensions when re-exports exist.

#### Wrong package

Platform behavior in **`packages/app`** that should live in **`extension-*`** or core; duplicate extension logic spread across **`extension-*`** when a shared **`packages/core`** helper is appropriate.
