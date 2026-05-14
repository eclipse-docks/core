import { beforeEach, describe, expect, it, vi } from 'vitest';

const subscribeMock = vi.fn();
const getContributionsMock = vi.fn(() => []);
const registerContributionMock = vi.fn();

vi.mock('../../src/core/events', () => ({
  subscribe: subscribeMock,
}));

vi.mock('../../src/core/contributionregistry', () => ({
  contributionRegistry: {
    getContributions: getContributionsMock,
    registerContribution: registerContributionMock,
  },
  TOPIC_CONTRIBUTEIONS_CHANGED: 'events/contributions/changed',
}));

vi.mock('../../src/core/filesys', () => ({
  File: class {
    constructor(private readonly n: string) {}
    getName() {
      return this.n;
    }
  },
  TOPIC_WORKSPACE_CONNECTED: 'events/filesys/workspaceConnected',
}));

vi.mock('../../src/core/di', () => ({
  rootContext: { put: vi.fn() },
}));

vi.mock('../../src/core/constants', () => ({
  EDITOR_AREA_MAIN: 'editor-main',
}));

describe('editorregistry', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    (globalThis as any).document = {
      querySelector: vi.fn(() => null),
    };
  });

  it('sorts icon contributions by priority and resolves icon', async () => {
    (getContributionsMock as any).mockReturnValue([
      { label: 'low', priority: 1, mappings: { py: 'file-low' } },
      { label: 'high', priority: 10, mappings: { py: 'file-high' } },
    ]);
    const { editorRegistry } = await import('../../src/core/editorregistry');
    expect(editorRegistry.getFileIcon('x.py')).toBe('file-high');
  });

  it('handles preferred editor input handler and lazy init', async () => {
    const { editorRegistry } = await import('../../src/core/editorregistry');
    const lazyInit = vi.fn(async () => undefined);
    const handle = vi.fn(async () => ({
      key: 'k',
      title: 'T',
      data: {},
      component: () => null,
      state: {},
    }));
    editorRegistry.registerEditorInputHandler({
      editorId: 'ed',
      label: 'Editor',
      canHandle: () => true,
      handle,
      lazyInit,
      ranking: 5,
    });

    const result = await editorRegistry.handleInput({ x: 1 }, 'ed');
    expect(lazyInit).toHaveBeenCalled();
    expect(handle).toHaveBeenCalled();
    expect((result as any).editorId).toBe('ed');
  });

  it('lists editor options without duplicate editor IDs', async () => {
    const { editorRegistry } = await import('../../src/core/editorregistry');
    editorRegistry.registerEditorInputHandler({
      editorId: 'same',
      label: 'Editor A',
      canHandle: () => true,
      handle: async () => ({ key: 'a', title: 'A', data: {}, state: {}, component: () => null }),
      ranking: 2,
    });
    editorRegistry.registerEditorInputHandler({
      editorId: 'same',
      label: 'Editor B',
      canHandle: () => true,
      handle: async () => ({ key: 'b', title: 'B', data: {}, state: {}, component: () => null }),
      ranking: 1,
    });

    const options = editorRegistry.getEditorOptionsForInput({});
    expect(options).toHaveLength(1);
    expect(options[0].editorId).toBe('same');
  });

  it('openTab activates existing tab or opens new one', async () => {
    const activate = vi.fn();
    const open = vi.fn();
    const closeAllTabs = vi.fn(async () => true);
    (globalThis as any).document = {
      querySelector: vi.fn(() => ({
        has: (name: string) => name === 'existing',
        activate,
        open,
        closeAllTabs,
      })),
    };

    const { editorRegistry } = await import('../../src/core/editorregistry');
    await editorRegistry.openTab({ name: 'existing', label: 'Existing' } as any);
    expect(activate).toHaveBeenCalledWith('existing');
    expect(open).not.toHaveBeenCalled();
    expect(closeAllTabs).not.toHaveBeenCalled();

    await editorRegistry.openTab({ name: 'new-one', label: 'New One' } as any);
    expect(open).toHaveBeenCalledWith(expect.objectContaining({ name: 'new-one' }));
  });

  it('openTab with singleTab closes all then opens', async () => {
    const activate = vi.fn();
    const open = vi.fn();
    const closeAllTabs = vi.fn(async () => true);
    (globalThis as any).document = {
      querySelector: vi.fn(() => ({
        has: vi.fn(() => false),
        activate,
        open,
        closeAllTabs,
      })),
    };

    const { editorRegistry } = await import('../../src/core/editorregistry');
    await editorRegistry.openTab({ name: 'only', label: 'Only' } as any, { singleTab: true });
    expect(closeAllTabs).toHaveBeenCalledOnce();
    expect(open).toHaveBeenCalledWith(expect.objectContaining({ name: 'only' }));
    expect(activate).not.toHaveBeenCalled();
  });

  it('openTab with singleTab aborts when closeAllTabs returns false', async () => {
    const open = vi.fn();
    const closeAllTabs = vi.fn(async () => false);
    (globalThis as any).document = {
      querySelector: vi.fn(() => ({
        has: vi.fn(() => false),
        activate: vi.fn(),
        open,
        closeAllTabs,
      })),
    };

    const { editorRegistry } = await import('../../src/core/editorregistry');
    await editorRegistry.openTab({ name: 'x', label: 'X' } as any, { singleTab: true });
    expect(closeAllTabs).toHaveBeenCalledOnce();
    expect(open).not.toHaveBeenCalled();
  });
});
