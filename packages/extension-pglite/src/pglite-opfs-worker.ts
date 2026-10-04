import { PGlite, type Extension, type Extensions } from '@electric-sql/pglite';
import { worker } from '@electric-sql/pglite/worker';
import { loadPgliteExtensionModule } from './pglite-extensions';

type WorkerMeta = {
  extensionIds?: string[];
};

async function loadExtensions(ids: string[]): Promise<Extensions | undefined> {
  if (!ids.length) return undefined;
  const extensions: Extensions = {};
  for (const id of ids) {
    extensions[id] = (await loadPgliteExtensionModule(id)) as Extension;
  }
  return extensions;
}

worker({
  async init(options) {
    const meta = options.meta as WorkerMeta | undefined;
    const extensions = await loadExtensions(meta?.extensionIds ?? []);
    if (!options.dataDir) {
      throw new Error('PGlite OPFS worker requires a dataDir');
    }
    return PGlite.create({
      dataDir: options.dataDir,
      ...(extensions ? { extensions } : {}),
    });
  },
});
