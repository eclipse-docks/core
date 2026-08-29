/**
 * Shared render helpers for {@link https://webawesome.com/docs/components/dropdown-item | wa-dropdown-item}
 * rows inside any Docks popup list.
 *
 * **Docks surfaces** (distinct UX and contribution targets):
 * - **Toolbar dropdown** — anchored to a toolbar control (`docks-command`, `docks-toolbar`).
 *   Part-level registry targets use the `toolbar:` prefix (e.g. `toolbar:view.filebrowser`).
 * - **Context menu** — opened at the pointer (`docks-contextmenu`).
 *   Part-level registry targets use the `contextmenu:` prefix (e.g. `contextmenu:view.filebrowser`).
 *
 * A part can expose both surfaces with the same part id but different prefixes, registering
 * different contributions on each. Feature-scoped targets (e.g. `filebrowser.create`) may also
 * be referenced explicitly from either surface when several controls share the same item set.
 */
import { html, nothing, type TemplateResult } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { commandRegistry } from './commandregistry';
import { icon } from './icon-utils';
import { keyBindingManager } from './keybindings';
import {
    type Contribution,
    type CommandContribution,
    type HTMLContribution,
    type ReactiveBoolean,
    contributionRegistry,
    getContributionVisible,
    readReactiveBoolean,
} from './contributionregistry';

export type { ReactiveBoolean };

export interface DropdownItemOptions {
    cmd?: string;
    icon?: string;
    label: string;
    title?: string;
    params?: Record<string, unknown>;
    disabled?: ReactiveBoolean;
    variant?: 'default' | 'danger';
    slot?: string;
    action?: (event: Event) => void;
}

function closeParentDropdown(event: Event): void {
    const dropdown = (event.target as Element | null)?.closest('wa-dropdown') as { open?: boolean } | null;
    if (dropdown && dropdown.open !== undefined) {
        dropdown.open = false;
    }
}

function onDropdownItemClick(options: DropdownItemOptions) {
    return (event: Event) => {
        if (readReactiveBoolean(options.disabled, false)) return;
        event.stopPropagation();
        closeParentDropdown(event);
        if (options.action) {
            options.action(event);
            return;
        }
        if (options.cmd) {
            void commandRegistry.execute(
                options.cmd,
                commandRegistry.createExecutionContext(options.params ?? {})
            );
        }
    };
}

function keybindingDetails(cmd?: string): TemplateResult | typeof nothing {
    if (!cmd) return nothing;
    const bindings = keyBindingManager.getKeyBindingsForCommand(cmd);
    if (bindings.length === 0) return nothing;
    return html`<span slot="details">${bindings[0]}</span>`;
}

/** Renders a native {@link https://webawesome.com/docs/components/dropdown-item | wa-dropdown-item}. */
export function renderDropdownItem(options: DropdownItemOptions): TemplateResult {
    const iconSpec = options.icon ?? '';
    return html`
        <wa-dropdown-item
            slot=${options.slot ?? nothing}
            variant=${options.variant ?? 'default'}
            ?disabled=${readReactiveBoolean(options.disabled, false)}
            @click=${onDropdownItemClick(options)}>
            ${iconSpec ? icon(iconSpec, { label: options.title ?? options.label, slot: 'icon' }) : nothing}
            ${options.label}
            ${keybindingDetails(options.cmd)}
        </wa-dropdown-item>
    `;
}

export function renderCommandContribution(
    contribution: CommandContribution,
    options?: { slot?: string }
): TemplateResult | typeof nothing {
    if (!getContributionVisible(contribution)) return nothing;
    return renderDropdownItem({
        cmd: contribution.command,
        icon: contribution.icon,
        label: contribution.label,
        params: contribution.params,
        disabled: contribution.disabled,
        slot: options?.slot,
    });
}

export function renderDropdownContribution(
    contribution: Contribution,
    options?: { slot?: string }
): TemplateResult | typeof nothing {
    if ('command' in contribution) {
        return renderCommandContribution(contribution as CommandContribution, options);
    }
    if ('component' in contribution) {
        if (!getContributionVisible(contribution)) return nothing;
        const contents = (contribution as HTMLContribution).component;
        if (contents instanceof Function) {
            return contents();
        }
        return html`${unsafeHTML(contents)}` as TemplateResult;
    }
    return nothing;
}

/** Renders all visible contributions registered for a contribution target. */
export function renderDropdownContributions(
    target: string,
    options?: { slot?: string }
): TemplateResult {
    const items = contributionRegistry
        .getContributions(target)
        .map((c) => renderDropdownContribution(c, options))
        .filter((item) => item !== nothing);
    return html`${items}`;
}

/** Renders a {@link wa-dropdown-item} with nested items from a contribution target in {@code slot="submenu"}. */
export function renderDropdownSubmenu(options: {
    icon?: string;
    label: string;
    title?: string;
    contributionTarget: string;
    disabled?: ReactiveBoolean;
}): TemplateResult {
    return html`
        <wa-dropdown-item ?disabled=${readReactiveBoolean(options.disabled, false)}>
            ${options.icon ? icon(options.icon, { label: options.title ?? options.label, slot: 'icon' }) : nothing}
            ${options.label}
            ${renderDropdownContributions(options.contributionTarget, { slot: 'submenu' })}
        </wa-dropdown-item>
    `;
}
