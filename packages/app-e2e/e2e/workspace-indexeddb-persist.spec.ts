import { test, expect } from './fixtures.js';

const UI_MS = 3000;

test.describe('Workspace (IndexedDB) persistence', () => {
    test.describe.configure({ timeout: 60_000 });

    test('create text file, edit in plain editor, save, reopen — content matches', async ({ page }) => {
        const fileName = `e2e-persist-${Date.now()}.txt`;
        const uniqueLine = `E2E persist ${Date.now()} hello`;

        await page.goto('/', { timeout: UI_MS });

        await expect(page.locator('docks-standard-layout')).toBeVisible({ timeout: UI_MS });

        // Workspace tab + default IndexedDB root (see WorkspaceService in core).
        const mainSidebar = page.locator('docks-tabs#sidebar-main');
        await expect(mainSidebar).toBeVisible({ timeout: UI_MS });
        await mainSidebar.locator('wa-tab[panel="view.filebrowser"]').click();

        const fileBrowser = page.locator('docks-filebrowser');
        await expect(fileBrowser).toBeVisible({ timeout: UI_MS });
        await expect(fileBrowser.locator('wa-tree')).toBeVisible({ timeout: UI_MS });

        const rootFolder = fileBrowser.locator('wa-tree-item').filter({ hasText: 'My Folder' }).first();
        await expect(rootFolder).toBeVisible({ timeout: UI_MS });
        await rootFolder.click();

        // touch with ask: Create → Create File… → prompt path (relative to selected folder).
        const createMenu = fileBrowser.locator('docks-command[dropdown="filebrowser.create"]');
        await createMenu.locator('wa-button[slot="trigger"]').click();
        await page.getByText('Create File...', { exact: true }).click();

        const dialog = page.locator('wa-dialog[open][label="Input"]');
        await expect(dialog).toBeAttached({ timeout: UI_MS });
        const pathInput = dialog.locator('docks-prompt-dialog-content wa-input');
        await pathInput.waitFor({ state: 'attached', timeout: UI_MS });
        await pathInput.locator('input').fill(fileName);
        await dialog.locator('.dialog-service-footer wa-button').filter({ hasText: 'OK' }).click({ force: true });

        await expect(fileBrowser).toContainText(fileName, { timeout: UI_MS });

        const fileRow = fileBrowser.locator('wa-tree-item').filter({ hasText: fileName }).first();
        await expect(fileRow).toBeVisible({ timeout: UI_MS });
        await fileRow.dblclick();

        // Plain editor: system.plain-editor (default for generic files); save via global save (Ctrl+S).
        const editorHost = page.locator('docks-tabs#editor-area-main docks-plain-editor');
        await expect(editorHost).toBeVisible({ timeout: UI_MS });

        const textSurface = editorHost.locator('docks-texteditor wa-textarea');
        await expect(textSurface).toBeVisible({ timeout: UI_MS });
        const innerTextarea = textSurface.locator('textarea').first();
        await innerTextarea.click();
        await page.keyboard.press('ControlOrMeta+a');
        await page.keyboard.type(uniqueLine);

        await page.keyboard.press('ControlOrMeta+s');

        const editorTabs = page.locator('docks-tabs#editor-area-main');
        const activeTab = editorTabs.locator('wa-tab[aria-selected="true"]');
        await activeTab.locator('wa-icon[name="xmark"]').click();

        await expect(editorHost).toBeHidden({ timeout: UI_MS });

        // Reopen from tree; assert persisted content via plain text editor.
        const fileRowAgain = fileBrowser.locator('wa-tree-item').filter({ hasText: fileName }).first();
        await fileRowAgain.dblclick();

        const editorAfterReopen = page.locator('docks-tabs#editor-area-main docks-plain-editor');
        await expect(editorAfterReopen).toBeVisible({ timeout: UI_MS });
        await expect(editorAfterReopen.locator('docks-texteditor wa-textarea')).toBeVisible({ timeout: UI_MS });

        // Value lives under nested shadow (wa-textarea); host toContainText does not include it reliably.
        const reopenedTextarea = editorAfterReopen.locator('docks-texteditor wa-textarea').locator('textarea').first();
        await expect(reopenedTextarea).toHaveValue(uniqueLine, { timeout: UI_MS });
    });
});
