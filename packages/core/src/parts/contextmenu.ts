import {css, html, nothing} from 'lit'
import {customElement, property, state} from 'lit/decorators.js'
import {LyraElement} from "./element";
import {
    CommandContribution,
    Contribution,
    ContributionChangeEvent,
    contributionRegistry,
    HTMLContribution,
    TOPIC_CONTRIBUTEIONS_CHANGED
} from "../core/contributionregistry";
import {Signal} from '@lit-labs/signals';
import {unsafeHTML} from "lit/directives/unsafe-html.js";
import {subscribe} from "../core/events";
import {createRef, ref} from "lit/directives/ref.js";
import '../components/command';

@customElement('lyra-contextmenu')
export class LyraContextMenu extends LyraElement {
    @property({type: Boolean, attribute: 'is-editor'})
    private isEditor: boolean = false;

    @property({attribute: false})
    public partContextMenuRenderer?: () => any = undefined;

    @state()
    private contributions: Contribution[] = [];

    @state()
    private isOpen: boolean = false;

    @state()
    private position: { x: number, y: number } = { x: 0, y: 0 };

    private anchorRef = createRef<HTMLElement>();
    private dropdownRef = createRef<HTMLElement>();

    private boundHandleDocumentPointerDown = this.handleDocumentPointerDown.bind(this);

    /**
     * "Click outside to close" runs in capture phase before the target's click.
     * We use composedPath() so hits inside the menu still count as inside:
     * - Clicks on items (e.g. command / wa-dropdown-item) or their icon/label
     *   are inside shadow roots; contains(target) can miss those.
     * - composedPath() is the path from target to root crossing shadow boundaries,
     *   so if the dropdown is in the path, the click was inside the menu and we
     *   do not close (so the item's click can run). We only close when the click
     *   is truly outside (dropdown not in path). Submenus: same idea, skip close
     *   when any node in the path has part="submenu".
     */
    private handleDocumentPointerDown(e: PointerEvent) {
        if (!this.isOpen) return;
        const path = e.composedPath() as Element[];
        if (
            this.dropdownRef.value &&
            path.includes(this.dropdownRef.value)
        ) return;
        if (path.some((el) => el.getAttribute?.('part') === 'submenu')) return;
        this.onClose();
    }

    protected doBeforeUI() {
        const id = this.getAttribute("id");
        if (id) {
            this.loadContributions(id);
        }
        
        subscribe(TOPIC_CONTRIBUTEIONS_CHANGED, (event: ContributionChangeEvent) => {
            if (!id) return;
            
            const shouldReload = this.matchesTarget(id, event.target);
            if (shouldReload) {
                this.loadContributions(id);
                this.requestUpdate();
            }
        });
    }


    private matchesTarget(id: string, target: string): boolean {
        if (target === id) return true;
        
        if (!id.includes(':')) return false;
        
        const [prefix] = id.split(':');
        if (target === `${prefix}:*`) return true;
        
        const targetParts = target.split(':');
        if (targetParts.length === 2) {
            const categoryToken = targetParts[1];
            if (categoryToken === 'system.editors' || categoryToken === '.system.editors') {
                return this.isEditor && id.startsWith(`${prefix}:`);
            }
        }
        
        return false;
    }

    private loadContributions(id: string) {
        const specific = contributionRegistry.getContributions(id);
        
        if (!id.includes(':')) {
            this.contributions = specific;
            return;
        }
        
        const [prefix] = id.split(':');
        const wildcardId = `${prefix}:*`;
        const wildcard = contributionRegistry.getContributions(wildcardId);
        
        const categoryMatches: Contribution[] = [];
        
        if (this.isEditor) {
            const allCategories = ['system.editors', '.system.editors'];
            for (const category of allCategories) {
                const categoryId = `${prefix}:${category}`;
                const matches = contributionRegistry.getContributions(categoryId);
                categoryMatches.push(...matches);
            }
        }
        
        this.contributions = [...wildcard, ...categoryMatches, ...specific];
    }

    /**
     * Gets the element at the given point, traversing shadow DOM boundaries recursively.
     * This is necessary because elementFromPoint() doesn't penetrate shadow roots.
     */
    private getElementFromPoint(x: number, y: number): Element | null {
        let element: Element | null = document.elementFromPoint(x, y);
        if (!element) return null;

        // Recursively traverse shadow DOM boundaries
        while (element) {
            const shadowRoot = (element as any).shadowRoot as ShadowRoot | undefined;
            if (shadowRoot) {
                const shadowElement: Element | null = shadowRoot.elementFromPoint(x, y);
                if (shadowElement && shadowElement !== element) {
                    element = shadowElement;
                    continue;
                }
            }
            break;
        }

        return element;
    }

    /**
     * Triggers a click on the element under the cursor to update selection before showing context menu.
     */
    private triggerClickUnderCursor(mouseEvent: MouseEvent): void {
        const elementUnderCursor = this.getElementFromPoint(mouseEvent.clientX, mouseEvent.clientY);
        if (elementUnderCursor) {
            const clickEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: mouseEvent.clientX,
                clientY: mouseEvent.clientY,
                screenX: mouseEvent.screenX,
                screenY: mouseEvent.screenY,
                button: 0,
                buttons: 0,
                detail: 1,
                which: 1
            });
            elementUnderCursor.dispatchEvent(clickEvent);
        }
    }

    public show(position: { x: number, y: number }, mouseEvent?: MouseEvent) {
        if (mouseEvent) {
            this.triggerClickUnderCursor(mouseEvent);
        }
        this.position = position;
        this.isOpen = true;
        this.updateComplete.then(() => {
            document.addEventListener('pointerdown', this.boundHandleDocumentPointerDown, { capture: true });
        });
    }

    private onClose() {
        this.isOpen = false;
        document.removeEventListener('pointerdown', this.boundHandleDocumentPointerDown, { capture: true });
    }

    private renderContribution(contribution: Contribution) {
        if ("command" in contribution) {
            const commandContribution = contribution as CommandContribution;
            const disabled = (commandContribution.disabled as Signal.Computed<boolean>)?.get();
            return html`
                <lyra-command
                    cmd="${commandContribution.command}"
                    icon="${commandContribution.icon ?? ''}"
                    .params=${commandContribution.params ?? {}}
                    ?disabled="${disabled}">
                    ${commandContribution.label}
                </lyra-command>
            `;
        } else if ("component" in contribution) {
            const contents = (contribution as HTMLContribution).component;
            if (contents instanceof Function) {
                return contents();
            }
            return unsafeHTML(contents);
        }
        return nothing;
    }

    render() {
        if (!this.isOpen) return nothing;

        const partContent = this.partContextMenuRenderer ? this.partContextMenuRenderer() : nothing;

        return html`
            <wa-dropdown
                ${ref(this.dropdownRef)}
                ?open=${this.isOpen}
                @wa-after-hide=${this.onClose}>
                
                <div 
                    slot="trigger"
                    ${ref(this.anchorRef)}
                    style="position: fixed; 
                           left: ${this.position.x}px; 
                           top: ${this.position.y}px; 
                           width: 1px; 
                           height: 1px; 
                           pointer-events: none;">
                </div>
                
                ${partContent}
                ${this.contributions.map(c => this.renderContribution(c))}
            </wa-dropdown>
        `;
    }

    static styles = css`
        :host {
            position: fixed;
            top: 0;
            left: 0;
            width: 0;
            height: 0;
            pointer-events: none;
            z-index: 10000;
        }

        wa-dropdown {
            pointer-events: auto;
            min-width: 200px;
        }
        
        wa-dropdown::part(menu) {
            min-width: 200px;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'lyra-contextmenu': LyraContextMenu
    }
}

