import { html, render, TemplateResult } from "lit";
import { contributionRegistry, Contribution, TOPIC_CONTRIBUTEIONS_CHANGED } from "./contributionregistry";
import { subscribe } from "./events";
import { createLogger } from "./logger";
import { rootContext } from "./di";
import type { DocksPart } from "../parts/part";
import { DocksFloatingPanel, type FloatingPanelGeometry } from "../widgets/floating-panel";

const logger = createLogger("FloatingPanelService");

export const FLOATING_PANEL_CONTRIBUTION_TARGET = "floating-panels";

const DEFAULT_PANEL_WIDTH = 480;
const DEFAULT_PANEL_HEIGHT = 360;

function pixelLength(value: string): number | null {
    if (!value.endsWith("px")) return null;
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

export interface FloatingPanelContribution extends Contribution {
    id: string;
    /** Renders the panel body. The frame is owned by the service. */
    component: (state?: any) => TemplateResult;
    /** Dialog-settings key for the panel position. Unset positions stay on the element. */
    persistKey?: string;
}

type PartRestore = (part: DocksPart) => void | Promise<void>;

interface PartPlacement {
    panel: DocksFloatingPanel;
    parent: Node | null;
    next: ChildNode | null;
    width: string;
    height: string;
    restore?: PartRestore;
}

class FloatingPanelService {
    private contributions: Map<string, FloatingPanelContribution> = new Map();
    private floatedParts = new Map<DocksPart, PartPlacement>();
    private rememberedGeometry = new WeakMap<DocksPart, FloatingPanelGeometry>();
    private contributionsChangeScheduled = false;

    constructor() {
        this.loadContributions();

        subscribe(TOPIC_CONTRIBUTEIONS_CHANGED, (event: any) => {
            if (event.target !== FLOATING_PANEL_CONTRIBUTION_TARGET) return;
            if (this.contributionsChangeScheduled) return;
            this.contributionsChangeScheduled = true;
            queueMicrotask(() => {
                this.contributionsChangeScheduled = false;
                this.loadContributions();
            });
        });
    }

    private loadContributions(): void {
        const contributions = contributionRegistry.getContributions<FloatingPanelContribution>(FLOATING_PANEL_CONTRIBUTION_TARGET);
        this.contributions.clear();

        for (const contribution of contributions) {
            if (!contribution.id) {
                logger.warn("Floating panel contribution missing id, skipping");
                continue;
            }
            if (!contribution.component) {
                logger.warn(`Floating panel contribution "${contribution.id}" has no component function, skipping`);
                continue;
            }
            this.contributions.set(contribution.id, contribution);
        }
    }

    /**
     * Mount a panel for a contribution. Pass the contribution, or the id of one
     * registered on {@link FLOATING_PANEL_CONTRIBUTION_TARGET}.
     * The panel stays until its close button fires `floating-close`.
     */
    open(contribution: FloatingPanelContribution, state?: any): DocksFloatingPanel;
    open(contributionId: string, state?: any): DocksFloatingPanel;
    open(contributionOrId: FloatingPanelContribution | string, state?: any): DocksFloatingPanel {
        const contribution = typeof contributionOrId === "string"
            ? this.contributions.get(contributionOrId)
            : contributionOrId;
        if (!contribution) {
            const id = typeof contributionOrId === "string" ? contributionOrId : contributionOrId.id;
            logger.error(`Floating panel "${id}" not found`);
            throw new Error(`Floating panel "${id}" not found`);
        }
        if (!contribution.component) {
            throw new Error(`Floating panel "${contribution.id}" has no component`);
        }

        const panel = this.createPanel(contribution.label, contribution.persistKey, contribution.icon);
        const close = () => this.closeRendered(panel);
        const stateWithClose = {
            ...(state && typeof state === "object" ? state : {}),
            close,
        };
        render(contribution.component(stateWithClose), panel);
        panel.addEventListener("floating-close", close, { once: true });
        document.body.appendChild(panel);
        return panel;
    }

    /**
     * Move a view or editor part into a floating panel.
     * Without `restore`, closing the panel puts the part back on its original parent.
     * With `restore`, the caller decides where the part goes (for example, reopening its tab).
     */
    toPanel(part: DocksPart, restore?: PartRestore): DocksFloatingPanel {
        const current = this.floatedParts.get(part);
        if (current?.panel.isConnected) {
            current.panel.parentNode?.appendChild(current.panel);
            return current.panel;
        }

        const placement: PartPlacement = {
            panel: this.createPanel(
                part.tabContribution?.label || part.id || "View",
                undefined,
                part.tabContribution?.icon,
            ),
            parent: part.parentNode,
            next: part.nextSibling,
            width: part.style.width,
            height: part.style.height,
            restore,
        };
        const remembered = this.rememberedGeometry.get(part);
        placement.panel.size(
            remembered?.width ?? pixelLength(placement.width) ?? DEFAULT_PANEL_WIDTH,
            remembered?.height ?? pixelLength(placement.height) ?? DEFAULT_PANEL_HEIGHT,
        );
        if (remembered) placement.panel.place(remembered.x, remembered.y);
        part.style.width = "100%";
        part.style.height = "100%";

        this.floatedParts.set(part, placement);
        placement.panel.appendChild(part);
        placement.panel.addEventListener("floating-close", () => { void this.restorePart(part); }, { once: true });
        document.body.appendChild(placement.panel);
        return placement.panel;
    }

    getPanelIds(): string[] {
        return Array.from(this.contributions.keys());
    }

    hasPanel(contributionId: string): boolean {
        return this.contributions.has(contributionId);
    }

    private createPanel(label: string, persistKey?: string, icon?: string): DocksFloatingPanel {
        const panel = new DocksFloatingPanel();
        panel.label = label;
        if (persistKey) panel.persistKey = persistKey;
        if (icon) panel.icon = icon;
        return panel;
    }

    private closeRendered(panel: DocksFloatingPanel): void {
        if (!panel.isConnected) return;
        render(html``, panel);
        panel.remove();
    }

    private async restorePart(part: DocksPart): Promise<void> {
        const placement = this.floatedParts.get(part);
        if (!placement) return;
        this.floatedParts.delete(part);
        const geometry = placement.panel.geometry();
        if (geometry.width > 0 && geometry.height > 0) this.rememberedGeometry.set(part, geometry);

        part.style.width = placement.width;
        part.style.height = placement.height;

        try {
            if (placement.restore) await placement.restore(part);
            else this.reparent(part, placement);
        } finally {
            if (part.parentNode === placement.panel) placement.panel.removeChild(part);
            placement.panel.remove();
        }
    }

    private reparent(part: DocksPart, placement: PartPlacement): void {
        const { parent, next, panel } = placement;
        if (parent && next && next.parentNode === parent) {
            parent.insertBefore(part, next);
            return;
        }
        if (parent) {
            parent.appendChild(part);
            return;
        }
        if (part.parentNode === panel) panel.removeChild(part);
    }
}

export const floatingPanelService = new FloatingPanelService();
rootContext.put("floatingPanelService", floatingPanelService);
