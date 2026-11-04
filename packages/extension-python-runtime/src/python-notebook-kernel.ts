import type {
  NotebookExecutionResult,
  NotebookKernel,
  NotebookKernelContribution,
} from '@eclipse-docks/extension-notebook';
import { TARGET_NOTEBOOK_KERNELS } from '@eclipse-docks/extension-notebook';
import { AttachedTerminal } from '@eclipse-docks/extension-terminal/api';
import { PyEnv } from './pyservice';
import { pythonPackageManagerService } from './package-manager';
import { openEditorPythonTerminal, unbindEditorPythonSession } from './python-terminal-backend';

class PythonNotebookKernel implements NotebookKernel {
  readonly id = 'python';
  readonly label = 'Python';
  readonly language = 'python';

  private pyenv: PyEnv | null = null;
  private requiredPackages: string[] = [];
  private loadedPackages = new Set<string>();
  private connectPromise: Promise<void> | null = null;
  private terminalName = 'Python';
  private readonly sessionId = crypto.randomUUID();
  private readonly attachedTerminal = new AttachedTerminal(
    () => {
      if (!this.pyenv) return Promise.resolve(undefined);
      return openEditorPythonTerminal(this.pyenv, this.sessionId, this.terminalName, 'notebook session');
    },
    () => unbindEditorPythonSession(this.sessionId),
  );

  async showSessionTerminal(name?: string): Promise<void> {
    if (name) this.terminalName = name;
    await this.attachedTerminal.show();
  }

  async connect(options?: { requiredPackages?: string[] }): Promise<void> {
    if (this.connectPromise) {
      await this.connectPromise;
      if (options?.requiredPackages) {
        this.requiredPackages = options.requiredPackages;
      }
      const packagesToLoadAfterWait = this.requiredPackages.filter((pkg) => !this.loadedPackages.has(pkg));
      if (packagesToLoadAfterWait.length === 0 || !this.pyenv) return;
      await this.pyenv.loadPackages(packagesToLoadAfterWait);
      packagesToLoadAfterWait.forEach((pkg) => this.loadedPackages.add(pkg));
      return;
    }

    this.connectPromise = this.doConnect(options);
    try {
      await this.connectPromise;
    } finally {
      this.connectPromise = null;
    }
  }

  private async doConnect(options?: { requiredPackages?: string[] }): Promise<void> {
    if (options?.requiredPackages) {
      this.requiredPackages = options.requiredPackages;
    }

    if (!this.pyenv) {
      this.pyenv = new PyEnv();
      await this.pyenv.init();
    }

    const packagesToLoad = this.requiredPackages.filter((pkg) => !this.loadedPackages.has(pkg));
    if (packagesToLoad.length > 0) {
      await this.pyenv.loadPackages(packagesToLoad);
      packagesToLoad.forEach((pkg) => this.loadedPackages.add(pkg));
    }

    try {
      await this.pyenv.execCode(`
try:
    import matplotlib
    matplotlib.use('agg')
    import matplotlib.pyplot as plt
    import io
    import base64
    _original_show = plt.show
    _display_data = None
    def _patched_show(*args, **kwargs):
        global _display_data
        if plt.get_fignums():
            fig = plt.gcf()
            buffer = io.BytesIO()
            fig.savefig(buffer, format='png', bbox_inches='tight', dpi=100)
            buffer.seek(0)
            _display_data = base64.b64encode(buffer.read()).decode('utf-8')
            plt.close(fig)
        pass
    plt.show = _patched_show
except ImportError:
    pass
`);
    } catch {
      // matplotlib not installed
    }
  }

  async execute(code: string): Promise<NotebookExecutionResult> {
    if (!this.pyenv) {
      await this.connect();
    }
    if (!this.pyenv) {
      return { error: 'Python kernel not initialized' };
    }
    try {
      const response = await this.pyenv.execCode(code);
      const outputParts: string[] = [];

      if (response && typeof response === 'object' && 'console' in response) {
        const consoleOutput = response.console;
        if (Array.isArray(consoleOutput) && consoleOutput.length > 0) {
          const filtered = consoleOutput.filter((s: unknown) => s && String(s).trim());
          if (filtered.length > 0) {
            outputParts.push(...filtered.map(String));
          }
        }
      }

      let imageData: string | undefined;
      try {
        const checkDisplayData = await this.pyenv.execCode(
          '_display_data if "_display_data" in dir() else None'
        );
        const displayResult =
          checkDisplayData && typeof checkDisplayData === 'object' && checkDisplayData !== null && 'result' in checkDisplayData
            ? (checkDisplayData as { result: unknown }).result
            : checkDisplayData;
        if (
          displayResult != null &&
          String(displayResult) !== 'None' &&
          String(displayResult) !== 'undefined'
        ) {
          imageData = String(displayResult);
          await this.pyenv.execCode('_display_data = None');
        }
      } catch {
        // ignore
      }

      if (!imageData) {
        const result =
          response && typeof response === 'object' && response !== null && 'result' in response
            ? (response as { result: unknown }).result
            : response;
        if (result !== undefined && result !== null && String(result) !== 'undefined') {
          const s = String(result);
          if (s && s !== 'undefined') outputParts.push(s);
        }
      }

      return {
        data: outputParts.length > 0 ? outputParts.join('\n') : undefined,
        imageData,
      };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }

  async getVersion(): Promise<string | undefined> {
    if (!this.pyenv) return undefined;
    try {
      const response = await this.pyenv.getVersion();
      return response ?? undefined;
    } catch {
      return undefined;
    }
  }

  interrupt(): void {
    this.pyenv?.interrupt?.();
  }

  async restart(): Promise<void> {
    this.attachedTerminal.reset();
    if (this.pyenv) {
      this.pyenv.close();
      this.pyenv = null;
    }
    this.loadedPackages.clear();
    await this.connect({ requiredPackages: this.requiredPackages });
  }

  openPackageManager(
    context?: {
      requiredPackages: string[];
      onPackageAdded: (name: string) => void;
      onPackageRemoved: (name: string) => void;
    }
  ): void {
    if (!this.pyenv) return;
    pythonPackageManagerService.showPackageManager({
      packages: context?.requiredPackages ?? [],
      pyenv: this.pyenv,
      onPackageAdded: context?.onPackageAdded,
      onPackageRemoved: context?.onPackageRemoved,
    });
  }

  close(): void {
    this.attachedTerminal.release();
    if (this.pyenv) {
      this.pyenv.close();
      this.pyenv = null;
    }
    this.loadedPackages.clear();
  }
}

export const pythonNotebookKernelContribution: NotebookKernelContribution = {
  id: 'python',
  label: 'Python',
  language: 'python',
  loadKernel: async (): Promise<NotebookKernel> => new PythonNotebookKernel(),
};
