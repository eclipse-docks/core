import {
  extensionRegistry,
  i18nLazy,
  contributionRegistry,
  SYSTEM_LANGUAGE_BUNDLES,
} from '@eclipse-lyra/core';
import bundle from './i18n.json';
import pkg from '../package.json';

contributionRegistry.registerContribution(SYSTEM_LANGUAGE_BUNDLES, bundle as any);

const t = i18nLazy('extensions');

extensionRegistry.registerExtension({
  id: pkg.name,
  name: t('EXT_DUCKDB_NAME'),
  description: t('EXT_DUCKDB_DESC'),
  loader: () => import('./duckdb-extension'),
  icon: 'database',
  dependencies: ['@eclipse-lyra/extension-monaco-editor'],
  experimental: true,
});
