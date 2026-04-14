import { CereusDB } from '@cereusdb/standard';
import { cereusWasmUrl, runCereusWorker } from './cereusdb-worker-runtime';

runCereusWorker(async () => {
  return (await CereusDB.create({
    wasmUrl: cereusWasmUrl('@cereusdb/standard'),
  })) as Awaited<
    ReturnType<typeof CereusDB.create>
  >;
});
