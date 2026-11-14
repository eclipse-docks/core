import type { SpecialistRole } from '../types';
import { planDocumentGuide } from '../tools/plan-file';

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
    'You are a specialist in the Eclipse Docks AI runtime. Be concise.';
  const replyRule =
    'After tools finish, write a short human-friendly final reply (what you did and the outcome). Do not paste tool arguments, stdout, JSON, or command logs — those already appear in the UI details panel.';
  const attachmentRule = opts.hasAttachments ? 'Do not connect a folder to find attachments.' : '';
  const pathRule = 'Workspace paths start with a connected root name, such as Folder/file.';
  const spillRule =
    'Do not read a tool result again when this turn already returned its full contents.';
  const skillsSection = opts.skillsSection?.trim();
  const preamble = [base, replyRule, attachmentRule, pathRule, spillRule, skillsSection]
    .filter(Boolean)
    .join(' ');
  switch (role) {
    case 'plan':
      return `${preamble}\nMode: PLAN. The only write is create_plan, once this turn. ${planDocumentGuide()} After the file is written, answer in chat with one short sentence that names the file and do not restate the plan. Goal: ${goal}`;
    case 'explore':
      return `${preamble}\nMode: EXPLORE (read-only). Use shell verbs marked (r). Do not run verbs marked (w). Goal: ${goal}`;
    case 'build':
      return `${preamble}\nMode: BUILD. Implement the goal using tools when needed. When the goal is to implement a plan-*.plan.md file, read that plan once, load the one skill those files need, then create or update each file under # Files in this turn. Do not revise the plan, and do not list or re-read once you have it. When the user instead asks to change behavior, revise that same plan file first, paraphrased in correct language with typos fixed, then update the implementation so the plan still holds. Do not create a different plan file, and do not leave the plan describing the old behavior. Goal: ${goal}`;
    default:
      return `${preamble}\nGoal: ${goal}`;
  }
}
