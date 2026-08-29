import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
  registerAllMock,
  toastErrorMock,
  toastInfoMock,
  runAsyncMock,
  activeSelectionSignalMock,
  jsZipLoadAsyncMock,
  getRegistered,
} = vi.hoisted(() => {
  const registerAllMock = vi.fn();
  const toastErrorMock = vi.fn();

  return {
    registerAllMock,
    toastErrorMock,
    toastInfoMock: vi.fn(),
    runAsyncMock: vi.fn(async (_name: string, fn: (p: { message: string; progress: number }) => Promise<unknown>) =>
      fn({ message: '', progress: 0 }),
    ),
    activeSelectionSignalMock: { get: vi.fn(), set: vi.fn() },
    jsZipLoadAsyncMock: vi.fn(),
    getRegistered(commandId: string) {
      for (const [registration] of registerAllMock.mock.calls) {
        if (registration?.command?.id === commandId) {
          return registration as {
            command: { id: string };
            handler?: { execute: (context: unknown) => Promise<unknown> | unknown };
          };
        }
      }
      throw new Error(`Command not registered: ${commandId}`);
    },
  };
});

vi.mock('@eclipse-docks/core', async () => {
  const filesys = await import('../../core/src/core/filesys/index.ts');
  return {
    registerAll: registerAllMock,
    toastError: toastErrorMock,
    toastInfo: toastInfoMock,
    taskService: { runAsync: runAsyncMock },
    activeSelectionSignal: activeSelectionSignalMock,
    workspaceService: filesys.workspaceService,
    File: filesys.File,
    FileContentType: filesys.FileContentType,
  };
});

vi.mock('jszip', () => ({
  default: {
    loadAsync: (...args: unknown[]) => jsZipLoadAsyncMock(...args),
  },
}));

describe('unzip command', () => {
  async function setupWorkspace(name: string) {
    const { workspaceService } = await import('../../core/src/core/filesys/index.ts');
    await workspaceService.disconnectWorkspace();
    await workspaceService.connectFolder({ indexeddb: true, name });
    return workspaceService;
  }

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('extracts zip entries into target folder', async () => {
    const folder = `unzip-${Date.now()}`;
    const workspaceService = await setupWorkspace(folder);
    const workspace = await workspaceService.getWorkspace();
    const zipFile = await workspace?.getResource(`${folder}/archive.zip`, { create: true });
    await (zipFile as { saveContents: (blob: Blob) => Promise<void> }).saveContents(new Blob(['x']));
    activeSelectionSignalMock.get.mockReturnValue({ path: `${folder}/archive.zip` });
    jsZipLoadAsyncMock.mockResolvedValue({
      files: {
        'a.txt': { dir: false, async: async () => new Blob(['a']) },
      },
    });

    await import('../src/commands/unzip');
    const cmd = getRegistered('unzip');
    await cmd.handler?.execute({ params: { target: `${folder}/archive/` } });
    expect(await workspace?.getResource(`${folder}/archive/a.txt`)).toBeTruthy();
  });
});
