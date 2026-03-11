import type { ExecutionContext } from "@eclipse-lyra/core";
import { contributionRegistry, createLogger } from "@eclipse-lyra/core";

const logger = createLogger('PromptBuilder');
import type { ChatMessage, ApiMessage, ToolDefinition } from "../core/types";
import type { PromptEnhancer, AgentContribution, PromptEnhancerContribution } from "../core/interfaces";
import { CID_PROMPT_ENHANCERS } from "../core/constants";
import { sanitizeMessagesForAPI } from "../core/message-utils";
import { ToolRegistry } from "../tools/tool-registry";
import { toolDetector } from "../utils/tool-detector";

export class PromptBuilder {
    private enhancers: PromptEnhancer[] = [];

    constructor(private toolRegistry: ToolRegistry) {}

    addEnhancer(enhancer: PromptEnhancer): void {
        this.enhancers.push(enhancer);
    }

    private async getSysPrompt(contribution: AgentContribution, context: ExecutionContext): Promise<string> {
        let sysPrompt = contribution.sysPrompt;
        if (typeof sysPrompt === 'function') sysPrompt = sysPrompt();

        if (!sysPrompt || typeof sysPrompt !== 'string') {
            throw new Error(`Agent "${contribution.role}" is missing a system prompt.`);
        }

        const allEnhancers = [
            ...(contribution.promptEnhancers || []),
            ...this.enhancers,
            ...this.getContributedEnhancers()
        ].sort((a, b) => (b.priority || 0) - (a.priority || 0));

        let enhanced = sysPrompt;
        for (const enhancer of allEnhancers) {
            try {
                const result = await enhancer.enhance(enhanced, context);
                if (result && typeof result === 'string') enhanced = result;
            } catch (err) {
                logger.warn('Enhancer failed:', err);
            }
        }
        return enhanced;
    }

    private rewriteChatHistoryForAgent(history: ApiMessage[], targetRole: string): ApiMessage[] {
        return history.map(m => {
            if (m.role === "user") return { role: m.role, content: m.content };
            if (m.role === targetRole) return { role: "assistant", content: m.content };
            return { role: "user", content: `***Agent '${m.role}' replied:***\n${m.content}` };
        });
    }

    private getContributedEnhancers(): PromptEnhancer[] {
        const contributions = contributionRegistry.getContributions(CID_PROMPT_ENHANCERS) as PromptEnhancerContribution[];
        return contributions.map(c => ({ ...c.enhancer, priority: c.priority ?? c.enhancer.priority }));
    }

    async build(
        contribution: AgentContribution,
        messages: ChatMessage[],
        context: ExecutionContext,
        hooks?: { beforeSend?: (messages: ChatMessage[], context: ExecutionContext) => Promise<void> }
    ): Promise<{ messages: ApiMessage[]; userPromptIndex: number; tools?: ToolDefinition[] }> {
        if (hooks?.beforeSend) await hooks.beforeSend(messages, context);

        const sanitized = sanitizeMessagesForAPI(messages);
        const rewritten = this.rewriteChatHistoryForAgent(sanitized, contribution.role);

        let toolsConfig = contribution.tools;
        if (typeof toolsConfig === 'function') toolsConfig = await toolsConfig();

        let tools: ToolDefinition[] | undefined;
        if (toolsConfig?.enabled) {
            if (toolsConfig.smartToolDetection) {
                const lastUser = messages[messages.length - 1];
                if (toolDetector.needsTools(lastUser?.content || '')) {
                    tools = this.toolRegistry.getAvailableTools(context, toolsConfig.commandFilter);
                }
            } else {
                tools = this.toolRegistry.getAvailableTools(context, toolsConfig.commandFilter);
            }
        }

        const sysPrompt = await this.getSysPrompt(contribution, context);
        rewritten.unshift({ role: "system", content: sysPrompt });

        return { messages: rewritten, userPromptIndex: rewritten.length - 1, tools };
    }
}
