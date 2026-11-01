import { describe, expect, it } from 'vitest';
import {
  contextUsageLevel,
  estimateSessionContextUsage,
  estimateTokens,
  formatBucketDetail,
  formatContextPercent,
} from '../src/runtime/context/usage';
import type { CognitiveSession } from '../src/runtime/types';
import { emptyBuffers } from '../src/runtime/core/tick';

describe('context usage', () => {
  it('estimates tokens from text length', () => {
    expect(estimateTokens('abcd')).toBe(1);
    expect(estimateTokens('a'.repeat(40))).toBe(10);
  });

  it('levels by percent thresholds', () => {
    expect(contextUsageLevel(0)).toBe('ok');
    expect(contextUsageLevel(60)).toBe('ok');
    expect(contextUsageLevel(60.1)).toBe('warn');
    expect(contextUsageLevel(85)).toBe('warn');
    expect(contextUsageLevel(85.1)).toBe('critical');
  });

  it('formats tiny percents and bucket details', () => {
    expect(formatContextPercent(0.01)).toBe('<1%');
    expect(
      formatBucketDetail({ id: 'messages', label: 'Chat text', tokens: 41, count: 2 }),
    ).toBe('2 msgs · 41 tok');
    expect(
      formatBucketDetail({ id: 'tools', label: 'Tools', tokens: 54, count: 1 }),
    ).toBe('1 call · 54 tok');
  });

  it('breaks session usage into buckets with counts', () => {
    const session: CognitiveSession = {
      id: 's1',
      title: 'Chat',
      status: 'idle',
      history: [
        {
          id: 'm1',
          role: 'user',
          parts: [{ type: 'text', text: 'hello world' }],
          createdAt: 1,
        },
        {
          id: 'm2',
          role: 'assistant',
          parts: [
            { type: 'reasoning', text: 'think', status: 'done' },
            {
              type: 'tool',
              id: 't1',
              name: 'workspace_list',
              args: { path: '' },
              result: [],
              status: 'done',
            },
            { type: 'text', text: 'done' },
          ],
          createdAt: 2,
        },
      ],
      attachments: [],
      buffers: emptyBuffers(),
      specialistMode: 'build',
      createdAt: 1,
      updatedAt: 2,
      compactionSummary: 'Prior notes',
    };

    const usage = estimateSessionContextUsage(session, 'openai/gpt-4o');
    expect(usage.limit).toBeGreaterThan(0);
    expect(usage.used).toBeGreaterThan(0);
    expect(usage.buckets.find((b) => b.id === 'messages')?.count).toBe(2);
    expect(usage.buckets.find((b) => b.id === 'tools')?.count).toBe(1);
    expect(usage.buckets.find((b) => b.id === 'reasoning')?.count).toBe(1);
  });
});
