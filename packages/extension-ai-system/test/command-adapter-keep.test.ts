import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@eclipse-docks/core', () => ({
  commandRegistry: {
    createExecutionContext: () => ({}),
    listCommands: () => ({
      canvas_help: {
        id: 'canvas.help',
        name: 'Canvas help',
        description: 'Show canvas help',
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

import { ToolBroker } from '../src/runtime/tools/broker';
import { refreshCommandTools } from '../src/runtime/tools/command-adapter';

describe('refreshCommandTools', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('keeps workspace tools and skips storage bootstrap commands', () => {
    const broker = new ToolBroker();
    broker.register(
      {
        name: 'workspace_read',
        description: 'read',
        parameters: { type: 'object', properties: {} },
      },
      async (call) => ({ id: call.id, name: call.name, ok: true, output: '' }),
    );

    refreshCommandTools(broker, 'build');

    const names = broker.listDefinitions('build').map((d) => d.name);
    expect(names).toContain('workspace_read');
    expect(names).toContain('canvas_help');
    expect(names).toContain('format_document');
    expect(names).not.toContain('connect_opfs');
    expect(names).not.toContain('load_workspace');
  });
});
