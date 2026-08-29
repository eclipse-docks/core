// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import {
  closeSiblingSubmenus,
  collectDropdownItems,
  eventTargetsOpenDropdown,
  suppressNativeContextMenuInOpenDropdowns,
} from '../../src/core/dropdown-menu-utils';

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

  it('closes open sibling submenus except the active item', async () => {
    const menu = document.createElement('wa-dropdown');
    const first = document.createElement('wa-dropdown-item') as HTMLElement & { submenuOpen?: boolean };
    const second = document.createElement('wa-dropdown-item') as HTMLElement & { submenuOpen?: boolean };
    first.submenuOpen = true;
    second.submenuOpen = true;
    menu.append(first, second);

    closeSiblingSubmenus(second, menu);
    await Promise.resolve();

    expect(first.submenuOpen).toBe(false);
    expect(second.submenuOpen).toBe(true);
  });

  it('detects contextmenu events inside an open wa-dropdown', () => {
    const dropdown = document.createElement('wa-dropdown') as HTMLElement & { open: boolean };
    dropdown.open = true;
    const item = document.createElement('wa-dropdown-item');
    dropdown.append(item);
    document.body.append(dropdown);

    const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true, composed: true });
    item.dispatchEvent(event);

    expect(eventTargetsOpenDropdown(event)).toBe(true);
    suppressNativeContextMenuInOpenDropdowns(event);
    expect(event.defaultPrevented).toBe(true);

    dropdown.remove();
  });

  it('allows contextmenu events when the wa-dropdown is closed', () => {
    const dropdown = document.createElement('wa-dropdown');
    const item = document.createElement('wa-dropdown-item');
    dropdown.append(item);
    document.body.append(dropdown);

    const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true, composed: true });
    item.dispatchEvent(event);

    expect(eventTargetsOpenDropdown(event)).toBe(false);
    suppressNativeContextMenuInOpenDropdowns(event);
    expect(event.defaultPrevented).toBe(false);

    dropdown.remove();
  });

  it('detects contextmenu events on items rendered in dropdown shadow roots', () => {
    const dropdown = document.createElement('wa-dropdown') as HTMLElement & { open: boolean };
    dropdown.open = true;
    const shadow = dropdown.attachShadow({ mode: 'open' });
    const item = document.createElement('wa-dropdown-item');
    shadow.append(item);
    document.body.append(dropdown);

    const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true, composed: true });
    item.dispatchEvent(event);

    expect(eventTargetsOpenDropdown(event)).toBe(true);

    dropdown.remove();
  });
});
