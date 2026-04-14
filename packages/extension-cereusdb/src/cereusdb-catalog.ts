import type { CatalogContribution } from '@eclipse-docks/extension-catalog/api';
import { registerCatalog } from '@eclipse-docks/extension-catalog/api';

const CEREUSDB_CATALOG: CatalogContribution = {
  label: 'CereusDB',
  icon: 'database',
  contributionId: 'catalog.cereusdb',
  items: [
    {
      label: 'Basics',
      icon: 'file-lines',
      contributionId: 'catalog.cereusdb.basics',
      items: [
        {
          label: 'Hello CereusDB',
          icon: 'file-code',
          state: {
            url: new URL('./catalog/hello-cereusdb.sql', import.meta.url).href,
            filename: 'hello-cereusdb.sql',
          },
        },
      ],
    },
    {
      label: 'Spatial',
      icon: 'file-lines',
      contributionId: 'catalog.cereusdb.spatial',
      items: [
        {
          label: 'Spatial predicates (GEOS)',
          icon: 'file-code',
          state: {
            url: new URL('./catalog/spatial-predicates.sql', import.meta.url)
              .href,
            filename: 'spatial-predicates.sql',
          },
        },
      ],
    },
    {
      label: 'CRS and geography',
      icon: 'file-lines',
      contributionId: 'catalog.cereusdb.crs',
      items: [
        {
          label: 'CRS transform (standard+)',
          icon: 'file-code',
          state: {
            url: new URL('./catalog/crs-transform.sql', import.meta.url).href,
            filename: 'crs-transform.sql',
          },
        },
        {
          label: 'Geography point (global+)',
          icon: 'file-code',
          state: {
            url: new URL('./catalog/geography-s2.sql', import.meta.url).href,
            filename: 'geography-s2.sql',
          },
        },
        {
          label: 'Raster overview (full)',
          icon: 'file-code',
          state: {
            url: new URL('./catalog/raster-overview.sql', import.meta.url).href,
            filename: 'raster-overview.sql',
          },
        },
      ],
    },
  ],
};

export function registerCereusCatalog(): void {
  registerCatalog(CEREUSDB_CATALOG);
}
