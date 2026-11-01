import { commandRegistry } from '@eclipse-docks/core';
import type { ToolBroker } from './broker';
import type { SpecialistRole } from '../types';

const SKIP = new Set(['open_cognitive_ai_settings', 'open_ai_config']);
const BUILTIN_TOOLS = new Set(['workspace_list', 'workspace_read', 'workspace_write']);

function sanitizeName(id: string): string {
  return id.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 64);
}

/** Registers Docks commands as first-class LLM tools (tool name = command id). */
export function refreshCommandTools(broker: ToolBroker, role: SpecialistRole): void {
  for (const def of broker.listDefinitions('build')) {
    if (!BUILTIN_TOOLS.has(def.name)) broker.unregister(def.name);
  }

  const commands = commandRegistry.listCommands();
  const entries = Object.values(commands) as Array<{
    id: string;
    name: string;
    description: string;
    parameters?: Array<{ name: string; description: string; type?: string; required: boolean; allowedValues?: string[] }>;
  }>;

  for (const command of entries) {
    if (!command?.id || SKIP.has(command.id)) continue;
    if (!command.description) continue;
    if ((role === 'plan' || role === 'explore') && /delete|write|save|rm|mv/i.test(command.id)) continue;

    const toolName = sanitizeName(command.id);
    if (BUILTIN_TOOLS.has(toolName)) continue;

    const properties: Record<string, unknown> = {};
    const required: string[] = [];
    for (const p of command.parameters ?? []) {
      properties[p.name] = {
        type: p.type ?? 'string',
        description: p.description,
        ...(p.allowedValues ? { enum: p.allowedValues } : {}),
      };
      if (p.required) required.push(p.name);
    }

    broker.register(
      {
        name: toolName,
        description: `${command.name}: ${command.description}`,
        parameters: { type: 'object', properties, required },
      },
      async (call, _sessionId) => {
        try {
          const result = await commandRegistry.execute(command.id, { params: call.arguments });
          return { id: call.id, name: call.name, ok: true, output: result };
        } catch (err) {
          return {
            id: call.id,
            name: call.name,
            ok: false,
            output: null,
            error: err instanceof Error ? err.message : String(err),
          };
        }
      },
    );
  }
}
