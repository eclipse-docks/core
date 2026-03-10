import { html } from "lit";
import { contributionRegistry, PANEL_BOTTOM } from "@eclipse-lyra/core";
import "./command-shell";

contributionRegistry.registerContribution(PANEL_BOTTOM, {
  name: "command-shell",
  label: "Command Shell",
  icon: "terminal",
  component: (id: string) => html`<lyra-command-shell id="${id}"></lyra-command-shell>`,
});
