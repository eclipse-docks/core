import { html } from 'lit';
import { rootContext } from '@eclipse-lyra/core';
import { aiService } from './service/ai-service';
import { contributionRegistry } from '@eclipse-lyra/core';
import type { HTMLContribution } from '@eclipse-lyra/core';
import { editorRegistry } from '@eclipse-lyra/core';
import type { EditorInput } from '@eclipse-lyra/core';
import { registerAll, appSettings } from '@eclipse-lyra/core';
import { TOOLBAR_BOTTOM, TOOLBAR_MAIN_RIGHT, SIDEBAR_AUXILIARY } from '@eclipse-lyra/core';
import { CID_AGENTS, KEY_AI_CONFIG } from './core/constants';
import type { AgentContribution, AgentToolsConfig } from './core/interfaces';
import type { AIConfig } from './core/types';
import GENERAL_SYS_PROMPT from './general-assistant-prompt.txt?raw';

import './chat-provider-contributions';
import './prompt-enhancer-contributions';
import './view/aiview';
import './view/token-usage';
import './view/components/ai-config-editor';

contributionRegistry.registerContribution(SIDEBAR_AUXILIARY, {
    name: 'aiview',
    label: 'AI Assistant',
    icon: 'robot',
    component: (id: string) => html`<lyra-aiview id="${id}"></lyra-aiview>`
});

contributionRegistry.registerContribution(CID_AGENTS, {
    label: 'App Support',
    description: 'General-purpose assistant that can answer questions and execute app commands',
    role: 'appsupport',
    priority: 100,
    icon: 'question-circle',
    sysPrompt: GENERAL_SYS_PROMPT,
    tools: async () => {
        const config = await appSettings.get(KEY_AI_CONFIG) as AIConfig | undefined;
        return {
            enabled: true,
            smartToolDetection: config?.smartToolDetection ?? false
        } as AgentToolsConfig;
    }
} as AgentContribution);

contributionRegistry.registerContribution(TOOLBAR_BOTTOM, {
    target: TOOLBAR_BOTTOM,
    label: 'Token Usage',
    component: '<lyra-token-usage></lyra-token-usage>'
} as HTMLContribution);

editorRegistry.registerEditorInputHandler({
    editorId: 'system.ai-config-editor',
    label: 'AI Config',
    ranking: 1000,
    canHandle: (input: EditorInput) => input.key === '.system.ai-config',
    handle: async (input: EditorInput) => {
        input.component = () => html`<lyra-ai-config-editor .input="${input}"></lyra-ai-config-editor>`;
        return input;
    }
});

registerAll({
    command: {
        id: 'open_ai_config',
        name: 'Open AI Configuration',
        description: 'Open the AI system configuration editor',
        parameters: []
    },
    handler: {
        execute: (_context: any) => {
            const editorInput: EditorInput = {
                title: 'AI Settings',
                data: {},
                key: '.system.ai-config',
                icon: 'robot',
                state: {}
            } as EditorInput;
            editorRegistry.loadEditor(editorInput).then();
        }
    },
    contribution: {
        target: TOOLBAR_MAIN_RIGHT,
        icon: 'robot',
        label: 'AI Config'
    }
});

rootContext.put('aiService', aiService);
