import { registerAll, TOOLBAR_MAIN_RIGHT, appLoaderService } from '@eclipse-lyra/core';

export default (_: unknown) => {
    registerAll({
        command: {
            id: 'open_github_repository',
            name: 'Open GitHub Repository',
            description: 'Opens the configured GitHub repository for the current app',
            parameters: []
        },
        handler: {
            execute: () => {
                const app = appLoaderService.getCurrentApp();
                const github = app?.metadata?.github as
                    | { owner?: string; repo?: string; url?: string }
                    | undefined;

                if (!github) {
                    return;
                }

                const url =
                    typeof github.url === 'string' && github.url.length > 0
                        ? github.url
                        : github.owner && github.repo
                            ? `https://github.com/${github.owner}/${github.repo}`
                            : undefined;

                if (!url) {
                    return;
                }

                window.open(url, '_blank', 'noopener,noreferrer');
            }
        },
        contribution: {
            target: TOOLBAR_MAIN_RIGHT,
            icon: 'lyra mark-github',
            label: 'GitHub',
            slot: 'end',
            disabled: () => {
                const app = appLoaderService.getCurrentApp();
                const github = app?.metadata?.github as
                    | { owner?: string; repo?: string; url?: string }
                    | undefined;

                if (!github) {
                    return true;
                }

                if (typeof github.url === 'string' && github.url.length > 0) {
                    return false;
                }

                return !(github.owner && github.repo);
            }
        }
    });
};

