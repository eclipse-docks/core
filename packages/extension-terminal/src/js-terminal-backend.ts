import { createJsRuntime, type JsRuntime } from '@eclipse-docks/core';
import type { TerminalBackend } from './terminal-api';
import { LineInput } from './line-input';

export const JS_REPL_PROFILE_ID = 'terminal.javascript-repl';

const PROMPT = '> ';

function formatJsResult(value: unknown): string {
  if (value === undefined) return '';
  if (value === null) return 'null\r\n';
  if (typeof value === 'object') return JSON.stringify(value, null, 2) + '\r\n';
  return String(value) + '\r\n';
}

export class JsReplBackend implements TerminalBackend {
  private writeCallbacks = new Set<(data: string) => void>();
  private lineInput: LineInput;
  private runtime: JsRuntime | null = null;
  private running = false;

  constructor() {
    this.lineInput = new LineInput((data) => this.emit(data));
  }

  onDidWrite(callback: (data: string) => void): () => void {
    this.writeCallbacks.add(callback);
    return () => this.writeCallbacks.delete(callback);
  }

  private emit(data: string): void {
    for (const cb of this.writeCallbacks) cb(data);
  }

  private getRuntime(): JsRuntime {
    if (!this.runtime) {
      this.runtime = createJsRuntime();
    }
    return this.runtime;
  }

  async open(): Promise<void> {
    this.emit('JavaScript REPL\r\n\r\n' + PROMPT);
  }

  close(): void {
    this.runtime?.close();
    this.runtime = null;
    this.lineInput.reset();
  }

  setDimensions(_dimensions: { cols: number; rows: number }): void {}

  handleInput(data: string): void {
    if (this.running) return;
    const line = this.lineInput.feed(data);
    if (line === null) return;
    void this.runLine(line);
  }

  private async runLine(line: string): Promise<void> {
    const trimmed = line.trim();
    if (!trimmed) {
      this.emit(PROMPT);
      return;
    }

    this.running = true;
    try {
      const result = await this.getRuntime().execute(trimmed);
      const output = formatJsResult(result);
      if (output) this.emit(output);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.emit(`\x1b[31m${msg}\x1b[0m\r\n`);
    } finally {
      this.running = false;
      this.emit(PROMPT);
    }
  }
}
