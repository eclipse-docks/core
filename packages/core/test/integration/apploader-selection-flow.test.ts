import { beforeEach, describe, expect, it, vi } from 'vitest';

const extensionRegistryMock = {
  disable: vi.fn(),
  enableAsync: vi.fn(async () => undefined),
  loadEnabledExtensions: vi.fn(async () => undefined),
  registerExtension: vi.fn(),
};

vi.mock('../../src/core/di', () => ({
  rootContext: { put: vi.fn() },
}));

vi.mock('../../src/core/logger', () => ({
  createLogger: vi.fn(() => ({ debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() })),
}));

vi.mock('../../src/core/extensionregistry', () => ({
  extensionRegistry: extensionRegistryMock,
}));

vi.mock('../../src/core/contributionregistry', () => ({
  contributionRegistry: {
    registerContribution: vi.fn(),
    getContributions: vi.fn((target: string) =>
      target === 'system.layouts'
        ? [{ id: 'standard', component: { tag: 'k-standard-layout' } }]
        : []
    ),
  },
  TOPIC_CONTRIBUTEIONS_CHANGED: 'events/contrib/changed',
}));

vi.mock('../../src/core/contribution-targets', () => ({
  SYSTEM_LAYOUTS: 'system.layouts',
}));

vi.mock('../../src/core/settingsservice', () => ({
  appSettings: {
    get: vi.fn(async (key: string) => (key === 'preferredAppName' ? 'preferred-app' : undefined)),
    set: vi.fn(async () => undefined),
  },
}));

vi.mock('../../src/core/marketplaceregistry', () => ({
  marketplaceRegistry: { addCatalogUrls: vi.fn(async () => undefined) },
}));

vi.mock('../../src/core/contribution-mapping', () => ({
  contributionTargetMappingRegistry: { applyAppNameRemaps: vi.fn() },
}));

vi.mock('../../src/core/events', () => ({
  publish: vi.fn(),
}));

vi.mock('lit', () => ({
  render: vi.fn(),
  html: vi.fn(),
}));

describe('AppLoader integration selection flow', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    (globalThis as any).window = {
      location: { search: '?appId=url-app', pathname: '/' },
      dispatchEvent: vi.fn(),
    };
    (globalThis as any).CustomEvent = class {
      constructor(public type: string, public init?: any) {}
    };
    (globalThis as any).document = {
      body: { innerHTML: '', appendChild: vi.fn() },
      title: '',
      head: { appendChild: vi.fn() },
      querySelector: vi.fn(() => null),
      createElement: vi.fn(() => ({ setAttribute: vi.fn() })),
    };
    (globalThis as any).requestAnimationFrame = (cb: FrameRequestCallback) => cb(0);
  });

  it('start() prioritizes appId URL over preferred app setting', async () => {
    const { appLoaderService } = await import('../../src/core/apploader');
    appLoaderService.registerApp({ name: 'preferred-app' });
    appLoaderService.registerApp({ name: 'url-app' });

    await appLoaderService.start();
    expect(appLoaderService.getCurrentApp()?.name).toBe('url-app');
  });

  it('switching apps calls dispose and disables previous extensions', async () => {
    const disposeA = vi.fn(async () => undefined);
    const { appLoaderService } = await import('../../src/core/apploader');
    appLoaderService.registerApp({ name: 'app-a', extensions: ['a.ext'], dispose: disposeA });
    appLoaderService.registerApp({ name: 'app-b', extensions: ['b.ext'] });

    await appLoaderService.loadApp('app-a');
    await appLoaderService.loadApp('app-b');

    expect(disposeA).toHaveBeenCalledTimes(1);
    expect(extensionRegistryMock.disable).toHaveBeenCalledWith('a.ext');
    expect(extensionRegistryMock.enableAsync).toHaveBeenCalledWith('b.ext');
  });
});
