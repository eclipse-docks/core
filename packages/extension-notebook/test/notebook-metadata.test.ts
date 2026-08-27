// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { buildDefaultNotebook } from '../src/notebook-default-content';
import {
    applyKernelToNotebookMetadata,
    resolveKernelIdFromNotebookMetadata,
} from '../src/notebook-metadata';
import type { NotebookKernelContribution } from '../src/notebook-kernel-api';

const kernels: NotebookKernelContribution[] = [
    { id: 'javascript', label: 'JavaScript', language: 'javascript', loadKernel: async () => ({}) as never },
    { id: 'python', label: 'Python', language: 'python', loadKernel: async () => ({}) as never },
    { id: 'duckdb', label: 'DuckDB', language: 'sql', loadKernel: async () => ({}) as never },
    { id: 'pglite', label: 'PGlite', language: 'sql', loadKernel: async () => ({}) as never },
];

describe('notebook-metadata', () => {
    it('resolves kernel from language_info.name by language', () => {
        expect(
            resolveKernelIdFromNotebookMetadata({ language_info: { name: 'python' } }, kernels),
        ).toBe('python');
    });

    it('resolves kernel from language_info.name by id', () => {
        expect(
            resolveKernelIdFromNotebookMetadata({ language_info: { name: 'duckdb' } }, kernels),
        ).toBe('duckdb');
    });

    it('resolves sql kernels via kernelspec.name', () => {
        expect(
            resolveKernelIdFromNotebookMetadata(
                { language_info: { name: 'sql' }, kernelspec: { name: 'pglite' } },
                kernels,
            ),
        ).toBe('pglite');
    });

    it('falls back to legacy metadata.kernel', () => {
        expect(resolveKernelIdFromNotebookMetadata({ kernel: 'javascript' }, kernels)).toBe('javascript');
    });

    it('writes language_info.name and kernelspec on apply', () => {
        const metadata = applyKernelToNotebookMetadata({}, kernels[1]);
        expect(metadata?.language_info?.name).toBe('python');
        expect(metadata?.kernelspec?.name).toBe('python');
        expect(metadata?.kernel).toBeUndefined();
    });
});

describe('buildDefaultNotebook', () => {
    it('builds python notebook with language_info.name', () => {
        const notebook = buildDefaultNotebook(kernels[1]);
        expect(notebook.metadata?.language_info?.name).toBe('python');
        expect(notebook.metadata?.kernelspec?.name).toBe('python');
        expect(notebook.cells[1]?.source).toContain('print("Hello, World!")\n');
    });
});
