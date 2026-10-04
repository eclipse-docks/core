export interface PgliteExtensionDefinition {
  id: string;
  label: string;
  description: string;
  load: () => Promise<Record<string, unknown>>;
}

const DEFINITIONS: PgliteExtensionDefinition[] = [
  {
    id: 'live',
    label: 'live',
    description: 'Reactive/live queries for PGlite',
    load: async () => import('@electric-sql/pglite/live'),
  },
  {
    id: 'vector',
    label: 'pgvector',
    description: 'Vector similarity search',
    load: async () => import('@electric-sql/pglite-pgvector'),
  },
  {
    id: 'amcheck',
    label: 'amcheck',
    description: 'Index structure consistency checks',
    load: async () => import('@electric-sql/pglite/contrib/amcheck'),
  },
  {
    id: 'age',
    label: 'Apache AGE',
    description: 'Graph database extension on top of PostgreSQL',
    load: async () => import('@electric-sql/pglite-age'),
  },
  {
    id: 'auto_explain',
    label: 'auto_explain',
    description: 'Automatically log execution plans for slow statements',
    load: async () => import('@electric-sql/pglite/contrib/auto_explain'),
  },
  {
    id: 'bloom',
    label: 'bloom',
    description: 'Bloom filter index access method',
    load: async () => import('@electric-sql/pglite/contrib/bloom'),
  },
  {
    id: 'btree_gin',
    label: 'btree_gin',
    description: 'B-tree equivalent GIN operator classes',
    load: async () => import('@electric-sql/pglite/contrib/btree_gin'),
  },
  {
    id: 'btree_gist',
    label: 'btree_gist',
    description: 'B-tree equivalent GiST operator classes',
    load: async () => import('@electric-sql/pglite/contrib/btree_gist'),
  },
  {
    id: 'citext',
    label: 'citext',
    description: 'Case-insensitive text type',
    load: async () => import('@electric-sql/pglite/contrib/citext'),
  },
  {
    id: 'cube',
    label: 'cube',
    description: 'Multidimensional cube data type',
    load: async () => import('@electric-sql/pglite/contrib/cube'),
  },
  {
    id: 'dict_int',
    label: 'dict_int',
    description: 'Integer dictionary template for full-text search',
    load: async () => import('@electric-sql/pglite/contrib/dict_int'),
  },
  {
    id: 'dict_xsyn',
    label: 'dict_xsyn',
    description: 'Extended synonym dictionary for full-text search',
    load: async () => import('@electric-sql/pglite/contrib/dict_xsyn'),
  },
  {
    id: 'earthdistance',
    label: 'earthdistance',
    description: 'Great-circle distance calculations on Earth',
    load: async () => import('@electric-sql/pglite/contrib/earthdistance'),
  },
  {
    id: 'file_fdw',
    label: 'file_fdw',
    description: 'Foreign-data wrapper for file system access',
    load: async () => import('@electric-sql/pglite/contrib/file_fdw'),
  },
  {
    id: 'fuzzystrmatch',
    label: 'fuzzystrmatch',
    description: 'String similarity and distance functions',
    load: async () => import('@electric-sql/pglite/contrib/fuzzystrmatch'),
  },
  {
    id: 'hstore',
    label: 'hstore',
    description: 'Key/value store within a single value',
    load: async () => import('@electric-sql/pglite/contrib/hstore'),
  },
  {
    id: 'intarray',
    label: 'intarray',
    description: 'Functions and operators for integer arrays',
    load: async () => import('@electric-sql/pglite/contrib/intarray'),
  },
  {
    id: 'isn',
    label: 'isn',
    description:
      'Data types for various international product numbering standards',
    load: async () => import('@electric-sql/pglite/contrib/isn'),
  },
  {
    id: 'lo',
    label: 'lo',
    description: 'Large object (BLOB) support',
    load: async () => import('@electric-sql/pglite/contrib/lo'),
  },
  {
    id: 'ltree',
    label: 'ltree',
    description: 'Hierarchical label tree data type',
    load: async () => import('@electric-sql/pglite/contrib/ltree'),
  },
  {
    id: 'pageinspect',
    label: 'pageinspect',
    description: 'Low-level inspection of database pages',
    load: async () => import('@electric-sql/pglite/contrib/pageinspect'),
  },
  {
    id: 'pg_buffercache',
    label: 'pg_buffercache',
    description: 'Inspect the shared buffer cache',
    load: async () => import('@electric-sql/pglite/contrib/pg_buffercache'),
  },
  {
    id: 'pg_freespacemap',
    label: 'pg_freespacemap',
    description: 'Inspect the free space map',
    load: async () => import('@electric-sql/pglite/contrib/pg_freespacemap'),
  },
  {
    id: 'pg_hashids',
    label: 'pg_hashids',
    description: 'Hashids support for Postgres',
    load: async () => import('@electric-sql/pglite-pg_hashids'),
  },
  {
    id: 'pg_ivm',
    label: 'pg_ivm',
    description: 'Incremental view maintenance',
    load: async () => import('@electric-sql/pglite-pg_ivm'),
  },
  {
    id: 'pg_surgery',
    label: 'pg_surgery',
    description: 'Low-level relation surgery helpers',
    load: async () => import('@electric-sql/pglite/contrib/pg_surgery'),
  },
  {
    id: 'pg_textsearch',
    label: 'pg_textsearch',
    description: 'BM25 relevance-ranked full-text search',
    load: async () => import('@electric-sql/pglite-pg_textsearch'),
  },
  {
    id: 'pg_trgm',
    label: 'pg_trgm',
    description: 'Trigram-based text similarity',
    load: async () => import('@electric-sql/pglite/contrib/pg_trgm'),
  },
  {
    id: 'pg_uuidv7',
    label: 'pg_uuidv7',
    description: 'UUID v7 generation',
    load: async () => import('@electric-sql/pglite-pg_uuidv7'),
  },
  {
    id: 'pg_visibility',
    label: 'pg_visibility',
    description: 'Inspect visibility map and page-level visibility',
    load: async () => import('@electric-sql/pglite/contrib/pg_visibility'),
  },
  {
    id: 'pg_walinspect',
    label: 'pg_walinspect',
    description: 'Inspect write-ahead log contents',
    load: async () => import('@electric-sql/pglite/contrib/pg_walinspect'),
  },
  {
    id: 'pgcrypto',
    label: 'pgcrypto',
    description: 'Cryptographic functions for PostgreSQL',
    load: async () => import('@electric-sql/pglite/contrib/pgcrypto'),
  },
  {
    id: 'pgmq',
    label: 'pgmq',
    description: 'Lightweight message queue',
    load: async () => import('@electric-sql/pglite-pgmq'),
  },
  {
    id: 'pgtap',
    label: 'pgtap',
    description: 'TAP-emitting unit tests for Postgres',
    load: async () => import('@electric-sql/pglite-pgtap'),
  },
  {
    id: 'postgis',
    label: 'PostGIS',
    description: 'Store, index, and query geospatial data',
    load: async () => import('@electric-sql/pglite-postgis'),
  },
  {
    id: 'seg',
    label: 'seg',
    description: 'Floating point interval/segment data type',
    load: async () => import('@electric-sql/pglite/contrib/seg'),
  },
  {
    id: 'tablefunc',
    label: 'tablefunc',
    description: 'Table-returning helper functions',
    load: async () => import('@electric-sql/pglite/contrib/tablefunc'),
  },
  {
    id: 'tcn',
    label: 'tcn',
    description: 'Trigger-based change notifications',
    load: async () => import('@electric-sql/pglite/contrib/tcn'),
  },
  {
    id: 'tsm_system_rows',
    label: 'tsm_system_rows',
    description: 'TABLESAMPLE SYSTEM_ROWS method',
    load: async () =>
      import('@electric-sql/pglite/contrib/tsm_system_rows'),
  },
  {
    id: 'tsm_system_time',
    label: 'tsm_system_time',
    description: 'TABLESAMPLE SYSTEM_TIME method',
    load: async () =>
      import('@electric-sql/pglite/contrib/tsm_system_time'),
  },
  {
    id: 'unaccent',
    label: 'unaccent',
    description: 'Accent-removal text search dictionary',
    load: async () => import('@electric-sql/pglite/contrib/unaccent'),
  },
  {
    id: 'uuid_ossp',
    label: 'uuid_ossp',
    description: 'UUID generation functions (various versions)',
    load: async () => import('@electric-sql/pglite/contrib/uuid_ossp'),
  },
];

export const PGLITE_EXTENSIONS_BY_ID: Record<string, PgliteExtensionDefinition> =
  DEFINITIONS.reduce((acc, def) => {
    acc[def.id] = def;
    return acc;
  }, {} as Record<string, PgliteExtensionDefinition>);

export function listPgliteExtensions(): PgliteExtensionDefinition[] {
  return [...DEFINITIONS];
}

export async function loadPgliteExtensionModule(
  id: string,
): Promise<unknown> {
  const def = PGLITE_EXTENSIONS_BY_ID[id];
  if (!def) {
    throw new Error(`Unknown PGlite extension: ${id}`);
  }
  const mod = await def.load();
  const ext = mod[id];
  if (!ext) {
    throw new Error(
      `Extension "${id}" not found in loaded module for id "${id}".`,
    );
  }
  return ext;
}

