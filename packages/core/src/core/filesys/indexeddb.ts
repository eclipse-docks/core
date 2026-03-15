import {
    File,
    Directory,
    FileContentType,
    type FileContentsOptions,
    type GetResourceOptions,
    type Resource,
    TOPIC_WORKSPACE_CHANGED,
    workspaceService,
} from "./common";
import { publish } from "../events";

type IDBEntryType = 'file' | 'dir';

interface IDBEntry {
    type: IDBEntryType;
    content?: Blob;
    mimeType?: string;
}

const IDB_WORKSPACE_DB_NAME = 'eclipse-lyra-workspace-idb';
const IDB_WORKSPACE_STORE_NAME = 'files';

let idbWorkspacePromise: Promise<IDBDatabase> | null = null;

async function getWorkspaceIDB(): Promise<IDBDatabase> {
    if (typeof indexedDB === 'undefined') {
        throw new Error('IndexedDB is not available in this environment');
    }
    if (!idbWorkspacePromise) {
        idbWorkspacePromise = new Promise((resolve, reject) => {
            const request = indexedDB.open(IDB_WORKSPACE_DB_NAME, 1);
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
            request.onupgradeneeded = (e) => {
                const db = (e.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(IDB_WORKSPACE_STORE_NAME)) {
                    db.createObjectStore(IDB_WORKSPACE_STORE_NAME);
                }
            };
        });
    }
    return idbWorkspacePromise;
}

async function getNextIndexedDBName(): Promise<string> {
    const baseName = 'IndexedDB';
    const folders = await workspaceService.getFolders();
    const existingNames = new Set(
        folders
            .filter(f => f.type === 'indexeddb')
            .map(f => f.name)
    );

    if (!existingNames.has(baseName)) {
        return baseName;
    }

    let index = 1;
    // Find the smallest n such that "IndexedDB (n)" is unused
    // to keep names stable and predictable.
    // This is O(k) in number of existing IndexedDB roots, which is small.
    // We avoid gaps intentionally (e.g. after deleting "(1)") to keep UX simple.
    while (existingNames.has(`${baseName} (${index})`)) {
        index += 1;
    }
    return `${baseName} (${index})`;
}

function normalizePath(path: string): string {
    if (!path) return '';
    return path.split('/').filter(Boolean).join('/');
}

function joinPath(base: string, name: string): string {
    const cleanBase = normalizePath(base);
    const cleanName = normalizePath(name);
    if (!cleanBase) return cleanName;
    if (!cleanName) return cleanBase;
    return `${cleanBase}/${cleanName}`;
}

function storageKey(rootId: string, path: string): string {
    const norm = normalizePath(path);
    return norm ? `${rootId}/${norm}` : rootId;
}

function storagePrefix(rootId: string, path: string): string {
    const norm = normalizePath(path);
    return norm ? `${rootId}/${norm}/` : `${rootId}/`;
}

async function idbGet(rootId: string, path: string): Promise<IDBEntry | undefined> {
    const db = await getWorkspaceIDB();
    const tx = db.transaction(IDB_WORKSPACE_STORE_NAME, 'readonly');
    const store = tx.objectStore(IDB_WORKSPACE_STORE_NAME);
    const key = path ? storageKey(rootId, path) : rootId;
    return await new Promise((resolve, reject) => {
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result as IDBEntry | undefined);
        req.onerror = () => reject(req.error);
    });
}

async function idbPut(rootId: string, path: string, entry: IDBEntry): Promise<void> {
    const db = await getWorkspaceIDB();
    const tx = db.transaction(IDB_WORKSPACE_STORE_NAME, 'readwrite');
    const store = tx.objectStore(IDB_WORKSPACE_STORE_NAME);
    const key = path ? storageKey(rootId, path) : rootId;
    await new Promise<void>((resolve, reject) => {
        const req = store.put(entry, key);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
    });
}

async function idbDelete(rootId: string, path: string): Promise<void> {
    const db = await getWorkspaceIDB();
    const tx = db.transaction(IDB_WORKSPACE_STORE_NAME, 'readwrite');
    const store = tx.objectStore(IDB_WORKSPACE_STORE_NAME);
    const key = path ? storageKey(rootId, path) : rootId;
    await new Promise<void>((resolve, reject) => {
        const req = store.delete(key);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
    });
}

async function idbDeleteTree(rootId: string, rootPath: string): Promise<void> {
    const db = await getWorkspaceIDB();
    const tx = db.transaction(IDB_WORKSPACE_STORE_NAME, 'readwrite');
    const store = tx.objectStore(IDB_WORKSPACE_STORE_NAME);
    const prefix = storageKey(rootId, rootPath);
    const prefixWithSlash = prefix + '/';
    const cursorReq = store.openCursor();

    await new Promise<void>((resolve, reject) => {
        cursorReq.onerror = () => reject(cursorReq.error);
        cursorReq.onsuccess = (ev) => {
            const cursor = (ev.target as IDBRequest<IDBCursorWithValue | null>).result;
            if (!cursor) {
                resolve();
                return;
            }
            const key = String(cursor.key);
            if (key === prefix || key.startsWith(prefixWithSlash)) {
                cursor.delete();
            }
            cursor.continue();
        };
    });
}

async function idbRenameTree(rootId: string, oldPath: string, newPath: string): Promise<void> {
    const db = await getWorkspaceIDB();
    const tx = db.transaction(IDB_WORKSPACE_STORE_NAME, 'readwrite');
    const store = tx.objectStore(IDB_WORKSPACE_STORE_NAME);
    const oldPrefix = storageKey(rootId, oldPath);
    const newPrefix = storageKey(rootId, newPath);
    const cursorReq = store.openCursor();

    const operations: Array<() => void> = [];

    await new Promise<void>((resolve, reject) => {
        cursorReq.onerror = () => reject(cursorReq.error);
        cursorReq.onsuccess = (ev) => {
            const cursor = (ev.target as IDBRequest<IDBCursorWithValue | null>).result;
            if (!cursor) {
                resolve();
                return;
            }
            const key = String(cursor.key);
            if (key === oldPrefix || key.startsWith(oldPrefix + '/')) {
                const suffix = key.slice(oldPrefix.length);
                const newKey = newPrefix + suffix;
                const value = cursor.value as IDBEntry;
                operations.push(() => {
                    cursor.delete();
                    store.put(value, newKey);
                });
            }
            cursor.continue();
        };
    });

    for (const op of operations) {
        op();
    }
}

async function idbListChildrenOfDir(rootId: string, dirPath: string): Promise<Array<{ name: string; entry: IDBEntry; type: IDBEntryType }>> {
    const db = await getWorkspaceIDB();
    const tx = db.transaction(IDB_WORKSPACE_STORE_NAME, 'readonly');
    const store = tx.objectStore(IDB_WORKSPACE_STORE_NAME);
    const prefix = storagePrefix(rootId, dirPath);
    const cursorReq = store.openCursor();

    const dirNames = new Set<string>();
    const fileEntries = new Map<string, IDBEntry>();

    await new Promise<void>((resolve, reject) => {
        cursorReq.onerror = () => reject(cursorReq.error);
        cursorReq.onsuccess = (ev) => {
            const cursor = (ev.target as IDBRequest<IDBCursorWithValue | null>).result;
            if (!cursor) {
                resolve();
                return;
            }
            const key = String(cursor.key);
            const entry = cursor.value as IDBEntry;

            if (!key.startsWith(prefix)) {
                cursor.continue();
                return;
            }

            const rest = key.slice(prefix.length);
            if (!rest) {
                cursor.continue();
                return;
            }

            const idx = rest.indexOf('/');
            const childName = idx === -1 ? rest : rest.slice(0, idx);

            if (idx === -1) {
                if (entry.type === 'dir') {
                    dirNames.add(childName);
                } else {
                    fileEntries.set(childName, entry);
                }
            } else {
                dirNames.add(childName);
            }

            cursor.continue();
        };
    });

    const result: Array<{ name: string; entry: IDBEntry; type: IDBEntryType }> = [];
    for (const name of dirNames) {
        result.push({ name, entry: { type: 'dir' }, type: 'dir' });
    }
    for (const [name, entry] of fileEntries) {
        if (!dirNames.has(name)) {
            result.push({ name, entry, type: 'file' });
        }
    }
    return result;
}

function getRootIdFromParent(parent: Directory): string {
    return parent instanceof IDBDirectoryResource ? parent.getRootId() : '';
}

export class IDBFileResource extends File {
    private readonly path: string;
    private readonly parent: Directory;

    constructor(path: string, parent: Directory) {
        super();
        this.path = normalizePath(path);
        this.parent = parent;
    }

    getName(): string {
        const parts = this.path.split('/');
        return parts[parts.length - 1] || '';
    }

    getParent(): Directory {
        return this.parent;
    }

    private getRootId(): string {
        return getRootIdFromParent(this.parent);
    }

    async delete(): Promise<void> {
        await idbDelete(this.getRootId(), this.path);
        publish(TOPIC_WORKSPACE_CHANGED, workspaceService.getWorkspaceSync() ?? this.getWorkspace());
    }

    async getContents(options?: FileContentsOptions): Promise<any> {
        const entry = await idbGet(this.getRootId(), this.path);
        let raw = (entry as any)?.content as Blob | string | undefined;

        if (typeof raw === 'string') {
            const migratedBlob = new Blob([raw], { type: entry?.mimeType || 'text/plain' });
            raw = migratedBlob;
            if (entry) {
                entry.content = migratedBlob;
                await idbPut(this.getRootId(), this.path, entry);
            }
        }

        if (!options || options.contentType === FileContentType.TEXT) {
            if (!raw) {
                return '';
            }
            return await raw.text();
        }

        let blob: Blob;
        if (raw) {
            blob = raw;
        } else {
            blob = new Blob([], { type: entry?.mimeType });
        }

        if (options.blob) {
            return blob;
        }

        if (options.uri) {
            return URL.createObjectURL(blob);
        }

        return blob.stream();
    }

    async saveContents(contents: any, _options?: FileContentsOptions): Promise<void> {
        let blob: Blob;
        let mimeType: string | undefined;

        if (contents instanceof Blob) {
            blob = contents;
            mimeType = contents.type || undefined;
        } else if (typeof contents === 'string') {
            mimeType = 'text/plain';
            blob = new Blob([contents], { type: mimeType });
        } else if (contents instanceof ReadableStream) {
            const response = new Response(contents);
            blob = await response.blob();
            mimeType = response.headers.get('content-type') ?? undefined;
        } else {
            const text = String(contents ?? '');
            mimeType = 'text/plain';
            blob = new Blob([text], { type: mimeType });
        }

        await idbPut(this.getRootId(), this.path, { type: 'file', content: blob, mimeType });
        publish(TOPIC_WORKSPACE_CHANGED, workspaceService.getWorkspaceSync() ?? this.getWorkspace());
    }

    async size(): Promise<number | null> {
        const entry = await idbGet(this.getRootId(), this.path);
        const content = entry?.content;
        if (!content) return null;
        return content.size;
    }

    async copyTo(targetPath: string): Promise<void> {
        const contents = await this.getContents({ blob: true });
        const targetFile = await this.getWorkspace().getResource(targetPath, { create: true }) as File;
        if (!targetFile) {
            throw new Error(`Failed to create target file: ${targetPath}`);
        }
        await targetFile.saveContents(contents);
    }

    async rename(newName: string): Promise<void> {
        if (this.getName() === newName) {
            return;
        }
        const parentDir = this.getParent();
        const parentPath = parentDir instanceof IDBDirectoryResource ? parentDir.getPath() : '';
        const newPath = joinPath(parentPath, newName);

        const rootId = this.getRootId();
        const entry = await idbGet(rootId, this.path);
        if (!entry) {
            throw new Error('File not found in IndexedDB');
        }

        await idbDelete(rootId, this.path);
        await idbPut(rootId, newPath, entry);

        publish(TOPIC_WORKSPACE_CHANGED, workspaceService.getWorkspaceSync() ?? this.getWorkspace());
    }
}

export class IDBDirectoryResource extends Directory {
    private readonly path: string;
    private readonly parent?: Directory;

    constructor(path: string, parent?: Directory) {
        super();
        this.path = normalizePath(path);
        this.parent = parent;
    }

    getPath(): string {
        return this.path;
    }

    getName(): string {
        if (!this.path) {
            return '';
        }
        const parts = this.path.split('/');
        return parts[parts.length - 1];
    }

    getParent(): Directory | undefined {
        return this.parent;
    }

    getRoot(): IDBDirectoryResource {
        const p = this.getParent();
        if (!p) return this;
        return (p as IDBDirectoryResource).getRoot();
    }

    getRootId(): string {
        const r = this.getRoot();
        return r instanceof IDBRootDirectory ? r.getRootId() : '';
    }

    async listChildren(_forceRefresh: boolean): Promise<Resource[]> {
        const childrenInfo = await idbListChildrenOfDir(this.getRootId(), this.path);
        const result: Resource[] = [];
        for (const child of childrenInfo) {
            const childPath = joinPath(this.path, child.name);
            if (child.type === 'dir') {
                result.push(new IDBDirectoryResource(childPath, this));
            } else {
                result.push(new IDBFileResource(childPath, this));
            }
        }
        return result;
    }

    async getResource(path: string, options?: GetResourceOptions): Promise<Resource | null> {
        if (!path) {
            throw new Error('No path provided');
        }

        const segments = path.split('/').filter(s => s.trim());
        let currentDir: IDBDirectoryResource = this;

        for (let i = 0; i < segments.length; i++) {
            const segment = segments[i];
            const isLast = i === segments.length - 1;
            const currentPath = currentDir.getPath();
            const candidatePath = joinPath(currentPath, segment);
            const rootId = this.getRootId();

            const entry = await idbGet(rootId, candidatePath);

            if (!entry) {
                if (!options?.create) {
                    return null;
                }

                if (isLast) {
                    await idbPut(rootId, candidatePath, { type: 'file', content: new Blob([]) });
                    publish(TOPIC_WORKSPACE_CHANGED, workspaceService.getWorkspaceSync() ?? this.getWorkspace());
                    return new IDBFileResource(candidatePath, currentDir);
                }

                await idbPut(rootId, candidatePath, { type: 'dir' });
                currentDir = new IDBDirectoryResource(candidatePath, currentDir);
                continue;
            }

            if (isLast) {
                if (entry.type === 'dir') {
                    return new IDBDirectoryResource(candidatePath, currentDir);
                }
                return new IDBFileResource(candidatePath, currentDir);
            }

            if (entry.type !== 'dir') {
                return null;
            }

            currentDir = new IDBDirectoryResource(candidatePath, currentDir);
        }

        return currentDir;
    }

    touch(): void {
        publish(TOPIC_WORKSPACE_CHANGED, workspaceService.getWorkspaceSync() ?? this.getWorkspace());
    }

    async delete(name?: string, _recursive: boolean = true): Promise<void> {
        if (!name) {
            const parent = this.getParent();
            if (parent instanceof IDBDirectoryResource) {
                await parent.delete(this.getName());
                return;
            }
            return;
        }

        const targetPath = joinPath(this.path, name);
        await idbDeleteTree(this.getRootId(), targetPath);
        publish(TOPIC_WORKSPACE_CHANGED, workspaceService.getWorkspaceSync() ?? this.getWorkspace());
    }

    async copyTo(targetPath: string): Promise<void> {
        for (const resource of await this.listChildren(false)) {
            const childTarget = [targetPath, resource.getName()].join('/');
            await resource.copyTo(childTarget);
        }
    }

    async rename(newName: string): Promise<void> {
        if (this.getName() === newName) {
            return;
        }
        const parentDir = this.getParent();
        if (!(parentDir instanceof IDBDirectoryResource)) {
            throw new Error('Cannot rename IndexedDB root directory');
        }
        const oldPath = this.getPath();
        const newPath = joinPath(parentDir.getPath(), newName);
        await idbRenameTree(this.getRootId(), oldPath, newPath);
        publish(TOPIC_WORKSPACE_CHANGED, workspaceService.getWorkspaceSync() ?? this.getWorkspace());
    }
}

export class IDBRootDirectory extends IDBDirectoryResource {
    private readonly displayName: string;
    private readonly rootId: string;

    constructor(displayName: string, rootId: string) {
        super('');
        this.displayName = displayName || 'IndexedDB';
        this.rootId = rootId;
    }

    getRootId(): string {
        return this.rootId;
    }

    getName(): string {
        return this.displayName;
    }

    getParent(): Directory | undefined {
        return undefined;
    }

    async rename(_newName: string): Promise<void> {
        const name = String(_newName ?? '').trim();
        if (!name || name === this.displayName) {
            return;
        }
        // Update the in-memory display name and persist the change via workspaceService.
        (this as any).displayName = name;
        await workspaceService.updateFolderName(this, name);
    }
}

function generateRootId(): string {
    return typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : 'default-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// Register IndexedDB workspace contribution
workspaceService.registerContribution({
    type: 'indexeddb',
    name: 'idb',

    canHandle(input: any): boolean {
        return input && typeof input === 'object' && input.indexeddb === true;
    },

    async connect(input: { indexeddb: true; name?: string }): Promise<Directory> {
        await getWorkspaceIDB();
        const explicitName = input.name && String(input.name).trim();
        const name = explicitName && explicitName.length > 0
            ? explicitName
            : await getNextIndexedDBName();
        const rootId = generateRootId();
        return new IDBRootDirectory(name, rootId);
    },

    async restore(data: any): Promise<Directory | undefined> {
        if (data && typeof data === 'object' && data.indexeddb === true && data.rootId) {
            await getWorkspaceIDB();
            const name = (data.name && String(data.name).trim()) || 'IndexedDB';
            return new IDBRootDirectory(name, String(data.rootId));
        }
        return undefined;
    },

    async persist(workspace: Directory): Promise<any> {
        if (workspace instanceof IDBRootDirectory) {
            return { indexeddb: true, name: workspace.getName(), rootId: workspace.getRootId() };
        }
        return null;
    }
});


