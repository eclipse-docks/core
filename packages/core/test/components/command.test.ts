// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { DocksCommand } from '../../src/components/command';

describe('docks-command dropdown trigger', () => {
  beforeEach(async () => {
    document.body.innerHTML = '';
    await import('../../src/components/command');
    await customElements.whenDefined('docks-command');
  });

  function iconOnlyDropdown() {
    const el = document.createElement('docks-command') as DocksCommand;
    el.dropdown = 'filebrowser.create';
    el.icon = 'folder-plus';
    el.title = 'Create new';
    document.body.appendChild(el);
    return el;
  }

  it('uses compact icon-button layout for icon-only dropdown triggers', async () => {
    const el = iconOnlyDropdown();
    await el.updateComplete;

    const trigger = el.shadowRoot?.querySelector('wa-button[slot="trigger"]');
    expect(trigger).toBeTruthy();
    expect(trigger?.querySelector('slot:not([name])')).toBeNull();

    const startIcon = trigger?.querySelector('wa-icon[slot="start"]');
    const defaultIcon = trigger?.querySelector('wa-icon:not([slot])');
    expect(startIcon).toBeNull();
    expect(defaultIcon).toBeTruthy();

    el.remove();
  });

  it('keeps start icon and label slot when light DOM supplies text', async () => {
    const el = document.createElement('docks-command') as DocksCommand;
    el.dropdown = 'filebrowser.create';
    el.icon = 'folder-plus';
    el.title = 'Create new';
    el.append(document.createTextNode('Create new'));
    document.body.appendChild(el);
    await el.updateComplete;

    const trigger = el.shadowRoot?.querySelector('wa-button[slot="trigger"]');
    expect(trigger?.querySelector('wa-icon[slot="start"]')).toBeTruthy();
    expect(trigger?.querySelector('slot:not([name])')).toBeTruthy();

    el.remove();
  });
});
