import { beforeEach, describe, expect, it, vi } from 'vitest';

const host = vi.hoisted(() => {
  const openEditorPythonTerminal = vi.fn(async () => undefined);
  const unbindEditorPythonSession = vi.fn();
  const showPackageManager = vi.fn();
  let initGate: Promise<void> = Promise.resolve();

  class AttachedTerminal {
    static last: AttachedTerminal | undefined;
    reset = vi.fn();
    constructor(
      private openSession: () => Promise<unknown>,
      private releaseSession: () => void,
    ) {
      AttachedTerminal.last = this;
    }
    show() {
      return this.openSession();
    }
    release() {
      this.releaseSession();
    }
  }

  class PyEnv {
    static all: PyEnv[] = [];
    init = vi.fn(() => initGate);
    loadPackages = vi.fn(async () => undefined);
    getVersion = vi.fn(async () => '3.13.2');
    close = vi.fn();
    interrupt = vi.fn();
    execCode = vi.fn(async (code: string) => {
      if (code.includes('_patched_show') || code.includes('_display_data')) {
        return { result: null, console: [] as string[] };
      }
      return { result: undefined, console: [] as string[] };
    });
    constructor() {
      PyEnv.all.push(this);
    }
  }

  return {
    openEditorPythonTerminal,
    unbindEditorPythonSession,
    showPackageManager,
    AttachedTerminal,
    PyEnv,
    setInitGate(gate: Promise<void>) {
      initGate = gate;
    },
  };
});

vi.mock('@eclipse-docks/extension-notebook', () => ({
  TARGET_NOTEBOOK_KERNELS: 'system.notebookkernels',
}));

vi.mock('@eclipse-docks/extension-terminal/api', () => ({
  AttachedTerminal: host.AttachedTerminal,
}));

vi.mock('../src/pyservice', () => ({
  PyEnv: host.PyEnv,
}));

vi.mock('../src/package-manager', () => ({
  pythonPackageManagerService: { showPackageManager: host.showPackageManager },
}));

vi.mock('../src/python-terminal-backend', () => ({
  openEditorPythonTerminal: host.openEditorPythonTerminal,
  unbindEditorPythonSession: host.unbindEditorPythonSession,
}));

const { pythonNotebookKernelContribution } = await import('../src/python-notebook-kernel');

async function kernel() {
  return pythonNotebookKernelContribution.loadKernel();
}

describe('Python notebook kernel', () => {
  beforeEach(() => {
    host.PyEnv.all.length = 0;
    host.setInitGate(Promise.resolve());
    host.openEditorPythonTerminal.mockClear();
    host.unbindEditorPythonSession.mockClear();
    host.showPackageManager.mockClear();
  });

  it('describes itself as the python kernel', () => {
    expect(pythonNotebookKernelContribution).toMatchObject({
      id: 'python',
      label: 'Python',
      language: 'python',
    });
  });

  it('loads each required package once and again after a restart', async () => {
    const py = await kernel();
    await py.connect?.({ requiredPackages: ['numpy'] });
    await py.connect?.({ requiredPackages: ['numpy', 'pandas'] });

    const env = host.PyEnv.all[0];
    expect(host.PyEnv.all).toHaveLength(1);
    expect(env.init).toHaveBeenCalledOnce();
    expect(env.loadPackages).toHaveBeenNthCalledWith(1, ['numpy']);
    expect(env.loadPackages).toHaveBeenNthCalledWith(2, ['pandas']);

    await py.restart?.();
    expect(env.close).toHaveBeenCalledOnce();
    expect(host.AttachedTerminal.last?.reset).toHaveBeenCalledOnce();
    expect(host.PyEnv.all).toHaveLength(2);
    expect(host.PyEnv.all[1].loadPackages).toHaveBeenCalledWith(['numpy', 'pandas']);
  });

  it('shares one runtime when connect is called again while the first is still starting', async () => {
    let release = () => undefined;
    host.setInitGate(new Promise((resolve) => { release = resolve; }));
    const py = await kernel();
    const first = py.connect?.({ requiredPackages: ['numpy'] });
    const second = py.connect?.({ requiredPackages: ['numpy', 'pandas'] });
    expect(host.PyEnv.all).toHaveLength(1);
    release();
    await first;
    await second;
    expect(host.PyEnv.all).toHaveLength(1);
    expect(host.PyEnv.all[0].loadPackages.mock.calls.map((call) => call[0])).toEqual([
      ['numpy'],
      ['pandas'],
    ]);
  });

  it('stays connected when the matplotlib hook cannot be installed', async () => {
    const py = await kernel();
    const pending = py.connect?.();
    host.PyEnv.all[0].execCode.mockRejectedValueOnce(new Error('no matplotlib'));
    await expect(pending).resolves.toBeUndefined();
  });

  it('joins console output and the cell result', async () => {
    const py = await kernel();
    await py.connect?.();
    host.PyEnv.all[0].execCode.mockImplementation(async (code: string) => {
      if (code.includes('_display_data')) return { result: null };
      return { console: ['hello', '  ', ''], result: 4 };
    });
    await expect(py.execute('1 + 3')).resolves.toEqual({ data: 'hello\n4', imageData: undefined });
  });

  it('returns plot data instead of the cell result and then clears it', async () => {
    const py = await kernel();
    await py.connect?.();
    const codes: string[] = [];
    host.PyEnv.all[0].execCode.mockImplementation(async (code: string) => {
      codes.push(code);
      if (code.includes('_display_data = None')) return { result: null };
      if (code.includes('_display_data')) return { result: 'abcbase64' };
      return { console: ['drawn'], result: 9 };
    });
    await expect(py.execute('plt.show()')).resolves.toEqual({ data: 'drawn', imageData: 'abcbase64' });
    expect(codes.some((code) => code.includes('_display_data = None'))).toBe(true);
  });

  it('does not treat a None display value as an image', async () => {
    const py = await kernel();
    await py.connect?.();
    host.PyEnv.all[0].execCode.mockImplementation(async (code: string) => {
      if (code.includes('_display_data')) return { result: 'None' };
      return { console: [], result: 3 };
    });
    await expect(py.execute('1 + 2')).resolves.toEqual({ data: '3', imageData: undefined });
  });

  it('reports execution failures and propagates a failed connect', async () => {
    const py = await kernel();
    await py.connect?.();
    host.PyEnv.all[0].execCode.mockRejectedValueOnce('ValueError: boom');
    await expect(py.execute('1 / 0')).resolves.toEqual({ error: 'ValueError: boom' });

    await py.close?.();
    const boot = Promise.reject(new Error('boot failed'));
    void boot.catch(() => undefined);
    host.setInitGate(boot);
    await expect(py.execute('1')).rejects.toThrow('boot failed');
  });

  it('reads the version, interrupts, and opens the session terminal', async () => {
    const py = await kernel();
    expect(await py.getVersion?.()).toBeUndefined();
    expect(() => py.interrupt?.()).not.toThrow();

    await py.connect?.();
    expect(await py.getVersion?.()).toBe('3.13.2');
    host.PyEnv.all[0].getVersion.mockRejectedValueOnce(new Error('no version'));
    expect(await py.getVersion?.()).toBeUndefined();

    py.interrupt?.();
    expect(host.PyEnv.all[0].interrupt).toHaveBeenCalledOnce();

    await py.showSessionTerminal?.('Notebook');
    expect(host.openEditorPythonTerminal).toHaveBeenCalledWith(
      host.PyEnv.all[0],
      expect.any(String),
      'Notebook',
      'notebook session',
    );
  });

  it('opens the package manager only after the runtime exists', async () => {
    const py = await kernel();
    const context = {
      requiredPackages: ['numpy'],
      onPackageAdded: () => undefined,
      onPackageRemoved: () => undefined,
    };
    py.openPackageManager?.(context);
    expect(host.showPackageManager).not.toHaveBeenCalled();

    await py.connect?.();
    py.openPackageManager?.(context);
    expect(host.showPackageManager).toHaveBeenCalledWith({
      packages: ['numpy'],
      pyenv: host.PyEnv.all[0],
      onPackageAdded: context.onPackageAdded,
      onPackageRemoved: context.onPackageRemoved,
    });
  });

  it('releases the terminal session when the kernel closes', async () => {
    const py = await kernel();
    await py.connect?.();
    await py.close?.();
    expect(host.PyEnv.all[0].close).toHaveBeenCalledOnce();
    expect(host.unbindEditorPythonSession).toHaveBeenCalledOnce();
  });
});
