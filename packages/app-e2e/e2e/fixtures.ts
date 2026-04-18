import { test as base, expect } from '@playwright/test';
import { installStoryClickVisualization } from './story-utils.js';

/**
 * Use this instead of `@playwright/test` in E2E specs so story mode (`E2E_STORY=1`) gets click
 * ripples from `installStoryClickVisualization` on every page, without per-file `test.use` or
 * `beforeEach`. When `E2E_STORY` is unset, the hook is a no-op.
 */
export const test = base.extend({
    page: async ({ page }, use) => {
        await installStoryClickVisualization(page);
        await use(page);
    },
});

export { expect };
export type { Locator, Page } from '@playwright/test';
