import type { CatalogContribution } from "@eclipse-lyra/extension-catalog/api";
import { registerCatalog } from "@eclipse-lyra/extension-catalog/api";

const PGLITE_CATALOG: CatalogContribution = {
    label: "PGlite",
    icon: "database",
    contributionId: "catalog.pglite",
    items: [
        {
            label: "Basics",
            icon: "file-lines",
            contributionId: "catalog.pglite.basics",
            items: [
                { label: "Hello PostgreSQL", icon: "file-code", state: { url: new URL("./catalog/hello-pglite.sql", import.meta.url).href, filename: "hello-pglite.sql" } },
                { label: "Tables and constraints", icon: "file-code", state: { url: new URL("./catalog/tables-and-constraints.sql", import.meta.url).href, filename: "tables-and-constraints.sql" } },
            ],
        },
        {
            label: "Queries",
            icon: "file-lines",
            contributionId: "catalog.pglite.queries",
            items: [
                { label: "Joins and subqueries", icon: "file-code", state: { url: new URL("./catalog/joins-and-subqueries.sql", import.meta.url).href, filename: "joins-and-subqueries.sql" } },
            ],
        },
    ],
};

export function registerPgliteCatalog(): void {
    registerCatalog(PGLITE_CATALOG);
}
