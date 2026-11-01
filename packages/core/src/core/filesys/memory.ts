import { publish } from '../events';
import {
    Directory,
    File,
    type FileContentsOptions,
    type GetResourceOptions,
    type Resource,
    TOPIC_WORKSPACE_CHANGED,
    workspaceService,
} from './common';

/** Stable composite-workspace root name / path prefix. */
export const IN_MEMORY_ROOT_NAME = 'in-memory';

export const IN_MEMORY_CONTRIBUTION_TYPE = 'in-memory';

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

/**
 * Live file backing: contents are resolved on read (object reference), not copied into the store.
 * Callers supply these callbacks when placing files.
 */
export interface MemoryLiveContents {
    getContents(options?: FileContentsOptions): Promise<unknown> | unknown;
    size(): Promise<number | null> | number | null;
    mimeType?: string;
}

/**
 * Optional workspace-mount projection. When set, the mounted `in-memory` root delegates
 * listing/lookup to the caller (e.g. show a single folder). The backing store is unchanged.
 */
export interface InMemoryMountProjection {
    listChildren(root: MemoryRootDirectory, forceRefresh: boolean): Promise<Resource[]>;
    getResource(
        root: MemoryRootDirectory,
        path: string,
        options?: GetResourceOptions,
    ): Promise<Resource | null>;
}

type MemoryDir = { kind: 'dir'; children: Map<string, MemoryNode> };
type MemoryNode =
    | MemoryDir
    | { kind: 'file'; contents: string | Blob; mimeType?: string }
    | { kind: 'live'; source: MemoryLiveContents };

function emptyDir(): MemoryDir {
    return { kind: 'dir', children: new Map() };
}

function ensureDir(node: MemoryDir, segment: string): MemoryDir {
    let child = node.children.get(segment);
    if (!child) {
        child = emptyDir();
        node.children.set(segment, child);
        return child;
    }
    if (child.kind !== 'dir') {
        throw new Error(`Path conflict: ${segment} is a file`);
    }
    return child;
}

function publishChanged(): void {
    publish(TOPIC_WORKSPACE_CHANGED, workspaceService.getWorkspaceSync());
}

/** Shared tree store for one connected in-memory root. */
class MemoryStore {
    private readonly tree: MemoryDir = emptyDir();

    lookup(path: string): MemoryNode | undefined {
        const norm = normalizePath(path);
        if (!norm) return this.tree;
        let current: MemoryNode | undefined = this.tree;
        for (const segment of norm.split('/')) {
            if (!current || current.kind !== 'dir') return undefined;
            current = current.children.get(segment);
        }
        return current;
    }

    ensureDirectory(path: string): void {
        const norm = normalizePath(path);
        if (!norm) return;
        let current: MemoryDir = this.tree;
        for (const segment of norm.split('/')) {
            current = ensureDir(current, segment);
        }
    }

    private ensureFileParent(path: string): { parent: MemoryDir; fileName: string } {
        const norm = normalizePath(path);
        if (!norm) throw new Error('Invalid file path');
        const parts = norm.split('/');
        const fileName = parts.pop()!;
        let current: MemoryDir = this.tree;
        for (const segment of parts) {
            current = ensureDir(current, segment);
        }
        return { parent: current, fileName };
    }

    writeFile(path: string, contents: string | Blob, mimeType?: string): void {
        const { parent, fileName } = this.ensureFileParent(path);
        parent.children.set(fileName, { kind: 'file', contents, mimeType });
    }

    writeLiveFile(path: string, source: MemoryLiveContents): void {
        const { parent, fileName } = this.ensureFileParent(path);
        parent.children.set(fileName, { kind: 'live', source });
    }

    remove(path: string): void {
        const norm = normalizePath(path);
        if (!norm) {
            this.clear();
            return;
        }
        const parts = norm.split('/');
        const name = parts.pop()!;
        let current: MemoryNode | undefined = this.tree;
        for (const segment of parts) {
            if (!current || current.kind !== 'dir') return;
            current = current.children.get(segment);
        }
        if (current && current.kind === 'dir') {
            current.children.delete(name);
        }
    }

    renameTree(oldPath: string, newPath: string): void {
        const node = this.lookup(oldPath);
        if (!node) throw new Error(`Missing path: ${oldPath}`);
        this.remove(oldPath);
        const normNew = normalizePath(newPath);
        const parts = normNew.split('/');
        const name = parts.pop()!;
        const parentPath = parts.join('/');
        if (parentPath) this.ensureDirectory(parentPath);
        const parent = parentPath ? this.lookup(parentPath) : this.tree;
        if (!parent || parent.kind !== 'dir') throw new Error('Invalid rename target');
        parent.children.set(name, node);
    }

    clear(): void {
        if (this.tree.kind === 'dir') this.tree.children.clear();
    }
}

export class MemoryFileResource extends File {
    constructor(
        private readonly store: MemoryStore,
        private readonly path: string,
        private readonly parentDir: MemoryDirectoryResource | undefined,
    ) {
        super();
    }

    getRelativePath(): string {
        return this.path;
    }

    getName(): string {
        const parts = this.path.split('/');
        return parts[parts.length - 1] || this.path;
    }

    getParent(): Directory | undefined {
        return this.parentDir;
    }

    /** Stable even when the root is not mounted in the workspace composite. */
    getWorkspacePath(): string {
        return this.path ? `${IN_MEMORY_ROOT_NAME}/${this.path}` : IN_MEMORY_ROOT_NAME;
    }

    private node(): Extract<MemoryNode, { kind: 'file' | 'live' }> {
        const node = this.store.lookup(this.path);
        if (!node || (node.kind !== 'file' && node.kind !== 'live')) {
            throw new Error(`File not found: ${this.path}`);
        }
        return node;
    }

    isLive(): boolean {
        return this.store.lookup(this.path)?.kind === 'live';
    }

    async getContents(options?: FileContentsOptions): Promise<any> {
        const node = this.node();
        if (node.kind === 'live') {
            const contents = await node.source.getContents(options);
            if (options?.blob && !(contents instanceof Blob)) {
                return new Blob([String(contents ?? '')], {
                    type: node.source.mimeType || 'text/plain',
                });
            }
            return contents;
        }
        if (options?.blob) {
            if (node.contents instanceof Blob) return node.contents;
            return new Blob([node.contents], { type: node.mimeType || 'text/plain' });
        }
        if (options?.uri) {
            if (typeof node.contents === 'string' && node.contents.startsWith('data:')) {
                return node.contents;
            }
            if (node.contents instanceof Blob) {
                return URL.createObjectURL(node.contents);
            }
        }
        if (node.contents instanceof Blob) {
            return await node.contents.text();
        }
        return node.contents;
    }

    async saveContents(contents: any, _options?: FileContentsOptions): Promise<void> {
        if (this.isLive()) {
            throw new Error('Live in-memory files are read-only references');
        }
        const mimeType =
            contents instanceof Blob
                ? contents.type || this.getMimeType()
                : this.getMimeType();
        this.store.writeFile(this.path, contents, mimeType);
        publishChanged();
    }

    async size(): Promise<number | null> {
        const node = this.node();
        if (node.kind === 'live') {
            return await node.source.size();
        }
        if (node.contents instanceof Blob) return node.contents.size;
        return node.contents.length;
    }

    getMimeType(): string | undefined {
        const node = this.node();
        if (node.kind === 'live') return node.source.mimeType;
        return node.mimeType;
    }

    async copyTo(targetPath: string): Promise<void> {
        const workspace = workspaceService.getWorkspaceSync();
        if (!workspace) throw new Error('No workspace');
        const target = await workspace.getResource(targetPath, { create: true });
        if (!(target instanceof File)) throw new Error('Copy target is not a file');
        const contents = await this.getContents();
        await target.saveContents(contents);
    }

    async delete(_name?: string, _recursive?: boolean): Promise<void> {
        if (this.parentDir) {
            await this.parentDir.delete(this.getName());
        }
    }

    async rename(newName: string): Promise<void> {
        if (!this.parentDir) throw new Error('Cannot rename without parent');
        const oldPath = this.path;
        const newPath = joinPath(this.parentDir.getPath(), newName);
        this.store.renameTree(oldPath, newPath);
        publishChanged();
    }
}

export class MemoryDirectoryResource extends Directory {
    constructor(
        protected readonly store: MemoryStore,
        protected readonly path: string,
        protected readonly parentDir: MemoryDirectoryResource | undefined,
        protected readonly rootName: string = IN_MEMORY_ROOT_NAME,
    ) {
        super();
    }

    getName(): string {
        if (!this.path) return this.rootName;
        const parts = this.path.split('/');
        return parts[parts.length - 1]!;
    }

    getParent(): Directory | undefined {
        return this.parentDir;
    }

    getPath(): string {
        return this.path;
    }

    /** Stable even when the root is not mounted in the workspace composite. */
    getWorkspacePath(): string {
        return this.path ? `${IN_MEMORY_ROOT_NAME}/${this.path}` : IN_MEMORY_ROOT_NAME;
    }

    async listChildren(_forceRefresh: boolean): Promise<Resource[]> {
        const node = this.store.lookup(this.path);
        if (!node || node.kind !== 'dir') return [];
        const out: Resource[] = [];
        for (const [name, child] of node.children) {
            const childPath = joinPath(this.path, name);
            if (child.kind === 'dir') {
                out.push(new MemoryDirectoryResource(this.store, childPath, this, this.rootName));
            } else {
                out.push(new MemoryFileResource(this.store, childPath, this));
            }
        }
        return out;
    }

    async getResource(path: string, options?: GetResourceOptions): Promise<Resource | null> {
        if (!path) throw new Error('No path provided');

        const isDirectoryIntent = path.endsWith('/');
        const segments = path.split('/').filter((s) => s.trim());
        let currentPath = this.path;
        let currentDir: MemoryDirectoryResource = this;
        let changed = false;

        for (let i = 0; i < segments.length; i++) {
            const segment = segments[i]!;
            const isLast = i === segments.length - 1;
            const candidatePath = joinPath(currentPath, segment);
            const existing = this.store.lookup(candidatePath);

            if (!existing) {
                if (!options?.create) return null;
                if (isLast && !isDirectoryIntent) {
                    this.store.writeFile(candidatePath, '', undefined);
                    changed = true;
                    publishChanged();
                    return new MemoryFileResource(this.store, candidatePath, currentDir);
                }
                this.store.ensureDirectory(candidatePath);
                changed = true;
                currentDir = new MemoryDirectoryResource(
                    this.store,
                    candidatePath,
                    currentDir,
                    this.rootName,
                );
                currentPath = candidatePath;
                continue;
            }

            if (isLast) {
                if (isDirectoryIntent || existing.kind === 'dir') {
                    if (existing.kind !== 'dir') return null;
                    return new MemoryDirectoryResource(
                        this.store,
                        candidatePath,
                        currentDir,
                        this.rootName,
                    );
                }
                return new MemoryFileResource(this.store, candidatePath, currentDir);
            }

            if (existing.kind !== 'dir') return null;
            currentDir = new MemoryDirectoryResource(
                this.store,
                candidatePath,
                currentDir,
                this.rootName,
            );
            currentPath = candidatePath;
        }

        if (changed) publishChanged();
        return currentDir;
    }

    touch(): void {
        publishChanged();
    }

    async delete(name?: string, _recursive: boolean = true): Promise<void> {
        if (!name) {
            if (this.parentDir) {
                await this.parentDir.delete(this.getName());
            } else {
                this.store.clear();
                publishChanged();
            }
            return;
        }
        this.store.remove(joinPath(this.path, name));
        publishChanged();
    }

    async copyTo(targetPath: string): Promise<void> {
        for (const resource of await this.listChildren(false)) {
            await resource.copyTo([targetPath, resource.getName()].join('/'));
        }
    }

    async rename(newName: string): Promise<void> {
        if (!this.parentDir) throw new Error('Cannot rename in-memory root');
        if (this.getName() === newName) return;
        const newPath = joinPath(this.parentDir.getPath(), newName);
        this.store.renameTree(this.path, newPath);
        publishChanged();
    }
}

export class MemoryRootDirectory extends MemoryDirectoryResource {
    constructor(displayName: string = IN_MEMORY_ROOT_NAME) {
        super(new MemoryStore(), '', undefined, displayName || IN_MEMORY_ROOT_NAME);
    }

    getParent(): Directory | undefined {
        return undefined;
    }

    /** Ensure a child directory exists and return a handle to it. */
    ensureDirectoryEntry(name: string): MemoryDirectoryResource {
        const id = String(name ?? '').trim();
        if (!id || id.includes('/')) throw new Error('Directory name required (no slashes)');
        this.store.ensureDirectory(id);
        return new MemoryDirectoryResource(this.store, id, undefined, this.getName());
    }

    /** Place a live (by-reference) file; callers provide payload-resolving callbacks. */
    writeLiveFile(path: string, source: MemoryLiveContents): void {
        this.store.writeLiveFile(path, source);
        publishChanged();
    }
}

/** Process-wide singleton — same idea as OPFS always targeting one browser root. */
let sharedMemoryRoot: MemoryRootDirectory | undefined;
let sharedMemoryMount: MemoryMountDirectory | undefined;
let mountProjection: InMemoryMountProjection | null = null;

/**
 * Shared in-memory root. Does **not** mount into the workspace composite;
 * call {@link workspaceService.connectFolder} with `{ memory: true }` to mount.
 */
export function getInMemoryRoot(): MemoryRootDirectory {
    if (!sharedMemoryRoot) {
        sharedMemoryRoot = new MemoryRootDirectory(IN_MEMORY_ROOT_NAME);
    }
    return sharedMemoryRoot;
}

/**
 * Optional projection for the workspace-mounted view. Cleared with `null`.
 * Callers own any domain filtering (the in-memory backend itself is domain-agnostic).
 */
export function setInMemoryMountProjection(projection: InMemoryMountProjection | null): void {
    mountProjection = projection;
    publishChanged();
}

export function getInMemoryMountProjection(): InMemoryMountProjection | null {
    return mountProjection;
}

/**
 * Workspace-facing mount of the shared root. Uses {@link setInMemoryMountProjection} when set;
 * otherwise exposes the full tree.
 */
export class MemoryMountDirectory extends Directory {
    getName(): string {
        return IN_MEMORY_ROOT_NAME;
    }

    getParent(): Directory | undefined {
        return undefined;
    }

    getWorkspacePath(): string {
        return IN_MEMORY_ROOT_NAME;
    }

    async listChildren(forceRefresh: boolean): Promise<Resource[]> {
        const root = getInMemoryRoot();
        if (mountProjection) {
            return mountProjection.listChildren(root, forceRefresh);
        }
        return root.listChildren(forceRefresh);
    }

    async getResource(path: string, options?: GetResourceOptions): Promise<Resource | null> {
        const root = getInMemoryRoot();
        if (mountProjection) {
            return mountProjection.getResource(root, path, options);
        }
        return root.getResource(path, options);
    }

    touch(): void {
        publishChanged();
    }

    async delete(name?: string, recursive?: boolean): Promise<void> {
        if (!name) return;
        await getInMemoryRoot().delete(name, recursive);
        publishChanged();
    }

    async copyTo(targetPath: string): Promise<void> {
        for (const resource of await this.listChildren(false)) {
            await resource.copyTo([targetPath, resource.getName()].join('/'));
        }
    }

    async rename(_newName: string): Promise<void> {
        throw new Error('Cannot rename the in-memory mount');
    }
}

function getInMemoryMount(): MemoryMountDirectory {
    if (!sharedMemoryMount) {
        sharedMemoryMount = new MemoryMountDirectory();
    }
    return sharedMemoryMount;
}

/** Test helper: drop singletons so the next accessors create a fresh tree. */
export function resetInMemoryRootForTests(): void {
    sharedMemoryRoot = undefined;
    sharedMemoryMount = undefined;
    mountProjection = null;
}

workspaceService.registerContribution({
    type: IN_MEMORY_CONTRIBUTION_TYPE,
    name: 'memory',

    canHandle(input: any): boolean {
        return Boolean(
            input &&
                typeof input === 'object' &&
                (input.memory === true || input['in-memory'] === true),
        );
    },

    async connect(_input: { memory?: true; 'in-memory'?: true; name?: string }): Promise<Directory> {
        getInMemoryRoot();
        return getInMemoryMount();
    },

    async restore(data: any): Promise<Directory | undefined> {
        if (data && typeof data === 'object' && (data.memory === true || data['in-memory'] === true)) {
            return undefined;
        }
        return undefined;
    },

    async persist(workspace: Directory): Promise<any> {
        if (workspace instanceof MemoryMountDirectory || workspace instanceof MemoryRootDirectory) {
            return { memory: true, name: IN_MEMORY_ROOT_NAME };
        }
        return null;
    },
});
