export * from './notebook-types';
export * from './notebook-kernel-api';
export { buildDefaultNotebook } from './notebook-default-content';
export {
    applyKernelToNotebookMetadata,
    resolveKernelIdFromNotebookMetadata,
} from './notebook-metadata';
import { extensionRegistry, i18n } from '@eclipse-docks/core';
import pkg from '../package.json';

const t = await i18n(import.meta.glob('./i18n*.json'), true);

extensionRegistry.registerExtension({
  id: pkg.name,
  name: t.EXT_NOTEBOOK_NAME,
  description: t.EXT_NOTEBOOK_DESC,
  loader: () => import("./notebook-extension"),
  icon: "docks jupyter",
  dependencies: [],
});
