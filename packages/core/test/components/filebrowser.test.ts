// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'lit';
import { activeSelectionSignal } from '../../src/core/appstate';
import { commandRegistry } from '../../src/core/commandregistry';
import type { TreeNode } from '../../src/core/tree-utils';
import type { Resource } from '../../src/core/filesys';
import {
  Directory,
  File,
  UnavailableWorkspaceFolderDirectory,
  workspaceService,
} from '../../src/core/filesys';

const confirmDialogMock = vi.fn();
const getEditorOptionsMock = vi.fn(() => [] as Array<{ editorId: string; title: string; icon?: string }>);
const getFileIconMock = vi.fn(() => 'file-lines');

vi.mock('../../src/dialogs', () => ({
  confirmDialog: (...args: unknown[]) =>
    (confirmDialogMock as (...a: unknown[]) => unknown)(...args),
  infoDialog: vi.fn(),
}));

vi.mock('../../src/core/editorregistry', () => ({
  editorRegistry: {
    getFileIcon: (...args: unknown[]) =>
      (getFileIconMock as (...a: unknown[]) => unknown)(...args),
    getEditorOptionsForInput: (...args: unknown[]) =>
      (getEditorOptionsMock as (...a: unknown[]) => unknown)(...args),
  },
}));

vi.mock('../../src/core/i18n', () => ({
  i18n: vi.fn(async () => ({
    FOLDER_LOAD_FAILED: ({ detail }: { detail: string }) => `failed:${detail}`,
    FOLDER_UNAVAILABLE: ({ detail }: { detail: string }) => `unavailable:${detail}`,
    FILE: 'File',
    FOLDER: 'Folder',
    CONNECT_WORKSPACE: 'Connect',
    REFRESH_RESOURCE: 'Refresh',
    CREATE_NEW: 'New',
    OPEN: 'Open',
    OPEN_WITH: 'Open with',
    DROP_FILES_HERE: 'Drop',
    SELECT_WORKSPACE: 'Select workspace',
    UNKNOWN_BACKEND: 'unknown',
    DND_CROSS_CONNECTION_CONFIRM: () => 'cross?',
    FILE_EXISTS_OVERWRITE: ({ fileName }: { fileName: string }) => `overwrite ${fileName}?`,
  })),
}));

class TestFile extends File {
  constructor(
    private readonly fileName: string,
    private readonly parentDir?: Directory,
    private readonly workspacePathOverride?: string
  ) {
    super();
  }

  getName(): string {
    return this.fileName;
  }

  getParent(): Directory | undefined {
    return this.parentDir;
  }

  getWorkspacePath(): string {
    return this.workspacePathOverride ?? 'ws/a.txt';
  }

  async getContents() {
    return '';
  }

  async saveContents() {}

  async size() {
    return 0;
  }

  async delete() {}

  async copyTo() {}

  async rename() {}
}

class TestDir extends Directory {
  constructor(
    private readonly dirName: string,
    private readonly parentDir: Directory | undefined,
    private childResources: Resource[] = []
  ) {
    super();
  }

  setChildren(children: Resource[]) {
    this.childResources = children;
  }

  getName(): string {
    return this.dirName;
  }

  getParent(): Directory | undefined {
    return this.parentDir;
  }

  async listChildren() {
    return this.childResources;
  }

  async getResource() {
    return null;
  }

  touch() {}

  async delete() {}

  async copyTo() {}

  async rename() {}
}

class ThrowingDir extends TestDir {
  async listChildren(): Promise<Resource[]> {
    throw new Error('disk full');
  }
}

function createMockDataTransfer() {
  const data = new Map<string, string>();
  return {
    effectAllowed: '',
    setData: (type: string, value: string) => {
      data.set(type, value);
    },
    getData: (type: string) => data.get(type) ?? '',
  };
}

describe('docks-filebrowser', () => {
  let getWorkspaceSpy: ReturnType<typeof vi.spyOn>;
  let getFolderInfoSpy: ReturnType<typeof vi.spyOn>;
  let isInWorkspaceSpy: ReturnType<typeof vi.spyOn>;
  let executeSpy: ReturnType<typeof vi.spyOn>;
  let activeSetSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    confirmDialogMock.mockResolvedValue(true);
    getWorkspaceSpy = vi.spyOn(workspaceService, 'getWorkspace').mockResolvedValue(undefined);
    getFolderInfoSpy = vi.spyOn(workspaceService, 'getFolderInfoForDirectory').mockResolvedValue({
      name: 'n',
      type: 't',
      backendName: 'test-backend',
    });
    isInWorkspaceSpy = vi.spyOn(workspaceService, 'isResourceInCurrentWorkspace').mockResolvedValue(true);
    executeSpy = vi.spyOn(commandRegistry, 'execute').mockResolvedValue(undefined);
    activeSetSpy = vi.spyOn(activeSelectionSignal, 'set');
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  async function mountFileBrowser() {
    await import('../../src/components/filebrowser');
    const el = document.createElement('docks-filebrowser') as InstanceType<
      typeof import('../../src/components/filebrowser').DocksFileBrowser
    >;
    document.body.appendChild(el);
    await customElements.whenDefined('docks-filebrowser');
    await el.updateComplete;
    return el;
  }

  it('resourceToTreeNode marks files as leaves', async () => {
    const fb = await mountFileBrowser();
    const parent = new TestDir('parent', undefined, []);
    const file = new TestFile('notes.txt', parent);
    const node = await fb.resourceToTreeNode(file, false);
    expect(node.leaf).toBe(true);
    expect(node.label).toBe('notes.txt');
    expect(node.children).toEqual([]);
    fb.remove();
  });

  it('resourceToTreeNode attaches workspaceTag for backend roots', async () => {
    const fb = await mountFileBrowser();
    const root = new TestDir('MyRoot', undefined, []);
    const node = await fb.resourceToTreeNode(root, false);
    expect(node.workspaceTag).toBe('test-backend');
    fb.remove();
  });

  it('ignores workspace tag when getFolderInfoForDirectory fails', async () => {
    getFolderInfoSpy.mockRejectedValueOnce(new Error('no info'));
    const fb = await mountFileBrowser();
    const root = new TestDir('MyRoot', undefined, []);
    const node = await fb.resourceToTreeNode(root, false);
    expect(node.workspaceTag).toBeUndefined();
    fb.remove();
  });

  it('resourceToTreeNode records placeholder notice for unavailable folders', async () => {
    const fb = await mountFileBrowser();
    const bad = new UnavailableWorkspaceFolderDirectory({
      backendType: 'x',
      name: 'Lost',
      data: {},
      reason: 'offline',
    });
    const node = await fb.resourceToTreeNode(bad, false);
    expect(node.placeholderNotice).toBe('offline');
    fb.remove();
  });

  it('resourceToTreeNode loads children and sorts by treeNodeComparator', async () => {
    const fb = await mountFileBrowser();
    const root = new TestDir('root', undefined, []);
    const zfile = new TestFile('z.txt', root);
    const adir = new TestDir('folder-a', root, []);
    root.setChildren([zfile, adir]);

    const node = await fb.resourceToTreeNode(root, true, false);
    expect(node.loaded).toBe(true);
    expect(node.children.map((c) => c.label)).toEqual(['folder-a', 'z.txt']);
    fb.remove();
  });

  it('resourceToTreeNode sets loadError when listChildren throws and resource is still in workspace', async () => {
    isInWorkspaceSpy.mockResolvedValue(true);
    const fb = await mountFileBrowser();
    const badDir = new ThrowingDir('bad', undefined, []);
    const node = await fb.resourceToTreeNode(badDir, true, false);
    expect(node.loadError).toBe('disk full');
    expect(node.loaded).toBe(true);
    fb.remove();
  });

  it('resourceToTreeNode skips loadError when listChildren throws but resource left workspace', async () => {
    isInWorkspaceSpy.mockResolvedValue(false);
    const fb = await mountFileBrowser();
    const badDir = new ThrowingDir('bad', undefined, []);
    const node = await fb.resourceToTreeNode(badDir, true, false);
    expect(node.loadError).toBeUndefined();
    expect(node.loaded).toBe(true);
    fb.remove();
  });

  it('loadWorkspace clears tree when disconnected', async () => {
    const fb = await mountFileBrowser();
    const root = new TestDir('r', undefined, []);
    await fb.loadWorkspace(root, false);
    expect((fb as unknown as { workspaceDir?: Directory }).workspaceDir).toBe(root);
    await fb.loadWorkspace(undefined, false);
    expect((fb as unknown as { workspaceDir?: Directory }).workspaceDir).toBeUndefined();
    expect((fb as unknown as { root?: TreeNode }).root).toBeUndefined();
    fb.remove();
  });

  it('debounces onWorkspaceChanged before reloading', async () => {
    vi.useFakeTimers();
    const fb = await mountFileBrowser();
    const loadSpy = vi.spyOn(fb, 'loadWorkspace');
    loadSpy.mockClear();
    const dir = new TestDir('d', undefined, []);
    fb.onWorkspaceChanged(dir);
    expect(loadSpy).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(250);
    expect(loadSpy).toHaveBeenCalledWith(dir, true);
    vi.useRealTimers();
    fb.remove();
  });

  it('onWorkspaceChanged with undefined triggers loadWorkspace(undefined)', async () => {
    vi.useFakeTimers();
    const fb = await mountFileBrowser();
    const loadSpy = vi.spyOn(fb, 'loadWorkspace');
    loadSpy.mockClear();
    fb.onWorkspaceChanged(undefined);
    await vi.advanceTimersByTimeAsync(250);
    expect(loadSpy).toHaveBeenCalledWith(undefined, true);
    vi.useRealTimers();
    fb.remove();
  });

  it('disconnectedCallback cancels pending workspace debounce', async () => {
    vi.useFakeTimers();
    const fb = await mountFileBrowser();
    const loadSpy = vi.spyOn(fb, 'loadWorkspace');
    loadSpy.mockClear();
    const dir = new TestDir('d', undefined, []);
    fb.onWorkspaceChanged(dir);
    fb.disconnectedCallback();
    await vi.advanceTimersByTimeAsync(250);
    expect(loadSpy).not.toHaveBeenCalledWith(dir, true);
    vi.useRealTimers();
    fb.remove();
  });

  it('createTreeItems renders file name into Lit output', async () => {
    const fb = await mountFileBrowser();
    const parent = new TestDir('p', undefined, []);
    const file = new TestFile('shown.ts', parent);
    const treeNode = await fb.resourceToTreeNode(file, false);
    const host = document.createElement('div');
    render(fb.createTreeItems(treeNode), host);
    expect(host.textContent).toContain('shown.ts');
    fb.remove();
  });

  it('createTreeItems returns empty template for null node', async () => {
    const fb = await mountFileBrowser();
    const host = document.createElement('div');
    render(fb.createTreeItems(null as unknown as TreeNode), host);
    expect(host.textContent?.trim() ?? '').toBe('');
    fb.remove();
  });

  it('createTreeItems shows loadError and placeholder copy', async () => {
    const fb = await mountFileBrowser();
    const errNode: TreeNode = {
      data: new TestFile('x', new TestDir('p', undefined, [])),
      label: 'x',
      leaf: true,
      children: [],
      loadError: 'boom',
    };
    const phNode: TreeNode = {
      data: new UnavailableWorkspaceFolderDirectory({
        backendType: 't',
        name: 'n',
        data: {},
        reason: 'gone',
      }),
      label: 'n',
      leaf: false,
      children: [],
      placeholderNotice: 'gone',
    };
    const a = document.createElement('div');
    const b = document.createElement('div');
    render(fb.createTreeItems(errNode), a);
    render(fb.createTreeItems(phNode), b);
    expect(a.textContent).toContain('failed:boom');
    expect(b.textContent).toContain('unavailable:gone');
    fb.remove();
  });

  it('createTreeItems marks unloaded directories as lazy', async () => {
    const fb = await mountFileBrowser();
    const dir = new TestDir('lazy', undefined, []);
    const node = await fb.resourceToTreeNode(dir, false);
    expect(node.loaded).toBeFalsy();
    const host = document.createElement('div');
    render(fb.createTreeItems(node), host);
    const item = host.querySelector('wa-tree-item');
    expect(item?.hasAttribute('lazy')).toBe(true);
    fb.remove();
  });

  it('onFileDoubleClicked opens editor for files', async () => {
    const fb = await mountFileBrowser();
    const parent = new TestDir('p', undefined, []);
    const file = new TestFile('a.ts', parent);
    const node: TreeNode = { data: file, label: 'a.ts', leaf: true, children: [] };
    await fb.onFileDoubleClicked({ currentTarget: { model: node } } as unknown as Event);
    expect(executeSpy).toHaveBeenCalled();
    expect(activeSetSpy).toHaveBeenCalledWith(file);
    fb.remove();
  });

  it('onFileDoubleClicked toggles expanded for directories', async () => {
    const fb = await mountFileBrowser();
    const dir = new TestDir('d', undefined, []);
    const node: TreeNode = { data: dir, label: 'd', leaf: false, children: [], loaded: true };
    const item = { model: node, expanded: false };
    await fb.onFileDoubleClicked({ currentTarget: item } as unknown as Event);
    expect(item.expanded).toBe(true);
    await fb.onFileDoubleClicked({ currentTarget: item } as unknown as Event);
    expect(item.expanded).toBe(false);
    fb.remove();
  });

  it('onSelectionChanged updates selection and persisted path', async () => {
    const fb = await mountFileBrowser();
    const setDialogSpy = vi.spyOn(fb as unknown as { setDialogSetting: (v: unknown) => Promise<void> }, 'setDialogSetting').mockResolvedValue(undefined);
    const parent = new TestDir('p', undefined, []);
    const file = new TestFile('f.ts', parent, 'root/f.ts');
    await fb.onSelectionChanged({
      detail: {
        selection: [{ model: { data: file } }],
      },
    } as unknown as Event);
    expect(activeSetSpy).toHaveBeenCalledWith(file);
    expect(setDialogSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        v: 1,
        selectedPath: 'root/f.ts',
      })
    );
    fb.remove();
  });

  it('onSelectionChanged clears selection when empty', async () => {
    const fb = await mountFileBrowser();
    const setDialogSpy = vi.spyOn(fb as unknown as { setDialogSetting: (v: unknown) => Promise<void> }, 'setDialogSetting').mockResolvedValue(undefined);
    await fb.onSelectionChanged({ detail: { selection: [] } } as unknown as Event);
    expect(activeSetSpy).toHaveBeenCalledWith(undefined);
    expect(setDialogSpy).toHaveBeenCalledWith(expect.objectContaining({ selectedPath: null }));
    fb.remove();
  });

  it('renderContextMenu shows Open with from current file selection', async () => {
    const fb = await mountFileBrowser();
    getEditorOptionsMock.mockReturnValue([{ editorId: 'e1', title: 'Editor 1', icon: 'file' }]);
    const file = new TestFile('hello.ipynb', undefined, 'root/hello.ipynb');
    activeSelectionSignal.set(file);

    const menu = (fb as unknown as { renderContextMenu: () => import('lit').TemplateResult }).renderContextMenu();
    const container = document.createElement('div');
    render(menu, container);

    expect(container.textContent).toContain('Open with');
    expect(container.textContent).toContain('Editor 1');
    fb.remove();
  });

  it('syncContextMenuTarget sets selection from tree item under cursor', async () => {
    const fb = await mountFileBrowser();
    const file = new TestFile('a.ipynb', undefined, 'a.ipynb');
    const treeItem = document.createElement('wa-tree-item');
    (treeItem as unknown as { model: TreeNode }).model = {
      data: file,
      label: 'a.ipynb',
      leaf: true,
      children: [],
    };
    const inner = document.createElement('span');
    treeItem.appendChild(inner);

    getEditorOptionsMock.mockReturnValue([{ editorId: 'e1', title: 'E1' }]);
    activeSetSpy.mockClear();

    const event = new MouseEvent('contextmenu', { bubbles: true });
    Object.defineProperty(event, 'target', { value: inner, configurable: true });
    (fb as unknown as { syncContextMenuTarget: (e: MouseEvent) => void }).syncContextMenuTarget(event);

    expect(activeSetSpy).toHaveBeenCalledWith(file);
    fb.remove();
  });

  it('onDragStart writes workspace payload to dataTransfer', async () => {
    const fb = await mountFileBrowser();
    const parent = new TestDir('p', undefined, []);
    const file = new TestFile('a.txt', parent, 'ws/a.txt');
    const dt = createMockDataTransfer();
    const ev = { dataTransfer: dt } as DragEvent;
    (fb as unknown as { onDragStart: (e: DragEvent, r: Resource) => void }).onDragStart(ev, file);
    expect(dt.getData('application/x-workspace-file')).toContain('ws/a.txt');
    fb.remove();
  });

  it('onDragStart skips roots without parent', async () => {
    const fb = await mountFileBrowser();
    const root = new TestFile('root.txt', undefined, 'only');
    const dt = createMockDataTransfer();
    const ev = { dataTransfer: dt } as DragEvent;
    (fb as unknown as { onDragStart: (e: DragEvent, r: Resource) => void }).onDragStart(ev, root);
    expect(dt.getData('application/x-workspace-file')).toBe('');
    fb.remove();
  });

  it('buildTargetPath joins directory path and file name', async () => {
    const fb = await mountFileBrowser();
    const dir = new TestDir('sub', undefined, []);
    vi.spyOn(dir, 'getWorkspacePath').mockReturnValue('A/sub');
    const path = (fb as unknown as { buildTargetPath: (d: Directory, n: string) => string }).buildTargetPath(
      dir,
      'blob.bin'
    );
    expect(path).toBe('A/sub/blob.bin');
    fb.remove();
  });

  it('loadNodeChildren populates lazy directory nodes', async () => {
    const fb = await mountFileBrowser();
    class LazyDir extends TestDir {
      async listChildren(): Promise<Resource[]> {
        return [new TestFile('lazy-child.txt', this)];
      }
    }
    const lazyDir = new LazyDir('lazy', undefined, []);

    const node: TreeNode = {
      data: lazyDir,
      label: 'lazy',
      leaf: false,
      children: [],
    };
    await (fb as unknown as { loadNodeChildren: (n: TreeNode, d: Directory) => Promise<void> }).loadNodeChildren(
      node,
      lazyDir
    );
    expect(node.children.length).toBe(1);
    expect(node.children[0].label).toBe('lazy-child.txt');
    fb.remove();
  });

  it('uses getWorkspace during initialization', async () => {
    await mountFileBrowser();
    expect(getWorkspaceSpy).toHaveBeenCalled();
  });

  it('onWorkspaceConnected reloads the tree', async () => {
    const fb = await mountFileBrowser();
    const loadSpy = vi.spyOn(fb, 'loadWorkspace');
    loadSpy.mockClear();
    const dir = new TestDir('conn', undefined, []);
    await fb.onWorkspaceConnected(dir);
    expect(loadSpy).toHaveBeenCalledWith(dir, true);
    fb.remove();
  });

  it('render shows no-content when no workspace is connected', async () => {
    const fb = await mountFileBrowser();
    const shadow = fb.shadowRoot;
    expect(shadow?.innerHTML.includes('docks-no-content')).toBe(true);
    fb.remove();
  });

  it('handleWorkspaceDrop returns early when payload is empty', async () => {
    const fb = await mountFileBrowser();
    const copySpy = vi.spyOn(workspaceService, 'copyResource');
    const target = new TestDir('t', undefined, []);
    await (
      fb as unknown as {
        handleWorkspaceDrop: (e: DragEvent, d: Directory) => Promise<void>;
      }
    ).handleWorkspaceDrop(
      { dataTransfer: { getData: () => '' } } as unknown as DragEvent,
      target
    );
    expect(copySpy).not.toHaveBeenCalled();
    fb.remove();
  });

  it('handleWorkspaceDrop copies within workspace when paths resolve', async () => {
    const fb = await mountFileBrowser();
    const wsRoot = new TestDir('ws', undefined, []);
    const srcFile = new TestFile('a.txt', wsRoot, 'ws/a.txt');
    const targetDir = new TestDir('dest', wsRoot, []);
    const fakeWs = {
      getResource: vi.fn(async (path: string) => (path === 'ws/a.txt' ? srcFile : null)),
    };
    getWorkspaceSpy.mockResolvedValue(fakeWs as never);
    (fb as unknown as { workspaceDir?: Directory }).workspaceDir = wsRoot;
    const copySpy = vi.spyOn(workspaceService, 'copyResource').mockResolvedValue(undefined);
    const loadSpy = vi.spyOn(fb, 'loadWorkspace').mockResolvedValue(undefined);
    await (
      fb as unknown as {
        handleWorkspaceDrop: (e: DragEvent, d: Directory) => Promise<void>;
      }
    ).handleWorkspaceDrop(
      {
        dataTransfer: {
          getData: (t: string) => (t === 'application/x-workspace-file' ? 'ws/a.txt' : ''),
          types: ['application/x-workspace-file'],
        },
        ctrlKey: false,
        metaKey: false,
      } as unknown as DragEvent,
      targetDir
    );
    expect(copySpy).toHaveBeenCalledWith(srcFile, targetDir, { move: true });
    expect(loadSpy).toHaveBeenCalled();
    fb.remove();
  });

  it('handleFilesDrop returns early when file list is empty', async () => {
    const fb = await mountFileBrowser();
    const target = new TestDir('t', undefined, []);
    (fb as unknown as { workspaceDir?: Directory }).workspaceDir = target;
    await (
      fb as unknown as {
        handleFilesDrop: (files: globalThis.File[], d: Directory) => Promise<void>;
      }
    ).handleFilesDrop([], target);
    expect(confirmDialogMock).not.toHaveBeenCalled();
    fb.remove();
  });

  it('getDirectoryDropTargetFromEvent uses sole root when drop is outside items', async () => {
    const fb = await mountFileBrowser();
    const onlyRoot = new TestDir('OnlyRoot', undefined, []);
    (fb as unknown as { workspaceDir?: Directory; root?: TreeNode }).workspaceDir = onlyRoot;
    (fb as unknown as { root?: TreeNode }).root = {
      data: onlyRoot,
      label: 'OnlyRoot',
      leaf: false,
      children: [
        {
          data: onlyRoot,
          label: 'OnlyRoot',
          leaf: false,
          children: [],
          loaded: true,
        },
      ],
    };
    const ev = { target: document.createElement('div') } as unknown as DragEvent;
    const dir = (fb as unknown as { getDirectoryDropTargetFromEvent: (e: DragEvent) => Directory | undefined }).getDirectoryDropTargetFromEvent(ev);
    expect(dir).toBe(onlyRoot);
    fb.remove();
  });
});
