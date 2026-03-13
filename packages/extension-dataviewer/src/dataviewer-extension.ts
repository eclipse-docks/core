import { html } from 'lit';
import {
  rootContext,
  editorRegistry,
  contributionRegistry,
  File,
  type EditorInput,
} from '@eclipse-lyra/core';
import { PANEL_BOTTOM } from '@eclipse-lyra/core';
import { dataviewerService } from './dataviewer-service';
import './dataview-part';
import type { DataView } from './api';
import { parseCsv } from './parse-csv';

dataviewerService.init();
rootContext.put('dataviewerService', dataviewerService);

contributionRegistry.registerContribution(PANEL_BOTTOM, {
  name: 'view.dataviewer',
  label: 'Data Views',
  icon: 'table',
  component: (id: string) => html`<lyra-dataview id="${id}"></lyra-dataview>`,
});

editorRegistry.registerEditorInputHandler({
  editorId: 'system.dataviewer-table',
  label: 'Table',
  icon: 'table',
  ranking: 800,
  canHandle: (input: unknown) => {
    if (!(input instanceof File)) return false;
    const lower = input.getName().toLowerCase();
    return lower.endsWith('.csv') || lower.endsWith('.tsv');
  },
  handle: async (input: File) => {
    const name = input.getName();
    const text = (await input.getContents()) as string;
    const { columns, rows } = parseCsv(text ?? '');
    const data = { columns, rows };
    const editorInput: EditorInput = {
      title: name,
      data,
      key: name,
      icon: 'table',
      noOverflow: false,
      state: {},
      component: () => html`<lyra-data-table .data=${data}></lyra-data-table>`,
    };
    return editorInput;
  },
});

export default function () {}
