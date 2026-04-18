import { beforeEach, describe, expect, it, vi } from 'vitest';

const appSettingsMock = {
  get: vi.fn(),
  set: vi.fn(),
};

const publishMock = vi.fn();
const subscribeMock = vi.fn();
const runAsyncMock = vi.fn(async (_name: string, fn: () => Promise<unknown>) => fn());

vi.mock('../../src/core/settingsservice', () => ({
  appSettings: appSettingsMock,
  TOPIC_SETTINGS_CHANGED: 'events/settings/changed',
}));

vi.mock('../../src/core/events', () => ({
  publish: publishMock,
  subscribe: subscribeMock,
}));

vi.mock('../../src/core/toast', () => ({
  toastError: vi.fn(),
  toastInfo: vi.fn(),
}));

vi.mock('../../src/core/taskservice', () => ({
  taskService: {
    runAsync: runAsyncMock,
  },
}));

vi.mock('../../src/core/di', () => ({
  rootContext: { put: vi.fn() },
  uiContext: { getProxy: vi.fn(() => ({})) },
}));

vi.mock('../../src/core/logger', () => ({
  default: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

vi.mock('../../src/core/esmsh-service', () => ({
  esmShService: {
    isSourceIdentifier: vi.fn(() => false),
    extractPackageName: vi.fn(),
    normalizeToEsmSh: vi.fn((s: string) => s),
  },
}));

describe('extensionRegistry', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    appSettingsMock.get.mockImplementation(async (key: string) => {
      if (key === 'extensions') return [];
      if (key === 'extensions.external') return [];
      return undefined;
    });
    appSettingsMock.set.mockResolvedValue(undefined);
  });

  it('loads dependencies before target extension and auto-enables them', async () => {
    const loadOrder: string[] = [];
    const { extensionRegistry } = await import('../../src/core/extensionregistry');

    extensionRegistry.registerExtension({
      id: 'dep',
      name: 'Dep',
      loader: async () => {
        loadOrder.push('dep');
        return {};
      },
    });
    extensionRegistry.registerExtension({
      id: 'main',
      name: 'Main',
      dependencies: ['dep'],
      loader: async () => {
        loadOrder.push('main');
        return {};
      },
    });

    await extensionRegistry.load('main');

    expect(loadOrder).toEqual(['dep', 'main']);
    expect(extensionRegistry.isLoaded('dep')).toBe(true);
    expect(extensionRegistry.isLoaded('main')).toBe(true);
    expect(appSettingsMock.set).toHaveBeenCalled();
  });

  it('detects circular dependencies while loading', async () => {
    const { extensionRegistry } = await import('../../src/core/extensionregistry');

    extensionRegistry.registerExtension({
      id: 'a',
      name: 'A',
      dependencies: ['b'],
      loader: async () => ({}),
    });
    extensionRegistry.registerExtension({
      id: 'b',
      name: 'B',
      dependencies: ['a'],
      loader: async () => ({}),
    });

    await expect(extensionRegistry.load('a')).rejects.toThrow('Circular dependency detected');
  });

  it('enableAsync loads when enabled in settings but a prior load attempt failed', async () => {
    appSettingsMock.get.mockImplementation(async (key: string) => {
      if (key === 'extensions') {
        return [{ id: 'late', enabled: true }];
      }
      if (key === 'extensions.external') return [];
      return undefined;
    });

    const { extensionRegistry } = await import('../../src/core/extensionregistry');

    extensionRegistry.registerExtension({
      id: 'late',
      name: 'Late',
      loader: async () => {
        throw new Error('simulated first load failure');
      },
    });

    await extensionRegistry.loadEnabledExtensions();

    expect(extensionRegistry.isLoaded('late')).toBe(false);

    extensionRegistry.registerExtension({
      id: 'late',
      name: 'Late',
      loader: async () => ({}),
    });

    await extensionRegistry.enableAsync('late', false);

    expect(extensionRegistry.isLoaded('late')).toBe(true);
  });

  it('reuses in-flight load promise for concurrent load calls', async () => {
    const loader = vi.fn(
      async () =>
        await new Promise((resolve) => {
          setTimeout(() => resolve({}), 5);
        })
    );
    const { extensionRegistry } = await import('../../src/core/extensionregistry');

    extensionRegistry.registerExtension({
      id: 'concurrent',
      name: 'Concurrent',
      loader,
    });

    await Promise.all([extensionRegistry.load('concurrent'), extensionRegistry.load('concurrent')]);
    expect(loader).toHaveBeenCalledTimes(1);
  });
});
