import { extensionRegistry, i18n } from '@eclipse-lyra/core';
import pkg from '../package.json';

const t = await i18n(import.meta.glob('./i18n*.json'), true);

extensionRegistry.registerExtension({
  id: pkg.name,
  name: t.EXT_MEDIAVIEWER_NAME,
  description: t.EXT_MEDIAVIEWER_DESC,
  loader: () => import("./media-viewer-extension"),
  icon: "image",


});
