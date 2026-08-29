import { html, render, TemplateResult } from "lit";
import { contributionRegistry, Contribution, TOPIC_CONTRIBUTEIONS_CHANGED } from "./contributionregistry";
import { subscribe } from "./events";
import { createLogger } from "./logger";
import { rootContext } from "./di";
import { DocksDialogContent } from "../parts/dialog-content";

const logger = createLogger('DialogService');

export const DIALOG_CONTRIBUTION_TARGET = "dialogs";

export interface DialogButton {
    id: string;
    label: string;
    variant?: 'default' | 'primary' | 'success' | 'neutral' | 'warning' | 'danger';
    disabled?: boolean;
}

export const OK_BUTTON: DialogButton = {
    id: 'ok',
    label: 'OK',
    variant: 'primary'
};

export const CANCEL_BUTTON: DialogButton = {
    id: 'cancel',
    label: 'Cancel',
    variant: 'default'
};

export const YES_BUTTON: DialogButton = {
    id: 'yes',
    label: 'Yes',
    variant: 'primary'
};

export const NO_BUTTON: DialogButton = {
    id: 'no',
    label: 'No',
    variant: 'default'
};

export const CLOSE_BUTTON: DialogButton = {
    id: 'close',
    label: 'Close',
    variant: 'default'
};

export const SAVE_BUTTON: DialogButton = {
    id: 'save',
    label: 'Save',
    variant: 'primary'
};

export const DELETE_BUTTON: DialogButton = {
    id: 'delete',
    label: 'Delete',
    variant: 'danger'
};

export interface DialogContribution extends Contribution {
    id: string;
    /** When true, `component` renders a complete `wa-dialog`. The service only mounts and manages lifecycle. */
    selfContained?: boolean;
    buttons?: DialogButton[];
    component: (state?: any) => TemplateResult;
    onButton?: (id: string, result: any, state?: any) => boolean | Promise<boolean> | void | Promise<void>;
}

let dialogContainer: HTMLElement | null = null;

function getDialogContainer(): HTMLElement {
    if (!dialogContainer || !document.body.contains(dialogContainer)) {
        dialogContainer = document.createElement('div');
        dialogContainer.id = 'global-dialog-container';
        document.body.appendChild(dialogContainer);
    }
    return dialogContainer;
}

type WaDialogElement = HTMLElement & { open?: boolean };

function findWaDialog(root: ParentNode): WaDialogElement | null {
    if (root instanceof Element && root.tagName.toLowerCase() === 'wa-dialog') {
        return root as WaDialogElement;
    }

    const children = root instanceof Document || root instanceof DocumentFragment || root instanceof Element
        ? Array.from(root.children)
        : root instanceof ShadowRoot
            ? Array.from(root.children)
            : [];

    for (const child of children) {
        if (child instanceof Element && child.tagName.toLowerCase() === 'wa-dialog') {
            return child as WaDialogElement;
        }
        if (child instanceof Element && child.shadowRoot) {
            const nested = findWaDialog(child.shadowRoot);
            if (nested) {
                return nested;
            }
        }
        const nested = findWaDialog(child);
        if (nested) {
            return nested;
        }
    }

    return null;
}

class DialogService {
    private contributions: Map<string, DialogContribution> = new Map();
    private contributionsChangeScheduled = false;

    constructor() {
        this.loadContributions();

        subscribe(TOPIC_CONTRIBUTEIONS_CHANGED, (event: any) => {
            if (event.target !== DIALOG_CONTRIBUTION_TARGET) return;
            if (this.contributionsChangeScheduled) return;
            this.contributionsChangeScheduled = true;
            queueMicrotask(() => {
                this.contributionsChangeScheduled = false;
                this.loadContributions();
            });
        });
    }

    private loadContributions(): void {
        const contributions = contributionRegistry.getContributions<DialogContribution>(DIALOG_CONTRIBUTION_TARGET);
        
        this.contributions.clear();
        
        for (const contribution of contributions) {
            if (!contribution.id) {
                logger.warn('Dialog contribution missing id, skipping');
                continue;
            }


            if (!contribution.component) {
                logger.warn(`Dialog contribution "${contribution.id}" has no component function, skipping`);
                continue;
            }

            if (!contribution.onButton && !contribution.selfContained) {
                logger.warn(`Dialog contribution "${contribution.id}" has no onButton callback, skipping`);
                continue;
            }

            this.contributions.set(contribution.id, contribution);
        }
    }

    async open(dialogId: string, state?: any): Promise<void> {
        const contribution = this.contributions.get(dialogId);
        
        if (!contribution) {
            logger.error(`Dialog "${dialogId}" not found`);
            throw new Error(`Dialog "${dialogId}" not found`);
        }

        return new Promise((resolve) => {
            const container = getDialogContainer();
            let closed = false;
            let dialogContentElement: DocksDialogContent | null = null;

            const cleanup = async () => {
                if (closed) return;
                closed = true;

                if (dialogContentElement) {
                    try {
                        await dialogContentElement.dispose();
                    } catch (error) {
                        const errorMessage = error instanceof Error ? error.message : String(error);
                        logger.error(`Error disposing dialog content for "${dialogId}": ${errorMessage}`);
                    }
                }

                try {
                    const result = dialogContentElement ? dialogContentElement.getResult() : undefined;
                    if (contribution.onButton) {
                        await contribution.onButton('close', result, stateWithClose);
                    }
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : String(error);
                    logger.error(`Error executing close callback for dialog "${dialogId}": ${errorMessage}`);
                }

                render(html``, container);
                resolve();
            };

            const closeDialog = () => {
                if (closed) return;
                const dialog = findWaDialog(container);
                if (dialog && dialog.open !== false) {
                    dialog.open = false;
                    return;
                }
                void cleanup();
            };

            const handleAfterHide = () => {
                void cleanup();
            };

            const handleButtonClick = async (buttonId: string) => {
                if (!contribution.onButton) {
                    return;
                }
                try {
                    const result = dialogContentElement ? dialogContentElement.getResult() : undefined;
                    const shouldClose = await contribution.onButton(buttonId, result, stateWithClose);

                    if (shouldClose !== false) {
                        closeDialog();
                    }
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : String(error);
                    logger.error(`Error executing button callback for dialog "${dialogId}": ${errorMessage}`);
                    closeDialog();
                }
            };

            const buttons = contribution.buttons && contribution.buttons.length > 0
                ? contribution.buttons
                : [OK_BUTTON];

            const stateWithClose = { ...state, close: closeDialog, onAfterHide: handleAfterHide };
            if (state && typeof state === 'object') {
                (state as { close?: () => void }).close = closeDialog;
                (state as { onAfterHide?: () => void }).onAfterHide = handleAfterHide;
            }

            const dialogLabel =
                state && typeof state === 'object' && typeof (state as { label?: unknown }).label === 'string'
                    ? (state as { label: string }).label
                    : (contribution.label || dialogId);

            const template = contribution.selfContained
                ? contribution.component(stateWithClose)
                : html`
                <wa-dialog label="${dialogLabel}" open @wa-after-hide=${handleAfterHide}>
                    <style>
                        .dialog-service-content {
                            display: flex;
                            flex-direction: column;
                            gap: 1rem;
                            padding: 1rem;
                            min-width: 400px;
                        }
                        
                        .dialog-service-footer {
                            display: flex;
                            gap: 0.5rem;
                            justify-content: flex-end;
                            margin-top: 1rem;
                            padding-top: 1rem;
                            border-top: 1px solid var(--wa-color-neutral-20);
                        }

                        :host-context(.wa-light) .dialog-service-footer {
                            border-top-color: var(--wa-color-neutral-80);
                        }
                    </style>
                    
                    <div class="dialog-service-content" 
                         @dialog-ok=${() => {
                             const okButton = buttons.find(b => b.id === 'ok');
                             if (okButton) {
                                 handleButtonClick(okButton.id);
                             }
                         }}
                         @dialog-cancel=${() => {
                             const cancelButton = buttons.find(b => b.id === 'cancel');
                             if (cancelButton) {
                                 handleButtonClick(cancelButton.id);
                             } else {
                                 closeDialog();
                             }
                         }}>
                        ${contribution.component(state)}
                        
                        <div class="dialog-service-footer">
                            ${buttons.map(button => html`
                                <wa-button 
                                    data-dialog-button="${button.id}"
                                    variant="${button.variant || 'default'}"
                                    ?disabled=${button.disabled}
                                    @click=${() => handleButtonClick(button.id)}
                                >
                                    ${button.label}
                                </wa-button>
                            `)}
                        </div>
                    </div>
                </wa-dialog>
            `;

            render(template, container);
            
            (async () => {
                const allElements = Array.from(container.querySelectorAll('*'));
                for (const element of allElements) {
                    if (element instanceof DocksDialogContent) {
                        await element.updateComplete;
                        dialogContentElement = element;
                        break;
                    }
                }
            })();
        });
    }

    getDialogIds(): string[] {
        return Array.from(this.contributions.keys());
    }

    hasDialog(dialogId: string): boolean {
        return this.contributions.has(dialogId);
    }
}

export const dialogService = new DialogService();
rootContext.put("dialogService", dialogService);

