import type { ChatMessage } from '../types';
import { IN_MEMORY_ROOT_NAME } from '../attachments/attachment-paths';

/**
 * Tool results longer than this are replaced by a path in the model transcript.
 * Plans and skill bodies stay inline so a later step does not read them again.
 */
export const TOOL_RESULT_SPILL_CHARS = 32_000;

/** Short head kept in the transcript so the model can recognize the result before re-reading it. */
export const TOOL_RESULT_PREVIEW_CHARS = 64;

export function toolResultBody(result: unknown): string {
  return JSON.stringify(result ?? {});
}

export function toolResultSpillPath(sessionId: string, toolCallId: string): string {
  const id = toolCallId.replace(/[^a-zA-Z0-9_-]/g, '_') || 'result';
  return `${IN_MEMORY_ROOT_NAME}/${sessionId}/tool-results/${id}.txt`;
}

function relativeSpillPath(sessionId: string, toolCallId: string): string {
  return toolResultSpillPath(sessionId, toolCallId).slice(`${IN_MEMORY_ROOT_NAME}/`.length);
}

export function toolArgsBody(args: unknown): string {
  return JSON.stringify(args ?? {});
}

/** Full arguments JSON for one call (`…/tool-results/<id>.args.txt`). */
export function toolArgsSpillPath(sessionId: string, toolCallId: string): string {
  const id = toolCallId.replace(/[^a-zA-Z0-9_-]/g, '_') || 'result';
  return `${IN_MEMORY_ROOT_NAME}/${sessionId}/tool-results/${id}.args.txt`;
}

function relativeArgsPath(sessionId: string, toolCallId: string): string {
  return toolArgsSpillPath(sessionId, toolCallId).slice(`${IN_MEMORY_ROOT_NAME}/`.length);
}

/**
 * Model-facing tool-call arguments. Stored `tool.args` is unchanged.
 * Large string fields are replaced with a workspace_read pointer; small fields stay.
 * The string is always JSON so providers can parse `function.arguments`.
 */
export function toolArgsTranscript(
  sessionId: string,
  tool: { id: string; args?: unknown },
): string {
  const body = toolArgsBody(tool.args);
  if (!sessionId || body.length <= TOOL_RESULT_SPILL_CHARS) return body;
  const path = toolArgsSpillPath(sessionId, tool.id);
  const args = tool.args;
  if (!args || typeof args !== 'object' || Array.isArray(args)) {
    return JSON.stringify({
      spilled: true,
      chars: body.length,
      path,
      preview: body.slice(0, TOOL_RESULT_PREVIEW_CHARS),
    });
  }
  const compact: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(args)) {
    compact[key] =
      typeof value === 'string' && value.length > TOOL_RESULT_PREVIEW_CHARS
        ? `[published chars=${value.length}] → workspace_read path="${path}"`
        : value;
  }
  const encoded = JSON.stringify(compact);
  if (encoded.length <= TOOL_RESULT_SPILL_CHARS) return encoded;
  return JSON.stringify({
    spilled: true,
    chars: body.length,
    path,
    preview: body.slice(0, TOOL_RESULT_PREVIEW_CHARS),
  });
}

/**
 * Model-facing tool content. The stored `tool.result` is unchanged.
 * Without a session id, the full body is returned so callers that are not
 * building a session transcript do not invent a path.
 */
export function toolResultTranscript(
  sessionId: string,
  tool: { id: string; name: string; result?: unknown },
): string {
  const body = toolResultBody(tool.result);
  if (!sessionId || body.length <= TOOL_RESULT_SPILL_CHARS) return body;
  const path = toolResultSpillPath(sessionId, tool.id);
  const preview = body.slice(0, TOOL_RESULT_PREVIEW_CHARS);
  return [
    `[Tool result published: ${tool.name} chars=${body.length}] → workspace_read path="${path}"`,
    'Preview:',
    preview,
  ].join('\n');
}

function spilledBodies(
  sessionId: string,
  tool: { id: string; args?: unknown; result?: unknown },
): Array<{ relative: string; body: string }> {
  const spilled: Array<{ relative: string; body: string }> = [];
  const resultBody = toolResultBody(tool.result);
  if (resultBody.length > TOOL_RESULT_SPILL_CHARS) {
    spilled.push({ relative: relativeSpillPath(sessionId, tool.id), body: resultBody });
  }
  const argsBody = toolArgsBody(tool.args);
  if (argsBody.length > TOOL_RESULT_SPILL_CHARS) {
    spilled.push({ relative: relativeArgsPath(sessionId, tool.id), body: argsBody });
  }
  return spilled;
}

async function writeSpilled(spilled: Array<{ relative: string; body: string }>): Promise<void> {
  if (!spilled.length) return;
  const { File, getInMemoryRoot } = await import('@eclipse-docks/core');
  const root = getInMemoryRoot();
  for (const item of spilled) {
    const resource = await root.getResource(item.relative, { create: true });
    if (!(resource instanceof File)) continue;
    await resource.saveContents(item.body);
  }
}

/** Write one tool's large args and result so a later step in the same turn can read them. */
export async function publishSpilledTool(
  sessionId: string,
  tool: { id: string; args?: unknown; result?: unknown },
): Promise<void> {
  if (!sessionId) return;
  await writeSpilled(spilledBodies(sessionId, tool));
}

/** Write spilled tool bodies under `in-memory/<sessionId>/tool-results/` from intact history. */
export async function publishSpilledToolResults(
  sessionId: string,
  history: ChatMessage[],
): Promise<void> {
  if (!sessionId) return;
  const spilled: Array<{ relative: string; body: string }> = [];
  for (const message of history) {
    for (const part of message.parts) {
      if (part.type !== 'tool') continue;
      spilled.push(...spilledBodies(sessionId, part));
    }
  }
  await writeSpilled(spilled);
}
