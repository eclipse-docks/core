import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@eclipse-docks/core', () => ({
  COMMAND_TAG_SHELL: 'shell',
  commandHasTag: (command: { tags?: string[] } | undefined, tag: string) =>
    command?.tags?.includes(tag) === true,
  describeShellCommands: () => 'shell catalog',
  commandRegistry: {
    createExecutionContext: () => ({}),
    listCommands: () => ({
      canvas_open: {
        id: 'canvas.open',
        name: 'Open canvas',
        description: 'Open a canvas',
        parameters: [],
      },
      connect_opfs: {
        id: 'connect_opfs',
        name: 'OPFS',
        description: 'Connect OPFS workspace',
        parameters: [],
      },
      load_workspace: {
        id: 'load_workspace',
        name: 'Local Folder',
        description: 'Pick a folder',
        parameters: [],
      },
      format_document: {
        id: 'format_document',
        name: 'Format',
        description: 'Format the document',
        parameters: [],
      },
    }),
    execute: vi.fn(),
  },
}));

import { commandRegistry } from '@eclipse-docks/core';
import { ToolBroker } from '../src/runtime/tools/broker';
import { refreshCommandTools } from '../src/runtime/tools/command-adapter';

describe('refreshCommandTools', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('keeps workspace/fetch tools and skips storage bootstrap commands', async () => {
    const broker = new ToolBroker();
    broker.register(
      {
        name: 'workspace_read',
        description: 'read',
        parameters: { type: 'object', properties: {} },
      },
      async (call) => ({ id: call.id, name: call.name, ok: true, output: '' }),
    );
    broker.register(
      {
        name: 'fetch',
        description: 'fetch',
        parameters: { type: 'object', properties: {} },
      },
      async (call) => ({ id: call.id, name: call.name, ok: true, output: '' }),
    );

    refreshCommandTools(broker, 'build');

    const names = broker.listDefinitions('build').map((d) => d.name);
    expect(names).not.toContain('workspace_read');
    expect(names).toContain('fetch');
    expect(names).toContain('canvas_open');
    expect(names).toContain('format_document');
    expect(names).toContain('connect_opfs');
    expect(names).not.toContain('load_workspace');

    await broker.execute(
      { id: '1', name: 'canvas_open', arguments: {} },
      'chat',
      'build',
      { risk: 'safe' },
    );
    expect(commandRegistry.execute).toHaveBeenCalledWith(
      'canvas.open',
      expect.objectContaining({ ask: expect.any(Function) }),
    );
  });
});
