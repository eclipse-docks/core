import { cereusModuleUrl, cereusWasmUrl, runCereusWorker } from './cereusdb-worker-runtime';
import type { CereusDbApi } from './cereusdb-worker-runtime';

runCereusWorker(async () => {
  const { CereusDB } = (await import(cereusModuleUrl('@cereusdb/full'))) as {
    CereusDB: { create: (opts: { wasmUrl: string }) => Promise<unknown> };
  };
  return (await CereusDB.create({
    wasmUrl: cereusWasmUrl('@cereusdb/full'),
  })) as CereusDbApi & Awaited<
    ReturnType<typeof CereusDB.create>
  >;
});
