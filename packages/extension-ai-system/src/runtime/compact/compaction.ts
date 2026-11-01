import type { ChatMessage, MessagePart } from '../types';
import type { ModelProvider, ProviderChatMessage } from '../models/types';

export interface CompactionResult {
  /** Summary covering dropped turns (extractive or caller-replaced). */
  summary: string;
  kept: ChatMessage[];
  dropped: ChatMessage[];
  didCompact: boolean;
}

const COMPACT_SYSTEM = `You compress older chat turns into a durable summary for future assistant turns.
Preserve: user goals, decisions, constraints, important file/paths, tool outcomes that still matter, and open questions.
Omit chit-chat, repeated content, and raw tool dumps.
Reply with concise markdown only (short sections or bullets). No preamble.`;

/** Format one message for extractive / LLM compaction input. */
export function formatMessageForCompaction(msg: ChatMessage, maxChars = 280): string {
  const bits: string[] = [];
  for (const part of msg.parts) {
    const piece = formatPart(part);
    if (piece) bits.push(piece);
  }
  const body = bits.join(' · ').replace(/\s+/g, ' ').trim();
  if (!body) return '';
  const clipped = body.length <= maxChars ? body : `${body.slice(0, maxChars)}…`;
  return `${msg.role}: ${clipped}`;
}

function formatPart(part: MessagePart): string {
  if (part.type === 'text') return part.text;
  if (part.type === 'reasoning') return `(thinking) ${part.text}`;
  if (part.type === 'tool') {
    const status = part.status === 'error' ? 'error' : part.status === 'done' ? 'ok' : part.status;
    const result =
      part.result === undefined
        ? ''
        : ` → ${JSON.stringify(part.result).slice(0, 120)}`;
    return `tool ${part.name} [${status}]${result}`;
  }
  if (part.type === 'step') return `step ${part.title}`;
  return '';
}

/** Anchored summary compaction: keep recent messages, summarize the rest. */
export function compactHistory(
  history: ChatMessage[],
  options: { keepCount?: number; previousSummary?: string } = {},
): CompactionResult {
  const keepCount = options.keepCount ?? 12;
  if (history.length <= keepCount) {
    return {
      summary: options.previousSummary ?? '',
      kept: [...history],
      dropped: [],
      didCompact: false,
    };
  }

  const kept = history.slice(-keepCount);
  const dropped = history.slice(0, -keepCount);
  return {
    summary: buildExtractiveSummary(dropped, options.previousSummary),
    kept,
    dropped,
    didCompact: true,
  };
}

export function buildExtractiveSummary(
  dropped: ChatMessage[],
  previousSummary?: string,
): string {
  const lines: string[] = [];
  if (previousSummary?.trim()) lines.push(`Prior: ${previousSummary.trim()}`);
  for (const msg of dropped) {
    const line = formatMessageForCompaction(msg);
    if (line) lines.push(line);
  }
  return [
    '## Objective',
    'Continue prior work from compacted history.',
    '## Notes',
    ...lines.slice(-24),
  ].join('\n');
}

/** Ask the model to summarize dropped turns; returns null on empty/failure. */
export async function summarizeDroppedHistory(input: {
  provider: ModelProvider;
  model: string;
  dropped: ChatMessage[];
  previousSummary?: string;
  providerOptions?: Record<string, unknown>;
  signal?: AbortSignal;
}): Promise<string | null> {
  if (!input.dropped.length) return null;

  const transcript = input.dropped
    .map((msg) => formatMessageForCompaction(msg, 600))
    .filter(Boolean)
    .join('\n');
  if (!transcript.trim()) return null;

  const userParts = [
    input.previousSummary?.trim() ? `## Existing summary\n${input.previousSummary.trim()}` : '',
    `## Older turns to fold in\n${transcript}`,
  ].filter(Boolean);

  const messages: ProviderChatMessage[] = [
    { role: 'system', content: COMPACT_SYSTEM },
    { role: 'user', content: userParts.join('\n\n') },
  ];

  let text = '';
  try {
    for await (const chunk of input.provider.stream({
      model: input.model,
      messages,
      providerOptions: input.providerOptions ?? { reasoning_effort: 'none' },
      signal: input.signal,
    })) {
      if (chunk.type === 'error') return null;
      if (chunk.type === 'text' && chunk.text) text += chunk.text;
    }
  } catch {
    return null;
  }

  const summary = text.trim();
  return summary || null;
}

/** System message body injected ahead of live history when a summary exists. */
export function compactionContextMessage(summary: string): string {
  return `## Compacted prior context\nThe following summarizes earlier turns that were removed from the live transcript. Treat it as authoritative background.\n\n${summary.trim()}`;
}
