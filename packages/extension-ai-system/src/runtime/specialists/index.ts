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
  opts: { hasAttachments?: boolean; skillsSection?: string } = {},
): string {
  const base =
    'You are a specialist in the Eclipse Docks AI runtime. Prefer tools for file and command actions. Be concise.';
  const replyRule =
    'After tools finish, write a short human-friendly final reply (what you did and the outcome). Do not paste tool arguments, stdout, JSON, or command logs — those already appear in the UI details panel.';
  const attachmentRule = opts.hasAttachments
    ? [
        'This turn publishes session attachments under the shared in-memory root (in-memory/<sessionId>/… or in-memory://<sessionId>/…).',
        'Read them with workspace_read / workspace_list — in-memory paths work without mounting that root into the workspace tree.',
        'Do not call load_workspace / connect_opfs / connect_indexeddb to find attachments.',
      ].join(' ')
    : 'Session attachments live under the shared in-memory root and are readable via workspace_read / workspace_list.';
  const pathRule =
    'Workspace paths use a connected root prefix from workspace_list (never write bare names at the composite root unless a single durable folder can auto-qualify them).';
  const spillRule =
    'Large tool results from earlier turns are files under in-memory/<sessionId>/tool-results/. The transcript keeps a preview and a workspace_read path; read the file when the preview is not enough. Large tool arguments are the sibling .args.txt file.';
  const skillRule =
    'Before a complex task, call skills.list, then skills.load the matching skill and follow it.';
  const skillsSection = opts.skillsSection?.trim();
  const preamble = skillsSection
    ? `${base} ${replyRule} ${attachmentRule} ${pathRule} ${spillRule} ${skillRule}\n${skillsSection}`
    : `${base} ${replyRule} ${attachmentRule} ${pathRule} ${spillRule} ${skillRule}`;
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
