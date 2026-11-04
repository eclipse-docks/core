import { html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { DocksDialogContent } from "../parts/dialog-content";
import type { PropertyValues } from "lit";
import { contributionRegistry } from "../core/contributionregistry";
import {
  DIALOG_CONTRIBUTION_TARGET,
  OK_BUTTON,
  CANCEL_BUTTON,
  type DialogContribution,
  dialogService,
} from "../core/dialogservice";
import { Directory, File, type Resource, workspaceService } from "../core/filesys";

export type FilebrowserDialogMode = "file" | "directory" | "either";

@customElement("docks-filebrowser-dialog")
export class DocksFilebrowserDialog extends DocksDialogContent {
  @property({ type: String })
  mode: FilebrowserDialogMode = "either";

  @state()
  private selectedPath: string | null = null;

  @state()
  private rootNodes: TreeNode[] = [];

  @state()
  private loading = false;

  @state()
  private loadError: string | null = null;

  static styles = [
    ...DocksDialogContent.styles,
    css`
      :host {
        min-width: 0;
        overflow-x: hidden;
        display: block;
      }

      .dialog-body {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        min-width: 0;
        min-height: 320px;
        max-height: 600px;
        overflow-x: hidden;
      }

      .browser-container {
        flex: 1;
        min-height: 240px;
        min-width: 0;
        overflow: hidden;
        overflow-x: hidden;
      }

      .browser-container wa-tree {
        min-width: 0;
        overflow-x: hidden;
      }

      .tree-label {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }

      .selection-info {
        font-size: 0.85em;
        opacity: 0.8;
      }
    `,
  ];

  protected async doInitUI() {
    await this.loadWorkspaceTree();
  }

  firstUpdated(changed: PropertyValues) {
    super.firstUpdated?.(changed);
    const dialog = this.closest("wa-dialog");
    if (dialog) dialog.setAttribute("label", this.dialogTitle);
  }

  updated(changed: PropertyValues) {
    super.updated?.(changed);
    if (changed.has("mode")) {
      const dialog = this.closest("wa-dialog");
      if (dialog) dialog.setAttribute("label", this.dialogTitle);
    }
  }

  private get dialogTitle(): string {
    if (this.mode === "file") return "Choose a file";
    if (this.mode === "directory") return "Choose a directory";
    return "Choose a file or directory";
  }

  getResult(): string | null {
    return this.selectedPath != null ? "/" + this.selectedPath : null;
  }

  private async loadWorkspaceTree() {
    this.loading = true;
    this.loadError = null;
    try {
      const workspaceDir = await workspaceService.getWorkspace();
      if (!workspaceDir) {
        this.rootNodes = [];
        return;
      }
      const children = await workspaceDir.listChildren(false);
      const nodes: TreeNode[] = [];
      for (const child of children) {
        nodes.push(await this.resourceToTreeNode(child, false));
      }
      nodes.sort((a, b) => a.label.localeCompare(b.label));
      this.rootNodes = nodes;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      this.loadError = msg;
      this.rootNodes = [];
    } finally {
      this.loading = false;
      await this.selectFirstFolder();
    }
  }

  private async resourceToTreeNode(resource: Resource, loadChildren = true): Promise<TreeNode> {
    const isFile = resource instanceof File;
    const node: TreeNode = {
      resource,
      label: resource.getName(),
      leaf: isFile,
      children: [],
    };

    if (resource instanceof Directory && loadChildren) {
      for (const child of await resource.listChildren(false)) {
        node.children.push(await this.resourceToTreeNode(child, false));
      }
      node.children.sort((a, b) => a.label.localeCompare(b.label));
    }

    return node;
  }

  private workspacePath(resource: Resource): string | null {
    const path = resource.getWorkspacePath();
    return typeof path === "string" ? path : null;
  }

  private async selectFirstFolder(): Promise<void> {
    if (this.mode !== "directory" || this.selectedPath) return;
    const folder = this.rootNodes.find((node) => node.resource instanceof Directory);
    if (!folder) return;
    this.selectedPath = this.workspacePath(folder.resource);
    await this.updateComplete;
    const items = this.renderRoot.querySelectorAll("wa-tree-item");
    for (const item of items) {
      const node = (item as HTMLElement & { model?: TreeNode }).model;
      if (!node || !this.isSelected(node)) continue;
      (item as HTMLElement & { selected: boolean }).selected = true;
      return;
    }
  }

  private isSelected(node: TreeNode): boolean {
    return this.selectedPath != null && this.workspacePath(node.resource) === this.selectedPath;
  }

  private handleSelectionChange(e: CustomEvent) {
    const selection = (e.detail && (e.detail as any).selection) || [];
    if (!selection || selection.length === 0) {
      this.selectedPath = null;
      this.requestUpdate();
      return;
    }

    const node = selection[0]?.model as TreeNode | undefined;
    const resource = node?.resource;
    if (!resource) {
      this.selectedPath = null;
      this.requestUpdate();
      return;
    }

    const isDir = resource instanceof Directory;
    const isFile = resource instanceof File;
    if (this.mode === "file" && !isFile) {
      this.selectedPath = null;
      this.requestUpdate();
      return;
    }
    if (this.mode === "directory" && isFile) {
      const parent = (resource as File).getParent?.() as Directory | undefined;
      this.selectedPath = parent ? parent.getWorkspacePath() : null;
      this.requestUpdate();
      return;
    }
    if (this.mode === "directory" && !isDir) {
      this.selectedPath = null;
      this.requestUpdate();
      return;
    }
    this.selectedPath = this.workspacePath(resource);
    this.requestUpdate();
  }

  private renderTreeNode(node: TreeNode): unknown {
    return html`
      <wa-tree-item .model=${node} ?leaf=${node.leaf} .selected=${this.isSelected(node)}>
        ${node.label}
        ${node.children.map((child) => this.renderTreeNode(child))}
      </wa-tree-item>
    `;
  }

  render() {
    return html`
      <div class="dialog-body">
        ${this.loadError ? this.renderMessage(this.loadError, false) : null}

        <div class="browser-container">
          ${this.loading
            ? html`<div>Loading workspace…</div>`
            : this.rootNodes.length > 0
                ? html`
                    <wa-tree @wa-selection-change=${(e: Event) => this.handleSelectionChange(e as CustomEvent)}>
                      ${this.rootNodes.map((node) => this.renderTreeNode(node))}
                    </wa-tree>
                  `
                : html`<div>No workspace folders.</div>`}
        </div>

        <div class="selection-info">
          ${this.selectedPath ? `Selected path: ${this.selectedPath}` : "No path selected yet."}
        </div>
      </div>
    `;
  }
}

interface TreeNode {
  resource: Resource;
  label: string;
  leaf: boolean;
  children: TreeNode[];
}

declare global {
  interface HTMLElementTagNameMap {
    "docks-filebrowser-dialog": DocksFilebrowserDialog;
  }
}

export interface FilebrowserDialogState {
  resolve: (path: string | null) => void;
  mode?: FilebrowserDialogMode;
}

contributionRegistry.registerContribution<DialogContribution>(DIALOG_CONTRIBUTION_TARGET, {
  id: "filebrowser-dialog",
  label: "Select Path",
  buttons: [OK_BUTTON, CANCEL_BUTTON],
  component: (state?: FilebrowserDialogState) =>
    html`<docks-filebrowser-dialog .mode=${state?.mode ?? "either"}></docks-filebrowser-dialog>`,
  onButton: async (id: string, result: any, state?: FilebrowserDialogState) => {
    if (!state) return true;
    if (id === "ok") {
      state.resolve(result || null);
    } else {
      state.resolve(null);
    }
    return true;
  },
});

export function filebrowserDialog(mode: FilebrowserDialogMode = "either"): Promise<string | null> {
  return new Promise((resolve) => {
    dialogService.open("filebrowser-dialog", { resolve, mode });
  });
}

