import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createCommandHarness } from '../helpers/command-harness';

const harness = createCommandHarness();
const activeSelectionSignalMock = { get: vi.fn() };
const loadEditorMock = vi.fn(async () => undefined);
const toastErrorMock = vi.fn();
const toastInfoMock = vi.fn();
const confirmDialogMock = vi.fn(async () => true);
const showDirectoryPickerMock = vi.fn();
const deleteIndexedDbWorkspaceDataMock = vi.fn(async () => true);

vi.mock('../../src/core/commandregistry', () => ({
  registerAll: harness.registerAllMock,
}));
vi.mock('../../src/core/appstate', () => ({
  activeSelectionSignal: activeSelectionSignalMock,
}));
vi.mock('../../src/core/editorregistry', () => ({
  editorRegistry: { loadEditor: loadEditorMock },
}));
vi.mock('../../src/core/toast', () => ({
  toastError: toastErrorMock,
  toastInfo: toastInfoMock,
}));
vi.mock('../../src/dialogs', () => ({
  confirmDialog: confirmDialogMock,
}));
vi.mock('../../src/core/filesys', async () => {
  const actual = await vi.importActual<any>('../../src/core/filesys');
  return {
    ...actual,
    deleteIndexedDbWorkspaceData: deleteIndexedDbWorkspaceDataMock,
  };
});

describe('commands files branch flow', () => {
  const folderName = () => `filesb-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    activeSelectionSignalMock.get.mockReturnValue(undefined);
    (globalThis as any).window = {
      showDirectoryPicker: showDirectoryPickerMock,
    };
  });

  it('disconnect_folder validates selection and handles indexeddb confirmation', async () => {
    const { workspaceService } = await import('../../src/core/filesys');
    await workspaceService.disconnectWorkspace();
    const name = folderName();
    await workspaceService.connectFolder({ indexeddb: true, name });
    const workspace = await workspaceService.getWorkspace();
    const root = (await workspace?.listChildren(false))?.find((r: any) => r.getName() === name);

    await import('../../src/commands/files');
    const cmd = harness.getRegistered('disconnect_folder');

    activeSelectionSignalMock.get.mockReturnValue(undefined);
    await cmd.handler?.execute({});
    expect(toastErrorMock).toHaveBeenCalledWith('Select a folder root to disconnect.');

    activeSelectionSignalMock.get.mockReturnValue(root);
    confirmDialogMock.mockResolvedValue(false);
    await cmd.handler?.execute({});
    expect(deleteIndexedDbWorkspaceDataMock).not.toHaveBeenCalled();

    confirmDialogMock.mockResolvedValue(true);
    await cmd.handler?.execute({});
    expect(deleteIndexedDbWorkspaceDataMock).toHaveBeenCalled();
  });

  it('load_workspace handles picker errors', async () => {
    showDirectoryPickerMock.mockRejectedValue(new Error('denied'));
    await import('../../src/commands/files');
    const cmd = harness.getRegistered('load_workspace');
    await expect(cmd.handler?.execute({})).rejects.toThrow('denied');
    expect(toastErrorMock).toHaveBeenCalledWith('denied');
  });

  it('load_workspace cancel skips toast and rethrows', async () => {
    const abort = new Error('The user aborted a request.');
    abort.name = 'AbortError';
    showDirectoryPickerMock.mockRejectedValue(abort);
    await import('../../src/commands/files');
    const cmd = harness.getRegistered('load_workspace');
    await expect(cmd.handler?.execute({})).rejects.toThrow(/abort/i);
    expect(toastErrorMock).not.toHaveBeenCalled();
  });

  it('load_workspace connects selected directory handle', async () => {
    const { workspaceService } = await import('../../src/core/filesys');
    const connectWorkspaceSpy = vi.spyOn(workspaceService, 'connectWorkspace').mockResolvedValue(undefined as any);
    const dirHandle = { kind: 'directory', name: 'picked' } as any;
    showDirectoryPickerMock.mockResolvedValue(dirHandle);

    await import('../../src/commands/files');
    const cmd = harness.getRegistered('load_workspace');
    await cmd.handler?.execute({});

    expect(connectWorkspaceSpy).toHaveBeenCalledWith(dirHandle);
    connectWorkspaceSpy.mockRestore();
  });

  it('connect_opfs and connect_indexeddb handle connect failures', async () => {
    const { workspaceService } = await import('../../src/core/filesys');
    const spy = vi.spyOn(workspaceService, 'connectFolder').mockRejectedValue(new Error('boom'));
    await import('../../src/commands/files');
    const opfs = harness.getRegistered('connect_opfs');
    const idb = harness.getRegistered('connect_indexeddb');

    await opfs.handler?.execute({});
    await idb.handler?.execute({ params: { name: 'x' } });
    expect(toastErrorMock).toHaveBeenCalledWith('boom');
    spy.mockRestore();
  });

  it('refresh_resource handles selection and missing workspace', async () => {
    const { workspaceService } = await import('../../src/core/filesys');
    await workspaceService.disconnectWorkspace();
    await import('../../src/commands/files');
    const refresh = harness.getRegistered('refresh_resource');

    const touch = vi.fn();
    activeSelectionSignalMock.get.mockReturnValue({ getWorkspace: () => ({ touch }) });
    await refresh.handler?.execute({});
    expect(touch).toHaveBeenCalled();

    activeSelectionSignalMock.get.mockReturnValue(undefined);
    await workspaceService.disconnectWorkspace();
    await refresh.handler?.execute({});
    expect(toastErrorMock).toHaveBeenCalledWith('No workspace selected.');
  });

  it('refresh_resource touches workspace when no active selection', async () => {
    const { workspaceService } = await import('../../src/core/filesys');
    await workspaceService.disconnectWorkspace();
    await workspaceService.connectFolder({ indexeddb: true, name: folderName() });
    const workspace = await workspaceService.getWorkspace();

    await import('../../src/commands/files');
    const refresh = harness.getRegistered('refresh_resource');
    const touchSpy = vi.spyOn(workspace as any, 'touch');
    activeSelectionSignalMock.get.mockReturnValue(undefined);

    await refresh.handler?.execute({});
    expect(touchSpy).toHaveBeenCalled();
    touchSpy.mockRestore();
  });

  it('open_editor uses active selection fallback when path missing', async () => {
    await import('../../src/commands/files');
    const openEditor = harness.getRegistered('open_editor');
    const fileSelection = Object.create((await import('../../src/core/filesys')).File.prototype);
    activeSelectionSignalMock.get.mockReturnValue(fileSelection);
    await openEditor.handler?.execute({ params: {} });
    expect(loadEditorMock).toHaveBeenCalledWith(fileSelection, undefined);
  });

  it('open_editor resolves by path and passes editor id', async () => {
    const { workspaceService } = await import('../../src/core/filesys');
    await workspaceService.disconnectWorkspace();
    const rootName = folderName();
    await workspaceService.connectFolder({ indexeddb: true, name: rootName });
    const workspace = await workspaceService.getWorkspace();
    const file = await workspace?.getResource(`${rootName}/file.ts`, { create: true });
    await (file as any)?.saveContents('const x = 1;');

    await import('../../src/commands/files');
    const openEditor = harness.getRegistered('open_editor');
    await openEditor.handler?.execute({ params: { path: `${rootName}/file.ts`, editorId: 'custom.editor' } });

    expect(loadEditorMock).toHaveBeenLastCalledWith(expect.anything(), 'custom.editor');
  });

  it('disconnect_folder shows toast when disconnect throws', async () => {
    const { workspaceService } = await import('../../src/core/filesys');
    await workspaceService.disconnectWorkspace();
    const name = folderName();
    await workspaceService.connectFolder({ indexeddb: true, name });
    const workspace = await workspaceService.getWorkspace();
    const root = (await workspace?.listChildren(false))?.find((r: any) => r.getName() === name);
    const disconnectSpy = vi.spyOn(workspaceService, 'disconnectFolder').mockRejectedValue(new Error('disconnect failed'));

    await import('../../src/commands/files');
    const cmd = harness.getRegistered('disconnect_folder');
    activeSelectionSignalMock.get.mockReturnValue(root);
    await cmd.handler?.execute({});

    expect(toastErrorMock).toHaveBeenCalledWith('disconnect failed');
    disconnectSpy.mockRestore();
  });

  it('active editor commands handle thrown provider errors and invalid snippet args', async () => {
    await import('../../src/commands/files');
    const c1 = harness.getRegistered('get_active_editor_content');
    const c2 = harness.getRegistered('get_active_editor_selection');
    const c3 = harness.getRegistered('get_active_editor_snippet');

    const throwingEditor = {
      getContent: () => {
        throw new Error('x');
      },
      getSelection: () => {
        throw new Error('x');
      },
      getSnippet: () => null,
      getLanguage: () => 'ts',
      getFilePath: () => 'x.ts',
    };

    expect(await c1.handler?.execute({ activeEditor: throwingEditor })).toEqual({
      content: null,
      filePath: null,
      language: null,
    });
    expect(await c2.handler?.execute({ activeEditor: throwingEditor })).toEqual({
      selection: null,
      filePath: null,
      language: null,
    });
    expect(await c3.handler?.execute({ activeEditor: throwingEditor, params: { lines: '-1' } })).toEqual({
      filePath: null,
      language: null,
      snippet: null,
      cursorLine: null,
    });
  });

  it('active editor commands return null shape for non-provider editors', async () => {
    await import('../../src/commands/files');
    const c1 = harness.getRegistered('get_active_editor_content');
    const c2 = harness.getRegistered('get_active_editor_selection');
    const c3 = harness.getRegistered('get_active_editor_snippet');

    expect(await c1.handler?.execute({ activeEditor: {} })).toEqual({
      content: null,
      filePath: null,
      language: null,
    });
    expect(await c2.handler?.execute({ activeEditor: {} })).toEqual({
      selection: null,
      filePath: null,
      language: null,
    });
    expect(await c3.handler?.execute({ activeEditor: {} })).toEqual({
      snippet: null,
      filePath: null,
      language: null,
      cursorLine: null,
    });
  });

  it('active editor snippet handles null and thrown snippet providers', async () => {
    await import('../../src/commands/files');
    const c3 = harness.getRegistered('get_active_editor_snippet');
    const nullSnippetEditor = {
      getContent: () => 'c',
      getSelection: () => 's',
      getSnippet: () => null,
      getLanguage: () => 'ts',
      getFilePath: () => 'x.ts',
    };
    const throwSnippetEditor = {
      ...nullSnippetEditor,
      getSnippet: () => {
        throw new Error('snippet fail');
      },
    };

    expect(await c3.handler?.execute({ activeEditor: nullSnippetEditor, params: { lines: '2' } })).toEqual({
      snippet: null,
      filePath: null,
      language: null,
      cursorLine: null,
    });
    expect(await c3.handler?.execute({ activeEditor: throwSnippetEditor, params: { lines: '2' } })).toEqual({
      snippet: null,
      filePath: null,
      language: null,
      cursorLine: null,
    });
  });

  it('active editor snippet returns data for valid provider', async () => {
    await import('../../src/commands/files');
    const c3 = harness.getRegistered('get_active_editor_snippet');
    const okEditor = {
      getContent: () => 'c',
      getSelection: () => 's',
      getSnippet: () => ({ snippet: 'line1\nline2', cursorLine: 2 }),
      getLanguage: () => 'ts',
      getFilePath: () => 'src/file.ts',
    };

    expect(await c3.handler?.execute({ activeEditor: okEditor, params: { lines: '3' } })).toEqual({
      snippet: 'line1\nline2',
      filePath: 'src/file.ts',
      language: 'ts',
      cursorLine: 2,
    });
  });
});
