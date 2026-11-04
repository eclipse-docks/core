import type { CatalogContribution } from '@eclipse-docks/extension-catalog/api';
import { registerCatalog } from '@eclipse-docks/extension-catalog/api';
import loungingCatSource from './canvases/lounging-cat.canvas.js?raw';
import tasksSource from './canvases/tasks.canvas.js?raw';

function canvasFileUrl(source: string): string {
    return `data:text/javascript;charset=utf-8,${encodeURIComponent(source)}`;
}

const CANVAS_CATALOG: CatalogContribution = {
    label: 'Canvases',
    icon: 'table-columns',
    contributionId: 'catalog.canvases',
    items: [
        {
            label: 'Examples',
            icon: 'file-code',
            contributionId: 'catalog.canvases.examples',
            items: [
                { label: 'Tasks', icon: 'list-check', state: { url: canvasFileUrl(tasksSource), filename: 'tasks.canvas.js' } },
                { label: 'Lounging Cat', icon: 'cat', state: { url: canvasFileUrl(loungingCatSource), filename: 'lounging-cat.canvas.js' } },
            ],
        },
    ],
};

export function registerCanvasCatalog(): void {
    registerCatalog(CANVAS_CATALOG);
}
