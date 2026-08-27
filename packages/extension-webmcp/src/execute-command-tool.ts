import { commandRegistry, createLogger, type Command } from "@eclipse-docks/core";
import { sanitizeFunctionName } from "@eclipse-docks/extension-ai-system/api";

const logger = createLogger("WebMCP");

function normalizeToolInput(inputObject: unknown): Record<string, unknown> {
  if (inputObject == null) {
    return {};
  }

  if (typeof inputObject === "string") {
    try {
      const parsed: unknown = JSON.parse(inputObject);
      return normalizeToolInput(parsed);
    } catch {
      return {};
    }
  }

  if (typeof inputObject !== "object" || Array.isArray(inputObject)) {
    return {};
  }

  const record = inputObject as Record<string, unknown>;
  if (
    "params" in record &&
    record.params != null &&
    typeof record.params === "object" &&
    !Array.isArray(record.params)
  ) {
    return record.params as Record<string, unknown>;
  }

  return record;
}

function sanitizeArguments(
  args: Record<string, unknown>,
  command: Command | undefined
): Record<string, unknown> {
  if (!command?.parameters?.length) {
    return args;
  }

  const sanitizedArgs: Record<string, unknown> = {};
  for (const param of command.parameters) {
    const sanitizedParamName = sanitizeFunctionName(param.name);
    if (sanitizedParamName in args) {
      sanitizedArgs[param.name] = args[sanitizedParamName];
      continue;
    }
    if (param.name in args) {
      sanitizedArgs[param.name] = args[param.name];
    }
  }
  return sanitizedArgs;
}

function formatCommandResult(result: unknown): unknown {
  if (result === undefined || result === null) {
    return "Done";
  }
  return result;
}

export async function executeCommandTool(
  commandId: string,
  inputObject: unknown,
  signal?: AbortSignal
): Promise<unknown> {
  if (signal?.aborted) {
    throw signal.reason ?? new DOMException("The tool execution was aborted.", "AbortError");
  }

  const command = commandRegistry.getCommand(commandId);
  const args = sanitizeArguments(normalizeToolInput(inputObject), command);
  const execContext = commandRegistry.createExecutionContext(args);

  try {
    const result = await commandRegistry.execute(commandId, execContext);

    if (signal?.aborted) {
      throw signal.reason ?? new DOMException("The tool execution was aborted.", "AbortError");
    }

    return formatCommandResult(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    logger.error(`Command "${commandId}" failed: ${message}`);
    throw error instanceof Error ? error : new Error(message);
  }
}
