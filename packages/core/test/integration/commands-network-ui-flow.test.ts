import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createCommandHarness } from '../helpers/command-harness';

const harness = createCommandHarness();
const toastInfoMock = vi.fn();
const runAsyncMock = vi.fn(async (_name: string, fn: (p: any) => Promise<unknown>) =>
  fn({ message: '', progress: 0 })
);
const filebrowserDialogMock = vi.fn();
const versionInfoDialogMock = vi.fn();
const activeSelectionSignalMock = { get: vi.fn() };
const jsRuntimeExecuteMock = vi.fn();
const jsRuntimeCloseMock = vi.fn();
const renderMock = vi.fn();
const markedParseMock = vi.fn((s: string) => `<p>${s}</p>`);
const unsafeHTMLMock = vi.fn((s: string) => s);
vi.mock('../../src/core/commandregistry', () => ({
  registerAll: harness.registerAllMock,
}));
vi.mock('../../src/core/toast', () => ({
  toastError: harness.toastErrorMock,
  toastInfo: toastInfoMock,
}));
vi.mock('../../src/core/taskservice', () => ({
  taskService: { runAsync: runAsyncMock },
}));
vi.mock('../../src/dialogs/filebrowser-dialog', () => ({
  filebrowserDialog: filebrowserDialogMock,
}));
vi.mock('../../src/dialogs/version-info-dialog', () => ({
  versionInfoDialog: versionInfoDialogMock,
}));
vi.mock('../../src/core/appstate', () => ({
  activeSelectionSignal: activeSelectionSignalMock,
}));
vi.mock('../../src/core/js-runtime', () => ({
  createJsRuntime: () => ({
    execute: jsRuntimeExecuteMock,
    close: jsRuntimeCloseMock,
  }),
}));
vi.mock('lit', () => ({
  html: vi.fn(),
  render: renderMock,
}));
vi.mock('lit/directives/unsafe-html.js', () => ({
  unsafeHTML: unsafeHTMLMock,
}));
vi.mock('marked', () => ({
  marked: { parse: markedParseMock },
}));
vi.mock('../../src/core/apploader', () => ({
  appLoaderService: { getCurrentApp: vi.fn() },
}));

describe('commands network/ui flow', () => {
  async function setupWorkspace(name: string) {
    const { workspaceService } = await import('../../src/core/filesys');
    await workspaceService.disconnectWorkspace();
    await workspaceService.connectFolder({ indexeddb: true, name });
    return workspaceService;
  }

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    (globalThis as any).fetch = vi.fn(async () => ({
      ok: true,
      statusText: 'OK',
      headers: { get: vi.fn(() => null) },
      body: 'STREAM',
      json: async () => ({}),
    }));
    (globalThis as any).document = {
      body: { appendChild: vi.fn() },
      getElementById: vi.fn(() => null),
      createElement: vi.fn(() => ({ id: '', querySelector: vi.fn(() => null) })),
    };
    (globalThis as any).setTimeout = (cb: any) => {
      cb();
      return 0;
    };
  });

  it('js runs inline code and returns runtime result', async () => {
    jsRuntimeExecuteMock.mockResolvedValue(123);
    await import('../../src/commands/js');
    const cmd = harness.getRegistered('js');
    const result = await cmd.handler?.execute({ params: { code: '1+2' } });

    expect(result).toBe(123);
    expect(toastInfoMock).toHaveBeenCalledWith('123');
    expect(jsRuntimeCloseMock).toHaveBeenCalled();
  });

  it('wget downloads into chosen directory', async () => {
    const folder = `net-${Date.now()}`;
    const workspaceService = await setupWorkspace(folder);
    const workspace = await workspaceService.getWorkspace();
    filebrowserDialogMock.mockResolvedValue(`${folder}/downloads`);
    await import('../../src/commands/wget');
    const cmd = harness.getRegistered('wget');

    await cmd.handler?.execute({ params: { url: 'https://example.com/a.txt' } });
    const saved = await workspace?.getResource(`${folder}/downloads/a.txt`);
    expect(saved).toBeTruthy();
    expect(toastInfoMock).toHaveBeenCalled();
  });

  it('show_version_info errors when no app loaded', async () => {
    await import('../../src/commands/version-info');
    const cmd = harness.getRegistered('show_version_info');
    const result = await cmd.handler?.execute({});
    expect(result).toBeUndefined();
    expect(harness.toastErrorMock).toHaveBeenCalledWith('No app loaded');
    expect(versionInfoDialogMock).not.toHaveBeenCalled();
  });

  it('show_version_info opens the version info dialog', async () => {
    const { appLoaderService } = await import('../../src/core/apploader');
    (appLoaderService.getCurrentApp as any).mockReturnValue({
      name: 'Demo',
      version: '1.0.0',
    });
    versionInfoDialogMock.mockResolvedValue(undefined);

    await import('../../src/commands/version-info');
    const cmd = harness.getRegistered('show_version_info');
    await cmd.handler?.execute({});

    expect(versionInfoDialogMock).toHaveBeenCalledOnce();
  });
});
