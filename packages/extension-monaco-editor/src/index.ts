import { extensionRegistry, i18n } from '@eclipse-docks/core';
import pkg from '../package.json';

const t = await i18n(import.meta.glob('./i18n*.json'), true);

extensionRegistry.registerExtension({
  id: pkg.name,
  name: t.EXT_MONACO_NAME,
  description: t.EXT_MONACO_DESC,
  loader: () => import("./monaco-editor-extension"),
  icon: "file-pen",
});

export const MONACO_EDITOR_TOOLBAR_TARGET_PREFIX = 'toolbar:system.monaco-editor';

export {
  MONACO_GRAMMARS,
  type MonacoGrammarContribution,
} from './monaco-grammar-api';
