// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { html, render } from 'lit';
import { Signal } from '@lit-labs/signals';
import { commandRegistry } from '../../src/core/commandregistry';
import {
  renderDropdownItem,
  renderDropdownContributions,
  renderDropdownSubmenu,
  renderCommandContribution,
  handleDropdownWaSelect,
} from '../../src/core/dropdown-item';
import { contributionRegistry, type CommandContribution } from '../../src/core/contributionregistry';

function renderInDropdown(item: ReturnType<typeof renderDropdownItem>) {
  const host = document.createElement('div');
  render(
    html`
      <wa-dropdown @wa-select=${handleDropdownWaSelect}>
        ${item}
      </wa-dropdown>
    `,
    host,
  );
  return host;
}

function selectDropdownItem(host: ParentNode) {
  const item = host.querySelector('wa-dropdown-item') as HTMLElement;
  host.querySelector('wa-dropdown')?.dispatchEvent(
    new CustomEvent('wa-select', { detail: { item }, bubbles: true }),
  );
  return item;
}

describe('dropdown-item', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renderDropdownItem outputs native wa-dropdown-item', () => {
    const host = document.createElement('div');
    render(
      renderDropdownItem({ cmd: 'touch', icon: 'file', label: 'Create File' }),
      host
    );
    expect(host.querySelector('wa-dropdown-item')).toBeTruthy();
    expect(host.querySelector('docks-command')).toBeNull();
    expect(host.textContent).toContain('Create File');
  });

  it('handleDropdownWaSelect executes command from wa-select', async () => {
    const execute = vi.spyOn(commandRegistry, 'execute').mockResolvedValue(undefined);
    const host = renderInDropdown(renderDropdownItem({ cmd: 'refresh_resource', label: 'Refresh' }));
    selectDropdownItem(host);
    expect(execute).toHaveBeenCalledWith('refresh_resource', expect.any(Object));
  });

  it('renderDropdownSubmenu renders contribution target in submenu slot', () => {
    contributionRegistry.registerContribution('test.dropdown.target', {
      name: 'test.dropdown.item',
      command: 'touch',
      label: 'From extension',
      icon: 'file',
    });
    const host = document.createElement('div');
    render(
      renderDropdownSubmenu({
        icon: 'folder-plus',
        label: 'Create new',
        contributionTarget: 'test.dropdown.target',
      }),
      host
    );
    const parent = host.querySelector('wa-dropdown-item');
    expect(parent?.textContent).toContain('Create new');
    const submenuItem = host.querySelector('wa-dropdown-item[slot="submenu"]');
    expect(submenuItem?.textContent).toContain('From extension');
  });

  it('renderDropdownContributions maps a contribution target', () => {
    const host = document.createElement('div');
    render(renderDropdownContributions('test.dropdown.target'), host);
    expect(host.querySelectorAll('wa-dropdown-item').length).toBeGreaterThan(0);
  });

  it('handleDropdownWaSelect skips disabled items', () => {
    const enabled = new Signal.State(true);
    const disabled = new Signal.Computed(() => enabled.get());
    const execute = vi.spyOn(commandRegistry, 'execute').mockResolvedValue(undefined);
    const host = renderInDropdown(
      renderDropdownItem({ cmd: 'touch', label: 'Create File', disabled }),
    );
    selectDropdownItem(host);
    expect(execute).not.toHaveBeenCalled();

    enabled.set(false);
    render(
      html`
        <wa-dropdown @wa-select=${handleDropdownWaSelect}>
          ${renderDropdownItem({ cmd: 'touch', label: 'Create File', disabled })}
        </wa-dropdown>
      `,
      host,
    );
    selectDropdownItem(host);
    expect(execute).toHaveBeenCalledWith('touch', expect.any(Object));
  });

  it('renderCommandContribution passes contribution disabled signal through', () => {
    const enabled = new Signal.State(false);
    contributionRegistry.registerContribution('test.reactive.disabled', {
      name: 'test.reactive.disabled.item',
      command: 'touch',
      label: 'Reactive',
      disabled: () => !enabled.get(),
    });
    const host = document.createElement('div');
    render(
      renderCommandContribution(
        contributionRegistry.getContributions('test.reactive.disabled')[0] as CommandContribution
      ),
      host
    );
    expect(host.querySelector('wa-dropdown-item')?.hasAttribute('disabled')).toBe(true);

    enabled.set(true);
    render(
      renderCommandContribution(
        contributionRegistry.getContributions('test.reactive.disabled')[0] as CommandContribution
      ),
      host
    );
    expect(host.querySelector('wa-dropdown-item')?.hasAttribute('disabled')).toBe(false);
  });
});
