import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, devices } from '@playwright/test';

const packageRoot = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(packageRoot, '../..');

/** Local default: reuse preview on 4173 if already up (skips `webServer.command`, so no rebuild). Set `PW_E2E_REUSE_SERVER=0` to always run the command (build core + app-e2e, then preview). CI never reuses. */
const reusePreviewServer = process.env.CI ? false : process.env.PW_E2E_REUSE_SERVER !== '0';

const desktopChrome = { ...devices['Desktop Chrome'] };

/**
 * Story mode: `E2E_STORY=1` enables **video** here and **click visualizations** via `e2e/fixtures.ts`
 * (import `test`/`expect` from `./fixtures.js`). Specs use `beat`/`dwell` from `story-utils` for pacing.
 */
export default defineConfig({
    testDir: path.join(packageRoot, 'e2e'),
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: process.env.CI ? 'github' : 'list',
    use: {
        baseURL: 'http://127.0.0.1:4173',
        screenshot: 'on',
        trace: 'on-first-retry',
        video: process.env.E2E_STORY === '1' ? 'on' : 'off',
    },
    projects: [{ name: 'chromium', use: { ...desktopChrome } }],
    webServer: {
        command:
            'npm run build -w @eclipse-docks/core && npm run build -w @eclipse-docks/app-e2e && E2E_HTTP_PREVIEW=1 npm run preview -w @eclipse-docks/app-e2e -- --host 127.0.0.1 --port 4173 --strictPort',
        cwd: repoRoot,
        url: 'http://127.0.0.1:4173',
        // Local default reuses 4173; if Pyodide hangs, restart preview so COOP/COEP apply (vite E2E_HTTP_PREVIEW).
        reuseExistingServer: reusePreviewServer,
        timeout: 180_000,
    },
});
