import { describe, it, expect } from 'vitest';
import * as constants from '../../src/core/constants';
import { MouseButton } from '../../src/core/constants';
import * as targets from '../../src/core/contribution-targets';
import * as names from '../../src/core/contribution-names';
import * as uiIds from '../../src/core/ui-ids';

describe('constants', () => {
  it('re-exports contribution targets for compatibility', () => {
    expect(constants.TOOLBAR_MAIN).toBe('app-toolbars-main');
    expect(constants.TOOLBAR_MAIN_RIGHT).toBe('app-toolbars-main-right');
    expect(constants.TOOLBAR_BOTTOM).toBe('app-toolbars-bottom');
    expect(constants.EDITOR_AREA_MAIN).toBe('editor-area-main');
    expect(constants.SIDEBAR_MAIN).toBe('sidebar-main');
    expect(constants.PANEL_BOTTOM).toBe('panel-bottom');
  });

  it('exports COMMAND_SAVE and HIDE_DOT_RESOURCE', () => {
    expect(constants.COMMAND_SAVE).toBe('command-save');
    expect(constants.HIDE_DOT_RESOURCE).toBe(false);
  });

  it('MouseButton enum has expected values', () => {
    expect(MouseButton.LEFT).toBe(0);
    expect(MouseButton.MIDDLE).toBe(1);
    expect(MouseButton.RIGHT).toBe(2);
    expect(MouseButton.BACK).toBe(3);
    expect(MouseButton.FORWARD).toBe(4);
  });
});

describe('contribution-targets', () => {
  it('exports layout and slot ids', () => {
    expect(targets.SIDEBAR_MAIN).toBe('sidebar-main');
    expect(targets.ABOUT_TABS).toBe('about.tabs');
    expect(targets.SYSTEM_ATTRIBUTIONS).toBe('system.attributions');
    expect(targets.SYSTEM_LAYOUTS).toBe('system.layouts');
  });
});

describe('contribution-names', () => {
  it('exports contribution name ids', () => {
    expect(names.VIEW_FILEBROWSER).toBe('view.filebrowser');
    expect(names.ABOUT_TAB_ATTRIBUTIONS).toBe('about.tab.attributions');
    expect(names.ATTRIBUTION_ECLIPSE_DOCKS).toBe('attribution.eclipse-docks');
  });

  it('ui-ids re-exports names for compatibility', () => {
    expect(uiIds.VIEW_FILEBROWSER).toBe(names.VIEW_FILEBROWSER);
    expect(uiIds.TOOLBAR_INFO).toBe(names.TOOLBAR_INFO);
  });
});
