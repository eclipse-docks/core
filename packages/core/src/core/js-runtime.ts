/**
 * Scoped JS execution: one worker runs code in its global scope so state persists across
 * execute() calls. Single source of truth for in-worker JS (e.g. notebook kernel, js command).
 */
import JsRuntimeWorker from './js-runtime-worker.js?worker&inline';

export interface JsRuntime {
  execute(code: string): Promise<unknown>;
  close(): void;
}

export function createJsRuntime(): JsRuntime {
  let worker: Worker | null = null;
  let pending: { resolve: (v: unknown) => void; reject: (e: Error) => void } | null = null;

  function getWorker(): Worker {
    if (!worker) {
      worker = new JsRuntimeWorker();
      worker.onmessage = (e: MessageEvent<{ type: string; value?: unknown; message?: string }>) => {
        const p = pending;
        pending = null;
        if (!p) return;
        if (e.data.type === 'result') p.resolve(e.data.value);
        else p.reject(new Error(e.data.message ?? 'Unknown error'));
      };
      worker.onerror = (ev) => {
        const p = pending;
        pending = null;
        if (p) p.reject(new Error(ev.message ?? 'Worker error'));
      };
    }
    return worker;
  }

  return {
    execute(code: string): Promise<unknown> {
      return new Promise((resolve, reject) => {
        pending = { resolve, reject };
        getWorker().postMessage(code);
      });
    },

    close(): void {
      if (worker) {
        worker.terminate();
        worker = null;
      }
      pending = null;
    },
  };
}
