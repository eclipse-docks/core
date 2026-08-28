import {customElement, property, state} from "lit/decorators.js";
import {DocksPart, parseMarkdownHtml} from "@eclipse-docks/core";
import {html} from "lit";
import {EditorInput, editorRegistry} from "@eclipse-docks/core";
import {unsafeHTML} from "lit/directives/unsafe-html.js";
import {File} from "@eclipse-docks/core";

editorRegistry.registerEditorInputHandler({
    editorId: "system.md-editor",
    label: "Markdown",
    icon: "book",
    canHandle: input => input instanceof File && input.getName().toLowerCase().endsWith(".md"),
    handle: async (input: File) => {
        const editorInput = {
            title: input.getWorkspacePath(),
            data: input,
            key: input.getWorkspacePath(),
            icon: "book",
            state: {},
        } as EditorInput
        editorInput.component = (id: string) => html`
            <docks-md-editor id="${id}" .input=${editorInput}></docks-md-editor>`
        return editorInput;
    },
    ranking: 1000
})

@customElement('docks-md-editor')
export class DocksMDEditor extends DocksPart {
    @property({attribute: false})
    public input?: EditorInput
    @state()
    private mdContents?: string

    protected doClose() {
        this.input = undefined
        this.mdContents = undefined
    }

    protected doBeforeUI() {
        // Start loading content asynchronously
        this.loadContent();
    }

    private async loadContent() {
        const data = this.input!.data
        
        if (data instanceof File) {
            const contents = await data.getContents()
            this.updateContents(contents)
        } else if (typeof data === 'string' && data.startsWith("http")) {
            const response = await fetch(data)
            const text = await response.text()
            this.updateContents(text)
        } else if (typeof data === 'string') {
            this.updateContents(data)
        }
    }

    protected renderContent() {
        return html`
            <div style="padding: 10px;">${unsafeHTML(this.mdContents)}</div>`
    }

    private updateContents(text: string) {
        this.mdContents = parseMarkdownHtml(text)
    }
}
