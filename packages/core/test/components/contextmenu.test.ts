// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import '@awesome.me/webawesome/dist/components/dropdown/dropdown.js';
import '@awesome.me/webawesome/dist/components/dropdown-item/dropdown-item.js';
import { contributionRegistry } from '../../src/core/contributionregistry';
import { renderDropdownItem } from '../../src/core/dropdown-item';
import { DocksContextMenu } from '../../src/parts/contextmenu';
import '../../src/parts/contextmenu';

describe('docks-contextmenu', () => {
  beforeEach(async () => {
    document.body.innerHTML = '';
    if (!Element.prototype.getAnimations) {
      Element.prototype.getAnimations = () => [];
    }
    await customElements.whenDefined('docks-contextmenu');
    await customElements.whenDefined('wa-dropdown');
  });

  it('anchors wa-dropdown internal wa-popup to the pointer via VirtualElement', async () => {
    const menu = document.createElement('docks-contextmenu') as DocksContextMenu;
    menu.partContextMenuRenderer = () =>
      renderDropdownItem({ cmd: 'touch', label: 'Create File' });
    document.body.appendChild(menu);
    await menu.updateComplete;

    const opened = await menu.show({ x: 120, y: 240 });
    expect(opened).toBe(true);
    await menu.updateComplete;

    const trigger = menu.shadowRoot?.querySelector('[slot="trigger"]');
    expect(trigger?.getAttribute('hidden')).not.toBeNull();
    expect((trigger as HTMLElement | null)?.style.left).toBe('');

    const popup = menu.shadowRoot
      ?.querySelector('wa-dropdown')
      ?.shadowRoot?.querySelector('wa-popup') as HTMLElement & {
      anchor?: { getBoundingClientRect(): DOMRect };
    };
    expect(popup).toBeTruthy();
    expect(typeof popup.anchor?.getBoundingClientRect).toBe('function');
    const rect = popup.anchor!.getBoundingClientRect();
    expect(rect.x).toBe(120);
    expect(rect.y).toBe(240);
    expect(rect.width).toBe(0);
    expect(rect.height).toBe(0);
  });

  it('opens contributions registered on the contextmenu target', async () => {
    contributionRegistry.registerContribution('contextmenu:test.virtual.anchor', {
      name: 'contextmenu.test.item',
      command: 'touch',
      label: 'From registry',
    });
    const menu = document.createElement('docks-contextmenu') as DocksContextMenu;
    menu.setAttribute('id', 'contextmenu:test.virtual.anchor');
    document.body.appendChild(menu);
    await menu.updateComplete;

    await menu.show({ x: 8, y: 16 });
    await menu.updateComplete;

    expect(menu.shadowRoot?.textContent).toContain('From registry');
  });
});
