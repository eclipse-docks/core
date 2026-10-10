import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FileContentType } from '../../src/core/filesys/common';
import {
  IDBRootDirectory,
  deleteIndexedDbWorkspaceData,
} from '../../src/core/filesys/indexeddb';

describe('filesys/indexeddb', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates and reads nested file contents', async () => {
    const root = new IDBRootDirectory('Root', 'root-a');
    const created = await root.getResource('docs/readme.txt', { create: true });
    expect(created).toBeTruthy();
    await (created as any).saveContents('hello indexeddb');

    const file = await root.getResource('docs/readme.txt');
    const content = await (file as any).getContents({ contentType: FileContentType.TEXT });

    expect(content).toBe('hello indexeddb');
  });

  it('keeps a nested drop path as directories instead of flattening files', async () => {
    const root = new IDBRootDirectory('Root', 'root-nested');
    await root.getResource('proj/sub/a.txt', { create: true });
    await root.getResource('proj/b.txt', { create: true });

    const top = await root.listChildren(true);
    expect(top.map((child) => child.getName())).toEqual(['proj']);
    expect(top[0]).toBeInstanceOf((await import('../../src/core/filesys/common')).Directory);

    const proj = top[0] as import('../../src/core/filesys/indexeddb').IDBDirectoryResource;
    const projChildren = await proj.listChildren(true);
    expect(projChildren.map((child) => child.getName()).sort()).toEqual(['b.txt', 'sub']);

    const sub = projChildren.find((child) => child.getName() === 'sub');
    const subChildren = await (sub as import('../../src/core/filesys/indexeddb').IDBDirectoryResource).listChildren(true);
    expect(subChildren.map((child) => child.getName())).toEqual(['a.txt']);
  });

  it('migrates legacy string content to blob on read', async () => {
    const db = await new Promise<IDBDatabase>((resolve, reject) => {
      const req = indexedDB.open('eclipse-docks-workspace-idb', 1);
      req.onupgradeneeded = () => {
        req.result.createObjectStore('files');
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction('files', 'readwrite');
      const store = tx.objectStore('files');
      const req = store.put({ type: 'file', content: 'legacy-text', mimeType: 'text/plain' }, 'root-b/legacy.txt');
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });

    const root = new IDBRootDirectory('Root', 'root-b');
    const file = await root.getResource('legacy.txt');
    expect(await (file as any).getContents()).toBe('legacy-text');

    const migrated = await new Promise<any>((resolve, reject) => {
      const tx = db.transaction('files', 'readonly');
      const store = tx.objectStore('files');
      const req = store.get('root-b/legacy.txt');
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    expect(migrated.content).toBeInstanceOf(Blob);
  });

  it('deletes all root data through helper', async () => {
    const root = new IDBRootDirectory('Root', 'root-c');
    const file = await root.getResource('a.txt', { create: true });
    await (file as any).saveContents('x');
    expect(await deleteIndexedDbWorkspaceData(root)).toBe(true);

    const again = await root.getResource('a.txt');
    expect(again).toBeNull();
  });

  it('returns false when delete helper receives non-indexeddb root', async () => {
    const root = new IDBRootDirectory('Root', 'root-d');
    const nestedDir = await root.getResource('nested/', { create: true });
    expect(await deleteIndexedDbWorkspaceData(nestedDir as any)).toBe(false);
  });

  it('supports binary/blob/uri read options and stream save path', async () => {
    const root = new IDBRootDirectory('Root', 'root-e');
    const file = await root.getResource('assets/data.bin', { create: true });
    const blob = new Blob(['abc'], { type: 'application/octet-stream' });
    await (file as any).saveContents(blob);
    const asBlob = await (file as any).getContents({ contentType: FileContentType.BINARY, blob: true });
    expect(asBlob).toBeInstanceOf(Blob);
    expect(asBlob.type).toBe('application/octet-stream');

    const objectUrlSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob://test');
    const asUri = await (file as any).getContents({ contentType: FileContentType.BINARY, uri: true });
    expect(asUri).toBe('blob://test');
    objectUrlSpy.mockRestore();

    const streamFile = await root.getResource('assets/stream.txt', { create: true });
    const stream = new Blob(['stream content'], { type: 'text/plain' }).stream();
    await (streamFile as any).saveContents(stream);
    expect(await (streamFile as any).getContents()).toBe('stream content');
  });

  it('handles directory intent and conflicting path types', async () => {
    const root = new IDBRootDirectory('Root', 'root-f');
    const createdDir = await root.getResource('docs/', { create: true });
    expect(createdDir).toBeTruthy();
    const fileUnderDir = await root.getResource('docs/a.txt', { create: true });
    expect(fileUnderDir).toBeTruthy();

    const conflictAsDir = await root.getResource('docs/a.txt/');
    expect(conflictAsDir).toBeNull();

    const fileAtRoot = await root.getResource('plain.txt', { create: true });
    expect(fileAtRoot).toBeTruthy();
    const conflictAsNested = await root.getResource('plain.txt/nested.txt');
    expect(conflictAsNested).toBeNull();
  });

  it('covers rename and no-op delete branches', async () => {
    const root = new IDBRootDirectory('Root', 'root-g');
    const file = await root.getResource('rename-me.txt', { create: true });
    await (file as any).saveContents('rename payload');
    await (file as any).rename('renamed.txt');
    const renamed = await root.getResource('renamed.txt');
    expect(await (renamed as any).getContents()).toBe('rename payload');

    const dir = await root.getResource('folder/', { create: true });
    await (dir as any).delete(undefined, true);
    const stillThere = await root.getResource('folder/');
    expect(stillThere).toBeNull();
  });
});
