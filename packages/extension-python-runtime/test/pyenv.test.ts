import { beforeEach, describe, expect, it, vi } from 'vitest';

const host = vi.hoisted(() => {
  const logger = {
    debug: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
  };

  class File {
    saved: unknown;
    constructor(readonly text: string, readonly httpUri?: string) {}
    async getContents(options?: { blob?: boolean; uri?: boolean }) {
      if (options?.uri) return this.httpUri;
      if (options?.blob) return new Blob([this.text]);
      return this.text;
    }
    async saveContents(content: unknown) {
      this.saved = content;
    }
  }

  class Directory {
    constructor(readonly children: { getName(): string }[] = []) {}
    async listChildren() {
      return this.children;
    }
  }

  class FakeWorker {
    static latest: FakeWorker | undefined;
    static nextBuffer: SharedArrayBuffer | undefined = new SharedArrayBuffer(1);
    onmessage: ((event: MessageEvent) => void) | null = null;
    onerror: ((event: ErrorEvent) => void) | null = null;
    terminated = false;
    posts: Array<{ id: string; type: string; payload?: any }> = [];
    readonly buffer: SharedArrayBuffer | undefined;

    constructor() {
      this.buffer = FakeWorker.nextBuffer;
      FakeWorker.latest = this;
    }

    initPayload?: { indexURL?: string };
    postMessage(data: { id: string; type: string; payload?: any }) {
      this.posts.push(data);
      if (data.type !== 'init') return;
      this.initPayload = data.payload;
      this.emit({
        id: 'interrupt-buffer',
        type: 'success',
        payload: this.buffer,
      });
      this.emit({ id: data.id, type: 'success', payload: { initialized: true } });
    }

    terminate() {
      this.terminated = true;
    }

    emit(data: unknown) {
      this.onmessage?.({ data } as MessageEvent);
    }
  }

  const state: {
    workspace: null | { getResource: (path: string, options?: { create?: boolean }) => Promise<unknown> };
  } = { workspace: null };

  return { logger, File, Directory, FakeWorker, state };
});

vi.mock('@eclipse-docks/core', () => ({
  createLogger: () => host.logger,
  workspaceService: {
    getWorkspace: async () => host.state.workspace,
  },
  File: host.File,
  Directory: host.Directory,
}));

vi.mock('../src/pyworker?worker&inline', () => ({
  default: host.FakeWorker,
}));

const { PyEnv } = await import('../src/pyservice');

async function started(vars?: unknown) {
  const env = new PyEnv();
  await env.init(vars);
  const worker = host.FakeWorker.latest;
  if (!worker) throw new Error('worker was not created');
  worker.posts.length = 0;
  return { env, worker };
}

async function workspaceReply(worker: InstanceType<typeof host.FakeWorker>) {
  const from = worker.posts.length;
  await vi.waitFor(() => {
    if (worker.posts.length === from) throw new Error('workspace response was not posted');
  });
  return worker.posts.at(-1)!;
}

describe('PyEnv', () => {
  beforeEach(() => {
    host.logger.debug.mockClear();
    host.logger.error.mockClear();
    host.FakeWorker.nextBuffer = new SharedArrayBuffer(1);
    host.FakeWorker.latest = undefined;
    host.state.workspace = null;
    vi.stubGlobal('window', { prompt: vi.fn(() => null), logToTerminal: undefined });
    vi.stubGlobal('fetch', vi.fn());
  });

  it('rejects work before init and after close', async () => {
    const env = new PyEnv();
    await expect(env.execCode('1')).rejects.toThrow('PyEnv not initialized yet: see init()');
    const running = await started();
    expect(running.worker.initPayload?.indexURL).toBeUndefined();
    running.env.close();
    expect(running.worker.terminated).toBe(true);
    await expect(running.env.getVersion()).rejects.toThrow('PyEnv not initialized yet: see init()');
  });

  it('tracks the interrupt buffer and raises SIGINT', async () => {
    const { env, worker } = await started();
    expect(env.canInterrupt()).toBe(true);
    env.interrupt();
    expect(new Uint8Array(worker.buffer!)[0]).toBe(2);

    host.FakeWorker.nextBuffer = undefined;
    const quiet = new PyEnv();
    await quiet.init();
    expect(quiet.canInterrupt()).toBe(false);
    expect(() => quiet.interrupt()).not.toThrow();
    quiet.close();
  });

  it('routes stdout, stderr, and worker console lines', async () => {
    const { env, worker } = await started();
    const stdout: string[] = [];
    const stderr: string[] = [];
    env.setStdoutCallback((text) => stdout.push(text));
    env.setStderrCallback((text) => stderr.push(text));
    worker.emit({ id: 'stream', type: 'stdout', payload: 'hi' });
    worker.emit({ id: 'stream', type: 'stderr', payload: 'bad' });
    expect(stdout).toEqual(['hi']);
    expect(stderr).toEqual(['bad']);

    env.setStdoutCallback(undefined);
    env.setStderrCallback(undefined);
    worker.emit({ id: 'stream', type: 'stdout', payload: 'log' });
    worker.emit({ id: 'stream', type: 'stderr', payload: 'err' });
    expect(host.logger.debug).toHaveBeenCalledWith('log');
    expect(host.logger.error).toHaveBeenCalledWith('err');

    const logToTerminal = vi.fn();
    vi.stubGlobal('window', { prompt: vi.fn(), logToTerminal });
    worker.emit({ id: 'console-log', type: 'console', payload: { level: 'warning', message: 'careful' } });
    expect(logToTerminal).toHaveBeenCalledWith('Python Worker', 'careful', 'warning');
  });

  it('answers input() from window.prompt', async () => {
    const { worker } = await started();
    const prompt = vi.fn()
      .mockReturnValueOnce('Ada')
      .mockReturnValueOnce(null)
      .mockReturnValueOnce('');
    vi.stubGlobal('window', { prompt });

    worker.emit({ id: 'in-1', type: 'inputRequest', payload: { prompt: 'Name?' } });
    worker.emit({ id: 'in-2', type: 'inputRequest', payload: { prompt: '' } });
    worker.emit({ id: 'in-3', type: 'inputRequest', payload: {} });

    expect(prompt).toHaveBeenNthCalledWith(1, 'Name?');
    expect(prompt).toHaveBeenNthCalledWith(2, 'Input:');
    expect(prompt).toHaveBeenNthCalledWith(3, 'Input:');
    expect(worker.posts.map((message) => message.payload)).toEqual([
      { value: 'Ada', cancelled: false },
      { value: null, cancelled: true },
      { value: '', cancelled: false },
    ]);
  });

  it('resolves successful replies and rejects failures', async () => {
    const { env, worker } = await started();
    const pending = env.execCode('1 + 1');
    const request = worker.posts.at(-1)!;
    expect(request).toMatchObject({ type: 'execCode', payload: { code: '1 + 1' } });
    worker.emit({ id: request.id, type: 'success', payload: { result: 2, console: [] } });
    await expect(pending).resolves.toEqual({ result: 2, console: [] });

    const failing = env.getVersion();
    worker.emit({
      id: worker.posts.at(-1)!.id,
      type: 'error',
      payload: { message: 'ValueError: boom' },
    });
    await expect(failing).rejects.toThrow('ValueError: boom');

    worker.emit({ id: 'nobody', type: 'success', payload: { result: 1 } });
  });

  it('skips an empty package list and forwards the rest of the runtime calls', async () => {
    const { env, worker } = await started({ params: { script: 'a.py' } });
    const ack = (start: () => Promise<unknown>, payload: unknown) => {
      const pending = start();
      worker.emit({ id: worker.posts.at(-1)!.id, type: 'success', payload });
      return pending;
    };

    await env.loadPackages([]);
    expect(worker.posts).toHaveLength(0);

    await ack(() => env.loadPackages(['numpy']), { loaded: true });
    expect(worker.posts.at(-1)).toMatchObject({ type: 'loadPackages', payload: { packages: ['numpy'] } });

    await ack(() => env.setGlobal('answer', 42), { set: true });
    expect(worker.posts.at(-1)).toMatchObject({ type: 'setGlobal', payload: { key: 'answer', value: 42 } });

    await ack(() => env.runFunction('add', { a: 1, b: 2 }), { result: 3 });
    expect(worker.posts.at(-1)).toMatchObject({ type: 'runFunction', payload: { name: 'add', args: { a: 1, b: 2 } } });

    await expect(ack(() => env.getVersion(), '3.13.2')).resolves.toBe('3.13.2');
  });

  it('parses a script path into a module and an optional entry point', async () => {
    const { env, worker } = await started({ params: { script: 'demo.py' } });
    const vars = { params: { script: 'demo.py' } };

    const plain = env.execScript('foo.py');
    expect(worker.posts.at(-1)?.payload).toEqual({ moduleName: 'foo', entryName: undefined, vars });
    worker.emit({ id: worker.posts.at(-1)!.id, type: 'success', payload: { result: null } });
    await plain;

    const entry = env.execScript('pkg.mod:run');
    expect(worker.posts.at(-1)?.payload).toEqual({ moduleName: 'pkg', entryName: 'run', vars });
    worker.emit({ id: worker.posts.at(-1)!.id, type: 'success', payload: { result: null } });
    await entry;

    const dotted = env.execScript('hello.py:main');
    expect(worker.posts.at(-1)?.payload).toEqual({ moduleName: 'hello', entryName: 'main', vars });
    worker.emit({ id: worker.posts.at(-1)!.id, type: 'success', payload: { result: null } });
    await dotted;
  });

  describe('workspace bridge', () => {
    async function reply(env: PyEnv, payload: Record<string, unknown>) {
      const worker = host.FakeWorker.latest!;
      worker.emit({ id: 'ws-1', type: 'workspaceRequest', payload });
      return (await workspaceReply(worker)).payload;
    }

    it('reports a missing workspace and a thrown lookup', async () => {
      const { env } = await started();
      host.state.workspace = null;
      await expect(reply(env, { op: 'read', path: 'a.txt' })).resolves.toMatchObject({
        success: false,
        error: 'No workspace selected',
      });

      host.state.workspace = {
        getResource: async () => { throw new Error('disk full'); },
      };
      await expect(reply(env, { op: 'exists', path: 'a.txt' })).resolves.toMatchObject({
        success: false,
        error: 'disk full',
      });
      await expect(reply(env, { op: 'nope', path: '' })).resolves.toMatchObject({
        success: false,
        error: 'Unknown workspace op: nope',
      });
    });

    it('reads, writes, lists, and classifies workspace files', async () => {
      const { env } = await started();
      const file = new host.File('abcdef');
      const dir = new host.Directory([{ getName: () => 'a.txt' }, { getName: () => 'b.txt' }]);
      host.state.workspace = {
        getResource: async (path, options) => {
          if (path === 'notes.txt') return file;
          if (path === 'dir') return dir;
          if (path === 'created.txt' && options?.create) return file;
          if (path === 'bad.txt' && options?.create) return dir;
          return null;
        },
      };

      await expect(reply(env, { op: 'read', path: 'notes.txt' })).resolves.toMatchObject({
        success: true,
        data: 'abcdef',
      });
      const binary = await reply(env, { op: 'read', path: 'notes.txt', binary: true });
      expect(new Uint8Array(binary.data)).toEqual(new TextEncoder().encode('abcdef'));
      await expect(reply(env, { op: 'read', path: 'missing.txt' })).resolves.toMatchObject({
        success: false,
        error: 'File not found: missing.txt',
      });
      await expect(reply(env, { op: 'read', path: 'dir' })).resolves.toMatchObject({
        success: false,
        error: 'File not found: dir',
      });

      await expect(reply(env, { op: 'write', path: 'created.txt', content: 'hello' })).resolves.toMatchObject({
        success: true,
      });
      expect(file.saved).toBe('hello');
      await reply(env, { op: 'write', path: 'created.txt', content: new Uint8Array([1, 2]) });
      expect(file.saved).toBeInstanceOf(Blob);
      await expect(reply(env, { op: 'write', path: 'bad.txt', content: 'x' })).resolves.toMatchObject({
        success: false,
        error: 'Failed to create file: bad.txt',
      });

      await expect(reply(env, { op: 'list', path: 'dir' })).resolves.toEqual({
        success: true,
        data: ['a.txt', 'b.txt'],
        error: undefined,
      });
      await expect(reply(env, { op: 'list', path: 'notes.txt' })).resolves.toMatchObject({
        success: false,
        error: 'Directory not found: notes.txt',
      });

      await expect(reply(env, { op: 'exists', path: 'notes.txt' })).resolves.toMatchObject({ success: true, data: true });
      await expect(reply(env, { op: 'exists', path: 'missing.txt' })).resolves.toMatchObject({ success: true, data: false });
      await expect(reply(env, { op: 'is_file', path: 'notes.txt' })).resolves.toMatchObject({ success: true, data: true });
      await expect(reply(env, { op: 'is_file', path: 'dir' })).resolves.toMatchObject({ success: true, data: false });
      await expect(reply(env, { op: 'is_dir', path: 'dir' })).resolves.toMatchObject({ success: true, data: true });
      await expect(reply(env, { op: 'is_dir', path: 'notes.txt' })).resolves.toMatchObject({ success: true, data: false });
    });

    it('reads a byte range locally or with an HTTP Range request', async () => {
      const { env } = await started();
      const local = new host.File('abcdef');
      const remote = new host.File('unused', 'https://cdn.example/a.bin');
      host.state.workspace = {
        getResource: async (path) => {
          if (path === 'local.txt') return local;
          if (path === 'remote.bin') return remote;
          return null;
        },
      };

      await expect(reply(env, { op: 'read_range', path: 'local.txt', offset: 1, length: 3, binary: false }))
        .resolves.toMatchObject({ success: true, data: 'bcd' });
      const sliced = await reply(env, { op: 'read_range', path: 'local.txt', offset: 1, length: 2 });
      expect(new Uint8Array(sliced.data)).toEqual(new TextEncoder().encode('bc'));
      await expect(reply(env, { op: 'read_range', path: 'local.txt', offset: -5, length: 0, binary: false }))
        .resolves.toMatchObject({ success: true, data: '' });
      const empty = await reply(env, { op: 'read_range', path: 'local.txt', length: 0 });
      expect(empty.data).toBeInstanceOf(ArrayBuffer);
      expect(empty.data.byteLength).toBe(0);

      vi.stubGlobal('fetch', vi.fn(async () => new Response(new Uint8Array([9, 8, 7, 6]), { status: 206 })));
      const ranged = await reply(env, { op: 'read_range', path: 'remote.bin', offset: 2, length: 4 });
      expect(fetch).toHaveBeenCalledWith('https://cdn.example/a.bin', { headers: { Range: 'bytes=2-5' } });
      expect(new Uint8Array(ranged.data)).toEqual(new Uint8Array([9, 8, 7, 6]));

      vi.stubGlobal('fetch', vi.fn(async () => new Response(null, { status: 416, statusText: 'Range Not Satisfiable' })));
      await expect(reply(env, { op: 'read_range', path: 'remote.bin', offset: 2, length: 4 })).resolves.toMatchObject({
        success: false,
        error: 'Range read failed: 416 Range Not Satisfiable',
      });
      await expect(reply(env, { op: 'read_range', path: 'missing.txt', offset: 0, length: 1 })).resolves.toMatchObject({
        success: false,
        error: 'File not found: missing.txt',
      });
    });

    it('returns a file URI and revokes blob URLs', async () => {
      const { env } = await started();
      const file = new host.File('hello', 'blob:notes');
      host.state.workspace = {
        getResource: async (path) => (path === 'notes.txt' ? file : null),
      };
      await expect(reply(env, { op: 'get_uri', path: 'notes.txt' })).resolves.toMatchObject({
        success: true,
        data: 'blob:notes',
      });
      await expect(reply(env, { op: 'get_uri', path: 'missing.txt' })).resolves.toMatchObject({
        success: false,
        error: 'File not found: missing.txt',
      });

      const revoke = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
      await expect(reply(env, { op: 'revoke_uri', uri: 'blob:notes' })).resolves.toMatchObject({ success: true });
      expect(revoke).toHaveBeenCalledWith('blob:notes');
      await expect(reply(env, { op: 'revoke_uri', uri: 12 })).resolves.toMatchObject({ success: true });
      expect(revoke).toHaveBeenCalledTimes(1);
      revoke.mockRestore();
    });
  });
});
