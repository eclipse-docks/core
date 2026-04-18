import { test, expect, type Locator } from './fixtures.js';
import {
    closeActiveMainAreaEditor,
    closeMainAreaEditorByTabHasText,
    closeMainAreaEditorByTabName,
    MAIN_EDITOR_TABS,
} from './editor-tab-utils.js';
import {
    beat,
    dwell,
    dismissOpenPromptDialogs,
    jupyterNotebookCreateMenuItem,
    storyPaceExtraMs,
} from './story-utils.js';

/**
 * Walkthrough: theme (light/dark, end on light), text file in workspace, layout switch, Jupyter notebook + JS kernel.
 * `Storyboard:` prefix keeps this file in `npm run test:e2e:stories` (`--grep Storyboard`).
 */

const FILE_NAME = 'hello-docks.txt';
const CONTENT = 'hello world';

/** Max wait for individual UI expectations and actions (fast fail). */
const UI_MS = 3000;

/** `wa-tree-item.filter({ hasText })` matches folder ancestors; target the label row instead. */
function treeItemForFileName(fileBrowser: Locator, fileName: string): Locator {
    const escaped = fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return fileBrowser
        .locator('.tree-label-text', { hasText: new RegExp(`^${escaped}$`) })
        .locator('xpath=ancestor::wa-tree-item[1]');
}

test.describe('Storyboard: Docks walkthrough', () => {
    test.describe.configure({ timeout: 120_000 });

    test('theme → text file → layout → extensions → Jupyter notebook + JavaScript', async ({ page }) => {
        const fileBrowser = page.locator('docks-filebrowser');
        const editorPlain = page.locator('docks-tabs#editor-area-main docks-plain-editor');
        const layoutSwitcher = page.locator('docks-layout-switcher');
        const themeSwitcher = page
            .locator('docks-toolbar#app-toolbars-main-right')
            .locator('wa-button[title="Theme Switcher"]');
        const htmlRoot = page.locator('html');

        await test.step('Theme: switch light/dark, stay on light', async () => {
            await page.goto('/', { timeout: UI_MS });
            await expect(page.locator('docks-standard-layout')).toBeVisible({ timeout: UI_MS });
            await expect(themeSwitcher).toBeVisible({ timeout: UI_MS });

            if (await htmlRoot.evaluate((el) => el.classList.contains('wa-light'))) {
                await themeSwitcher.click();
                await expect(htmlRoot).toHaveClass(/wa-dark/);
            } else {
                await expect(htmlRoot).toHaveClass(/wa-dark/);
            }

            await dwell(page, undefined, 'Switch from dark to light.');
            await themeSwitcher.click();
            await expect(htmlRoot).toHaveClass(/wa-light/);
            await beat(page, storyPaceExtraMs(450));

            await dwell(page, undefined, 'Switch to dark mode.');
            await themeSwitcher.click();
            await expect(htmlRoot).toHaveClass(/wa-dark/);
            await beat(page, storyPaceExtraMs(450));

            await dwell(page, undefined, 'Use light theme for the rest of the walkthrough.');
            await themeSwitcher.click();
            await expect(htmlRoot).toHaveClass(/wa-light/);
            await beat(page, storyPaceExtraMs(500));
        });

        await test.step('Load shell and open File Browser', async () => {
            await page.locator('docks-tabs#sidebar-main').locator('wa-tab[panel="view.filebrowser"]').click();
            await expect(fileBrowser.locator('wa-tree')).toBeVisible({ timeout: UI_MS });
            await dwell(page, undefined, 'Open the workspace file browser.');
            await beat(page);
        });

        await test.step('Create hello-docks.txt and open in plain editor', async () => {
            const rootFolder = fileBrowser.locator('wa-tree-item').filter({ hasText: 'My Folder' }).first();
            await expect(rootFolder).toBeVisible({ timeout: UI_MS });
            await rootFolder.click();
            await beat(page);
            await dwell(page, undefined, 'Create a new text file in this folder.');

            await fileBrowser.locator('docks-command[dropdown="filebrowser.create"]').locator('wa-button[slot="trigger"]').click();
            await page.getByText('Create File...', { exact: true }).click();

            const dialog = page.locator('wa-dialog[open][label="Input"]');
            await expect(dialog).toBeAttached({ timeout: UI_MS });
            await dialog.locator('docks-prompt-dialog-content wa-input').locator('input').fill(FILE_NAME);
            await beat(page);
            await dialog.locator('.dialog-service-footer wa-button').filter({ hasText: 'OK' }).click({ force: true });

            await expect(treeItemForFileName(fileBrowser, FILE_NAME)).toBeVisible({
                timeout: UI_MS,
            });
            await beat(page, storyPaceExtraMs(300));

            const fileRow = treeItemForFileName(fileBrowser, FILE_NAME);
            await fileRow.scrollIntoViewIfNeeded();
            await fileRow.click();
            await dwell(page, undefined, 'Open the new file.');
            await beat(page, storyPaceExtraMs(250));
            await fileRow.dblclick();

            await expect(editorPlain).toBeVisible({ timeout: UI_MS });
            const innerTextarea = editorPlain.locator('docks-texteditor wa-textarea').locator('textarea').first();
            await expect(innerTextarea).toBeVisible({ timeout: UI_MS });
            await dwell(page);
            await innerTextarea.click();
            await page.keyboard.press('ControlOrMeta+a');
            await page.keyboard.type(CONTENT, { delay: process.env.E2E_STORY === '1' ? 40 : 0 });
            await expect(innerTextarea).toHaveValue(CONTENT, { timeout: UI_MS });

            const saveBtn = editorPlain.locator('docks-toolbar').getByRole('button', { name: /Save active editor/i });
            await expect(saveBtn).toBeEnabled({ timeout: UI_MS });
            await dwell(page, undefined, 'Save from the editor toolbar.');
            await saveBtn.click();
            await beat(page, storyPaceExtraMs(400));

            await closeActiveMainAreaEditor(page);
            await expect(editorPlain).toBeHidden({ timeout: UI_MS });
            await beat(page);
        });

        await test.step('Switch layout to Standard (bottom panel)', async () => {
            await layoutSwitcher.locator('wa-button[slot="trigger"]').click();
            await dwell(page, undefined, 'Switch the workbench layout.');
            await layoutSwitcher.locator('wa-dropdown-item[value="standard-bottom-panel"]').click();
            await expect(page.locator('docks-tabs#panel-bottom')).toBeVisible({ timeout: UI_MS });
            await beat(page);
        });

        const createTrigger = fileBrowser.locator('docks-command[dropdown="filebrowser.create"]').locator('wa-button[slot="trigger"]');

        await test.step('Open Extensions and install Jupyter-like notebook extension', async () => {
            await page.locator('docks-toolbar#sidebar-main-toolbar').getByRole('button', { name: /^Extensions$/i }).click();
            const extPanel = page.locator('docks-extensions');
            await expect(extPanel).toBeVisible({ timeout: UI_MS });
            await dwell(page);

            const jupyterTreeItem = extPanel.getByRole('treeitem', { name: /Jupyter-like Notebook Editor/i });
            await expect(jupyterTreeItem).toBeVisible({ timeout: UI_MS });
            await jupyterTreeItem.scrollIntoViewIfNeeded();
            await jupyterTreeItem.click();

            const detail = extPanel.locator('.extensions-detail-content');
            await expect(detail.locator('h1')).toContainText(/Jupyter-like Notebook Editor/i, { timeout: UI_MS });
            await beat(page);

            const installBtn = detail.getByRole('button', { name: /Install/i });
            await expect(installBtn).toBeVisible({ timeout: UI_MS });
            await installBtn.click();
            await beat(page, storyPaceExtraMs(1000));

            await expect(async () => {
                await page.keyboard.press('Escape');
                await createTrigger.click();
                await expect(jupyterNotebookCreateMenuItem(fileBrowser)).toBeVisible({ timeout: UI_MS });
            }).toPass({ timeout: UI_MS });

            await page.keyboard.press('Escape');
            await fileBrowser.locator('docks-command[cmd="refresh_resource"]').locator('wa-button').click();
            await beat(page);
        });

        await test.step('Close Extensions view', async () => {
            await closeMainAreaEditorByTabName(page, /Extensions/i);
            await expect(page.locator(`${MAIN_EDITOR_TABS} docks-extensions`)).toBeHidden({
                timeout: UI_MS,
            });
            await beat(page);
        });

        const notebookBaseName = `walkthrough-${Date.now()}`;
        const notebookEditor = page.locator('docks-tabs#editor-area-main docks-notebook-editor');

        await test.step('Create Jupyter notebook and open it', async () => {
            await dismissOpenPromptDialogs(page);
            await page.keyboard.press('Escape');

            await page.locator('docks-tabs#sidebar-main').locator('wa-tab[panel="view.filebrowser"]').click();
            await expect(fileBrowser).toBeVisible({ timeout: UI_MS });

            const rootFolder = fileBrowser.locator('wa-tree-item').filter({ hasText: 'My Folder' }).first();
            await rootFolder.scrollIntoViewIfNeeded();
            await rootFolder.click();
            await beat(page);

            await createTrigger.click();
            await expect(jupyterNotebookCreateMenuItem(fileBrowser)).toBeVisible({ timeout: UI_MS });
            await dwell(page, undefined, 'Create a new Jupyter notebook.');
            await jupyterNotebookCreateMenuItem(fileBrowser).click();

            const nameDialog = page.locator('wa-dialog[open][label="Input"]');
            await expect(nameDialog).toBeAttached({ timeout: UI_MS });
            await nameDialog.locator('docks-prompt-dialog-content wa-input').locator('input').fill(`${notebookBaseName}.ipynb`);
            await beat(page);
            await nameDialog.locator('.dialog-service-footer wa-button').filter({ hasText: 'OK' }).click({ force: true });

            const ipynbName = `${notebookBaseName}.ipynb`;
            const ipynbRow = treeItemForFileName(fileBrowser, ipynbName);
            await expect(ipynbRow).toBeVisible({ timeout: UI_MS });
            await beat(page, storyPaceExtraMs(400));
            await ipynbRow.scrollIntoViewIfNeeded();
            await ipynbRow.click();
            await beat(page, storyPaceExtraMs(150));
            await ipynbRow.dblclick();

            await expect(notebookEditor).toBeVisible({ timeout: UI_MS });
            await dwell(page, undefined, 'The notebook opens in the main editor.');
            await beat(page, storyPaceExtraMs(400));
        });

        await test.step('Select JavaScript kernel, run code, scroll to output', async () => {
            await expect(notebookEditor).toBeVisible({ timeout: UI_MS });

            await notebookEditor.locator('.kernel-select').locator('wa-button[slot="trigger"]').click();
            await dwell(page, undefined, 'Choose a kernel for this notebook.');
            await notebookEditor.evaluate((host) => {
                const scroller = host.closest('wa-scroller');
                scroller?.scrollBy({ top: 220, behavior: 'instant' });
            });
            await beat(page, process.env.E2E_STORY === '1' ? storyPaceExtraMs(350) : 120);

            const jsItem = notebookEditor.locator('wa-dropdown-item[value="javascript"]');
            await expect(jsItem).toBeVisible({ timeout: UI_MS });
            await jsItem.click();
            await beat(page, storyPaceExtraMs(500));

            await expect(notebookEditor.locator('.kernel-select wa-button[slot="trigger"]')).toContainText(/JavaScript/i, {
                timeout: UI_MS,
            });
            await dwell(page, undefined, 'JavaScript is selected as the runtime.');
            await beat(page, storyPaceExtraMs(350));

            const firstCodeCell = notebookEditor.locator('.code-cell').first();
            await notebookEditor.evaluate((host) => {
                const el = host as HTMLElement & { shadowRoot?: ShadowRoot };
                const codeCell = el.shadowRoot?.querySelector('.code-cell');
                const cellWrapper = codeCell?.closest('.cell-wrapper');
                const scroller = el.closest('wa-scroller');
                if (!cellWrapper || !scroller) return;
                const scrollerRect = scroller.getBoundingClientRect();
                const cellRect = cellWrapper.getBoundingClientRect();
                const scrollTop = scroller.scrollTop;
                const targetScroll =
                    scrollTop +
                    (cellRect.top - scrollerRect.top) -
                    scrollerRect.height / 2 +
                    cellRect.height / 2;
                scroller.scrollTo({ top: Math.max(0, targetScroll), behavior: 'instant' });
            });
            await beat(page, process.env.E2E_STORY === '1' ? storyPaceExtraMs(400) : 150);

            await dwell(page, undefined, 'Run the first cell.');
            await firstCodeCell.locator('docks-command[cmd="notebook.runCell"]').click();
            await beat(page, process.env.E2E_STORY === '1' ? storyPaceExtraMs(500) : 0);

            const output = firstCodeCell.locator('.cell-output');
            await expect(output).toBeVisible({ timeout: 15_000 });
            await expect(output.locator('pre code')).toContainText('Hello, World!', { timeout: UI_MS });
            await beat(page, storyPaceExtraMs(450));

            await output.scrollIntoViewIfNeeded();
            await dwell(page, undefined, 'Scroll to see the cell output.');
            await beat(page);
        });

        await test.step('Close notebook', async () => {
            await closeMainAreaEditorByTabHasText(page, /\.ipynb/, { confirmUnsaved: true });
            await expect(notebookEditor).toBeHidden({ timeout: UI_MS });
            await dwell(page);
        });
    });
});
