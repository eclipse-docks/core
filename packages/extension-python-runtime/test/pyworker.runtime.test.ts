import { createRequire } from 'node:module';
import path from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { PyWorkerMessage, PyWorkerResponse } from '../src/pyworker';

const require = createRequire(import.meta.url);
const indexURL = `${path.dirname(require.resolve('pyodide/package.json'))}/`;
const originalConsole = {
  log: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error,
  debug: console.debug,
};

const posted: PyWorkerResponse[] = [];
const fakeSelf: {
  postMessage: (message: PyWorkerResponse) => void;
  onmessage: ((event: MessageEvent<PyWorkerMessage>) => Promise<void> | void) | null;
} = {
  postMessage(message) {
    posted.push(message);
  },
  onmessage: null,
};

let cursor = 0;
let sequence = 0;

function since(): PyWorkerResponse[] {
  return posted.slice(cursor);
}

async function waitFor(predicate: (message: PyWorkerResponse) => boolean): Promise<PyWorkerResponse> {
  const started = Date.now();
  while (Date.now() - started < 5_000) {
    const found = since().find(predicate);
    if (found) return found;
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  throw new Error(`Timed out waiting for a worker message: ${JSON.stringify(since())}`);
}

function dispatch(message: PyWorkerMessage): Promise<void> {
  cursor = posted.length;
  const result = fakeSelf.onmessage?.({ data: message } as MessageEvent<PyWorkerMessage>);
  return Promise.resolve(result).then(() => undefined);
}

async function request(type: PyWorkerMessage['type'], payload?: unknown) {
  const id = `m-${++sequence}`;
  await dispatch({ id, type, payload });
  const done = since().find((message) => message.id === id);
  if (!done) throw new Error(`No reply for ${type}: ${JSON.stringify(since())}`);
  if (done.type === 'error') throw new Error(done.payload.message);
  return done.payload;
}

function serve(handle: (payload: any) => { success: boolean; data?: unknown; error?: string }) {
  const seen = new Set<string>();
  const timer = setInterval(() => {
    for (const message of posted) {
      if (message.type !== 'workspaceRequest' || seen.has(message.id)) continue;
      seen.add(message.id);
      void fakeSelf.onmessage?.({
        data: {
          id: message.id,
          type: 'workspaceResponse',
          payload: handle(message.payload),
        },
      } as MessageEvent<PyWorkerMessage>);
    }
  }, 5);
  return () => clearInterval(timer);
}

describe('Pyodide worker', () => {
  beforeAll(async () => {
    (globalThis as { self?: typeof fakeSelf }).self = fakeSelf;
    await import('../src/pyworker');
  });

  afterAll(() => {
    console.log = originalConsole.log;
    console.info = originalConsole.info;
    console.warn = originalConsole.warn;
    console.error = originalConsole.error;
    console.debug = originalConsole.debug;
  });

  it('rejects work before the runtime is initialized', async () => {
    await expect(request('execCode', { code: '1 + 1' })).rejects.toThrow('Pyodide not initialized');
    await expect(request('loadPackages', { packages: ['numpy'] })).rejects.toThrow('Pyodide not initialized');
    await expect(request('getVersion')).rejects.toThrow('Pyodide not initialized');
    await expect(request('not-a-command' as PyWorkerMessage['type'])).rejects.toThrow('Unknown message type: not-a-command');
  });

  it('boots, installs caller vars, and publishes a one-byte interrupt buffer', async () => {
    const payload = await request('init', { indexURL, vars: { factor: 6 } });
    expect(payload).toEqual({ initialized: true });
    const buffer = since().find((message) => message.id === 'interrupt-buffer');
    expect(buffer?.payload).toBeInstanceOf(SharedArrayBuffer);
    expect(buffer?.payload.byteLength).toBe(1);
    expect(await request('getVersion')).toMatch(/^\d+\.\d+\.\d+$/);
    expect(await request('execCode', { code: 'factor * 7' })).toMatchObject({ result: 42 });
  });

  it('converts a Python result into a plain JavaScript value', async () => {
    const payload = await request('execCode', { code: '{"a": 1, "b": {"c": [1, 2]}}' });
    expect(payload.result).toEqual({ a: 1, b: { c: [1, 2] } });
    expect(payload.result).not.toHaveProperty('toJs');
  });

  it('captures stdout and stderr and starts each run with an empty console', async () => {
    const first = await request('execCode', { code: 'import sys\nprint("hi")\nprint("e", file=sys.stderr)' });
    expect(first.console).toEqual(['hi', 'e']);
    expect(since().filter((message) => message.type === 'stdout').map((message) => message.payload)).toEqual(['hi']);
    expect(since().filter((message) => message.type === 'stderr').map((message) => message.payload)).toEqual(['e']);

    const second = await request('execCode', { code: 'print("only")' });
    expect(second.console).toEqual(['only']);
  });

  it('clears the interrupt flag after a failed run and a successful one', async () => {
    const shared = posted.find((message) => message.id === 'interrupt-buffer')?.payload as SharedArrayBuffer;
    const flag = new Uint8Array(shared);
    flag[0] = 2;
    await expect(request('execCode', { code: 'raise ValueError("boom")' })).rejects.toThrow(/ValueError: boom/);
    expect(flag[0]).toBe(0);

    expect(await request('execCode', { code: '1 + 1' })).toMatchObject({ result: 2 });
    expect(flag[0]).toBe(0);
  });

  it('calls a Python function and checks the module entry point', async () => {
    await request('execCode', { code: 'def add(a=0, b=0):\n    return a + b' });
    expect(await request('runFunction', { name: 'add', args: { a: 2, b: 3 } })).toMatchObject({ result: 5 });

    await request('execCode', {
      code: [
        'import types, sys',
        'mod = types.ModuleType("sample_mod")',
        'mod.value = 5',
        'sys.modules["sample_mod"] = mod',
      ].join('\n'),
    });
    const missing = await request('execModule', { moduleName: 'sample_mod', entryName: 'absent', vars: {} });
    expect(missing.result).toBeUndefined();
    await expect(request('execModule', { moduleName: 'sample_mod', entryName: 'value', vars: {} }))
      .rejects.toThrow('Module entry point is not a function: value');
  });

  it('does not ask the runtime to load an empty package list', async () => {
    expect(await request('loadPackages', { packages: [] })).toEqual({ loaded: true });
  });

  it('answers input() and treats a cancelled prompt as an empty string', async () => {
    const id = `m-${++sequence}`;
    const done = dispatch({ id, type: 'execCode', payload: { code: "input('Name: ')" } });
    const prompt = await waitFor((message) => message.type === 'inputRequest');
    expect(prompt.payload.prompt).toBe('Name: ');
    await dispatch({
      id: prompt.id,
      type: 'inputResponse',
      payload: { value: 'Ada', cancelled: false },
    });
    await done;
    expect(since().find((message) => message.id === id)?.payload.result).toBe('Ada');

    const cancelledId = `m-${++sequence}`;
    const cancelled = dispatch({ id: cancelledId, type: 'execCode', payload: { code: 'input()' } });
    const again = await waitFor((message) => message.type === 'inputRequest' && message.id !== prompt.id);
    await dispatch({ id: again.id, type: 'inputResponse', payload: { value: null, cancelled: true } });
    await cancelled;
    expect(since().find((message) => message.id === cancelledId)?.payload.result).toBe('');
  });

  it('installs the docks module and turns workspace failures into Python exceptions', async () => {
    const ops: Array<Record<string, unknown>> = [];
    const fetched: string[] = [];
    const originalFetch = globalThis.fetch;
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      fetched.push(String(input));
      return new Response(`body:${String(input)}`);
    }) as typeof fetch;
    const stop = serve((payload) => {
      ops.push(payload);
      if (payload.op === 'read') {
        if (payload.path !== 'notes.txt') return { success: false, error: `File not found: ${payload.path}` };
        return { success: true, data: 'abcdef' };
      }
      if (payload.op === 'read_range') return { success: true, data: 'range' };
      if (payload.op === 'get_uri') return { success: true, data: `https://files.example/${payload.path}` };
      if (payload.op === 'revoke_uri') return { success: true };
      return { success: false, error: `Unknown workspace op: ${payload.op}` };
    });

    try {
      const payload = await request('execCode', {
        code: [
          'import docks',
          'text = await docks.read_file("notes.txt")',
          'try:',
          '    await docks.read_file("missing.txt")',
          '    missing = ""',
          'except Exception as exc:',
          '    missing = str(exc)',
          'await docks.read_file_range("notes.txt", 1, 3)',
          'await docks.read_file_range("notes.txt", 0, 1, False)',
          'fetched = await (await docks.fetch("notes.txt")).text()',
          'blob = await (await docks.fetch("blob:keep")).text()',
          'ctx = docks.uri("notes.txt")',
          'held = await ctx.__aenter__()',
          'await ctx.__aexit__(None, None, None)',
          '{"text": text, "missing": missing, "fetched": fetched, "blob": blob, "held": held}',
        ].join('\n'),
      });
      expect(payload.result).toEqual({
        text: 'abcdef',
        missing: expect.stringContaining('File not found: missing.txt'),
        fetched: 'body:https://files.example/notes.txt',
        blob: 'body:blob:keep',
        held: 'https://files.example/notes.txt',
      });
      expect(ops.filter((op) => op.op === 'read_range').map((op) => op.binary)).toEqual([true, false]);
      expect(ops.filter((op) => op.op === 'revoke_uri').map((op) => op.uri)).toEqual([
        'https://files.example/notes.txt',
        'https://files.example/notes.txt',
      ]);
      expect(fetched).toEqual(['https://files.example/notes.txt', 'blob:keep']);
    } finally {
      stop();
      globalThis.fetch = originalFetch;
    }
  });

  it('forwards worker console lines to the main thread', () => {
    cursor = posted.length;
    console.log('pkg', { a: 1 });
    console.error(new Error('x'));
    const messages = since().filter((message) => message.type === 'console');
    expect(messages.map((message) => message.payload)).toEqual([
      { level: 'info', message: 'pkg {"a":1}' },
      { level: 'error', message: 'Error: x' },
    ]);
  });
});
