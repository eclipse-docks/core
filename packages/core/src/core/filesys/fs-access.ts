import { publish } from "../events";
import {
    File,
    Directory,
    FileContentType,
    FileContentEncoding,
    type FileContentsOptions,
    type GetResourceOptions,
    type Resource,
    type ResourceMap,
    TOPIC_WORKSPACE_CHANGED,
    workspaceService,
} from "./common";

export class FileSysFileHandleResource extends File {
    private fileHandle: FileSystemFileHandle;
    private parent: Directory;

    constructor(fileHandle: FileSystemFileHandle, parent: Directory) {
        super();
        this.fileHandle = fileHandle;
        this.parent = parent;
    }

    getName(): string {
        return this.fileHandle.name;
    }

    getParent(): Directory {
        return this.parent;
    }

    async delete() {
        return this.getParent().delete(this.getName());
    }

    async getContents(options?: FileContentsOptions): Promise<any> {
        const file = await this.fileHandle.getFile();

        if (!options || options?.contentType == FileContentType.TEXT) {
            return await file.text();
        }

        if (options?.encoding == FileContentEncoding.BASE64 || options?.uri) {
            return URL.createObjectURL(file);
        }

        if (options?.blob) {
            return file;
        }

        return file.stream();
    }

    async size(): Promise<number | null> {
        try {
            const file = await this.fileHandle.getFile();
            return file.size;
        } catch {
            return null;
        }
    }

    async saveContents(contents: any, _options?: FileContentsOptions): Promise<void> {
        const writable = await this.fileHandle.createWritable();

        if (contents && typeof contents.pipeTo === 'function') {
            await contents.pipeTo(writable);
        } else {
            const writer = writable.getWriter();
            try {
                await writer.write(contents);
            } finally {
                await writer.close();
            }
        }
        publish(TOPIC_WORKSPACE_CHANGED, workspaceService.getWorkspaceSync() ?? this.getWorkspace());
    }

    async copyTo(targetPath: string): Promise<void> {
        const contents = await this.getContents({ blob: true });
        const targetFile = await this.getWorkspace().getResource(targetPath, { create: true }) as File;
        await targetFile.saveContents(contents);
    }

    async rename(newName: string): Promise<void> {
        const parent = this.getParent() as FileSysDirHandleResource;
        if (!parent) {
            throw new Error('Cannot rename root resource');
        }

        if (this.getName() === newName) {
            return;
        }

        if (!('move' in this.fileHandle) || typeof (this.fileHandle as any).move !== 'function') {
            throw new Error('File rename not supported in this browser. Please use a browser with File System Access API move() support.');
        }

        try {
            await (this.fileHandle as any).move(newName);
        } catch (error: any) {
            if (error.name === 'NotAllowedError' ||
                error.message?.includes('not allowed') ||
                error.message?.includes('user agent')) {
                throw new Error('File rename failed: The operation took too long and user activation expired. Please try again.');
            }
            throw error;
        }

        await parent.listChildren(true);
        publish(TOPIC_WORKSPACE_CHANGED, workspaceService.getWorkspaceSync() ?? this.getWorkspace());
    }
}

export class FileSysDirHandleResource extends Directory {
    private dirHandle: FileSystemDirectoryHandle;
    private files?: ResourceMap;
    private parent?: Directory;
    private loadingPromise?: Promise<Resource[]>;

    constructor(dirHandle: FileSystemDirectoryHandle, parent?: Directory) {
        super();
        this.dirHandle = dirHandle;
        this.parent = parent;
    }

    getHandle() {
        return this.dirHandle;
    }

    getParent(): Directory | undefined {
        return this.parent;
    }

    getName(): string {
        return this.dirHandle.name;
    }

    async listChildren(forceRefresh: boolean = false): Promise<Resource[]> {
        if (forceRefresh || !this.files) {
            if (this.loadingPromise) {
                return this.loadingPromise;
            }

            this.loadingPromise = (async () => {
                try {
                    const files: ResourceMap = {};

                    try {
                        // @ts-ignore -- TS 6 lib.dom provides `values()` via merged FileSystemDirectoryHandle declarations;
                        // IDE/lint can miss the merge and falsely report it missing while tsc is correct.
                        for await (const entry of this.dirHandle.values()) {
                            const child =
                                entry.kind === "file"
                                    ? new FileSysFileHandleResource(entry, this)
                                    : new FileSysDirHandleResource(entry, this);
                            files[child.getName()] = child;
                        }
                    } catch (error: any) {
                        if (error.name === 'NotFoundError') {
                            this.files = {};
                            return [];
                        }
                        throw error;
                    }

                    this.files = files;
                    return Object.values(this.files);
                } finally {
                    this.loadingPromise = undefined;
                }
            })();

            return this.loadingPromise;
        }
        return Object.values(this.files);
    }

    async getResource(path: string, options?: GetResourceOptions): Promise<Resource | null> {
        if (!path) {
            throw new Error("No path provided");
        }
        const segments = path.split("/").filter(s => s.trim());
        let currentResource: Resource = this;
        let workspaceChanged = false;
        try {
            for (let i = 0; i < segments.length; i++) {
                const segment = segments[i].trim();
                if (currentResource instanceof FileSysDirHandleResource) {
                    await currentResource.listChildren();
                    if (!currentResource.files) {
                        return null;
                    }
                    const next = currentResource.files[segment];
                    if (!next) {
                        if (options?.create) {
                            workspaceChanged = true;
                            if (i < segments.length - 1) {
                                try {
                                    const newDirHandle = await currentResource.dirHandle.getDirectoryHandle(segment, { create: true });
                                    const nextResource = new FileSysDirHandleResource(newDirHandle, currentResource);
                                    currentResource.files[segment] = nextResource;
                                    currentResource = nextResource;
                                    if (currentResource instanceof FileSysDirHandleResource) {
                                        await currentResource.listChildren();
                                    }
                                    continue;
                                } catch (error: any) {
                                    if (error.name === 'NotFoundError') {
                                        throw new Error(`Directory not found or not accessible: ${segments.slice(0, i + 1).join('/')}`);
                                    }
                                    throw error;
                                }
                            } else {
                                try {
                                    const newFileHandle = await currentResource.dirHandle.getFileHandle(segment, { create: true });
                                    const nextResource = new FileSysFileHandleResource(newFileHandle, currentResource);
                                    currentResource.files[segment] = nextResource;
                                    return nextResource;
                                } catch (error: any) {
                                    if (error.name === 'NotFoundError') {
                                        throw new Error(`File not found or not accessible: ${segments.join('/')}`);
                                    }
                                    throw error;
                                }
                            }
                        } else {
                            return null;
                        }
                    } else {
                        currentResource = next;
                    }
                } else {
                    return null;
                }
            }
        } finally {
            if (workspaceChanged) {
                publish(TOPIC_WORKSPACE_CHANGED, workspaceService.getWorkspaceSync() ?? this.getWorkspace());
            }
        }
        return currentResource;
    }

    public touch() {
        publish(TOPIC_WORKSPACE_CHANGED, workspaceService.getWorkspaceSync() ?? this.getWorkspace());
    }

    async delete(name?: string, recursive: boolean = true) {
        if (!name) {
            const parent = this.getParent();
            if (parent instanceof FileSysDirHandleResource) {
                await parent.listChildren();
                if (parent.files) {
                    delete parent.files[this.getName()];
                }
            }
            this.files = undefined;
            this.loadingPromise = undefined;
            return parent?.delete(this.getName());
        }
        return this.dirHandle.removeEntry(name, {
            recursive: recursive
        }).then(async () => {
            if (this.files) {
                delete this.files[name];
            }
            publish(TOPIC_WORKSPACE_CHANGED, workspaceService.getWorkspaceSync() ?? this.getWorkspace());
        });
    }

    async copyTo(targetPath: string) {
        for (const resource of (await this.listChildren())) {
            const targetResourceName = [targetPath, resource.getName()].join("/");
            await resource.copyTo(targetResourceName);
        }
    }

    async rename(newName: string): Promise<void> {
        const parent = this.getParent() as FileSysDirHandleResource;
        if (!parent) {
            throw new Error('Cannot rename workspace root');
        }

        if (this.getName() === newName) {
            return;
        }

        if (!('move' in this.dirHandle) || typeof (this.dirHandle as any).move !== 'function') {
            throw new Error('Directory rename not supported in this browser. Please use a browser with File System Access API move() support.');
        }

        try {
            await (this.dirHandle as any).move(newName);
        } catch (error: any) {
            if (error.name === 'NotAllowedError' ||
                error.message?.includes('not allowed') ||
                error.message?.includes('user agent')) {
                throw new Error('Directory rename failed: The operation took too long and user activation expired. Please try again.');
            }
            throw error;
        }

        await parent.listChildren(true);
        publish(TOPIC_WORKSPACE_CHANGED, workspaceService.getWorkspaceSync() ?? this.getWorkspace());
    }
}

// Register default filesystem contribution
workspaceService.registerContribution({
    type: 'filesystem',
    name: 'fs',

    canHandle(input: any): boolean {
        return input && 'kind' in input && input.kind === 'directory';
    },

    async connect(input: FileSystemDirectoryHandle): Promise<Directory> {
        return new FileSysDirHandleResource(input);
    },

    async restore(data: any): Promise<Directory | undefined> {
        if (data && 'kind' in data && data.kind === 'directory') {
            return new FileSysDirHandleResource(data, undefined);
        }
        return undefined;
    },

    async persist(workspace: Directory): Promise<any> {
        if (workspace instanceof FileSysDirHandleResource) {
            return workspace.getHandle();
        }
        return null;
    }
});

