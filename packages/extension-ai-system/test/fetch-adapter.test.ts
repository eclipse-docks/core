import { afterEach, describe, expect, it, vi } from 'vitest';
import { ToolBroker } from '../src/runtime/tools/broker';
import { registerFetchTools } from '../src/runtime/tools/fetch-adapter';

describe('registerFetchTools', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('rejects non-http urls', async () => {
    const broker = new ToolBroker();
    registerFetchTools(broker);
    const result = await broker.execute(
      { id: '1', name: 'fetch', arguments: { url: 'file:///etc/passwd' } },
      's',
      'build',
      { risk: 'safe' },
    );
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/http/i);
  });

  it('returns truncated text body for markdown responses', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        const body = '# Hello\n\n' + 'x'.repeat(200);
        return new Response(body, {
          status: 200,
          headers: { 'content-type': 'text/markdown; charset=utf-8' },
        });
      }),
    );

    const broker = new ToolBroker();
    registerFetchTools(broker);
    const result = await broker.execute(
      { id: '1', name: 'fetch', arguments: { url: 'https://example.com/doc.md', max_chars: 20 } },
      's',
      'build',
      { risk: 'safe' },
    );
    expect(result.ok).toBe(true);
    const output = result.output as { body: string; truncated: boolean; status: number };
    expect(output.status).toBe(200);
    expect(output.truncated).toBe(true);
    expect(output.body.length).toBe(20);
    expect(output.body.startsWith('# Hello')).toBe(true);
  });
});
