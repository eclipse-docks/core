import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../src/core/events', () => ({
  publish: vi.fn(),
  subscribe: vi.fn(),
  unsubscribe: vi.fn(),
}));

vi.mock('../../src/core/persistenceservice', () => ({
  persistenceService: {
    getObject: vi.fn(async () => null),
    persistObject: vi.fn(async () => undefined),
  },
}));

describe('MemoryRootDirectory', () => {
  let File: typeof import('../../src/core/filesys/common').File;
  let Directory: typeof import('../../src/core/filesys/common').Directory;
  let getInMemoryRoot: typeof import('../../src/core/filesys/memory').getInMemoryRoot;
  let resetInMemoryRootForTests: typeof import('../../src/core/filesys/memory').resetInMemoryRootForTests;
  let setInMemoryMountProjection: typeof import('../../src/core/filesys/memory').setInMemoryMountProjection;
  let MemoryMountDirectory: typeof import('../../src/core/filesys/memory').MemoryMountDirectory;
  let root: InstanceType<typeof import('../../src/core/filesys/memory').MemoryRootDirectory>;

  beforeEach(async () => {
    vi.resetModules();
    ({ File, Directory } = await import('../../src/core/filesys/common'));
    ({
      getInMemoryRoot,
      resetInMemoryRootForTests,
      setInMemoryMountProjection,
      MemoryMountDirectory,
    } = await import('../../src/core/filesys/memory'));
    resetInMemoryRootForTests();
    root = getInMemoryRoot();
  });

  it('exposes a single shared root', async () => {
    expect(getInMemoryRoot()).toBe(root);
    expect(root.getName()).toBe('in-memory');
  });

  it('creates files with stable workspace paths', async () => {
    const file = await root.getResource('folder/shot.png', { create: true });
    expect(file).toBeInstanceOf(File);
    await (file as InstanceType<typeof File>).saveContents('data:image/png;base64,abc');
    expect(file!.getWorkspacePath()).toBe('in-memory/folder/shot.png');
  });

  it('live files resolve contents via caller callbacks', async () => {
    const backing = { value: 'v1' };
    root.writeLiveFile('folder/live.txt', {
      mimeType: 'text/plain',
      getContents: () => backing.value,
      size: () => backing.value.length,
    });
    const file = await root.getResource('folder/live.txt');
    expect(await (file as InstanceType<typeof File>).getContents()).toBe('v1');
    backing.value = 'v2';
    expect(await (file as InstanceType<typeof File>).getContents()).toBe('v2');
    await expect((file as InstanceType<typeof File>).saveContents('nope')).rejects.toThrow(/read-only/i);
  });

  it('mount projection is caller-supplied (no domain knowledge in core)', async () => {
    await (
      (await root.getResource('a/one.txt', { create: true })) as InstanceType<typeof File>
    ).saveContents('one');
    await (
      (await root.getResource('b/two.txt', { create: true })) as InstanceType<typeof File>
    ).saveContents('two');

    setInMemoryMountProjection({
      async listChildren(r) {
        return [r.ensureDirectoryEntry('b')];
      },
      async getResource(r, path, options) {
        if (!path.startsWith('b')) return null;
        return r.getResource(path, options);
      },
    });

    const mount = new MemoryMountDirectory();
    const kids = await mount.listChildren(true);
    expect(kids.map((c) => c.getName())).toEqual(['b']);
    expect(await mount.getResource('a/one.txt')).toBeNull();
    const file = await mount.getResource('b/two.txt');
    expect(file).toBeInstanceOf(File);
    expect(await (file as InstanceType<typeof File>).getContents()).toBe('two');
  });
});
