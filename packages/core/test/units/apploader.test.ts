import { beforeEach, describe, expect, it, vi } from 'vitest';

const extensionRegistryMock = {
  disable: vi.fn(),
  enableAsync: vi.fn(async () => undefined),
  loadEnabledExtensions: vi.fn(async () => undefined),
  registerExtension: vi.fn(),
};

const contributionRegistryMock = {
  registerContribution: vi.fn(),
  getContributions: vi.fn(() => []),
};

const applyRemapsMock = vi.fn();
const publishMock = vi.fn();
const addCatalogUrlsMock = vi.fn(async () => undefined);
const appSettingsGetMock = vi.fn(async () => undefined);
const appSettingsSetMock = vi.fn(async () => undefined);

vi.mock('lit', () => ({
  render: vi.fn(),
  html: vi.fn(),
}));

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
  contributionRegistry: contributionRegistryMock,
  TOPIC_CONTRIBUTEIONS_CHANGED: 'events/contrib/changed',
}));

vi.mock('../../src/core/contribution-targets', () => ({
  SYSTEM_LAYOUTS: 'system.layouts',
}));

vi.mock('../../src/core/settingsservice', () => ({
  appSettings: {
    get: appSettingsGetMock,
    set: appSettingsSetMock,
  },
}));

vi.mock('../../src/core/marketplaceregistry', () => ({
  marketplaceRegistry: {
    addCatalogUrls: addCatalogUrlsMock,
  },
}));

vi.mock('../../src/core/contribution-mapping', () => ({
  contributionTargetMappingRegistry: {
    applyAppNameRemaps: applyRemapsMock,
  },
}));

vi.mock('../../src/core/events', () => ({
  publish: publishMock,
}));

describe('apploader', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    (globalThis as any).window = {
      location: { search: '', pathname: '/' },
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
    (globalThis as any).__RESOLVED_PACKAGE_INFO__ = {
      name: 'resolved-app',
      version: '1.2.3',
      description: 'from host',
      dependencies: {
        a: { license: 'MIT' },
      },
      directDependencies: ['a'],
      nestedDependencies: {},
      marketplaceCatalogUrls: ['https://example.com/catalog.json'],
    };
  });

  it('applies hostConfig defaults on registerApp', async () => {
    const { appLoaderService } = await import('../../src/core/apploader');
    appLoaderService.registerApp({}, { hostConfig: true });

    const app = appLoaderService.getRegisteredApps()[0];
    expect(app.name).toBe('resolved-app');
    expect(app.version).toBe('1.2.3');
    expect(addCatalogUrlsMock).toHaveBeenCalledWith(['https://example.com/catalog.json']);
    expect(app.layout).toBe('standard');
  });

  it('defaults layout to standard when omitted', async () => {
    const { appLoaderService } = await import('../../src/core/apploader');
    appLoaderService.registerApp({ name: 'minimal-app' });

    expect(appLoaderService.getRegisteredApps()[0].layout).toBe('standard');
  });

  it('preserves an explicit layout descriptor', async () => {
    const { appLoaderService } = await import('../../src/core/apploader');
    appLoaderService.registerApp({
      name: 'custom-layout-app',
      layout: { id: 'standard', props: { showBottomPanel: true } },
    });

    const app = appLoaderService.getRegisteredApps().find((entry) => entry.name === 'custom-layout-app');
    expect(app?.layout).toEqual({ id: 'standard', props: { showBottomPanel: true } });
  });

  it('disables previous app extensions and enables next app extensions', async () => {
    const { appLoaderService } = await import('../../src/core/apploader');

    appLoaderService.registerSystemRequiredExtension('sys.ext');
    appLoaderService.registerApp({ name: 'app-a', extensions: ['a.ext'] });
    appLoaderService.registerApp({ name: 'app-b', extensions: ['b.ext'], remaps: [{ name: 'n', targets: ['t'] }] as any });

    await appLoaderService.loadApp('app-a');
    await appLoaderService.loadApp('app-b');

    expect(extensionRegistryMock.disable).toHaveBeenCalledWith('a.ext');
    expect(extensionRegistryMock.enableAsync).toHaveBeenCalledWith('b.ext');
    expect(extensionRegistryMock.enableAsync).toHaveBeenCalledWith('sys.ext');
    expect(applyRemapsMock).toHaveBeenCalled();
  });

  it('start() throws when no apps are registered', async () => {
    const { appLoaderService } = await import('../../src/core/apploader');
    await expect(appLoaderService.start()).rejects.toThrow('No apps registered');
  });

  it('start() resolves app by URL path segment', async () => {
    (globalThis as any).window.location = { search: '', pathname: '/path-app' };
    (contributionRegistryMock.getContributions as any).mockImplementation((target: string) =>
      target === 'system.layouts' ? [{ id: 'standard', component: { tag: 'x-layout' } }] : []
    );

    const { appLoaderService } = await import('../../src/core/apploader');
    appLoaderService.registerApp({ name: 'my/path-app', path: 'path-app' });
    appLoaderService.registerApp({ name: 'preferred-app' });

    await appLoaderService.start();
    expect(appLoaderService.getCurrentApp()?.name).toBe('my/path-app');
  });
});
