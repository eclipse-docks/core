import type { LayoutDescriptor } from './apploader';
import { appSettings } from './settingsservice';
import type { DocksStandardLayout } from '../layouts/standard-layout';

export type LayoutPanelVisibility = {
    showLeftSidebar: boolean;
    showAuxSidebar: boolean;
    showBottomPanel: boolean;
    showLeftAux: boolean;
    showRightAux: boolean;
};

export const DEFAULT_LAYOUT_PANEL_VISIBILITY: LayoutPanelVisibility = {
    showLeftSidebar: true,
    showAuxSidebar: true,
    showBottomPanel: true,
    showLeftAux: false,
    showRightAux: false,
};

function normalizePanelVisibility(
    stored: Partial<LayoutPanelVisibility> & { showBottomSidebar?: boolean },
): LayoutPanelVisibility {
    const showLeftAux = stored.showLeftAux ?? stored.showBottomSidebar;

    return {
        showLeftSidebar: stored.showLeftSidebar ?? DEFAULT_LAYOUT_PANEL_VISIBILITY.showLeftSidebar,
        showAuxSidebar: stored.showAuxSidebar ?? DEFAULT_LAYOUT_PANEL_VISIBILITY.showAuxSidebar,
        showBottomPanel: stored.showBottomPanel ?? DEFAULT_LAYOUT_PANEL_VISIBILITY.showBottomPanel,
        showLeftAux: showLeftAux ?? DEFAULT_LAYOUT_PANEL_VISIBILITY.showLeftAux,
        showRightAux: stored.showRightAux ?? DEFAULT_LAYOUT_PANEL_VISIBILITY.showRightAux,
    };
}

export const LAYOUT_PANEL_SETTINGS_KEY = 'layoutPanelVisibility';

/** @deprecated Legacy layout id persisted before panel visibility toggles. */
export const LEGACY_PREFERRED_LAYOUT_KEY = 'preferredLayoutId';

/** Maps legacy parameterized layout ids to panel visibility. */
export function layoutIdToPanelVisibility(layoutId: string): LayoutPanelVisibility {
    switch (layoutId) {
        case 'standard-bottom-panel':
            return { ...DEFAULT_LAYOUT_PANEL_VISIBILITY, showBottomPanel: true, showLeftAux: false, showRightAux: false };
        case 'standard-bottom-sidebar':
            return { ...DEFAULT_LAYOUT_PANEL_VISIBILITY, showBottomPanel: false, showLeftAux: true, showRightAux: false };
        case 'standard-full':
            return {
                ...DEFAULT_LAYOUT_PANEL_VISIBILITY,
                showLeftAux: true,
                showRightAux: true,
            };
        case 'standard':
        default:
            return {
                ...DEFAULT_LAYOUT_PANEL_VISIBILITY,
                showBottomPanel: false,
                showLeftAux: false,
                showRightAux: false,
            };
    }
}

export function resolveInitialPanelVisibilityFromApp(appLayout?: LayoutDescriptor): LayoutPanelVisibility {
    if (typeof appLayout === 'object' && appLayout.props) {
        return {
            ...DEFAULT_LAYOUT_PANEL_VISIBILITY,
            showLeftSidebar: appLayout.props.showLeftSidebar !== false,
            showAuxSidebar: appLayout.props.showAuxSidebar !== false,
            showBottomPanel: appLayout.props.showBottomPanel === true,
            showLeftAux: appLayout.props.showLeftAux === true || appLayout.props.showBottomSidebar === true,
            showRightAux: appLayout.props.showRightAux === true,
        };
    }
    if (typeof appLayout === 'string') {
        return layoutIdToPanelVisibility(appLayout);
    }
    return { ...DEFAULT_LAYOUT_PANEL_VISIBILITY };
}

export async function resolveStoredPanelVisibility(
    appLayout?: LayoutDescriptor,
): Promise<LayoutPanelVisibility> {
    try {
        const saved = await appSettings.get(LAYOUT_PANEL_SETTINGS_KEY) as
            | (Partial<LayoutPanelVisibility> & { showBottomSidebar?: boolean })
            | undefined;
        if (saved && typeof saved === 'object') {
            return normalizePanelVisibility(saved);
        }
    } catch {
        // fall through to legacy/app defaults
    }

    try {
        const legacyLayoutId = await appSettings.get(LEGACY_PREFERRED_LAYOUT_KEY) as string | undefined;
        if (legacyLayoutId) {
            return layoutIdToPanelVisibility(legacyLayoutId);
        }
    } catch {
        // fall through to app defaults
    }

    return resolveInitialPanelVisibilityFromApp(appLayout);
}

export function findStandardLayout(container?: ParentNode | null): DocksStandardLayout | null {
    const root = container ?? document.getElementById('app-root') ?? document.body;
    if (!root || typeof root.querySelector !== 'function') {
        return null;
    }
    return root.querySelector('docks-standard-layout');
}

export type LayoutPanelOption = {
    key: keyof LayoutPanelVisibility;
    label: string;
    icon: string;
};

export const LAYOUT_PANEL_OPTIONS: LayoutPanelOption[] = [
    { key: 'showLeftSidebar', label: 'Left sidebar', icon: 'docks layout-standard-left-sidebar' },
    { key: 'showAuxSidebar', label: 'Right sidebar', icon: 'docks layout-standard-right-sidebar' },
    { key: 'showBottomPanel', label: 'Bottom panel', icon: 'docks layout-standard-bottom-panel' },
    { key: 'showLeftAux', label: 'Left Aux', icon: 'docks layout-standard-left-aux' },
    { key: 'showRightAux', label: 'Right Aux', icon: 'docks layout-standard-right-aux' },
];
