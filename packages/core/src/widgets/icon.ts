import {customElement, property} from 'lit/decorators.js'
import {html, nothing, css} from 'lit';

import {LyraWidget} from "./widget";
import { parseIconSpec } from "../core/icon-utils";

@customElement('lyra-icon')
export class LyraIcon extends LyraWidget {

    @property()
    name?: string;

    @property()
    family?: string = "regular";

    @property()
    variant?: string;

    @property()
    label?: string;

    render() {
        if (!this.name) {
            return ""
        }
        const { name: iconName, library } = parseIconSpec(this.name);
        return html`
            <wa-icon library="${library || nothing}" variant="${this.variant || nothing}"
                         family="${this.family || nothing}" name=${iconName} label="${this.label || this.name || nothing}"></wa-icon>`
    }

    static styles = css`
        :host {
            display: contents;
        }
    `
}
