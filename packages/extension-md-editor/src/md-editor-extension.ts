import {customElement, property, state} from "lit/decorators.js";
import {LyraPart} from "@eclipse-lyra/core";
import {html} from "lit";
import {marked} from "marked";
import {EditorInput, editorRegistry} from "@eclipse-lyra/core";
import {unsafeHTML} from "lit/directives/unsafe-html.js";
import {File} from "@eclipse-lyra/core";

editorRegistry.registerEditorInputHandler({
    editorId: "system.md-editor",
    label: "Markdown",
    icon: "book",
    canHandle: input => input instanceof File && input.getName().toLowerCase().endsWith(".md"),
    handle: async (input: File) => {
        const editorInput = {
            title: input.getName(),
            data: input,
            key: input.getName(),
            icon: "book",
            noOverflow: false,
            state: {},
        } as EditorInput
        editorInput.component = () => html`
            <lyra-md-editor .input=${editorInput}></lyra-md-editor>`
        return editorInput;
    },
    ranking: 1000
})

@customElement('lyra-md-editor')
export class LyraMDEditor extends LyraPart {
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

    protected render() {
        return html`
            <div style="padding: 10px;">${unsafeHTML(this.mdContents)}</div>`
    }

    private updateContents(text: string) {
        this.mdContents = marked.parse(text) as string
    }
}
