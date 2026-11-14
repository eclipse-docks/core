import type { CommandPrompt } from '@eclipse-docks/core';

export interface ShellPromptRequest extends CommandPrompt {
  requestId: string;
  sessionId: string;
}

type AskHandler = (request: Omit<ShellPromptRequest, 'requestId'>) => Promise<string | undefined>;

let handler: AskHandler | null = null;

export function setShellPromptHandler(next: AskHandler | null): AskHandler | null {
  const previous = handler;
  handler = next;
  return previous;
}

/** Ask the chat for a command's missing name or confirmation. No handler cancels the prompt. */
export function requestShellPrompt(
  request: Omit<ShellPromptRequest, 'requestId'>,
): Promise<string | undefined> {
  if (!handler) return Promise.resolve(undefined);
  return handler(request);
}
