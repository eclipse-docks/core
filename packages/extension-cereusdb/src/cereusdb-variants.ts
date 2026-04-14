export type CereusVariantId = 'minimal' | 'standard' | 'full' | 'global';

export const CEREUS_VARIANTS: readonly {
  engineId: string;
  label: string;
  variant: CereusVariantId;
}[] = [
  {
    engineId: 'cereusdb-minimal',
    label: 'CereusDB (minimal — GEOS)',
    variant: 'minimal',
  },
  {
    engineId: 'cereusdb-standard',
    label: 'CereusDB (standard — GEOS + PROJ)',
    variant: 'standard',
  },
  {
    engineId: 'cereusdb-full',
    label: 'CereusDB (full — GEOS, PROJ, GDAL, S2)',
    variant: 'full',
  },
  {
    engineId: 'cereusdb-global',
    label: 'CereusDB (global — GEOS, PROJ, S2)',
    variant: 'global',
  },
] as const;
