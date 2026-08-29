// @vitest-environment jsdom
import { describe, expect, it, beforeEach, vi } from 'vitest';

const dialogSettings = new Map<string, unknown>();

vi.mock('../../src/core/settingsservice', () => ({
  appSettings: {
    getDialogSetting: vi.fn(async (key: string) => dialogSettings.get(key)),
    setDialogSetting: vi.fn(async (key: string, value: unknown) => {
      dialogSettings.set(key, value);
    }),
  },
}));

import '../../src/parts/resizable-grid';

describe('docks-resizable-grid', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    dialogSettings.clear();
  });

  async function settleGrid(grid: HTMLElement & { updateComplete: Promise<unknown> }) {
    await grid.updateComplete;
    await new Promise((resolve) => queueMicrotask(resolve));
    await grid.updateComplete;
  }

  it('does not override display on nested resizable grids', async () => {
    const outer = document.createElement('docks-resizable-grid') as HTMLElement & { updateComplete: Promise<unknown> };
    outer.setAttribute('id', 'main-layout');
    outer.setAttribute('orientation', 'horizontal');
    outer.setAttribute('sizes', '50%, 50%');

    const inner = document.createElement('docks-resizable-grid') as HTMLElement & { updateComplete: Promise<unknown> };
    inner.setAttribute('id', 'editor-area-split');
    inner.setAttribute('orientation', 'vertical');
    inner.setAttribute('sizes', '70%, 30%');
    inner.innerHTML = '<div id="editor"></div><div id="panel"></div>';

    const sibling = document.createElement('div');
    sibling.id = 'sidebar';

    outer.append(inner, sibling);
    document.body.append(outer);

    await settleGrid(outer);
    await settleGrid(inner);

    expect(inner.style.display).toBe('grid');
    expect(inner.style.flexDirection).toBe('');
  });

  it('applies flex layout to non-grid children', async () => {
    const grid = document.createElement('docks-resizable-grid') as HTMLElement & { updateComplete: Promise<unknown> };
    grid.setAttribute('id', 'simple-grid');
    grid.setAttribute('orientation', 'vertical');
    grid.setAttribute('sizes', '70%, 30%');
    grid.innerHTML = '<div id="top"></div><div id="bottom"></div>';
    document.body.append(grid);

    await settleGrid(grid);

    const top = grid.querySelector('#top') as HTMLElement;
    expect(top.style.display).toBe('flex');
    expect(top.style.flexDirection).toBe('column');
  });

  it('restores persisted sizes when child count changes and returns', async () => {
    dialogSettings.set('docks-resizable-grid:toggle-grid', {
      sizesByCount: {
        '3': ['15.00%', '70.00%', '15.00%'],
        '2': ['25.00%', '75.00%'],
      },
      orientation: 'horizontal',
    });

    const grid = document.createElement('docks-resizable-grid') as HTMLElement & {
      updateComplete: Promise<unknown>;
      gridSizes?: string[];
    };
    grid.setAttribute('id', 'toggle-grid');
    grid.setAttribute('orientation', 'horizontal');
    grid.setAttribute('sizes', '20%, 60%, 20%');
    grid.innerHTML = '<div id="left"></div><div id="center"></div><div id="right"></div>';
    document.body.append(grid);

    await settleGrid(grid);
    expect(grid.style.gridTemplateColumns).toContain('15.00%');

    grid.removeChild(grid.querySelector('#left')!);
    await settleGrid(grid);
    expect(grid.style.gridTemplateColumns).toContain('25.00%');

    const left = document.createElement('div');
    left.id = 'left';
    grid.insertBefore(left, grid.firstChild);
    await settleGrid(grid);
    expect(grid.style.gridTemplateColumns).toContain('15.00%');
  });

  it('restores persisted sizes after element is recreated', async () => {
    dialogSettings.set('docks-resizable-grid:editor-area-split', {
      sizes: ['65.00%', '35.00%'],
      orientation: 'vertical',
    });

    const createSplit = () => {
      const grid = document.createElement('docks-resizable-grid') as HTMLElement & { updateComplete: Promise<unknown> };
      grid.setAttribute('id', 'editor-area-split');
      grid.setAttribute('orientation', 'vertical');
      grid.setAttribute('sizes', '70%, 30%');
      grid.innerHTML = '<div id="editor"></div><div id="panel"></div>';
      return grid;
    };

    const first = createSplit();
    document.body.append(first);
    await settleGrid(first);
    expect(first.style.gridTemplateRows).toContain('65.00%');

    first.remove();
    const second = createSplit();
    document.body.append(second);
    await settleGrid(second);
    expect(second.style.gridTemplateRows).toContain('65.00%');
  });
});
