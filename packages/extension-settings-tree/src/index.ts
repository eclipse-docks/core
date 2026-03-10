import { extensionRegistry, i18n } from '@eclipse-lyra/core';
import pkg from '../package.json';

const t = await i18n(import.meta.glob('./i18n*.json'), true);

extensionRegistry.registerExtension({
  id: pkg.name,
  name: t.EXT_SETTINGS_TREE_NAME,
  description: t.EXT_SETTINGS_TREE_DESC,
  loader: () => import("./settings-tree-extension"),
  icon: "sitemap",


});
