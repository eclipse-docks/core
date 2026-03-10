import { extensionRegistry, i18n } from '@eclipse-lyra/core';
import pkg from '../package.json';

const t = await i18n(import.meta.glob('./i18n*.json'), true);

extensionRegistry.registerExtension({
  id: pkg.name,
  name: t.EXT_RAG_SYSTEM_NAME,
  description: t.EXT_RAG_SYSTEM_DESC,
  loader: () => import("./rag-system-extension"),
  icon: "database",
  experimental: true,
  dependencies: ["@eclipse-lyra/extension-ai-system", "@eclipse-lyra/extension-in-browser-ml"],
});
