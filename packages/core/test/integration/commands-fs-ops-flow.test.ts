import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createCommandHarness } from '../helpers/command-harness';

const harness = createCommandHarness();
const activeSelectionSignalMock = { get: vi.fn() };
const promptDialogMock = vi.fn();
const confirmDialogMock = vi.fn();
const toastInfoMock = vi.fn();

vi.mock('../../src/core/commandregistry', () => ({
  COMMAND_TAG_SHELL: 'shell',
  registerAll: harness.registerAllMock,
}));
vi.mock('../../src/core/appstate', () => ({
  activeSelectionSignal: activeSelectionSignalMock,
}));
vi.mock('../../src/dialogs', () => ({
  promptDialog: promptDialogMock,
  confirmDialog: confirmDialogMock,
}));
vi.mock('../../src/core/toast', () => ({
  toastError: harness.toastErrorMock,
  toastInfo: toastInfoMock,
}));

describe('commands fs operations flow', () => {
  async function setupIndexedDbWorkspace(name: string) {
    const { workspaceService, Directory } = await import('../../src/core/filesys');
    await workspaceService.disconnectWorkspace();
    await workspaceService.connectFolder({ indexeddb: true, name });
    const workspace = await workspaceService.getWorkspace();
    const roots = await workspace!.listChildren(false);
    const root = roots.find((r) => r.getName() === name) as InstanceType<typeof Directory>;
    return { workspaceService, root };
  }

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    activeSelectionSignalMock.get.mockReturnValue(undefined);
  });

  it('touch creates and overwrites file when confirmed', async () => {
    const folderName = `touch-${Date.now()}`;
    const { workspaceService, root } = await setupIndexedDbWorkspace(folderName);
    activeSelectionSignalMock.get.mockReturnValue(root);
    confirmDialogMock.mockResolvedValue(true);
    await import('../../src/commands/touch');
    const touch = harness.getRegistered('touch');

    await touch.handler?.execute({ params: { path: 'a.txt', contents: 'one' } });
    await touch.handler?.execute({ params: { path: 'a.txt', contents: 'two' } });

    const workspace = await workspaceService.getWorkspace();
    const file = await workspace?.getResource(`${folderName}/a.txt`);
    expect(await (file as any).getContents()).toBe('two');
    expect(confirmDialogMock).toHaveBeenCalled();
  });

  it('mkdir creates missing directory path', async () => {
    const folderName = `mkdir-${Date.now()}`;
    const { workspaceService, root } = await setupIndexedDbWorkspace(folderName);
    activeSelectionSignalMock.get.mockReturnValue(root);
    await import('../../src/commands/mkdir');
    const mkdir = harness.getRegistered('mkdir');
    const created = await mkdir.handler?.execute({ params: { path: 'foo/bar' } });

    expect(created).toBe(`${folderName}/foo/bar`);
    const workspace = await workspaceService.getWorkspace();
    const dir = await workspace?.getResource(`${folderName}/foo/bar/`);
    expect(dir).toBeTruthy();
  });

  it('ls lists files recursively with sizes', async () => {
    const folderName = `ls-${Date.now()}`;
    const { workspaceService, root } = await setupIndexedDbWorkspace(folderName);
    const a = await root.getResource('foo/a.txt', { create: true });
    const b = await root.getResource('foo/b.txt', { create: true });
    await (a as any).saveContents('1234');
    await (b as any).saveContents('12');

    await import('../../src/commands/ls');
    const ls = harness.getRegistered('ls');
    const result = await ls.handler?.execute({ params: { path: `${folderName}/foo`, recursive: true } });

    const workspace = await workspaceService.getWorkspace();
    const fileA = await workspace?.getResource(`${folderName}/foo/a.txt`);
    const fileB = await workspace?.getResource(`${folderName}/foo/b.txt`);

    expect(result).toEqual(
      expect.arrayContaining([
        { path: (fileA as any).getWorkspacePath(), size: 4 },
        { path: (fileB as any).getWorkspacePath(), size: 2 },
      ])
    );
  });

  it('rm deletes active selection when confirm is false', async () => {
    const { root } = await setupIndexedDbWorkspace(`rm-${Date.now()}`);
    const selected = await root.getResource('x.txt', { create: true });
    activeSelectionSignalMock.get.mockReturnValue(selected);

    await import('../../src/commands/rm');
    const rm = harness.getRegistered('rm');
    await rm.handler?.execute({ params: { confirm: false } });

    expect(await root.getResource('x.txt')).toBeNull();
  });

  it('mv renames active selection with prompted name', async () => {
    const { root } = await setupIndexedDbWorkspace(`mv-${Date.now()}`);
    const selected = await root.getResource('old.txt', { create: true });
    activeSelectionSignalMock.get.mockReturnValue(selected);
    promptDialogMock.mockResolvedValue('new.txt');

    await import('../../src/commands/mv');
    const mv = harness.getRegistered('mv');
    await mv.handler?.execute({ params: {} });

    expect(await root.getResource('old.txt')).toBeNull();
    expect(await root.getResource('new.txt')).toBeTruthy();
  });
});
