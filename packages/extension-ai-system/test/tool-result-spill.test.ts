/**
 * @vitest-environment jsdom
 */
import { getInMemoryRoot } from '@eclipse-docks/core';
import { afterEach, describe, expect, it } from 'vitest';
import { estimateSessionContextUsage } from '../src/runtime/context/usage';
import { emptyBuffers } from '../src/runtime/core/tick';
import { historyToProviderMessages } from '../src/runtime/specialists/loop';
import { removeSessionWorkspaceFolder } from '../src/runtime/attachments/session-workspace';
import {
  TOOL_RESULT_SPILL_CHARS,
  publishSpilledToolResults,
  toolArgsSpillPath,
  toolResultSpillPath,
} from '../src/runtime/compact/tool-result-spill';
import type { ChatMessage, CognitiveSession } from '../src/runtime/types';

const SESSION = 'sess-spill';

function assistantWithResult(result: unknown): ChatMessage {
  return {
    id: 'm1',
    role: 'assistant',
    createdAt: 1,
    parts: [
      {
        type: 'tool',
        id: 'call-1',
        name: 'workspace_read',
        args: { path: 'notes/a.txt' },
        result,
        status: 'done',
      },
      { type: 'text', text: 'done' },
    ],
  };
}

afterEach(async () => {
  await removeSessionWorkspaceFolder(SESSION);
});

describe('tool result spill', () => {
  it('leaves small tool results inline and does not change the stored result', () => {
    const message = assistantWithResult({ content: 'short' });
    const stored = (message.parts[0] as { result: unknown }).result;
    const messages = historyToProviderMessages('sys', [message], undefined, SESSION);
    const tool = messages.find((m) => m.role === 'tool');
    expect(tool?.content).toBe(JSON.stringify({ content: 'short' }));
    expect((message.parts[0] as { result: unknown }).result).toBe(stored);
  });

  it('rewrites a large result to a path and republishes the body on reload', async () => {
    const body = 'x'.repeat(TOOL_RESULT_SPILL_CHARS + 50);
    const message = assistantWithResult({ content: body });
    const messages = historyToProviderMessages('sys', [message], undefined, SESSION);
    const tool = messages.find((m) => m.role === 'tool');
    const path = toolResultSpillPath(SESSION, 'call-1');

    expect(typeof tool?.content).toBe('string');
    expect(tool?.content).toContain(`workspace_read path="${path}"`);
    expect(tool?.content).toContain('Preview:');
    expect(tool?.content).not.toContain(body);
    expect((message.parts[0] as { result: { content: string } }).result.content).toBe(body);

    await publishSpilledToolResults(SESSION, [message]);
    const root = getInMemoryRoot();
    const file = await root.getResource(path.slice('in-memory/'.length));
    expect(file).toBeTruthy();
    const contents = await file!.getContents();
    expect(contents).toBe(JSON.stringify({ content: body }));

    await removeSessionWorkspaceFolder(SESSION);
    expect(await root.getResource(path.slice('in-memory/'.length))).toBeNull();

    await publishSpilledToolResults(SESSION, [message]);
    const restored = await root.getResource(path.slice('in-memory/'.length));
    expect(await restored!.getContents()).toBe(JSON.stringify({ content: body }));
  });

  it('replaces large argument strings and republishes the original JSON', async () => {
    const contents = 'z'.repeat(TOOL_RESULT_SPILL_CHARS + 80);
    const message = assistantWithResult('ok');
    const tool = message.parts[0] as Extract<ChatMessage['parts'][number], { type: 'tool' }>;
    tool.name = 'workspace_write';
    tool.args = { path: 'IndexedDB/tasks.canvas.js', contents };
    const messages = historyToProviderMessages('sys', [message], undefined, SESSION);
    const call = messages.find((m) => m.role === 'assistant')?.toolCalls?.[0];
    const parsed = JSON.parse(String(call?.arguments)) as { path: string; contents: string };
    const path = toolArgsSpillPath(SESSION, 'call-1');

    expect(parsed.path).toBe('IndexedDB/tasks.canvas.js');
    expect(parsed.contents).toContain(`workspace_read path="${path}"`);
    expect(parsed.contents).not.toContain(contents);
    expect((tool.args as { contents: string }).contents).toBe(contents);

    await publishSpilledToolResults(SESSION, [message]);
    const root = getInMemoryRoot();
    const file = await root.getResource(path.slice('in-memory/'.length));
    expect(await file!.getContents()).toBe(JSON.stringify(tool.args));
  });

  it('estimates context from the transcript preview, not the stored body', () => {
    const body = 'y'.repeat(TOOL_RESULT_SPILL_CHARS + 4_000);
    const session: CognitiveSession = {
      id: SESSION,
      title: 'Chat',
      status: 'idle',
      history: [assistantWithResult({ content: body })],
      attachments: [],
      buffers: emptyBuffers(),
      specialistMode: 'build',
      createdAt: 1,
      updatedAt: 1,
    };
    const usage = estimateSessionContextUsage(session, 'openai/gpt-4o');
    const tools = usage.buckets.find((b) => b.id === 'tools');
    expect(tools?.tokens ?? 0).toBeLessThan(body.length / 4);
  });
});
