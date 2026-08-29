// @vitest-environment jsdom
import { beforeAll, describe, expect, it, vi } from 'vitest';
import { html } from 'lit';
import { DEFAULT_LAYOUT_PANEL_VISIBILITY } from '../../src/core/layout-panels';

const panels = { ...DEFAULT_LAYOUT_PANEL_VISIBILITY };

const mockLayout = {
  getPanelVisibility: vi.fn(() => ({ ...panels })),
  setPanelVisibility: vi.fn(async (next: Partial<typeof panels>) => {
    Object.assign(panels, next);
  }),
};

const { findStandardLayout } = vi.hoisted(() => ({
  findStandardLayout: vi.fn(() => mockLayout),
}));

vi.mock('../../src/core/layout-panels', async (importOriginal) => {
  const original = await importOriginal<typeof import('../../src/core/layout-panels')>();
  return {
    ...original,
    findStandardLayout,
  };
});

vi.mock('../../src/core/icon-utils', () => ({
  icon: () => html`<span data-testid="mock-icon"></span>`,
}));

describe('layout-switcher', () => {
  beforeAll(() => {
    if (typeof globalThis.requestAnimationFrame === 'undefined') {
      globalThis.requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(cb, 0) as unknown as number;
    }
    if (typeof globalThis.requestIdleCallback === 'undefined') {
      globalThis.requestIdleCallback = (cb: IdleRequestCallback) => setTimeout(cb, 0) as unknown as number;
    }
  });

  it('renders panel visibility toggles for the standard layout', async () => {
    findStandardLayout.mockReturnValue(mockLayout as never);

    await import('../../src/components/layout-switcher');
    const el = document.createElement('docks-layout-switcher');
    document.body.appendChild(el);
    await customElements.whenDefined('docks-layout-switcher');
    await el.updateComplete;

    const root = el.shadowRoot;
    expect(root?.querySelector('wa-dropdown')).toBeTruthy();
    expect(root?.querySelectorAll('wa-dropdown-item').length).toBe(5);

    el.remove();
  });

  it('renders nothing when the standard layout is not active', async () => {
    findStandardLayout.mockReturnValue(null as never);

    await import('../../src/components/layout-switcher');
    const el = document.createElement('docks-layout-switcher');
    document.body.appendChild(el);
    await customElements.whenDefined('docks-layout-switcher');
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('wa-dropdown')).toBeNull();

    el.remove();
  });
});
