import "../layouts/standard-layout";
import { contributionRegistry } from "../core/contributionregistry";
import { SYSTEM_LAYOUTS } from "../core/constants";

const standardLayouts: Array<{
    id: string;
    name: string;
    label: string;
    icon?: string;
    component: string | { tag: string; attributes?: Record<string, string> };
}> = [
    {
        id: "standard",
        name: "Standard",
        label: "Standard",
        icon: "lyra layout-standard",
        component: "lyra-standard-layout",
    },
    {
        id: "standard-bottom-panel",
        name: "Standard (bottom panel)",
        label: "Standard (bottom panel)",
        icon: "lyra layout-standard-bottom-panel",
        component: { tag: "lyra-standard-layout", attributes: { "show-bottom-panel": "true" } },
    },
    {
        id: "standard-bottom-sidebar",
        name: "Standard (bottom sidebar)",
        label: "Standard (bottom sidebar)",
        icon: "lyra layout-standard-bottom-sidebar",
        component: { tag: "lyra-standard-layout", attributes: { "show-bottom-sidebar": "true" } },
    },
    {
        id: "standard-full",
        name: "Standard (panel + sidebar)",
        label: "Standard (panel + sidebar)",
        icon: "lyra layout-standard-full",
        component: {
            tag: "lyra-standard-layout",
            attributes: { "show-bottom-panel": "true", "show-bottom-sidebar": "true" },
        },
    },
];

for (const layout of standardLayouts) {
    contributionRegistry.registerContribution(SYSTEM_LAYOUTS, layout);
}
