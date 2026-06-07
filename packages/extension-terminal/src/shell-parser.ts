import type { CommandRegistry, Command } from '@eclipse-docks/core';

export interface ParsedCommand {
  commandId: string;
  params: Record<string, string | boolean>;
}

export interface ParsedSegment {
  command: ParsedCommand;
  operator: '&&' | '|' | null;
}

const NAMED_PARAM_REGEX = /^[a-zA-Z_][a-zA-Z0-9_]*=.*$/;

function tokenize(segment: string): string[] {
  const tokens: string[] = [];
  let i = 0;
  const len = segment.length;

  while (i < len) {
    while (i < len && /\s/.test(segment[i])) i++;
    if (i >= len) break;

    if (segment[i] === '"') {
      let end = i + 1;
      while (end < len && segment[end] !== '"') {
        if (segment[end] === '\\') end++;
        end++;
      }
      tokens.push(segment.slice(i + 1, end).replace(/\\"/g, '"'));
      i = end + 1;
    } else {
      let start = i;
      while (i < len && !/\s/.test(segment[i]) && segment[i] !== '"') i++;
      if (i > start) {
        tokens.push(segment.slice(start, i));
      }
    }
  }
  return tokens;
}

function splitChain(line: string): { segment: string; operator: '&&' | '|' | null }[] {
  const result: { segment: string; operator: '&&' | '|' | null }[] = [];
  const regex = /(\s*&&\s*|\s*\|\s*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(line)) !== null) {
    const segment = line.slice(lastIndex, match.index).trim();
    if (segment) {
      const op = match[0].includes('|') ? ('|' as const) : ('&&' as const);
      result.push({ segment, operator: op });
    }
    lastIndex = regex.lastIndex;
  }
  const tail = line.slice(lastIndex).trim();
  if (tail) {
    result.push({ segment: tail, operator: null });
  }
  return result;
}

function resolveParams(
  tokens: string[],
  command: Command | undefined
): Record<string, string | boolean> {
  const params: Record<string, string | boolean> = {};
  const positionals: string[] = [];
  const paramNames = command?.parameters?.map((p) => p.name) ?? [];

  for (const token of tokens) {
    if (NAMED_PARAM_REGEX.test(token)) {
      const eqIdx = token.indexOf('=');
      const name = token.slice(0, eqIdx);
      const value = token.slice(eqIdx + 1);
      params[name] = value === 'true' || value === 'false' ? value === 'true' : value;
    } else {
      positionals.push(token);
    }
  }

  paramNames.forEach((name, i) => {
    if (positionals[i] !== undefined && !(name in params)) {
      params[name] = positionals[i];
    }
  });

  return params;
}

export function parseShellLine(line: string, commandRegistry: CommandRegistry): ParsedSegment[] {
  const segments = splitChain(line);
  return segments.map(({ segment, operator }) => {
    const tokens = tokenize(segment);
    if (tokens.length === 0) {
      return { command: { commandId: '', params: {} }, operator };
    }
    const commandId = tokens[0];
    const command = commandRegistry.hasCommand(commandId)
      ? commandRegistry.getCommand(commandId)
      : undefined;
    const params = resolveParams(tokens.slice(1), command);
    return { command: { commandId, params }, operator };
  });
}
