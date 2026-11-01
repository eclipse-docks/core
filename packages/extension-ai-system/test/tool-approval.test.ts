import { describe, expect, it, vi } from 'vitest';
import { ToolBroker } from '../src/runtime/tools/broker';
import { classifyToolRisks } from '../src/runtime/specialists/classify-risk';
import type { ModelProvider, StreamChunk } from '../src/runtime/models/types';

describe('ToolBroker approval modes', () => {
  function brokerWithEcho() {
    const broker = new ToolBroker();
    broker.register(
      { name: 'workspace_list', description: 'list', parameters: { type: 'object', properties: {} } },
      async (call) => ({ id: call.id, name: call.name, ok: true, output: [] }),
    );
    broker.register(
      { name: 'workspace_write', description: 'write', parameters: { type: 'object', properties: {} } },
      async (call) => ({ id: call.id, name: call.name, ok: true, output: {}, mutating: true }),
    );
    return broker;
  }

  it('manual asks for every tool', () => {
    const broker = brokerWithEcho();
    broker.setApprovalMode('manual');
    expect(broker.resolveAction('workspace_list')).toBe('ask');
    expect(broker.resolveAction('workspace_write')).toBe('ask');
  });

  it('auto_safe uses agent risk classification', () => {
    const broker = brokerWithEcho();
    broker.setApprovalMode('auto_safe');
    expect(broker.resolveAction('workspace_list', 'safe')).toBe('allow');
    expect(broker.resolveAction('workspace_list', 'critical')).toBe('ask');
    expect(broker.resolveAction('workspace_write')).toBe('ask');
  });

  it('auto_all allows everything', () => {
    const broker = brokerWithEcho();
    broker.setApprovalMode('auto_all');
    expect(broker.resolveAction('workspace_list')).toBe('allow');
    expect(broker.resolveAction('workspace_write', 'critical')).toBe('allow');
  });

  it('prompts the permission handler only when action is ask', async () => {
    const broker = brokerWithEcho();
    broker.setApprovalMode('auto_safe');
    const handler = vi.fn(async () => 'allow' as const);
    broker.setPermissionHandler(handler);

    await broker.execute(
      { id: '1', name: 'workspace_list', arguments: {} },
      's1',
      'build',
      { risk: 'safe' },
    );
    expect(handler).not.toHaveBeenCalled();

    await broker.execute(
      { id: '2', name: 'workspace_write', arguments: { path: 'a' } },
      's1',
      'build',
      { risk: 'critical' },
    );
    expect(handler).toHaveBeenCalledOnce();
  });
});

describe('classifyToolRisks', () => {
  it('parses agent JSON and defaults unknown tools to critical', async () => {
    async function* stream(): AsyncIterable<StreamChunk> {
      yield {
        type: 'text',
        text: '[{"id":"a","risk":"safe"},{"id":"b","risk":"critical"}]',
      };
      yield { type: 'done' };
    }
    const provider: ModelProvider = {
      id: 'test',
      listModels: () => [],
      stream: () => stream(),
    };

    const risks = await classifyToolRisks({
      provider,
      model: 'test/model',
      tools: [
        { id: 'a', name: 'workspace_list', arguments: '{}' },
        { id: 'b', name: 'workspace_write', arguments: '{}' },
        { id: 'c', name: 'mystery', arguments: '{}' },
      ],
    });

    expect(risks.get('a')).toBe('safe');
    expect(risks.get('b')).toBe('critical');
    expect(risks.get('c')).toBe('critical');
  });
});
