import { applyKernelToNotebookMetadata } from './notebook-metadata';
import type { NotebookKernelDescriptor } from './notebook-kernel-api';
import type { NotebookData } from './notebook-types';

function starterCodeForKernel(kernel: NotebookKernelDescriptor): string[] {
    switch (kernel.language) {
        case 'python':
            return ['print("Hello, World!")\n'];
        case 'javascript':
            return ['return "Hello, World!"'];
        case 'sql':
            return [`SELECT '${kernel.label}' AS engine;\n`];
        default:
            return [`# ${kernel.label}\n`];
    }
}

export function buildDefaultNotebook(kernel: NotebookKernelDescriptor): NotebookData {
    return {
        cells: [
            {
                cell_type: 'markdown',
                source: [
                    '# Notebook\n',
                    '\n',
                    'Press **Run** in the code cell below to execute it.\n',
                ],
                metadata: {},
            },
            {
                cell_type: 'code',
                source: starterCodeForKernel(kernel),
                execution_count: null,
                outputs: [],
                metadata: {},
            },
        ],
        metadata: applyKernelToNotebookMetadata(undefined, kernel),
        nbformat: 4,
        nbformat_minor: 4,
    };
}
