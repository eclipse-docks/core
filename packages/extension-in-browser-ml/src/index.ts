import { extensionRegistry, i18n } from '@eclipse-lyra/core';
import pkg from '../package.json';

const t = await i18n(import.meta.glob('./i18n*.json'), true);

extensionRegistry.registerExtension({
  id: pkg.name,
  name: t.EXT_IN_BROWSER_ML_NAME,
  description: t.EXT_IN_BROWSER_ML_DESC,
  loader: () => import("./in-browser-ml-extension"),
  icon: "brain",
  experimental: true,
});
