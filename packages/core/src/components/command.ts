import { css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { DocksWidget } from '../widgets/widget'
import { icon } from '../core/icon-utils'
import { keyBindingManager } from '../core/keybindings'
import {
    contributionRegistry,
    Contribution,
    ContributionChangeEvent,
    TOPIC_CONTRIBUTEIONS_CHANGED,
} from '../core/contributionregistry'
import { subscribe } from '../core/events'
import { renderDropdownItem, renderDropdownContribution } from '../core/dropdown-item'

@customElement('docks-command')
export class DocksCommand extends DocksWidget {
    @property()
    cmd: string = ''

    @property({ type: Object, attribute: false })
    action?: (event?: Event) => void

    @property()
    title: string = ''

    @property()
    label?: boolean = false

    @property()
    icon?: string

    @property({ type: Boolean })
    disabled: boolean = false

    @property()
    appearance: 'default' | 'plain' | 'outline' | 'accent' | 'filled-outlined' | 'filled' | 'outlined' = 'plain'

    @property()
    variant: 'neutral' | 'brand' | 'success' | 'warning' | 'danger' = 'neutral'

    @property()
    size: 's' | 'm' | 'l' = 's'

    @property({ type: Object, attribute: false })
    params: Record<string, any> = {}

    @property()
    dropdown?: string

    @property({ type: Boolean, attribute: 'with-caret' })
    withCaret: boolean = true

    @property()
    placement: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end' = 'bottom-start'

    @state()
    private dropdownContributions: Contribution[] = []

    private closeDropdown(dropdown: { open?: boolean } | null | undefined) {
        if (dropdown && dropdown.open !== undefined) {
            dropdown.open = false
        }
    }

    private handleSelect(event: CustomEvent) {
        this.closeDropdown(event.target as { open?: boolean })
    }

    private getKeybinding(): string | null {
        if (!this.cmd || this.action) return null
        const keybindings = keyBindingManager.getKeyBindingsForCommand(this.cmd)
        return keybindings.length > 0 ? keybindings[0] : null
    }

    private hasLightDomContent(): boolean {
        return Array.from(this.childNodes).some((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                return (node.textContent?.trim().length ?? 0) > 0
            }
            return node.nodeType === Node.ELEMENT_NODE
        })
    }

    private isIconOnlyDropdownTrigger(): boolean {
        return !this.label && !this.hasLightDomContent()
    }

    private renderDropdownTriggerIcon(iconSlot: 'start' | undefined) {
        if (!this.icon) return nothing
        return icon(this.icon, { label: this.title, slot: iconSlot })
    }

    protected doBeforeUI() {
        if (this.dropdown) {
            this.dropdownContributions = contributionRegistry.getContributions(this.dropdown);

            subscribe(TOPIC_CONTRIBUTEIONS_CHANGED, (event: ContributionChangeEvent) => {
                if (this.dropdown && event.target === this.dropdown) {
                    this.dropdownContributions = event.contributions;
                }
            })
        }
    }

    protected willUpdate(changedProperties: Map<PropertyKey, unknown>) {
        super.willUpdate?.(changedProperties);
        if (this.dropdown && changedProperties.has('dropdown')) {
            this.dropdownContributions = contributionRegistry.getContributions(this.dropdown);
        }
    }

    private handleToolbarClick(event?: Event) {
        if (this.disabled) return

        if (event) {
            event.stopPropagation()
        }

        if (this.action) {
            this.action(event)
            return
        }

        if (this.cmd) {
            void this.executeCommand(this.cmd, this.params);
        }
    }

    render() {
        const keybinding = this.getKeybinding()

        if (this.dropdown) {
            const iconOnlyTrigger = this.isIconOnlyDropdownTrigger()
            const iconSlot = iconOnlyTrigger ? undefined : 'start'
            return html`
                <wa-dropdown 
                    placement=${this.placement}
                    @wa-select=${(e: CustomEvent) => this.handleSelect(e)}>
                    <wa-button 
                        slot="trigger"
                        appearance=${this.appearance}
                        variant=${this.variant}
                        size=${this.size}
                        ?disabled=${this.disabled}
                        ?with-caret=${this.withCaret}
                        title=${keybinding ? `${this.title} (${keybinding})` : this.title}>
                        ${this.renderDropdownTriggerIcon(iconSlot)}
                        ${iconOnlyTrigger ? nothing : html`<slot></slot>`}
                        ${this.label ? this.title : nothing}
                    </wa-button>
                    
                    ${this.title ? html`
                        <h6 style="padding: var(--wa-space-xs) var(--wa-space-s); margin: 0; color: var(--wa-color-neutral-50); font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
                            ${this.title}
                        </h6>
                    ` : nothing}
                    
                    ${this.dropdownContributions.map(c => renderDropdownContribution(c))}
                    
                    ${this.cmd ? html`
                        <wa-divider></wa-divider>
                        ${renderDropdownItem({
                            cmd: this.cmd,
                            icon: this.icon,
                            label: this.title,
                            params: this.params,
                            disabled: this.disabled,
                        })}
                    ` : nothing}
                </wa-dropdown>
            `
        }

        return html`
            <wa-button
                appearance=${this.appearance}
                variant=${this.variant}
                size=${this.size}
                ?disabled=${this.disabled}
                title=${keybinding ? `${this.title} (${keybinding})` : this.title}
                @click=${(e: Event) => this.handleToolbarClick(e)}>
                ${icon(this.icon, { label: this.title, slot: 'start' })}
                <slot></slot>
            </wa-button>
        `
    }

    static styles = css`
        :host {
            display: inline-block;
        }
    `
}

declare global {
    interface HTMLElementTagNameMap {
        'docks-command': DocksCommand
    }
}
