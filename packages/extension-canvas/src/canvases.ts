import { contributionRegistry } from '@eclipse-docks/core';
import { isCanvasContribution, SYSTEM_CANVASES, type CanvasContribution } from './contribution';

export function listRegisteredCanvases(): CanvasContribution[] {
    return contributionRegistry.getContributions(SYSTEM_CANVASES).filter(isCanvasContribution);
}
