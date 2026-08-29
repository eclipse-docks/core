// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { appSettingsGetMock, appSettingsSetMock } = vi.hoisted(() => ({
  appSettingsGetMock: vi.fn(),
  appSettingsSetMock: vi.fn(),
}));

vi.mock('../../src/core/settingsservice', () => ({
  appSettings: {
    get: appSettingsGetMock,
    set: appSettingsSetMock,
  },
}));

vi.mock('../../src/core/apploader', () => ({
  appLoaderService: {
    getCurrentApp: vi.fn(() => ({ layout: 'standard' })),
  },
}));

import '../../src/layouts/standard-layout';
import {
  DEFAULT_LAYOUT_PANEL_VISIBILITY,
  LAYOUT_PANEL_SETTINGS_KEY,
  LEGACY_PREFERRED_LAYOUT_KEY,
  layoutIdToPanelVisibility,
  resolveInitialPanelVisibilityFromApp,
  resolveStoredPanelVisibility,
} from '../../src/core/layout-panels';

describe('standard layout panel visibility', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    appSettingsGetMock.mockReset();
    appSettingsSetMock.mockReset();
  });

  it('resolveInitialPanelVisibilityFromApp maps layout ids and props', () => {
    expect(resolveInitialPanelVisibilityFromApp('standard')).toEqual(
      layoutIdToPanelVisibility('standard'),
    );
    expect(resolveInitialPanelVisibilityFromApp({
      id: 'standard',
      props: { showBottomPanel: true, showLeftAux: true },
    })).toEqual({
      ...DEFAULT_LAYOUT_PANEL_VISIBILITY,
      showBottomPanel: true,
      showLeftAux: true,
      showRightAux: false,
    });
    expect(resolveInitialPanelVisibilityFromApp({
      id: 'standard',
      props: { showBottomSidebar: true },
    }).showLeftAux).toBe(true);
  });

  it('resolveStoredPanelVisibility prefers saved settings', async () => {
    appSettingsGetMock.mockImplementation(async (key: string) => {
      if (key === LAYOUT_PANEL_SETTINGS_KEY) {
        return { showBottomPanel: false };
      }
      return undefined;
    });

    await expect(resolveStoredPanelVisibility('standard-full')).resolves.toEqual({
      ...DEFAULT_LAYOUT_PANEL_VISIBILITY,
      showBottomPanel: false,
    });
  });

  it('initializePanelVisibility applies stored settings on the layout element', async () => {
    appSettingsGetMock.mockResolvedValue(undefined);

    const layout = document.createElement('docks-standard-layout') as HTMLElement & {
      updateComplete: Promise<unknown>;
      getPanelVisibility: () => typeof DEFAULT_LAYOUT_PANEL_VISIBILITY;
    };
    document.body.append(layout);
    await layout.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 0));
    await layout.updateComplete;

    expect(layout.getPanelVisibility()).toEqual(layoutIdToPanelVisibility('standard'));
  });

  it('setPanelVisibility persists settings and dispatches an event', async () => {
    appSettingsGetMock.mockResolvedValue(undefined);
    appSettingsSetMock.mockResolvedValue(undefined);

    const layout = document.createElement('docks-standard-layout') as HTMLElement & {
      updateComplete: Promise<unknown>;
      setPanelVisibility: (panels: Partial<typeof DEFAULT_LAYOUT_PANEL_VISIBILITY>) => Promise<void>;
      getPanelVisibility: () => typeof DEFAULT_LAYOUT_PANEL_VISIBILITY;
    };
    document.body.append(layout);
    await layout.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 0));

    const eventSpy = vi.fn();
    window.addEventListener('layout-panels-changed', eventSpy);

    await layout.setPanelVisibility({ showBottomPanel: false });

    expect(appSettingsSetMock).toHaveBeenCalledWith(
      LAYOUT_PANEL_SETTINGS_KEY,
      expect.objectContaining({ showBottomPanel: false }),
    );
    expect(layout.getPanelVisibility().showBottomPanel).toBe(false);
    expect(eventSpy).toHaveBeenCalled();

    window.removeEventListener('layout-panels-changed', eventSpy);
  });

  it('initializePanelVisibility applies legacy layout ids from settings', async () => {
    appSettingsGetMock.mockImplementation(async (key: string) => {
      if (key === LEGACY_PREFERRED_LAYOUT_KEY) {
        return 'standard-bottom-panel';
      }
      return undefined;
    });
    appSettingsSetMock.mockResolvedValue(undefined);

    const layout = document.createElement('docks-standard-layout') as HTMLElement & {
      updateComplete: Promise<unknown>;
      getPanelVisibility: () => typeof DEFAULT_LAYOUT_PANEL_VISIBILITY;
    };
    document.body.append(layout);
    await layout.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(layout.getPanelVisibility()).toEqual(
      layoutIdToPanelVisibility('standard-bottom-panel'),
    );
  });
});
