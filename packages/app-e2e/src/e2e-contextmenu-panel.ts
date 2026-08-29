import { DocksPart } from '@eclipse-docks/core';
import { css, html, type TemplateResult } from '@eclipse-docks/core/externals/lit';
import { customElement } from 'lit/decorators.js';

@customElement('e2e-contextmenu-panel')
export class E2eContextMenuPanel extends DocksPart {
    protected renderContent() {
        return html`
            <div data-testid="e2e-contextmenu-target" class="target">
                Right-click here
            </div>
        `;
    }

    protected renderContextMenu(): TemplateResult {
        return html`
            <wa-dropdown-item value="touch" data-cmd="touch">Create File</wa-dropdown-item>
        `;
    }

    static styles = css`
        .target {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 12rem;
            margin: 1rem;
            border: 1px dashed var(--wa-color-neutral-400, #94a3b8);
            border-radius: 0.5rem;
            user-select: none;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'e2e-contextmenu-panel': E2eContextMenuPanel;
    }
}
