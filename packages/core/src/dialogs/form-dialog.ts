import { html, css, PropertyValues } from "lit";
import { customElement, state, property } from "lit/decorators.js";
import { DocksDialogContent } from "../parts/dialog-content";
import { contributionRegistry } from "../core/contributionregistry";
import {
    DIALOG_CONTRIBUTION_TARGET,
    OK_BUTTON,
    CANCEL_BUTTON,
    dialogService,
} from "../core/dialogservice";

/** HTML input types supported by {@link formDialog}. */
export type FormDialogFieldType = "text" | "password" | "url" | "email" | "number";

export interface FormDialogField {
    /** Key in the returned values record. */
    name: string;
    label: string;
    type?: FormDialogFieldType;
    value?: string;
    placeholder?: string;
    /** When false, empty values are allowed. Defaults to true. */
    required?: boolean;
}

export interface FormDialogOptions {
    /** Dialog window title (shown on `wa-dialog`). */
    label: string;
    fields: FormDialogField[];
    /** Optional message above the fields (plain text or markdown). */
    message?: string;
    markdown?: boolean;
}

interface FormDialogState extends FormDialogOptions {
    resolve: (values: Record<string, string> | null) => void;
}

@customElement("docks-form-dialog-content")
export class DocksFormDialogContent extends DocksDialogContent {
    @property({ attribute: false })
    fields: FormDialogField[] = [];

    @property({ type: String })
    message = "";

    @property({ type: Boolean })
    markdown = false;

    @state()
    private values: Record<string, string> = {};

    @state()
    private validationError = "";

    static styles = [
        ...DocksDialogContent.styles,
        css`
            .form-fields {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                min-width: 22rem;
            }

            .field label {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
                font-size: var(--wa-font-size-s);
            }

            .field-label {
                font-weight: 500;
                color: var(--wa-color-text-normal);
            }

            wa-input {
                width: 100%;
            }

            .validation-error {
                color: var(--wa-color-danger-600, #dc2626);
                font-size: var(--wa-font-size-s);
            }
        `,
    ];

    async firstUpdated(changedProperties: PropertyValues) {
        super.firstUpdated(changedProperties);
        const initial: Record<string, string> = {};
        for (const field of this.fields) {
            initial[field.name] = field.value ?? "";
        }
        this.values = initial;

        await this.updateComplete;
        const input = this.shadowRoot?.querySelector("wa-input");
        const inputEl = (input as HTMLElement & { shadowRoot?: ShadowRoot })?.shadowRoot?.querySelector(
            "input",
        );
        inputEl?.focus();
    }

    getResult(): Record<string, string> {
        return { ...this.values };
    }

    setValidationError(message: string): void {
        this.validationError = message;
    }

    private updateField(name: string, value: string): void {
        this.values = { ...this.values, [name]: value };
        if (this.validationError) this.validationError = "";
    }

    private handleKeyDown(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            event.preventDefault();
            this.dispatchEvent(new CustomEvent("dialog-ok", { bubbles: true, composed: true }));
        } else if (event.key === "Escape") {
            event.preventDefault();
            this.dispatchEvent(new CustomEvent("dialog-cancel", { bubbles: true, composed: true }));
        }
    }

    render() {
        return html`
            ${this.message ? this.renderMessage(this.message, this.markdown) : null}
            <div class="form-fields" @keydown=${this.handleKeyDown}>
                ${this.fields.map(
                    (field) => html`
                        <div class="field">
                            <label>
                                <span class="field-label">${field.label}</span>
                                <wa-input
                                    type=${field.type ?? "text"}
                                    .value=${this.values[field.name] ?? ""}
                                    placeholder=${field.placeholder ?? ""}
                                    @input=${(event: Event) =>
                                        this.updateField(
                                            field.name,
                                            (event.target as HTMLInputElement).value,
                                        )}
                                ></wa-input>
                            </label>
                        </div>
                    `,
                )}
                ${this.validationError
                    ? html`<div class="validation-error">${this.validationError}</div>`
                    : null}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "docks-form-dialog-content": DocksFormDialogContent;
    }
}

function trimValues(values: Record<string, string>): Record<string, string> {
    return Object.fromEntries(
        Object.entries(values).map(([key, value]) => [key, value.trim()]),
    );
}

function findFormDialogContent(): DocksFormDialogContent | null {
    return document.querySelector("docks-form-dialog-content");
}

/** Validates required fields; returns an error message or null if valid. */
export function validateFormDialogFields(
    fields: FormDialogField[],
    values: Record<string, string>,
): string | null {
    for (const field of fields) {
        if (field.required === false) continue;
        if (!values[field.name]?.trim()) {
            return `${field.label} is required.`;
        }
    }
    return null;
}

contributionRegistry.registerContribution(DIALOG_CONTRIBUTION_TARGET, {
    id: "form",
    label: "Form",
    buttons: [OK_BUTTON, CANCEL_BUTTON],
    component: (state?: FormDialogState) => {
        if (!state) {
            return html`<div>Error: No form dialog state</div>`;
        }

        return html`
            <docks-form-dialog-content
                .message=${state.message ?? ""}
                .markdown=${state.markdown ?? false}
                .fields=${state.fields}
            ></docks-form-dialog-content>
        `;
    },
    onButton: async (id: string, result: unknown, state?: FormDialogState) => {
        if (!state) {
            return true;
        }

        if (id === "ok") {
            const values = trimValues((result ?? {}) as Record<string, string>);
            const error = validateFormDialogFields(state.fields, values);
            if (error) {
                findFormDialogContent()?.setValidationError(error);
                return false;
            }
            state.resolve(values);
        } else {
            state.resolve(null);
        }

        return true;
    },
});

export function formDialog(options: FormDialogOptions): Promise<Record<string, string> | null> {
    return new Promise((resolve) => {
        dialogService.open("form", { ...options, resolve });
    });
}

export async function formDialogRequired(
    options: FormDialogOptions,
): Promise<Record<string, string>> {
    const values = await formDialog(options);
    if (!values) throw new Error("Cancelled");
    return values;
}
