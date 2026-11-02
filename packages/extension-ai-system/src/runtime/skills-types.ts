export interface SkillRelevanceContext {
  goal: string;
  role: string;
  sessionId: string;
  hasAttachments?: boolean;
}

/** Result of a skill `load()` — raw SKILL.md text or a Vite `?raw` module. */
export type SkillLoadResult = string | { default: string };

/**
 * Declares an agent skill for the cognitive runtime.
 * Register with `contributionRegistry.registerContribution(SYSTEM_SKILLS, …)`.
 *
 * Provide either eager `body` (full SKILL.md) or lazy `load` (Vite `import('…/SKILL.md?raw')`).
 * Name/description come from SKILL.md frontmatter when resolved.
 */
export interface SkillContribution {
  /** Stable id (usually matches SKILL.md `name`; used before the document is loaded). */
  name: string;
  label: string;
  /**
   * Optional override. Prefer the SKILL.md frontmatter `description` —
   * resolved automatically by `skills.list` / `skills.load`.
   */
  description?: string;
  /** Full SKILL.md document (eager). Prefer `load` when the file can be code-split. */
  body?: string;
  /**
   * Lazy import for SKILL.md (`?raw`) or raw markdown text.
   * Called by `skills.list` / `skills.load`; the framework parses frontmatter.
   */
  load?: () => Promise<SkillLoadResult>;
  ranking?: number;
  icon?: string;
  /** Optional explicit relevance; otherwise the goal is matched against name/label. */
  relevant?: (ctx: SkillRelevanceContext) => boolean;
}

/** Parsed skill document after resolving `body` / `load`. */
export interface ResolvedSkill {
  name: string;
  label: string;
  description: string;
  body: string;
}

export function isSkillContribution(value: unknown): value is SkillContribution {
  if (!value || typeof value !== 'object') return false;
  const skill = value as SkillContribution;
  const hasBody = typeof skill.body === 'string';
  const hasLoad = typeof skill.load === 'function';
  return (
    typeof skill.name === 'string' &&
    skill.name.length > 0 &&
    typeof skill.label === 'string' &&
    (hasBody || hasLoad)
  );
}
