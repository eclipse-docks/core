import { CereusDB } from '@cereusdb/global';
import { cereusWasmUrl, runCereusWorker } from './cereusdb-worker-runtime';

runCereusWorker(async () => {
  return (await CereusDB.create({
    wasmUrl: cereusWasmUrl('@cereusdb/global'),
  })) as Awaited<
    ReturnType<typeof CereusDB.create>
  >;
});
