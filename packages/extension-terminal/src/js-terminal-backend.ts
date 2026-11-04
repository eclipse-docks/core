import { createJsRuntime, type JsRuntime } from '@eclipse-docks/core';
import { terminalService } from './terminal-service';
import type { Terminal, TerminalBackend, TerminalCreationOptions } from './terminal-api';
import { LineInput } from './line-input';

export const JS_REPL_PROFILE_ID = 'terminal.javascript-repl';
export const JS_SESSION_PROFILE_ID = 'terminal.javascript-session';

const PROMPT = '> ';

const sessions = new Map<string, JsRuntime>();

export function unbindJsSession(sessionId: string): void {
  sessions.delete(sessionId);
}

export function createJsSessionBackend(options?: TerminalCreationOptions): JsReplBackend {
  const sessionId = options?.env?.jsSessionId;
  const runtime = sessionId ? sessions.get(sessionId) : undefined;
  if (!runtime) throw new Error('JavaScript session is no longer available');
  return new JsReplBackend({
    runtime,
    ownsRuntime: false,
    sessionLabel: options?.env?.sessionLabel || 'session',
  });
}

export function openJsSessionTerminal(
  runtime: JsRuntime,
  sessionId: string,
  name: string,
  sessionLabel = 'session',
): Promise<Terminal | undefined> {
  sessions.set(sessionId, runtime);
  return terminalService.createTerminal({
    profileId: JS_SESSION_PROFILE_ID,
    name,
    env: { jsSessionId: sessionId, sessionLabel },
  });
}

interface JsReplBackendOptions {
  runtime?: JsRuntime;
  /** When false, closing the terminal leaves the runtime running. */
  ownsRuntime?: boolean;
  sessionLabel?: string;
}

function formatJsResult(value: unknown): string {
  if (value === undefined) return '';
  if (value === null) return 'null\r\n';
  if (typeof value === 'object') return JSON.stringify(value, null, 2) + '\r\n';
  return String(value) + '\r\n';
}

export class JsReplBackend implements TerminalBackend {
  private writeCallbacks = new Set<(data: string) => void>();
  private lineInput: LineInput;
  private runtime: JsRuntime | null;
  private ownsRuntime: boolean;
  private sessionLabel: string;
  private running = false;

  constructor(options?: JsReplBackendOptions) {
    this.lineInput = new LineInput((data) => this.emit(data));
    this.runtime = options?.runtime ?? null;
    this.ownsRuntime = options?.ownsRuntime ?? !options?.runtime;
    this.sessionLabel = options?.sessionLabel ?? 'session';
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
      this.ownsRuntime = true;
    }
    return this.runtime;
  }

  async open(): Promise<void> {
    if (!this.runtime) {
      this.runtime = createJsRuntime();
      this.ownsRuntime = true;
      this.emit('JavaScript REPL\r\n\r\n' + PROMPT);
      return;
    }
    this.emit(`JavaScript (${this.sessionLabel})\r\n\r\n` + PROMPT);
  }

  close(): void {
    if (this.ownsRuntime) this.runtime?.close();
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
