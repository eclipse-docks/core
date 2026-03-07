import {contributionRegistry, HTMLContribution} from "@eclipse-lyra/core";
import {TOOLBAR_BOTTOM} from "@eclipse-lyra/core";
import "./memory-usage";

contributionRegistry.registerContribution(TOOLBAR_BOTTOM, {
    target: TOOLBAR_BOTTOM,
    label: "Memory",
    component: `<lyra-memory-usage></lyra-memory-usage>`
} as HTMLContribution)

