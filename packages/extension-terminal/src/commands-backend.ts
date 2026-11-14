import {
  COMMAND_TAG_SHELL,
  commandHasTag,
  commandRegistry,
  explicitWorkspacePath,
  namesWorkspaceRoot,
  resolveWorkspacePath,
  stripWorkspacePath,
  workspaceService,
  type Command,
  type CommandRegistry,
  type CommandPrompt,
  type ExecutionContext,
} from '@eclipse-docks/core';
import { parseShellLine, rejectsBackgroundPipe } from './shell-parser';
import { LineInput } from './line-input';
import { terminalService } from './terminal-service';

export interface ShellJob {
  id: number;
  command: string;
}

export interface RunResult {
  success: boolean;
  results: unknown[];
  jobs: ShellJob[];
  cwd: string;
  error?: string;
}

export interface ShellRunOptions {
  cwd?: string;
  initialCwd?: string;
  readLine?: (prompt: string) => Promise<string | undefined>;
  ask?: (prompt: CommandPrompt) => Promise<string | undefined>;
  allocateJobId?: () => number;
  onJobStart?: (job: ShellJob) => void;
  onJobEnd?: (job: ShellJob & { result?: unknown; error?: string }) => void;
}

let jobSequence = 0;

function nextJobId(): number {
  jobSequence += 1;
  return jobSequence;
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

function applyShellCwd(
  command: Command,
  params: Record<string, unknown>,
  cwd: string,
  rootNames: readonly string[],
): string | null {
  if (!commandHasTag(command, COMMAND_TAG_SHELL) || command.id === 'cd' || command.id === 'cwd') {
    return null;
  }
  const pathParam = params.path;
  if (command.id === 'ls' && (pathParam === undefined || pathParam === '')) {
    if (cwd) params.path = explicitWorkspacePath(stripWorkspacePath(cwd));
    return null;
  }
  if (typeof pathParam !== 'string' || pathParam === '') return null;
  if (namesWorkspaceRoot(pathParam, rootNames)) {
    params.path = explicitWorkspacePath(stripWorkspacePath(pathParam));
    return null;
  }
  const resolved = resolveWorkspacePath(cwd, pathParam);
  if (resolved === null) return 'Cannot leave the workspace root.';
  params.path = explicitWorkspacePath(resolved);
  return null;
}

function isCdResult(commandId: string, value: unknown): value is { cwd: string } {
  return commandId === 'cd'
    && value !== null
    && typeof value === 'object'
    && typeof (value as { cwd?: unknown }).cwd === 'string';
}

export async function runShellLine(
  line: string,
  registry: CommandRegistry = commandRegistry,
  options: ShellRunOptions = {}
): Promise<RunResult> {
  let cwd = options.cwd ?? '';
  const initialCwd = options.initialCwd ?? cwd;
  const results: unknown[] = [];
  const jobs: ShellJob[] = [];

  if (rejectsBackgroundPipe(line)) {
    return { success: false, results, jobs, cwd, error: 'Cannot pipe a background command' };
  }

  const rootNames = (await workspaceService.getFolders()).map((folder) => folder.name);
  const segments = parseShellLine(line, registry);
  let pipedOutput: Record<string, unknown> | null = null;
  let lastProducerCommand: Command | undefined;
  const allocateJobId = options.allocateJobId ?? nextJobId;

  for (let i = 0; i < segments.length; i++) {
    const { command, operator } = segments[i];
    if (!command.commandId) continue;

    if (command.commandId === 'shell') {
      return { success: false, results, jobs, cwd, error: 'shell cannot call itself' };
    }

    const cmd = registry.hasCommand(command.commandId)
      ? registry.getCommand(command.commandId)
      : undefined;
    if (!cmd) {
      return {
        success: false,
        results,
        jobs,
        cwd,
        error: `Command not found: ${command.commandId}`,
      };
    }

    const mergedParams: Record<string, unknown> = {
      ...mapOutputToParams(pipedOutput ?? undefined, lastProducerCommand),
      ...command.params,
    };
    const pathError = applyShellCwd(cmd, mergedParams, cwd, rootNames);
    if (pathError) {
      return { success: false, results, jobs, cwd, error: pathError };
    }

    const background = operator === '&';
    const context: ExecutionContext = {
      ...registry.createExecutionContext(mergedParams),
      cwd,
      initialCwd,
      readLine: background ? undefined : options.readLine,
      ask: background ? undefined : options.ask,
    };

    const invocation = registry.execute(command.commandId, context);

    if (background) {
      const job: ShellJob = { id: allocateJobId(), command: command.commandId };
      jobs.push(job);
      options.onJobStart?.(job);
      void Promise.resolve(invocation).then(
        (result) => options.onJobEnd?.({ ...job, result }),
        (err: unknown) => options.onJobEnd?.({
          ...job,
          error: err instanceof Error ? err.message : String(err),
        }),
      );
      pipedOutput = null;
      lastProducerCommand = undefined;
      continue;
    }

    try {
      const resolved = await invocation;
      results.push(resolved);
      if (isCdResult(command.commandId, resolved)) {
        cwd = resolved.cwd;
      }
      if (operator === '|') {
        pipedOutput = mapOutputToParams(resolved, cmd) as Record<string, unknown>;
        lastProducerCommand = cmd;
      } else {
        pipedOutput = null;
        lastProducerCommand = undefined;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return { success: false, results, jobs, cwd, error: msg };
    }
  }

  return { success: true, results, jobs, cwd };
}

function formatValue(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
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
  private prompt = '/ > ';
  private cwd = '';
  private initialCwd = '';
  private readWait: ((line: string) => void) | null = null;
  private jobSequence = 0;
  private readonly creationOptions?: { cwd?: string };

  constructor(options?: { cwd?: string }) {
    this.creationOptions = options;
    this.cwd = options?.cwd ?? '';
    this.initialCwd = this.cwd;
    this.prompt = this.promptFor(this.cwd);
    this.lineInput = new LineInput((data) => this.emit(data));
  }

  onDidWrite(callback: (data: string) => void): () => void {
    this.writeCallbacks.add(callback);
    return () => this.writeCallbacks.delete(callback);
  }

  private emit(data: string): void {
    for (const cb of this.writeCallbacks) cb(data);
  }

  private promptFor(cwd: string): string {
    return `${cwd || '/'} > `;
  }

  private rememberCwd(cwd: string): void {
    const changed = cwd !== this.cwd;
    this.cwd = cwd;
    this.prompt = this.promptFor(cwd);
    if (!changed || !this.creationOptions) return;
    this.creationOptions.cwd = cwd;
    terminalService.persistNow();
  }

  async open(): Promise<void> {
    this.emit('Shell\r\nType commands (supports &&, |, and &). cd changes the directory. cwd prints it.\r\n\r\n' + this.prompt);
  }

  close(): void {
    this.lineInput.reset();
    this.readWait = null;
  }

  setDimensions(_dimensions: { cols: number; rows: number }): void {}

  handleInput(data: string): void {
    const line = this.lineInput.feed(data);
    if (line === null) return;
    if (this.readWait) {
      const wait = this.readWait;
      this.readWait = null;
      wait(line);
      return;
    }
    void this.runLine(line);
  }

  private readLine(prompt: string): Promise<string | undefined> {
    this.emit('\r\n' + prompt + ' ');
    return new Promise((resolve) => {
      this.readWait = (line) => resolve(line);
    });
  }

  private async runLine(line: string): Promise<void> {
    const trimmed = line.trim();
    if (!trimmed) {
      this.emit(this.prompt);
      return;
    }
    const result = await runShellLine(trimmed, commandRegistry, {
      cwd: this.cwd,
      initialCwd: this.initialCwd,
      readLine: (prompt) => this.readLine(prompt),
      allocateJobId: () => {
        this.jobSequence += 1;
        return this.jobSequence;
      },
      onJobStart: (job) => {
        this.emit(`\r\n[${job.id}] ${job.command}\r\n`);
      },
      onJobEnd: (job) => {
        const detail = job.error ? job.error : formatValue(job.result);
        this.emit(`\r\n[${job.id}] done${detail ? ' ' + detail : ''}\r\n`);
        this.lineInput.redraw(this.prompt);
      },
    });
    this.rememberCwd(result.cwd);
    this.emit(formatResult(result));
    this.emit(this.prompt);
  }
}
