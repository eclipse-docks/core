import * as monaco from 'monaco-editor';
import styles from "monaco-editor/min/vs/editor/editor.main.css?raw";
import { customElement, property } from "lit/decorators.js";
import { LitElement, PropertyValues } from "lit";
import { css, html } from "lit";
import { createRef, ref } from "lit/directives/ref.js";

const workerMap: Record<string, string> = {
    'json': new URL('monaco-editor/esm/vs/language/json/json.worker.js', import.meta.url).href,
    'css': new URL('monaco-editor/esm/vs/language/css/css.worker.js', import.meta.url).href,
    'scss': new URL('monaco-editor/esm/vs/language/css/css.worker.js', import.meta.url).href,
    'less': new URL('monaco-editor/esm/vs/language/css/css.worker.js', import.meta.url).href,
    'html': new URL('monaco-editor/esm/vs/language/html/html.worker.js', import.meta.url).href,
    'handlebars': new URL('monaco-editor/esm/vs/language/html/html.worker.js', import.meta.url).href,
    'razor': new URL('monaco-editor/esm/vs/language/html/html.worker.js', import.meta.url).href,
    'typescript': new URL('monaco-editor/esm/vs/language/typescript/ts.worker.js', import.meta.url).href,
    'javascript': new URL('monaco-editor/esm/vs/language/typescript/ts.worker.js', import.meta.url).href,
};

self.MonacoEnvironment = {
    getWorkerUrl(_: unknown, label: string) {
        return workerMap[label] || new URL('monaco-editor/esm/vs/editor/editor.worker.js', import.meta.url).href;
    }
};

@customElement('lyra-monaco-widget')
export class LyraMonacoWidget extends LitElement {
    @property({ attribute: false })
    value?: string;

    @property()
    language?: string;

    @property()
    uri?: string;

    @property({ type: Boolean })
    readOnly: boolean = false;

    @property()
    theme: string = 'vs-dark';

    @property({ type: Boolean, attribute: 'auto-layout' })
    autoLayout = false;

    private containerRef = createRef<HTMLElement>();
    private editor?: monaco.editor.IStandaloneCodeEditor;
    private model?: monaco.editor.ITextModel;
    private themeObserver?: MutationObserver;
    private resizeObserver?: ResizeObserver;

    private getMonacoTheme(): string {
        const root = document.documentElement;
        if (root.classList.contains('wa-dark')) return 'vs-dark';
        if (root.classList.contains('wa-light')) return 'vs';
        return 'vs-dark';
    }

    private setupThemeObserver(): void {
        const rootElement = document.documentElement;
        let currentTheme = this.getMonacoTheme();

        this.themeObserver = new MutationObserver(() => {
            const newTheme = this.getMonacoTheme();
            if (newTheme !== currentTheme) {
                currentTheme = newTheme;
                monaco.editor.setTheme(newTheme);
            }
        });

        this.themeObserver.observe(rootElement, {
            attributes: true,
            attributeFilter: ['class'],
        });
    }

    private ensureEditor() {
        const container = this.containerRef.value;
        if (!container || this.editor) return;
        if (this.value === undefined) return;

        const uri = this.uri != null ? monaco.Uri.file(this.uri) : undefined;
        this.model = monaco.editor.createModel(this.value, this.language, uri);
        this.editor = monaco.editor.create(container, {
            theme: this.getMonacoTheme(),
            automaticLayout: this.autoLayout,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
        });
        this.model.onDidChangeContent(() => {
            if (this.readOnly) return;
            this.dispatchEvent(new CustomEvent('content-change', { bubbles: true, composed: true }));
        });
        this.editor.setModel(this.model);
        this.editor.onDidFocusEditorText(() => {
            this.dispatchEvent(new CustomEvent('editor-focus', { bubbles: true, composed: true }));
        });
        this.editor.onDidBlurEditorText(() => {
            this.dispatchEvent(new CustomEvent('editor-blur', { bubbles: true, composed: true }));
        });
        this.editor.onDidContentSizeChange(() => {
            const height = this.editor?.getContentHeight() ?? 0;
            this.dispatchEvent(new CustomEvent('content-height-changed', { detail: { height }, bubbles: true, composed: true }));
        });
        this.resizeObserver = new ResizeObserver(() => this.editor?.layout());
        this.resizeObserver.observe(container);
        this.setupThemeObserver();
    }

    protected firstUpdated(_changedProperties: PropertyValues) {
        super.firstUpdated(_changedProperties);
        this.ensureEditor();
    }

    protected updated(changedProperties: PropertyValues) {
        super.updated(changedProperties);
        if (changedProperties.has('value') || changedProperties.has('language') || changedProperties.has('uri')) {
            this.ensureEditor();
        }
    }

    disconnectedCallback() {
        this.dispose();
        super.disconnectedCallback();
    }

    public dispose() {
        this.resizeObserver?.disconnect();
        this.resizeObserver = undefined;
        this.themeObserver?.disconnect();
        this.themeObserver = undefined;
        this.model?.dispose();
        this.editor?.dispose();
        this.model = undefined;
        this.editor = undefined;
    }

    public getEditor(): monaco.editor.IStandaloneCodeEditor | undefined {
        return this.editor;
    }

    public getContentHeight(): number {
        return this.editor?.getContentHeight() ?? 0;
    }

    public layout(): void {
        this.editor?.layout();
    }

    public getModel(): monaco.editor.ITextModel | undefined {
        return this.model;
    }

    public getContent(): string | null {
        return this.model?.getValue() ?? null;
    }

    public getLanguage(): string | null {
        return this.model?.getLanguageId()?.toLowerCase() ?? null;
    }

    public isLanguage(lang: string): boolean {
        return this.getLanguage() === lang.toLowerCase();
    }

    public getSelection(): string | null {
        if (!this.editor || !this.model) return null;
        try {
            const selection = this.editor.getSelection();
            if (!selection || selection.isEmpty()) return null;
            return this.model.getValueInRange(selection) || null;
        } catch {
            return null;
        }
    }

    public getSnippet(lines: number = 5): { snippet: string; cursorLine: number } | null {
        if (!this.editor || !this.model) return null;
        try {
            const position = this.editor.getPosition();
            if (!position) return null;
            const n = isNaN(lines) || lines < 0 ? 5 : lines;
            const cursorLineNumber = position.lineNumber;
            const totalLines = this.model.getLineCount();
            const startLine = Math.max(1, cursorLineNumber - n);
            const endLine = Math.min(totalLines, cursorLineNumber + n);
            const snippet = this.model.getValueInRange({
                startLineNumber: startLine,
                startColumn: 1,
                endLineNumber: endLine,
                endColumn: this.model.getLineMaxColumn(endLine),
            });
            return { snippet, cursorLine: cursorLineNumber };
        } catch {
            return null;
        }
    }

    render() {
        return html`
            <style>${styles}</style>
            <div class="monaco-editor-container" ${ref(this.containerRef)}></div>
        `;
    }

    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            position: relative;
            width: 100%;
            height: 100%;
            min-height: 0;
            overflow: hidden;
        }
        div.monaco-editor-container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'lyra-monaco-widget': LyraMonacoWidget;
    }
}
