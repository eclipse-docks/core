# Story E2E tests (e.g. `docks-walkthrough.spec.ts`, `Storyboard:` + `--grep`)

Story specs live next to other Playwright files under `e2e/`. They serve **two roles**:

1. **Functional E2E** — Same assertions as any spec; they run with `npm run test:e2e` (no extra env). They increase coverage of real user flows.
2. **Short product clips** — With `E2E_STORY=1`, the same files record **video** and use **pacing** so demos feel human, not robotic.

There is no separate Playwright project or ignore list: one `chromium` project runs everything.

---

## Naming

- **File name:** any `*.spec.ts` under `e2e/`; **`npm run test:e2e:stories`** uses `--grep Storyboard`, so include a top-level `test.describe('Storyboard: …')` (e.g. [`docks-walkthrough.spec.ts`](./docks-walkthrough.spec.ts)).
- **Describe titles:** Prefer readable names such as `Storyboard: …` so traces and reports read well.

---

## Commands

| Command | What runs |
|--------|------------|
| `npm run test:e2e` (repo root or this package) | All E2E, including story specs — **no** `E2E_STORY`, **no** video, **no** pacing, **no** caption overlays |
| `npm run test:e2e:stories` | Only tests matching **`--grep Storyboard`** (see below), with **`E2E_STORY=1`** (video on, pacing on, optional **Next** captions) |

Story script (in `package.json`): `E2E_STORY=1 playwright test --grep Storyboard` — keep a top-level `test.describe('Storyboard: …')` in each story file so it is included. Full `test:e2e` clears **`E2E_STORY`** so a leftover shell export does not enable story mode.

---

## Boilerplate for a new story file

1. **Import `test` / `expect` from [`fixtures.ts`](./fixtures.ts)** (not `@playwright/test`), with a `.js` suffix for ESM:

   ```ts
   import { test, expect } from './fixtures.js';
   ```

   That wires [**click ripple**](./story-utils.ts) hooks on every `page` when **`E2E_STORY=1`** (no per-file `beforeEach`). Normal `npm run test:e2e` leaves them off.

2. **Video** is controlled globally in [`playwright.config.ts`](../playwright.config.ts): **`video: 'on'`** when **`E2E_STORY=1`**, otherwise **`off`**. You do not need `test.use({ video: … })` in story files.

3. **Pacing helpers** from [`story-utils.ts`](./story-utils.ts) (in specs, import with a `.js` suffix for Node ESM resolution):

   - `beat(page, ms?, caption?)` — short pause; with **`caption`** and **`E2E_STORY=1`**, shows a centered **Next** card (dimmed backdrop) for that wait, then removes it.
   - `installStoryClickVisualization(page)` — registered automatically via **`fixtures.ts`** when story mode is on; you rarely call it manually.
   - `dwell(page, ms?, caption?)` — longer hold; same optional **caption** behavior.
   - `storyPaceExtraMs(n)` — extra ms on top of base pace; **0** when not in story mode (keeps CI fast).
   - `STORY_CAPTION_MIN_MS` — minimum time a caption stays visible (also when `STORYBOARD_PACE_MS=0`).

4. **Structure** — Use `test.step('…', async () => { … })` for named segments in traces and recordings.

5. **Timeouts** — Set `test.describe.configure({ timeout: … })` when a flow is slow (e.g. Pyodide in the Jupyter story).

---

## Environment

| Variable | Effect |
|----------|--------|
| `E2E_STORY=1` | Set automatically by `test:e2e:stories`. Enables **video** (see `playwright.config.ts`), **click ripples** (via `fixtures.ts` + `story-utils`), and non-zero pacing in `story-utils`. |
| `STORYBOARD_PACE_MS` | When `E2E_STORY=1`: base delay for `beat` / `dwell` (default ~1500 ms). Set to `0` for a faster clip. |

---

## On-screen captions (`caption` argument)

When you pass a **third argument** to `beat` or `dwell` and **`E2E_STORY=1`**, the page shows a **viewport-centered** card (full-screen dim + blur backdrop) with a **Next** label and your text for the **same duration** as the pacing wait, then it is removed automatically. Outside story mode, the string is ignored (no overlay, no extra time).

Use plain language for the next action, e.g. `dwell(page, undefined, 'Save from the editor toolbar.')`. The overlay is injected in the page via `page.evaluate` (id `__docks_e2e_story_caption__`); it does not use app dialogs.

---

## Making clips feel human

In **story mode** only, add pauses where a person would look or decide:

- After opening a panel or dialog, **`dwell`** so the UI is readable.
- After creating a resource, **select it**, **`dwell`**, then **double-click** to open (instead of jumping straight to open).
- Before save or close, a short **`dwell`** so the action is not instant after typing.
- For typing, optional `page.keyboard.type(text, { delay: 40 })` gated on `E2E_STORY === '1'` so normal E2E stays fast.

Avoid extra waits in **non-story** runs: `story-utils` already no-ops pacing when `E2E_STORY` is unset.

---

## Artifacts

With video on, Playwright writes recordings under `test-results/` (gitignored). Default config also uses screenshots on failure and trace on first retry — see [`playwright.config.ts`](../playwright.config.ts).

---

## Examples in this repo

- [`docks-walkthrough.spec.ts`](./docks-walkthrough.spec.ts) — Workspace file, layout, Extensions, Jupyter notebook extension, JS kernel, run cell.

Add more specs with a `Storyboard:` describe as you cover new flows (long or heavy flows may need a higher `test.describe.configure({ timeout })`).

---

## Shared helpers

[`story-utils.ts`](./story-utils.ts) — pacing, `dismissOpenPromptDialogs`, and Jupyter-specific locators when needed. Add shared story-only helpers here instead of copying across specs.
