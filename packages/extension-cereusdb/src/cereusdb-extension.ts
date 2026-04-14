import { contributionRegistry } from '@eclipse-docks/core';
import { TARGET_NOTEBOOK_KERNELS } from '@eclipse-docks/extension-notebook';
import { TARGET_SQL_ADAPTERS } from '@eclipse-docks/extension-sqleditor';
import { registerCereusCatalog } from './cereusdb-catalog';
import {
  CEREUS_VARIANTS,
  cereusSqlAdapterContributionFor,
} from './cereusdb-sqldatabase';
import { cereusNotebookKernelContributionFor } from './cereusdb-notebook-kernel';

export default function cereusdbExtension(): void {
  registerCereusCatalog();
  for (const def of CEREUS_VARIANTS) {
    contributionRegistry.registerContribution(
      TARGET_SQL_ADAPTERS,
      cereusSqlAdapterContributionFor(def.engineId, def.label, def.variant),
    );
    contributionRegistry.registerContribution(
      TARGET_NOTEBOOK_KERNELS,
      cereusNotebookKernelContributionFor(def.engineId, def.label, def.variant),
    );
  }
}
