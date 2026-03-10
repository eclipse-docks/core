import { extensionRegistry, i18n } from '@eclipse-lyra/core';
import pkg from '../package.json';

const t = await i18n(import.meta.glob('./i18n*.json'), true);

extensionRegistry.registerExtension({
  id: pkg.name,
  name: t.EXT_HOWTO_NAME,
  description: t.EXT_HOWTO_DESC,
  loader: () => import("./howto-extension"),
  icon: "list-check",
  experimental: true,
});
