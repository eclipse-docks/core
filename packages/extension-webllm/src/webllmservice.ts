import { createLogger } from '@eclipse-docks/core';
import {
  cognitiveRuntime,
  type ModelProvider,
  type ProviderChatMessage,
  type StreamChunk,
  type StreamParams,
} from '@eclipse-docks/extension-ai-system/api';
import {
  ChatCompletionMessageParam,
  MLCEngine,
  ModelType,
  functionCallingModelIds,
  prebuiltAppConfig,
  type AppConfig,
  type InitProgressReport,
} from '@mlc-ai/web-llm';

const logger = createLogger('WebLLM');

/** Function-calling model selected when the WebLLM row is first chosen. */
const PREFERRED_MODEL_ID = 'Hermes-3-Llama-3.1-8B-q4f16_1-MLC';

/**
 * Documented WebLLM cache backend. OPFS keeps model files out of the Cache API,
 * which rejects Hugging Face's redirected downloads with "Entry already exists".
 */
function webllmAppConfig(): AppConfig {
  const opfs = typeof navigator !== 'undefined' && typeof navigator.storage?.getDirectory === 'function';
  if (!opfs) return { ...prebuiltAppConfig, cacheBackend: 'indexeddb' };
  return { ...prebuiltAppConfig, cacheBackend: 'opfs', opfsAccessMode: 'auto' };
}

type WebLlmHardware = 'GPU' | 'CPU' | 'NPU';

/** Model library wasm names encode the compiled target (`-webgpu`, `-cpu`, `-npu` / WebNN). */
function hardwareGroup(modelLib: string): WebLlmHardware {
  const lib = modelLib.toLowerCase();
  if (lib.includes('webgpu') || lib.includes('-gpu')) return 'GPU';
  if (lib.includes('npu') || lib.includes('webnn')) return 'NPU';
  if (lib.includes('cpu')) return 'CPU';
  return 'GPU';
}

function webllmModels(): Array<{ id: string; name: string; group: WebLlmHardware }> {
  const toolModels = new Set<string>(functionCallingModelIds);
  return prebuiltAppConfig.model_list
    .filter((record) => record.model_type !== ModelType.embedding && toolModels.has(record.model_id))
    .map((record) => ({
      id: record.model_id,
      name: record.model_id,
      group: hardwareGroup(record.model_lib),
    }));
}

class WebLLMProvider implements ModelProvider {
  readonly id = 'webllm';
  readonly label = 'WebLLM';
  private engine?: MLCEngine;
  private loadedModel?: string;
  private loading?: Promise<void>;
  private progressListeners = new Set<(report: InitProgressReport) => void>();

  get defaultModelIds(): string[] {
    const models = this.listModels();
    const preferred = models.find((model) => model.id === PREFERRED_MODEL_ID) ?? models[0];
    return preferred ? [preferred.id] : [];
  }

  listModels(): Array<{ id: string; name: string }> {
    return webllmModels();
  }

  private async load(model: string): Promise<void> {
    if (this.engine && this.loadedModel === model) return;
    const engine = new MLCEngine({
      appConfig: webllmAppConfig(),
      initProgressCallback: (report) => {
        logger.debug('Model loading progress:', report);
        for (const listener of this.progressListeners) listener(report);
      },
    });
    await engine.reload(model);
    this.engine = engine;
    this.loadedModel = model;
  }

  private init(model: string): Promise<void> {
    if (this.engine && this.loadedModel === model) return Promise.resolve();
    this.loading ??= this.load(model).finally(() => {
      this.loading = undefined;
    });
    return this.loading;
  }

  /** Yield the same init reports the official WebLLM page shows in its status label. */
  private async *loadProgress(model: string, signal?: AbortSignal): AsyncIterable<StreamChunk> {
    if (this.engine && this.loadedModel === model) return;

    const reports: InitProgressReport[] = [];
    let wake: (() => void) | undefined;
    let ready = false;
    let failure: unknown;
    const poke = () => {
      const resolve = wake;
      wake = undefined;
      resolve?.();
    };
    const onAbort = () => poke();
    signal?.addEventListener('abort', onAbort);

    const onProgress = (report: InitProgressReport) => {
      reports.push(report);
      poke();
    };
    this.progressListeners.add(onProgress);
    const task = this.init(model).then(
      () => {
        ready = true;
        poke();
      },
      (err: unknown) => {
        failure = err;
        ready = true;
        poke();
      },
    );

    try {
      while (true) {
        if (signal?.aborted) return;
        if (reports.length) {
          const report = reports[reports.length - 1]!;
          reports.length = 0;
          yield { type: 'progress', text: report.text, progress: report.progress };
          continue;
        }
        if (ready) break;
        await new Promise<void>((resolve) => {
          wake = resolve;
          if (!reports.length && !ready && !signal?.aborted) return;
          wake = undefined;
          resolve();
        });
      }
    } finally {
      this.progressListeners.delete(onProgress);
      signal?.removeEventListener('abort', onAbort);
    }

    await task;
    if (failure) throw failure;
  }

  async *stream(params: StreamParams): AsyncIterable<StreamChunk> {
    const model = params.model.includes('/') ? params.model.split('/').slice(1).join('/') : params.model;
    try {
      yield* this.loadProgress(model || this.defaultModelIds[0] || '', params.signal);
    } catch (err) {
      yield { type: 'error', error: err instanceof Error ? err.message : String(err) };
      return;
    }
    if (params.signal?.aborted) return;

    const messages = params.messages.map(toWebLLMMessage);
    try {
      const chunks = await this.engine!.chat.completions.create({
        messages,
        stream: true,
        stream_options: { include_usage: true },
      });
      for await (const chunk of chunks) {
        if (params.signal?.aborted) return;
        const text = chunk.choices[0]?.delta?.content;
        if (text) yield { type: 'text', text };
        if (chunk.usage) {
          yield {
            type: 'usage',
            usage: {
              inputTokens: chunk.usage.prompt_tokens,
              outputTokens: chunk.usage.completion_tokens,
            },
          };
        }
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
