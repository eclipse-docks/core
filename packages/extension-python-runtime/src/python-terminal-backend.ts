import {
  LineInput,
  terminalService,
  type Terminal,
  type TerminalBackend,
  type TerminalCreationOptions,
} from '@eclipse-docks/extension-terminal/api';
import { PyEnv } from './pyservice';

const PROMPT = '>>> ';

/** Editor sessions keyed so a terminal profile can attach without owning the worker. */
const editorSessions = new Map<string, PyEnv>();

export const PYTHON_REPL_PROFILE_ID = 'terminal.python-repl';
export const PYTHON_SESSION_PROFILE_ID = 'terminal.python-session';

function bindEditorPythonSession(sessionId: string, pyenv: PyEnv): void {
  editorSessions.set(sessionId, pyenv);
}

export function unbindEditorPythonSession(sessionId: string): void {
  editorSessions.delete(sessionId);
}

export function createEditorPythonSessionBackend(options?: TerminalCreationOptions): PythonReplBackend {
  const sessionId = options?.env?.pythonSessionId;
  const pyenv = sessionId ? editorSessions.get(sessionId) : undefined;
  if (!pyenv) {
    throw new Error('Python session is no longer available');
  }
  return new PythonReplBackend({
    pyenv,
    ownsEnv: false,
    sessionLabel: options?.env?.sessionLabel || 'editor session',
  });
}

export function openEditorPythonTerminal(
  pyenv: PyEnv,
  sessionId: string,
  name: string,
  sessionLabel = 'editor session',
): Promise<Terminal | undefined> {
  bindEditorPythonSession(sessionId, pyenv);
  return terminalService.createTerminal({
    profileId: PYTHON_SESSION_PROFILE_ID,
    name,
    env: { pythonSessionId: sessionId, sessionLabel },
  });
}

interface PythonReplBackendOptions {
  pyenv?: PyEnv;
  /** When false, closing the terminal leaves the Python worker running. */
  ownsEnv?: boolean;
  sessionLabel?: string;
}

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
  private ownsEnv: boolean;
  private sessionLabel: string;
  private running = false;
  private atLineStart = true;

  constructor(options?: PythonReplBackendOptions) {
    this.lineInput = new LineInput((data: string) => this.emit(data));
    this.pyenv = options?.pyenv ?? null;
    this.ownsEnv = options?.ownsEnv ?? !options?.pyenv;
    this.sessionLabel = options?.sessionLabel ?? 'editor session';
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
    if (!this.pyenv) {
      this.emit('Initializing Python...\r\n');
      this.pyenv = new PyEnv();
      await this.pyenv.init();
      this.ownsEnv = true;
    }
    this.attachStreams();

    let version = '';
    try {
      version = String((await this.pyenv.getVersion()) ?? '');
    } catch {
      version = '';
    }

    const label = version ? `Python ${version}` : 'Python';
    const banner = this.ownsEnv ? `${label} REPL (Pyodide)` : `${label} (${this.sessionLabel})`;
    this.emit(`${banner}\r\n\r\n`);
    this.emitPrompt();
  }

  close(): void {
    this.pyenv?.setStdoutCallback(undefined);
    this.pyenv?.setStderrCallback(undefined);
    if (this.ownsEnv) this.pyenv?.close();
    this.pyenv = null;
    this.lineInput.reset();
  }

  private attachStreams(): void {
    this.pyenv?.setStdoutCallback((text) => this.emit(text));
    this.pyenv?.setStderrCallback((text) => this.emit(`\x1b[31m${text}\x1b[0m`));
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
