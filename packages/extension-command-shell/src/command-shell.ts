import { css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { LyraPart } from "@eclipse-lyra/core";
import { i18n } from "@eclipse-lyra/core";
import { runShellLine, type RunResult } from "./shell-runner";

const t = await i18n(import.meta.glob("./commandshell*.json"));

export interface ShellHistoryEntry {
  command: string;
  result: RunResult;
  timestamp: Date;
}

@customElement("lyra-command-shell")
export class LyraCommandShell extends LyraPart {
  @state()
  private inputValue = "";

  @state()
  private history: ShellHistoryEntry[] = [];

  @state()
  private running = false;

  private inputRef: Ref<HTMLElement> = createRef();
  private outputRef: Ref<HTMLDivElement> = createRef();

  private async handleRun() {
    const line = this.inputValue.trim();
    if (!line || this.running) return;

    this.inputValue = "";
    this.running = true;
    this.requestUpdate();

    const result = await runShellLine(line);
    this.history = [
      ...this.history,
      { command: line, result, timestamp: new Date() },
    ];
    this.running = false;
    this.requestUpdate();

    this.updateComplete.then(() => {
      const container = this.outputRef.value;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    });
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      this.handleRun();
    }
  }

  private clearOutput() {
    this.history = [];
    this.requestUpdate();
  }

  private formatResult(result: RunResult): string {
    if (result.error) return result.error;
    if (result.results.length === 0) return "";
    const last = result.results[result.results.length - 1];
    if (last == null) return "";
    if (typeof last === "object") return JSON.stringify(last, null, 2);
    return String(last);
  }

  render() {
    return html`
      <div class="shell-container">
        <div class="output-area" ${ref(this.outputRef)}>
          ${this.history.length === 0
            ? html`<div class="empty-state">${t.COMMANDSHELL_EMPTY}</div>`
            : this.history.map(
                (entry) => html`
                  <div class="history-entry">
                    <div class="command-line">
                      <span class="prompt">$</span>
                      <span class="command">${entry.command}</span>
                    </div>
                    <div
                      class="result ${entry.result.success ? "" : "error"}"
                    >
                      ${entry.result.success
                        ? this.formatResult(entry.result) || "OK"
                        : entry.result.error}
                    </div>
                  </div>
                `
              )}
        </div>
        <div class="input-row">
          <span class="prompt">$</span>
          <wa-input
            ${ref(this.inputRef)}
            placeholder="${t.COMMANDSHELL_PROMPT}"
            .value=${this.inputValue}
            @input=${(e: Event) => {
              this.inputValue = (e.target as HTMLInputElement & { value: string }).value;
            }}
            @keydown=${this.handleKeyDown}
            autocomplete="off"
            size="small"
            class="shell-input"
          ></wa-input>
        </div>
      </div>
    `;
  }

  protected renderToolbar() {
    return html`
      <lyra-command icon="trash" title="${t.COMMANDSHELL_CLEAR}" .action=${() => this.clearOutput()}>
        ${t.COMMANDSHELL_CLEAR}
      </lyra-command>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
    }

    .shell-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
    }

    .output-area {
      flex: 1;
      overflow-y: auto;
      padding: 0.5rem;
      font-family: var(--wa-font-mono);
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .empty-state {
      color: var(--wa-color-neutral-text-subtle);
      font-style: italic;
      padding: 0.5rem;
    }

    .history-entry {
      margin-bottom: 0.75rem;
    }

    .command-line {
      display: flex;
      align-items: baseline;
      gap: 0.5rem;
      margin-bottom: 0.25rem;
    }

    .prompt {
      color: var(--wa-color-primary-text);
      font-weight: 600;
    }

    .command {
      color: var(--wa-color-neutral-text);
      word-break: breaall;
    }

    .result {
      padding-left: 1.5rem;
      color: var(--wa-color-neutral-text-subtle);
      font-size: 0.8rem;
      white-space: pre-wrap;
      word-break: breaword;
    }

    .result.error {
      color: var(--wa-color-danger-text);
    }

    .input-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      border-top: 1px solid var(--wa-color-neutral-border);
      background: var(--wa-color-neutral-background);
    }

    .input-row .prompt {
      flex-shrink: 0;
    }

    .shell-input {
      flex: 1;
      min-width: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "lyra-command-shell": LyraCommandShell;
  }
}
