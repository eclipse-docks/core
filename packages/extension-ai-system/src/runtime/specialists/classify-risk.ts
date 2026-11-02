import type { ModelProvider, ProviderChatMessage } from '../models/types';

export type ToolRisk = 'safe' | 'critical';

export interface PendingToolRisk {
  id: string;
  name: string;
  arguments: string;
}

const CLASSIFY_SYSTEM = `You classify tool calls for user approval.
Mark risk "critical" if the call can change state: write/edit/delete files, connect or load a workspace, run shell/commands with side effects, install, deploy, publish, push, or otherwise mutate the environment.
Mark risk "safe" only for read-only inspection (list, read, search, describe, fetch).
When unsure, choose "critical".
Reply with ONLY a JSON array: [{"id":"<tool call id>","risk":"safe"|"critical"}]`;

/** Ask the model whether pending tool calls are safe or critical. Unknown → critical. */
export async function classifyToolRisks(input: {
  provider: ModelProvider;
  model: string;
  tools: PendingToolRisk[];
  signal?: AbortSignal;
}): Promise<Map<string, ToolRisk>> {
  const risks = new Map<string, ToolRisk>();
  if (!input.tools.length) return risks;

  for (const tool of input.tools) risks.set(tool.id, 'critical');

  const catalog = input.tools.map((t) => ({
    id: t.id,
    name: t.name,
    arguments: truncate(t.arguments, 800),
  }));

  const messages: ProviderChatMessage[] = [
    { role: 'system', content: CLASSIFY_SYSTEM },
    { role: 'user', content: JSON.stringify(catalog) },
  ];

  let text = '';
  for await (const chunk of input.provider.stream({
    model: input.model,
    messages,
    providerOptions: { reasoning_effort: 'none' },
    signal: input.signal,
  })) {
    if (chunk.type === 'error') return risks;
    if (chunk.type === 'text' && chunk.text) text += chunk.text;
  }

  for (const row of parseRiskRows(text)) {
    if (!risks.has(row.id)) continue;
    risks.set(row.id, row.risk === 'safe' ? 'safe' : 'critical');
  }
  return risks;
}

function truncate(value: string, max: number): string {
  return value.length <= max ? value : `${value.slice(0, max)}…`;
}

function parseRiskRows(text: string): Array<{ id: string; risk: string }> {
  const json = extractJsonArray(text);
  if (!json) return [];
  try {
    const parsed = JSON.parse(json) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((row) => {
        if (!row || typeof row !== 'object') return null;
        const id = String((row as { id?: unknown }).id ?? '');
        const risk = String((row as { risk?: unknown }).risk ?? '');
        if (!id) return null;
        return { id, risk };
      })
      .filter((row): row is { id: string; risk: string } => row != null);
  } catch {
    return [];
  }
}

function extractJsonArray(text: string): string | null {
  const trimmed = text.trim();
  if (trimmed.startsWith('[')) {
    const end = trimmed.lastIndexOf(']');
    return end >= 0 ? trimmed.slice(0, end + 1) : null;
  }
  const start = trimmed.indexOf('[');
  const end = trimmed.lastIndexOf(']');
  if (start >= 0 && end > start) return trimmed.slice(start, end + 1);
  return null;
}
