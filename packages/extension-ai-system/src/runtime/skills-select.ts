import type { SkillContribution, SkillRelevanceContext } from './skills-types';

export type { SkillContribution, SkillRelevanceContext } from './skills-types';

/**
 * Catalog-only prompt section. The model loads full skill bodies via skills.load.
 */
export function formatSkillsPromptSection(skills: SkillContribution[]): string {
  if (!skills.length) return '';
  const catalog = skills
    .map((skill) => `- ${skill.name}: ${(skill.description ?? '').trim() || skill.label}`)
    .join('\n');
  return [
    'Available skills (call skills.load with the skill name to load full instructions before relying on them):',
    catalog,
  ].join('\n');
}

/** @deprecated Prefer skills.load; kept for tests/helpers that still filter by goal. */
export function selectRelevantSkills(
  skills: SkillContribution[],
  ctx: SkillRelevanceContext,
): SkillContribution[] {
  return skills.filter((skill) => {
    if (skill.relevant) return skill.relevant(ctx);
    return skillMatchesGoal(skill, ctx.goal);
  });
}

const STOP_WORDS = new Set([
  'that',
  'this',
  'with',
  'from',
  'your',
  'have',
  'when',
  'into',
  'call',
  'file',
  'files',
  'default',
  'export',
  'write',
  'using',
  'such',
  'does',
  'send',
  'open',
  'name',
  'they',
  'them',
  'then',
  'than',
  'also',
  'only',
  'over',
  'under',
  'about',
  'after',
  'before',
  'other',
  'which',
  'where',
  'whose',
  'their',
  'there',
  'these',
  'those',
  'and',
  'for',
  'the',
  'a',
  'an',
  'to',
  'of',
  'in',
  'on',
  'or',
  'by',
  'is',
  'are',
  'be',
  'as',
  'at',
  'it',
  'do',
  'not',
]);

function skillMatchesGoal(skill: SkillContribution, goal: string): boolean {
  const hay = goal.toLowerCase();
  if (!hay.trim()) return false;
  const tokens = `${skill.name} ${skill.label ?? ''} ${skill.description ?? ''}`
    .toLowerCase()
    .split(/[^a-z0-9._-]+/)
    .filter((token) => token.length >= 4 && !STOP_WORDS.has(token));
  if (!tokens.length) return false;
  return tokens.some((token) => hay.includes(token));
}
