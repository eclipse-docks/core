import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createCommandHarness } from '../helpers/command-harness';

const harness = createCommandHarness();
const loadEditorMock = vi.fn(async () => undefined);
const toastInfoMock = vi.fn();
const toastErrorMock = vi.fn();
const appSettingsGetMock = vi.fn(async () => 'wa-dark');
const appSettingsSetMock = vi.fn(async () => undefined);
const activePartSignalMock = { get: vi.fn() };
const extensionRegistryMock = {
  getExtensions: vi.fn(() => []),
  isEnabled: vi.fn(() => false),
};

vi.mock('../../src/core/commandregistry', () => ({
  COMMAND_TAG_SHELL: 'shell',
  registerAll: harness.registerAllMock,
}));
vi.mock('../../src/core/editorregistry', () => ({
  editorRegistry: { loadEditor: loadEditorMock },
}));
vi.mock('../../src/core/toast', () => ({
  toastInfo: toastInfoMock,
  toastError: toastErrorMock,
}));
vi.mock('../../src/core/appstate', () => ({
  activePartSignal: activePartSignalMock,
}));
vi.mock('../../src/core/settingsservice', () => ({
  appSettings: { get: appSettingsGetMock, set: appSettingsSetMock },
}));
vi.mock('../../src/core/extensionregistry', () => ({
  extensionRegistry: extensionRegistryMock,
}));
vi.mock('../../src/core/marketplaceregistry', () => ({
  marketplaceRegistry: {},
}));
vi.mock('../../src/commands/files', () => ({}));
vi.mock('../../src/commands/version-info', () => ({}));
vi.mock('lit', () => ({
  html: vi.fn(() => ({})),
}));

describe('commands global flow', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    (globalThis as any).document = {
      documentElement: {
        classList: {
          contains: vi.fn((v: string) => v === 'wa-dark'),
          remove: vi.fn(),
          add: vi.fn(),
        },
        requestFullscreen: vi.fn(async () => undefined),
      },
      fullscreenElement: null,
      exitFullscreen: vi.fn(async () => undefined),
    };
  });

  it('save command saves only dirty active part', async () => {
    await import('../../src/commands/global');
    const save = harness.getRegistered('save');

    const part = { isDirty: () => true, save: vi.fn() };
    activePartSignalMock.get.mockReturnValue(part);
    await save.handler?.execute({});
    expect(part.save).toHaveBeenCalled();

    activePartSignalMock.get.mockReturnValue({ isDirty: () => false, save: vi.fn() });
    await save.handler?.execute({});
  });

  it('switch_theme toggles theme and persists setting', async () => {
    await import('../../src/commands/global');
    const cmd = harness.getRegistered('switch_theme');
    await cmd.handler?.execute({});
    expect(appSettingsSetMock).toHaveBeenCalledWith('theme', 'wa-light');
  });

  it('fullscreen toggles enter/exit', async () => {
    await import('../../src/commands/global');
    const cmd = harness.getRegistered('fullscreen');
    await cmd.handler?.execute({});
    expect((globalThis as any).document.documentElement.requestFullscreen).toHaveBeenCalled();

    (globalThis as any).document.fullscreenElement = (globalThis as any).document.documentElement;
    await cmd.handler?.execute({});
    expect((globalThis as any).document.exitFullscreen).toHaveBeenCalled();
  });

  it('open_extensions and list_extensions handlers work', async () => {
    (extensionRegistryMock.getExtensions as any).mockReturnValue([
      { id: 'a', name: 'A', description: 'd', experimental: false },
    ]);
    extensionRegistryMock.isEnabled.mockReturnValue(true);
    await import('../../src/commands/global');
    const openExtensions = harness.getRegistered('open_extensions');
    const listExtensions = harness.getRegistered('list_extensions');

    await openExtensions.handler?.execute({});
    expect(loadEditorMock).toHaveBeenCalled();

    const list = await listExtensions.handler?.execute({});
    expect(list).toEqual([
      { id: 'a', name: 'A', description: 'd', experimental: false, enabled: true },
    ]);
  });

  it('toast_message routes to correct toast type', async () => {
    await import('../../src/commands/global');
    const cmd = harness.getRegistered('toast_message');
    cmd.handler?.execute({ params: { message: 'hi' } });
    cmd.handler?.execute({ params: { message: 'oops', type: 'error' } });
    expect(toastInfoMock).toHaveBeenCalledWith('hi');
    expect(toastErrorMock).toHaveBeenCalledWith('oops');
  });
});
