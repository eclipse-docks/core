/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import { systemPromptFor } from '../src/runtime/specialists';
import { registerSkillMarkdown, registeredSkillsPromptSection } from '../src/runtime/skills/skills';

describe('specialist skill prompt', () => {
  it('tells a build turn to list skills before a complex task', () => {
    const prompt = systemPromptFor('build', 'implement the app defined in the specs file', {
      skillsSection: '- eclipse-docks-canvas: Create interactive .canvas.js apps even if the user does not say canvas.',
    });
    expect(prompt).toContain('Before a complex task, call skills.list');
    expect(prompt).toContain('eclipse-docks-canvas: Create interactive .canvas.js apps');
    expect(prompt).toContain('implement the app defined in the specs file');
    expect(prompt).toContain('revises that same file first');
    expect(prompt).toContain('do not leave the plan describing the old behavior');
  });

  it('tells a plan turn to stay read-only and propose steps', () => {
    const prompt = systemPromptFor('plan', 'add a status bar');
    expect(prompt).toContain('Mode: PLAN');
    expect(prompt).toContain('create_plan');
    expect(prompt).toContain('# Spec');
    expect(prompt).toContain('WHEN');
    expect(prompt).toContain('plan-<short-description>.plan.md');
    expect(prompt).toContain('Do not create a second plan file');
    expect(prompt).toContain('paraphrased in correct language');
    expect(prompt).toContain('Do not copy the user\'s text');
    expect(prompt).toContain('Do not implement');
    expect(prompt).toContain('one short sentence');
    expect(prompt).toContain('add a status bar');
  });

  it('tells an attachment turn where to read files', () => {
    const prompt = systemPromptFor('build', 'rebuild this screenshot', { hasAttachments: true });
    expect(prompt).toContain('in-memory/<sessionId>/');
    expect(prompt).toContain('workspace_read');
    expect(prompt).not.toContain('eclipse-docks-canvas');
    expect(prompt).not.toContain('canvas.open');
    expect(prompt).toContain('Before a complex task, call skills.list');
  });

  it('puts a lazy skill description into the catalog', async () => {
    const unregister = registerSkillMarkdown('', {
      name: 'prompt-catalog-canvas',
      label: 'Canvas',
      ranking: 100,
      load: async () => ({
        default: `---
name: prompt-catalog-canvas
description: Interactive apps are .canvas.js files.
---

# Body
`,
      }),
    });
    try {
      const section = await registeredSkillsPromptSection();
      expect(section).toContain('prompt-catalog-canvas: Interactive apps are .canvas.js files.');
    } finally {
      unregister();
    }
  });
});
