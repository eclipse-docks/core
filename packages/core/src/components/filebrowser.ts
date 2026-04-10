
import { css, html, TemplateResult, nothing } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { DocksPart } from "../parts/part";
import {
    Directory,
    File,
    Resource,
    TOPIC_WORKSPACE_CHANGED,
    TOPIC_WORKSPACE_CONNECTED,
    UnavailableWorkspaceFolderDirectory,
    workspaceService
} from "../core/filesys";
import { when } from "lit/directives/when.js";
import { subscribe } from "../core/events";
import { createRef, ref } from "lit/directives/ref.js";
import { HIDE_DOT_RESOURCE } from "../core/constants";

import { TreeNode, treeNodeComparator } from "../core/tree-utils";
import { activeSelectionSignal } from "../core/appstate";
import { confirmDialog, infoDialog } from "../dialogs";
import { editorRegistry } from "../core/editorregistry";
import { TOPIC_CONTRIBUTEIONS_CHANGED, type ContributionChangeEvent } from '../core/contributionregistry';
import { icon } from '../core/icon-utils';
import { i18n } from '../core/i18n';
import { createLogger } from '../core/logger';

const logger = createLogger('DocksFileBrowser');
const t = await i18n(import.meta.glob('./filebrowser*.json'));

const WORKSPACE_CHANGED_DEBOUNCE_MS = 250;

/** `wa-tree-item` exposes `.model` for the bound {@link TreeNode} (not in generated element types). */
type WaTreeItemElement = HTMLElement & { model?: TreeNode };

@customElement('docks-filebrowser')
export class DocksFileBrowser extends DocksPart {

    private static readonly SETTINGS_VERSION = 1;
    private static readonly SETTINGS_KEY_SELECTED_PATH = 'selectedPath';
    private settingsLoaded = false;

    @state()
    private root?: TreeNode;
    @state()
    private fileEditorOptions: Array<{ editorId: string; title: string; icon?: string }> = [];
    private workspaceDir?: Directory
    private treeRef = createRef<HTMLElement>();
    private loadingNodes = new Set<TreeNode>();
    /** Bumped on every workspace tree rebuild so in-flight listChildren can bail out after disconnect/reconnect. */
    private treeBuildGeneration = 0;
    private workspaceChangedDebounceId: ReturnType<typeof setTimeout> | undefined;
    private pendingWorkspaceDir: Directory | undefined;

    protected doBeforeUI() {
        this.initializeWorkspace();

        subscribe(TOPIC_CONTRIBUTEIONS_CHANGED, (event: ContributionChangeEvent) => {
            if (event.target === 'system.icons') {
                this.requestUpdate();
            }
        });

        this.subscribe(TOPIC_WORKSPACE_CHANGED, (workspaceDir: Directory | undefined) => this.onWorkspaceChanged(workspaceDir));
        this.subscribe(TOPIC_WORKSPACE_CONNECTED, (workspaceDir: Directory | undefined) => this.onWorkspaceConnected(workspaceDir));
    }

    disconnectedCallback() {
        if (this.workspaceChangedDebounceId !== undefined) {
            clearTimeout(this.workspaceChangedDebounceId);
            this.workspaceChangedDebounceId = undefined;
        }
        this.pendingWorkspaceDir = undefined;
        super.disconnectedCallback();
    }

    protected firstUpdated(changedProperties: Map<string, any>) {
        super.firstUpdated(changedProperties);
        this.setupDragAndDrop();
    }

    protected updated(changedProperties: Map<string, any>) {
        super.updated(changedProperties);
        if (changedProperties.has('workspaceDir') && this.workspaceDir) {
            this.setupDragAndDrop();
        }
    }

    private async initializeWorkspace() {
        const workspaceDir = await workspaceService.getWorkspace()
        await this.loadWorkspace(workspaceDir ?? undefined)
    }

    protected renderToolbar() {
        return html`
            <docks-command icon="folder-open" title="${t.CONNECT_WORKSPACE}" dropdown="filebrowser.connections"></docks-command>
            <docks-command cmd="refresh_resource" icon="repeat" title="${t.REFRESH_RESOURCE}"></docks-command>
            <docks-command icon="docks file-plus" title="${t.CREATE_NEW}" dropdown="filebrowser.create"></docks-command>
        `;
    }

    protected renderContextMenu() {
        const selection = activeSelectionSignal.get()
        const file = selection instanceof File ? selection : null
        const hasOpenWith = file && this.fileEditorOptions.length > 0
        return html`
            <docks-command cmd="open_editor" icon="folder-open">${t.OPEN}</docks-command>
            ${hasOpenWith ? html`
                <wa-dropdown-item>
                    ${icon('folder-open', { slot: 'icon' })}
                    ${t.OPEN_WITH}
                    ${this.fileEditorOptions.map(opt => html`
                        <docks-command
                            slot="submenu"
                            cmd="open_editor"
                            icon="${opt.icon ?? 'file'}"
                            .params=${{ path: file!.getWorkspacePath(), editorId: opt.editorId }}>
                            ${opt.title}
                        </docks-command>
                    `)}
                </wa-dropdown-item>
            ` : nothing}
            <docks-command icon="docks file-plus" dropdown="filebrowser.create">${t.CREATE_NEW}</docks-command>
        `;
    }

    onWorkspaceChanged(workspaceDir: Directory | undefined) {
        this.pendingWorkspaceDir = workspaceDir;
        if (this.workspaceChangedDebounceId !== undefined) {
            clearTimeout(this.workspaceChangedDebounceId);
        }
        this.workspaceChangedDebounceId = setTimeout(() => {
            this.workspaceChangedDebounceId = undefined;
            const dir = this.pendingWorkspaceDir;
            this.pendingWorkspaceDir = undefined;
            if (dir) this.applyWorkspaceChange(dir);
            else this.loadWorkspace(undefined, true);
        }, WORKSPACE_CHANGED_DEBOUNCE_MS);
    }

    private async applyWorkspaceChange(workspaceDir: Directory) {
        activeSelectionSignal.set(undefined);
        await this.loadWorkspace(workspaceDir, true);
        await this.syncTreeSelection();
    }

    async onWorkspaceConnected(workspaceDir: Directory | undefined) {
        activeSelectionSignal.set(undefined);
        await this.loadWorkspace(workspaceDir, true);
    }

    async loadWorkspace(workspaceDir?: Directory, forceRefresh = false) {
        this.treeBuildGeneration += 1;
        const buildGen = this.treeBuildGeneration;
        this.loadingNodes.clear();
        this.workspaceDir = workspaceDir;
        if (!workspaceDir) {
            this.root = undefined;
            if (this.settingsLoaded) {
                await this.persistSelectedPath(null);
            }
            return;
        }
        const root = await this.resourceToTreeNode(workspaceDir, true, forceRefresh);
        if (buildGen !== this.treeBuildGeneration) {
            return;
        }
        this.root = root;
        await this.restoreSelectionFromSettings();
        if (buildGen !== this.treeBuildGeneration) {
            return;
        }
    }

    private async persistSelectedPath(path: string | null) {
        await this.setDialogSetting({
            v: DocksFileBrowser.SETTINGS_VERSION,
            [DocksFileBrowser.SETTINGS_KEY_SELECTED_PATH]: path
        });
    }

    private async restoreSelectionFromSettings() {
        if (this.settingsLoaded) {
            return;
        }
        this.settingsLoaded = true;

        const persisted = await this.getDialogSetting();
        const selectedPath = persisted?.[DocksFileBrowser.SETTINGS_KEY_SELECTED_PATH];
        if (typeof selectedPath !== 'string' || selectedPath.length === 0) {
            return;
        }

        await this.updateComplete;

        const tree = this.treeRef.value?.querySelector('wa-tree') as any | null;
        if (!tree) return;

        if (typeof selectedPath === 'string' && selectedPath.length > 0) {
            const items = Array.from(tree.querySelectorAll('wa-tree-item')) as Array<any>;
            const match = items.find((item) => {
                const data = item?.model?.data as Resource | undefined;
                const path = data?.getWorkspacePath?.();
                return typeof path === 'string' && path === selectedPath;
            });
            if (match) {
                await this.selectTreeItem(match);
                return;
            }
        }

        await this.selectFirstConnectedFolder(tree);
    }

    private async selectTreeItem(item: any) {
        let parent = (item.parentElement as HTMLElement | null)?.closest?.('wa-tree-item') as any | null;
        while (parent) {
            parent.expanded = true;
            parent = (parent.parentElement as HTMLElement | null)?.closest?.('wa-tree-item') as any | null;
        }

        item.selected = true;
        await this.syncTreeSelection();
    }

    private async selectFirstConnectedFolder(tree: any) {
        const topLevelItems = Array.from(tree.children).filter(
            (child) => child instanceof HTMLElement && child.tagName.toLowerCase() === 'wa-tree-item'
        ) as Array<any>;
        if (topLevelItems.length === 0) return;

        const firstFolderItem = topLevelItems.find((item) => item?.model?.data instanceof Directory);
        const fallbackItem = firstFolderItem ?? topLevelItems[0];
        await this.selectTreeItem(fallbackItem);
    }

    private async syncTreeSelection() {
        await this.updateComplete
        const waTree = this.treeRef.value?.querySelector('wa-tree')
        // @ts-ignore
        const selectedItems = waTree?.selectedItems || []
        if (selectedItems.length > 0) {
            // @ts-ignore
            activeSelectionSignal.set(selectedItems[0].model?.data)
        }
    }

    async resourceToTreeNode(resource: Resource, loadChildren = false, forceRefreshChildren = false): Promise<TreeNode> {
        const buildGen = this.treeBuildGeneration;
        const isFile = resource instanceof File;
        const node: TreeNode = {
            data: resource,
            label: resource.getName(),
            leaf: isFile,
            children: []
        };

        if (resource instanceof Directory && !resource.getParent()) {
            // Root workspace directory: attach workspace metadata (name) so the
            // tree renderer can show a small backend tag without knowing about
            // concrete backend types.
            try {
                const info = await workspaceService.getFolderInfoForDirectory(resource);
                if (buildGen !== this.treeBuildGeneration) {
                    node.loaded = !node.leaf;
                    return node;
                }
                if (info?.backendName) {
                    node.workspaceTag = info.backendName;
                }
            } catch (e) {
                logger.debug('Failed to get workspace info for directory', e);
            }
        }

        if (resource instanceof Directory && loadChildren) {
            try {
                const children = await resource.listChildren(forceRefreshChildren);
                if (buildGen !== this.treeBuildGeneration) {
                    node.loaded = true;
                    return node;
                }
                for (const childResource of children) {
                    if (HIDE_DOT_RESOURCE && childResource.getName().startsWith(".")) {
                        continue;
                    }
                    const child = await this.resourceToTreeNode(childResource, true, forceRefreshChildren);
                    if (buildGen !== this.treeBuildGeneration) {
                        node.loaded = true;
                        return node;
                    }
                    node.children.push(child);
                }
                node.children.sort(treeNodeComparator);
            } catch (error) {
                if (buildGen !== this.treeBuildGeneration) {
                    node.loaded = true;
                    return node;
                }
                if (!(await workspaceService.isResourceInCurrentWorkspace(resource))) {
                    node.loaded = true;
                    return node;
                }
                const detail = error instanceof Error ? error.message : String(error);
                node.loadError = detail;
                logger.error('Failed to load directory children:', error);
            }
            // Mark directory as loaded even if it has no children or loading failed,
            // so empty folders don't stay in a perpetual "loading" state.
            node.loaded = true;
        }

        if (resource instanceof UnavailableWorkspaceFolderDirectory) {
            node.placeholderNotice = resource.getFailureReason();
        }

        return node;
    }

    createTreeItems(node: TreeNode, expanded = false): TemplateResult {
        if (!node) {
            return html``
        }

        // Treat a directory as "lazy" only if its children
        // have never been loaded. Once loaded (even if empty),
        // we clear the lazy flag so the progress ring disappears.
        const isLazy = !node.leaf && !node.loaded;
        const resource = node.data as Resource;
        const isFile = resource instanceof File;
        const isDraggable = !!resource.getParent();
        const iconSpec = isFile
            ? editorRegistry.getFileIcon(resource.getName())
            : (node.icon || "folder-open");
        const workspaceTag = node.workspaceTag;
        const loadError = node.loadError;
        const placeholderNotice = node.placeholderNotice;
        const issueText = loadError
            ? t.FOLDER_LOAD_FAILED({ detail: loadError })
            : placeholderNotice
              ? t.FOLDER_UNAVAILABLE({ detail: placeholderNotice })
              : null;

        return html`
            <wa-tree-item 
                draggable=${isDraggable}
                @dragstart=${isDraggable ? this.nobubble((e: Event) => this.onDragStart(e as DragEvent, resource)) : undefined}
                @dblclick=${this.nobubble(this.onFileDoubleClicked)}
                @wa-lazy-load=${this.nobubble((e: Event) => this.onLazyLoad(e, node))}
                .model=${node} 
                ?expanded=${expanded}
                ?lazy=${isLazy}>
                <div class="tree-item-rows">
                    <div class="tree-item-label-row">
                        <span class="tree-label">
                            ${icon(iconSpec, { label: node.leaf ? t.FILE : t.FOLDER })}
                            <span class="tree-label-text">${node.label}</span>
                            ${!node.leaf && workspaceTag
                                ? html`<wa-badge appearance="outlined" variant="neutral" style="font-size: var(--wa-font-size-xs);">${workspaceTag}</wa-badge>`
                                : null}
                        </span>
                    </div>
                    ${issueText
                        ? html`<div class="tree-item-detail-row tree-item-error-text">${issueText}</div>`
                        : nothing}
                </div>
                ${node.children.map(child => this.createTreeItems(child, false))}
            </wa-tree-item>`
    }

    private onDragStart(e: DragEvent, resource: Resource) {
        if (!e.dataTransfer) return;

        // Do not allow dragging the synthetic workspace root node.
        if (!resource.getParent()) return;

        const currentTarget = e.currentTarget as HTMLElement | null;
        const tree = currentTarget?.closest('wa-tree') as any | null;

        const selectedItems: Array<{ model?: TreeNode }> = Array.isArray(tree?.selectedItems)
            ? tree.selectedItems
            : [];

        const resources: Resource[] = [];

        if (selectedItems.length > 0) {
            for (const item of selectedItems) {
                const node = item.model as TreeNode | undefined;
                const data = node?.data as Resource | undefined;
                if (data && data.getParent()) {
                    resources.push(data);
                }
            }
        }

        if (resources.length === 0) {
            resources.push(resource);
        }

        const workspacePaths = resources.map(r => r.getWorkspacePath());
        const primaryName = resources.length === 1 ? resources[0].getName() : `${resources.length} items`;

        e.dataTransfer.effectAllowed = 'copyMove';
        const payload = workspacePaths.join('\n');

        e.dataTransfer.setData('text/plain', payload);
        e.dataTransfer.setData('application/x-workspace-file', payload);
        e.dataTransfer.setData('text/uri-list', payload);

        if (e.dataTransfer.setDragImage) {
            const dragImage = document.createElement('div');
            dragImage.textContent = primaryName;
            dragImage.style.position = 'absolute';
            dragImage.style.top = '-1000px';
            dragImage.style.padding = '4px 8px';
            dragImage.style.background = 'var(--wa-color-neutral-10)';
            dragImage.style.border = '1px solid var(--wa-color-neutral-30)';
            dragImage.style.borderRadius = '4px';
            document.body.appendChild(dragImage);
            e.dataTransfer.setDragImage(dragImage, 0, 0);
            setTimeout(() => document.body.removeChild(dragImage), 0);
        }
    }

    private async onLazyLoad(event: Event, node: TreeNode) {
        const resource = node.data as Resource;
        if (resource instanceof Directory && node.children.length === 0) {
            await this.loadNodeChildren(node, resource);
        }
    }

    private async loadNodeChildren(node: TreeNode, resource: Directory) {
        if (this.loadingNodes.has(node)) {
            return;
        }

        const buildGen = this.treeBuildGeneration;
        this.loadingNodes.add(node);
        try {
            const children = await resource.listChildren(false);
            if (buildGen !== this.treeBuildGeneration) {
                return;
            }
            for (const childResource of children) {
                if (HIDE_DOT_RESOURCE && childResource.getName().startsWith(".")) {
                    continue;
                }
                const child = await this.resourceToTreeNode(childResource, false);
                if (buildGen !== this.treeBuildGeneration) {
                    return;
                }
                node.children.push(child);
            }
            node.children.sort(treeNodeComparator);
            // Children have now been loaded at least once (even if none remain
            // after filtering), so mark the node as loaded to disable lazy mode.
            node.loaded = true;
            this.requestUpdate();
        } catch (error) {
            if (buildGen !== this.treeBuildGeneration) {
                return;
            }
            if (!(await workspaceService.isResourceInCurrentWorkspace(resource))) {
                node.loaded = true;
                this.requestUpdate();
                return;
            }
            const detail = error instanceof Error ? error.message : String(error);
            node.loadError = detail;
            logger.error('Failed to load directory children:', error);
            this.requestUpdate();
        } finally {
            this.loadingNodes.delete(node);
        }
    }

    async onFileDoubleClicked(event: Event) {
        const item = event.currentTarget as HTMLElement & { model?: TreeNode; expanded?: boolean };
        const node = item.model;
        if (!node) {
            return;
        }

        const resource = node.data as Resource;
        if (resource instanceof File) {
            activeSelectionSignal.set(resource);
            void this.executeCommand("open_editor", {});
            return;
        }

        if (!node.leaf && "expanded" in item) {
            item.expanded = !item.expanded;
        }
    }

    onSelectionChanged(event: Event) {
        // @ts-ignore
        const selection = event.detail.selection
        if (selection && selection.length > 0) {
            const node: TreeNode = selection[0].model
            const data = node.data
            activeSelectionSignal.set(data)
            const resource = data as Resource;
            const path = resource?.getWorkspacePath?.();
            if (typeof path === 'string') {
                this.persistSelectedPath(path);
            } else {
                this.persistSelectedPath(null);
            }
            if (data instanceof File) {
                this.fileEditorOptions = editorRegistry.getEditorOptionsForInput(data)
            } else {
                this.fileEditorOptions = []
            }
        } else {
            activeSelectionSignal.set(undefined)
            this.persistSelectedPath(null);
            this.fileEditorOptions = []
        }
    }

    private currentDropTarget?: HTMLElement;

    private getDirectoryDropTargetFromEvent(e: DragEvent): Directory | undefined {
        if (!this.workspaceDir) return undefined;

        const target = e.target as HTMLElement;
        const treeItem = target.closest('wa-tree-item');
        if (!treeItem) {
            const connectedRoots = this.root?.children ?? [];
            if (connectedRoots.length !== 1) {
                return undefined;
            }
            const singleRootResource = connectedRoots[0]?.data;
            return singleRootResource instanceof Directory ? singleRootResource : undefined;
        }

        const node: TreeNode | undefined = (treeItem as WaTreeItemElement).model;
        const resource = node?.data as Resource | undefined;
        if (resource instanceof Directory) {
            return resource;
        }
        return undefined;
    }

    private setupDragAndDrop() {
        const treeElement = this.treeRef.value;
        if (!treeElement) return;

        const dragOverHandler = (e: DragEvent) => {
            const types = e.dataTransfer?.types;
            if (!types) return;

            const isOsFileDrop = types.includes('Files');
            const isWorkspaceDrop = types.includes('application/x-workspace-file');
            if (!isOsFileDrop && !isWorkspaceDrop) return;

            const targetDir = this.getDirectoryDropTargetFromEvent(e);
            if (!targetDir) {
                this.currentDropTarget?.classList.remove('drop-target');
                this.currentDropTarget = undefined;
                treeElement.classList.remove('drag-over');
                return;
            }

            e.preventDefault();
            if (e.dataTransfer) {
                if (isWorkspaceDrop) {
                    e.dataTransfer.dropEffect = (e.ctrlKey || e.metaKey) ? 'copy' : 'move';
                } else {
                    e.dataTransfer.dropEffect = 'copy';
                }
            }

            treeElement.classList.add('drag-over');

            const target = e.target as HTMLElement;
            const treeItem = target.closest('wa-tree-item') as HTMLElement;

            if (!treeItem) {
                this.currentDropTarget?.classList.remove('drop-target');
                this.currentDropTarget = undefined;
                return;
            }

            if (treeItem !== this.currentDropTarget) {
                this.currentDropTarget?.classList.remove('drop-target');
                this.currentDropTarget = treeItem;
                treeItem.classList.add('drop-target');
            }
        };

        const dragEnterHandler = (e: DragEvent) => {
            const types = e.dataTransfer?.types;
            if (!types) return;

            const isOsFileDrop = types.includes('Files');
            const isWorkspaceDrop = types.includes('application/x-workspace-file');
            if (!isOsFileDrop && !isWorkspaceDrop) return;

            const targetDir = this.getDirectoryDropTargetFromEvent(e);
            if (!targetDir) return;

            e.preventDefault();
            treeElement.classList.add('drag-over');
        };

        const dragLeaveHandler = (e: DragEvent) => {
            const rect = treeElement.getBoundingClientRect();
            const x = e.clientX;
            const y = e.clientY;

            if (x <= rect.left || x >= rect.right || y <= rect.top || y >= rect.bottom) {
                treeElement.classList.remove('drag-over');
                this.currentDropTarget?.classList.remove('drop-target');
                this.currentDropTarget = undefined;
            }
        };

        const dropHandler = async (e: DragEvent) => {
            e.preventDefault();
            treeElement.classList.remove('drag-over');
            this.currentDropTarget?.classList.remove('drop-target');
            this.currentDropTarget = undefined;

            if (!e.dataTransfer || !this.workspaceDir) return;

            const targetDir = this.getDirectoryDropTargetFromEvent(e);
            if (!targetDir) return;
            const types = e.dataTransfer.types;

            if (types.includes('Files')) {
                const files = Array.from(e.dataTransfer.files);
                if (files.length === 0) return;
                await this.handleFilesDrop(files, targetDir);
                return;
            }

            if (types.includes('application/x-workspace-file')) {
                await this.handleWorkspaceDrop(e, targetDir);
                return;
            }
        };

        treeElement.removeEventListener('dragover', dragOverHandler as any);
        treeElement.removeEventListener('dragenter', dragEnterHandler as any);
        treeElement.removeEventListener('dragleave', dragLeaveHandler as any);
        treeElement.removeEventListener('drop', dropHandler as any);

        treeElement.addEventListener('dragover', dragOverHandler);
        treeElement.addEventListener('dragenter', dragEnterHandler);
        treeElement.addEventListener('dragleave', dragLeaveHandler);
        treeElement.addEventListener('drop', dropHandler);
    }

    private async handleWorkspaceDrop(e: DragEvent, targetDir: Directory) {
        if (!e.dataTransfer) return;

        const payload = e.dataTransfer.getData('application/x-workspace-file');
        if (!payload) return;

        const paths = payload
            .split(/\r?\n/)
            .map(p => p.trim())
            .filter(p => !!p);

        if (paths.length === 0) return;

        const workspace = await workspaceService.getWorkspace();
        if (!workspace) {
            logger.warn('Workspace drop ignored because no workspace is connected');
            return;
        }

        const moveWithinSameBackend = async (src: Resource): Promise<boolean> => {
            const srcRoot = src.getWorkspace();
            const destRoot = targetDir.getWorkspace();
            if (!srcRoot || !destRoot) return false;

            // Only allow move when source and destination share the same backend root.
            return srcRoot === destRoot && !(e.ctrlKey || e.metaKey);
        };

        const srcRoots = new Set<Directory>();
        const destRoot = targetDir.getWorkspace();

        let processed = 0;
        let failed = 0;

        const sources: { path: string; resource: Resource }[] = [];

        for (const path of paths) {
            try {
                const src = await workspace.getResource(path);
                if (!src) {
                    logger.warn(`Workspace drop: source not found for path "${path}"`);
                    failed++;
                    continue;
                }

                sources.push({ path, resource: src });
                const root = src.getWorkspace();
                if (root) {
                    srcRoots.add(root);
                }
            } catch (error) {
                logger.error(`Failed to handle workspace drop for "${path}":`, error);
                failed++;
            }
        }

        if (sources.length === 0) {
            if (failed > 0) {
                logger.info(`Workspace drop failed for ${failed} item(s)`);
            }
            return;
        }

        let isCrossConnection = false;
        if (destRoot) {
            for (const root of srcRoots) {
                if (root !== destRoot) {
                    isCrossConnection = true;
                    break;
                }
            }
        }

        if (isCrossConnection && destRoot) {
            try {
                const srcRootsArray = Array.from(srcRoots);
                const srcInfo = await workspaceService.getFolderInfoForDirectory(
                    srcRootsArray[0]
                );
                const destInfo = await workspaceService.getFolderInfoForDirectory(destRoot);
                const srcBackend = srcInfo?.backendName ?? t.UNKNOWN_BACKEND;
                const destBackend = destInfo?.backendName ?? t.UNKNOWN_BACKEND;

                const confirmed = await confirmDialog(t.DND_CROSS_CONNECTION_CONFIRM({
                    count: String(sources.length),
                    srcBackend,
                    destBackend
                }));
                if (!confirmed) {
                    return;
                }
            } catch (err) {
                logger.debug('Failed to resolve cross-connection info for DnD', err);
            }
        }

        for (const { path, resource } of sources) {
            try {
                const move = await moveWithinSameBackend(resource);
                await workspaceService.copyResource(resource, targetDir, { move });
                processed++;
            } catch (error) {
                logger.error(`Failed to handle workspace drop for "${path}":`, error);
                failed++;
            }
        }

        logger.info(
            `Workspace drop completed: ${processed}/${sources.length} items ${failed > 0 ? `, ${failed} failed` : ''}`
        );

        await this.loadWorkspace(this.workspaceDir, true);
    }

    private async handleFilesDrop(files: globalThis.File[], targetDir: Directory) {
        const total = files.length;
        let processed = 0;
        let failed = 0;
        let skipped = 0;

            for (const file of files) {
            try {
                const targetPath = this.buildTargetPath(targetDir, file.name);

                const existingFile = await this.workspaceDir!.getResource(targetPath);
                if (existingFile) {
                    const overwrite = await confirmDialog(t.FILE_EXISTS_OVERWRITE({ fileName: file.name }));
                    if (!overwrite) {
                        skipped++;
                        continue;
                    }
                }

                const workspaceFile = await this.workspaceDir!.getResource(
                    targetPath,
                    { create: true }
                ) as File;

                await workspaceFile.saveContents(file);

                processed++;
            } catch (error) {
                logger.error(`Failed to upload ${file.name}:`, error);
                failed++;
            }
        }

        logger.info(`Uploaded ${processed}/${total} files${skipped > 0 ? `, ${skipped} skipped` : ''}${failed > 0 ? `, ${failed} failed` : ''}`);

        await this.loadWorkspace(this.workspaceDir);
    }

    private buildTargetPath(targetDir: Directory, fileName: string): string {
        const dirPath = targetDir.getWorkspacePath();
        return dirPath ? `${dirPath}/${fileName}` : fileName;
    }

    protected renderContent() {
        return html`
            <div class="tree" ${ref(this.treeRef)} style="--drop-files-text: '${t.DROP_FILES_HERE}'">
                ${when(!this.workspaceDir, () => html`
                    <docks-no-content message="${t.SELECT_WORKSPACE}"></docks-no-content>`, () => when(this.root, () => html`
                <wa-tree @wa-selection-change=${this.nobubble(this.onSelectionChanged)}
                         style="--indent-guide-width: 1px;">
                    ${this.root!.children.map(child => this.createTreeItems(child, true))}
                </wa-tree>`, () => html``))}
            </div>
        `
    }

    static styles = css`
        :host {
        }
        
        .tree {
            height: 100%;
            position: relative;
            transition: all 0.2s ease;
        }
        
        .tree.drag-over {
            background-color: var(--wa-color-brand-fill-quiet);
            outline: 2px dashed var(--wa-color-brand-border-normal);
            outline-offset: -4px;
            border-radius: var(--wa-border-radius-medium);
        }
        
        .tree.drag-over::before {
            content: var(--drop-files-text);
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--wa-color-brand-fill-loud);
            color: var(--wa-color-brand-on-loud);
            padding: var(--wa-spacing-large);
            border-radius: var(--wa-border-radius-large);
            font-weight: bold;
            pointer-events: none;
            z-index: 1000;
            opacity: 0.3;
        }

        .tree-item-rows {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: var(--wa-space-2xs);
            min-width: 0;
            width: 100%;
        }

        .tree-item-label-row {
            min-width: 0;
        }

        .tree-item-detail-row {
            width: 100%;
            min-width: 0;
            box-sizing: border-box;
            overflow-wrap: anywhere;
        }

        .tree-item-error-text {
            font-size: var(--wa-font-size-s);
            line-height: var(--wa-line-height-normal);
            color: var(--wa-color-danger-text, #c62828);
        }

        .tree-label {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
        }

        .tree-label-text {
            white-space: nowrap;
        }

        wa-tree-item.drop-target {
            background-color: var(--wa-color-brand-fill-loud);
            color: var(--wa-color-brand-on-loud);
            border-radius: var(--wa-border-radius-small);
            outline: 2px solid var(--wa-color-brand-border-loud);
            outline-offset: -2px;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'docks-filebrowser': DocksFileBrowser
    }
}
