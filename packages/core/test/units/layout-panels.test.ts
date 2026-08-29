// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import {
  DEFAULT_LAYOUT_PANEL_VISIBILITY,
  layoutIdToPanelVisibility,
} from '../../src/core/layout-panels';

describe('layout-panels', () => {
  it('maps legacy layout ids to panel visibility', () => {
    expect(layoutIdToPanelVisibility('standard')).toEqual({
      ...DEFAULT_LAYOUT_PANEL_VISIBILITY,
      showBottomPanel: false,
      showLeftAux: false,
      showRightAux: false,
    });
    expect(layoutIdToPanelVisibility('standard-bottom-panel')).toEqual({
      ...DEFAULT_LAYOUT_PANEL_VISIBILITY,
      showBottomPanel: true,
      showLeftAux: false,
      showRightAux: false,
    });
    expect(layoutIdToPanelVisibility('standard-bottom-sidebar')).toEqual({
      ...DEFAULT_LAYOUT_PANEL_VISIBILITY,
      showBottomPanel: false,
      showLeftAux: true,
      showRightAux: false,
    });
    expect(layoutIdToPanelVisibility('standard-full')).toEqual({
      ...DEFAULT_LAYOUT_PANEL_VISIBILITY,
      showLeftAux: true,
      showRightAux: true,
    });
  });
});
