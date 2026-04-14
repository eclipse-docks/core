import { html } from '@eclipse-docks/core/externals/lit';
import { contributionRegistry, SIDEBAR_MAIN } from '@eclipse-docks/core';
import type { TabContribution } from '@eclipse-docks/core';

contributionRegistry.registerContribution(SIDEBAR_MAIN, {
  name: 'example-view',
  label: 'Example',
  icon: 'puzzle-piece',
  closable: true,
  toolbar: false,
  component: (_id: string) => html`
    <div style="padding: var(--wa-space-l);">
      <h2>Example extension</h2>
      <p>This view is contributed by the <code>extension-example</code> package to the left side panel.</p>
    </div>
  `,
} as TabContribution);

export default function exampleExtensionLoader() {}
