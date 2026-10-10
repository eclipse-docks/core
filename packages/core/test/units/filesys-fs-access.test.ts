import { describe, expect, it, vi } from 'vitest';
import { FileContentEncoding, FileContentType, workspaceService } from '../../src/core/filesys/common';
import { FileSysDirHandleResource, FileSysFileHandleResource } from '../../src/core/filesys/fs-access';

type FakeFileHandle = {
  kind: 'file';
  name: string;
  getFile: () => Promise<Blob>;
  createWritable: () => Promise<any>;
  move?: (newName: string) => Promise<void>;
};

type FakeDirHandle = {
  kind: 'directory';
  name: string;
  values: () => AsyncGenerator<any>;
  getDirectoryHandle: (name: string, opts?: any) => Promise<FakeDirHandle>;
  getFileHandle: (name: string, opts?: any) => Promise<FakeFileHandle>;
  removeEntry: (name: string, opts?: any) => Promise<void>;
  move?: (newName: string) => Promise<void>;
};

function createDirHandle(name: string): FakeDirHandle {
  const children = new Map<string, any>();
  return {
    kind: 'directory',
    name,
    values: async function* () {
      for (const value of children.values()) {
        yield value;
      }
    },
    async getDirectoryHandle(childName: string, opts?: any) {
      if (children.has(childName)) return children.get(childName);
      if (!opts?.create) throw Object.assign(new Error('missing'), { name: 'NotFoundError' });
      const dir = createDirHandle(childName);
      children.set(childName, dir);
      return dir;
    },
    async getFileHandle(childName: string, opts?: any) {
      if (children.has(childName)) return children.get(childName);
      if (!opts?.create) throw Object.assign(new Error('missing'), { name: 'NotFoundError' });
      const handle: FakeFileHandle = {
        kind: 'file',
        name: childName,
        async getFile() {
          return new Blob(['text'], { type: 'text/plain' });
        },
        async createWritable() {
          return {
            getWriter: () => ({
              write: async () => undefined,
              close: async () => undefined,
            }),
          };
        },
      };
      children.set(childName, handle);
      return handle;
    },
    async removeEntry(childName: string) {
      children.delete(childName);
    },
  };
}

describe('filesys/fs-access', () => {
  it('reads file content with text/blob/uri/stream modes', async () => {
    const fileHandle: FakeFileHandle = {
      kind: 'file',
      name: 'a.txt',
      async getFile() {
        return new Blob(['hello'], { type: 'text/plain' });
      },
      async createWritable() {
        return {
          getWriter: () => ({
            write: async () => undefined,
            close: async () => undefined,
          }),
        };
      },
    };
    const file = new FileSysFileHandleResource(fileHandle as any, new FileSysDirHandleResource(createDirHandle('root') as any));
    expect(await file.getContents()).toBe('hello');
    expect(await file.getContents({ contentType: FileContentType.BINARY, blob: true })).toBeInstanceOf(Blob);
    const objectUrlSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob://uri');
    expect(await file.getContents({ contentType: FileContentType.BINARY, encoding: FileContentEncoding.BASE64 })).toBe('blob://uri');
    expect(await file.getContents({ contentType: FileContentType.BINARY, uri: true })).toBe('blob://uri');
    objectUrlSpy.mockRestore();
    const stream = await file.getContents({ contentType: FileContentType.BINARY });
    expect(stream).toBeDefined();
  });

  it('saves file contents via writer and via stream pipe', async () => {
    const writeMock = vi.fn(async () => undefined);
    const closeMock = vi.fn(async () => undefined);
    const pipeToMock = vi.fn(async () => undefined);
    const writable = { getWriter: () => ({ write: writeMock, close: closeMock }) };
    const fileHandle: FakeFileHandle = {
      kind: 'file',
      name: 'b.txt',
      async getFile() {
        return new Blob(['old'], { type: 'text/plain' });
      },
      async createWritable() {
        return writable;
      },
    };
    const file = new FileSysFileHandleResource(fileHandle as any, new FileSysDirHandleResource(createDirHandle('root') as any));
    await file.saveContents('new-content');
    expect(writeMock).toHaveBeenCalledWith('new-content');
    expect(closeMock).toHaveBeenCalled();
    await file.saveContents({ pipeTo: pipeToMock });
    expect(pipeToMock).toHaveBeenCalledWith(writable);
  });

  it('covers file rename unsupported and activation-expired branches', async () => {
    const parent = new FileSysDirHandleResource(createDirHandle('root') as any);
    const noMove: FakeFileHandle = {
      kind: 'file',
      name: 'c.txt',
      async getFile() {
        return new Blob(['x']);
      },
      async createWritable() {
        return { getWriter: () => ({ write: async () => undefined, close: async () => undefined }) };
      },
    };
    await expect(new FileSysFileHandleResource(noMove as any, parent).rename('d.txt')).rejects.toThrow('File rename not supported');

    const moveError: FakeFileHandle = {
      ...noMove,
      move: async () => {
        throw Object.assign(new Error('user agent rejected'), { name: 'NotAllowedError' });
      },
    };
    await expect(new FileSysFileHandleResource(moveError as any, parent).rename('d.txt')).rejects.toThrow('user activation expired');
  });

  it('creates nested resources and handles missing path cases', async () => {
    const dir = new FileSysDirHandleResource(createDirHandle('root') as any);
    expect(await dir.getResource('missing.txt')).toBeNull();
    const created = await dir.getResource('nested/a.txt', { create: true });
    expect(created).toBeTruthy();
    const children = await dir.listChildren(true);
    expect(children.map((child) => child.getName())).toEqual(['nested']);
    expect(children[0]).toBeInstanceOf(FileSysDirHandleResource);
    const nestedChildren = await (children[0] as FileSysDirHandleResource).listChildren(true);
    expect(nestedChildren.map((child) => child.getName())).toEqual(['a.txt']);
    await expect(dir.getResource('')).rejects.toThrow('No path provided');
  });

  it('covers filesystem contribution canHandle/restore/persist', async () => {
    const contribution = workspaceService.getContributions().find((c) => c.type === 'filesystem');
    expect(contribution?.canHandle({ kind: 'directory' })).toBe(true);
    expect(contribution?.canHandle({ kind: 'file' })).toBe(false);
    expect(await contribution?.restore?.({ kind: 'directory', name: 'r', values: async function* () {} })).toBeTruthy();
    expect(await contribution?.restore?.({ nope: true })).toBeUndefined();
    const dir = new FileSysDirHandleResource(createDirHandle('persist-root') as any);
    expect(await contribution?.persist?.(dir)).toBeTruthy();
    expect(await contribution?.persist?.({} as any)).toBeNull();
  });
});
