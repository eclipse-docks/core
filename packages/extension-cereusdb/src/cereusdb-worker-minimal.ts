import { CereusDB } from '@cereusdb/minimal';
import { cereusWasmUrl, runCereusWorker } from './cereusdb-worker-runtime';

runCereusWorker(async () => {
  return (await CereusDB.create({
    wasmUrl: cereusWasmUrl('@cereusdb/minimal'),
  })) as Awaited<
    ReturnType<typeof CereusDB.create>
  >;
});
