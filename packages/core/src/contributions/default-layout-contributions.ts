import "../layouts/standard-layout";
import { contributionRegistry } from "../core/contributionregistry";
import { SYSTEM_LAYOUTS } from "../core/contribution-targets";

contributionRegistry.registerContribution(SYSTEM_LAYOUTS, {
    id: "standard",
    name: "Standard",
    label: "Standard",
    icon: "docks layout-standard-full",
    component: "docks-standard-layout",
});
