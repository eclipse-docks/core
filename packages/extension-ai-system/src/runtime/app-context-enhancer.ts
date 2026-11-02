import { commandRegistry } from '@eclipse-docks/core';
import { formatExecutionContextForPrompt } from './app-context-summary';
import type { SystemPromptEnhancer } from './specialists';

export {
  formatExecutionContextForPrompt,
  summarizeExecutionContext,
} from './app-context-summary';

/** Injects live app state from {@link commandRegistry.createExecutionContext}. */
export const appContextPromptEnhancer: SystemPromptEnhancer = (prompt) => {
  try {
    const section = formatExecutionContextForPrompt(commandRegistry.createExecutionContext());
    if (!section) return prompt;
    return `${prompt}\n\n${section}`;
  } catch {
    return prompt;
  }
};
