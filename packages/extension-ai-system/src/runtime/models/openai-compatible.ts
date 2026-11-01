import { detectEffortCapability } from './effort-support';
import type { ModelProvider, ProviderChatMessage, StreamChunk, StreamParams } from './types';

function wireContent(content: ProviderChatMessage['content']): unknown {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) return content;
  return content ?? '';
}

/** Map internal messages to OpenAI chat/completions wire shape. */
export function toOpenAIMessages(messages: ProviderChatMessage[]): Record<string, unknown>[] {
  return messages.map((m) => {
    if (m.role === 'tool') {
      return {
        role: 'tool',
        tool_call_id: m.toolCallId,
        content: typeof m.content === 'string' ? m.content || '' : '',
        ...(m.name ? { name: m.name } : {}),
      };
    }
    if (m.role === 'assistant' && m.toolCalls?.length) {
      return {
        role: 'assistant',
        // Some providers reject null here — always send a string.
        content: typeof m.content === 'string' ? m.content : '',
        tool_calls: m.toolCalls.map((tc) => ({
          id: tc.id,
          type: 'function',
          function: { name: tc.name, arguments: tc.arguments || '{}' },
        })),
      };
    }
    return { role: m.role, content: wireContent(m.content) };
  });
}

export interface OpenAICompatibleConfig {
  id: string;
  baseUrl: string;
  apiKey?: string;
  defaultModels?: Array<{ id: string; name: string }>;
}

export interface RemoteModelInfo {
  id: string;
  name: string;
}

/** GET `{baseUrl}/models` — baseUrl should already include `/v1` when required. */
export async function fetchOpenAICompatibleModels(
  baseUrl: string,
  apiKey?: string,
  signal?: AbortSignal,
): Promise<RemoteModelInfo[]> {
  const root = baseUrl.trim().replace(/\/$/, '');
  if (!root) return [];

  const headers: Record<string, string> = { Accept: 'application/json' };
  if (apiKey?.trim()) headers.Authorization = `Bearer ${apiKey.trim()}`;

  const response = await fetch(`${root}/models`, { method: 'GET', headers, signal });
  if (!response.ok) {
    throw new Error(`Failed to list models (HTTP ${response.status})`);
  }

  const data = (await response.json()) as { data?: Array<{ id?: string; name?: string }> };
  const rows = Array.isArray(data.data) ? data.data : [];
  return rows
    .map((m) => {
      const id = (m.id ?? '').trim();
      if (!id) return null;
      return { id, name: (m.name ?? id).trim() || id };
    })
    .filter((m): m is RemoteModelInfo => m != null)
    .sort((a, b) => a.id.localeCompare(b.id));
}

/**
 * Build a chat/completions request body.
 *
 * Reasoning models default to a non-none effort when the field is omitted.
 * With function tools, chat/completions requires an explicit
 * `reasoning_effort: "none"` — omitting still 400s.
 */
export function buildChatCompletionBody(params: StreamParams): Record<string, unknown> {
  const model = params.model.includes('/') ? params.model.split('/').slice(1).join('/') : params.model;
  const { reasoning_effort: _a, reasoningEffort: _b, reasoning: _c, ...safeOptions } =
    (params.providerOptions ?? {}) as Record<string, unknown>;

  const body: Record<string, unknown> = {
    model,
    messages: toOpenAIMessages(params.messages),
    stream: true,
    ...safeOptions,
  };

  const requestedEffort =
    params.providerOptions?.reasoning_effort ?? params.providerOptions?.reasoningEffort;
  const reasoningModel =
    detectEffortCapability(params.model).supported || requestedEffort != null;

  if (params.tools?.length) {
    body.tools = params.tools.map((t) => ({
      type: 'function',
      function: { name: t.name, description: t.description, parameters: t.parameters },
    }));
    if (reasoningModel) {
      body.reasoning_effort = 'none';
    }
  } else if (requestedEffort != null && requestedEffort !== 'none') {
    body.reasoning_effort = requestedEffort;
  }

  return body;
}

/** Minimal OpenAI-compatible streaming provider (chat/completions SSE). */
export class OpenAICompatibleProvider implements ModelProvider {
  constructor(private readonly config: OpenAICompatibleConfig) {}

  get id(): string {
    return this.config.id;
  }

  listModels(): Array<{ id: string; name: string }> {
    return this.config.defaultModels ?? [{ id: 'default', name: 'Default' }];
  }

  async fetchRemoteModels(signal?: AbortSignal): Promise<RemoteModelInfo[]> {
    return fetchOpenAICompatibleModels(this.config.baseUrl, this.config.apiKey, signal);
  }

  async *stream(params: StreamParams): AsyncIterable<StreamChunk> {
    const url = `${this.config.baseUrl.replace(/\/$/, '')}/chat/completions`;
    const body = buildChatCompletionBody(params);

    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (this.config.apiKey) headers.Authorization = `Bearer ${this.config.apiKey}`;

    let response: Response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal: params.signal,
      });
    } catch (err) {
      yield { type: 'error', error: err instanceof Error ? err.message : String(err) };
      return;
    }

    if (!response.ok || !response.body) {
      yield { type: 'error', error: `HTTP ${response.status}: ${await response.text()}` };
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    const toolAcc = new Map<number, { id: string; name: string; arguments: string }>();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data:')) continue;
        const data = trimmed.slice(5).trim();
        if (data === '[DONE]') {
          yield { type: 'done' };
          return;
        }
        try {
          const json = JSON.parse(data);
          const delta = json.choices?.[0]?.delta;
          if (!delta) continue;
          if (delta.content) yield { type: 'text', text: delta.content };
          if (delta.reasoning_content || delta.reasoning) {
            yield { type: 'reasoning', text: String(delta.reasoning_content ?? delta.reasoning) };
          }
          if (Array.isArray(delta.tool_calls)) {
            for (const tc of delta.tool_calls) {
              const idx = tc.index ?? 0;
              const cur = toolAcc.get(idx) ?? { id: tc.id ?? `call-${idx}`, name: '', arguments: '' };
              if (tc.id) cur.id = tc.id;
              if (tc.function?.name) cur.name += tc.function.name;
              if (tc.function?.arguments) cur.arguments += tc.function.arguments;
              toolAcc.set(idx, cur);
              yield { type: 'tool_call_delta', toolCall: { ...cur } };
            }
          }
        } catch {
          // ignore partial JSON
        }
      }
    }
    yield { type: 'done' };
  }
}
