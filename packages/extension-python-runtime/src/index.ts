import { extensionRegistry, i18n } from '@eclipse-lyra/core';
import pkg from '../package.json';

const t = await i18n(import.meta.glob('./i18n*.json'), true);

extensionRegistry.registerExtension({
  id: pkg.name,
  name: t.EXT_PYTHONRUNTIME_NAME,
  description: t.EXT_PYTHONRUNTIME_DESC,
  loader: () => Promise.all([
    import("./python-runtime-extension"),
    import("./commands"),
  ]),
  icon: "lyra python",
});
