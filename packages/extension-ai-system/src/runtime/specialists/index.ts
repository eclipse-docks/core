import type { SpecialistRole } from '../types';

export * from './loop';
export * from './classify-risk';

export type SystemPromptEnhancer = (
  prompt: string,
  ctx: { role: SpecialistRole; goal: string; sessionId: string },
) => string | Promise<string>;

export function systemPromptFor(
  role: string,
  goal: string,
  opts: { hasAttachments?: boolean } = {},
): string {
  const base =
    'You are a specialist in the Eclipse Docks AI runtime. Prefer tools for file and command actions. Be concise.';
  const attachmentRule = opts.hasAttachments
    ? 'This turn publishes session attachments. To inspect them, call attachment_read with the attachment id from the user message (attachment_list if you need ids). Do not open canvases, editors, workspaces, or unrelated commands to find attachment contents — they are not workspace files.'
    : 'When the user publishes attachments, use attachment_list / attachment_read to inspect them — do not assume their contents are already in the transcript.';
  const preamble = `${base} ${attachmentRule}`;
  switch (role) {
    case 'plan':
      return `${preamble}\nMode: PLAN (read-only). Analyze and propose a plan for: ${goal}`;
    case 'explore':
      return `${preamble}\nMode: EXPLORE (read-only). Search and report findings for: ${goal}`;
    case 'build':
      return `${preamble}\nMode: BUILD. Implement the goal using tools when needed: ${goal}`;
    default:
      return `${preamble}\nGoal: ${goal}`;
  }
}
