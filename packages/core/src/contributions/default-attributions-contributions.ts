import { html } from "lit";
import { registerLicenseAttribution } from "../core/license-attribution";
import { ATTRIBUTION_ECLIPSE_DOCKS, ATTRIBUTION_FONT_AWESOME } from "../core/contribution-names";

registerLicenseAttribution({
    name: ATTRIBUTION_ECLIPSE_DOCKS,
    label: "Eclipse Docks",
    ranking: 1000,
    component: () => html`
        <p>Copyright (c) 2026 The Eclipse Foundation and others.</p>
        <p>
            Eclipse Docks is made available under the
            <a href="https://www.eclipse.org/legal/epl-2.0" target="_blank" rel="noopener noreferrer"
                >Eclipse Public License 2.0</a
            >.
        </p>
    `,
});

registerLicenseAttribution({
    name: ATTRIBUTION_FONT_AWESOME,
    label: "Font Awesome",
    ranking: 900,
    component: () => html`
        <p>
            Icons by
            <a href="https://fontawesome.com" target="_blank" rel="noopener noreferrer">Font Awesome</a>.
            Font Awesome Free is licensed under
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer"
                >CC BY 4.0</a
            >.
        </p>
    `,
});
