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
        const cat = leaves.find(item => item.label === 'Lounging Cat');
        expect(cat?.state?.filename).toBe('lounging-cat.canvas.js');
        expect(textOf(cat?.state?.url)).toContain('A cat lounging on a couch');
        expect(leaves.some(item => item.label === 'Player')).toBe(false);
    });
});
