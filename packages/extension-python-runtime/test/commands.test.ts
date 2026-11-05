import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

const host = vi.hoisted(() => {
  const registerAll = vi.fn();
  const toastError = vi.fn();
  const created: Array<{
    init: ReturnType<typeof vi.fn>;
    execCode: ReturnType<typeof vi.fn>;
  }> = [];

  class PyEnv {
    init = vi.fn(async () => undefined);
    execCode = vi.fn(async () => ({ result: 2, console: ['2'] }));
    constructor() {
      created.push(this);
    }
  }

  return { registerAll, toastError, created, PyEnv };
});

vi.mock('@eclipse-docks/core', () => ({
  registerAll: host.registerAll,
  toastError: host.toastError,
}));

vi.mock('../src/pyservice', () => ({
  PyEnv: host.PyEnv,
}));

describe('python.runCode', () => {
  beforeAll(async () => {
    await import('../src/commands');
  });

  beforeEach(() => {
    host.toastError.mockClear();
    host.created.length = 0;
  });

  function registration() {
    expect(host.registerAll).toHaveBeenCalledTimes(1);
    return host.registerAll.mock.calls[0][0] as {
      command: { id: string; keyBinding: string; parameters: Array<{ name: string; required: boolean }> };
      handler: { execute: (context: { params?: Record<string, unknown> }) => Promise<unknown> };
    };
  }

  it('registers the command with a required code parameter', () => {
    const { command } = registration();
    expect(command.id).toBe('python.runCode');
    expect(command.keyBinding).toBe('CTRL+R');
    expect(command.parameters).toEqual([
      expect.objectContaining({ name: 'code', required: true }),
    ]);
  });

  it('refuses to start a runtime when no code was provided', async () => {
    const result = await registration().handler.execute({ params: {} });
    expect(result).toBeUndefined();
    expect(host.toastError).toHaveBeenCalledWith('No Python code provided.');
    expect(host.created).toHaveLength(0);
  });

  it('initializes a runtime with the command params and returns the execution', async () => {
    const params = { code: '1 + 1', extra: true };
    const result = await registration().handler.execute({ params });
    expect(host.created).toHaveLength(1);
    expect(host.created[0].init).toHaveBeenCalledWith({ params });
    expect(host.created[0].execCode).toHaveBeenCalledWith('1 + 1');
    expect(result).toEqual({ result: 2, console: ['2'] });
    expect(host.toastError).not.toHaveBeenCalled();
  });
});
