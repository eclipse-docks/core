import { css, html, nothing, type PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
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
import '@eclipse-docks/extension-monaco-editor/widget';
import type { DocksMonacoWidget } from '@eclipse-docks/extension-monaco-editor/widget';

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

    @query('docks-monaco-widget')
    private widget?: DocksMonacoWidget;

    private sourceText = '';
    private sourceUri = 'markdown.md';

    protected async doInitUI() {
        const data = this.input?.data;
        if (data instanceof File) {
            this.sourceText = String(await data.getContents() ?? '');
            this.sourceUri = data.getWorkspacePath();
        } else if (typeof data === 'string' && data.startsWith('http')) {
            this.sourceText = await (await fetch(data)).text();
            this.sourceUri = 'remote.md';
        } else if (typeof data === 'string') {
            this.sourceText = data;
        }
        this.rendered = parseMarkdownHtml(this.sourceText);
        this.mode = this.input?.state?.mode === 'source' ? 'source' : 'preview';
        this.scrollMode = this.mode === 'source' ? 'none' : 'scroller';
        this.ready = true;
    }

    protected doClose() {
        this.widget?.dispose();
        this.input = undefined;
        this.sourceText = '';
        this.rendered = '';
        this.ready = false;
    }

    protected override updated(changed: PropertyValues) {
        super.updated(changed);
        if (this.mode === 'source') this.widget?.layout();
    }

    override async save(): Promise<void> {
        const value = this.getContent() ?? '';
        const data = this.input?.data;
        if (data instanceof File) await data.saveContents(value);
        this.rendered = parseMarkdownHtml(value);
        this.markDirty(false);
    }

    getContent(): string | null {
        return this.widget?.getContent() ?? this.sourceText;
    }

    getSelection(): string | null {
        return this.widget?.getSelection() ?? null;
    }

    getSnippet(lines = 5): { snippet: string; cursorLine: number } | null {
        return this.widget?.getSnippet(lines) ?? null;
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
        this.sourceText = this.widget?.getContent() ?? this.sourceText;
        const next = this.mode === 'preview' ? 'source' : 'preview';
        this.mode = next;
        if (this.input) this.input.state.mode = next;
        this.scrollMode = next === 'source' ? 'none' : 'scroller';
        if (next === 'preview') this.rendered = parseMarkdownHtml(this.sourceText);
    }

    private onContentChange = () => {
        const next = this.widget?.getContent() ?? this.sourceText;
        if (next === this.sourceText) return;
        this.sourceText = next;
        if (this.input?.data instanceof File) this.markDirty(true);
    };

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
        const showPreview = this.mode === 'preview';
        return html`
            <div class="md-preview ${showPreview ? '' : 'md-hidden'}">${unsafeHTML(this.rendered)}</div>
            <docks-monaco-widget
                class=${showPreview ? 'md-hidden' : ''}
                .value=${this.sourceText}
                .language=${'markdown'}
                .uri=${this.sourceUri}
                .readOnly=${!(this.input?.data instanceof File)}
                @content-change=${this.onContentChange}>
            </docks-monaco-widget>
        `;
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
        .md-preview.md-hidden, docks-monaco-widget.md-hidden { display: none; }
        docks-monaco-widget { display: block; height: 100%; min-height: 0; }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'docks-md-editor': DocksMDEditor;
    }
}
