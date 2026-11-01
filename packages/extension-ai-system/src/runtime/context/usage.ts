import type { ChatMessage, CognitiveSession, MessagePart } from '../types';
import { getModelContextLimit } from '../models/effort-support';

export type ContextUsageLevel = 'ok' | 'warn' | 'critical';

export interface ContextUsageBucket {
  id: 'summary' | 'messages' | 'tools' | 'reasoning';
  label: string;
  tokens: number;
  /** Item count for this bucket (messages, tool parts, etc.). */
  count: number;
}

export interface ContextUsage {
  used: number;
  limit: number;
  percent: number;
  remaining: number;
  level: ContextUsageLevel;
  buckets: ContextUsageBucket[];
  modelRef: string;
}

/** Rough token estimate (~4 chars / token) with a small structural overhead. */
export function estimateTokens(text: string): number {
  if (!text) return 0;
  return Math.max(1, Math.ceil(text.length / 4));
}

export function estimatePartTokens(part: MessagePart): number {
  if (part.type === 'text' || part.type === 'reasoning') return estimateTokens(part.text);
  if (part.type === 'file') {
    // History only stores a reference; payloads stay in the session until attachment_read.
    return estimateTokens(part.name) + estimateTokens(part.id) + 8;
  }
  if (part.type === 'tool') {
    return (
      estimateTokens(part.name) +
      estimateTokens(JSON.stringify(part.args ?? {})) +
      estimateTokens(JSON.stringify(part.result ?? {})) +
      8
    );
  }
  if (part.type === 'step') return estimateTokens(part.title) + 4;
  return 0;
}

export function estimateMessageTokens(message: ChatMessage): {
  messages: number;
  tools: number;
  reasoning: number;
  toolCount: number;
  reasoningCount: number;
} {
  let messages = 4;
  let tools = 0;
  let reasoning = 0;
  let toolCount = 0;
  let reasoningCount = 0;
  for (const part of message.parts) {
    if (part.type === 'tool') {
      tools += estimatePartTokens(part);
      toolCount += 1;
    } else if (part.type === 'reasoning') {
      reasoning += estimatePartTokens(part);
      reasoningCount += 1;
    } else {
      messages += estimatePartTokens(part);
    }
  }
  return { messages, tools, reasoning, toolCount, reasoningCount };
}

export function contextUsageLevel(percent: number): ContextUsageLevel {
  if (percent > 85) return 'critical';
  if (percent > 60) return 'warn';
  return 'ok';
}

/** Estimate how much of the model context window the session currently occupies. */
export function estimateSessionContextUsage(
  session: CognitiveSession | undefined,
  modelRef: string,
): ContextUsage {
  const limit = getModelContextLimit(modelRef);
  const buckets: ContextUsageBucket[] = [
    { id: 'summary', label: 'Summary', tokens: 0, count: 0 },
    { id: 'messages', label: 'Chat text', tokens: 0, count: 0 },
    { id: 'tools', label: 'Tools', tokens: 0, count: 0 },
    { id: 'reasoning', label: 'Thinking', tokens: 0, count: 0 },
  ];

  if (session?.compactionSummary) {
    buckets[0]!.tokens = estimateTokens(session.compactionSummary);
    buckets[0]!.count = 1;
  }
  for (const message of session?.history ?? []) {
    const parts = estimateMessageTokens(message);
    buckets[1]!.tokens += parts.messages;
    buckets[1]!.count += 1;
    buckets[2]!.tokens += parts.tools;
    buckets[2]!.count += parts.toolCount;
    buckets[3]!.tokens += parts.reasoning;
    buckets[3]!.count += parts.reasoningCount;
  }

  const used = buckets.reduce((sum, b) => sum + b.tokens, 0);
  const percent = limit > 0 ? Math.min(100, (used / limit) * 100) : 0;
  return {
    used,
    limit,
    percent,
    remaining: Math.max(0, limit - used),
    level: contextUsageLevel(percent),
    buckets: buckets.filter((b) => b.tokens > 0),
    modelRef,
  };
}

export function formatTokenCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 10_000) return `${Math.round(n / 1000)}k`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(Math.round(n));
}

export function formatContextPercent(percent: number): string {
  if (percent <= 0) return '0%';
  if (percent < 1) return '<1%';
  if (percent < 10) return `${percent.toFixed(1)}%`;
  return `${Math.round(percent)}%`;
}

export function formatBucketDetail(bucket: ContextUsageBucket): string {
  const tokens = `${formatTokenCount(bucket.tokens)} tok`;
  if (bucket.id === 'summary') return tokens;
  if (bucket.id === 'messages') {
    const n = bucket.count;
    return `${n} msg${n === 1 ? '' : 's'} · ${tokens}`;
  }
  if (bucket.id === 'tools') {
    const n = bucket.count;
    return `${n} call${n === 1 ? '' : 's'} · ${tokens}`;
  }
  const n = bucket.count;
  return `${n} · ${tokens}`;
}
