import { CereusDB } from '@cereusdb/full';
import { cereusWasmUrl, runCereusWorker } from './cereusdb-worker-runtime';

runCereusWorker(async () => {
  return (await CereusDB.create({
    wasmUrl: cereusWasmUrl('@cereusdb/full'),
  })) as Awaited<
    ReturnType<typeof CereusDB.create>
  >;
});
