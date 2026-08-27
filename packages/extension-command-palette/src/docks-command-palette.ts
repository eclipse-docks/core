import { html } from "lit";
import { css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { createRef, ref, type Ref } from "lit/directives/ref.js";
import { DocksWidget, commandRegistry, type ExecutionContext, i18n, toastError } from "@eclipse-docks/core";

export const t = await i18n(import.meta.glob("./commandpalette*.json"));

// Event topic for opening the command palette
export const TOPIC_OPEN_COMMAND_PALETTE = "commandpalette/open";

@customElement("docks-command-palette")
export class DocksCommandPalette extends DocksWidget {
  @state()
  private inputValue: string = "";

  @state()
  private filteredCommands: any[] = [];

  @state()
  private allCommands: any[] = [];

  @state()
  private showParameterPrompt: boolean = false;

  @state()
  private selectedCommand: any = null;

  @state()
  private parameterValues: { [key: string]: string } = {};

  @state()
  private isPaletteOpen: boolean = false;

  private inputRef: Ref<any> = createRef();
  private dialogRef: Ref<any> = createRef();
  private boundDocumentClickHandler?: (e: MouseEvent) => void;
  private executionContext: ExecutionContext | undefined;

  protected doInitUI() {
    this.subscribe(TOPIC_OPEN_COMMAND_PALETTE, () => {
      this.openPalette();
    });

    this.boundDocumentClickHandler = this.handleDocumentClick.bind(this);
    document.addEventListener("click", this.boundDocumentClickHandler);
  }

  private async handleDocumentClick(e: MouseEvent) {
    if (!this.isPaletteOpen && !this.showParameterPrompt) return;

    await this.updateComplete;
    const target = e.target as Node;

    if (this.contains(target)) return;

    if (this.dialogRef.value) {
      const dialog = this.dialogRef.value as HTMLElement;
      if (dialog.contains(target)) return;
    }

    let element = target as HTMLElement;
    while (element) {
      if (element.tagName === "WA-DIALOG") return;
      element = element.parentElement as HTMLElement;
    }

    this.closePalette();
    this.closeParameterPrompt();
  }

  private handleDialogClick(e: Event) {
    e.stopPropagation();
  }

  private handleInputFocus() {
    requestAnimationFrame(() => {
      this.isPaletteOpen = true;
    });
  }

  private handleInputClick(e: Event) {
    e.stopPropagation();
    this.openPalette();
  }

  private handleInputMouseDown(e: Event) {
    e.stopPropagation();
  }

  private updateCommandList() {
    const commands = commandRegistry.listCommands(this.executionContext || {});
    this.allCommands = Object.values(commands)
      .filter((cmd: any) => cmd.id !== "commandpalette.open")
      .map((cmd: any) => ({
        id: cmd.id,
        name: cmd.name,
        description: cmd.description,
        icon: cmd.icon,
        keyBinding: cmd.keyBinding,
      }));

    this.filteredCommands = [...this.allCommands];
  }

  public async openPalette() {
    this.executionContext = commandRegistry.createExecutionContext();
    this.inputValue = "";
    this.updateCommandList();
    this.showParameterPrompt = false;
    this.isPaletteOpen = true;

    await this.updateComplete;

    if (this.inputRef.value) {
      this.inputRef.value.focus();
    }
  }

  private closePalette() {
    this.isPaletteOpen = false;
    this.inputValue = "";
    this.showParameterPrompt = false;
    this.executionContext = undefined;
  }

  private handleInputChange(e: Event) {
    const input = e.target as any;
    this.inputValue = input.value;
    this.filterCommands();
  }

  private filterCommands() {
    if (!this.inputValue.trim()) {
      this.filteredCommands = [...this.allCommands];
    } else {
      const searchLower = this.inputValue.toLowerCase();
      this.filteredCommands = this.allCommands.filter(
        (cmd) =>
          cmd.name.toLowerCase().includes(searchLower) ||
          cmd.id.toLowerCase().includes(searchLower) ||
          (cmd.description && cmd.description.toLowerCase().includes(searchLower)),
      );
    }
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      this.closePalette();
    }
  }

  private handleCommandClick(e: Event, command: any) {
    if (!command) return;
    e.stopPropagation();
    this.inputValue = "";
    this.filterCommands();
    this.runCommand(command);
  }

  private handleContainerClick(e: Event) {
    e.stopPropagation();
  }

  private runCommand(command: any) {
    if (!command) return;

    const fullCommand = commandRegistry.getCommand(command.id);
    const hasParameters = fullCommand?.parameters && fullCommand.parameters.length > 0;

    if (hasParameters) {
      this.selectedCommand = fullCommand;
      this.parameterValues = {};
      this.showParameterPrompt = true;
    } else {
      void this.executeCommandWithParams(command.id, {});
    }
  }

  private async executeCommandWithParams(commandId: string, params: any) {
    try {
      await commandRegistry.execute(commandId, { ...(this.executionContext || {}), params });
      this.closePalette();
      this.closeParameterPrompt();
    } catch (error: any) {
      console.error("Failed to execute command:", error);
    }
  }

  private closeParameterPrompt() {
    this.showParameterPrompt = false;
    this.selectedCommand = null;
    this.parameterValues = {};
  }

  private handleParameterInput(paramName: string, value: string) {
    this.parameterValues = {
      ...this.parameterValues,
      [paramName]: value,
    };
  }

  private executeWithParameters() {
    if (!this.selectedCommand) return;

    const missingParams = this.selectedCommand.parameters
      ?.filter((p: any) => p.required && !this.parameterValues[p.name])
      .map((p: any) => p.name);

    if (missingParams && missingParams.length > 0) {
      toastError(t.MISSING_REQUIRED_PARAMS({ params: missingParams.join(", ") }));
      return;
    }

    void this.executeCommandWithParams(this.selectedCommand.id, this.parameterValues);
  }

  protected render() {
    return html`
      <wa-input
      appearance="filled"
        ${ref(this.inputRef)}
        placeholder="${t.PLACEHOLDER}"
        .value=${this.inputValue}
        @input=${this.handleInputChange}
        @keydown=${this.handleKeyDown}
        @focus=${this.handleInputFocus}
        @click=${this.handleInputClick}
        @mousedown=${this.handleInputMouseDown}
        autocomplete="off"
        size="s"
      >
        <wa-icon slot="start" name="terminal" label="Terminal"></wa-icon>
      </wa-input>

      <div class="commands-container ${this.isPaletteOpen ? "open" : ""}" @click=${this.handleContainerClick}>
        ${this.filteredCommands.length > 0
          ? html`${this.filteredCommands.map(
              (cmd) => html`
                <div class="command-item" @click=${(e: Event) => this.handleCommandClick(e, cmd)}>
                  ${cmd.icon
                    ? html`<div class="command-icon">
                        <wa-icon name="${cmd.icon}" label="${cmd.name}"></wa-icon>
                      </div>`
                    : html`<div class="command-icon">
                        <wa-icon name="terminal" label="Command"></wa-icon>
                      </div>`}
                  <div class="command-info">
                    <div class="command-name">${cmd.name}</div>
                    <div class="command-id">${cmd.id}</div>
                    ${cmd.description
                      ? html`<div class="command-description">${cmd.description}</div>`
                      : ""}
                  </div>
                  ${cmd.keyBinding
                    ? html`<div class="command-keybinding">${cmd.keyBinding}</div>`
                    : ""}
                </div>
              `,
            )}`
          : html`<div class="no-results">
              <wa-icon
                name="search"
                label="${t.NO_COMMANDS_FOUND}"
                style="font-size: 24px; margin-bottom: 4px; opacity: 0.3;"
              ></wa-icon>
              <div>${t.NO_COMMANDS_FOUND}</div>
            </div>`}
      </div>

      ${this.showParameterPrompt && this.selectedCommand
        ? html`<wa-dialog
            ${ref(this.dialogRef)}
            label="${this.selectedCommand.name} - ${t.PARAMETERS}"
            open
            @wa-request-close=${this.closeParameterPrompt}
            @click=${this.handleDialogClick}
          >
            <div class="parameter-prompt-title">
              ${t.ENTER_PARAMETERS({ commandName: this.selectedCommand.name })}
            </div>
            ${this.selectedCommand.parameters?.map(
              (param: any) => html`<div class="parameter-field">
                <wa-input
                  label="${param.name}${param.required ? " *" : ""}"
                  hint=${param.description || ""}
                  placeholder=${param.description || t.ENTER_PARAM({ paramName: param.name })}
                  .value=${this.parameterValues[param.name] || ""}
                  @input=${(e: Event) => this.handleParameterInput(param.name, (e.target as any).value)}
                ></wa-input>
              </div>`,
            )}
            <div class="parameter-actions">
              <wa-button variant="default" @click=${this.closeParameterPrompt}>${t.CANCEL}</wa-button>
              <wa-button variant="primary" @click=${this.executeWithParameters}>${t.EXECUTE}</wa-button>
            </div>
          </wa-dialog>`
        : ""}
    `;
  }

  protected doClose() {
    if (this.boundDocumentClickHandler) {
      document.removeEventListener("click", this.boundDocumentClickHandler);
      this.boundDocumentClickHandler = undefined;
    }
  }

  static styles = css`
    :host {
      /* inline-flex + no width:100% keeps this on one row with siblings inside wa-button-group (flex-wrap: wrap). */
      display: inline-flex;
      flex-direction: column;
      align-items: stretch;
      width: auto;
      flex: 0 1 auto;
      max-width: 600px;
      min-width: 300px;
      position: relative;
    }

    wa-input {
      max-width: 300px;
    }

    .commands-container {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: 4px;
      background: var(--wa-color-surface-raised);
      border: 1px solid var(--wa-color-surface-border);
      border-radius: 4px;
      max-height: 400px;
      overflow-y: auto;
      z-index: 1000;
      box-shadow: 0 8px 24px var(--wa-color-shadow);
      display: none;
    }

    .commands-container.open {
      display: block;
    }

    .command-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 16px;
      cursor: pointer;
      transition: background-color 0.15s;
      border-bottom: 1px solid var(--wa-color-neutral-border-quiet);
    }

    .command-item:last-child {
      border-bottom: none;
    }

    .command-item:hover {
      background: var(--wa-color-neutral-fill-normal);
    }

    .command-icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.7;
    }

    .command-info {
      flex: 1;
      min-width: 0;
    }

    .command-name {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 2px;
    }

    .command-id {
      font-size: 11px;
      opacity: 0.5;
      font-family: monospace;
      margin-bottom: 2px;
    }

    .command-description {
      font-size: 12px;
      opacity: 0.7;
    }

    .command-keybinding {
      flex-shrink: 0;
      margin-left: auto;
      padding: 2px 8px;
      background: var(--wa-color-neutral-fill-quiet);
      border: 1px solid var(--wa-color-neutral-border-quiet);
      border-radius: 3px;
      font-size: 11px;
      font-family: monospace;
      opacity: 0.7;
    }

    .no-results {
      padding: 20px;
      text-align: center;
      color: var(--wa-color-neutral-text-subtle);
    }

    wa-dialog::part(panel) {
      max-width: 600px;
      width: 90vw;
    }

    wa-dialog::part(body) {
      padding: 20px;
    }

    .parameter-prompt-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 16px;
    }

    .parameter-field {
      margin-bottom: 12px;
    }

    .parameter-field wa-input {
      width: 100%;
    }

    .parameter-actions {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      margin-top: 20px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "docks-command-palette": DocksCommandPalette;
  }
}
