import { html } from 'lit';
import { EditorInput, editorRegistry, File } from '@eclipse-docks/core';

editorRegistry.registerEditorInputHandler({
  editorId: 'system.plain-editor',
  label: 'Text',
  icon: 'file-lines',
  ranking: 1,
  lazyInit: async () => {
    await import('./plain-editor.js');
  },
  canHandle: (input: unknown) => input instanceof File,
  handle: async (input: File) => {
    const editorInput = {
      title: input.getWorkspacePath(),
      data: input,
      key: input.getWorkspacePath(),
      icon: editorRegistry.getFileIcon(input.getName()),
      state: {},
    } as EditorInput;
    editorInput.component = (id: string) => html`
      <docks-plain-editor id=${id} .input=${editorInput}></docks-plain-editor>
    `;
    return editorInput;
  },
});
