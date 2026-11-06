/** Filename token: a short description, or a short id when the description has no usable characters. */
export function planSlug(description: string): string {
  const slug = description
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48)
    .replace(/-+$/g, '');
  return slug || Math.random().toString(36).slice(2, 10);
}

export function planFileName(description: string): string {
  return `plan-${planSlug(description)}.plan.md`;
}

export function isPlanFilePath(path: string): boolean {
  const name = path.split(/[/\\]/).pop() ?? '';
  return /^plan-.+\.plan\.md$/i.test(name);
}

/** Existing `path` is replaced. A description starts a new plan, or replaces the file of the same name. */
export function planWriteTarget(args: { path?: unknown; description?: unknown }): { path: string } | { error: string } {
  const path = String(args.path ?? '').trim();
  if (path) {
    if (!isPlanFilePath(path)) return { error: 'path must be a plan-*.plan.md file' };
    return { path };
  }
  const description = String(args.description ?? '').trim();
  if (!description) return { error: 'description is required when path is omitted' };
  return { path: planFileName(description) };
}

/** Behavior contract for every plan. */
export function planDocumentGuide(): string {
  return [
    'Every plan is a plan-<short-description>.plan.md file. There is no separate spec file.',
    'The plan is the behavior contract and the ground truth for Build. Write it in this order:',
    '# Requirements — the user\'s request, paraphrased in correct language. Fix typos and unclear wording. Do not copy the user\'s text into the plan.',
    '# Spec — the contract the implementation must satisfy.',
    '## Purpose — one or two sentences.',
    '## Requirements — one behavior per ### Requirement:. State it with SHALL or MUST.',
    'Every requirement has at least one #### Scenario:. Every scenario has a WHEN line and a THEN line. Add AND lines for further outcomes.',
    'A scenario states observable behavior: what the user does, what the product shows, and what it stores. Class names, framework details, and component choices stay out of # Spec.',
    '# State — each persisted key and the shape of its value. Required when something is stored. Omit when nothing is stored.',
    '# Interface — controls and layout a scenario depends on. Required for a UI. Omit when there is no UI. It is not a widget catalog.',
    '# Files — each workspace file Build will create or change.',
    'Do not write the implementation during plan mode. Skills describe how Build implements this document.',
    'If a plan for this work already exists, pass its path to create_plan and rewrite that file. Do not create a second plan file for the same work.',
  ].join(' ');
}

export function buildPlanPrompt(path: string): string {
  return `Implement the plan in ${path}. That file is the ground truth: read it with workspace_read and follow it. Do not replace it with a different plan. Create or update each file under # Files so every scenario in # Spec holds.`;
}
