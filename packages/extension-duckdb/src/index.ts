import { extensionRegistry, i18n } from '@eclipse-lyra/core';
import pkg from '../package.json';

const t = await i18n(import.meta.glob('./i18n*.json'), true);

extensionRegistry.registerExtension({
  id: pkg.name,
  name: t.EXT_DUCKDB_NAME,
  description: t.EXT_DUCKDB_DESC,
  loader: () => import('./duckdb-extension'),
  icon: 'database',
  dependencies: ['@eclipse-lyra/extension-monaco-editor'],
  experimental: true,
});
