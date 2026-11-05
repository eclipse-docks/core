// @vitest-environment jsdom
import { html } from 'lit';
import { afterEach, describe, expect, it } from 'vitest';
import { customElement } from 'lit/decorators.js';
import { DocksPart } from '../../src/parts/part';
import { contributionRegistry } from '../../src/core/contributionregistry';
import { tabsMenuTarget } from '../../src/core/contribution-targets';
import '../../src/parts/tabs';
import type { DocksTabs } from '../../src/parts/tabs';
import type { DocksContextMenu } from '../../src/parts/contextmenu';

@customElement('docks-tab-popout-view')
class PopoutView extends DocksPart {}

@customElement('docks-tab-popout-editor')
class PopoutEditor extends DocksPart {
    disposed = false;

    override save() {}

    protected override doClose() {
        this.disposed = true;
    }
}

async function mountTabs(): Promise<DocksTabs> {
    const tabs = document.createElement('docks-tabs') as DocksTabs;
    tabs.id = 'popout-tabs';
    document.body.append(tabs);
    await tabs.updateComplete;
    return tabs;
}

function openPart(tabs: DocksTabs, name: string, label: string, editor: boolean, closable = false): DocksPart {
    const part = document.createElement(editor ? 'docks-tab-popout-editor' : 'docks-tab-popout-view') as DocksPart;
    tabs.open({
        name,
        label,
        closable,
        component: () => html`${part}`,
    });
    return part;
}

async function openTabMenu(tabs: DocksTabs, name: string): Promise<DocksContextMenu> {
    const tab = tabs.shadowRoot?.querySelector(`wa-tab[panel="${name}"]`);
    if (!tab) throw new Error(`tab ${name} missing`);
    tab.dispatchEvent(new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 20,
        clientY: 30,
    }));
    const menu = tabs.shadowRoot?.querySelector('docks-contextmenu') as DocksContextMenu | null;
    if (!menu) throw new Error('tab title menu missing');
    await menu.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 0));
    await menu.updateComplete;
    return menu;
}

function menuItem(menu: DocksContextMenu, label: string): HTMLElement {
    const item = [...(menu.shadowRoot?.querySelectorAll('wa-dropdown-item') ?? [])]
        .find((candidate) => candidate.textContent?.includes(label));
    if (!(item instanceof HTMLElement)) throw new Error(`menu item ${label} missing`);
    return item;
}

async function chooseMenuItem(menu: DocksContextMenu, tabs: DocksTabs, label: string): Promise<void> {
    menuItem(menu, label).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await tabs.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 0));
    await tabs.updateComplete;
}

async function choosePopOut(tabs: DocksTabs, name: string): Promise<void> {
    const menu = await openTabMenu(tabs, name);
    await chooseMenuItem(menu, tabs, 'Pop out to panel');
    expect(menu.shadowRoot?.querySelector('wa-dropdown')?.hasAttribute('open')).toBe(false);
}

async function closePanel(panel: HTMLElement, tabs: DocksTabs): Promise<void> {
    panel.dispatchEvent(new CustomEvent('floating-close', { bubbles: true }));
    await tabs.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 0));
    await tabs.updateComplete;
}

describe('tab title pop out', () => {
    afterEach(() => {
        contributionRegistry.unregisterContribution(tabsMenuTarget('popout-tabs'), 'tabsmenu.popout-tabs.extra');
        while (document.body.firstChild) {
            document.body.firstChild.remove();
        }
    });

    it('pops a view and an editor out of their tabs and restores both on close', async () => {
        const tabs = await mountTabs();
        const view = openPart(tabs, 'view.files', 'Files', false);
        const editor = openPart(tabs, 'editor.main', 'notes.ts', true);
        await tabs.updateComplete;
        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(view.isEditor).toBe(false);
        expect(editor.isEditor).toBe(true);

        await choosePopOut(tabs, 'view.files');
        expect(view.parentElement?.localName).toBe('docks-floating-panel');
        expect(view.isConnected).toBe(true);
        expect(tabs.shadowRoot?.querySelector('wa-tab[panel="view.files"]')).toBeNull();

        await choosePopOut(tabs, 'editor.main');
        expect(editor.parentElement?.localName).toBe('docks-floating-panel');
        expect(editor.parentElement).not.toBe(view.parentElement);
        expect((editor as PopoutEditor).disposed).toBe(false);
        expect(tabs.shadowRoot?.querySelector('wa-tab[panel="editor.main"]')).toBeNull();

        const viewPanel = view.parentElement!;
        const editorPanel = editor.parentElement!;
        await closePanel(viewPanel, tabs);
        await closePanel(editorPanel, tabs);

        expect(view.parentElement?.localName).toBe('wa-tab-panel');
        expect(editor.parentElement?.localName).toBe('wa-tab-panel');
        expect(view.parentElement?.getAttribute('name')).toBe('view.files');
        expect(editor.parentElement?.getAttribute('name')).toBe('editor.main');
        expect(tabs.shadowRoot?.querySelector('wa-tab[panel="view.files"]')).not.toBeNull();
        expect(tabs.shadowRoot?.querySelector('wa-tab[panel="editor.main"]')).not.toBeNull();
        expect((editor as PopoutEditor).disposed).toBe(false);
    });

    it('loads tab-title contributions from tabsmenu:<containerId>', async () => {
        contributionRegistry.registerContribution(tabsMenuTarget('popout-tabs'), {
            name: 'tabsmenu.popout-tabs.extra',
            label: 'Extra tab action',
            command: 'tabsmenu.test.extra',
        });

        const tabs = await mountTabs();
        openPart(tabs, 'view.files', 'Files', false);
        await tabs.updateComplete;

        const menu = tabs.shadowRoot?.querySelector('docks-contextmenu') as DocksContextMenu | null;
        expect(menu?.id).toBe(tabsMenuTarget('popout-tabs'));

        tabs.shadowRoot?.querySelector('wa-tab')?.dispatchEvent(new MouseEvent('contextmenu', {
            bubbles: true,
            cancelable: true,
            clientX: 10,
            clientY: 10,
        }));
        await menu?.updateComplete;
        await new Promise((resolve) => setTimeout(resolve, 0));
        await menu?.updateComplete;
        expect(menu?.shadowRoot?.textContent).toContain('Pop out to panel');
        expect(menu?.shadowRoot?.textContent).toContain('Extra tab action');
    });

    it('closes the selected tab, the others, or every closable tab', async () => {
        const tabs = await mountTabs();
        const pinned = openPart(tabs, 'view.files', 'Files', false);
        const first = openPart(tabs, 'editor.one', 'one.ts', true, true) as PopoutEditor;
        const second = openPart(tabs, 'editor.two', 'two.ts', true, true) as PopoutEditor;
        const third = openPart(tabs, 'editor.three', 'three.ts', true, true) as PopoutEditor;
        await tabs.updateComplete;

        const others = await openTabMenu(tabs, 'editor.two');
        expect(menuItem(others, 'Close').hasAttribute('disabled')).toBe(false);
        await chooseMenuItem(others, tabs, 'Close Others');

        expect(first.disposed).toBe(true);
        expect(third.disposed).toBe(true);
        expect(second.disposed).toBe(false);
        expect(pinned.isConnected).toBe(true);
        expect(tabs.shadowRoot?.querySelector('wa-tab[panel="editor.one"]')).toBeNull();
        expect(tabs.shadowRoot?.querySelector('wa-tab[panel="editor.three"]')).toBeNull();
        expect(tabs.shadowRoot?.querySelector('wa-tab[panel="editor.two"]')).not.toBeNull();
        expect(tabs.shadowRoot?.querySelector('wa-tab[panel="view.files"]')).not.toBeNull();

        const all = await openTabMenu(tabs, 'view.files');
        expect(menuItem(all, 'Close').hasAttribute('disabled')).toBe(true);
        await chooseMenuItem(all, tabs, 'Close All');

        expect(second.disposed).toBe(true);
        expect(pinned.isConnected).toBe(true);
        expect(tabs.shadowRoot?.querySelector('wa-tab[panel="editor.two"]')).toBeNull();
        expect(tabs.shadowRoot?.querySelector('wa-tab[panel="view.files"]')).not.toBeNull();

        const kept = openPart(tabs, 'editor.kept', 'kept.ts', true, true) as PopoutEditor;
        await tabs.updateComplete;
        const one = await openTabMenu(tabs, 'editor.kept');
        await chooseMenuItem(one, tabs, 'Close');
        expect(kept.disposed).toBe(true);
        expect(tabs.shadowRoot?.querySelector('wa-tab[panel="editor.kept"]')).toBeNull();
    });
});
