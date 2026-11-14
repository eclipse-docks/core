// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { clearToasts, enterToastQuiet, toastError, toastInfo } from '../../src/core/toast';
import { DocksToasts } from '../../src/components/toasts';

describe('docks-toasts', () => {
  beforeEach(async () => {
    clearToasts();
    document.body.innerHTML = '';
    await import('../../src/components/toasts');
    await customElements.whenDefined('docks-toasts');
  });

  it('shows pending and emitted counts and lists the latest messages', async () => {
    toastInfo('saved');
    const leave = enterToastQuiet();
    toastError('missing');
    leave();

    const el = document.createElement('docks-toasts') as DocksToasts;
    document.body.appendChild(el);
    await el.updateComplete;

    const badge = el.shadowRoot?.querySelector('wa-button[slot="trigger"] wa-badge');
    expect(badge?.textContent?.trim()).toBe('1');
    expect(badge?.hasAttribute('slot')).toBe(false);
    const items = [...(el.shadowRoot?.querySelectorAll('wa-dropdown-item') ?? [])];
    expect(items.some((item) => item.textContent?.includes('missing'))).toBe(true);
    expect(items.some((item) => item.textContent?.includes('saved'))).toBe(true);
    expect(items.some((item) => item.textContent?.includes('pending'))).toBe(true);

    el.remove();
  });

  it('omits the badge when every toast was emitted', async () => {
    toastInfo('saved');

    const el = document.createElement('docks-toasts') as DocksToasts;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('wa-button[slot="trigger"]')).toBeTruthy();
    expect(el.shadowRoot?.querySelector('wa-badge')).toBeNull();
    el.remove();
  });

  it('hides when the log is empty', async () => {
    const el = document.createElement('docks-toasts') as DocksToasts;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.shadowRoot?.querySelector('wa-dropdown')).toBeNull();
    el.remove();
  });
});
