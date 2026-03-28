import type { CatalogContribution } from "@eclipse-lyra/extension-catalog/api";
import { registerCatalog } from "@eclipse-lyra/extension-catalog/api";

const NOTEBOOK_CATALOG: CatalogContribution = {
    label: "Notebooks",
    icon: "lyra jupyter",
    contributionId: "catalog.notebooks",
    items: [
        {
            label: "JavaScript",
            icon: "file-code",
            contributionId: "catalog.notebooks.javascript",
            items: [
                { label: "JavaScript basics", icon: "lyra jupyter", state: { url: new URL("./catalog/javascript-basics.ipynb", import.meta.url).href, filename: "javascript-basics.ipynb" } },
            ],
        },
        {
            label: "DuckDB",
            icon: "file-code",
            contributionId: "catalog.notebooks.duckdb",
            items: [
                { label: "DuckDB in notebooks", icon: "lyra jupyter", state: { url: new URL("./catalog/duckdb-sample.ipynb", import.meta.url).href, filename: "duckdb-sample.ipynb" } },
            ],
        },
        {
            label: "PGlite",
            icon: "file-code",
            contributionId: "catalog.notebooks.pglite",
            items: [
                { label: "PostgreSQL in notebooks", icon: "lyra jupyter", state: { url: new URL("./catalog/pglite-sample.ipynb", import.meta.url).href, filename: "pglite-sample.ipynb" } },
            ],
        },
    ],
};

export function registerNotebookCatalog(): void {
    registerCatalog(NOTEBOOK_CATALOG);
}
