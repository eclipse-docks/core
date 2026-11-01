import { describe, expect, it } from 'vitest';
import {
  compactHistory,
  compactionContextMessage,
  formatMessageForCompaction,
  summarizeDroppedHistory,
} from '../src/runtime/compact/compaction';
import { historyToProviderMessages } from '../src/runtime/specialists/loop';
import type { ChatMessage } from '../src/runtime/types';
import type { ModelProvider, StreamChunk } from '../src/runtime/models/types';

function msg(
  role: ChatMessage['role'],
  text: string,
  extra: Partial<ChatMessage> = {},
): ChatMessage {
  return {
    id: `m-${text.slice(0, 8)}-${role}`,
    role,
    parts: [{ type: 'text', text }],
    createdAt: 1,
    ...extra,
  };
}

describe('compactHistory', () => {
  it('no-ops when history fits keepCount', () => {
    const history = [msg('user', 'a'), msg('assistant', 'b')];
    const result = compactHistory(history, { keepCount: 12, previousSummary: 'Prior notes' });
    expect(result.didCompact).toBe(false);
    expect(result.kept).toHaveLength(2);
    expect(result.dropped).toHaveLength(0);
    expect(result.summary).toBe('Prior notes');
  });

  it('keeps the tail and builds an extractive summary of dropped turns', () => {
    const history = Array.from({ length: 16 }, (_, i) =>
      msg(i % 2 === 0 ? 'user' : 'assistant', `turn-${i}`),
    );
    const result = compactHistory(history, { keepCount: 4, previousSummary: 'Old summary' });
    expect(result.didCompact).toBe(true);
    expect(result.kept).toHaveLength(4);
    expect(result.dropped).toHaveLength(12);
    expect(result.kept[0]?.parts[0]).toMatchObject({ type: 'text', text: 'turn-12' });
    expect(result.summary).toContain('Old summary');
    expect(result.summary).toContain('turn-0');
    expect(result.summary).toContain('## Notes');
  });

  it('includes tool outcomes in extractive lines', () => {
    const withTool: ChatMessage = {
      id: 't1',
      role: 'assistant',
      createdAt: 1,
      parts: [
        {
          type: 'tool',
          id: 'c1',
          name: 'workspace_read_file',
          args: { path: 'a.ts' },
          result: { ok: true },
          status: 'done',
        },
      ],
    };
    expect(formatMessageForCompaction(withTool)).toContain('workspace_read_file');
    expect(formatMessageForCompaction(withTool)).toContain('[ok]');
  });
});

describe('historyToProviderMessages', () => {
  it('injects compaction summary as a system message before live history', () => {
    const messages = historyToProviderMessages(
      'You are a specialist.',
      [msg('user', 'continue')],
      '## Notes\nuser: earlier goal',
    );
    expect(messages[0]).toEqual({ role: 'system', content: 'You are a specialist.' });
    expect(messages[1]?.role).toBe('system');
    expect(messages[1]?.content).toContain(compactionContextMessage('## Notes\nuser: earlier goal'));
    expect(messages[2]).toEqual({ role: 'user', content: 'continue' });
  });

  it('skips empty summaries', () => {
    const messages = historyToProviderMessages('sys', [msg('user', 'hi')], '   ');
    expect(messages).toHaveLength(2);
    expect(messages[0]?.content).toBe('sys');
    expect(messages[1]?.content).toBe('hi');
  });
});

describe('summarizeDroppedHistory', () => {
  it('returns model text when the provider streams a summary', async () => {
    const provider: ModelProvider = {
      id: 'test',
      listModels: () => [],
      async *stream(): AsyncIterable<StreamChunk> {
        yield { type: 'text', text: '## Goal\nShip compaction.' };
        yield { type: 'done' };
      },
    };
    const summary = await summarizeDroppedHistory({
      provider,
      model: 'test/model',
      dropped: [msg('user', 'please compact')],
      previousSummary: 'earlier',
    });
    expect(summary).toBe('## Goal\nShip compaction.');
  });

  it('returns null when the provider errors', async () => {
    const provider: ModelProvider = {
      id: 'test',
      listModels: () => [],
      async *stream(): AsyncIterable<StreamChunk> {
        yield { type: 'error', error: 'boom' };
      },
    };
    const summary = await summarizeDroppedHistory({
      provider,
      model: 'test/model',
      dropped: [msg('user', 'x')],
    });
    expect(summary).toBeNull();
  });
});
