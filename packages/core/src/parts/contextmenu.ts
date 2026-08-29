import {css, html, nothing} from 'lit'
import {customElement, property, state} from 'lit/decorators.js'
import {DocksElement} from "./element";
import {
    Contribution,
    ContributionChangeEvent,
    contributionRegistry,
    TOPIC_CONTRIBUTEIONS_CHANGED
} from "../core/contributionregistry";
import {subscribe} from "../core/events";
import {closeSiblingSubmenus} from "../core/dropdown-menu-utils";
import {createRef, ref} from "lit/directives/ref.js";
import {renderDropdownContribution} from "../core/dropdown-item";

interface VirtualPopupAnchor {
    getBoundingClientRect(): DOMRect;
}

interface WaPopupElement extends HTMLElement {
    anchor?: Element | string | VirtualPopupAnchor;
    reposition(): void;
}

@customElement('docks-contextmenu')
export class DocksContextMenu extends DocksElement {
    @property({attribute: false})
    scopeTokens: string[] = [];

    @property({attribute: false})
    public partContextMenuRenderer?: () => any = undefined;

    @state()
    private contributions: Contribution[] = [];

    @state()
    private isOpen: boolean = false;

    private menuPosition: { x: number; y: number } = { x: 0, y: 0 };

    private readonly virtualAnchor: VirtualPopupAnchor = {
        getBoundingClientRect: () => {
            const { x, y } = this.menuPosition;
            return new DOMRect(x, y, 0, 0);
        },
    };

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
        this.refreshContributions();
        
        subscribe(TOPIC_CONTRIBUTEIONS_CHANGED, (event: ContributionChangeEvent) => {
            const id = this.getAttribute("id");
            if (!id) return;
            
            const shouldReload = this.matchesTarget(id, event.target);
            if (shouldReload) {
                this.refreshContributions();
                this.requestUpdate();
            }
        });
    }

    protected willUpdate(changedProperties: Map<string, unknown>) {
        super.willUpdate?.(changedProperties);
        if (changedProperties.has('scopeTokens')) {
            this.refreshContributions();
        }
    }

    attributeChangedCallback(name: string, old: string | null, value: string | null) {
        super.attributeChangedCallback(name, old, value);
        if (name === 'id' && old !== value) {
            this.refreshContributions();
        }
    }

    private refreshContributions() {
        const id = this.getAttribute("id");
        if (!id) {
            this.contributions = [];
            return;
        }
        this.loadContributions(id);
    }


    private matchesTarget(id: string, target: string): boolean {
        if (target === id) return true;
        
        if (!id.includes(':')) return false;
        
        const [prefix] = id.split(':');
        if (target === `${prefix}:*`) return true;
        
        const targetParts = target.split(':');
        if (targetParts.length === 2) {
            const categoryToken = targetParts[1];
            if (this.scopeTokens.includes(categoryToken)) {
                return id.startsWith(`${prefix}:`);
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

        for (const category of this.scopeTokens) {
            const categoryId = `${prefix}:${category}`;
            const matches = contributionRegistry.getContributions(categoryId);
            categoryMatches.push(...matches);
        }
        
        this.contributions = [...wildcard, ...categoryMatches, ...specific];
    }

    /** Returns true when registry contributions or part-supplied menu content exist. */
    private hasMenuBody(): boolean {
        this.refreshContributions();
        if (this.contributions.length > 0) return true;
        const partContent = this.partContextMenuRenderer ? this.partContextMenuRenderer() : nothing;
        return partContent !== nothing;
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

    private getHostPart(): (HTMLElement & { updateComplete: Promise<boolean> }) | null {
        const root = this.getRootNode();
        if (root instanceof ShadowRoot && root.host instanceof HTMLElement) {
            return root.host as HTMLElement & { updateComplete: Promise<boolean> };
        }
        return null;
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

    private handleSubmenuOpening = (event: Event): void => {
        const dropdown = this.dropdownRef.value;
        const activeItem = (event as CustomEvent<{ item?: Element }>).detail?.item;
        if (!dropdown || !activeItem) return;
        closeSiblingSubmenus(activeItem, dropdown);
    };

    /** Opens the menu at `position`. Returns false when there is nothing to show (no thin empty panel). */
    public async show(position: { x: number, y: number }, mouseEvent?: MouseEvent): Promise<boolean> {
        if (!this.hasMenuBody()) return false;
        if (mouseEvent) {
            this.triggerClickUnderCursor(mouseEvent);
            await this.getHostPart()?.updateComplete;
        }

        if (this.isOpen) {
            this.isOpen = false;
            await this.updateComplete;
        }

        this.menuPosition = position;
        this.isOpen = true;
        await this.updateComplete;
        this.syncVirtualPopupAnchor();
        document.addEventListener('pointerdown', this.boundHandleDocumentPointerDown, { capture: true });
        return true;
    }

    /** Points wa-dropdown's internal wa-popup at the pointer via a VirtualElement anchor. */
    private syncVirtualPopupAnchor(): void {
        const dropdown = this.dropdownRef.value;
        const popup = dropdown?.shadowRoot?.querySelector('wa-popup') as WaPopupElement | null;
        if (!popup) return;
        popup.anchor = this.virtualAnchor;
        popup.reposition();
    }

    private onClose() {
        if (!this.isOpen) return;
        this.isOpen = false;
        document.removeEventListener('pointerdown', this.boundHandleDocumentPointerDown, { capture: true });
    }

    protected updated(changedProperties: Map<string, unknown>): void {
        super.updated(changedProperties);
        if (changedProperties.has('isOpen') && this.isOpen) {
            this.syncVirtualPopupAnchor();
        }
    }

    private renderContribution(contribution: Contribution) {
        return renderDropdownContribution(contribution);
    }

    render() {
        const partContent = this.partContextMenuRenderer ? this.partContextMenuRenderer() : nothing;

        return html`
            <wa-dropdown
                ${ref(this.dropdownRef)}
                ?open=${this.isOpen}
                @submenu-opening=${this.handleSubmenuOpening}
                @wa-after-hide=${this.onClose}>
                <span slot="trigger" hidden aria-hidden="true"></span>
                
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
            pointer-events: none;
            min-width: 200px;
        }

        wa-dropdown:state(open) {
            pointer-events: auto;
        }
        
        wa-dropdown::part(menu) {
            min-width: 200px;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'docks-contextmenu': DocksContextMenu
    }
}

