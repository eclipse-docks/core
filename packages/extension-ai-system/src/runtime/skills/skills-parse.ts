/** Cursor-compatible agent skill loaded from a SKILL.md file. */
export interface AgentSkill {
  name: string;
  description: string;
  body: string;
}

/**
 * Parse a SKILL.md document (YAML frontmatter + markdown body).
 * Compatible with Cursor Agent Skills layout.
 */
export function parseSkillMarkdown(raw: string): AgentSkill {
  const text = raw.replace(/^\uFEFF/, '');
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { name: '', description: '', body: text.trim() };
  }
  const front = match[1] ?? '';
  const body = (match[2] ?? '').trim();
  return {
    name: readFrontmatterString(front, 'name'),
    description: readFrontmatterString(front, 'description'),
    body,
  };
}

/** Short ambient prompt block (uses skill description). */
export function formatSkillForPrompt(skill: AgentSkill): string {
  const description = skill.description.trim();
  if (!description) return skill.body.trim();
  return description;
}

function readFrontmatterString(front: string, key: string): string {
  const folded = front.match(new RegExp(`^${key}:\\s*>-\\s*\\r?\\n((?:[ \\t]+.*\\r?\\n?)*)`, 'm'));
  if (folded?.[1]) {
    return folded[1]
      .split(/\r?\n/)
      .map((line) => line.replace(/^[ \t]+/, '').trimEnd())
      .filter((line, index, all) => line.length > 0 || index < all.length - 1)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  const quoted = front.match(new RegExp(`^${key}:\\s*[\"']([\\s\\S]*?)[\"']\\s*$`, 'm'));
  if (quoted?.[1]) return quoted[1].replace(/\s+/g, ' ').trim();

  const plain = front.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  return plain?.[1]?.trim() ?? '';
}
