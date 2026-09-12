import {
    css,
    html,
    TemplateResult,
    customElement,
    state,
    createRef,
    ref,
} from "@eclipse-docks/core/externals/lit";
import {
    DocksPart,
    TreeContribution,
    TreeNode,
    contributionRegistry,
    activePartSignal,
    activeSelectionSignal,
    subscribe,
    unsubscribe,
    TOPIC_CONTRIBUTEIONS_CHANGED,
    type ContributionChangeEvent,
    icon,
    renderDropdownItem,
} from "@eclipse-docks/core";

export const CID_CATALOG_ROOT = "catalog.root";

const CATALOG_EMPTY_MESSAGE =
    "No catalog entries yet. Install or enable extensions that contribute catalog items.";

@customElement("docks-catalog")
export class DocksCatalog extends DocksPart {
    @state()
    private rootNodes?: TreeNode[];

    private treeRef = createRef<HTMLElement>();
    private contributionsSubscriptionToken?: string;

    protected doBeforeUI() {
        this.rebuildTree();
        this.contributionsSubscriptionToken = subscribe(TOPIC_CONTRIBUTEIONS_CHANGED, (event: ContributionChangeEvent) => {
            if (event.target === CID_CATALOG_ROOT || event.target?.startsWith("catalog.")) {
                this.rebuildTree();
            }
        });
    }

    protected doClose() {
        if (this.contributionsSubscriptionToken) {
            unsubscribe(this.contributionsSubscriptionToken);
            this.contributionsSubscriptionToken = undefined;
        }
        super.doClose();
    }

    private rebuildTree() {
        const contributions = contributionRegistry.getContributions(
            CID_CATALOG_ROOT
        ) as TreeContribution[];
        this.rootNodes = this.toTreeNodes(contributions);
        this.requestUpdate();
    }

    protected renderToolbar() {
        const isActiveAndHasSelection =
            activePartSignal.get() instanceof DocksCatalog &&
            activeSelectionSignal.get() !== undefined;

        return html`
            <docks-command
                icon="file-arrow-down"
                title="Checkout"
                ?disabled=${!isActiveAndHasSelection}
                .action=${() => this.runActionForSelection()}
            ></docks-command>
            <docks-command icon="arrows-rotate" title="Refresh Catalog" .action=${() => this.refresh()}></docks-command>
            <docks-command icon="angles-down" slot="end" title="Expand All" .action=${() => this.setAllExpanded(true)}></docks-command>
            <docks-command icon="angles-up" slot="end" title="Collapse All" .action=${() => this.setAllExpanded(false)}></docks-command>
        `;
    }

    private toTreeNodes(contributions: TreeContribution[]) {
        return contributions.map((c) => {
            const node = {
                data: c.state,
                icon: c.icon,
                label: c.label,
                leaf: false,
            } as TreeNode;
            if (c.contributionId) {
                const children = contributionRegistry.getContributions(
                    c.contributionId
                ) as TreeContribution[];
                node.leaf = children.length === 0;
                node.children = this.toTreeNodes(children);
            }
            return node;
        });
    }

    private wgetParamsFromCatalogData(data: { url?: string; filename?: string; openInNewTab?: boolean }) {
        if (!data?.url || data.openInNewTab) return null;
        const params: { url: string; filename?: string } = { url: data.url };
        if (typeof data.filename === "string" && data.filename.trim()) {
            params.filename = data.filename.trim();
        }
        return params;
    }

    private openInNewTabFromCatalogData(data: { url?: string; openInNewTab?: boolean }) {
        if (!data?.url || !data.openInNewTab) return null;
        return data.url;
    }

    private openCatalogUrl(url: string) {
        window.open(url, "_blank", "noopener,noreferrer");
    }

    onItemDblClicked(event: Event) {
        const item = event.currentTarget as HTMLElement & { model?: TreeNode; expanded?: boolean };
        const node = item?.model;
        if (!node) return;
        const externalUrl = this.openInNewTabFromCatalogData(node.data);
        if (externalUrl) {
            this.openCatalogUrl(externalUrl);
            return;
        }
        const wgetParams = this.wgetParamsFromCatalogData(node.data);
        if (wgetParams) {
            void this.executeCommand("wget", wgetParams);
            return;
        }
        if (!node.leaf && "expanded" in item) {
            item.expanded = !item.expanded;
        }
    }

    private runActionForSelection() {
        const item = activeSelectionSignal.get();
        const externalUrl = item && this.openInNewTabFromCatalogData(item as { url?: string; openInNewTab?: boolean });
        if (externalUrl) {
            this.openCatalogUrl(externalUrl);
            return;
        }
        const wgetParams = item && this.wgetParamsFromCatalogData(item as { url?: string; filename?: string; openInNewTab?: boolean });
        if (wgetParams) {
            void this.executeCommand("wget", wgetParams);
        }
    }

    onSelectionChanged(event: Event) {
        const node: TreeNode = (event as CustomEvent).detail.selection[0]
            .model;
        activeSelectionSignal.set(node.data);
    }

    protected renderContextMenu() {
        const item = activePartSignal.get() instanceof DocksCatalog ? activeSelectionSignal.get() : undefined;
        const hasUrl = item && "url" in item && item.url;
        const openExternal = item && "openInNewTab" in item && item.openInNewTab;
        return html`
            ${renderDropdownItem({
                icon: 'file-arrow-down',
                label: openExternal ? 'Open download' : 'Checkout',
                title: openExternal ? 'Open download in browser' : 'Checkout',
                disabled: !hasUrl,
                action: () => this.runActionForSelection(),
            })}
        `;
    }

    public setAllExpanded(expanded: boolean) {
        const tree = this.treeRef.value;
        if (tree) {
            tree.querySelectorAll("wa-tree-item").forEach((item: any) => {
                item.expanded = expanded;
            });
        }
    }

    public refresh() {
        this.rebuildTree();
    }

    createTreeItems(node: TreeNode, expanded = false): TemplateResult {
        if (!node) {
            return html``;
        }
        const openExternal = Boolean(
            node.data && "openInNewTab" in node.data && node.data.openInNewTab
        );
        return html`
            <wa-tree-item
                @dblclick=${this.nobubble(this.onItemDblClicked)}
                .model=${node}
                ?expanded=${expanded}
            >
                <span class="catalog-tree-label">
                    ${icon(node.icon)} ${node.label}
                    ${openExternal
                        ? html`<span class="catalog-external-suffix" title="Opens in browser">${icon("arrow-up-right-from-square")}</span>`
                        : ""}
                </span>
                ${node.children?.map((child) => this.createTreeItems(child))}
            </wa-tree-item>
        `;
    }

    protected renderContent() {
        const hasItems = (this.rootNodes?.length ?? 0) > 0;
        return html`
            <div class="catalog-root">
                ${hasItems
                    ? html`
                          <wa-tree
                              ${ref(this.treeRef)}
                              @wa-selection-change=${this.nobubble(this.onSelectionChanged)}
                              style="--indent-guide-width: 1px;"
                          >
                              ${this.rootNodes!.map((node) =>
                                  this.createTreeItems(node, true)
                              )}
                          </wa-tree>
                      `
                    : html`
                          <docks-no-content
                              message=${CATALOG_EMPTY_MESSAGE}
                              icon="book"
                          ></docks-no-content>
                      `}
            </div>
        `;
    }

    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
        }

        .catalog-root {
            height: 100%;
            min-height: 0;
            display: flex;
            flex-direction: column;
        }

        .catalog-root wa-tree {
            flex: 1;
            min-height: 0;
        }

        .catalog-tree-label {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
        }

        .catalog-external-suffix {
            opacity: 0.65;
            font-size: 0.85em;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "docks-catalog": DocksCatalog;
    }
}
