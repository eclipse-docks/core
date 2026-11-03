import { describe, expect, it } from 'vitest';
import { IMAGE_PRESENT_KEY } from '../src/runtime/attachments/attachments';
import type { ProviderChatMessage, ProviderContentPart } from '../src/runtime/models/types';

/**
 * Mirrors the specialist-loop ordering rule: all tool results for a batch must
 * precede any vision user message, otherwise OpenAI rejects the request.
 */
function appendToolBatch(
  messages: ProviderChatMessage[],
  tools: Array<{ id: string; name: string; output: Record<string, unknown> }>,
): void {
  const pendingImages: Array<{ id: string; name: string; dataUrl: string }> = [];
  for (const tool of tools) {
    const presentImage =
      tool.output[IMAGE_PRESENT_KEY] === true && typeof tool.output.dataUrl === 'string';
    messages.push({
      role: 'tool',
      toolCallId: tool.id,
      name: tool.name,
      content: JSON.stringify(tool.output),
    });
    if (presentImage) {
      pendingImages.push({
        id: String(tool.output.id ?? ''),
        name: String(tool.output.name ?? 'image'),
        dataUrl: String(tool.output.dataUrl),
      });
    }
  }
  if (!pendingImages.length) return;
  messages.push({
    role: 'user',
    content: [
      { type: 'text', text: 'images' },
      ...pendingImages.map((img) => ({
        type: 'image_url' as const,
        image_url: { url: img.dataUrl },
      })),
    ],
  });
}

describe('tool + vision message ordering', () => {
  it('places vision user content after every tool result in the batch', () => {
    const messages: ProviderChatMessage[] = [
      {
        role: 'assistant',
        content: '',
        toolCalls: [
          {
            id: 'call_a',
            name: 'workspace_read',
            arguments: '{"path":"in-memory://sess-1/att-1-dash.png"}',
          },
          { id: 'call_b', name: 'canvas_help', arguments: '{}' },
        ],
      },
    ];

    appendToolBatch(messages, [
      {
        id: 'call_a',
        name: 'workspace_read',
        output: {
          id: 'att-1',
          name: 'dash.png',
          [IMAGE_PRESENT_KEY]: true,
          dataUrl: 'data:image/png;base64,aaa',
        },
      },
      {
        id: 'call_b',
        name: 'canvas_help',
        output: { ok: true },
      },
    ]);

    expect(messages.map((m) => m.role)).toEqual(['assistant', 'tool', 'tool', 'user']);
    expect(messages[1]?.toolCallId).toBe('call_a');
    expect(messages[2]?.toolCallId).toBe('call_b');
    const content = messages[3]?.content as ProviderContentPart[];
    expect(Array.isArray(content)).toBe(true);
    expect(content.some((p) => p.type === 'image_url')).toBe(true);
  });
});
