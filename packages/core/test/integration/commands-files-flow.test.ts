import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createCommandHarness } from '../helpers/command-harness';

const harness = createCommandHarness();
const activeSelectionSignalMock = { get: vi.fn() };
const loadEditorMock = vi.fn(async () => undefined);
const toastErrorMock = vi.fn();

vi.mock('../../src/core/commandregistry', () => ({
  COMMAND_TAG_SHELL: 'shell',
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
  toastInfo: vi.fn(),
}));
vi.mock('../../src/dialogs', () => ({
  confirmDialog: vi.fn(async () => true),
}));

describe('commands files flow', () => {
  const folderName = () => `files-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    activeSelectionSignalMock.get.mockReturnValue(undefined);
  });

  it('open_editor opens file by path using editor registry', async () => {
    const filesys = await import('../../src/core/filesys');
    await filesys.workspaceService.disconnectWorkspace();
    const name = folderName();
    await filesys.workspaceService.connectFolder({ indexeddb: true, name });
    const workspace = await filesys.workspaceService.getWorkspace();
    const file = await workspace?.getResource(`${name}/x.txt`, { create: true });
    await (file as any).saveContents('x');

    await import('../../src/commands/files');
    const cmd = harness.getRegistered('open_editor');
    await cmd.handler?.execute({ params: { path: `${name}/x.txt`, editorId: 'plain' } });
    expect(loadEditorMock).toHaveBeenCalledWith(expect.anything(), 'plain');
  });

  it('get_active_editor_* commands return null shapes when no provider', async () => {
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
      filePath: null,
      language: null,
      snippet: null,
      cursorLine: null,
    });
  });

  it('get_active_editor_snippet returns snippet for provider', async () => {
    await import('../../src/commands/files');
    const cmd = harness.getRegistered('get_active_editor_snippet');
    const activeEditor = {
      getContent: () => 'abc',
      getSelection: () => 'b',
      getSnippet: (_n: number) => ({ snippet: 'line', cursorLine: 2 }),
      getLanguage: () => 'ts',
      getFilePath: () => 'x.ts',
    };
    const result = await cmd.handler?.execute({ activeEditor, params: { lines: '3' } });
    expect(result).toEqual({
      snippet: 'line',
      filePath: 'x.ts',
      language: 'ts',
      cursorLine: 2,
    });
  });
});
