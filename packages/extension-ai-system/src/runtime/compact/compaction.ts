import type { ChatMessage } from '../types';

export interface CompactionResult {
  summary: string;
  kept: ChatMessage[];
}

/** Anchored summary compaction: keep recent messages, summarize the rest. */
export function compactHistory(
  history: ChatMessage[],
  options: { keepCount?: number; previousSummary?: string } = {},
): CompactionResult {
  const keepCount = options.keepCount ?? 12;
  if (history.length <= keepCount) {
    return { summary: options.previousSummary ?? '', kept: [...history] };
  }

  const kept = history.slice(-keepCount);
  const older = history.slice(0, -keepCount);
  const lines: string[] = [];
  if (options.previousSummary) lines.push(`Prior: ${options.previousSummary}`);
  for (const msg of older) {
    const text = msg.parts
      .filter((p) => p.type === 'text')
      .map((p) => (p.type === 'text' ? p.text : ''))
      .join(' ')
      .slice(0, 200);
    if (text) lines.push(`${msg.role}: ${text}`);
  }

  return {
    summary: [
      '## Objective',
      'Continue prior work from compacted history.',
      '## Notes',
      ...lines.slice(-20),
    ].join('\n'),
    kept,
  };
}
