import { extensionRegistry, i18n } from '@eclipse-docks/core';
import pkg from '../package.json';

const t = await i18n(import.meta.glob('./i18n*.json'), true);

extensionRegistry.registerExtension({
  id: pkg.name,
  name: t.EXT_PLAIN_NAME,
  description: t.EXT_PLAIN_DESC,
  loader: () => import('./plain-editor-extension.js'),
  icon: 'file-lines',
});

export const PLAIN_EDITOR_TOOLBAR_TARGET_PREFIX = 'toolbar:system.plain-editor';
