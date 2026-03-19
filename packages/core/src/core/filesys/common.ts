import { persistenceService } from "../persistenceservice";
import { publish } from "../events";
import { rootContext } from "../di";
import { createLogger } from "../logger";

export const TOPIC_WORKSPACE_CHANGED = "events/filesys/workspaceChanged"
export const TOPIC_WORKSPACE_CONNECTED = "events/filesys/workspaceConnected"

const logger = createLogger('WorkspaceService');

export abstract class Resource {
    public state: { [p: string]: any } = {};

    public abstract getName(): string;

    public abstract getParent(): Directory | undefined;

    public abstract delete(name?: string, recursive?: boolean): Promise<void>;

    public abstract copyTo(targetPath: string): Promise<void>;

    public abstract rename(newName: string): Promise<void>;

    public getWorkspacePath(): string {
        const paths: string[] = []
        let current: Resource | undefined = this
        let root: Directory | undefined
        while (current) {
            paths.push(current.getName())
            const parent = current.getParent()
            if (!parent) root = current as Directory
            current = parent
        }
        paths.reverse()
        const workspace = typeof workspaceService?.getWorkspaceSync === 'function' ? workspaceService.getWorkspaceSync() : undefined
        if (workspace && root && 'isDirectChild' in workspace && typeof (workspace as any).isDirectChild === 'function' && (workspace as any).isDirectChild(root)) {
            const folderName = (workspace as any).getFolderNameForDirectory(root)
            if (folderName && paths.length > 0) return paths.length > 1 ? folderName + '/' + paths.slice(1).join('/') : folderName
        }
        paths.shift()
        return paths.join("/");
    }

    public getWorkspace(): Directory {
        let current: Resource | undefined = this
        while (current) {
            const parent: any = current.getParent()
            if (parent) {
                current = parent
            } else {
                break
            }
        }
        return current as Directory
    }
}

export const resourceComparator = (c1: Resource, c2: Resource) => {
    if (c1 instanceof Directory && c2 instanceof File) {
        return -1
    }
    if (c1 instanceof File && c2 instanceof Directory) {
        return 1
    }
    return c1.getName().localeCompare(c2.getName())
}

export enum FileContentType {
    TEXT, BINARY
}

export enum FileContentEncoding {
    BASE64
}

/**
 * Options for reading file contents. Backend implementors are encouraged to
 * preserve MIME information when possible – for example, by returning the
 * native Blob from remote HTTP/WebDAV responses (via response.blob()) and
 * passing it through unchanged for { blob: true } / { uri: true } usages,
 * instead of recreating typeless Blobs from raw ArrayBuffers.
 */
export interface FileContentsOptions {
    contentType?: FileContentType;
    encoding?: FileContentEncoding;
    uri?: boolean;
    blob?: boolean;
}

export interface GetResourceOptions {
    /**
     * When true, missing path segments MUST be created.
     *
     * Creation intent is encoded in the path:
     * - `path` without trailing slash => file intent for the last segment
     * - `path/` with trailing slash   => directory intent for the last segment
     *
     * Backend implementations MUST preserve this behavior so callers (e.g. `mkdir`)
     * can force directory creation consistently across all backends.
     */
    create?: boolean
}

export abstract class File extends Resource {
    public abstract getContents(options?: FileContentsOptions): Promise<any>;

    public abstract saveContents(contents: any, options?: FileContentsOptions): Promise<void>;

    public abstract size(): Promise<number | null>;
}

export abstract class Directory extends Resource {
    public abstract listChildren(forceRefresh: boolean): Promise<Resource[]>;

    /**
     * Resolve a resource relative to this directory.
     *
     * Contract for backend implementations:
     * - Empty/invalid input should throw (or return null by backend convention).
     * - With `{ create: true }`, missing segments must be created.
     * - Trailing slash (`path.endsWith('/')`) means directory intent for final segment.
     * - No trailing slash means file intent for final segment when creation is needed.
     * - If the resolved/created resource type conflicts with intent, return null.
     * - If creation mutates workspace contents, publish `TOPIC_WORKSPACE_CHANGED`.
     */
    public abstract getResource(path: string, options?: GetResourceOptions): Promise<Resource | null>;

    public abstract touch(): void;
}

export class StringFile extends File {
    private contents: string;
    private name: string;

    constructor(contents: string, name: string) {
        super();
        this.contents = contents
        this.name = name
    }

    async getContents(_options?: FileContentsOptions): Promise<any> {
        return this.contents
    }

    async saveContents(contents: any, _options?: FileContentsOptions): Promise<void> {
        this.contents = contents
    }

    async size(): Promise<number | null> {
        return this.contents.length || null;
    }

    async copyTo(_targetPath: string): Promise<void> {
        throw Error(`Not supported`);
    }

    delete(_name?: string, _recursive?: boolean): Promise<void> {
        throw Error(`Not supported`);
    }

    async rename(_newName: string): Promise<void> {
        throw Error(`Not supported`);
    }

    getName(): string {
        return this.name;
    }

    getParent(): Directory | undefined {
        return undefined;
    }
}

export interface ResourceMap {
    [key: string]: Resource;
}


export class CompositeDirectory extends Directory {
    private readonly entriesByName: Map<string, Directory>;

    constructor(
        directories: Directory[],
        private readonly displayName: string = '/'
    ) {
        super();
        this.entriesByName = new Map(directories.map(d => [d.getName(), d]));
    }

    getFolderNameForDirectory(dir: Directory): string | undefined {
        for (const [name, d] of this.entriesByName) {
            if (d === dir) return name;
        }
        return undefined;
    }

    isDirectChild(dir: Directory): boolean {
        return this.getFolderNameForDirectory(dir) !== undefined;
    }

    getName(): string {
        return this.displayName;
    }

    getParent(): Directory | undefined {
        return undefined;
    }

    async listChildren(_forceRefresh: boolean): Promise<Resource[]> {
        return Array.from(this.entriesByName.values());
    }

    async getResource(path: string, options?: GetResourceOptions): Promise<Resource | null> {
        const normalized = path?.replace(/^\/+/, "").trim();
        if (!normalized) {
            return null;
        }
        const idx = normalized.indexOf('/');
        const folderName = idx >= 0 ? normalized.slice(0, idx).trim() : normalized.trim();
        const rest = idx >= 0 ? normalized.slice(idx + 1).trim() : '';
        const dir = this.entriesByName.get(folderName);
        if (!dir) {
            return null;
        }
        if (!rest) {
            return dir;
        }
        return dir.getResource(rest, options);
    }

    touch(): void {
        for (const dir of this.entriesByName.values()) {
            dir.touch();
        }
    }

    async delete(_name?: string, _recursive?: boolean): Promise<void> {
        throw new Error('Delete not supported on workspace root');
    }

    async copyTo(_targetPath: string): Promise<void> {
        throw new Error('Copy not supported on workspace root');
    }

    async rename(_newName: string): Promise<void> {
        throw new Error('Rename not supported on workspace root');
    }

    getFolderByName(name: string): Directory | undefined {
        return this.entriesByName.get(name);
    }
}

/**
 * Placeholder directory used when a persisted workspace folder references
 * a backend type for which no contribution is currently registered.
 *
 * This allows the UI to surface a metadata node instead of silently
 * dropping the folder, and it can be replaced later once the real
 * contribution is loaded.
 */
export class MissingContributionDirectory extends Directory {
    private readonly backendType: string;
    private readonly persistedData: any;
    private readonly name: string;

    constructor(options: { backendType: string; name: string; data: any }) {
        super();
        this.backendType = options.backendType;
        this.persistedData = options.data;
        this.name = options.name;
    }

    getName(): string {
        return this.name;
    }

    getParent(): Directory | undefined {
        return undefined;
    }

    async listChildren(_forceRefresh: boolean): Promise<Resource[]> {
        return [];
    }

    async getResource(_path: string, _options?: GetResourceOptions): Promise<Resource | null> {
        throw new Error(`Workspace backend "${this.backendType}" is not available in this environment.`);
    }

    touch(): void {
        // No-op: without a real backend there is nothing to refresh.
    }

    async delete(_name?: string, _recursive?: boolean): Promise<void> {
        throw new Error(`Cannot modify workspace folder for missing backend "${this.backendType}".`);
    }

    async copyTo(_targetPath: string): Promise<void> {
        throw new Error(`Cannot copy from workspace folder for missing backend "${this.backendType}".`);
    }

    async rename(_newName: string): Promise<void> {
        throw new Error(`Cannot rename workspace folder for missing backend "${this.backendType}".`);
    }
}

export interface WorkspaceContribution {
    type: string;
    name: string;
    canHandle(input: any): boolean;
    connect(input: any): Promise<Directory>;
    restore?(data: any): Promise<Directory | undefined>;
    persist?(workspace: Directory): Promise<any>;
}

interface PersistedWorkspaceData {
    type?: string;
    data?: any;
    folders?: Array<{ type: string; data: any }>;
}

const LEGACY_WORKSPACE_KEY = "workspace_data";

export class WorkspaceService {
    private workspace?: Promise<Directory | undefined>;
    private _currentWorkspace: Directory | undefined = undefined;
    private folders: Array<{ type: string; data: any; directory: Directory }> = [];
    private currentType?: string;
    private contributions: Map<string, WorkspaceContribution> = new Map();
    private initPromise: Promise<void>;
    private restoredTypes: Set<string> = new Set();

    getWorkspaceSync(): Directory | undefined {
        return this._currentWorkspace;
    }

    constructor() {
        let resolveInit!: () => void;
        this.initPromise = new Promise<void>((resolve) => {
            resolveInit = resolve;
        });
        this.loadPersistedWorkspace(resolveInit);
    }

    registerContribution(contribution: WorkspaceContribution): void {
        this.contributions.set(contribution.type, contribution);
        void this.tryRestoreForContribution(contribution);
    }

    getContributions(): WorkspaceContribution[] {
        return Array.from(this.contributions.values());
    }

    private static readonly DEFAULT_INDEXEDDB_FOLDER_NAME = 'My Folder';

    private async tryRestoreForContribution(contribution: WorkspaceContribution): Promise<void> {
        await this.initPromise;

        if (this.restoredTypes.has(contribution.type)) {
            return;
        }

        const existingForType = this.folders.filter(f => f.type === contribution.type);
        const hasRealFoldersForType = existingForType.some(f => !(f.directory instanceof MissingContributionDirectory));
        if (hasRealFoldersForType) {
            this.restoredTypes.add(contribution.type);
            return;
        }

        const raw = await persistenceService.getObject(LEGACY_WORKSPACE_KEY) as PersistedWorkspaceData | null;
        if (!raw?.folders || !Array.isArray(raw.folders)) {
            this.restoredTypes.add(contribution.type);
            return;
        }

        const toRestore = raw.folders.filter(f => f.type === contribution.type);
        if (toRestore.length === 0) {
            this.restoredTypes.add(contribution.type);
            return;
        }

        // Remove any placeholder folders for this type; we'll replace them with
        // real directories if restoration succeeds.
        this.folders = this.folders.filter(f => !(f.type === contribution.type && f.directory instanceof MissingContributionDirectory));

        for (const folder of toRestore) {
            if (!contribution.restore) {
                continue;
            }

            try {
                const dir = await contribution.restore(folder.data);
                if (!dir) {
                    continue;
                }

                this.folders.push({ type: contribution.type, data: folder.data, directory: dir });
            } catch (error) {
                logger.warn(`Failed to restore folder (${contribution.type}) on contribution registration:`, error);
            }
        }

        if (this.folders.length === 0) {
            this.restoredTypes.add(contribution.type);
            return;
        }

        const composite = this.buildComposite();
        this.workspace = Promise.resolve(composite);
        this._currentWorkspace = composite ?? undefined;
        await this.persistFolders();
        if (composite) {
            publish(TOPIC_WORKSPACE_CONNECTED, composite);
            logger.debug(`Workspace folders restored for contribution type: ${contribution.type}`);
        }

        this.restoredTypes.add(contribution.type);
    }

    private async loadPersistedWorkspace(resolveInit: () => void): Promise<void> {
        logger.debug('Restoring workspace from persistence');
        try {
            const raw = await persistenceService.getObject(LEGACY_WORKSPACE_KEY) as PersistedWorkspaceData | null;
            if (!raw) {
                this.workspace = Promise.resolve(undefined);
                this._currentWorkspace = undefined;
            }

            if (raw?.folders && Array.isArray(raw.folders) && raw.folders.length > 0) {
                const normalized = raw.folders.map((f: { type: string; data: any }) => ({ type: f.type, data: f.data }));
                await this.resolveFolders(normalized);
                const composite = this.buildComposite();
                this.workspace = Promise.resolve(composite);
                this._currentWorkspace = composite ?? undefined;
                if (composite) {
                    publish(TOPIC_WORKSPACE_CONNECTED, composite);
                    logger.debug('Workspace restored from persisted folders');
                }
                resolveInit();
                return;
            }

            if (raw && raw.type && raw.data !== undefined) {
                const contribution = this.contributions.get(raw.type);
                if (contribution?.restore) {
                    try {
                        const dir = await contribution.restore!(raw.data);
                        if (dir) {
                            this.folders = [{ type: raw.type, data: raw.data, directory: dir }];
                            const comp = this.buildComposite();
                            this.workspace = Promise.resolve(comp);
                            this._currentWorkspace = comp ?? undefined;
                            this.currentType = raw.type;
                            await this.persistFolders();
                            publish(TOPIC_WORKSPACE_CONNECTED, comp);
                            logger.debug('Workspace restored from legacy format');
                        }
                    } catch (error) {
                        logger.error('Failed to restore legacy workspace:', error);
                    }
                }
            }
            if (!this.workspace) {
                this.workspace = Promise.resolve(undefined);
                this._currentWorkspace = undefined;
            }

            resolveInit();
        } finally {
            if (this.folders.length === 0) {
                try {
                    await this.connectFolder({ indexeddb: true, name: WorkspaceService.DEFAULT_INDEXEDDB_FOLDER_NAME });
                    logger.debug('Connected default IndexedDB workspace');
                } catch (e) {
                    logger.warn('Failed to connect default IndexedDB folder', e);
                }
            }
        }
    }

    private async resolveFolders(persisted: Array<{ type: string; data: any }>): Promise<void> {
        this.folders = [];
        for (const folder of persisted) {
            const contribution = this.contributions.get(folder.type);
            if (!contribution?.restore) {
                const displayName =
                    (folder.data && typeof folder.data === 'object' && (folder.data as any).name) ||
                    `${folder.type} (missing)`;
                const placeholder = new MissingContributionDirectory({
                    backendType: folder.type,
                    name: displayName,
                    data: folder.data
                });
                this.folders.push({ type: folder.type, data: folder.data, directory: placeholder });
                continue;
            }
            try {
                const dir = await contribution.restore(folder.data);
                if (dir) {
                    this.folders.push({ type: folder.type, data: folder.data, directory: dir });
                }
            } catch (error) {
                logger.warn(`Failed to restore folder (${folder.type}):`, error);
            }
        }
    }

    private buildComposite(): CompositeDirectory | undefined {
        if (this.folders.length === 0) {
            return undefined;
        }
        return new CompositeDirectory(this.folders.map(f => f.directory));
    }

    private async persistFolders(): Promise<void> {
        const toPersist = this.folders.length > 0
            ? { folders: this.folders.map(f => ({ type: f.type, data: f.data })) }
            : null;
        await persistenceService.persistObject(LEGACY_WORKSPACE_KEY, toPersist);
        await persistenceService.persistObject("workspace", null);
        logger.debug(`Persisted ${this.folders.length} folder(s)`);
    }

    async getFolders(): Promise<Array<{ name: string; type: string }>> {
        await this.initPromise;
        return this.folders.map(f => ({ name: f.directory.getName(), type: f.type }));
    }

    async getFolderInfoForDirectory(directory: Directory): Promise<{ name: string; type: string; backendName: string } | undefined> {
        await this.initPromise;
        const folder = this.folders.find(f => f.directory === directory);
        if (!folder) {
            return undefined;
        }
        const name =
            (folder.data && typeof folder.data === 'object' && (folder.data as any).name) ||
            folder.directory.getName();
        const contribution = this.contributions.get(folder.type);
        const backendName = contribution?.name ?? folder.type;
        return { name, type: folder.type, backendName };
    }

    /**
     * Update persisted metadata for a workspace root directory.
     * Currently used to keep display names of roots (e.g. IndexedDB) in sync
     * with their in-memory Directory instances.
     */
    async updateFolderName(directory: Directory, name: string): Promise<void> {
        await this.initPromise;
        const folder = this.folders.find(f => f.directory === directory);
        if (!folder) {
            return;
        }
        if (folder.data && typeof folder.data === 'object') {
            folder.data = { ...(folder.data as any), name };
        } else {
            folder.data = { name };
        }
        await this.persistFolders();
        const composite = this.buildComposite();
        this.workspace = Promise.resolve(composite);
        this._currentWorkspace = composite ?? undefined;
        publish(TOPIC_WORKSPACE_CONNECTED, composite);
        logger.debug(`Updated folder name: ${name}`);
    }

    async connectFolder(input: any): Promise<Directory> {
        await this.initPromise;
        const contribution = Array.from(this.contributions.values()).find(c => c.canHandle(input));
        if (!contribution) {
            throw new Error('No workspace contribution can handle this input');
        }
        const name = (input?.name as string) ?? contribution.type;
        logger.debug(`Connecting workspace: ${contribution.type}, ${name}`);
        const directory = await contribution.connect(input);
        const data = contribution.persist ? await contribution.persist(directory) : input;
        this.folders.push({ type: contribution.type, data, directory });
        await this.persistFolders();
        this.currentType = this.folders.length === 1 ? contribution.type : undefined;
        const composite = this.buildComposite()!;
        this.workspace = Promise.resolve(composite);
        this._currentWorkspace = composite;
        publish(TOPIC_WORKSPACE_CONNECTED, composite);
        const displayName = directory.getName();
        logger.info(`Workspace connected: ${contribution.type} (${displayName})`);
        return composite;
    }

    async disconnectFolder(directory: Directory): Promise<void> {
        await this.initPromise;
        const idx = this.folders.findIndex(f => f.directory === directory);
        if (idx < 0) {
            return;
        }
        const folder = this.folders[idx];
        logger.debug(`Disconnecting folder: ${folder.directory.getName()} (${folder.type})`);
        this.folders.splice(idx, 1);
        await this.persistFolders();
        if (this.folders.length > 0) {
            this.currentType = this.folders[0].type;
        } else {
            this.currentType = undefined;
            logger.info('Workspace disconnected');
        }
        const composite = this.buildComposite();
        this.workspace = Promise.resolve(composite);
        this._currentWorkspace = composite ?? undefined;
        publish(TOPIC_WORKSPACE_CONNECTED, composite);
    }

    async connectWorkspace(input: any): Promise<Directory> {
        return this.connectFolder(input);
    }

    public async getWorkspace(): Promise<Directory | undefined> {
        await this.initPromise;
        if (!this.workspace) {
            throw new Error('No workspace connected.');
        }
        return await this.workspace;
    }

    public isConnected(): boolean {
        return this.folders.length > 0;
    }

    public getWorkspaceType(): string | undefined {
        return this.currentType;
    }

    public async disconnectWorkspace(): Promise<void> {
        await this.initPromise;
        this.workspace = Promise.resolve(undefined);
        this._currentWorkspace = undefined;
        this.folders = [];
        this.currentType = undefined;
        await this.persistFolders();
        publish(TOPIC_WORKSPACE_CONNECTED, undefined as any);
        logger.info('Workspace disconnected');
    }

    /**
     * Copy (and optionally move) a resource into a target directory within the
     * current workspace. This helper is connection-agnostic: it always resolves
     * paths via the composite workspace root so it can copy across different
     * backend folders.
     */
    public async copyResource(
        src: Resource,
        destDir: Directory,
        options?: { move?: boolean; newName?: string }
    ): Promise<void> {
        await this.initPromise;
        const workspace = this._currentWorkspace;
        if (!workspace) {
            throw new Error('No workspace connected.');
        }

        const targetName = options?.newName ?? src.getName();
        const destDirPath = destDir.getWorkspacePath();
        const targetBasePath = destDirPath ? `${destDirPath}/${targetName}` : targetName;

        const copyFileToPath = async (file: File, targetPath: string): Promise<void> => {
            const contents = await file.getContents({ blob: true });
            const targetFile = await workspace.getResource(targetPath, { create: true }) as File | null;
            if (!targetFile) {
                throw new Error(`Failed to create target file: ${targetPath}`);
            }
            await targetFile.saveContents(contents);
        };

        const copyDirectoryToPath = async (dir: Directory, targetPath: string): Promise<void> => {
            for (const child of await dir.listChildren(false)) {
                const childTargetPath = `${targetPath}/${child.getName()}`;
                if (child instanceof File) {
                    await copyFileToPath(child, childTargetPath);
                } else if (child instanceof Directory) {
                    await copyDirectoryToPath(child, childTargetPath);
                }
            }
        };

        if (src instanceof File) {
            await copyFileToPath(src, targetBasePath);
        } else if (src instanceof Directory) {
            await copyDirectoryToPath(src, targetBasePath);
        } else {
            throw new Error('Unsupported resource type for copy operation.');
        }

        if (options?.move) {
            await src.delete(undefined, true);
        }
    }
}

export const workspaceService = new WorkspaceService();
rootContext.put("workspaceService", workspaceService);


