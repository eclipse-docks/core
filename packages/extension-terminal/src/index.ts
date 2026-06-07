import { extensionRegistry, i18n } from '@eclipse-docks/core';
import pkg from '../package.json';

const t = await i18n(import.meta.glob('./i18n*.json'), true);

extensionRegistry.registerExtension({
  id: pkg.name,
  name: t.EXT_TERMINAL_NAME,
  description: t.EXT_TERMINAL_DESC,
  loader: () => import('./terminal-extension'),
  icon: 'terminal',
});
