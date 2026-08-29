import { beforeEach, describe, expect, it, vi } from 'vitest';

const getContributionsMock = vi.fn(() => []);
const subscribeMock = vi.fn();

vi.mock('lit', () => ({
  html: vi.fn(() => ({})),
  render: vi.fn(),
}));

vi.mock('../../src/core/contributionregistry', () => ({
  contributionRegistry: {
    getContributions: getContributionsMock,
  },
  TOPIC_CONTRIBUTEIONS_CHANGED: 'events/contributions/changed',
}));

vi.mock('../../src/core/events', () => ({
  subscribe: subscribeMock,
}));

vi.mock('../../src/core/logger', () => ({
  createLogger: vi.fn(() => ({ warn: vi.fn(), error: vi.fn() })),
}));

vi.mock('../../src/core/di', () => ({
  rootContext: { put: vi.fn() },
}));

vi.mock('../../src/parts/dialog-content', () => ({
  DocksDialogContent: class {
    updateComplete = Promise.resolve();
    async dispose() {}
    getResult() {
      return {};
    }
  },
}));

describe('dialogservice', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    (globalThis as any).document = {
      body: {
        contains: vi.fn(() => false),
        appendChild: vi.fn(),
      },
      createElement: vi.fn(() => ({ id: '', querySelectorAll: vi.fn(() => []) })),
    };
  });

  it('loads only valid dialog contributions', async () => {
    (getContributionsMock as any).mockReturnValue([
      { id: 'valid', label: 'Valid', component: () => ({}), onButton: vi.fn() },
      { id: 'no-component', onButton: vi.fn() },
      { id: 'no-handler', component: () => ({}) },
      { label: 'missing-id', component: () => ({}), onButton: vi.fn() },
    ]);

    const { dialogService } = await import('../../src/core/dialogservice');
    expect(dialogService.hasDialog('valid')).toBe(true);
    expect(dialogService.hasDialog('no-component')).toBe(false);
    expect(dialogService.hasDialog('no-handler')).toBe(false);
    expect(dialogService.getDialogIds()).toEqual(['valid']);
  });

  it('loads self-contained dialog contributions without onButton', async () => {
    (getContributionsMock as any).mockReturnValue([
      { id: 'custom', selfContained: true, component: () => ({}) },
    ]);

    const { dialogService } = await import('../../src/core/dialogservice');
    expect(dialogService.hasDialog('custom')).toBe(true);
  });

  it('throws on opening unknown dialog', async () => {
    (getContributionsMock as any).mockReturnValue([]);
    const { dialogService } = await import('../../src/core/dialogservice');
    await expect(dialogService.open('missing')).rejects.toThrow('Dialog "missing" not found');
  });

  it('reloads contributions on dialog target change events', async () => {
    const validA = { id: 'a', label: 'A', component: () => ({}), onButton: vi.fn() };
    const validB = { id: 'b', label: 'B', component: () => ({}), onButton: vi.fn() };
    (getContributionsMock as any).mockReturnValueOnce([validA]).mockReturnValue([validB]);

    const { dialogService } = await import('../../src/core/dialogservice');
    expect(dialogService.hasDialog('a')).toBe(true);
    expect(dialogService.hasDialog('b')).toBe(false);

    const [, onContribChanged] =
      subscribeMock.mock.calls.find(([topic]) => topic === 'events/contributions/changed') ?? [];
    expect(onContribChanged).toBeTypeOf('function');
    onContribChanged({ target: 'dialogs' });
    await Promise.resolve();

    expect(dialogService.hasDialog('a')).toBe(false);
    expect(dialogService.hasDialog('b')).toBe(true);
  });

  it('ignores contribution change events for non-dialog targets', async () => {
    const validA = { id: 'a', label: 'A', component: () => ({}), onButton: vi.fn() };
    (getContributionsMock as any).mockReturnValue([validA]);
    const { dialogService } = await import('../../src/core/dialogservice');
    expect(dialogService.hasDialog('a')).toBe(true);

    const beforeCalls = getContributionsMock.mock.calls.length;
    const [, onContribChanged] =
      subscribeMock.mock.calls.find(([topic]) => topic === 'events/contributions/changed') ?? [];
    onContribChanged({ target: 'system.icons' });
    await Promise.resolve();

    expect(getContributionsMock.mock.calls.length).toBe(beforeCalls);
    expect(dialogService.hasDialog('a')).toBe(true);
  });
});
