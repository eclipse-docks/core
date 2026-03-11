import { DependencyContext, rootContext } from "@eclipse-lyra/core";
import { publish, subscribe } from "@eclipse-lyra/core";
import { appSettings, TOPIC_SETTINGS_CHANGED } from "@eclipse-lyra/core";
import { contributionRegistry } from "@eclipse-lyra/core";
import type { ExecutionContext } from "@eclipse-lyra/core";
import { logger } from "@eclipse-lyra/core";

import {
    TOPIC_AI_STREAM_STARTED,
    TOPIC_AI_STREAM_CHUNK,
    TOPIC_AI_STREAM_COMPLETE,
    TOPIC_AI_STREAM_ERROR,
    TOPIC_AICONFIG_CHANGED,
    KEY_AI_CONFIG,
    AI_CONFIG_TEMPLATE,
    MAX_TOOL_ITERATIONS,
    CID_CHAT_PROVIDERS
} from "../core/constants";

import type {
    ChatMessage,
    ChatHistory,
    ChatProvider,
    AIConfig,
    StreamChunk,
    ToolResult,
    TokenUsage,
    TaskPlan,
    TaskStep,
    Artifact,
    ToolDefinition,
    ApiMessage
} from "../core/types";

import type {
    AgentContribution,
    IProvider,
    ChatProviderContribution,
    AgentWorkflowOptions,
    AgentWorkflowResult,
    AIServiceOptions,
    AIServiceResult,
    TaskOptions,
    TaskResult
} from "../core/interfaces";

import { ProviderFactory } from "../providers/provider-factory";
import { AgentRegistry } from "../agents/agent-registry";
import { PromptBuilder } from "../agents/prompt-builder";
import { MessageProcessorService } from "../agents/message-processor";
import { ToolExecutor } from "../tools/tool-executor";
import { ToolRegistry } from "../tools/tool-registry";
import { WorkflowEngine } from "../workflows/workflow-engine";
import { TokenEstimator } from "../tools/token-estimator";
import { tokenUsageTracker } from "./token-usage-tracker";
import { TaskWorkspace } from "../workspace/workspace";
import { TaskRunner } from "../task/task-runner";
import { taskCheckpointService } from "../task/task-checkpoint";
import { orchestrateTask } from "../agents/orchestrator";
import { sanitizeMessagesForAPI } from "../core/message-utils";
import { streamToText } from "../providers/provider-utils";

export class AIService {
    private aiConfig?: AIConfig;
    private configCheckPromise?: Promise<void>;
    private providerFactory: ProviderFactory;
    private agentRegistry: AgentRegistry;
    private _promptBuilder: PromptBuilder;
    private messageProcessor: MessageProcessorService;
    private toolExecutor: ToolExecutor;
    private workflowEngine: WorkflowEngine;
    private toolRegistry: ToolRegistry;
    private activeRequests: Map<string, AbortController> = new Map();
    private activeTasks: Map<string, AbortController> = new Map();

    constructor() {
        this.toolRegistry = new ToolRegistry();
        this.providerFactory = new ProviderFactory();
        this.agentRegistry = new AgentRegistry();
        this._promptBuilder = new PromptBuilder(this.toolRegistry);
        this.messageProcessor = new MessageProcessorService();
        this.toolExecutor = new ToolExecutor();
        this.workflowEngine = new WorkflowEngine();

        subscribe(TOPIC_SETTINGS_CHANGED, () => {
            this.aiConfig = undefined;
            this.configCheckPromise = undefined;
            this.checkAIConfig().then();
        });

        this.checkAIConfig().then();
    }

    get promptBuilder(): PromptBuilder {
        return this._promptBuilder;
    }

    getAgentContributions(): AgentContribution[] {
        return this.agentRegistry.getAgentContributions();
    }

    async getProviders(): Promise<ChatProvider[]> {
        await this.checkAIConfig();
        return this.aiConfig?.providers || [];
    }

    async getDefaultProvider(): Promise<ChatProvider> {
        await this.checkAIConfig();
        const providers = await this.getProviders();
        if (this.aiConfig?.defaultProvider) {
            const config = providers.find(p => p.name === this.aiConfig?.defaultProvider);
            if (config) return config;
        }
        return providers[0];
    }

    async setDefaultProvider(defaultProviderName: string): Promise<ChatProvider> {
        await this.checkAIConfig();
        if (this.aiConfig) {
            this.aiConfig.defaultProvider = defaultProviderName;
            await appSettings.set(KEY_AI_CONFIG, this.aiConfig);
        }
        return this.getDefaultProvider();
    }

    createMessage(prompt: string): ChatMessage {
        return { role: "user", content: prompt };
    }

    registerStreamingFetcher(provider: IProvider): void {
        this.providerFactory.registerProvider(provider);
    }

    private getContributedProviders(): ChatProvider[] {
        const contributions = contributionRegistry.getContributions(CID_CHAT_PROVIDERS) as ChatProviderContribution[];
        return contributions.map(c => c.provider);
    }

    private mergeProviders(existing: ChatProvider[], contributed: ChatProvider[]): ChatProvider[] {
        const existingNames = new Set(existing.map(p => p.name));
        const missing = contributed.filter(p => !existingNames.has(p.name));
        return missing.length > 0 ? [...existing, ...missing] : existing;
    }

    private async createInitialConfig(): Promise<AIConfig> {
        const initialConfig: AIConfig = { ...AI_CONFIG_TEMPLATE, providers: this.getContributedProviders() };
        await appSettings.set(KEY_AI_CONFIG, initialConfig);
        return appSettings.get(KEY_AI_CONFIG);
    }

    private async updateConfigWithMissingProviders(config: AIConfig): Promise<AIConfig> {
        const merged = this.mergeProviders(config.providers, this.getContributedProviders());
        if (merged.length === config.providers.length) return config;
        const updated = { ...config, providers: merged };
        await appSettings.set(KEY_AI_CONFIG, updated);
        return updated;
    }

    private async checkAIConfig(): Promise<void> {
        if (this.aiConfig) return;
        if (this.configCheckPromise) return this.configCheckPromise;
        this.configCheckPromise = this.performConfigCheck();
        return this.configCheckPromise;
    }

    private async performConfigCheck(): Promise<void> {
        try {
            this.aiConfig = await appSettings.get(KEY_AI_CONFIG);
            this.aiConfig = this.aiConfig
                ? await this.updateConfigWithMissingProviders(this.aiConfig)
                : await this.createInitialConfig();
            publish(TOPIC_AICONFIG_CHANGED, this.aiConfig);
        } finally {
            this.configCheckPromise = undefined;
        }
    }

    private createAgentContext(
        sharedState: ExecutionContext,
        callContext: DependencyContext,
        additional: Partial<ExecutionContext> = {}
    ): ExecutionContext {
        return { ...sharedState, ...callContext.getProxy(), ...additional };
    }

    async *streamCompletion(options: AIServiceOptions): AsyncGenerator<StreamChunk, AIServiceResult> {
        const requestId = `${Date.now()}-${Math.random()}`;
        const abortController = new AbortController();
        this.activeRequests.set(requestId, abortController);

        if (options.signal) {
            options.signal.addEventListener('abort', () => abortController.abort());
        }
        const effectiveSignal = options.signal || abortController.signal;

        try {
            options.onStatus?.('starting');
            publish(TOPIC_AI_STREAM_STARTED, { requestId, options });

            const chatConfig = options.chatConfig || await this.getDefaultProvider();
            const messages = sanitizeMessagesForAPI(options.chatContext.history);
            const provider = this.providerFactory.getProvider(chatConfig);
            const accumulator = this.toolExecutor.createToolCallAccumulator();

            let accumulatedContent = '';
            let accumulatedRole = 'assistant';
            let tokenUsage: TokenUsage | undefined;

            for await (const chunk of provider.stream({
                model: chatConfig.model, messages, chatConfig, tools: options.tools, signal: effectiveSignal
            })) {
                if (chunk.type === 'error') {
                    options.onStatus?.('error');
                    publish(TOPIC_AI_STREAM_ERROR, { requestId, chunk });
                    yield chunk;
                    break;
                }
                if (chunk.type === 'token') {
                    accumulator.processChunk(chunk);
                    if (!chunk.toolCalls?.length) accumulatedContent += chunk.content;
                    if (chunk.message?.role) accumulatedRole = chunk.message.role;
                    if (chunk.content) options.onToken?.(chunk.content);
                    options.onStatus?.('streaming');
                    options.onProgress?.({ received: accumulatedContent.length });
                    publish(TOPIC_AI_STREAM_CHUNK, { requestId, chunk });
                    yield chunk;
                } else if (chunk.type === 'done') {
                    if (chunk.metadata?.usage) tokenUsage = chunk.metadata.usage as TokenUsage;
                    options.onStatus?.('complete');
                    publish(TOPIC_AI_STREAM_COMPLETE, { requestId });
                    yield chunk;
                    break;
                } else {
                    yield chunk;
                }
            }

            const finalToolCalls = accumulator.getFinalToolCalls();
            const finalMessage: ChatMessage = {
                role: accumulatedRole,
                content: accumulatedContent,
                ...(finalToolCalls.length > 0 && { toolCalls: finalToolCalls })
            };

            if (!tokenUsage) {
                const promptTokens = TokenEstimator.estimatePromptTokens(messages, options.tools);
                const completionTokens = TokenEstimator.estimateCompletionTokens(accumulatedContent, finalToolCalls);
                tokenUsage = { promptTokens, completionTokens, totalTokens: promptTokens + completionTokens, estimated: true };
            }

            tokenUsageTracker.recordUsage(chatConfig.name, tokenUsage).catch(err => {
                logger.error(`Failed to record token usage: ${err instanceof Error ? err.message : String(err)}`);
            });

            return { message: finalMessage, tokenUsage };
        } catch (error) {
            if (error instanceof Error && error.name === 'AbortError') {
                options.onStatus?.('error');
                publish(TOPIC_AI_STREAM_ERROR, { requestId, error: 'Request cancelled' });
                throw error;
            }
            options.onStatus?.('error');
            const errorMessage = error instanceof Error ? error.message : String(error);
            publish(TOPIC_AI_STREAM_ERROR, { requestId, error: errorMessage });
            yield { type: 'error', content: errorMessage, metadata: { error } };
            throw error;
        } finally {
            this.activeRequests.delete(requestId);
        }
    }

    async handleStreamingPromptDirect(
        options: AIServiceOptions & { tools?: ToolDefinition[] }
    ): Promise<ChatMessage> {
        const stream = this.streamCompletion(options);
        let lastValue: IteratorResult<StreamChunk, AIServiceResult>;

        while (true) {
            lastValue = await stream.next();
            if (lastValue.done) return lastValue.value.message;

            const chunk = lastValue.value;
            if (chunk.type === 'error') throw new Error(chunk.content);
            if (chunk.type === 'done') {
                const final = await stream.next();
                if (final.done && final.value) return final.value.message;
                if (!final.done) continue;
                throw new Error('Stream completed without return value');
            }
        }
    }

    async handleStreamingPrompt(options: AIServiceOptions): Promise<ChatMessage | ChatMessage[]> {
        const callContext = options.callContext || rootContext.createChild({});
        const agentContext = this.createAgentContext(
            {},
            callContext,
            { userPrompt: options.chatContext.history[options.chatContext.history.length - 1]?.content || "" }
        );

        const matchingAgents = this.agentRegistry.getMatchingAgents(agentContext);
        const roles = matchingAgents.length > 0 ? matchingAgents.map(a => a.role) : ['assistant'];

        const workflowResult = await this.executeAgentWorkflow({
            chatContext: options.chatContext,
            chatConfig: options.chatConfig,
            callContext,
            execution: 'parallel',
            stream: options.stream,
            signal: options.signal,
            onToken: (_role, token) => options.onToken?.(token),
            onStatus: (_role, status) => options.onStatus?.(status),
            roles
        });

        const messages = Array.from(workflowResult.messages.values());
        return messages.length === 1 ? messages[0] : messages;
    }

    cancelRequest(requestId: string): boolean {
        const controller = this.activeRequests.get(requestId);
        if (!controller) return false;
        controller.abort();
        this.activeRequests.delete(requestId);
        return true;
    }

    async executeAgentWorkflow(options: AgentWorkflowOptions): Promise<AgentWorkflowResult> {
        const agentContext = this.createAgentContext(options.sharedState || {}, options.callContext);
        const matchingAgents = this.agentRegistry.getMatchingAgents(agentContext, options.roles);

        return this.workflowEngine.execute(
            matchingAgents,
            options,
            (contrib, messages, sharedState, chatConfig, workflowOptions, results) =>
                this.executeAgent(contrib, messages, sharedState, chatConfig, workflowOptions, results)
        );
    }

    private async executeAgent(
        contrib: AgentContribution,
        messages: ChatMessage[],
        sharedState: ExecutionContext,
        chatConfig: ChatProvider,
        options: AgentWorkflowOptions,
        results: AgentWorkflowResult
    ): Promise<ChatMessage | null> {
        options.onAgentStart?.(contrib.role);

        const agentContext = this.createAgentContext(sharedState, options.callContext, {
            userPrompt: messages[messages.length - 1]?.content || ""
        });

        const { messages: preparedMessages, tools } = await this._promptBuilder.build(
            contrib, messages, agentContext, contrib.hooks
        );

        const chatMessages: ChatMessage[] = preparedMessages.map(msg => {
            const chatMsg: ChatMessage = { role: msg.role, content: msg.content };
            if (msg.tool_call_id) (chatMsg as any).tool_call_id = msg.tool_call_id;
            if (msg.tool_calls) (chatMsg as any).tool_calls = msg.tool_calls;
            return chatMsg;
        });

        let rawMessage = await this.handleStreamingPromptDirect({
            chatContext: { history: chatMessages },
            chatConfig,
            callContext: options.callContext,
            stream: options.stream ?? true,
            signal: options.signal,
            onToken: options.onToken ? (token: string) => options.onToken!(contrib.role, token) : undefined,
            tools
        });

        let toolCallIteration = 0;
        const conversationHistory: ApiMessage[] = [...preparedMessages];

        while (rawMessage.toolCalls && rawMessage.toolCalls.length > 0) {
            toolCallIteration++;
            if (toolCallIteration > MAX_TOOL_ITERATIONS) {
                logger.warn('Max tool call iterations reached');
                break;
            }

            let toolResults: ToolResult[];

            if (options.requireToolApproval && options.onToolApprovalRequest) {
                const toolCallDescriptions = rawMessage.toolCalls.map(tc => {
                    let parsedArgs: any = {};
                    try { parsedArgs = JSON.parse(tc.function.arguments || "{}"); } catch { /* noop */ }
                    return `${tc.function.name}(${Object.entries(parsedArgs).map(([k, v]) => `${k}=${v}`).join(", ")})`;
                }).join(", ");

                const approvalRequest = {
                    toolCalls: rawMessage.toolCalls,
                    message: `The AI wants to execute: ${toolCallDescriptions}`
                };

                const approved = await options.onToolApprovalRequest(contrib.role, approvalRequest);
                if (!approved) {
                    toolResults = rawMessage.toolCalls.map(tc => ({
                        id: tc.id,
                        result: { success: false, message: "Tool execution cancelled by user", cancelled: true }
                    }));
                } else {
                    toolResults = await this.toolExecutor.executeToolCalls(rawMessage.toolCalls, agentContext);
                }
            } else {
                toolResults = await this.toolExecutor.executeToolCalls(rawMessage.toolCalls, agentContext);
            }

            const toolMessages: ApiMessage[] = toolResults.map(tr => ({
                role: "tool",
                content: tr.error ? JSON.stringify({ error: tr.error }) : JSON.stringify(tr.result),
                tool_call_id: tr.id
            }));

            const assistantMessage: any = {
                role: "assistant",
                content: rawMessage.content || ""
            };
            if (rawMessage.toolCalls?.length) {
                assistantMessage.tool_calls = rawMessage.toolCalls
                    .filter(tc => tc.function.name?.trim())
                    .map(tc => ({ id: tc.id, type: tc.type, function: { name: tc.function.name, arguments: tc.function.arguments || "{}" } }));
            }

            conversationHistory.push(assistantMessage, ...toolMessages);

            rawMessage = await this.handleStreamingPromptDirect({
                chatContext: {
                    history: conversationHistory.map(m => ({
                        role: m.role,
                        content: m.content,
                        ...(m.tool_call_id && { tool_call_id: m.tool_call_id }),
                        ...(m.tool_calls && { tool_calls: m.tool_calls })
                    } as ChatMessage))
                },
                chatConfig,
                callContext: options.callContext,
                stream: options.stream ?? true,
                signal: options.signal,
                tools
            });

            if (rawMessage.content?.trim() && (!rawMessage.toolCalls?.length)) break;
        }

        const processedMessage = await this.messageProcessor.process(
            rawMessage, contrib,
            this.createAgentContext(sharedState, options.callContext, { message: rawMessage })
        );

        if (contrib.hooks?.afterReceive) {
            await contrib.hooks.afterReceive(processedMessage, this.createAgentContext(sharedState, options.callContext));
        }

        const finalMessage: ChatMessage = { role: contrib.role, content: processedMessage.content };
        results.messages.set(contrib.role, finalMessage);
        options.onAgentComplete?.(contrib.role, finalMessage);
        return finalMessage;
    }

    async planTask(prompt: string, context: ExecutionContext): Promise<TaskPlan> {
        const chatConfig = await this.getDefaultProvider();
        const contributions = this.agentRegistry.getAgentContributions();
        const callContext = rootContext.createChild({});

        return orchestrateTask({
            prompt,
            availableAgents: contributions,
            chatConfig,
            context,
            executeCompletion: (messages, cfg) => streamToText(messages, cfg, this.providerFactory)
        });
    }

    async executeTask(options: TaskOptions): Promise<TaskResult> {
        const chatConfig = options.chatConfig || await this.getDefaultProvider();
        const callContext = options.callContext || rootContext.createChild({});
        const contributions = this.agentRegistry.getAgentContributions();

        const plan = await this.planTask(options.prompt, callContext.getProxy() as ExecutionContext);
        options.onPlanReady?.(plan);

        const workspace = new TaskWorkspace(`task-${Date.now()}`, plan);
        await taskCheckpointService.registerCheckpoint(workspace.taskId);

        const abortController = new AbortController();
        this.activeTasks.set(workspace.taskId, abortController);
        const taskOptions = { ...options, signal: options.signal ?? abortController.signal };

        const byRole = new Map(contributions.map(c => [c.role, c]));

        const runner = new TaskRunner(this.createStepExecutor(byRole, contributions, chatConfig, callContext, taskOptions));
        try {
            const result = await runner.run(workspace, taskOptions);
            await taskCheckpointService.unregisterCheckpoint(workspace.taskId);
            return result;
        } finally {
            this.activeTasks.delete(workspace.taskId);
        }
    }

    async resumeTask(taskId: string, options: TaskOptions): Promise<TaskResult> {
        const workspace = await taskCheckpointService.restore(taskId);
        if (!workspace) throw new Error(`No checkpoint found for task ${taskId}`);

        const chatConfig = options.chatConfig || await this.getDefaultProvider();
        const callContext = options.callContext || rootContext.createChild({});
        const contributions = this.agentRegistry.getAgentContributions();
        const byRole = new Map(contributions.map(c => [c.role, c]));

        const runner = new TaskRunner(this.createStepExecutor(byRole, contributions, chatConfig, callContext, options));
        return runner.run(workspace, options);
    }

    private createStepExecutor(
        byRole: Map<string, AgentContribution>,
        contributions: AgentContribution[],
        chatConfig: ChatProvider,
        callContext: DependencyContext,
        options: TaskOptions
    ) {
        return async (step: TaskStep, _ws: TaskWorkspace, _opts: TaskOptions): Promise<Artifact> => {
            const contrib = byRole.get(step.role) || contributions[0];
            const stepMessages: ChatMessage[] = [
                ...(options.chatContext?.history || []),
                { role: 'user', content: step.subTask }
            ];
            const workflowResult = await this.workflowEngine.execute(
                [contrib],
                { chatContext: { history: stepMessages }, chatConfig, callContext, execution: 'parallel', stream: true, signal: options.signal, roles: [contrib.role] },
                (c, msgs, state, cfg, wopts, results) => this.executeAgent(c, msgs, state, cfg, wopts, results)
            );
            const msg = workflowResult.messages.get(contrib.role);
            return {
                id: step.produces[0] || `${step.id}-result`,
                type: 'text' as const,
                content: msg?.content || '',
                producedBy: step.role,
                createdAt: Date.now()
            };
        };
    }

    cancelTask(taskId: string): void {
        const controller = this.activeTasks.get(taskId);
        if (controller) {
            controller.abort();
            this.activeTasks.delete(taskId);
        }
    }
}

export const aiService = new AIService();
