export const TARGET_NOTEBOOK_KERNELS = 'system.notebookkernels';

export interface NotebookExecutionResult {
  data?: string;
  imageData?: string;
  error?: string;
}

export interface NotebookKernel {
  readonly id: string;
  readonly label: string;
  readonly icon?: string;
  readonly language: string;
  execute(code: string): Promise<NotebookExecutionResult>;
  connect?(options?: { requiredPackages?: string[] }): Promise<void>;
  disconnect?(): Promise<void>;
  restart?(): Promise<void>;
  interrupt?(): void;
  getVersion?(): Promise<string | undefined>;
  openPackageManager?(
    context?: {
      requiredPackages: string[];
      onPackageAdded: (name: string) => void;
      onPackageRemoved: (name: string) => void;
    }
  ): void;
  close?(): void | Promise<void>;
}

export interface NotebookKernelDescriptor {
  id: string;
  label: string;
  language: string;
}

export interface NotebookKernelContribution extends NotebookKernelDescriptor {
  icon?: string;
  loadKernel(): Promise<NotebookKernel>;
}
