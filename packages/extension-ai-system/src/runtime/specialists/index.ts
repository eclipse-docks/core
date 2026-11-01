import type { SpecialistRole } from '../types';

export * from './loop';
export * from './classify-risk';

export type SystemPromptEnhancer = (
  prompt: string,
  ctx: { role: SpecialistRole; goal: string; sessionId: string },
) => string | Promise<string>;

export function systemPromptFor(role: string, goal: string): string {
  const base =
    'You are a specialist in the Eclipse Docks AI runtime. Prefer tools for file and command actions. Be concise.';
  switch (role) {
    case 'plan':
      return `${base}\nMode: PLAN (read-only). Analyze and propose a plan for: ${goal}`;
    case 'explore':
      return `${base}\nMode: EXPLORE (read-only). Search and report findings for: ${goal}`;
    case 'build':
      return `${base}\nMode: BUILD. Implement the goal using tools when needed: ${goal}`;
    default:
      return `${base}\nGoal: ${goal}`;
  }
}
