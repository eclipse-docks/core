import { extensionRegistry, i18n } from '@eclipse-lyra/core';
import pkg from '../package.json';

export type { GitHubRelease } from './github-service';
export {
    getGitHubConfig,
    fetchReleases,
    fetchLatestRelease,
    fetchReleaseByTag,
    isNewerVersion,
} from './github-service';

const t = await i18n(import.meta.glob('./i18n*.json'), true);

extensionRegistry.registerExtension({
  id: pkg.name,
  name: t.EXT_GITHUB_SERVICE_NAME,
  description: t.EXT_GITHUB_SERVICE_DESC,
  loader: () => import("./github-service-extension"),
  icon: "code-branch",
});
