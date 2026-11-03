import { contributionRegistry } from '@eclipse-docks/core';
import { parseSkillMarkdown } from './skills-parse';
import { resolveSkill } from './skills-resolve';
import { formatSkillsPromptSection } from './skills-select';
import { isSkillContribution, type SkillContribution } from './skills-types';

export type { AgentSkill } from './skills-parse';
export { formatSkillForPrompt, parseSkillMarkdown } from './skills-parse';
export { resolveSkill, resolveSkillBody } from './skills-resolve';
export { formatSkillsPromptSection, selectRelevantSkills } from './skills-select';
export type {
  ResolvedSkill,
  SkillContribution,
  SkillLoadResult,
  SkillRelevanceContext,
} from './skills-types';
export { isSkillContribution } from './skills-types';

/** Contribution slot for AI agent skills (Cursor-compatible SKILL.md content). */
export const SYSTEM_SKILLS = 'system.skills';

export function listSkillContributions(): SkillContribution[] {
  return contributionRegistry
    .getContributions(SYSTEM_SKILLS)
    .filter(isSkillContribution);
}

/** Descriptions for the specialist prompt. Full bodies stay behind skills.load. */
export async function registeredSkillsPromptSection(): Promise<string> {
  const skills = listSkillContributions()
    .slice()
    .sort((a, b) => (b.ranking ?? 0) - (a.ranking ?? 0));
  const described = await Promise.all(skills.map(describeSkill));
  return formatSkillsPromptSection(described);
}

async function describeSkill(skill: SkillContribution): Promise<SkillContribution> {
  try {
    const resolved = await resolveSkill(skill);
    const description = resolved.description || skill.description;
    if (!description || description === skill.description) return skill;
    return { ...skill, description };
  } catch {
    return skill;
  }
}

/** Register a SKILL.md document on {@link SYSTEM_SKILLS}. Returns an unregister function. */
export function registerSkillMarkdown(raw: string, opts?: Partial<SkillContribution>): () => void {
  const parsed = parseSkillMarkdown(raw);
  const name = (opts?.name || parsed.name || `skill-${Date.now()}`).trim();
  const contribution: SkillContribution = {
    name,
    label: opts?.label || parsed.name || name,
    body: (opts?.body || raw).trim(),
    ranking: opts?.ranking,
    icon: opts?.icon,
    relevant: opts?.relevant,
    load: opts?.load,
    description: opts?.description,
  };
  if (!contribution.body && !contribution.load) return () => undefined;
  contributionRegistry.registerContribution(SYSTEM_SKILLS, contribution);
  return () => contributionRegistry.unregisterContribution(SYSTEM_SKILLS, name);
}
