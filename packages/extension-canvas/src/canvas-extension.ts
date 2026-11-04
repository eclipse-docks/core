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
import { SYSTEM_SKILLS, type SkillContribution } from '@eclipse-docks/extension-ai-system/api';
import { isCanvasContribution, SYSTEM_CANVASES } from './contribution';
import { listRegisteredCanvases } from './canvases';
import tasksSource from './canvases/tasks.canvas.js?raw';
import { registerCanvasCatalog } from './canvas-catalog';
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

const canvasSkills = [
    {
        name: 'eclipse-docks-canvas',
        label: 'Eclipse Docks canvas',
        load: () => import('./skills/eclipse-docks-canvas/SKILL.md?raw'),
        ranking: 100,
    },
    {
        name: 'eclipse-docks-lit',
        label: 'Eclipse Docks Lit',
        load: () => import('./skills/eclipse-docks-lit/SKILL.md?raw'),
        ranking: 90,
    },
    {
        name: 'eclipse-docks-webawesome',
        label: 'Eclipse Docks Web Awesome',
        load: () => import('./skills/eclipse-docks-webawesome/SKILL.md?raw'),
        ranking: 90,
    },
    {
        name: 'eclipse-docks-core',
        label: 'Eclipse Docks core',
        load: () => import('./skills/eclipse-docks-core/SKILL.md?raw'),
        ranking: 90,
    },
] as const satisfies ReadonlyArray<SkillContribution>;

for (const skill of canvasSkills) {
    contributionRegistry.registerContribution(SYSTEM_SKILLS, skill);
}

function registerListedCanvasTools(): void {
    for (const canvas of listRegisteredCanvases()) registerCanvasTools(canvas);
}

contributionRegistry.registerContribution(SYSTEM_CANVASES, {
    name: 'tasks',
    label: 'Tasks',
    icon: 'list-check',
    settingsKey: 'canvas.docks.demos.tasks',
    source: tasksSource,
});

registerCanvasCatalog();
registerCanvasCommands();
registerListedCanvasTools();
subscribe(TOPIC_CONTRIBUTEIONS_CHANGED, (event: { target?: string }) => {
    if (event?.target !== SYSTEM_CANVASES) return;
    for (const contribution of contributionRegistry.getContributions(SYSTEM_CANVASES)) {
        if (isCanvasContribution(contribution)) registerCanvasTools(contribution);
    }
});
