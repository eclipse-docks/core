import { css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Ref, createRef, ref } from "lit/directives/ref.js";
import { repeat } from "lit/directives/repeat.js";
import { styleMap } from "lit/directives/style-map.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { marked } from "marked";
import type { EditorInput } from "@eclipse-lyra/core";
import { LyraMonacoWidget } from "@eclipse-lyra/extension-monaco-editor/widget";
import { createLogger, File, LyraPart, contributionRegistry, subscribe, unsubscribe, TOPIC_CONTRIBUTEIONS_CHANGED } from "@eclipse-lyra/core";
import type { NotebookCell, NotebookData, NotebookEditorLike } from "./notebook-types";
import type { NotebookKernel, NotebookKernelContribution } from "./notebook-kernel-api";
import { TARGET_NOTEBOOK_KERNELS } from "./notebook-kernel-api";

const logger = createLogger('NotebookRuntime');

@customElement('lyra-notebook-editor')
export class LyraNotebookEditor extends LyraPart implements NotebookEditorLike {
    @property({ attribute: false })
    public input?: EditorInput;

    @state()
    public notebook?: NotebookData;

    @state()
    private cellOutputs: Map<number, any> = new Map();

    @state()
    private executingCells: Set<number> = new Set();

    @state()
    private availableKernels: NotebookKernelContribution[] = [];

    @state()
    private selectedKernelId: string | null = null;

    @state()
    private kernel: NotebookKernel | null = null;

    @state()
    private kernelConnected: boolean = false;

    @state()
    private kernelConnecting: boolean = false;

    @state()
    private kernelVersion: string | undefined = undefined;

    private unsubscribeContributionsToken?: string;

    @state()
    private editingMarkdownCells: Set<number> = new Set();

    @state()
    private executionCounter: number = 0;

    @state()
    private isRunningAll: boolean = false;

    @state()
    private highlightedCellIndex: number = -1;

    public focusedCellIndex: number = -1;
    private cancelRunAll: boolean = false;

    private cellWidgetRefs: Map<number, Ref<LyraMonacoWidget>> = new Map();
    @state() private cellHeights: Map<number, number> = new Map();

    protected doClose() {
        this.input = undefined;
        this.notebook = undefined;
        this.cellOutputs.clear();
        this.executingCells.clear();
        this.cellWidgetRefs.clear();
        this.cellHeights.clear();
        this.focusedCellIndex = -1;

        if (this.unsubscribeContributionsToken) {
            unsubscribe(this.unsubscribeContributionsToken);
            this.unsubscribeContributionsToken = undefined;
        }

        if (this.kernel?.close) {
            void Promise.resolve(this.kernel.close());
        }
        this.kernel = null;
        this.kernelConnected = false;
        this.kernelVersion = undefined;
    }

    async save() {
        if (!this.notebook || !this.input) return;

        try {
            // Update cell contents from Monaco editors before saving
            this.saveEditorContents();

            this.notebook.cells.forEach((cell, index) => {
                if (cell.cell_type === 'code') {
                    const output = this.cellOutputs.get(index);
                    cell.outputs = output ? this.convertOutputToJupyter(output, cell.execution_count) : [];
                }
            });

            // Serialize notebook to JSON
            const notebookJson = JSON.stringify(this.notebook, null, 2);

            // Save to file
            const file: File = this.input.data;
            await file.saveContents(notebookJson);

            // Mark as not dirty
            this.markDirty(false);
        } catch (error) {
            console.error("Failed to save notebook:", error);
            throw error;
        }
    }

    protected doBeforeUI() {
        // Start loading notebook asynchronously
        this.loadNotebook();
    }

    private async onKernelDropdownSelect(e: CustomEvent<{ item?: { value?: string } }>): Promise<void> {
        const value = e.detail?.item?.value ?? '';
        const nextId = value || null;
        if (this.selectedKernelId === nextId) return;
        if (this.kernel?.close) void Promise.resolve(this.kernel.close());
        this.kernel = null;
        this.kernelConnected = false;
        this.kernelVersion = undefined;
        this.selectedKernelId = nextId;
        if (this.notebook) {
            if (!this.notebook.metadata) this.notebook.metadata = {};
            this.notebook.metadata.kernel = nextId ?? undefined;
        }
        this.cellOutputs.clear();
        this.executionCounter = 0;
        this.notebook?.cells?.forEach((cell) => {
            if (cell.cell_type === 'code') {
                cell.execution_count = null;
                cell.outputs = [];
            }
        });
        this.resetCellState();
        await this.ensureKernelLoaded();
        this.requestUpdate();
        this.updateToolbar();
    }

    protected renderToolbar() {
        const kernels = this.availableKernels;
        const hasKernels = kernels.length > 0;
        const currentLabel = this.selectedKernelId
            ? kernels.find((c) => c.id === this.selectedKernelId)?.label ?? this.selectedKernelId
            : 'Select kernel';

        const connectionTitle = this.kernelConnecting
            ? 'Connecting...'
            : this.kernelConnected
                ? 'Kernel connected'
                : 'Kernel disconnected';
        const connectionText = this.kernelConnecting
            ? 'Connecting...'
            : this.kernelConnected
                ? (this.kernelVersion ?? 'Connected')
                : 'Not connected';
        const iconColor = this.kernelConnected
            ? 'var(--wa-color-green-40)'
            : this.kernelConnecting
                ? 'var(--wa-color-warning-500)'
                : 'var(--wa-color-red-40)';

        const runAllButton = this.isRunningAll ? html`
            <wa-button size="small" appearance="plain" @click=${() => this.cancelAllCells()} title="Cancel running all cells">
                <wa-icon name="stop" label="Stop"></wa-icon>
                Cancel All
            </wa-button>
        ` : html`
            <wa-button size="small" appearance="plain" @click=${() => this.runAllCells()} title="Run all code cells sequentially">
                <wa-icon name="play" label="Run"></wa-icon>
                Run All
            </wa-button>
        `;

        return html`
            <wa-dropdown
                class="kernel-select"
                placement="bottom-start"
                distance="4"
                size="small"
                @wa-select=${(e: CustomEvent<{ item?: { value?: string } }>) => void this.onKernelDropdownSelect(e)}
            >
                <wa-button
                    slot="trigger"
                    appearance="plain"
                    size="small"
                    with-caret
                    title="Notebook kernel"
                >
                    ${currentLabel}
                </wa-button>
                ${kernels.map(
                    (c) => html`
                        <wa-dropdown-item
                            value=${c.id}
                            type="checkbox"
                            ?checked=${c.id === this.selectedKernelId}
                        >
                            ${c.label}
                        </wa-dropdown-item>
                    `
                )}
            </wa-dropdown>
            ${runAllButton}
            <wa-button
                size="small"
                appearance="plain"
                @click=${() => this.clearAllOutputs()}
                title="Clear all outputs and reset execution counter"
            >
                <wa-icon name="eraser" label="Clear"></wa-icon>
                Clear Outputs
            </wa-button>
            ${this.kernel?.restart ? html`
                <wa-button
                    size="small"
                    appearance="plain"
                    @click=${() => void this.restartKernel()}
                    title="Restart kernel"
                    ?disabled=${!this.kernelConnected || this.kernelConnecting}
                >
                    <wa-icon name="arrows-rotate" label="Restart"></wa-icon>
                    Restart Kernel
                </wa-button>
            ` : ''}
            ${this.kernel?.openPackageManager ? html`
                <wa-button
                    size="small"
                    appearance="plain"
                    @click=${() => this.openPackageManager()}
                    title="Manage packages"
                >
                    <wa-icon name="box" label="Packages"></wa-icon>
                    Packages
                </wa-button>
            ` : ''}
            ${this.kernel ? (this.kernel.connect ? html`
                <wa-button
                    appearance="plain"
                    size="small"
                    style="display: flex; align-items: center; gap: 0.5rem;"
                    ?disabled=${this.kernelConnecting}
                    @click=${() => void this.connectKernel()}
                    title=${connectionTitle}
                >
                    <wa-icon name="circle" label="Kernel status" style=${styleMap({ color: iconColor })}></wa-icon>
                    ${connectionText}
                </wa-button>
            ` : html`
                <span style="display: flex; align-items: center; gap: 0.5rem;" title=${connectionTitle}>
                    <wa-icon name="circle" label="Kernel status" style=${styleMap({ color: iconColor })}></wa-icon>
                    ${connectionText}
                </span>
            `) : ''}
        `;
    }

    private async connectKernel(): Promise<void> {
        if (this.kernelConnecting || !this.kernel?.connect) return;
        try {
            this.kernelConnecting = true;
            this.requestUpdate();
            this.updateToolbar();
            await this.kernel.connect({
                requiredPackages: this.notebook?.metadata?.required_packages,
            });
            this.kernelConnected = true;
            if (this.kernel.getVersion) this.kernelVersion = await this.kernel.getVersion();
        } catch (err) {
            logger.error('Failed to connect kernel', err);
        } finally {
            this.kernelConnecting = false;
            this.requestUpdate();
            this.updateToolbar();
        }
    }

    protected async doInitUI() {
        this.unsubscribeContributionsToken = subscribe(TOPIC_CONTRIBUTEIONS_CHANGED, (event: { target?: string }) => {
            if (event?.target === TARGET_NOTEBOOK_KERNELS) {
                void this.refreshKernels();
            }
        });
        await this.refreshKernels();
    }

    private resolveDefaultKernelId(contributions: NotebookKernelContribution[]): string | null {
        if (!contributions.length) return null;
        const fromMeta = this.notebook?.metadata?.kernel;
        if (fromMeta && contributions.some((c) => c.id === fromMeta)) return fromMeta;
        const python = contributions.find((c) => c.id === 'python');
        if (python) return python.id;
        const js = contributions.find((c) => c.id === 'javascript');
        if (js) return js.id;
        return contributions[0].id;
    }

    private async refreshKernels(): Promise<void> {
        const contributions = contributionRegistry.getContributions<NotebookKernelContribution>(TARGET_NOTEBOOK_KERNELS);
        this.availableKernels = contributions;
        if (!this.selectedKernelId && contributions.length) {
            this.selectedKernelId = this.resolveDefaultKernelId(contributions);
            if (this.notebook && this.selectedKernelId) {
                if (!this.notebook.metadata) this.notebook.metadata = {};
                this.notebook.metadata.kernel = this.selectedKernelId;
            }
        }
        if (this.selectedKernelId && !contributions.some((c) => c.id === this.selectedKernelId)) {
            this.selectedKernelId = contributions.length ? contributions[0].id : null;
        }
        this.requestUpdate();
        await this.ensureKernelLoaded();
        this.updateToolbar();
    }

    private async ensureKernelLoaded(): Promise<void> {
        const id = this.selectedKernelId;
        if (!id || this.kernel?.id === id) return;
        if (this.kernel?.close) void Promise.resolve(this.kernel.close());
        this.kernel = null;
        this.kernelConnected = false;
        this.kernelVersion = undefined;
        const contribution = this.availableKernels.find((c) => c.id === id);
        if (!contribution) return;
        try {
            this.kernelConnecting = true;
            this.requestUpdate();
            this.updateToolbar();
            const k = await contribution.loadKernel();
            if (this.selectedKernelId !== id) return;
            this.kernel = k;
            if (k.connect) {
                await k.connect({
                    requiredPackages: this.notebook?.metadata?.required_packages,
                });
            }
            this.kernelConnected = true;
            if (k.getVersion) {
                this.kernelVersion = await k.getVersion();
            }
        } catch (err) {
            logger.error('Failed to load kernel', id, err);
        } finally {
            this.kernelConnecting = false;
            this.requestUpdate();
            this.updateToolbar();
        }
    }

    private async loadNotebook() {
        const file: File = this.input!.data;
        const contents = await file.getContents();

        try {
            this.notebook = JSON.parse(contents as string);
        } catch (e) {
            console.error("Failed to parse notebook:", e);
            this.notebook = {
                cells: [{
                    cell_type: 'markdown',
                    source: ['# Error\nFailed to parse notebook file.']
                }]
            };
        }

        if (this.notebook?.metadata?.kernel) {
            this.selectedKernelId = this.notebook.metadata.kernel;
        }

        if (this.notebook?.cells) {
            const maxCount = this.notebook.cells
                .filter(cell => cell.cell_type === 'code')
                .map(cell => cell.execution_count ?? 0)
                .reduce((max, count) => Math.max(max, count), 0);
            this.executionCounter = maxCount;

            this.notebook.cells.forEach((cell, index) => {
                if (cell.cell_type === 'code' && cell.outputs && cell.outputs.length > 0) {
                    const output = this.convertOutputFromJupyter(cell.outputs[0]);
                    if (output) {
                        this.cellOutputs.set(index, output);
                    }
                }
            });
        }

        void this.refreshKernels();
    }

    private getCellSource(cell: NotebookCell): string {
        return Array.isArray(cell.source) ? cell.source.join('') : cell.source;
    }

    private convertOutputToJupyter(output: any, executionCount: number | null | undefined): any[] {
        if (output.type === 'execute_result') {
            const data: any = {};
            if (output.imageData) data['image/png'] = output.imageData;
            if (output.data) data['text/plain'] = output.data;
            return [{
                output_type: 'execute_result',
                data,
                execution_count: executionCount,
                metadata: {}
            }];
        } else if (output.type === 'error') {
            return [{
                output_type: 'error',
                ename: 'Error',
                evalue: output.data,
                traceback: [output.data]
            }];
        }
        return [];
    }

    private convertOutputFromJupyter(jupyterOutput: any): any | null {
        if (jupyterOutput.output_type === 'execute_result' && jupyterOutput.data) {
            return {
                type: 'execute_result',
                data: jupyterOutput.data['text/plain'] || '',
                imageData: jupyterOutput.data['image/png'] || undefined
            };
        } else if (jupyterOutput.output_type === 'error') {
            return {
                type: 'error',
                data: jupyterOutput.evalue || jupyterOutput.traceback?.join('\n') || 'Unknown error'
            };
        }
        return null;
    }

    private renderHeaderActions(index: number, additionalButton?: any) {
        return html`
            <div class="cell-header-actions">
                ${additionalButton || ''}
                ${additionalButton ? html`<span class="divider"></span>` : ''}
                <wa-button size="small" appearance="plain" @click=${() => this.addCell(index, 'code')} title="Add code cell before">
                    <wa-icon name="plus"></wa-icon>
                    <wa-icon name="code" label="Code"></wa-icon>
                </wa-button>
                <wa-button size="small" appearance="plain" @click=${() => this.addCell(index, 'markdown')} title="Add markdown cell before">
                    <wa-icon name="plus"></wa-icon>
                    <wa-icon name="font" label="Markdown"></wa-icon>
                </wa-button>
                <span class="divider"></span>
                <wa-button size="small" appearance="plain" @click=${() => this.deleteCell(index)} title="Delete cell" ?disabled=${this.notebook!.cells.length <= 1}>
                    <wa-icon name="trash" label="Delete cell"></wa-icon>
                </wa-button>
            </div>
        `;
    }

    private renderFooterActions(index: number) {
        return html`
            <div class="cell-footer">
                <wa-button size="small" appearance="plain" @click=${() => this.addCell(index + 1, 'code')} title="Add code cell after">
                    <wa-icon name="code" label="Code"></wa-icon>
                    <wa-icon name="plus"></wa-icon>
                </wa-button>
                <wa-button size="small" appearance="plain" @click=${() => this.addCell(index + 1, 'markdown')} title="Add markdown cell after">
                    <wa-icon name="font" label="Markdown"></wa-icon>
                    <wa-icon name="plus"></wa-icon>
                </wa-button>
            </div>
        `;
    }

    // Helper to convert string to Jupyter source format
    private stringToSourceArray(content: string): string[] {
        if (!content) return [''];
        const lines = content.split('\n').map(line => line + '\n');
        // Remove trailing newline from last line
        if (lines.length > 0) {
            lines[lines.length - 1] = lines[lines.length - 1].replace(/\n$/, '');
        }
        return lines;
    }

    // Helper to create a new cell
    private createCell(cellType: 'code' | 'markdown'): NotebookCell {
        const newCell: NotebookCell = {
            cell_type: cellType,
            source: [''],
            metadata: {}
        };

        if (cellType === 'code') {
            newCell.execution_count = null;
            newCell.outputs = [];
        }

        return newCell;
    }

    public async executeCell(cellIndex: number) {
        const cell = this.notebook!.cells[cellIndex];
        if (cell.cell_type !== 'code') return;

        this.executingCells.add(cellIndex);
        this.requestUpdate();

        try {
            await this.ensureKernelLoaded();
            const k = this.kernel;
            if (!k) {
                if (this.executingCells.has(cellIndex)) {
                    this.cellOutputs.set(cellIndex, { type: 'error', data: 'No kernel selected' });
                }
                return;
            }

            const widget = this.getCellWidgetRef(cellIndex).value;
            const code = widget ? widget.getContent() : this.getCellSource(cell);
            if (code === null || code === undefined) return;

            const result = await k.execute(code);

            if (result.error) {
                this.cellOutputs.set(cellIndex, { type: 'error', data: result.error });
            } else {
                this.cellOutputs.set(cellIndex, {
                    type: 'execute_result',
                    data: result.data,
                    imageData: result.imageData,
                });
            }

            this.executionCounter++;
            cell.execution_count = this.executionCounter;
            this.markDirty(true);
        } catch (error) {
            if (this.executingCells.has(cellIndex)) {
                this.cellOutputs.set(cellIndex, {
                    type: 'error',
                    data: error instanceof Error ? error.message : String(error),
                });
            }
        } finally {
            this.executingCells.delete(cellIndex);
            this.requestUpdate();
        }
    }

    private cancelExecution(cellIndex: number) {
        if (this.kernel?.interrupt) {
            this.kernel.interrupt();
        } else {
            this.cellOutputs.set(cellIndex, {
                type: 'error',
                data: 'Cancellation not supported for this kernel',
            });
            this.executingCells.delete(cellIndex);
            this.requestUpdate();
        }
    }

    private clearAllOutputs() {
        // Clear all outputs
        this.cellOutputs.clear();

        // Reset execution counter
        this.executionCounter = 0;

        // Reset execution counts on all code cells
        if (this.notebook?.cells) {
            this.notebook.cells.forEach(cell => {
                if (cell.cell_type === 'code') {
                    cell.execution_count = null;
                    cell.outputs = [];
                }
            });
        }

        // Mark as dirty since we've modified the notebook
        this.markDirty(true);

        // Force re-render
        this.requestUpdate();
    }

    private async restartKernel() {
        if (!this.kernel?.restart || this.kernelConnecting) return;
        try {
            this.kernelConnecting = true;
            this.requestUpdate();
            this.updateToolbar();
            await this.kernel.restart();
            this.kernelConnected = true;
            if (this.kernel.getVersion) this.kernelVersion = await this.kernel.getVersion();
        } catch (error) {
            logger.error('Failed to restart kernel', error);
        } finally {
            this.kernelConnecting = false;
            this.requestUpdate();
            this.updateToolbar();
        }
    }

    private async runAllCells() {
        if (!this.notebook?.cells) return;

        this.isRunningAll = true;
        this.cancelRunAll = false;
        this.requestUpdate();

        try {
            // Execute all code cells sequentially
            for (let i = 0; i < this.notebook.cells.length; i++) {
                // Check if cancellation was requested
                if (this.cancelRunAll) {
                    break;
                }

                const cell = this.notebook.cells[i];
                if (cell.cell_type === 'code') {
                    await this.executeCell(i);
                }
            }
        } finally {
            this.isRunningAll = false;
            this.cancelRunAll = false;
            this.requestUpdate();
        }
    }

    private cancelAllCells() {
        this.cancelRunAll = true;
        this.kernel?.interrupt?.();
    }

    private toggleMarkdownEdit(index: number) {
        if (this.editingMarkdownCells.has(index)) {
            this.editingMarkdownCells.delete(index);
        } else {
            this.editingMarkdownCells.add(index);
        }
        this.requestUpdate();
    }

    private saveMarkdownEdit(index: number, event: Event) {
        const textarea = event.target as HTMLTextAreaElement;
        const newContent = textarea.value;

        // Update the cell source
        if (this.notebook && this.notebook.cells[index]) {
            const cell = this.notebook.cells[index];
            const oldContent = this.getCellSource(cell);

            cell.source = this.stringToSourceArray(newContent);

            // Mark dirty if content changed
            if (oldContent !== newContent) {
                this.markDirty(true);
            }
        }

        this.editingMarkdownCells.delete(index);
        this.requestUpdate();
    }

    private renderMarkdownCell(cell: NotebookCell, index: number) {
        const source = this.getCellSource(cell);
        const isEmpty = !source || source.trim() === '';
        const isEditing = this.editingMarkdownCells.has(index);

        if (isEditing) {
            const editButtons = html`
                <wa-button 
                    size="small" 
                    appearance="plain"
                    @click=${(e: Event) => {
                        const textarea = (e.target as HTMLElement).closest('.markdown-cell')?.querySelector('textarea');
                        if (textarea) {
                            this.saveMarkdownEdit(index, { target: textarea } as any);
                        }
                    }}
                    title="Save changes">
                    <wa-icon name="check" label="Save"></wa-icon>
                </wa-button>
                <wa-button 
                    size="small" 
                    appearance="plain"
                    @click=${() => this.toggleMarkdownEdit(index)}
                    title="Cancel editing">
                    <wa-icon name="xmark" label="Cancel"></wa-icon>
                </wa-button>
            `;
            
            return html`
                <div class="cell-wrapper">
                    <wa-animation 
                        name="bounce" 
                        duration="1000" 
                        iterations="1"
                        ?play=${this.highlightedCellIndex === index}
                        @wa-finish=${() => this.highlightedCellIndex = -1}>
                        <div class="cell markdown-cell editing">
                            <div class="cell-header">
                                ${this.renderHeaderActions(index, editButtons)}
                                <span class="cell-label">Markdown</span>
                            </div>
                            <textarea 
                                class="markdown-editor"
                                .value=${source}
                                @blur=${(e: Event) => this.saveMarkdownEdit(index, e)}
                                placeholder="Enter markdown content here... (# for headings, ** for bold, etc.)"></textarea>
                            ${this.renderFooterActions(index)}
                        </div>
                    </wa-animation>
                </div>
            `;
        }

        const rendered = marked.parse(source) as string;

        const editButton = html`
            <wa-button 
                size="small" 
                appearance="plain"
                @click=${() => this.toggleMarkdownEdit(index)}
                title="Edit markdown">
                <wa-icon name="pencil" label="Edit"></wa-icon>
            </wa-button>
        `;

        return html`
            <div class="cell-wrapper">
                <wa-animation 
                    name="bounce" 
                    duration="1000" 
                    iterations="1"
                    ?play=${this.highlightedCellIndex === index}
                    @wa-finish=${() => this.highlightedCellIndex = -1}>
                    <div class="cell markdown-cell ${isEmpty ? 'empty' : ''}" @dblclick=${() => this.toggleMarkdownEdit(index)}>
                        <div class="cell-header">
                            ${this.renderHeaderActions(index, editButton)}
                            <span class="cell-label"></span>
                        </div>
                        <div class="cell-content">
                            ${isEmpty ? html`
                                <div class="markdown-placeholder">
                                    <wa-icon name="font" label="Markdown"></wa-icon>
                                    <span>Double-click or click the pencil icon to edit markdown</span>
                                </div>
                            ` : unsafeHTML(rendered)}
                        </div>
                        ${this.renderFooterActions(index)}
                    </div>
                </wa-animation>
            </div>
        `;
    }

    private renderCodeCell(cell: NotebookCell, index: number) {
        const output = this.cellOutputs.get(index);
        const isExecuting = this.executingCells.has(index);
        const source = this.getCellSource(cell);
        const language = this.kernel?.language ?? 'javascript';
        const notebookPath = (this.input?.data as File)?.getWorkspacePath?.() ?? 'notebook';
        const cellUri = `${notebookPath}-cell-${index}`;
        const cellHeight = this.cellHeights.get(index) ?? Math.max(100, source.split('\n').length * 19 + 10);

        const runButton = isExecuting ? html`
            <wa-button 
                size="small" 
                appearance="plain"
                @click=${() => this.cancelExecution(index)}
                title="Stop execution">
                <wa-icon name="stop" label="Stop" style="color: var(--wa-color-danger-500);"></wa-icon>
            </wa-button>
        ` : html`
            <lyra-command 
                cmd="notebook.runCell"
                icon="play"
                title="Run cell"
                size="small"
                appearance="plain"
                .params=${{ cellIndex: index }}>
            </lyra-command>
        `;

        return html`
            <div class="cell-wrapper">
                <wa-animation 
                    name="bounce" 
                    duration="1000" 
                    iterations="1"
                    ?play=${this.highlightedCellIndex === index}
                    @wa-finish=${() => this.highlightedCellIndex = -1}>
                    <div class="cell code-cell ${isExecuting ? 'executing' : ''}">
                        <div class="cell-header">
                            <span class="cell-label">
                                ${isExecuting ? html`
                                    In [<wa-animation name="pulse" duration="1000" iterations="Infinity" ?play=${isExecuting}>
                                        <span class="executing-indicator">*</span>
                                    </wa-animation>]
                                ` : html`
                                    In [${cell.execution_count ?? ' '}]
                                `}
                            </span>
                            ${this.renderHeaderActions(index, runButton)}
                        </div>
                        <div
                            class="cell-input monaco-container"
                            style=${styleMap({ height: `${cellHeight}px` })}
                            @wheel=${(e: WheelEvent) => this.onCellWheel(index, e)}
                        >
                            <lyra-monaco-widget
                                .value=${source}
                                .language=${language}
                                .uri=${cellUri}
                                ?autoLayout=${true}
                                @content-change=${() => this.markDirty(true)}
                                @editor-focus=${() => { this.focusedCellIndex = index; }}
                                @editor-blur=${() => { if (this.focusedCellIndex === index) this.focusedCellIndex = -1; }}
                                @content-height-changed=${(e: CustomEvent<{ height: number }>) => this.onCellHeightChange(index, e.detail.height)}
                                ${ref(this.getCellWidgetRef(index))}
                            ></lyra-monaco-widget>
                        </div>
                        ${output ? html`
                            <div class="cell-output ${output.type === 'error' ? 'output-error' : ''}">
                                <div class="output-label">Out [${index + 1}]:</div>
                                ${output.imageData ? html`
                                    <img src="data:image/png;base64,${output.imageData}" alt="Output image" class="output-image" />
                                ` : ''}
                                ${output.data ? html`<pre><code>${output.data}</code></pre>` : ''}
                            </div>
                        ` : ''}
                        ${this.renderFooterActions(index)}
                    </div>
                </wa-animation>
            </div>
        `;
    }

    private renderCell(cell: NotebookCell, index: number) {
        if (cell.cell_type === 'markdown') {
            return this.renderMarkdownCell(cell, index);
        } else if (cell.cell_type === 'code') {
            return this.renderCodeCell(cell, index);
        } else {
            // raw cell
            const source = this.getCellSource(cell);
            return html`
                <div class="cell raw-cell">
                    <pre><code>${source}</code></pre>
                </div>
            `;
        }
    }

    private addCell(index: number, cellType: 'code' | 'markdown' = 'code') {
        if (!this.notebook) return;

        // Save editor contents BEFORE modifying the cells array
        this.saveEditorContents();
        
        this.shiftIndices(index, 'up');
        
        this.notebook.cells.splice(index, 0, this.createCell(cellType));
        
        // Automatically enter edit mode for new markdown cells
        if (cellType === 'markdown') {
            this.editingMarkdownCells.add(index);
        }
        
        this.resetCellState();
        
        // Trigger animation and scroll to the new cell
        this.highlightedCellIndex = index;
        this.updateComplete.then(() => {
            this.scrollToCell(index);
        });
    }

    private scrollToCell(index: number) {
        // Find the cell wrapper element
        const cellWrapper = this.shadowRoot?.querySelectorAll('.cell-wrapper')[index];
        if (!cellWrapper) return;

        // Find the wa-scroller container (parent of this component)
        const scroller = this.closest('wa-scroller');
        if (!scroller) {
            // Fallback to default scrollIntoView if no scroller found
            cellWrapper.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center',
                inline: 'nearest'
            });
            return;
        }

        // Manually scroll the wa-scroller to the cell position
        const scrollerRect = scroller.getBoundingClientRect();
        const cellRect = cellWrapper.getBoundingClientRect();
        const scrollTop = scroller.scrollTop;
        
        // Calculate target scroll position (center the cell)
        const targetScroll = scrollTop + (cellRect.top - scrollerRect.top) - (scrollerRect.height / 2) + (cellRect.height / 2);
        
        scroller.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    }

    private saveEditorContents() {
        this.notebook?.cells.forEach((cell, index) => {
            if (cell.cell_type !== 'code') return;
            const widget = this.getCellWidgetRef(index).value;
            const value = widget?.getContent();
            if (value !== undefined && value !== null) {
                cell.source = this.stringToSourceArray(value);
            }
        });
    }

    private resetCellState() {
        this.markDirty(true);
    }

    private deleteCell(index: number) {
        if (!this.notebook || this.notebook.cells.length <= 1) return;

        // Save editor contents BEFORE modifying the cells array
        this.saveEditorContents();
        
        // Remove state for the deleted cell
        this.cellOutputs.delete(index);
        this.executingCells.delete(index);
        this.editingMarkdownCells.delete(index);
        
        this.notebook.cells.splice(index, 1);
        
        this.shiftIndices(index, 'down');
        
        this.resetCellState();
    }

    private shiftIndices(startIndex: number, direction: 'up' | 'down') {
        const shift = direction === 'up' ? 1 : -1;
        const filterFn = direction === 'up' 
            ? (idx: number) => idx >= startIndex
            : (idx: number) => idx > startIndex;
        const sortFn = direction === 'up'
            ? (a: number, b: number) => b - a
            : (a: number, b: number) => a - b;

        const shiftMap = <T>(map: Map<number, T>) => {
            const indices = Array.from(map.keys()).filter(filterFn).sort(sortFn);
            indices.forEach(oldIndex => {
                const value = map.get(oldIndex);
                map.delete(oldIndex);
                map.set(oldIndex + shift, value!);
            });
        };

        const shiftSet = (set: Set<number>) => {
            const indices = Array.from(set).filter(filterFn).sort(sortFn);
            indices.forEach(oldIndex => {
                set.delete(oldIndex);
                set.add(oldIndex + shift);
            });
        };

        shiftMap(this.cellOutputs);
        shiftSet(this.executingCells);
        shiftSet(this.editingMarkdownCells);
        shiftMap(this.cellWidgetRefs);
        shiftMap(this.cellHeights);
    }

    private getCellWidgetRef(index: number): Ref<LyraMonacoWidget> {
        if (!this.cellWidgetRefs.has(index)) {
            this.cellWidgetRefs.set(index, createRef());
        }
        return this.cellWidgetRefs.get(index)!;
    }

    private onCellHeightChange(index: number, height: number): void {
        const padding = 10;
        const minHeight = 100;
        const newHeight = Math.max(minHeight, height + padding);
        const current = this.cellHeights.get(index);
        if (current === newHeight) return;
        this.cellHeights = new Map(this.cellHeights);
        this.cellHeights.set(index, newHeight);
        this.requestUpdate();
        this.updateComplete.then(() => (this.getCellWidgetRef(index).value as { layout?: () => void })?.layout?.());
    }

    private onCellWheel(index: number, e: WheelEvent): void {
        const widget = this.getCellWidgetRef(index).value;
        const editor = widget?.getEditor();
        if (!editor) return;
        const scrollTop = editor.getScrollTop();
        const scrollHeight = editor.getScrollHeight();
        const contentHeight = editor.getContentHeight();
        const canScroll = scrollHeight > contentHeight;
        const atBoundary = (e.deltaY < 0 && scrollTop <= 0) ||
            (e.deltaY > 0 && scrollTop + contentHeight >= scrollHeight);
        if (!canScroll || atBoundary) {
            e.stopImmediatePropagation();
        }
    }

    private openPackageManager() {
        if (!this.kernel?.openPackageManager) return;
        const packages = this.notebook?.metadata?.required_packages ?? [];
        this.kernel.openPackageManager({
            requiredPackages: packages,
            onPackageAdded: (packageName: string) => {
                if (!this.notebook) return;
                if (!this.notebook.metadata) this.notebook.metadata = {};
                if (!this.notebook.metadata.required_packages) this.notebook.metadata.required_packages = [];
                if (!this.notebook.metadata.required_packages.includes(packageName)) {
                    this.notebook.metadata.required_packages.push(packageName);
                    this.markDirty(true);
                }
            },
            onPackageRemoved: (packageName: string) => {
                if (!this.notebook?.metadata?.required_packages) return;
                const index = this.notebook.metadata.required_packages.indexOf(packageName);
                if (index > -1) {
                    this.notebook.metadata.required_packages.splice(index, 1);
                    this.markDirty(true);
                }
            },
        });
    }

    protected updated(changedProperties: Map<string, any>) {
        super.updated(changedProperties);

        if (
            changedProperties.has('kernelConnected') ||
            changedProperties.has('kernelConnecting') ||
            changedProperties.has('kernelVersion') ||
            changedProperties.has('isRunningAll') ||
            changedProperties.has('availableKernels') ||
            changedProperties.has('selectedKernelId')
        ) {
            this.updateToolbar();
        }
    }

    protected render() {
        if (!this.notebook) {
            return html`<div class="loading">Loading notebook...</div>`;
        }

        return html`
            <div class="noteboocells">
                ${repeat(
                    this.notebook.cells,
                    (_cell, index) => index,
                    (cell, index) => this.renderCell(cell, index)
                )}
            </div>
        `;
    }

    static styles = css`
        :host {
            display: block;
            width: 100%;
        }

        .kernel-select {
            max-width: 10rem;
        }

        .noteboocells {
            display: flex;
            flex-direction: column;
            gap: 3rem;
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1rem;
            width: 100%;
            box-sizing: border-box;
        }

        .cell-wrapper {
            position: relative;
        }

        .cell {
            border-radius: 4px;
            overflow: hidden;
            opacity: 0.9;
            position: relative;
        }

        .cell-header-actions {
            display: flex;
            gap: 0.25rem;
            align-items: center;
            opacity: 0.5;
            transition: opacity 0.2s;
        }

        .cell-header-actions .divider {
            width: 1px;
            height: 1rem;
            background: var(--wa-color-outline);
            margin: 0 0.25rem;
            opacity: 0.5;
        }

        .cell-header:hover .cell-header-actions {
            opacity: 1;
        }

        .cell-footer {
            display: flex;
            gap: 0.5rem;
            align-items: center;
            justify-content: flex-start;
            padding: 0.5rem;
            border-top: 1px solid var(--wa-color-outline);
            opacity: 0.5;
            transition: opacity 0.2s;
        }

        .cell-footer:hover {
            opacity: 1;
        }

        .markdown-cell {
            cursor: pointer;
            transition: opacity 0.2s;
        }

        .markdown-cell:hover:not(.editing) {
            opacity: 0.9;
        }
        
        .markdown-cell .cell-content {
            padding: 1rem;
        }

        .markdown-cell.editing {
            cursor: default;
            padding: 0;
        }
        
        .markdown-cell.editing .cell-actions {
            display: none;
        }

        .markdown-editor {
            width: 100%;
            min-height: 200px;
            padding: 1rem;
            font-family: monospace;
            font-size: 0.95rem;
            line-height: 1.6;
            border: none;
            outline: none;
            resize: vertical;
            background: transparent;
            color: inherit;
        }

        .code-cell {
            border-left: 3px solid var(--wa-color-primary-500);
            transition: all 0.3s ease;
        }
        
        .code-cell.executing {
            border-left: 4px solid var(--wa-color-primary-500);
            box-shadow: 0 0 0 2px var(--wa-color-primary-500, rgba(59, 130, 246, 0.3));
            animation: pulse-cell 2s ease-in-out infinite;
        }
        
        @keyframes pulse-cell {
            0%, 100% {
                box-shadow: 0 0 0 2px var(--wa-color-primary-500, rgba(59, 130, 246, 0.3));
                opacity: 1;
            }
            50% {
                box-shadow: 0 0 0 4px var(--wa-color-primary-500, rgba(59, 130, 246, 0.5));
                opacity: 0.95;
            }
        }

        .cell-header {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            flex-wrap: nowrap;
        }

        .cell-label {
            font-family: monospace;
            font-weight: bold;
            flex-shrink: 0;
        }
        
        .executing-indicator {
            display: inline-block;
            color: var(--wa-color-primary-500);
            font-weight: bold;
            font-size: 1.2em;
        }

        .cell-input {
            margin: 0;
        }

        .monaco-container {
            min-height: 100px;
            height: auto;
            width: 100%;
        }

        .cell-output {
            padding: 1rem;
        }

        .output-label {
            font-family: monospace;
            font-weight: bold;
            margin-bottom: 0.5rem;
            opacity: 0.7;
        }

        .cell-output pre {
            margin: 0;
            overflow-x: auto;
        }

        .cell-output code {
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            line-height: 1.5;
        }

        .output-image {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 0.5rem 0;
            border-radius: 4px;
        }

        .output-error {
            border-left: 3px solid var(--wa-color-danger-500);
        }

        .raw-cell {
            padding: 1rem;
        }

        .raw-cell pre {
            margin: 0;
        }

        .loading {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            font-size: 1.2rem;
        }

        .markdown-placeholder {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            padding: 3rem 1rem;
            opacity: 0.5;
            font-style: italic;
            transition: opacity 0.2s;
        }

        .markdown-cell.empty:hover .markdown-placeholder {
            opacity: 0.8;
        }

        .markdown-placeholder wa-icon {
            font-size: 1.5rem;
        }
    `;
}
