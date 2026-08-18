import { registerAll } from "../core/commandregistry";
import { toastError } from "../core/toast";
import { appLoaderService } from "../core/apploader";
import { versionInfoDialog } from "../dialogs/version-info-dialog";

registerAll({
    command: {
        id: "show_version_info",
        name: "Show Version Info",
        description: "Shows application version information",
        parameters: [],
    },
    handler: {
        execute: async _context => {
            const app = appLoaderService.getCurrentApp();
            if (!app) {
                toastError("No app loaded");
                return;
            }

            await versionInfoDialog();
        },
    },
});
