import { test, expect, type Page } from './fixtures.js';
import { openE2eContextMenuPanel, readContextMenuPopupAnchor } from './contextmenu-utils.js';

const UI_MS = 5000;

type Rect = { x: number; y: number; width: number; height: number };

async function openContextMenuAtTarget(page: Page): Promise<Rect> {
    const target = page.getByTestId('e2e-contextmenu-target');
    await expect(target).toBeVisible({ timeout: UI_MS });
    const box = await target.boundingBox();
    if (!box) {
        throw new Error('context menu target has no layout box');
    }
    await target.click({ button: 'right' });
    return box;
}

test.describe('docks-contextmenu', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/', { timeout: UI_MS });
        await expect(page.locator('docks-standard-layout')).toBeVisible({ timeout: UI_MS });
        await openE2eContextMenuPanel(page);
    });

    test('anchors wa-dropdown internal wa-popup to the pointer via VirtualElement', async ({ page }) => {
        const targetRect = await openContextMenuAtTarget(page);

        await expect(page.getByRole('menuitem', { name: 'Create File' })).toBeVisible({ timeout: UI_MS });

        const anchor = await readContextMenuPopupAnchor(page);
        expect(anchor).not.toBeNull();
        expect(anchor?.triggerHidden).toBe(true);
        expect(anchor?.triggerLeft).toBe('');
        expect(anchor!.x).toBeGreaterThanOrEqual(Math.floor(targetRect.x));
        expect(anchor!.x).toBeLessThanOrEqual(Math.ceil(targetRect.x + targetRect.width));
        expect(anchor!.y).toBeGreaterThanOrEqual(Math.floor(targetRect.y));
        expect(anchor!.y).toBeLessThanOrEqual(Math.ceil(targetRect.y + targetRect.height));
        expect(anchor?.width).toBe(0);
        expect(anchor?.height).toBe(0);
    });

    test('opens contributions registered on the contextmenu target', async ({ page }) => {
        await openContextMenuAtTarget(page);

        await expect(page.getByRole('menuitem', { name: 'From registry' })).toBeVisible({ timeout: UI_MS });
    });
});
