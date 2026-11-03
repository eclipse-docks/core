import { parseSkillMarkdown } from './skills-parse';
import type { ResolvedSkill, SkillContribution, SkillLoadResult } from './skills-types';

function rawFromLoadResult(result: SkillLoadResult): string {
  if (typeof result === 'string') return result;
  return typeof result?.default === 'string' ? result.default : '';
}

async function readSkillRaw(skill: SkillContribution): Promise<string> {
  if (typeof skill.body === 'string' && skill.body.trim()) return skill.body.replace(/^\uFEFF/, '');
  if (!skill.load) return '';
  return rawFromLoadResult(await skill.load()).replace(/^\uFEFF/, '');
}

/**
 * Resolve SKILL.md (eager `body` or lazy `load`) into name/description/body.
 * Frontmatter wins for description unless the contribution sets an explicit override.
 */
export async function resolveSkill(skill: SkillContribution): Promise<ResolvedSkill> {
  const raw = (await readSkillRaw(skill)).trim();
  const parsed = raw ? parseSkillMarkdown(raw) : { name: '', description: '', body: '' };
  return {
    name: skill.name || parsed.name,
    label: skill.label || parsed.name || skill.name,
    description: (skill.description ?? parsed.description).trim(),
    body: parsed.body.trim() || (raw && !parsed.description && !parsed.name ? raw : ''),
  };
}

/** @deprecated Prefer {@link resolveSkill}; kept for callers that only need the body. */
export async function resolveSkillBody(skill: SkillContribution): Promise<string> {
  return (await resolveSkill(skill)).body;
}
