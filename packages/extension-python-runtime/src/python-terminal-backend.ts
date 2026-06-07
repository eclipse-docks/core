import type { TerminalBackend } from '@eclipse-docks/extension-terminal/api';
import { LineInput } from '@eclipse-docks/extension-terminal/api';
import { PyEnv } from './pyservice';

const PROMPT = '>>> ';

function formatExecResult(response: unknown): string {
  const result =
    response && typeof response === 'object' && response !== null && 'result' in response
      ? (response as { result: unknown }).result
      : response;

  if (result === undefined || result === null || String(result) === 'undefined') {
    return '';
  }
  const text = String(result);
  if (!text || text === 'undefined') return '';
  if (typeof result === 'object') return JSON.stringify(result, null, 2) + '\r\n';
  return text + '\r\n';
}

export class PythonReplBackend implements TerminalBackend {
  private writeCallbacks = new Set<(data: string) => void>();
  private lineInput: LineInput;
  private pyenv: PyEnv | null = null;
  private running = false;
  private atLineStart = true;

  constructor() {
    this.lineInput = new LineInput((data: string) => this.emit(data));
  }

  onDidWrite(callback: (data: string) => void): () => void {
    this.writeCallbacks.add(callback);
    return () => this.writeCallbacks.delete(callback);
  }

  private emit(data: string): void {
    for (const cb of this.writeCallbacks) cb(data);
    if (data.length > 0) {
      this.atLineStart = /[\r\n]$/.test(data);
    }
  }

  private emitPrompt(): void {
    if (!this.atLineStart) this.emit('\r\n');
    this.emit(PROMPT);
  }

  async open(): Promise<void> {
    this.emit('Initializing Python...\r\n');
    this.pyenv = new PyEnv();
    await this.pyenv.init();
    this.pyenv.setStdoutCallback((text) => this.emit(text));
    this.pyenv.setStderrCallback((text) => this.emit(`\x1b[31m${text}\x1b[0m`));

    let version = '';
    try {
      version = String((await this.pyenv.getVersion()) ?? '');
    } catch {
      version = '';
    }

    this.emit(`Python ${version} REPL (Pyodide)\r\n\r\n`);
    this.emitPrompt();
  }

  close(): void {
    this.pyenv?.close();
    this.pyenv = null;
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
    if (!this.pyenv) {
      this.emitPrompt();
      return;
    }

    const trimmed = line.trim();
    if (!trimmed) {
      this.emitPrompt();
      return;
    }

    this.running = true;
    try {
      const response = await this.pyenv.execCode(trimmed);
      const output = formatExecResult(response);
      if (output) this.emit(output);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.emit(`\x1b[31m${msg}\x1b[0m\r\n`);
    } finally {
      this.running = false;
      this.emitPrompt();
    }
  }
}

export const PYTHON_REPL_PROFILE_ID = 'terminal.python-repl';
