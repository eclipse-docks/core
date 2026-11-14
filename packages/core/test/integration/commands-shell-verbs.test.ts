import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const promptDialog = vi.fn(async (..._args: unknown[]) => undefined);
const confirmDialog = vi.fn(async (..._args: unknown[]) => false);

vi.mock('../../src/dialogs', () => ({
  promptDialog: (...args: unknown[]) => promptDialog(...args),
  confirmDialog: (...args: unknown[]) => confirmDialog(...args),
}));

vi.mock('../../src/core/toast', () => ({
  toastError: vi.fn(),
  toastInfo: vi.fn(),
}));
import { COMMAND_TAG_SHELL, commandRegistry, describeShellCommands } from '../../src/core/commandregistry';
import { File, getInMemoryRoot } from '../../src/core/filesys';
import { askChoice, askText, askYes } from '../../src/commands/prompt';
import '../../src/commands/cat';
import '../../src/commands/cd';
import '../../src/commands/cwd';
import '../../src/commands/exists';
import '../../src/commands/head';
import '../../src/commands/ls';
import '../../src/commands/mkdir';
import '../../src/commands/mv';
import '../../src/commands/rm';
import '../../src/commands/tail';
import '../../src/commands/touch';
import '../../src/commands/wc';
import '../../src/commands/wget';

const READ_ONLY = ['ls', 'cat', 'head', 'tail', 'wc', 'exists', 'cwd', 'cd'];
const READ_WRITE = ['mkdir', 'mv', 'rm', 'touch', 'wget'];

describe('shell verb registration', () => {
  it('lists positional parameters in the order a shell line fills them', () => {
    const catalog = describeShellCommands();
    expect(catalog).toContain('Positional arguments fill parameters in the order shown');
    expect(catalog).toContain('head (r) path [lines:number]:');
    expect(catalog).toContain('ls (r) [path] [recursive:boolean]:');
  });

  it('tags filesystem verbs and leaves shell itself unregistered in core', () => {
    for (const id of READ_ONLY) {
      const command = commandRegistry.getCommand(id);
      expect(command.tags).toEqual([COMMAND_TAG_SHELL]);
      expect(command.grants).toEqual(['r']);
    }
    for (const id of READ_WRITE) {
      const command = commandRegistry.getCommand(id);
      expect(command.tags).toEqual([COMMAND_TAG_SHELL]);
      expect(command.grants).toEqual(['w']);
    }
    expect(commandRegistry.hasCommand('shell')).toBe(false);
  });

  it('cat reads an in-memory file that is not mounted in the workspace', async () => {
    const root = getInMemoryRoot();
    const name = `note-${Date.now()}.txt`;
    const created = await root.getResource(name, { create: true });
    expect(created).toBeInstanceOf(File);
    await (created as File).saveContents('from-memory');
    const text = await commandRegistry.execute('cat', { params: { path: `in-memory/${name}` } });
    expect(text).toBe('from-memory');
  });
});

describe('cd and cwd', () => {
  beforeEach(async () => {
    const { workspaceService } = await import('../../src/core/filesys');
    await workspaceService.disconnectWorkspace();
  });

  it('cd joins a directory, rejects missing paths and .. above the root, and cwd prints it', async () => {
    const { workspaceService } = await import('../../src/core/filesys');
    const name = `cd-${Date.now()}`;
    await workspaceService.connectFolder({ indexeddb: true, name });

    const missing = await commandRegistry.execute('cd', {
      cwd: '',
      initialCwd: '',
      params: { path: 'missing' },
    });
    expect(missing).toBeUndefined();

    const entered = await commandRegistry.execute('cd', {
      cwd: '',
      initialCwd: '',
      params: { path: name },
    });
    expect(entered).toEqual({ cwd: name });

    const fromElsewhere = await commandRegistry.execute('cd', {
      cwd: 'other',
      initialCwd: '',
      params: { path: name },
    });
    expect(fromElsewhere).toEqual({ cwd: name });

    const printed = await commandRegistry.execute('cwd', { cwd: name, params: {} });
    expect(printed).toBe(name);

    const root = await commandRegistry.execute('cwd', { cwd: '', params: {} });
    expect(root).toBe('/');

    const escaped = await commandRegistry.execute('cd', {
      cwd: name,
      initialCwd: '',
      params: { path: '../..' },
    });
    expect(escaped).toBeUndefined();

    const home = await commandRegistry.execute('cd', {
      cwd: `${name}/nested`,
      initialCwd: name,
      params: {},
    });
    expect(home).toEqual({ cwd: name });

    const noSession = await commandRegistry.execute('cd', { params: { path: name } });
    expect(noSession).toBeUndefined();
  });
});

describe('terminal prompts', () => {
  it('reads mkdir and rm answers from readLine and keeps dialogs when it is absent', async () => {
    const { workspaceService } = await import('../../src/core/filesys');
    await workspaceService.disconnectWorkspace();
    const name = `prompt-${Date.now()}`;
    await workspaceService.connectFolder({ indexeddb: true, name });
    const folder = `${name}/notes`;
    const file = `${folder}/a.txt`;
    const prompts: string[] = [];

    const created = await commandRegistry.execute('mkdir', {
      params: {},
      readLine: async (message: string) => {
        prompts.push(message);
        return folder;
      },
    });
    expect(created).toBe(folder);
    expect(prompts[0]).toContain('folder');

    await commandRegistry.execute('touch', {
      params: { path: file, contents: 'hi' },
    });

    const kept = await commandRegistry.execute('rm', {
      params: { path: file },
      readLine: async (message: string) => {
        prompts.push(message);
        return 'n';
      },
    });
    expect(kept).toBeUndefined();
    expect(prompts.at(-1)).toContain('1. Yes');
    expect(prompts.at(-1)).toContain('2. No');

    const workspace = await workspaceService.getWorkspace();
    expect(await workspace?.getResource(file)).toBeTruthy();

    await commandRegistry.execute('rm', {
      params: { path: file, confirm: false },
    });
    expect(await workspace?.getResource(file)).toBeFalsy();

    const text = await askText({ readLine: async () => '' }, 'name');
    expect(text).toBeUndefined();
    expect(await askYes({ readLine: async () => 'y' }, 'overwrite')).toBe(true);
    expect(await askYes({ readLine: async () => 'n' }, 'overwrite')).toBe(false);

    promptDialog.mockClear();
    const asked = await commandRegistry.execute('mkdir', {
      params: {},
      ask: async (prompt) => (prompt.kind === 'text' ? `${name}/from-ask` : undefined),
      readLine: async () => 'should-not-run',
    });
    expect(asked).toBe(`${name}/from-ask`);
    expect(promptDialog).not.toHaveBeenCalled();
    const yes = await askYes({
      ask: async (prompt) => {
        expect(prompt).toMatchObject({
          kind: 'choice',
          choices: ['Yes', 'No'],
          defaultValue: 'No',
          custom: false,
        });
        return 'Yes';
      },
    }, 'overwrite');
    expect(yes).toBe(true);
    expect(await askYes({ ask: async () => 'n', readLine: async () => 'y' }, 'overwrite')).toBe(false);

    const picked = await askChoice(
      { ask: async (prompt) => prompt.choices?.[0] },
      'Workspace directory to save into:',
      ['IndexedDB', 'notes'],
    );
    expect(picked).toBe('IndexedDB');
    const numbered = await askChoice(
      { readLine: async (prompt) => (prompt.includes('1. IndexedDB') ? '2' : '') },
      'Workspace directory to save into:',
      ['IndexedDB', 'notes'],
    );
    expect(numbered).toBe('notes');
    const typed = await askChoice(
      { readLine: async () => 'elsewhere' },
      'Workspace directory to save into:',
      ['IndexedDB', 'notes'],
    );
    expect(typed).toBe('elsewhere');

    promptDialog.mockClear();
    promptDialog.mockResolvedValueOnce(undefined);
    await commandRegistry.execute('mkdir', { params: {} });
    expect(promptDialog).toHaveBeenCalled();
    expect(confirmDialog).not.toHaveBeenCalled();
  });
});
