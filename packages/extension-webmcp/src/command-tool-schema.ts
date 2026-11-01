import type { Command } from '@eclipse-docks/core';

export interface CommandToolSchema {
  name: string;
  description: string;
  parameters: {
    type: 'object';
    properties: Record<string, { type: string; description: string; enum?: string[] }>;
    required: string[];
  };
}

/** Sanitize names for OpenAI-style function/parameter ids. */
export function sanitizeFunctionName(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .replace(/^[^a-zA-Z]/, 'cmd_$&')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

/** Map a Docks command to a flat tool schema for WebMCP. */
export function commandToToolSchema(command: Command): CommandToolSchema {
  const properties: CommandToolSchema['parameters']['properties'] = {};
  const required: string[] = [];

  for (const param of command.parameters ?? []) {
    const sanitizedParamName = sanitizeFunctionName(param.name);
    properties[sanitizedParamName] = {
      type: param.type || 'string',
      description: param.description,
      ...(param.allowedValues ? { enum: param.allowedValues } : {}),
    };
    if (param.required === true) required.push(sanitizedParamName);
  }

  return {
    name: sanitizeFunctionName(command.id),
    description: String(command.description || command.name || command.id),
    parameters: { type: 'object', properties, required },
  };
}
