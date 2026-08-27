import { contributionRegistry, registerAll, TOOLBAR_MAIN_CENTER, publish } from "@eclipse-docks/core";
import { t, TOPIC_OPEN_COMMAND_PALETTE } from "./docks-command-palette";
import { html } from "@eclipse-docks/core/externals/lit";

registerAll({
  command: {
    id: "commandpalette.open",
    name: String(t.OPEN_COMMAND_PALETTE),
    description: String(t.OPEN_COMMAND_PALETTE_DESC),
    icon: "terminal",
    keyBinding: "CTRL+SHIFT+P",
  },
  handler: {
    execute: () => {
      publish(TOPIC_OPEN_COMMAND_PALETTE, null);
      return null;
    },
  },
});

contributionRegistry.registerContribution(TOOLBAR_MAIN_CENTER, {
  name: 'commandPalette.toolbar',
  label: "Command Palette",
  icon: "terminal",
  component: () => html`<docks-command-palette></docks-command-palette>`,
});

