import { html } from "@eclipse-lyra/core/externals/lit";
import { contributionRegistry, type HTMLContribution } from "@eclipse-lyra/core";
import { TOOLBAR_MAIN } from "@eclipse-lyra/core";

contributionRegistry.registerContribution(TOOLBAR_MAIN, {
  label: "Eclipse Lyra",
  slot: "start",
  component: () => html`
    <div
      style="
        display: inline-flex;
        align-items: center;
        gap: var(--wa-space-s);
        padding: 0 var(--wa-space-s);
      "
    >
      <img
        src="/lyra-logo.svg"
        alt="Eclipse Lyra"
        style="display: block; height: 28px; width: auto;"
      />
    </div>
  `,
} as HTMLContribution);

