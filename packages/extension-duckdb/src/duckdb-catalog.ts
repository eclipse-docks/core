import type { CatalogContribution } from "@eclipse-lyra/extension-catalog/api";
import { registerCatalog } from "@eclipse-lyra/extension-catalog/api";

const DUCKDB_CATALOG: CatalogContribution = {
    label: "DuckDB",
    icon: "database",
    contributionId: "catalog.duckdb",
    items: [
        {
            label: "Basics",
            icon: "file-lines",
            contributionId: "catalog.duckdb.basics",
            items: [
                { label: "Hello DuckDB", icon: "file-code", state: { url: new URL("./catalog/hello-duckdb.sql", import.meta.url).href, filename: "hello-duckdb.sql" } },
                { label: "Aggregations and filters", icon: "file-code", state: { url: new URL("./catalog/aggregations.sql", import.meta.url).href, filename: "aggregations.sql" } },
            ],
        },
        {
            label: "Data types & functions",
            icon: "file-lines",
            contributionId: "catalog.duckdb.types",
            items: [
                { label: "Types and built-in functions", icon: "file-code", state: { url: new URL("./catalog/types-and-functions.sql", import.meta.url).href, filename: "types-and-functions.sql" } },
            ],
        },
    ],
};

export function registerDuckdbCatalog(): void {
    registerCatalog(DUCKDB_CATALOG);
}
