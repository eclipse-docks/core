import {Signal} from "@lit-labs/signals";
import {TemplateResult} from "lit";
import {publish} from "./events";
import {rootContext} from "./di";

export const TOPIC_CONTRIBUTEIONS_CHANGED = "events/contributionregistry/contributionsChanged"

export interface ContributionChangeEvent {
    target: string;
    contributions: Contribution[];
}

export interface Contribution {
    target?: string;
    label: string;
    icon?: string;
    slot?: string;
}

export interface CommandContribution extends Contribution {
    command: string;
    params?: Record<string, any>;
    showLabel?: boolean;
    disabled?: (() => boolean) | Signal.Computed<boolean>;
}

export interface HTMLContribution extends Contribution {
    component: string | (() => TemplateResult)
}

export interface TabContribution extends Contribution {
    name: string;
    editorId?: string;
    closable?: boolean;
    noOverflow?: boolean;
    /** When true or omitted, a lyra-toolbar is rendered for this tab; when false, no toolbar is shown. */
    toolbar?: boolean;
    /** When true or omitted, a contextmenu is rendered for this tab; when false, no context menu is shown. */
    contextMenu?: boolean;
    component?: (id: string) => TemplateResult;
}

export interface IconContribution extends Contribution {
    mappings: Record<string, string>;
    priority?: number;
}

export interface LayoutContribution extends Contribution {
    id: string;
    name: string;
    component: string | { tag: string; attributes?: Record<string, string> } | (() => TemplateResult);
    onShow?: () => void | Promise<void>;
}

class ContributionRegistry {
    private contributions: Map<string, Contribution[]> = new Map();

    registerContribution<T extends Contribution>(target: string, contribution: T) {
        const targetSlot = this.getContributions(target)!
        if ("command" in contribution) {
            const cmd = contribution as unknown as CommandContribution
            if (cmd.disabled instanceof Function) {
                cmd.disabled = new Signal.Computed<boolean>(cmd.disabled)
            }
        }
        targetSlot.push(contribution);
        publish(TOPIC_CONTRIBUTEIONS_CHANGED, { target, contributions: targetSlot } as ContributionChangeEvent)
    }

    getContributions<T extends Contribution>(target: string): T[] {
        if (!this.contributions.has(target)) {
            this.contributions.set(target, [])
        }
        return this.contributions.get(target)! as T[]
    }
}

export const contributionRegistry = new ContributionRegistry()
rootContext.put("contributionRegistry", contributionRegistry)