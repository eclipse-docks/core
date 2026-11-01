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
    /** Module whose default export is an HTMLElement subclass. */
    load: () => Promise<{ default: CustomElementConstructor }>;
    /** When set, the editor can toggle between preview and source and counts as an editor. */
    source?: string | (() => Promise<string>);
    tools?: CanvasToolContribution[];
}

export function isCanvasContribution(contribution: Contribution): contribution is CanvasContribution {
    return typeof (contribution as CanvasContribution).load === 'function';
}
