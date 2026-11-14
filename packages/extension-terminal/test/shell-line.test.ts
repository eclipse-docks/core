import { CommandRegistry, COMMAND_TAG_SHELL, commandRegistry, workspaceService } from '@eclipse-docks/core';
import { describe, expect, it, vi } from 'vitest';
import { CommandsBackend, runShellLine } from '../src/commands-backend';
import '../src/shell-command';
import { parseShellLine, rejectsBackgroundPipe } from '../src/shell-parser';

function registry(): CommandRegistry {
  return new CommandRegistry();
}

describe('parseShellLine', () => {
  it('splits sequences, background, and quoted paths', () => {
    const commands = registry();
    const chain = parseShellLine('cd src && ls', commands);
    expect(chain.map((segment) => segment.command.commandId)).toEqual(['cd', 'ls']);
    expect(chain[0].operator).toBe('&&');
    expect(chain[1].operator).toBeNull();

    const background = parseShellLine('cmd & next', commands);
    expect(background[0].operator).toBe('&');
    expect(background[1].operator).toBeNull();

    const sequence = parseShellLine('a && b', commands);
    expect(sequence[0].operator).toBe('&&');

    const quoted = parseShellLine('ls "my file.txt"', commands);
    expect(quoted[0].command.params).toEqual({});
    expect(quoted[0].command.commandId).toBe('ls');
  });

  it('keeps a quoted path as one positional parameter', () => {
    const commands = registry();
    commands.registerAll({
      command: {
        id: 'ls',
        name: 'ls',
        description: 'list',
        parameters: [{ name: 'path', description: 'path', required: false }],
      },
    });
    const parsed = parseShellLine('ls "my file.txt"', commands);
    expect(parsed[0].command.params.path).toBe('my file.txt');
    expect(rejectsBackgroundPipe('cmd & | next')).toBe(true);
    expect(rejectsBackgroundPipe('ls | head &')).toBe(false);
  });
});

describe('runShellLine', () => {
  it('runs a cd chain in one cwd and still runs untagged commands', async () => {
    const commands = registry();
    commands.registerAll({
      command: {
        id: 'cd',
        name: 'cd',
        description: 'cd',
        tags: [COMMAND_TAG_SHELL],
        grants: ['r'],
        parameters: [{ name: 'path', description: 'path', required: false }],
      },
      handler: {
        execute: (context) => ({ cwd: String(context.params?.path ?? '') }),
      },
    });
    commands.registerAll({
      command: {
        id: 'ls',
        name: 'ls',
        description: 'ls',
        tags: [COMMAND_TAG_SHELL],
        grants: ['r'],
        parameters: [{ name: 'path', description: 'path', required: false }],
      },
      handler: { execute: (context) => context.params?.path },
    });
    commands.registerAll({
      command: {
        id: 'mkdir',
        name: 'mkdir',
        description: 'mkdir',
        tags: [COMMAND_TAG_SHELL],
        grants: ['w'],
        parameters: [{ name: 'path', description: 'path', required: false }],
      },
      handler: { execute: (context) => context.params?.path },
    });
    commands.registerAll({
      command: {
        id: 'open_editor',
        name: 'Open',
        description: 'open',
        parameters: [{ name: 'path', description: 'path', required: false }],
      },
      handler: { execute: (context) => context.params?.path },
    });
    commands.registerAll({
      command: { id: 'shell', name: 'Shell', description: 'shell' },
      handler: { execute: () => 'nested' },
    });

    const result = await runShellLine('cd src && ls && mkdir components', commands, { cwd: '' });
    expect(result.success).toBe(true);
    expect(result.results).toEqual([{ cwd: 'src' }, '/src', '/src/components']);
    expect(result.cwd).toBe('src');

    const opened = await runShellLine('open_editor readme.md', commands, { cwd: 'src' });
    expect(opened.results).toEqual(['readme.md']);

    const nested = await runShellLine('shell ls', commands);
    expect(nested.success).toBe(false);
    expect(nested.error).toContain('itself');
  });

  it('keeps a connected root path at the workspace root when the shell is in another folder', async () => {
    await workspaceService.disconnectWorkspace();
    const name = `root-${Date.now()}`;
    await workspaceService.connectFolder({ indexeddb: true, name });
    const commands = registry();
    commands.registerAll({
      command: {
        id: 'ls',
        name: 'ls',
        description: 'ls',
        tags: [COMMAND_TAG_SHELL],
        grants: ['r'],
        parameters: [{ name: 'path', description: 'path', required: false }],
      },
      handler: { execute: (context) => context.params?.path },
    });

    const rooted = await runShellLine(`ls ${name}`, commands, { cwd: 'other' });
    expect(rooted.results).toEqual([`/${name}`]);

    const relative = await runShellLine('ls file.txt', commands, { cwd: 'other' });
    expect(relative.results).toEqual(['/other/file.txt']);
  });

  it('asks the host for a foreground command and skips a background command', async () => {
    const commands = registry();
    commands.registerAll({
      command: { id: 'mkdir', name: 'mkdir', description: 'mkdir', tags: [COMMAND_TAG_SHELL], grants: ['w'] },
      handler: {
        execute: async (context) => context.ask?.({ kind: 'text', message: 'folder', defaultValue: 'notes' }) ?? 'none',
      },
    });

    const asked = await runShellLine('mkdir', commands, {
      ask: async (prompt) => prompt.defaultValue,
    });
    expect(asked.results).toEqual(['notes']);

    let askedInBackground = false;
    const background = await runShellLine('mkdir &', commands, {
      ask: async () => {
        askedInBackground = true;
        return 'x';
      },
    });
    expect(background.success).toBe(true);
    expect(background.jobs.map((job) => job.command)).toEqual(['mkdir']);
    expect(askedInBackground).toBe(false);
  });

  it('starts a background command without waiting for it or cancelling the rest', async () => {
    const commands = registry();
    let fail = false;
    let release: (value: string) => void = () => {};
    const pending = new Promise<string>((resolve) => {
      release = resolve;
    });
    commands.registerAll({
      command: {
        id: 'wget',
        name: 'wget',
        description: 'wget',
        tags: [COMMAND_TAG_SHELL],
        grants: ['w'],
        parameters: [{ name: 'url', description: 'url', required: true }],
      },
      handler: {
        execute: () => {
          if (fail) return Promise.reject(new Error('download failed'));
          return pending;
        },
      },
    });
    commands.registerAll({
      command: {
        id: 'ls',
        name: 'ls',
        description: 'ls',
        tags: [COMMAND_TAG_SHELL],
        grants: ['r'],
      },
      handler: { execute: () => 'listed' },
    });

    const started = await runShellLine('wget http://example.com & ls', commands, {
      allocateJobId: () => 1,
    });
    expect(started.success).toBe(true);
    expect(started.results).toEqual(['listed']);
    expect(started.jobs).toEqual([{ id: 1, command: 'wget' }]);
    release('done');

    fail = true;
    const failed = await runShellLine('wget http://example.com & ls', commands, {
      allocateJobId: () => 2,
    });
    expect(failed.success).toBe(true);
    expect(failed.results).toEqual(['listed']);
    await Promise.resolve();

    const piped = await runShellLine('cmd & | next', commands);
    expect(piped.success).toBe(false);
  });

  it('waits for a producer that is piped into a background command', async () => {
    const commands = registry();
    let release: (value: string) => void = () => {};
    const pending = new Promise<string>((resolve) => {
      release = resolve;
    });
    commands.registerAll({
      command: {
        id: 'ls',
        name: 'ls',
        description: 'ls',
        tags: [COMMAND_TAG_SHELL],
        grants: ['r'],
        output: [{ name: 'text', description: 'text' }],
      },
      handler: { execute: () => 'listed' },
    });
    commands.registerAll({
      command: {
        id: 'head',
        name: 'head',
        description: 'head',
        tags: [COMMAND_TAG_SHELL],
        grants: ['r'],
        parameters: [{ name: 'text', description: 'text', required: false }],
      },
      handler: { execute: () => pending },
    });

    const started = await runShellLine('ls | head &', commands, { allocateJobId: () => 3 });
    expect(started.success).toBe(true);
    expect(started.results).toEqual(['listed']);
    expect(started.jobs).toEqual([{ id: 3, command: 'head' }]);
    release('done');
  });

  it('does not let a background cd change the rest of the line', async () => {
    const commands = registry();
    commands.registerAll({
      command: {
        id: 'cd',
        name: 'cd',
        description: 'cd',
        tags: [COMMAND_TAG_SHELL],
        grants: ['r'],
        parameters: [{ name: 'path', description: 'path', required: false }],
      },
      handler: { execute: () => ({ cwd: 'elsewhere' }) },
    });
    commands.registerAll({
      command: {
        id: 'ls',
        name: 'ls',
        description: 'ls',
        tags: [COMMAND_TAG_SHELL],
        grants: ['r'],
        parameters: [{ name: 'path', description: 'path', required: false }],
      },
      handler: { execute: (context) => context.params?.path },
    });

    const stayed = await runShellLine('cd elsewhere & ls', commands, {
      cwd: 'src',
      allocateJobId: () => 4,
    });
    expect(stayed.success).toBe(true);
    expect(stayed.cwd).toBe('src');
    expect(stayed.results).toEqual(['/src']);
    expect(stayed.jobs).toEqual([{ id: 4, command: 'cd' }]);
  });
});

describe('shell command', () => {
  it('returns the verb catalog for an empty line and runs a workflow as one call', async () => {
    const shell = commandRegistry.getCommand('shell');
    expect(shell.tags).toBeUndefined();
    expect(shell.grants).toBeUndefined();

    const catalog = await commandRegistry.execute('shell', { params: {} });
    expect(String(catalog)).toContain('ls (r)');
    expect(String(catalog)).toContain('mkdir (w)');
    expect(String(catalog)).toContain('&&');

    const ran = await commandRegistry.execute('shell', {
      params: { line: 'cwd && cwd', cwd: 'src' },
    });
    expect(ran).toMatchObject({ success: true, results: ['src', 'src'], cwd: 'src' });
  });
});

describe('CommandsBackend', () => {
  it('opens as Shell in the given directory', async () => {
    const backend = new CommandsBackend({ cwd: 'IndexedDB' });
    let output = '';
    backend.onDidWrite((data) => {
      output += data;
    });
    await backend.open();
    expect(output).toContain('Shell');
    expect(output).toContain('cd');
    expect(output).toContain('cwd');
    expect(output).toContain('IndexedDB > ');
  });

  it('cd updates the prompt and the persisted working directory', async () => {
    await workspaceService.disconnectWorkspace();
    const name = `shell-${Date.now()}`;
    await workspaceService.connectFolder({ indexeddb: true, name });

    const options: { cwd?: string } = { cwd: '' };
    const backend = new CommandsBackend(options);
    let output = '';
    backend.onDidWrite((data) => {
      output += data;
    });
    await backend.open();
    backend.handleInput(`cd ${name}`);
    backend.handleInput('\r');

    await vi.waitFor(() => {
      expect(output).toContain(`${name} > `);
    });
    expect(options.cwd).toBe(name);
  });
});
