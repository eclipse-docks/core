import { rootContext, editorRegistry, File, type EditorInput } from '@eclipse-lyra/core';
import { html } from 'lit';
import { duckdbService } from './duckdb-service';
import './duckdb-editor';
import './duckdb-extension-manager';

export default function () {
  rootContext.put('duckdbService', duckdbService);

  editorRegistry.registerEditorInputHandler({
    editorId: 'system.duckdb-editor',
    label: 'DuckDB',
    icon: 'database',
    canHandle: (input: unknown) =>
      input instanceof File && input.getName().toLowerCase().endsWith('.sql'),
    ranking: 1000,
    handle: async (input: File) => {
      const editorInput: EditorInput = {
        title: input.getName(),
        data: input,
        key: input.getName(),
        icon: 'database',
        noOverflow: false,
        state: {},
        component: () => null as any,
      };
      editorInput.component = () =>
        html`<lyra-duckdb-editor .input=${editorInput}></lyra-duckdb-editor>`;
      return editorInput;
    },
  });
}
