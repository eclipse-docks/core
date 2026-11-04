import { customElement, property, state } from "lit/decorators.js";
import { DocksPart } from "@eclipse-docks/core";
import { css, html } from "lit";
import { createRef, ref } from "lit/directives/ref.js";
import { styleMap } from "lit/directives/style-map.js";
import { EditorInput, EditorContentProvider } from "@eclipse-docks/core";
import '@eclipse-docks/extension-monaco-editor/widget';
import type { DocksMonacoWidget } from '@eclipse-docks/extension-monaco-editor/widget';
import { toastError } from "@eclipse-docks/core";
import { AttachedTerminal } from "@eclipse-docks/extension-terminal/api";
import { PyEnv, pythonPackageManagerService } from "./api";
import { parsePackagesFromContent, contentWithPackagesLine } from "./editor-python-run";
import { openEditorPythonTerminal, unbindEditorPythonSession } from "./python-terminal-backend";

@customElement("docks-python-editor")
export class DocksPythonEditor extends DocksPart implements EditorContentProvider {
    @property({ attribute: false })
    public input?: EditorInput;
    @property({ type: Boolean })
    public readOnly = false;

    @state()
    private initialContent: string | undefined = undefined;
    @state()
    private initialUri: string | undefined = undefined;

    @state()
    private pyenv?: PyEnv;
    @state()
    private pyConnected = false;
    @state()
    private pyConnecting = false;
    @state()
    private pyVersion?: string;

    private widgetRef = createRef<DocksMonacoWidget>();
    private readonly sessionId = crypto.randomUUID();
    private editorClosed = false;
    private readonly attachedTerminal = new AttachedTerminal(
        () => {
            if (!this.pyenv) return Promise.resolve(undefined);
            const name = this.input?.data?.getName?.() ?? "Python";
            return openEditorPythonTerminal(this.pyenv, this.sessionId, name);
        },
        () => unbindEditorPythonSession(this.sessionId),
    );

    protected async doInitUI() {
        const file = this.input!.data;
        const textContents = await file.getContents();
        this.initialContent = textContents;
        this.initialUri = file.getName();
        this.requestUpdate();
    }

    private _onContentChange = () => {
        this.markDirty(true);
    };

    save(): void {
        const value = this.widgetRef.value?.getContent() ?? "";
        this.input?.data.saveContents(value);
        this.markDirty(false);
    }

    protected doClose() {
        this.editorClosed = true;
        this.widgetRef.value?.dispose();
        this.attachedTerminal.release();
        if (this.pyenv) {
            this.pyenv.close();
            this.pyenv = undefined;
        }
        this.pyConnected = false;
        this.pyVersion = undefined;
    }

    public getLanguage(): string | null {
        return "python";
    }

    public isLanguage(lang: string): boolean {
        return lang.toLowerCase() === "python";
    }

    public getContent(): string | null {
        return this.widgetRef.value?.getContent() ?? null;
    }

    public getSelection(): string | null {
        return this.widgetRef.value?.getSelection() ?? null;
    }

    public getSnippet(lines: number = 5): { snippet: string; cursorLine: number } | null {
        return this.widgetRef.value?.getSnippet(lines) ?? null;
    }

    public getFilePath(): string | null {
        return this.input?.data?.getWorkspacePath() ?? null;
    }

    public getPyEnv(): PyEnv | undefined {
        return this.pyenv;
    }

    private async initPyEnv(): Promise<void> {
        if (this.pyenv) return;
        this.pyenv = new PyEnv();
        await this.pyenv.init();
        this.pyConnected = true;
        try {
            const response = await this.pyenv.execCode("import sys; sys.version.split()[0]");
            this.pyVersion = response?.result || "Unknown";
        } catch {
            this.pyVersion = "Unknown";
        }
    }

    async connectPython(): Promise<void> {
        if (this.pyConnecting) return;
        if (this.pyConnected) {
            await this.showSessionTerminal();
            return;
        }
        try {
            this.pyConnecting = true;
            await this.initPyEnv();
            await this.showSessionTerminal();
        } catch (err) {
            toastError(err instanceof Error ? err.message : String(err));
        } finally {
            this.pyConnecting = false;
        }
    }

    private async showSessionTerminal(): Promise<void> {
        const opened = await this.attachedTerminal.show();
        if (opened || this.editorClosed) return;
        toastError("Could not open the Python terminal");
    }

    private async runScript(): Promise<void> {
        if (!this.pyConnected || !this.pyenv) {
            await this.connectPython();
            if (!this.pyenv) return;
        }
        const content = this.getContent()?.trim();
        if (!content) {
            toastError("No content to run");
            return;
        }
        try {
            const packages = parsePackagesFromContent(content);
            if (packages.length > 0) await this.pyenv.loadPackages(packages);
            await this.pyenv.execCode(content);
        } catch (err) {
            toastError(err instanceof Error ? err.message : String(err));
        }
    }

    private updateEditorPackagesLine(packages: string[]): void {
        const content = this.getContent() ?? "";
        const newContent = contentWithPackagesLine(content, packages);
        if (newContent === content) return;
        this.widgetRef.value?.getModel()?.setValue(newContent);
        this.markDirty(true);
    }

    private openPackageManager(): void {
        if (!this.pyConnected || !this.pyenv) return;
        const content = this.getContent() ?? "";
        const packages = parsePackagesFromContent(content);
        pythonPackageManagerService.showPackageManager({
            packages,
            pyenv: this.pyenv,
            onPackageAdded: (name) => {
                const next = [...parsePackagesFromContent(this.getContent() ?? ""), name];
                this.updateEditorPackagesLine(next);
            },
            onPackageRemoved: (name) => {
                const next = parsePackagesFromContent(this.getContent() ?? "").filter((p) => p !== name);
                this.updateEditorPackagesLine(next);
            },
        });
    }

    protected renderToolbar() {
        const connectionTitle = this.pyConnecting
            ? "Connecting to Python..."
              : this.pyConnected
              ? "Show Python terminal"
              : "Python Disconnected - Click to connect";
        const connectionText = this.pyConnecting
            ? "Connecting..."
            : this.pyConnected && this.pyVersion
              ? `Python ${this.pyVersion}`
              : "Not connected";
        const iconColor = this.pyConnected
            ? "var(--wa-color-green-40)"
            : this.pyConnecting
              ? "var(--wa-color-warning-500)"
              : "var(--wa-color-red-40)";

        return html`
            <wa-button
                appearance="plain"
                size="s"
                style=${styleMap({ display: "flex", alignItems: "center", gap: "0.5rem" })}
                ?disabled=${this.pyConnecting}
                @click=${() => this.connectPython()}
                title=${connectionTitle}
            >
                <wa-icon name="circle" label="Python status" style=${styleMap({ color: iconColor })}></wa-icon>
                ${connectionText}
            </wa-button>
            <wa-button
                size="s"
                appearance="plain"
                ?disabled=${!this.pyConnected}
                @click=${() => this.runScript()}
                title="Run Python script"
            >
                <wa-icon name="play" label="Run"></wa-icon>
                Run
            </wa-button>
            <wa-button
                size="s"
                appearance="plain"
                ?disabled=${!this.pyConnected}
                @click=${() => this.openPackageManager()}
                title="Manage packages"
            >
                <wa-icon name="box" label="Packages"></wa-icon>
                Packages
            </wa-button>
        `;
    }

    protected updated(changedProperties: Map<string, unknown>) {
        super.updated(changedProperties);
        if (
            changedProperties.has("pyConnected") ||
            changedProperties.has("pyConnecting") ||
            changedProperties.has("pyVersion")
        ) {
        }
    }

    protected renderContent() {
        if (this.initialContent === undefined) {
            return html`<div class="monaco-editor-placeholder"></div>`;
        }
        return html`
            <docks-monaco-widget
                .value=${this.initialContent}
                .uri=${this.initialUri}
                .language=${"python"}
                .readOnly=${this.readOnly}
                @content-change=${this._onContentChange}
                ${ref(this.widgetRef)}
            ></docks-monaco-widget>
        `;
    }

    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            position: relative;
            width: 100%;
            height: 100%;
        }
        .monaco-editor-placeholder {
            flex: 1;
            min-height: 0;
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        "docks-python-editor": DocksPythonEditor;
    }
}
