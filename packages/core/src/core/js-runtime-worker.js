/**
 * Worker entry for JsRuntime: receives code, evaluates in global scope, posts result or error.
 * Kept as .js so the worker URL is never .ts (servers often map .ts to video/mp2t MIME type).
 */
self.onmessage = async function (e) {
  const code = e.data;
  try {
    const fn = new Function(code);
    let value = fn();
    if (value != null && typeof value.then === 'function') {
      value = await value;
    }
    try {
      self.postMessage({ type: 'result', value });
    } catch {
      self.postMessage({
        type: 'result',
        value: value === undefined ? undefined : String(value),
      });
    }
  } catch (err) {
    self.postMessage({
      type: 'error',
      message: err instanceof Error ? err.message : String(err),
    });
  }
};
