import type { Contribution, TabContribution } from '@eclipse-docks/core';

/** Slot for canvases an extension contributes. The toolbar dropdown lists it; it is not a tab group. */
export const SYSTEM_CANVASES = 'system.canvases';

export interface CanvasToolContribution {
    id: string;
    name: string;
    description: string;
    parameters?: Array<{
        name: string;
        description: string;
        type?: string;
        required: boolean;
        allowedValues?: string[];
    }>;
    execute: (context: { params?: Record<string, unknown> }) => unknown | Promise<unknown>;
}

/** A canvas module registered on {@link SYSTEM_CANVASES} and opened from the toolbar dropdown. */
export interface CanvasContribution extends TabContribution {
    /** Unique app-settings key for this canvas's `canvasHost` state. */
    settingsKey: string;
    /** Constructor module. Omit when `source` is canvas text; the editor compiles that. */
    load?: () => Promise<{ default: CustomElementConstructor }>;
    /** Canvas module source. Compiled for the preview; the contribution is not editable. */
    source?: string | (() => Promise<string>);
    tools?: CanvasToolContribution[];
}

export function isCanvasContribution(contribution: Contribution): contribution is CanvasContribution {
    const canvas = contribution as CanvasContribution;
    return typeof canvas.settingsKey === 'string' && canvas.settingsKey.length > 0
        && (typeof canvas.load === 'function' || canvas.source !== undefined);
}
