import {
    contributionRegistry,
    editorRegistry,
    File,
    subscribe,
    TOOLBAR_MAIN_RIGHT,
    TOPIC_CONTRIBUTEIONS_CHANGED,
    type EditorInput,
    type HTMLContribution,
} from '@eclipse-docks/core';
import { html } from '@eclipse-docks/core/externals/lit';
import { CANVAS_SKILL } from './help';
import { isCanvasContribution, SYSTEM_CANVASES } from './contribution';
import { listRegisteredCanvases } from './canvases';
import { registerCanvasTools } from './canvas-tools';
import { registerCanvasCommands } from './commands';
import './canvas-switcher';

editorRegistry.registerEditorInputHandler({
    editorId: 'system.canvas-editor',
    label: 'Canvas',
    icon: 'table-columns',
    ranking: 1100,
    canHandle: (input: unknown) => input instanceof File && input.getName().toLowerCase().endsWith('.canvas.js'),
    handle: async (input: File) => {
        const editorInput = {
            title: input.getName(),
            data: input,
            key: input.getWorkspacePath(),
            icon: 'table-columns',
            state: { mode: 'preview' },
            component: () => html``,
        } as EditorInput;
        editorInput.component = (id: string) => html`<docks-canvas-editor id="${id}" .input=${editorInput}></docks-canvas-editor>`;
        return editorInput;
    },
});

contributionRegistry.registerContribution(TOOLBAR_MAIN_RIGHT, {
    name: 'canvas.switcher',
    label: 'Canvases',
    component: () => html`<docks-canvas-switcher></docks-canvas-switcher>`,
} as HTMLContribution);

function registerListedCanvasTools(): void {
    for (const canvas of listRegisteredCanvases()) registerCanvasTools(canvas);
}

registerCanvasCommands();
registerListedCanvasTools();
subscribe(TOPIC_CONTRIBUTEIONS_CHANGED, (event: { target?: string }) => {
    if (event?.target !== SYSTEM_CANVASES) return;
    for (const contribution of contributionRegistry.getContributions(SYSTEM_CANVASES)) {
        if (isCanvasContribution(contribution)) registerCanvasTools(contribution);
    }
});

void import('@eclipse-docks/extension-ai-system/api').then(ai => {
    ai.cognitiveRuntime.addSystemPromptEnhancer(prompt => `${prompt}\n\n${CANVAS_SKILL}`);
}).catch(() => undefined);
