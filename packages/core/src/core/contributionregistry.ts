import { Signal } from "@lit-labs/signals";
import { TemplateResult } from "lit";
import { publish } from "./events";
import { rootContext } from "./di";
import { contributionTargetMappingRegistry } from "./contribution-mapping";

export const TOPIC_CONTRIBUTEIONS_CHANGED = "events/contributionregistry/contributionsChanged"

export interface ContributionChangeEvent {
    target: string;
    contributions: Contribution[];
}

export interface Contribution {
    /** Optional globally unique, namespaced contribution name (e.g. "view.filebrowser"). */
    name?: string;
    target?: string;
    label: string;
    /** When true, UI may show `label` alongside the icon (e.g. toolbar). Honored where supported in UI. */
    showLabel?: boolean;
    icon?: string;
    slot?: string;
    disabled?: (() => boolean) | Signal.Computed<boolean>;
    /** When false, the contribution is not rendered (default: shown). Honored where supported in UI. */
    visible?: (() => boolean) | Signal.Computed<boolean>;
}

export interface CommandContribution extends Contribution {
    command: string;
    params?: Record<string, any>;
}

export function isCommandContribution(contribution: Contribution): contribution is CommandContribution {
    return "command" in contribution;
}

/** Default true when `visible` is omitted. */
export function getContributionVisible(contribution: Contribution): boolean {
    const visible = contribution.visible as Signal.Computed<boolean> | undefined;
    if (!visible) return true;
    return visible.get() !== false;
}

/** Default false when `disabled` is omitted. */
export function getContributionDisabled(contribution: Contribution): boolean {
    const disabled = contribution.disabled as Signal.Computed<boolean> | undefined;
    if (!disabled) return false;
    return disabled.get() === true;
}

function wrapContributionReactiveFlags(contribution: Contribution): void {
    if (contribution.disabled instanceof Function) {
        contribution.disabled = new Signal.Computed<boolean>(contribution.disabled);
    }
    if (contribution.visible instanceof Function) {
        contribution.visible = new Signal.Computed<boolean>(contribution.visible);
    }
}

export interface HTMLContribution extends Contribution {
    component: string | (() => TemplateResult)
}

export interface TabContribution extends Contribution {
    name: string;
    /**
     * Stable editor-type identifier used for contribution targets (for example `toolbar:${editorId}`).
     * Needed because `name` is often tab-instance specific (such as file/path based) and would
     * fragment toolbar contributions across many dynamic targets.
     */
    editorId?: string;
    closable?: boolean;
    /** When true or omitted, a docks-toolbar is rendered for this tab; when false, no toolbar is shown. */
    toolbar?: boolean;
    /** When true or omitted, a contextmenu is rendered for this tab; when false, no context menu is shown. */
    contextMenu?: boolean;
    /**
     * Main-area editor type ids (`TabContribution.editorId` of the editor tab) that should reveal this tab
     * when any of them becomes the active editor in the main editor area. Omitted or empty = no auto-reveal.
     */
    coupledEditors?: string[];
    /** Return false to cancel tab close (after dirty-tab prompt, if any). */
    beforeClose?: () => boolean | Promise<boolean>;
    component?: (id: string) => TemplateResult;
}

export interface IconContribution extends Contribution {
    mappings: Record<string, string>;
    priority?: number;
}

export interface LayoutContribution extends Contribution {
    id: string;
    name: string;
    /** Optional icon name (e.g. Font Awesome) for the layout switcher. */
    icon?: string;
    component: string | { tag: string; attributes?: Record<string, string> } | (() => TemplateResult);
    onShow?: () => void | Promise<void>;
}

class ContributionRegistry {
    private contributions: Map<string, Contribution[]> = new Map();

    registerContribution<T extends Contribution>(target: string, contribution: T) {
        const targetSlot = this.getOrCreateSlot(target);
        wrapContributionReactiveFlags(contribution);
        targetSlot.push(contribution);
        publish(TOPIC_CONTRIBUTEIONS_CHANGED, { target, contributions: targetSlot } as ContributionChangeEvent);

        const effectiveTargets = contributionTargetMappingRegistry.getEffectiveTargets(target, contribution);
        for (const effectiveTarget of effectiveTargets) {
            if (effectiveTarget === target) continue;
            const contributionsForSlot = this.getContributions(effectiveTarget);
            publish(TOPIC_CONTRIBUTEIONS_CHANGED, { target: effectiveTarget, contributions: contributionsForSlot } as ContributionChangeEvent);
        }
    }

    /**
     * Returns all contributions whose *effective* targets include the given slot.
     *
     * Note: This currently scans all registered contributions and resolves
     * remaps on each call (O(N) in number of contributions). This is acceptable
     * for typical Docks apps (dozens/hundreds of contributions and few slots),
     * but if contribution counts grow significantly we may want to introduce a
     * cached index of effective targets per slot to keep lookups O(1).
     */
    getContributions<T extends Contribution>(target: string): T[] {
        const results: T[] = [];
        for (const [originalTarget, list] of this.contributions.entries()) {
            const typedList = list as T[];
            for (const contribution of typedList) {
                const effectiveTargets = contributionTargetMappingRegistry.getEffectiveTargets(originalTarget, contribution);
                if (effectiveTargets.includes(target)) {
                    results.push(contribution);
                }
            }
        }
        if (results.length === 0) {
            this.getOrCreateSlot(target);
        }
        return results;
    }

    private getOrCreateSlot(target: string): Contribution[] {
        if (!this.contributions.has(target)) {
            this.contributions.set(target, []);
        }
        return this.contributions.get(target)!;
    }
}

export const contributionRegistry = new ContributionRegistry()
rootContext.put("contributionRegistry", contributionRegistry)