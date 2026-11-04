import { contributionRegistry } from '@eclipse-docks/core';
import { describe, expect, it } from 'vitest';
import { registerCanvasCatalog } from '../src/canvas-catalog';

function textOf(url: string | undefined): string {
    expect(url?.startsWith('data:text/javascript')).toBe(true);
    const payload = url!.slice(url!.indexOf(',') + 1);
    return decodeURIComponent(payload);
}

describe('canvas catalog', () => {
    it('offers the tasks canvas for checkout', () => {
        registerCanvasCatalog();
        const leaves = contributionRegistry.getContributions('catalog.canvases.examples') as Array<{
            label: string;
            state?: { filename?: string; url?: string };
        }>;
        const tasks = leaves.find(item => item.label === 'Tasks');
        expect(tasks?.state?.filename).toBe('tasks.canvas.js');
        expect(textOf(tasks?.state?.url)).toContain('Today, with intention.');
        expect(leaves.some(item => item.label === 'Player')).toBe(false);
    });
});
