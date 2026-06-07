import { commandRegistry, type CommandRegistry, type Command } from '@eclipse-docks/core';
import { parseShellLine } from './shell-parser';
import { LineInput } from './line-input';

export interface RunResult {
  success: boolean;
  results: unknown[];
  error?: string;
}

function mapOutputToParams(
  output: unknown,
  producerCommand: Command | undefined
): Record<string, unknown> {
  if (output == null) return {};
  if (typeof output === 'object' && !Array.isArray(output)) {
    return output as Record<string, unknown>;
  }
  const firstOutput = producerCommand?.output?.[0];
  if (firstOutput) {
    return { [firstOutput.name]: output };
  }
  return {};
}

export async function runShellLine(
  line: string,
  registry: CommandRegistry = commandRegistry
): Promise<RunResult> {
  const segments = parseShellLine(line, registry);
  const results: unknown[] = [];
  let pipedOutput: Record<string, unknown> | null = null;
  let lastProducerCommand: Command | undefined;

  for (let i = 0; i < segments.length; i++) {
    const { command, operator } = segments[i];
    if (!command.commandId) continue;

    const cmd = registry.hasCommand(command.commandId)
      ? registry.getCommand(command.commandId)
      : undefined;
    if (!cmd) {
      return {
        success: false,
        results,
        error: `Command not found: ${command.commandId}`,
      };
    }

    const mergedParams = {
      ...mapOutputToParams(pipedOutput ?? undefined, lastProducerCommand),
      ...command.params,
    };

    const context = registry.createExecutionContext(mergedParams);

    try {
      const result = registry.execute(command.commandId, context);
      const resolved = result instanceof Promise ? await result : result;
      results.push(resolved);

      if (operator === '|') {
        pipedOutput = mapOutputToParams(resolved, cmd) as Record<string, unknown>;
        lastProducerCommand = cmd;
      } else {
        pipedOutput = null;
        lastProducerCommand = undefined;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return { success: false, results, error: msg };
    }
  }

  return { success: true, results };
}

function formatResult(result: RunResult): string {
  if (result.error) return `\r\n\x1b[31m${result.error}\x1b[0m\r\n`;
  if (result.results.length === 0) return '';
  const last = result.results[result.results.length - 1];
  if (last == null) return '';
  if (typeof last === 'object') return JSON.stringify(last, null, 2) + '\r\n';
  return String(last) + '\r\n';
}

export class CommandsBackend {
  private writeCallbacks = new Set<(data: string) => void>();
  private lineInput: LineInput;
  private prompt = '> ';

  constructor() {
    this.lineInput = new LineInput((data) => this.emit(data));
  }

  onDidWrite(callback: (data: string) => void): () => void {
    this.writeCallbacks.add(callback);
    return () => this.writeCallbacks.delete(callback);
  }

  private emit(data: string): void {
    for (const cb of this.writeCallbacks) cb(data);
  }

  async open(): Promise<void> {
    this.emit('Commands\r\nType commands (supports && and |)\r\n\r\n' + this.prompt);
  }

  close(): void {
    this.lineInput.reset();
  }

  setDimensions(_dimensions: { cols: number; rows: number }): void {}

  handleInput(data: string): void {
    const line = this.lineInput.feed(data);
    if (line === null) return;
    void this.runLine(line);
  }

  private async runLine(line: string): Promise<void> {
    const trimmed = line.trim();
    if (!trimmed) {
      this.emit(this.prompt);
      return;
    }
    const result = await runShellLine(trimmed);
    this.emit(formatResult(result));
    this.emit(this.prompt);
  }
}
