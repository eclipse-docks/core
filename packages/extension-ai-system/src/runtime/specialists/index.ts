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
  const replyRule =
    'After tools finish, write a short human-friendly final reply (what you did and the outcome). Do not paste tool arguments, stdout, JSON, or command logs — those already appear in the UI details panel.';
  const attachmentRule = opts.hasAttachments
    ? [
        'This turn publishes session attachments under the shared in-memory root (in-memory/<sessionId>/… or in-memory://<sessionId>/…).',
        'Read them with workspace_read / workspace_list — in-memory paths work without mounting that root into the workspace tree.',
        'Do not call load_workspace / connect_opfs / connect_indexeddb to find attachments.',
        'Canvas from a screenshot: skills.load eclipse-docks-canvas → workspace_read the attachment path → workspace_write a .canvas.js (into a durable workspace folder) → canvas.open / canvas.apply_source.',
        'Qualify durable writes as <root>/<file> using a root from workspace_list (e.g. tests/demo.canvas.js); bare filenames are auto-rooted when a single durable folder is connected, otherwise a folder picker appears.',
        'If no durable workspace folder is connected for writing canvases, say so and stop.',
      ].join(' ')
    : 'Session attachments live under the shared in-memory root and are readable via workspace_read / workspace_list.';
  const pathRule =
    'Workspace paths use a connected root prefix from workspace_list (never write bare names at the composite root unless a single durable folder can auto-qualify them).';
  const skillRule =
    'For specialized workflows (e.g. canvas.js), call skills.list to discover registered skills, then skills.load with the matching name before following those instructions.';
  const preamble = `${base} ${replyRule} ${attachmentRule} ${pathRule} ${skillRule}`;
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
