import { expect, test, type Locator } from './fixtures.js';
import { createFileMenuItem } from './story-utils.js';

const FILE_NAME = 'hello.canvas.js';
const UI_MS = 15_000;

const SOURCE = `import { CanvasView, html } from "docks/canvas";

export default class extends CanvasView {
  render() {
    return html\`
      <wa-button>Canvas Ready</wa-button>
      <div style="height: 2000px"></div>
      <p>Canvas Bottom</p>
    \`;
  }
}
`;

const UPDATED = SOURCE.replace('Canvas Ready', 'Canvas Updated');
const FROM_DIRTY = SOURCE.replace('Canvas Ready', 'Canvas From Dirty');

function treeItemForFileName(fileBrowser: Locator, fileName: string): Locator {
    const escaped = fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return fileBrowser
        .locator('.tree-label-text', { hasText: new RegExp(`^${escaped}$`) })
        .locator('xpath=ancestor::wa-tree-item[1]');
}

test.describe('canvas editor', () => {
    test.describe.configure({ timeout: 120_000 });

    test('preview, source edit, and pin a canvas', async ({ page }) => {
        const fileBrowser = page.locator('docks-filebrowser');
        const canvas = page.locator('docks-tabs#editor-area-main docks-canvas-editor');

        await page.goto('/');
        await expect(page.locator('docks-standard-layout')).toBeVisible({ timeout: UI_MS });
        await page.locator('docks-tabs#sidebar-main').locator('wa-tab[panel="view.filebrowser"]').click();
        await expect(fileBrowser.locator('wa-tree')).toBeVisible({ timeout: UI_MS });

        const rootFolder = fileBrowser.locator('wa-tree-item').filter({ hasText: 'My Folder' }).first();
        await rootFolder.click();
        await fileBrowser.locator('docks-command[dropdown="filebrowser.create"]').locator('wa-button[slot="trigger"]').click();
        await createFileMenuItem(fileBrowser).click();
        const dialog = page.locator('wa-dialog[open][label="Input"]');
        await dialog.locator('docks-prompt-dialog-content wa-input').locator('input').fill(FILE_NAME);
        await dialog.locator('.dialog-service-footer wa-button').filter({ hasText: 'OK' }).click({ force: true });

        const fileRow = treeItemForFileName(fileBrowser, FILE_NAME);
        await expect(fileRow).toBeVisible({ timeout: UI_MS });
        await fileRow.dblclick();
        await expect(canvas).toBeVisible({ timeout: UI_MS });

        await canvas.getByRole('button', { name: 'Source' }).click();
        const widget = canvas.locator('docks-monaco-widget');
        await expect(widget).toBeVisible({ timeout: UI_MS });
        await widget.evaluate((el, source: string) => {
            const editor = el as { getEditor?: () => { setValue: (value: string) => void } };
            editor.getEditor?.().setValue(source);
        }, SOURCE);
        await canvas.getByRole('button', { name: 'Preview' }).click();
        await expect(canvas.getByRole('button', { name: 'Canvas Ready' })).toBeVisible({ timeout: UI_MS });
        await canvas.evaluate((el) => {
            const view = el.shadowRoot?.querySelector('.canvas-mount')?.firstElementChild as HTMLElement | null;
            if (!view) throw new Error('missing preview');
            view.dataset.kept = 'yes';
        });
        await canvas.getByRole('button', { name: 'Source' }).click();
        await canvas.getByRole('button', { name: 'Preview' }).click();
        await expect(canvas.getByRole('button', { name: 'Canvas Ready' })).toBeVisible({ timeout: UI_MS });
        await canvas.evaluate((el) => {
            const view = el.shadowRoot?.querySelector('.canvas-mount')?.firstElementChild as HTMLElement | null;
            if (view?.dataset.kept !== 'yes') throw new Error('preview element was replaced');
        });
        const bottom = canvas.getByText('Canvas Bottom');
        await expect(bottom).not.toBeInViewport();
        await canvas.locator('wa-scroller.canvas-scroll').evaluate((el) => { el.scrollTop = el.scrollHeight; });
        await expect(bottom).toBeVisible({ timeout: UI_MS });

        await canvas.evaluate(async (el, source: string) => {
            const editor = el as unknown as { setSource: (value: string) => void; markDirty: (dirty: boolean) => void; updateComplete: Promise<unknown> };
            editor.markDirty(false);
            editor.setSource(source);
            await editor.updateComplete;
            editor.markDirty(true);
        }, FROM_DIRTY);
        await expect(canvas.getByRole('button', { name: 'Canvas From Dirty' })).toBeVisible({ timeout: UI_MS });

        await canvas.getByRole('button', { name: 'Source' }).click();
        await widget.evaluate((el, source: string) => {
            const editor = el as { getEditor?: () => { setValue: (value: string) => void } };
            editor.getEditor?.().setValue(source);
        }, UPDATED);
        await canvas.getByRole('button', { name: 'Preview' }).click();
        await expect(canvas.getByRole('button', { name: 'Canvas Updated' })).toBeVisible({ timeout: UI_MS });

        await canvas.evaluate(async (el) => {
            const editor = el as unknown as { save: () => Promise<void>; executeCommand: (command: string, params: Record<string, string>) => Promise<void> };
            await editor.save();
            await editor.executeCommand('canvas.show_as_view', { slot: 'sidebar-main' });
        });
        const sidebar = page.locator('docks-tabs#sidebar-main');
        await sidebar.getByRole('tab', { name: FILE_NAME }).click();
        await expect(sidebar.locator('docks-canvas-editor').getByRole('button', { name: 'Canvas Updated' })).toBeVisible({ timeout: UI_MS });
    });
});
