import { createLogger } from '@eclipse-docks/core';
import {
  cognitiveRuntime,
  type ModelProvider,
  type ProviderChatMessage,
  type StreamChunk,
  type StreamParams,
} from '@eclipse-docks/extension-ai-system/api';
import { ChatCompletionMessageParam, MLCEngine } from '@mlc-ai/web-llm';

const logger = createLogger('WebLLM');

const DEFAULT_MODELS = [
  { id: 'Llama-3.2-1B-Instruct-q4f16_1-MLC', name: 'Llama 3.2 1B (WebLLM)' },
  { id: 'Llama-3.2-3B-Instruct-q4f16_1-MLC', name: 'Llama 3.2 3B (WebLLM)' },
];

class WebLLMProvider implements ModelProvider {
  readonly id = 'webllm';
  private engine?: MLCEngine;
  private loadedModel?: string;

  listModels(): Array<{ id: string; name: string }> {
    return DEFAULT_MODELS;
  }

  private async init(model: string): Promise<void> {
    if (this.engine && this.loadedModel === model) return;

    const initProgressCallback = (progress: unknown) => {
      logger.debug('Model loading progress:', progress);
    };

    this.engine = new MLCEngine({ initProgressCallback });
    await this.engine.reload(model);
    this.loadedModel = model;
  }

  async *stream(params: StreamParams): AsyncIterable<StreamChunk> {
    const model = params.model.includes('/') ? params.model.split('/').slice(1).join('/') : params.model;
    try {
      await this.init(model || DEFAULT_MODELS[0]!.id);
    } catch (err) {
      yield { type: 'error', error: err instanceof Error ? err.message : String(err) };
      return;
    }

    const messages = params.messages.map(toWebLLMMessage);
    try {
      const result = await this.engine!.chat.completions.create({ messages });
      const content = result.choices[0]?.message?.content;
      if (typeof content === 'string' && content) {
        yield { type: 'text', text: content };
      }
      yield { type: 'done' };
    } catch (err) {
      yield { type: 'error', error: err instanceof Error ? err.message : String(err) };
    }
  }
}

function toWebLLMMessage(message: ProviderChatMessage): ChatCompletionMessageParam {
  if (message.role === 'tool') {
    return {
      role: 'tool',
      tool_call_id: message.toolCallId ?? '',
      content: message.content,
    } as ChatCompletionMessageParam;
  }
  if (message.role === 'assistant' && message.toolCalls?.length) {
    return {
      role: 'assistant',
      content: message.content || null,
      tool_calls: message.toolCalls.map((tc) => ({
        id: tc.id,
        type: 'function' as const,
        function: { name: tc.name, arguments: tc.arguments || '{}' },
      })),
    } as ChatCompletionMessageParam;
  }
  return {
    role: message.role,
    content: message.content,
  } as ChatCompletionMessageParam;
}

export default () => {
  cognitiveRuntime.start();
  cognitiveRuntime.registerExternalProvider(new WebLLMProvider());
  logger.info('WebLLM provider registered');
};
