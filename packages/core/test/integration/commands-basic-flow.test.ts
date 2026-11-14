import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createCommandHarness } from '../helpers/command-harness';

const harness = createCommandHarness();
const folderPrefix = () => `basic-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

vi.mock('../../src/core/commandregistry', () => ({
  COMMAND_TAG_SHELL: 'shell',
  registerAll: harness.registerAllMock,
}));

vi.mock('../../src/core/toast', () => ({
  toastError: harness.toastErrorMock,
  toastInfo: vi.fn(),
}));

describe('commands integration basics', () => {
  async function setupWorkspace(name: string) {
    const { workspaceService } = await import('../../src/core/filesys');
    await workspaceService.disconnectWorkspace();
    await workspaceService.connectFolder({ indexeddb: true, name });
    return workspaceService;
  }

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('cat reads full file contents', async () => {
    const folder = folderPrefix();
    const workspaceService = await setupWorkspace(folder);
    const workspace = await workspaceService.getWorkspace();
    const file = await workspace?.getResource(`${folder}/a.txt`, { create: true });
    await (file as any).saveContents('hello\nworld');
    await import('../../src/commands/cat');
    const cat = harness.getRegistered('cat');
    const result = await cat.handler?.execute({ params: { path: `${folder}/a.txt` } });
    expect(result).toBe('hello\nworld');
  });

  it('head returns first N lines and validates invalid lines parameter', async () => {
    const folder = folderPrefix();
    const workspaceService = await setupWorkspace(folder);
    const workspace = await workspaceService.getWorkspace();
    const file = await workspace?.getResource(`${folder}/a.txt`, { create: true });
    await (file as any).saveContents('1\n2\n3\n4');
    await import('../../src/commands/head');
    const head = harness.getRegistered('head');

    expect(await head.handler?.execute({ params: { path: `${folder}/a.txt`, lines: '2' } })).toBe('1\n2');
    expect(await head.handler?.execute({ params: { path: `${folder}/a.txt`, lines: '0' } })).toBeUndefined();
    expect(harness.toastErrorMock).toHaveBeenCalled();
  });

  it('tail returns last N lines', async () => {
    const folder = folderPrefix();
    const workspaceService = await setupWorkspace(folder);
    const workspace = await workspaceService.getWorkspace();
    const file = await workspace?.getResource(`${folder}/a.txt`, { create: true });
    await (file as any).saveContents('1\n2\n3\n4');
    await import('../../src/commands/tail');
    const tail = harness.getRegistered('tail');
    const result = await tail.handler?.execute({ params: { path: `${folder}/a.txt`, lines: '2' } });
    expect(result).toBe('3\n4');
  });

  it('wc returns line, word, and character counts', async () => {
    const folder = folderPrefix();
    const workspaceService = await setupWorkspace(folder);
    const workspace = await workspaceService.getWorkspace();
    const file = await workspace?.getResource(`${folder}/a.txt`, { create: true });
    await (file as any).saveContents('hello world\nsecond line');
    await import('../../src/commands/wc');
    const wc = harness.getRegistered('wc');
    const result = await wc.handler?.execute({ params: { path: `${folder}/a.txt` } });
    expect(result).toEqual({ lines: 2, words: 4, characters: 23 });
  });

  it('exists checks file presence and handles missing workspace/path', async () => {
    const { workspaceService } = await import('../../src/core/filesys');
    await workspaceService.disconnectWorkspace();
    await import('../../src/commands/exists');
    const exists = harness.getRegistered('exists');

    expect(await exists.handler?.execute({ params: { path: 'x.txt' } })).toBe(false);

    const folder = folderPrefix();
    await setupWorkspace(folder);
    const workspace = await workspaceService.getWorkspace();
    await (await workspace?.getResource(`${folder}/x.txt`, { create: true }) as any).saveContents('x');

    expect(await exists.handler?.execute({ params: { path: `${folder}/x.txt` } })).toBe(true);
    expect(await exists.handler?.execute({ params: {} })).toBe(false);
  });
});
