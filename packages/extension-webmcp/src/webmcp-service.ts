import {
  commandRegistry,
  createLogger,
  subscribe,
  unsubscribe,
  TOPIC_COMMAND_REGISTERED,
} from "@eclipse-docks/core";
import { ToolRegistry, type ToolDefinition } from "@eclipse-docks/extension-ai-system/api";
import type { Command } from "@eclipse-docks/core";
import { executeCommandTool } from "./execute-command-tool";
import { getModelContext } from "./get-model-context";
import { sanitizeWebMcpToolName } from "./sanitize-tool-name";

const logger = createLogger("WebMCP");

const READ_ONLY_COMMAND_IDS = new Set([
  "ls",
  "cat",
  "head",
  "tail",
  "exists",
  "wc",
  "version-info",
  "js",
]);

const APP_LOADED_EVENT = "app-loaded";

function toolDescription(command: Command, toolDef: ToolDefinition): string {
  const description = (toolDef.function.description || command.description || command.name || command.id).trim();
  return description || command.id;
}

export class WebMCPService {
  private readonly toolRegistry = new ToolRegistry();
  private readonly registrationControllers = new Map<string, AbortController>();
  private readonly registeredIds = new Set<string>();
  private readonly registeredToolNames = new Set<string>();
  private commandSubscriptionToken: ReturnType<typeof subscribe> | null = null;
  private appLoadedListener: (() => void) | null = null;

  async start(): Promise<void> {
    if (!getModelContext()) {
      logger.info("Web Model Context API not available in this browser.");
      return;
    }

    this.commandSubscriptionToken = subscribe(TOPIC_COMMAND_REGISTERED, (command: Command) => {
      void this.registerCommand(command);
    });

    this.appLoadedListener = () => {
      void this.syncAllCommands("app-loaded");
    };
    window.addEventListener(APP_LOADED_EVENT, this.appLoadedListener, { once: true });

    await this.syncAllCommands("startup");
  }

  stop(): void {
    if (this.appLoadedListener) {
      window.removeEventListener(APP_LOADED_EVENT, this.appLoadedListener);
      this.appLoadedListener = null;
    }

    if (this.commandSubscriptionToken !== null) {
      unsubscribe(this.commandSubscriptionToken);
      this.commandSubscriptionToken = null;
    }

    for (const controller of this.registrationControllers.values()) {
      controller.abort();
    }
    this.registrationControllers.clear();
    this.registeredIds.clear();
    this.registeredToolNames.clear();
  }

  private toolDefToInputSchema(
    params: ToolDefinition["function"]["parameters"]
  ): Record<string, unknown> {
    return {
      type: "object",
      properties: params.properties ?? {},
      ...(params.required?.length ? { required: params.required } : {}),
    };
  }

  private isReadOnlyCommand(command: Command): boolean {
    return READ_ONLY_COMMAND_IDS.has(command.id);
  }

  private async syncAllCommands(reason: string): Promise<void> {
    const commands = Object.values(commandRegistry.listCommands()) as Command[];
    const results = await Promise.all(commands.map((command) => this.registerCommand(command)));
    const registeredCount = results.filter(Boolean).length;
    logger.info(`Synced ${registeredCount}/${commands.length} command(s) as WebMCP tools (${reason}).`);

    const modelContext = getModelContext();
    if (modelContext?.getTools) {
      try {
        const tools = await modelContext.getTools();
        logger.info(`document.modelContext.getTools() reports ${tools.length} tool(s).`);
      } catch (error) {
        logger.warn("document.modelContext.getTools() failed:", error);
      }
    }
  }

  private async registerCommand(command: Command): Promise<boolean> {
    if (this.registeredIds.has(command.id)) return false;

    const modelContext = getModelContext();
    if (!modelContext) return false;

    const schemaContext = commandRegistry.createExecutionContext?.() ?? {};
    const toolDef = this.toolRegistry.commandToTool(command, schemaContext) as ToolDefinition;
    const commandId = command.id;
    const toolName = sanitizeWebMcpToolName(command.id);

    if (this.registeredToolNames.has(toolName)) {
      logger.warn(`Skipping command "${commandId}": WebMCP tool name "${toolName}" is already registered.`);
      return false;
    }

    const registrationController = new AbortController();

    try {
      await modelContext.registerTool(
        {
          name: toolName,
          title: command.name || command.id,
          description: toolDescription(command, toolDef),
          inputSchema: this.toolDefToInputSchema(toolDef.function.parameters),
          annotations: {
            readOnlyHint: this.isReadOnlyCommand(command),
          },
          async execute(inputObject, options?) {
            return executeCommandTool(commandId, inputObject, options?.signal);
          },
        },
        { signal: registrationController.signal }
      );

      this.registrationControllers.set(toolName, registrationController);
      this.registeredIds.add(command.id);
      this.registeredToolNames.add(toolName);
      return true;
    } catch (error) {
      registrationController.abort();
      logger.warn(`Failed to register WebMCP tool "${toolName}" for command "${commandId}":`, error);
      return false;
    }
  }
}
