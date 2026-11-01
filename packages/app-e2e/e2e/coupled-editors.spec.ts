import { test, expect, type Page } from './fixtures.js';

const UI_MS = 3000;

async function openAiConfigWithAuxOnAiAssistant(page: Page) {
    await page.goto('/', { timeout: UI_MS });

    const layout = page.locator('docks-standard-layout');
    await expect(layout).toBeVisible({ timeout: UI_MS });

    const auxTabs = page.locator('docks-tabs#sidebar-auxiliary');
    await expect(auxTabs).toBeVisible({ timeout: UI_MS });

    // Tabs: AI chat (cognitiveview), real coupled panel, decoy with wrong editor id.
    const aiAssistantTab = auxTabs.locator('wa-tab[panel="cognitiveview"]');
    const coupledTab = auxTabs.locator('wa-tab[panel="e2e-coupled-ai-config"]');
    const coupledPanel = auxTabs.locator('wa-tab-panel[name="e2e-coupled-ai-config"]');
    const decoyTab = auxTabs.locator('wa-tab[panel="e2e-decoy-coupled-ai-config"]');
    const decoyPanel = auxTabs.locator('wa-tab-panel[name="e2e-decoy-coupled-ai-config"]');

    await expect(aiAssistantTab).toBeVisible({ timeout: UI_MS });
    await expect(decoyTab).toBeVisible({ timeout: UI_MS });
    await aiAssistantTab.click();
    await expect(aiAssistantTab).toHaveAttribute('aria-selected', 'true', { timeout: UI_MS });
    await expect(coupledTab).toHaveAttribute('aria-selected', 'false');
    await expect(decoyTab).toHaveAttribute('aria-selected', 'false');
    await expect(coupledPanel).not.toHaveAttribute('active');
    await expect(decoyPanel).not.toHaveAttribute('active');
    await expect(auxTabs.locator('wa-tab-group')).toHaveAttribute('active', 'cognitiveview');

    const aiView = page.locator('docks-cognitive-view');
    const gear = aiView.getByRole('button', { name: /AI settings/i });
    await expect(gear).toBeVisible({ timeout: UI_MS });
    await gear.click();
    await aiView.locator('wa-dropdown-item[value="settings"]').click();

    const aiEditor = page.locator('docks-tabs#editor-area-main docks-cognitive-settings-editor');
    await expect(aiEditor).toBeVisible({ timeout: UI_MS });

    return { auxTabs, coupledTab, coupledPanel, decoyTab, decoyPanel };
}

test.describe('Coupled editors (TabContribution.coupledEditors)', () => {
    test('auxiliary tab reveals when coupled AI config editor becomes active', async ({ page }) => {
        const { auxTabs, coupledTab, coupledPanel } = await openAiConfigWithAuxOnAiAssistant(page);

        await expect(auxTabs.locator('wa-tab-group')).toHaveAttribute('active', 'e2e-coupled-ai-config', {
            timeout: UI_MS,
        });

        await expect(coupledTab).toHaveAttribute('aria-selected', 'true', { timeout: UI_MS });
        await expect(coupledPanel).toHaveAttribute('active', '', { timeout: UI_MS });
        const coupledMarker = coupledPanel.getByTestId('e2e-coupled-panel-inner');
        await expect(coupledMarker).toBeVisible({ timeout: UI_MS });
    });

    test('decoy tab with mismatched coupledEditors stays inactive when AI config editor is active', async ({
        page,
    }) => {
        const { auxTabs, coupledTab, coupledPanel, decoyTab, decoyPanel } =
            await openAiConfigWithAuxOnAiAssistant(page);

        await expect(auxTabs.locator('wa-tab-group')).toHaveAttribute('active', 'e2e-coupled-ai-config', {
            timeout: UI_MS,
        });
        await expect(coupledTab).toHaveAttribute('aria-selected', 'true');
        await expect(coupledPanel).toHaveAttribute('active', '');

        await expect(decoyTab).toHaveAttribute('aria-selected', 'false');
        await expect(decoyPanel).not.toHaveAttribute('active');
        await expect(decoyPanel.getByTestId('e2e-coupled-panel-inner')).toBeHidden();
    });
});
