import { html, nothing, type TemplateResult } from "lit";
import { contributionRegistry, type HTMLContribution } from "./contributionregistry";
import { SYSTEM_ATTRIBUTIONS } from "./contribution-targets";

export type LicenseAttributionOptions = {
    name: string;
    label: string;
    ranking?: number;
    component?: () => TemplateResult;
    license?: string;
    licenseUrl?: string;
    projectUrl?: string;
    projectLabel?: string;
};

export function registerLicenseAttribution(options: LicenseAttributionOptions): void {
    const component =
        options.component ??
        (() => {
            if (!options.license || !options.licenseUrl) {
                return html`<p>${options.label}</p>`;
            }
            return html`
                <p>
                    ${options.label} is used under the
                    <a href=${options.licenseUrl} target="_blank" rel="noopener noreferrer">${options.license}</a>.
                    ${options.projectUrl
                        ? html`
                              See
                              <a href=${options.projectUrl} target="_blank" rel="noopener noreferrer"
                                  >${options.projectLabel ?? options.projectUrl}</a
                              >.
                          `
                        : nothing}
                </p>
            `;
        });

    contributionRegistry.registerContribution(SYSTEM_ATTRIBUTIONS, {
        name: options.name,
        label: options.label,
        ranking: options.ranking ?? 0,
        component,
    } as HTMLContribution);
}
