import {
  contributionRegistry,
  editorRegistry,
  registerAll,
  rootContext,
  SIDEBAR_AUXILIARY,
  toastError,
  type EditorInput,
} from '@eclipse-docks/core';
import { html } from '@eclipse-docks/core/externals/lit';
import {
  AI_SETTINGS_EDITOR_ID,
  AI_SETTINGS_KEY,
  AI_VIEW_NAME,
  BUILD_PLAN_COMMAND,
  OPEN_AI_SETTINGS_COMMAND,
  appContextPromptEnhancer,
  cognitiveRuntime,
  registerSkillCommands,
} from './runtime';
import './view/cognitive-view';
import './view/cognitive-settings-editor';

cognitiveRuntime.start();
registerSkillCommands();
cognitiveRuntime.addSystemPromptEnhancer(appContextPromptEnhancer);
rootContext.put('cognitiveRuntime', cognitiveRuntime);

contributionRegistry.registerContribution(SIDEBAR_AUXILIARY, {
  name: AI_VIEW_NAME,
  label: 'AI',
  icon: 'robot',
  editorId: AI_VIEW_NAME,
  component: (id: string) => html`<docks-cognitive-view id="${id}"></docks-cognitive-view>`,
});

editorRegistry.registerEditorInputHandler({
  editorId: AI_SETTINGS_EDITOR_ID,
  label: 'AI Settings',
  ranking: 1000,
  canHandle: (input: EditorInput) => input.key === AI_SETTINGS_KEY,
  handle: async (input: EditorInput) => {
    input.component = (id: string) =>
      html`<docks-cognitive-settings-editor id="${id}" .input=${input}></docks-cognitive-settings-editor>`;
    return input;
  },
});

registerAll({
  command: {
    id: BUILD_PLAN_COMMAND,
    name: 'Build plan',
    description: 'Switch the chat to Agent and implement the plan file',
    parameters: [
      {
        name: 'path',
        description: 'Workspace path of a plan-<description>.plan.md file',
        required: true,
      },
    ],
  },
  handler: {
    execute: async (context) => {
      const path = String(context.params?.path ?? '').trim();
      const view = findElement('docks-cognitive-view') as
        | (HTMLElement & { buildFromPlan(path: string): Promise<void> })
        | null;
      if (!view) {
        toastError('AI chat is not open');
        return;
      }
      if (!path) return;
      const tabs = findElement('docks-tabs#sidebar-auxiliary') as { activate(name: string): void } | null;
      tabs?.activate(AI_VIEW_NAME);
      await view.buildFromPlan(path);
    },
  },
});

function findElement(selector: string, root: ParentNode = document): Element | null {
  const found = root.querySelector(selector);
  if (found) return found;
  for (const el of root.querySelectorAll('*')) {
    if (el.shadowRoot) {
      const nested = findElement(selector, el.shadowRoot);
      if (nested) return nested;
    }
  }
  return null;
}

registerAll({
  command: {
    id: OPEN_AI_SETTINGS_COMMAND,
    name: 'Open AI Settings',
    description: 'Configure AI model providers',
    parameters: [],
  },
  handler: {
    execute: () => {
      const editorInput = {
        title: 'AI Settings',
        data: {},
        key: AI_SETTINGS_KEY,
        icon: 'gear',
        state: {},
      } as EditorInput;
      void editorRegistry.loadEditor(editorInput);
    },
  },
});
