// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { closeSiblingSubmenus, collectDropdownItems } from '../../src/core/dropdown-menu-utils';

describe('dropdown-menu-utils', () => {
  it('collects wa-dropdown-item elements inside shadow roots', () => {
    const host = document.createElement('div');
    const shadowHost = document.createElement('docks-command');
    host.append(shadowHost);

    const shadow = shadowHost.attachShadow({ mode: 'open' });
    const nestedItem = document.createElement('wa-dropdown-item');
    shadow.append(nestedItem);

    const topLevelItem = document.createElement('wa-dropdown-item');
    host.append(topLevelItem);

    expect(collectDropdownItems(host)).toEqual([nestedItem, topLevelItem]);
  });

  it('closes open sibling submenus except the active item', () => {
    const menu = document.createElement('wa-dropdown');
    const first = document.createElement('wa-dropdown-item') as HTMLElement & { submenuOpen?: boolean };
    const second = document.createElement('wa-dropdown-item') as HTMLElement & { submenuOpen?: boolean };
    first.submenuOpen = true;
    second.submenuOpen = true;
    menu.append(first, second);

    closeSiblingSubmenus(second, menu);

    expect(first.submenuOpen).toBe(false);
    expect(second.submenuOpen).toBe(true);
  });
});
