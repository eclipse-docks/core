import type { NotebookData } from './notebook-types';
import type { NotebookKernelContribution, NotebookKernelDescriptor } from './notebook-kernel-api';

export function resolveKernelIdFromNotebookMetadata(
    metadata: NotebookData['metadata'] | undefined,
    contributions: NotebookKernelContribution[],
): string | null {
    if (!contributions.length) return null;

    const languageName = metadata?.language_info?.name;
    if (typeof languageName === 'string' && languageName.length > 0) {
        const byId = contributions.find((c) => c.id === languageName);
        if (byId) return byId.id;
    }

    const kernelspecName = metadata?.kernelspec?.name;
    if (typeof kernelspecName === 'string' && kernelspecName.length > 0) {
        const byKernelspec = contributions.find((c) => c.id === kernelspecName);
        if (byKernelspec) return byKernelspec.id;
    }

    if (typeof languageName === 'string' && languageName.length > 0) {
        const byLanguage = contributions.find((c) => c.language === languageName);
        if (byLanguage) return byLanguage.id;
    }

    const legacyKernel = metadata?.kernel;
    if (typeof legacyKernel === 'string' && legacyKernel.length > 0) {
        if (contributions.some((c) => c.id === legacyKernel)) {
            return legacyKernel;
        }
    }

    return null;
}

export function applyKernelToNotebookMetadata(
    metadata: NotebookData['metadata'] | undefined,
    contribution: NotebookKernelDescriptor | undefined,
): NotebookData['metadata'] {
    const next: NotebookData['metadata'] = { ...metadata };
    delete next.kernel;

    if (!contribution) {
        return next;
    }

    next.language_info = {
        ...next.language_info,
        name: contribution.language,
    };
    next.kernelspec = {
        ...next.kernelspec,
        name: contribution.id,
        language: contribution.language,
        display_name: contribution.label,
    };

    return next;
}
