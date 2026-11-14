import {
  COMMAND_TAG_SHELL,
  commandHasTag,
  commandRegistry,
  describeShellCommands,
  type Command,
} from '@eclipse-docks/core';
import { IMAGE_PRESENT_KEY } from '../attachments/attachments';
import type { ToolBroker, ToolCall, ToolResult } from './broker';
import { requestShellPrompt } from './shell-prompt';
import type { SpecialistRole } from '../types';

/** Commands that must never be exposed as LLM tools (pickers, storage boots, settings). */
const SKIP = new Set([
  'open_cognitive_ai_settings',
  'open_ai_config',
  'load_workspace',
  'disconnect_workspace',
  'disconnect_folder',
  'open_editor',
  'build_plan',
  'list_extensions',
  'enable_extension',
  'disable_extension',
]);

const SKIP_PREFIXES = ['disconnect_', 'install_', 'uninstall_'];

/** Built-in tools that must survive command refresh (not command-backed). */
const KEEP_TOOLS = new Set(['fetch', 'create_plan']);

/** Working directory of the shell tool, one per chat session. */
const shellSessions = new Map<string, string>();

function shellSegmentIds(line: string): string[] {
  return line
    .split(/\s*&&\s*|\s*&\s*|\s*\|\s*/)
    .map((segment) => segment.trim().split(/\s+/)[0] ?? '')
    .filter(Boolean);
}

function shellLineWrites(line: string): boolean {
  for (const id of shellSegmentIds(line)) {
    if (id === 'shell') return true;
    if (!commandRegistry.hasCommand(id)) continue;
    const command = commandRegistry.getCommand(id);
    if (command.grants?.includes('w')) return true;
    if (/delete|write|save|rm|mv|connect/i.test(command.id)) return true;
  }
  return false;
}

function commandLines(args: Record<string, unknown>): string[] {
  if (Array.isArray(args.commands)) {
    return args.commands.map((command) => String(command).trim()).filter(Boolean);
  }
  const script = typeof args.command === 'string' ? args.command : typeof args.line === 'string' ? args.line : '';
  return script.split(/\r?\n/).map((command) => command.trim()).filter(Boolean);
}

function resultRecords(value: unknown): unknown[] {
  if (!value || typeof value !== 'object') return [];
  const results = (value as { results?: unknown }).results;
  return Array.isArray(results) ? results : [];
}

function presentShellImage(output: unknown): unknown {
  if (!output || typeof output !== 'object') return output;
  const steps = (output as { commands?: Array<{ output?: unknown }> }).commands;
  const results = Array.isArray(steps)
    ? steps.flatMap((step) => resultRecords(step.output))
    : resultRecords(output);
  const dataUrl = results.find(
    (value) =>
      typeof value === 'string' &&
      value.startsWith('data:image/') &&
      !value.startsWith('data:image/svg'),
  );
  if (typeof dataUrl !== 'string') return output;
  return {
    ...(output as Record<string, unknown>),
    [IMAGE_PRESENT_KEY]: true,
    dataUrl,
    name: 'image',
    note: 'Image bytes will be provided to the model in the next message for vision inspection.',
  };
}

async function runShellCommand(
  line: string,
  cwd: string,
  explicitCwd: boolean,
  sessionId: string,
): Promise<unknown> {
  return commandRegistry.execute('shell', {
    params: explicitCwd ? { line, cwd } : { line },
    cwd: explicitCwd ? undefined : cwd,
    initialCwd: '',
    ask: (prompt) => requestShellPrompt({ sessionId, ...prompt }),
  });
}

function rememberedCwd(result: unknown, fallback: string): string {
  if (result && typeof result === 'object' && typeof (result as { cwd?: unknown }).cwd === 'string') {
    return (result as { cwd: string }).cwd;
  }
  return fallback;
}

async function executeShellTool(
  call: ToolCall,
  sessionId: string,
  role: SpecialistRole,
): Promise<ToolResult> {
  const commands = commandLines(call.arguments);
  if ((role === 'plan' || role === 'explore') && commands.some(shellLineWrites)) {
    return {
      id: call.id,
      name: call.name,
      ok: false,
      output: null,
      error: 'Plan and explore may only run shell verbs marked (r).',
    };
  }

  const explicitCwd = typeof call.arguments.cwd === 'string';
  let cwd = explicitCwd ? String(call.arguments.cwd) : (shellSessions.get(sessionId) ?? '');
  if (!commands.length) {
    const catalog = await runShellCommand('', cwd, false, sessionId);
    return { id: call.id, name: call.name, ok: true, output: catalog };
  }

  const steps: Array<{ command: string; ok: boolean; output: unknown; error?: string }> = [];
  for (let index = 0; index < commands.length; index++) {
    const command = commands[index]!;
    try {
      const output = await runShellCommand(command, cwd, index === 0 && explicitCwd, sessionId);
      cwd = rememberedCwd(output, cwd);
      shellSessions.set(sessionId, cwd);
      const failed = Boolean(output && typeof output === 'object' && (output as { success?: boolean }).success === false);
      const error = failed ? String((output as { error?: unknown }).error ?? 'Command failed') : undefined;
      steps.push({ command, ok: !failed, output, ...(error ? { error } : {}) });
      if (failed) break;
    } catch (err) {
      steps.push({
        command,
        ok: false,
        output: null,
        error: err instanceof Error ? err.message : String(err),
      });
      break;
    }
  }

  const failed = steps.some((step) => !step.ok);
  return {
    id: call.id,
    name: call.name,
    ok: !failed,
    output: presentShellImage({ cwd, commands: steps }),
    ...(failed ? { error: steps.find((step) => !step.ok)?.error } : {}),
    mutating: commands.some(shellLineWrites),
  };
}

function sanitizeName(id: string): string {
  return id.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 64);
}

function shouldSkipCommand(id: string): boolean {
  if (SKIP.has(id)) return true;
  return SKIP_PREFIXES.some((prefix) => id.startsWith(prefix));
}

/** Registers Docks commands as first-class LLM tools (tool name = command id). */
export function refreshCommandTools(broker: ToolBroker, role: SpecialistRole): void {
  for (const def of broker.listDefinitions('build')) {
    if (!KEEP_TOOLS.has(def.name)) broker.unregister(def.name);
  }

  const commands = commandRegistry.listCommands(commandRegistry.createExecutionContext());
  const entries = Object.values(commands) as Command[];

  for (const command of entries) {
    if (!command?.id || shouldSkipCommand(command.id)) continue;
    if (commandHasTag(command, COMMAND_TAG_SHELL)) continue;
    if (!command.description && command.id !== 'shell') continue;
    if ((role === 'plan' || role === 'explore') && /delete|write|save|rm|mv|connect/i.test(command.id)) continue;

    const toolName = sanitizeName(command.id);
    if (KEEP_TOOLS.has(toolName)) continue;

    const properties: Record<string, unknown> = {};
    const required: string[] = [];
    if (command.id === 'shell') {
      properties.commands = {
        type: 'array',
        items: { type: 'string' },
        description: 'Commands for this shell, in order. Each entry is one command, such as "ls" or "cat file".',
      };
      properties.cwd = {
        type: 'string',
        description: 'Directory for the first command. Omit to continue the shell.',
      };
      required.push('commands');
    } else {
      for (const p of command.parameters ?? []) {
        properties[p.name] = {
          type: p.type ?? 'string',
          description: p.description,
          ...(p.allowedValues ? { enum: p.allowedValues } : {}),
        };
        if (p.required) required.push(p.name);
      }
    }

    broker.register(
      {
        name: toolName,
        description: command.id === 'shell'
          ? `${describeShellCommands()}\nThis chat has one shell. Pass every command in commands; they run there in order and share its directory. Do not call shell once per command. cd with no path returns to the directory the shell was opened in. Verbs marked (r) only read. Verbs marked (w) create, change, or delete. When a command needs a name, a confirmation, or a choice, the chat asks; do not invent that answer.`
          : `${command.name}: ${command.description}`,
        parameters: { type: 'object', properties, required },
      },
      async (call, sessionId) => {
        try {
          if (command.id === 'shell') return await executeShellTool(call, sessionId, role);
          const result = await commandRegistry.execute(command.id, {
            params: call.arguments,
            ask: (prompt) => requestShellPrompt({ sessionId, ...prompt }),
          });
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
