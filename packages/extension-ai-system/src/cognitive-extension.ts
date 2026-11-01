import {
  contributionRegistry,
  editorRegistry,
  registerAll,
  rootContext,
  SIDEBAR_AUXILIARY,
  type EditorInput,
} from '@eclipse-docks/core';
import { html } from '@eclipse-docks/core/externals/lit';
import {
  AI_SETTINGS_EDITOR_ID,
  AI_SETTINGS_KEY,
  AI_VIEW_NAME,
  OPEN_AI_SETTINGS_COMMAND,
  cognitiveRuntime,
} from './runtime';
import './view/cognitive-view';
import './view/cognitive-settings-editor';

cognitiveRuntime.start();
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
