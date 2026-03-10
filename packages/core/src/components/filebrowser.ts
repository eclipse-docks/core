
import { css, html, TemplateResult, nothing } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { LyraPart } from "../parts/part";
import {
    Directory,
    File,
    Resource,
    TOPIC_WORKSPACE_CHANGED,
    TOPIC_WORKSPACE_CONNECTED,
    workspaceService
} from "../core/filesys";
import { when } from "lit/directives/when.js";
import { subscribe } from "../core/events";
import { createRef, ref } from "lit/directives/ref.js";
import { HIDE_DOT_RESOURCE } from "../core/constants";

import { TreeNode, treeNodeComparator } from "../core/tree-utils";
import { activeSelectionSignal } from "../core/appstate";
import { confirmDialog } from "../dialogs";
import { editorRegistry } from "../core/editorregistry";
import { TOPIC_CONTRIBUTEIONS_CHANGED, type ContributionChangeEvent } from '../core/contributionregistry';
import { i18n } from '../core/i18n';

const t = await i18n(import.meta.glob('./filebrowser*.json'));

const WORKSPACE_CHANGED_DEBOUNCE_MS = 250;

@customElement('lyra-filebrowser')
export class LyraFileBrowser extends LyraPart {

    @state()
    private root?: TreeNode;
    @state()
    private fileEditorOptions: Array<{ editorId: string; title: string; icon?: string }> = [];
    private workspaceDir?: Directory
    private treeRef = createRef<HTMLElement>();
    private loadingNodes = new Set<TreeNode>();
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
            <lyra-command icon="folder-open" title="${t.CONNECT_WORKSPACE}" dropdown="filebrowser.connections"></lyra-command>
            <lyra-command cmd="refresh_resource" icon="repeat" title="${t.REFRESH_RESOURCE}"></lyra-command>
            <lyra-command cmd="touch" icon="plus" title="${t.CREATE_NEW}" dropdown="filebrowser.create"></lyra-command>
        `;
    }

    protected renderContextMenu() {
        const selection = activeSelectionSignal.get()
        const file = selection instanceof File ? selection : null
        const hasOpenWith = file && this.fileEditorOptions.length > 0
        return html`
            <lyra-command cmd="open_editor" icon="folder-open">${t.OPEN}</lyra-command>
            ${hasOpenWith ? html`
                <wa-dropdown-item>
                    <lyra-icon name="folder-open" slot="icon"></lyra-icon>
                    ${t.OPEN_WITH}
                    ${this.fileEditorOptions.map(opt => html`
                        <lyra-command
                            slot="submenu"
                            cmd="open_editor"
                            icon="${opt.icon ?? 'file'}"
                            .params=${{ path: file!.getWorkspacePath(), editorId: opt.editorId }}>
                            ${opt.title}
                        </lyra-command>
                    `)}
                </wa-dropdown-item>
            ` : nothing}
            <lyra-command cmd="touch" icon="plus" dropdown="filebrowser.create">${t.CREATE_NEW}</lyra-command>
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
        await this.loadWorkspace(workspaceDir, true);
    }

    async loadWorkspace(workspaceDir?: Directory, forceRefresh = false) {
        this.workspaceDir = workspaceDir
        if (!workspaceDir) {
            this.root = undefined
        } else {
            this.root = await this.resourceToTreeNode(workspaceDir, true, forceRefresh)
        }
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
                if (info?.backendName) {
                    (node as any).workspaceTag = info.backendName;
                }
            } catch (e) {
                // Fail silently; tag is purely cosmetic.
                console.warn('Failed to get workspace info for directory', e);
            }
        }

        if (resource instanceof Directory && loadChildren) {
            for (const childResource of await resource.listChildren(forceRefreshChildren)) {
                if (HIDE_DOT_RESOURCE && childResource.getName().startsWith(".")) {
                    continue
                }
                const child = await this.resourceToTreeNode(childResource, true);
                node.children.push(child);
            }
            node.children.sort(treeNodeComparator)
        }

        return node;
    }

    createTreeItems(node: TreeNode, expanded = false): TemplateResult {
        if (!node) {
            return html``
        }

        const isLazy = !node.leaf && node.children.length === 0;
        const resource = node.data as Resource;
        const isFile = resource instanceof File;
        const icon = isFile
            ? editorRegistry.getFileIcon(resource.getName())
            : (node.icon || "folder-open");
        const workspaceTag = (node as any).workspaceTag as string | undefined;

        return html`
            <wa-tree-item 
                draggable=${isFile}
                @dragstart=${isFile ? this.nobubble((e: Event) => this.onDragStart(e as DragEvent, resource as File)) : undefined}
                @dblclick=${this.nobubble(this.onFileDoubleClicked)}
                @wa-lazy-load=${this.nobubble((e: Event) => this.onLazyLoad(e, node))}
                .model=${node} 
                ?expanded=${expanded}
                ?lazy=${isLazy}>
                <span class="tree-label">
                    <wa-icon name=${icon} label="${node.leaf ? t.FILE : t.FOLDER}"></wa-icon>
                    <span class="tree-label-text">${node.label}</span>
                    ${!node.leaf && workspaceTag
                        ? html`<wa-badge appearance="outlined" variant="neutral" style="font-size: var(--wa-font-size-xs);">${workspaceTag}</wa-badge>`
                        : null}
                </span>
                ${node.children.map(child => this.createTreeItems(child, false))}
            </wa-tree-item>`
    }

    private onDragStart(e: DragEvent, file: File) {
        if (!e.dataTransfer) return;

        const filePath = file.getWorkspacePath();
                const fileName = file.getName();

        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('text/plain', filePath);
        e.dataTransfer.setData('application/x-workspace-file', filePath);
        e.dataTransfer.setData('text/uri-list', filePath);

        if (e.dataTransfer.setDragImage) {
            const dragImage = document.createElement('div');
            dragImage.textContent = fileName;
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

        this.loadingNodes.add(node);
        try {
            for (const childResource of await resource.listChildren(false)) {
                if (HIDE_DOT_RESOURCE && childResource.getName().startsWith(".")) {
                    continue
                }
                const child = await this.resourceToTreeNode(childResource, false);
                node.children.push(child);
            }
            node.children.sort(treeNodeComparator);
            this.requestUpdate();
        } catch (error) {
            console.error('Failed to load directory children:', error);
        } finally {
            this.loadingNodes.delete(node);
        }
    }

    async onFileDoubleClicked(event: Event) {
        // @ts-ignore
        const node: TreeNode = event.currentTarget.model
        const resource = node.data as Resource
        if (resource instanceof File) {
            activeSelectionSignal.set(resource)
            this.executeCommand("open_editor", {})
        }
    }

    onSelectionChanged(event: Event) {
        // @ts-ignore
        const selection = event.detail.selection
        if (selection && selection.length > 0) {
            const node: TreeNode = selection[0].model
            const data = node.data
            activeSelectionSignal.set(data)
            if (data instanceof File) {
                this.fileEditorOptions = editorRegistry.getEditorOptionsForInput(data)
                this.updateContextMenu()
            } else {
                this.fileEditorOptions = []
                this.updateContextMenu()
            }
        } else {
            activeSelectionSignal.set(undefined)
            this.fileEditorOptions = []
            this.updateContextMenu()
        }
    }

    private currentDropTarget?: HTMLElement;

    private setupDragAndDrop() {
        const treeElement = this.treeRef.value;
        if (!treeElement) return;

        const dragOverHandler = (e: DragEvent) => {
            if (!e.dataTransfer?.types.includes('Files')) return;

            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';

            treeElement.classList.add('drag-over');

            const target = e.target as HTMLElement;
            const treeItem = target.closest('wa-tree-item') as HTMLElement;

            if (treeItem && treeItem !== this.currentDropTarget) {
                this.currentDropTarget?.classList.remove('drop-target');
                this.currentDropTarget = treeItem;
                treeItem.classList.add('drop-target');
            }
        };

        const dragEnterHandler = (e: DragEvent) => {
            if (!e.dataTransfer?.types.includes('Files')) return;

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

            const files = Array.from(e.dataTransfer.files);
            if (files.length === 0) return;

            const targetDir = await this.getDropTarget(e);
            await this.handleFilesDrop(files, targetDir);
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

    private async getDropTarget(e: DragEvent): Promise<Directory> {
        const target = e.target as HTMLElement;
        const treeItem = target.closest('wa-tree-item');

        if (treeItem) {
            const node: TreeNode = (treeItem as any).model;
            const resource = node.data as Resource;

            if (resource instanceof Directory) {
                return resource;
            }
            const parent = resource.getParent();
            if (parent) {
                return parent;
            }
        }

        return this.workspaceDir!;
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
                console.error(`Failed to upload ${file.name}:`, error);
                failed++;
            }
        }

        console.log(`Uploaded ${processed}/${total} files${skipped > 0 ? `, ${skipped} skipped` : ''}${failed > 0 ? `, ${failed} failed` : ''}`);

        await this.loadWorkspace(this.workspaceDir);
    }

    private buildTargetPath(targetDir: Directory, fileName: string): string {
        const dirPath = targetDir.getWorkspacePath();
        return dirPath ? `${dirPath}/${fileName}` : fileName;
    }

    render() {
        return html`
            <div class="tree" ${ref(this.treeRef)} style="--drop-files-text: '${t.DROP_FILES_HERE}'">
                ${when(!this.workspaceDir, () => html`
                    <lyra-no-content message="${t.SELECT_WORKSPACE}"></lyra-no-content>`, () => when(this.root, () => html`
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
        'lyra-filebrowser': LyraFileBrowser
    }
}
