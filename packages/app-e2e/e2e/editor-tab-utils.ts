import type { Locator, Page } from '@playwright/test';

/** Main editor tab strip (`docks-tabs` for the central editor area). */
export const MAIN_EDITOR_TABS = 'docks-tabs#editor-area-main';

function escapeRegExp(s: string): string {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * If closing a dirty editor tab opened the “unsaved changes” confirm, accept OK.
 */
export async function confirmUnsavedEditorCloseDialog(page: Page, timeout = 2500): Promise<void> {
    const ok = page.locator('wa-dialog[open]').getByRole('button', { name: /^OK$/i });
    if (await ok.isVisible({ timeout }).catch(() => false)) {
        await ok.click();
    }
}

export interface CloseMainAreaEditorOptions {
    /** After tab close, click OK on unsaved dialog if it appears. */
    confirmUnsaved?: boolean;
    /** Max wait for optional unsaved OK visibility (ms). */
    confirmTimeout?: number;
}

function tabClose(tab: Locator): Locator {
    return tab.locator('wa-icon[label="Close"]');
}

/** Close the currently selected tab in the main editor area. */
export async function closeActiveMainAreaEditor(
    page: Page,
    options?: CloseMainAreaEditorOptions,
): Promise<void> {
    await tabClose(page.locator(MAIN_EDITOR_TABS).locator('wa-tab[aria-selected="true"]')).click({
        force: true,
    });
    if (options?.confirmUnsaved) {
        await confirmUnsavedEditorCloseDialog(page, options.confirmTimeout ?? 2500);
    }
}

/**
 * Close a main editor tab by accessible tab name (substring; matches “Extensions … Close”, “file.ipynb …”, etc.).
 */
export async function closeMainAreaEditorByTabName(
    page: Page,
    name: string | RegExp,
    options?: CloseMainAreaEditorOptions,
): Promise<void> {
    await tabClose(page.locator(MAIN_EDITOR_TABS).getByRole('tab', { name }).first()).click({
        force: true,
    });
    if (options?.confirmUnsaved) {
        await confirmUnsavedEditorCloseDialog(page, options.confirmTimeout ?? 2500);
    }
}

/**
 * Close the main editor tab whose visible label matches `hasText` (e.g. `/\\.ipynb/` when the accessible name is truncated).
 */
export async function closeMainAreaEditorByTabHasText(
    page: Page,
    hasText: string | RegExp,
    options?: CloseMainAreaEditorOptions,
): Promise<void> {
    await tabClose(page.locator(MAIN_EDITOR_TABS).locator('wa-tab').filter({ hasText }).first()).click({
        force: true,
    });
    if (options?.confirmUnsaved) {
        await confirmUnsavedEditorCloseDialog(page, options.confirmTimeout ?? 2500);
    }
}

export { escapeRegExp };
