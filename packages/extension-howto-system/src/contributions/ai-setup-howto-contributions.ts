import {
  contributionRegistry,
  activeEditorSignal,
  partDirtySignal,
  appLoaderService,
} from '@eclipse-docks/core';
import { watchSignal } from '@eclipse-docks/core';
import {
  AI_SETTINGS_KEY,
  OPEN_AI_SETTINGS_COMMAND,
  TOPIC,
  cognitiveRuntime,
} from '@eclipse-docks/extension-ai-system/api';
import { HOWTO_CONTRIBUTION_TARGET } from '../howto-service';
import type { HowToContribution, HowToContext } from '../howto-contribution';

function isAIConfigEditorOpen(): boolean {
  const activeEditor = activeEditorSignal.get() as {
    input?: { key?: string };
    tagName?: string;
    localName?: string;
  } | null;
  if (!activeEditor) return false;
  if (activeEditor.input?.key === AI_SETTINGS_KEY) return true;
  const tag = (activeEditor.tagName || activeEditor.localName || '').toLowerCase();
  return tag === 'docks-cognitive-settings-editor';
}

async function isLLMProviderConfigured(): Promise<boolean> {
  try {
    await cognitiveRuntime.whenReady();
    const settings = cognitiveRuntime.getProvidersSettings();
    if (!settings.defaultProviderId) return false;
    const provider = settings.providers.find((p) => p.id === settings.defaultProviderId);
    if (!provider?.enabled) return false;
    // Local providers (ollama/webllm) may not need a key.
    if (!provider.apiKey.trim()) {
      return /ollama|webllm|localhost|127\.0\.0\.1/i.test(`${provider.id} ${provider.baseUrl}`);
    }
    return true;
  } catch {
    return false;
  }
}

function isAIConfigEditorDirty(): boolean {
  const activeEditor = activeEditorSignal.get() as { isDirty?: () => boolean } | null;
  if (!activeEditor || !isAIConfigEditorOpen()) return false;
  return activeEditor.isDirty?.() === true;
}

function isAIConfigEditorSaved(): boolean {
  return isAIConfigEditorOpen() && !isAIConfigEditorDirty();
}

function isAIConfigEditorClosed(): boolean {
  return !isAIConfigEditorOpen();
}

async function hasTypedInChat(): Promise<boolean> {
  try {
    await cognitiveRuntime.whenReady();
    for (const session of cognitiveRuntime.sessions.list()) {
      const hasUserMessage = session.history.some(
        (msg) =>
          msg.role === 'user' &&
          msg.parts.some((part) => part.type === 'text' && part.text.trim() !== ''),
      );
      if (hasUserMessage) return true;
    }
    return false;
  } catch {
    return false;
  }
}

function getAppName(): string {
  const currentApp = appLoaderService.getCurrentApp();
  return currentApp?.name || 'AppSpace';
}

const aiSetupContribution: HowToContribution = {
  id: 'docks.ai-setup',
  title: () => `Set up AI in ${getAppName()}`,
  description: () => `Configure an LLM provider to enable AI chat features in ${getAppName()}`,
  icon: 'robot',
  label: '',
  category: 'Getting Started',
  initialize: (context: HowToContext) => {
    const cleanups: Array<() => void> = [];

    cleanups.push(watchSignal(activeEditorSignal, () => context.requestUpdate()));
    cleanups.push(watchSignal(partDirtySignal, () => context.requestUpdate()));
    cleanups.push(
      cognitiveRuntime.events.subscribe(TOPIC.providersChanged, () => context.requestUpdate()),
    );
    cleanups.push(
      cognitiveRuntime.events.subscribe(TOPIC.sessionChanged, () => context.requestUpdate()),
    );

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  },
  steps: [
    {
      id: 'open-ai-settings',
      title: 'Open AI Settings',
      description:
        'Open the AI settings editor from the chat gear menu or the command palette.',
      preCondition: () => true,
      postCondition: () => isAIConfigEditorOpen(),
      command: OPEN_AI_SETTINGS_COMMAND,
    },
    {
      id: 'configure-llm-provider',
      title: 'Configure LLM Provider',
      description:
        'Select a provider as default and enter an API key when required. Save your changes.',
      preCondition: () => isAIConfigEditorOpen(),
      postCondition: async () => {
        const configured = await isLLMProviderConfigured();
        const saved = isAIConfigEditorSaved();
        return configured && saved;
      },
    },
    {
      id: 'save-and-close',
      title: 'Save and Close',
      description: 'Save your changes (if not already saved) and close the AI settings editor tab.',
      preCondition: () => isAIConfigEditorOpen(),
      postCondition: () => isAIConfigEditorClosed(),
    },
    {
      id: 'type-in-chat',
      title: 'Type in Chat',
      description: 'Open the AI chat view and type a message to test your AI configuration.',
      preCondition: async () => await isLLMProviderConfigured(),
      postCondition: async () => await hasTypedInChat(),
    },
  ],
};

contributionRegistry.registerContribution<HowToContribution>(HOWTO_CONTRIBUTION_TARGET, aiSetupContribution);
