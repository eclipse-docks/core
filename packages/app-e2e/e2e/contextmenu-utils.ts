import type { Locator, Page } from '@playwright/test';

export type ContextMenuPopupAnchor = {
    triggerHidden: boolean;
    triggerLeft: string;
    x: number;
    y: number;
    width: number;
    height: number;
};

function readAnchorFromPanel(panel: HTMLElement): ContextMenuPopupAnchor | null {
    const menu = panel.shadowRoot?.querySelector('docks-contextmenu');
    const dropdown = menu?.shadowRoot?.querySelector('wa-dropdown');
    const trigger = menu?.shadowRoot?.querySelector('[slot="trigger"]') as HTMLElement | null;
    const popup = dropdown?.shadowRoot?.querySelector('wa-popup') as HTMLElement & {
        anchor?: { getBoundingClientRect(): DOMRect };
    };
    if (!popup?.anchor?.getBoundingClientRect) {
        return null;
    }
    const rect = popup.anchor.getBoundingClientRect();
    return {
        triggerHidden: trigger?.hasAttribute('hidden') ?? false,
        triggerLeft: trigger?.style.left ?? '',
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
    };
}

/** Reads wa-popup virtual anchor state from the part's nested shadow roots. */
export async function readContextMenuPopupAnchor(
    page: Page,
    panel: Locator = page.locator('wa-tab-panel[name="e2e-contextmenu"] e2e-contextmenu-panel'),
): Promise<ContextMenuPopupAnchor | null> {
    return panel.evaluate(readAnchorFromPanel);
}

export async function openE2eContextMenuPanel(page: Page): Promise<void> {
    const auxTabs = page.locator('docks-tabs#sidebar-auxiliary');
    const panelTab = auxTabs.locator('wa-tab[panel="e2e-contextmenu"]');
    await panelTab.click();
    await panelTab.waitFor({ state: 'visible' });
}
