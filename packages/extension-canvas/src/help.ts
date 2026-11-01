export const CANVAS_HELP = `A canvas is a workspace file ending in .canvas.js. Extend LitElement, not HTMLElement:

import { LitElement, html } from "docks/lit";
import "docks/webawesome";
export default class extends LitElement {
  render() { return html\`<wa-button>Ready</wa-button>\`; }
}

The host defines the custom element. Do not call customElements.define. Set state with this.canvasHost.getState(key, fallback) and this.canvasHost.setState(key, value). Open a workspace file with this.canvasHost.openFile(path).

Imports are not filtered. docks/lit, docks/webawesome, and docks/core are the running app (Lit, Web Awesome, and @eclipse-docks/core). Relative imports are workspace files. Compiling inlines those files: JSON becomes its value, text and CSS become strings, and other binaries become data URLs.

Write the file with the workspace tools, then call canvas.open with its path. canvas.apply_source updates the open canvas and returns ready or the compile error. Extension canvases are registered with contributionRegistry.registerContribution(SYSTEM_CANVASES, contribution). Import SYSTEM_CANVASES and CanvasContribution from @eclipse-docks/extension-canvas/contribution. They are opened by name from canvas.open or the toolbar dropdown.`;

export const CANVAS_SKILL = `For a durable interactive view, write a workspace file ending in .canvas.js whose default export extends LitElement from "docks/lit". Do not extend HTMLElement. Call canvas.open, and call canvas.help for the module contract. Extension canvases registered on system.canvases open by name.`;
