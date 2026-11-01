import type { ChatMessage, MessagePart, SpecialistRole } from '../types';
import type { ModelProvider, ProviderChatMessage, ResolvedModel, ToolDefinition } from '../models/types';
import type { ToolBroker } from '../tools/broker';
import { classifyToolRisks } from './classify-risk';

const MAX_TOOL_ITERATIONS = 8;

export interface SpecialistLoopInput {
  role: SpecialistRole;
  systemPrompt: string;
  history: ChatMessage[];
  resolved: ResolvedModel;
  provider: ModelProvider;
  broker: ToolBroker;
  sessionId: string;
  signal?: AbortSignal;
  onPart?: (part: MessagePart) => void;
}

export interface SpecialistLoopResult {
  message: ChatMessage;
  success: boolean;
}

function textFromParts(parts: MessagePart[]): string {
  return parts
    .filter((p): p is Extract<MessagePart, { type: 'text' }> => p.type === 'text')
    .map((p) => p.text)
    .join('\n');
}

function historyToProviderMessages(systemPrompt: string, history: ChatMessage[]): ProviderChatMessage[] {
  const messages: ProviderChatMessage[] = [{ role: 'system', content: systemPrompt }];
  for (const msg of history) {
    if (msg.role === 'user' || msg.role === 'system') {
      const text = textFromParts(msg.parts);
      if (text) messages.push({ role: msg.role === 'system' ? 'system' : 'user', content: text });
      continue;
    }

    const text = textFromParts(msg.parts);
    const tools = msg.parts.filter((p): p is Extract<MessagePart, { type: 'tool' }> => p.type === 'tool');
    if (tools.length) {
      messages.push({
        role: 'assistant',
        content: text,
        toolCalls: tools.map((t) => ({
          id: t.id,
          name: t.name,
          arguments: JSON.stringify(t.args ?? {}),
        })),
      });
      for (const tool of tools) {
        messages.push({
          role: 'tool',
          toolCallId: tool.id,
          name: tool.name,
          content: JSON.stringify(tool.result ?? {}),
        });
      }
      continue;
    }

    if (text) messages.push({ role: 'assistant', content: text });
  }
  return messages;
}

export async function runSpecialistLoop(input: SpecialistLoopInput): Promise<SpecialistLoopResult> {
  const parts: MessagePart[] = [];
  const emit = (part: MessagePart) => {
    parts.push(part);
    input.onPart?.(part);
  };

  const tools: ToolDefinition[] = input.broker.listDefinitions(input.role);
  const messages = historyToProviderMessages(input.systemPrompt, input.history);
  let success = true;

  for (let iter = 0; iter < MAX_TOOL_ITERATIONS; iter++) {
    let pendingTools: Array<{ id: string; name: string; arguments: string }> = [];
    let assistantText = '';

    for await (const chunk of input.provider.stream({
      model: input.resolved.model,
      messages,
      tools: tools.length ? tools : undefined,
      providerOptions: input.resolved.providerOptions,
      signal: input.signal,
    })) {
      if (chunk.type === 'error') {
        emit({ type: 'text', text: `Error: ${chunk.error}` });
        success = false;
        break;
      }
      if (chunk.type === 'reasoning' && chunk.text) {
        emit({ type: 'reasoning', text: chunk.text, status: 'streaming' });
      }
      if (chunk.type === 'text' && chunk.text) {
        assistantText += chunk.text;
        emit({ type: 'text', text: chunk.text });
      }
      if (chunk.type === 'tool_call_delta' && chunk.toolCall) {
        const existing = pendingTools.find((t) => t.id === chunk.toolCall!.id);
        if (existing) {
          existing.name = chunk.toolCall.name || existing.name;
          existing.arguments = chunk.toolCall.arguments;
        } else {
          pendingTools.push({ ...chunk.toolCall });
        }
      }
    }

    if (!pendingTools.length) {
      if (assistantText && !parts.some((p) => p.type === 'text')) emit({ type: 'text', text: assistantText });
      break;
    }

    messages.push({
      role: 'assistant',
      content: assistantText,
      toolCalls: pendingTools.map((t) => ({
        id: t.id,
        name: t.name,
        arguments: t.arguments || '{}',
      })),
    });

    const risks =
      input.broker.getApprovalMode() === 'auto_safe'
        ? await classifyToolRisks({
            provider: input.provider,
            model: input.resolved.model,
            tools: pendingTools.map((t) => ({
              id: t.id,
              name: t.name,
              arguments: t.arguments || '{}',
            })),
            signal: input.signal,
          })
        : null;

    for (const tool of pendingTools) {
      let args: Record<string, unknown> = {};
      try {
        args = tool.arguments ? JSON.parse(tool.arguments) : {};
      } catch {
        args = { raw: tool.arguments };
      }
      const toolPart: MessagePart = {
        type: 'tool',
        id: tool.id,
        name: tool.name,
        args,
        status: 'running',
      };
      emit(toolPart);
      const started = Date.now();
      const result = await input.broker.execute(
        { id: tool.id, name: tool.name, arguments: args },
        input.sessionId,
        input.role,
        { risk: risks?.get(tool.id) },
      );
      emit({
        type: 'tool',
        id: tool.id,
        name: tool.name,
        args,
        result: result.ok ? result.output : result.error,
        status: result.ok ? 'done' : 'error',
        durationMs: Date.now() - started,
      });
      messages.push({
        role: 'tool',
        toolCallId: tool.id,
        name: tool.name,
        content: JSON.stringify(result.ok ? result.output : { error: result.error }),
      });
      if (!result.ok) success = false;
    }
  }

  const message: ChatMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    role: 'assistant',
    parts: coalesceParts(parts),
    createdAt: Date.now(),
    routedModel: input.resolved.model,
    effort: input.resolved.effort,
  };

  return { message, success };
}

function coalesceParts(parts: MessagePart[]): MessagePart[] {
  const out: MessagePart[] = [];
  for (const part of parts) {
    const last = out[out.length - 1];
    if (part.type === 'text' && last?.type === 'text') {
      last.text += part.text;
      continue;
    }
    if (part.type === 'reasoning' && last?.type === 'reasoning') {
      last.text += part.text;
      last.status = part.status;
      continue;
    }
    if (part.type === 'tool' && last?.type === 'tool' && last.id === part.id) {
      out[out.length - 1] = part;
      continue;
    }
    out.push(part);
  }
  for (const part of out) {
    if (part.type === 'reasoning') part.status = 'done';
  }
  return out;
}
