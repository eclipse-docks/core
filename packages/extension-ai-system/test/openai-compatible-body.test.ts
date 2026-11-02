import { beforeAll, describe, expect, it } from 'vitest';
import { loadModelsCatalog } from '../src/runtime/models/effort-support';
import { buildChatCompletionBody, toOpenAIMessages } from '../src/runtime/models/openai-compatible';

describe('buildChatCompletionBody', () => {
  beforeAll(async () => {
    await loadModelsCatalog();
  }, 30_000);

  it('forces reasoning_effort none when tools are present', () => {
    const body = buildChatCompletionBody({
      model: 'openai/gpt-5-mini',
      messages: [{ role: 'user', content: 'hi' }],
      tools: [
        {
          name: 'workspace_list',
          description: 'list',
          parameters: { type: 'object', properties: {} },
        },
      ],
      providerOptions: { reasoning_effort: 'medium' },
    });

    expect(body.model).toBe('gpt-5-mini');
    expect(body.tools).toHaveLength(1);
    expect(body.reasoning_effort).toBe('none');
    expect(body.stream_options).toEqual({ include_usage: true });
  });

  it('forces none even when providerOptions omit effort', () => {
    const body = buildChatCompletionBody({
      model: 'gpt-5-mini',
      messages: [{ role: 'user', content: 'hi' }],
      tools: [
        {
          name: 'workspace_list',
          description: 'list',
          parameters: { type: 'object', properties: {} },
        },
      ],
    });

    expect(body.reasoning_effort).toBe('none');
  });

  it('keeps non-none reasoning_effort when no tools', () => {
    const body = buildChatCompletionBody({
      model: 'gpt-5-mini',
      messages: [{ role: 'user', content: 'hi' }],
      providerOptions: { reasoning_effort: 'high' },
    });

    expect(body.reasoning_effort).toBe('high');
    expect(body.tools).toBeUndefined();
  });

  it('maps assistant toolCalls and tool results to OpenAI wire shape', () => {
    const mapped = toOpenAIMessages([
      { role: 'user', content: 'test' },
      {
        role: 'assistant',
        content: '',
        toolCalls: [{ id: 'call-1', name: 'ls', arguments: '{}' }],
      },
      { role: 'tool', toolCallId: 'call-1', name: 'ls', content: '{"ok":true}' },
    ]);

    expect(mapped[1]).toEqual({
      role: 'assistant',
      content: '',
      tool_calls: [
        {
          id: 'call-1',
          type: 'function',
          function: { name: 'ls', arguments: '{}' },
        },
      ],
    });
    expect(mapped[2]).toEqual({
      role: 'tool',
      tool_call_id: 'call-1',
      name: 'ls',
      content: '{"ok":true}',
    });
  });
});
