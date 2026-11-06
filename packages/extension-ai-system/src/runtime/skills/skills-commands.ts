import { registerAll } from '@eclipse-docks/core';
import { listSkillContributions } from './skills';
import { resolveSkill } from './skills-resolve';

/** Register skills.list / skills.load as Docks commands (also exposed as LLM tools). */
export function registerSkillCommands(): void {
  registerAll({
    command: {
      id: 'skills.list',
      name: 'List skills',
      description:
        'List registered agent skills (name + description from SKILL.md). Call skills.load with a skill name to read the full instructions.',
      parameters: [],
    },
    handler: {
      execute: async () =>
        Promise.all(
          listSkillContributions().map(async (skill) => {
            const resolved = await resolveSkill(skill);
            return {
              name: resolved.name,
              label: resolved.label,
              description: resolved.description,
            };
          }),
        ),
    },
  });

  registerAll({
    command: {
      id: 'skills.load',
      name: 'Load skill',
      description:
        'Load the full body of a registered agent skill by name. Prefer skills returned by skills.list.',
      parameters: [
        {
          name: 'name',
          description: 'Skill name returned by skills.list',
          required: true,
        },
      ],
    },
    handler: {
      execute: async (context) => {
        const name = String(context.params?.name ?? '').trim();
        if (!name) {
          return {
            error: 'Missing skill name',
            available: listSkillContributions().map((skill) => skill.name),
          };
        }
        const skill = listSkillContributions().find((entry) => entry.name === name);
        if (!skill) {
          return {
            error: `Unknown skill: ${name}`,
            available: listSkillContributions().map((entry) => entry.name),
          };
        }
        const resolved = await resolveSkill(skill);
        if (!resolved.body) {
          return { error: `Skill ${name} has no body`, name: resolved.name };
        }
        return resolved;
      },
    },
  });
}
