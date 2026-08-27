/**
 * Eclipse Hosted Services integration for the public demo (e.g. docks.eclipse.dev).
 *
 * Deployment: https://docks.eclipse.dev (GitHub Pages with CNAME). Eclipse Foundation
 * Hosted Services Policy applies to you as Service Operator for that deployment.
 *
 * - Legal: toolbar entry + dialog (required footer content).
 * - No third-party analytics or cookie banners: this demo does not use user tracking or
 *   marketing cookies by design.
 * - This demo does not collect PI or use Eclipse OIDC. If that changes, follow EF policy
 *   (OIDC, eclipse.org-gdpr, DPIA, security contacts).
 */

import {
  contributionRegistry,
  infoDialog,
  TOOLBAR_BOTTOM_END,
  type HTMLContribution,
} from '@eclipse-docks/core';
import { html } from '@eclipse-docks/core/externals/lit';

const ECLIPSE_LEGAL_HTML = `
<p><strong>Copyright © Eclipse Foundation AISBL. All Rights Reserved.</strong></p>
<ul>
<li><a href="https://www.eclipse.org/" target="_blank" rel="noopener noreferrer">Eclipse Foundation</a></li>
<li><a href="https://www.eclipse.org/legal/privacy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a></li>
<li><a href="https://www.eclipse.org/legal/terms-of-use/" target="_blank" rel="noopener noreferrer">Website Terms of Use</a></li>
<li><a href="https://www.eclipse.org/legal/compliance/" target="_blank" rel="noopener noreferrer">Compliance</a></li>
<li><a href="https://www.eclipse.org/legal/" target="_blank" rel="noopener noreferrer">Legal</a></li>
</ul>
`.trim();

function openEclipseLegalDialog(): void {
  void infoDialog('Eclipse legal', ECLIPSE_LEGAL_HTML, true);
}

contributionRegistry.registerContribution(
  TOOLBAR_BOTTOM_END,
  {
    label: 'Eclipse legal',
    slot: 'end',
    component: () => html`
      <wa-button
        appearance="plain"
        variant="brand"
        size="s"
        title="Eclipse Foundation legal information"
        @click=${openEclipseLegalDialog}
      >
        Eclipse legal
      </wa-button>
    `,
  } as HTMLContribution,
);
