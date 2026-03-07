import "../layouts/standard-layout";
import { contributionRegistry } from "../core/contributionregistry";
import { SYSTEM_LAYOUTS } from "../core/constants";

contributionRegistry.registerContribution(SYSTEM_LAYOUTS, {
    id: "standard",
    name: "Standard",
    label: "Standard",
    component: "lyra-standard-layout",
});
