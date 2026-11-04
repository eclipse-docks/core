import { css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
    DocksPart,
    EditorContentProvider,
    EditorInput,
    File,
    editorRegistry,
    icon,
    parseMarkdownHtml,
} from '@eclipse-docks/core';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

editorRegistry.registerEditorInputHandler({
    editorId: 'system.md-editor',
    label: 'Markdown',
    icon: 'book',
    canHandle: input => input instanceof File && input.getName().toLowerCase().endsWith('.md'),
    handle: async (input: File) => {
        const editorInput = {
            title: input.getWorkspacePath(),
            data: input,
            key: input.getWorkspacePath(),
            icon: 'book',
            state: {},
        } as EditorInput;
        editorInput.component = (id: string) => html`
            <docks-md-editor id="${id}" .input=${editorInput}></docks-md-editor>`;
        return editorInput;
    },
    ranking: 1000,
});

@customElement('docks-md-editor')
export class DocksMDEditor extends DocksPart implements EditorContentProvider {
    @property({ attribute: false })
    input?: EditorInput;

    @state()
    private ready = false;

    @state()
    private mode: 'preview' | 'source' = 'preview';

    @state()
    private rendered = '';

    private sourceText = '';

    protected async doInitUI() {
        const data = this.input?.data;
        if (data instanceof File) this.sourceText = String(await data.getContents() ?? '');
        else if (typeof data === 'string' && data.startsWith('http')) this.sourceText = await (await fetch(data)).text();
        else if (typeof data === 'string') this.sourceText = data;
        this.rendered = parseMarkdownHtml(this.sourceText);
        this.mode = this.input?.state?.mode === 'source' ? 'source' : 'preview';
        this.scrollMode = this.mode === 'source' ? 'none' : 'scroller';
        this.ready = true;
    }

    protected doClose() {
        this.input = undefined;
        this.sourceText = '';
        this.rendered = '';
        this.ready = false;
    }

    override async save(): Promise<void> {
        const value = this.readSource();
        const data = this.input?.data;
        if (data instanceof File) await data.saveContents(value);
        this.rendered = parseMarkdownHtml(value);
        this.markDirty(false);
    }

    getContent(): string | null {
        return this.readSource();
    }

    getSelection(): string | null {
        const field = this.sourceField();
        if (!field) return null;
        const { selectionStart, selectionEnd, value } = field;
        if (selectionStart === selectionEnd) return '';
        return value.slice(selectionStart, selectionEnd);
    }

    getSnippet(lines = 5): { snippet: string; cursorLine: number } | null {
        const field = this.sourceField();
        const text = this.getContent();
        if (!field || text == null) return null;
        const rows = text.split('\n');
        let cursorLine = 0;
        let seen = 0;
        for (let index = 0; index < rows.length; index++) {
            seen += rows[index].length + 1;
            if (seen > field.selectionStart) {
                cursorLine = index;
                break;
            }
        }
        const start = Math.max(0, cursorLine - lines);
        const end = Math.min(rows.length, cursorLine + lines + 1);
        return { snippet: rows.slice(start, end).join('\n'), cursorLine };
    }

    getLanguage(): string | null {
        return 'markdown';
    }

    isLanguage(lang: string): boolean {
        return lang.toLowerCase() === 'markdown';
    }

    getFilePath(): string | null {
        const data = this.input?.data;
        return data instanceof File ? data.getWorkspacePath() : null;
    }

    private toggleMode() {
        this.readSource();
        const next = this.mode === 'preview' ? 'source' : 'preview';
        this.mode = next;
        if (this.input) this.input.state.mode = next;
        this.scrollMode = next === 'source' ? 'none' : 'scroller';
        if (next === 'preview') this.rendered = parseMarkdownHtml(this.sourceText);
    }

    private onInput = (event: Event) => {
        const control = event.currentTarget as HTMLElement & { value?: string };
        const next = typeof control.value === 'string' ? control.value : this.sourceText;
        if (next === this.sourceText) return;
        this.sourceText = next;
        if (this.input?.data instanceof File) this.markDirty(true);
    };

    private readSource(): string {
        const control = this.renderRoot.querySelector('wa-textarea') as (HTMLElement & { value?: string }) | null;
        if (control && typeof control.value === 'string') this.sourceText = control.value;
        return this.sourceText;
    }

    private sourceField(): HTMLTextAreaElement | null {
        const host = this.renderRoot.querySelector('wa-textarea');
        return host?.shadowRoot?.querySelector('textarea') ?? null;
    }

    protected renderToolbar() {
        if (!this.ready) return nothing;
        const toSource = this.mode === 'preview';
        const label = toSource ? 'Source' : 'Preview';
        return html`
            <wa-button appearance="plain" size="s" title=${label} @click=${() => this.toggleMode()}>
                ${icon(toSource ? 'code' : 'eye', { slot: 'start' })}
                ${label}
            </wa-button>
        `;
    }

    protected renderContent() {
        if (!this.ready) return html``;
        if (this.mode === 'source') {
            return html`
                <wa-textarea
                    class="md-source"
                    resize="none"
                    .value=${this.sourceText}
                    ?readonly=${!(this.input?.data instanceof File)}
                    @input=${this.onInput}>
                </wa-textarea>
            `;
        }
        return html`<div class="md-preview">${unsafeHTML(this.rendered)}</div>`;
    }

    static styles = css`
        :host {
            display: block;
            height: 100%;
            min-height: 0;
        }
        .md-preview {
            padding: var(--wa-space-m, 0.75rem);
            box-sizing: border-box;
        }
        .md-source {
            display: block;
            width: 100%;
            height: 100%;
            min-height: 0;
        }
        .md-source::part(base) {
            height: 100%;
            min-height: 0;
        }
        .md-source::part(textarea) {
            height: 100%;
            min-height: 100%;
            resize: none;
            font-family: var(--wa-font-mono, ui-monospace, monospace);
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'docks-md-editor': DocksMDEditor;
    }
}
