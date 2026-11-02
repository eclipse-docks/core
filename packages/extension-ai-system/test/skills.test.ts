import { describe, expect, it } from 'vitest';
import { formatSkillForPrompt, parseSkillMarkdown } from '../src/runtime/skills-parse';
import { resolveSkill, resolveSkillBody } from '../src/runtime/skills-resolve';
import { isSkillContribution, type SkillContribution } from '../src/runtime/skills-types';

describe('parseSkillMarkdown', () => {
  it('parses Cursor-style frontmatter with folded description', () => {
    const skill = parseSkillMarkdown(`---
name: eclipse-docks-canvas
description: >-
  Write a .canvas.js file.
  Call canvas.open.
---

# Body

Full contract here.
`);
    expect(skill.name).toBe('eclipse-docks-canvas');
    expect(skill.description).toBe('Write a .canvas.js file. Call canvas.open.');
    expect(skill.body).toContain('Full contract here.');
    expect(formatSkillForPrompt(skill)).toBe('Write a .canvas.js file. Call canvas.open.');
  });

  it('returns raw body when frontmatter is missing', () => {
    const skill = parseSkillMarkdown('# Just markdown\n\nHello');
    expect(skill.name).toBe('');
    expect(skill.body).toContain('Just markdown');
  });
});

describe('resolveSkill', () => {
  it('returns eager body when set without frontmatter', async () => {
    const skill: SkillContribution = {
      name: 'eager',
      label: 'Eager',
      body: 'Already here',
    };
    expect(await resolveSkillBody(skill)).toBe('Already here');
  });

  it('awaits load and reads description from SKILL.md frontmatter', async () => {
    const skill: SkillContribution = {
      name: 'lazy',
      label: 'Lazy',
      load: async () => ({
        default: `---
name: lazy
description: Short discovery text
---

# Loaded body
`,
      }),
    };
    expect(isSkillContribution(skill)).toBe(true);
    const resolved = await resolveSkill(skill);
    expect(resolved.description).toBe('Short discovery text');
    expect(resolved.body).toContain('Loaded body');
  });
});
