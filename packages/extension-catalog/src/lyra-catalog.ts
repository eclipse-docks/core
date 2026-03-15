import {
    css,
    html,
    TemplateResult,
    customElement,
    state,
    createRef,
    ref,
} from "@eclipse-lyra/core/externals/lit";
import {
    LyraPart,
    TreeContribution,
    TreeNode,
    contributionRegistry,
    activePartSignal,
    activeSelectionSignal,
    subscribe,
    unsubscribe,
    TOPIC_CONTRIBUTEIONS_CHANGED,
    type ContributionChangeEvent,
} from "@eclipse-lyra/core/api";

export const CID_CATALOG_ROOT = "catalog.root";

@customElement("lyra-catalog")
export class LyraCatalog extends LyraPart {
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
            activePartSignal.get() instanceof LyraCatalog &&
            activeSelectionSignal.get() !== undefined;

        return html`
            <lyra-command
                icon="file-arrow-down"
                title="Checkout"
                ?disabled=${!isActiveAndHasSelection}
                .action=${() => this.runWgetForSelection()}
            ></lyra-command>
            <lyra-command icon="arrows-rotate" title="Refresh Catalog" .action=${() => this.refresh()}></lyra-command>
            <lyra-command icon="angles-down" slot="end" title="Expand All" .action=${() => this.setAllExpanded(true)}></lyra-command>
            <lyra-command icon="angles-up" slot="end" title="Collapse All" .action=${() => this.setAllExpanded(false)}></lyra-command>
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

    onItemDblClicked(event: Event) {
        const item = event.currentTarget as HTMLElement & { model?: TreeNode; expanded?: boolean };
        const node = item?.model;
        if (!node) return;
        if (node.data?.url) {
            this.executeCommand("wget", { url: node.data.url });
            return;
        }
        if (!node.leaf && "expanded" in item) {
            item.expanded = !item.expanded;
        }
    }

    private runWgetForSelection() {
        const item = activeSelectionSignal.get();
        if (item && "url" in item && item.url) {
            this.executeCommand("wget", { url: item.url });
        }
    }

    onSelectionChanged(event: Event) {
        const node: TreeNode = (event as CustomEvent).detail.selection[0]
            .model;
        activeSelectionSignal.set(node.data);
        this.updateContextMenu();
    }

    protected renderContextMenu() {
        const item = activePartSignal.get() instanceof LyraCatalog ? activeSelectionSignal.get() : undefined;
        const hasUrl = item && "url" in item && item.url;
        return html`
            <lyra-command
                icon="file-arrow-down"
                title="Checkout"
                ?disabled=${!hasUrl}
                .action=${() => this.runWgetForSelection()}
            >Checkout</lyra-command>
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
        return html`
            <wa-tree-item
                @dblclick=${this.nobubble(this.onItemDblClicked)}
                .model=${node}
                ?expanded=${expanded}
            >
                <span><lyra-icon name="${node.icon}"></lyra-icon> ${node.label}</span>
                ${node.children?.map((child) => this.createTreeItems(child))}
            </wa-tree-item>
        `;
    }

    render() {
        return html`
            <wa-tree
                ${ref(this.treeRef)}
                @wa-selection-change=${this.nobubble(this.onSelectionChanged)}
                style="--indent-guide-width: 1px;"
            >
                ${this.rootNodes?.map((node) =>
                    this.createTreeItems(node, true)
                )}
            </wa-tree>
        `;
    }

    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "lyra-catalog": LyraCatalog;
    }
}
