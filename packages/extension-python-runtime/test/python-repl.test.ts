import { beforeEach, describe, expect, it, vi } from 'vitest';

const host = vi.hoisted(() => {
  const createTerminal = vi.fn(async () => ({ id: 'term-1' }));
  class PyEnv {
    static last: PyEnv | undefined;
    init = vi.fn(async () => undefined);
    getVersion = vi.fn(async () => '3.13.2');
    execCode = vi.fn(async (_code: string) => ({ result: undefined }));
    close = vi.fn();
    setStdoutCallback = vi.fn();
    setStderrCallback = vi.fn();
    constructor() {
      PyEnv.last = this;
    }
  }
  return { createTerminal, PyEnv };
});

vi.mock('@eclipse-docks/extension-terminal/api', async () => {
  const { LineInput } = await vi.importActual<typeof import('../../extension-terminal/src/line-input')>(
    '../../extension-terminal/src/line-input.ts',
  );
  return {
    LineInput,
    terminalService: { createTerminal: host.createTerminal },
  };
});

vi.mock('../src/pyservice', () => ({
  PyEnv: host.PyEnv,
}));

const {
  PYTHON_REPL_PROFILE_ID,
  PYTHON_SESSION_PROFILE_ID,
  PythonReplBackend,
  createEditorPythonSessionBackend,
  openEditorPythonTerminal,
  unbindEditorPythonSession,
} = await import('../src/python-terminal-backend');

function outputOf(backend: InstanceType<typeof PythonReplBackend>): string[] {
  const chunks: string[] = [];
  backend.onDidWrite((chunk) => chunks.push(chunk));
  return chunks;
}

describe('Python REPL backend', () => {
  beforeEach(() => {
    host.createTerminal.mockClear();
    host.PyEnv.last = undefined;
  });

  it('publishes the terminal profile ids', () => {
    expect(PYTHON_REPL_PROFILE_ID).toBe('terminal.python-repl');
    expect(PYTHON_SESSION_PROFILE_ID).toBe('terminal.python-session');
  });

  it('boots its own runtime and prints a REPL banner', async () => {
    const backend = new PythonReplBackend();
    const chunks = outputOf(backend);
    await backend.open();

    expect(host.PyEnv.last?.init).toHaveBeenCalledOnce();
    expect(chunks.join('')).toBe('Initializing Python...\r\nPython 3.13.2 REPL (Pyodide)\r\n\r\n>>> ');
    backend.close();
    expect(host.PyEnv.last?.close).toHaveBeenCalledOnce();
    expect(host.PyEnv.last?.setStdoutCallback).toHaveBeenLastCalledWith(undefined);
    expect(host.PyEnv.last?.setStderrCallback).toHaveBeenLastCalledWith(undefined);
  });

  it('attaches to an existing runtime without owning it', async () => {
    const pyenv = new host.PyEnv();
    const backend = new PythonReplBackend({ pyenv: pyenv as never, sessionLabel: 'notebook session' });
    const chunks = outputOf(backend);
    await backend.open();

    expect(pyenv.init).not.toHaveBeenCalled();
    expect(chunks.join('')).toBe('Python 3.13.2 (notebook session)\r\n\r\n>>> ');
    backend.close();
    expect(pyenv.close).not.toHaveBeenCalled();
  });

  it('falls back to a generic banner when the version cannot be read', async () => {
    const pyenv = new host.PyEnv();
    pyenv.getVersion.mockRejectedValueOnce(new Error('offline'));
    const backend = new PythonReplBackend({ pyenv: pyenv as never });
    const chunks = outputOf(backend);
    await backend.open();
    expect(chunks.join('')).toContain('Python (editor session)');
  });

  it('prints expression results, objects, and nothing for empty values', async () => {
    const pyenv = new host.PyEnv();
    pyenv.execCode.mockImplementation(async (code: string) => {
      if (code === '1 + 1') return { result: 2 };
      if (code === 'zero') return { result: 0 };
      if (code === 'obj') return { result: { a: 1 } };
      if (code === 'blank') return { result: '' };
      return { result: undefined };
    });
    const backend = new PythonReplBackend({ pyenv: pyenv as never });
    const chunks = outputOf(backend);
    await backend.open();
    chunks.length = 0;

    const submit = async (line: string) => {
      chunks.length = 0;
      if (line) backend.handleInput(line);
      backend.handleInput('\r');
      await vi.waitFor(() => expect(chunks.join('')).toContain('>>> '));
      return chunks.join('');
    };

    expect(await submit('1 + 1')).toBe('1 + 1\r\n2\r\n>>> ');
    expect(await submit('zero')).toBe('zero\r\n0\r\n>>> ');
    expect(await submit('obj')).toBe('obj\r\n{\n  "a": 1\n}\r\n>>> ');
    expect(await submit('blank')).toBe('blank\r\n>>> ');
    expect(await submit('')).toBe('\r\n>>> ');
    expect(pyenv.execCode).not.toHaveBeenCalledWith('');
  });

  it('streams stdout and stderr while a line is running', async () => {
    const pyenv = new host.PyEnv();
    let stdout: ((text: string) => void) | undefined;
    let stderr: ((text: string) => void) | undefined;
    pyenv.setStdoutCallback.mockImplementation((cb?: (text: string) => void) => {
      stdout = cb;
    });
    pyenv.setStderrCallback.mockImplementation((cb?: (text: string) => void) => {
      stderr = cb;
    });
    pyenv.execCode.mockImplementation(async (code: string) => {
      if (code === 'say') stdout?.('hi');
      if (code === 'warn') stderr?.('bad');
      return { result: undefined };
    });
    const backend = new PythonReplBackend({ pyenv: pyenv as never });
    const chunks = outputOf(backend);
    await backend.open();
    chunks.length = 0;

    const submit = async (line: string) => {
      chunks.length = 0;
      backend.handleInput(line);
      backend.handleInput('\r');
      await vi.waitFor(() => expect(chunks.join('')).toContain('>>> '));
      return chunks.join('');
    };

    expect(await submit('say')).toBe('say\r\nhi\r\n>>> ');
    expect(await submit('warn')).toBe('warn\r\n\x1b[31mbad\x1b[0m\r\n>>> ');
  });

  it('prints execution failures and ignores input while a line is running', async () => {
    const pyenv = new host.PyEnv();
    let release: (value: unknown) => void = () => undefined;
    pyenv.execCode.mockImplementation((code: string) => {
      if (code === 'wait') return new Promise((resolve) => { release = resolve; });
      return Promise.resolve({ result: code });
    });
    const backend = new PythonReplBackend({ pyenv: pyenv as never });
    const chunks = outputOf(backend);
    await backend.open();
    chunks.length = 0;

    backend.handleInput('wait');
    backend.handleInput('\r');
    backend.handleInput('ignored');
    backend.handleInput('\r');
    expect(pyenv.execCode).toHaveBeenCalledTimes(1);
    release({ result: undefined });
    await vi.waitFor(() => expect(chunks.join('')).toContain('>>> '));

    chunks.length = 0;
    pyenv.execCode.mockRejectedValueOnce(new Error('ValueError: boom'));
    backend.handleInput('bad');
    backend.handleInput('\r');
    await vi.waitFor(() => expect(chunks.join('')).toContain('ValueError: boom'));
    expect(chunks.join('')).toBe('bad\r\n\x1b[31mValueError: boom\x1b[0m\r\n>>> ');
  });

  it('edits the current line before submitting it', async () => {
    const pyenv = new host.PyEnv();
    const backend = new PythonReplBackend({ pyenv: pyenv as never });
    outputOf(backend);
    await backend.open();
    backend.handleInput('ab');
    backend.handleInput('\u007f');
    backend.handleInput('c');
    backend.handleInput('\r');
    await vi.waitFor(() => expect(pyenv.execCode).toHaveBeenCalledWith('ac'));
  });

  it('opens an editor session terminal and refuses a session that was unbound', async () => {
    const pyenv = new host.PyEnv();
    await expect(openEditorPythonTerminal(pyenv as never, 'session-1', 'Notebook', 'notebook session'))
      .resolves.toEqual({ id: 'term-1' });
    expect(host.createTerminal).toHaveBeenCalledWith({
      profileId: PYTHON_SESSION_PROFILE_ID,
      name: 'Notebook',
      env: { pythonSessionId: 'session-1', sessionLabel: 'notebook session' },
    });

    const backend = createEditorPythonSessionBackend({
      env: { pythonSessionId: 'session-1', sessionLabel: 'notebook session' },
    });
    expect(backend).toBeInstanceOf(PythonReplBackend);

    unbindEditorPythonSession('session-1');
    expect(() => createEditorPythonSessionBackend({ env: { pythonSessionId: 'session-1' } }))
      .toThrow('Python session is no longer available');
  });

  it('accepts terminal resize without using it', () => {
    const backend = new PythonReplBackend({ pyenv: new host.PyEnv() as never });
    expect(() => backend.setDimensions({ cols: 80, rows: 24 })).not.toThrow();
  });
});
