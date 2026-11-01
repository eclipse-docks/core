import { extensionRegistry, i18n } from '@eclipse-docks/core';
import pkg from '../package.json';

export { SYSTEM_CANVASES, isCanvasContribution, type CanvasContribution, type CanvasToolContribution } from './contribution';

const t = await i18n(import.meta.glob('./i18n*.json'), true);

extensionRegistry.registerExtension({
    id: pkg.name,
    name: t.EXT_CANVAS_NAME,
    description: t.EXT_CANVAS_DESC,
    loader: () => import('./canvas-extension'),
    icon: 'table-columns',
    dependencies: ['@eclipse-docks/extension-monaco-editor'],
});
