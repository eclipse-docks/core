import type { Command, ExecutionContext } from "@eclipse-docks/core";
import { commandRegistry } from "@eclipse-docks/core";
import type { ToolDefinition } from "../core/types";
import { sanitizeFunctionName } from "./tool-name-utils";

export class ToolRegistry {
    commandToTool(command: Command, context: ExecutionContext): ToolDefinition {
        const properties: Record<string, { type: string; description: string; enum?: string[] }> = {};
        const required: string[] = [];

        command.parameters?.forEach(param => {
            const sanitizedParamName = sanitizeFunctionName(param.name);
            properties[sanitizedParamName] = {
                type: param.type || "string",
                description: param.description,
                ...(param.allowedValues && { enum: param.allowedValues })
            };
            if (param.required === true) {
                required.push(sanitizedParamName);
            }
        });

        return {
            type: "function",
            function: {
                name: sanitizeFunctionName(command.id),
                description: String(command.description || command.name),
                parameters: { type: "object", properties, required }
            }
        };
    }

    getAvailableTools(
        context: ExecutionContext,
        commandFilter?: (command: Command, context: ExecutionContext) => boolean
    ): ToolDefinition[] {
        const availableCommands = commandRegistry.listCommands();
        let commandsArray = Object.values(availableCommands) as Command[];

        if (commandFilter) {
            commandsArray = commandsArray.filter(cmd => commandFilter(cmd, context));
        }

        return commandsArray.map(cmd => this.commandToTool(cmd, context));
    }
}
