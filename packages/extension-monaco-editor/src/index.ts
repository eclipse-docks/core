import { extensionRegistry, i18n } from '@eclipse-lyra/core';
import pkg from '../package.json';

const t = await i18n(import.meta.glob('./i18n*.json'), true);

extensionRegistry.registerExtension({
  id: pkg.name,
  name: t.EXT_MONACO_NAME,
  description: t.EXT_MONACO_DESC,
  loader: () => import("./monaco-editor-extension"),
  icon: "file-pen",
});

export { MONACO_EDITOR_TOOLBAR_TARGET_PREFIX } from './monaco-toolbar-constants';
export { LyraMonacoWidget } from './monaco-widget';
