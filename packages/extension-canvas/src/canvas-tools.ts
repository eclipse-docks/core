import { registerAll } from '@eclipse-docks/core';
import { readActiveCanvas } from './active-canvas';
import type { CanvasContribution } from './contribution';

const registeredToolIds = new Set<string>();

export function canvasToolIsActive(canvasName: string | undefined): boolean {
    const active = readActiveCanvas();
    return !!active?.editor && active.kind === 'registered' && active.canvasName === canvasName;
}

export function registerCanvasTools(contribution: CanvasContribution): void {
    for (const tool of contribution.tools ?? []) {
        if (registeredToolIds.has(tool.id)) continue;
        registeredToolIds.add(tool.id);
        registerAll({
            command: {
                id: tool.id,
                name: tool.name,
                description: tool.description,
                parameters: tool.parameters,
            },
            handler: {
                canExecute: () => canvasToolIsActive(contribution.name),
                execute: context => tool.execute({ params: context.params as Record<string, unknown> | undefined }),
            },
        });
    }
}
