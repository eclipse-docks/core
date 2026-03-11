import {ChatCompletionMessageParam, MLCEngine} from "@mlc-ai/web-llm";
import { createLogger } from "@eclipse-lyra/core";
import type {ChatMessage, ChatProvider, StreamChunk} from "@eclipse-lyra/extension-ai-system/api";

const logger = createLogger('WebLLM');
import type {IProvider, StreamingParams, CompletionParams} from "@eclipse-lyra/extension-ai-system/api";
import {aiService} from "@eclipse-lyra/extension-ai-system/api";

class WebLLMProvider implements IProvider {
    name = "webllm";
    private engine?: MLCEngine;

    canHandle(chatProvider: ChatProvider): boolean {
        return chatProvider.name === "webllm";
    }

    private async init(model: string, parameters?: any): Promise<void> {
        if (this.engine) return;
        
        const initProgressCallback = (progress: any) => {
            logger.debug("Model loading progress:", progress);
        };

        this.engine = new MLCEngine({initProgressCallback});
        await this.engine.reload(model, parameters);
    }

    async *stream(params: StreamingParams): AsyncIterable<StreamChunk> {
        if (!this.engine) {
            await this.init(params.model, params.chatConfig.parameters);
        }
        
        const internalMessages = params.messages.map((message) => {
            return {...message} as ChatCompletionMessageParam;
        });
        
        const result = await this.engine!.chat.completions.create({
            messages: internalMessages
        });
        
        const message = result.choices[0].message as ChatMessage;
        
        if (message.content) {
            for (const char of message.content) {
                yield {
                    type: 'token',
                    content: char
                };
            }
        }
        
        yield {
            type: 'done',
            content: ''
        };
    }

    async complete(params: CompletionParams): Promise<ChatMessage> {
        if (!this.engine) {
            await this.init(params.model, params.chatConfig.parameters);
        }
        
        const internalMessages = params.messages.map((message) => {
            return {...message} as ChatCompletionMessageParam;
        });
        
        const result = await this.engine!.chat.completions.create({
            messages: internalMessages
        });
        
        return result.choices[0].message as ChatMessage;
    }
}

export default () => {
    aiService.registerStreamingFetcher(new WebLLMProvider());
}