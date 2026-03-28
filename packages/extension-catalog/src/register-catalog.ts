import {
    contributionRegistry,
    type TreeContribution,
} from "@eclipse-lyra/core";

/** Leaf item state: optional filename when URL is not path-shaped (e.g. data: in production bundles). */
export type CatalogResourceState = {
    url: string;
    filename?: string;
};

export interface CatalogContribution extends TreeContribution {
    items?: CatalogContribution[];
}

export function getCatalogBaseUrl(): string {
    if (typeof globalThis === 'undefined') return '';
    const loc = (globalThis as unknown as { location?: { origin: string } }).location;
    const base = (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL ?? '';
    if (!loc?.origin) return '';
    return (loc.origin + base).replace(/\/?$/, '/');
}

export function registerCatalog(catalog: CatalogContribution, baseUrl?: string): void {
    const base = baseUrl ?? getCatalogBaseUrl();
    contributionRegistry.registerContribution("catalog.root", {
        label: catalog.label,
        icon: catalog.icon,
        contributionId: catalog.contributionId,
    } as TreeContribution);

    const contributionId = catalog.contributionId ?? catalog.label;
    catalog.items?.forEach((item: CatalogContribution) => {
        contributionRegistry.registerContribution(contributionId, {
            label: item.label,
            icon: item.icon,
            contributionId: item.contributionId,
        } as TreeContribution);

        item.items?.forEach((child: any) => {
            const contribution = {
                label: child.label,
                icon: child.icon,
                state: { ...child.state },
            } as TreeContribution;
            const url = contribution.state?.url as string | undefined;
            if (url && typeof url === "string" && url.includes("${baseURL}/")) {
                contribution.state = { ...contribution.state, url: url.replace("${baseURL}/", base) };
            }
            contributionRegistry.registerContribution(
                item.contributionId!,
                contribution
            );
        });
    });
}
