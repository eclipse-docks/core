import { rootContext } from "./di";
import { createLogger } from "./logger";

const logger = createLogger('EsmShService');

export interface EsmShSource {
    type: 'npm' | 'github' | 'jsr' | 'pr';
    package?: string;
    owner?: string;
    repo?: string;
    version?: string;
    path?: string;
    commit?: string;
}

export interface EsmShOptions {
    deps?: Record<string, string>;
    target?: string;
    dev?: boolean;
    bundle?: boolean;
    external?: string[];
    externalAll?: boolean;
}

class EsmShService {
    private static readonly ESM_SH_BASE = 'https://esm.sh';
    private static readonly GITHUB_PREFIX = 'gh/';
    private static readonly JSR_PREFIX = 'jsr/';
    private static readonly PR_PREFIX = 'pr/';

    isEsmShUrl(url: string): boolean {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname === 'esm.sh' || urlObj.hostname === 'raw.esm.sh';
        } catch {
            return false;
        }
    }

    isSourceIdentifier(source: string): boolean {
        if (this.isEsmShUrl(source)) {
            return false;
        }
        
        if (this.isHttpUrl(source)) {
            return false;
        }

        return this.parseSource(source) !== null;
    }

    private isHttpUrl(url: string): boolean {
        try {
            const parsed = new URL(url);
            return parsed.protocol === 'http:' || parsed.protocol === 'https:';
        } catch {
            return false;
        }
    }

    parseSource(source: string): EsmShSource | null {
        if (!source || typeof source !== 'string') {
            return null;
        }

        source = source.trim();

        if (this.isHttpUrl(source)) {
            return null;
        }

        if (source.startsWith(EsmShService.GITHUB_PREFIX)) {
            return this.parseGitHubSource(source);
        }

        if (source.startsWith(EsmShService.JSR_PREFIX)) {
            return this.parseJsrSource(source);
        }

        if (source.startsWith(EsmShService.PR_PREFIX)) {
            return this.parsePrSource(source);
        }

        return this.parseNpmSource(source);
    }

    private parseGitHubSource(source: string): EsmShSource | null {
        const withoutPrefix = source.substring(EsmShService.GITHUB_PREFIX.length);
        const parts = withoutPrefix.split('/');
        
        if (parts.length < 2) {
            return null;
        }

        const owner = parts[0];
        const repoWithRef = parts[1];
        
        let repo: string;
        let version: string | undefined;
        let path: string | undefined;

        const refMatch = repoWithRef.match(/^(.+?)(@(.+))?$/);
        if (!refMatch) {
            return null;
        }

        repo = refMatch[1];
        version = refMatch[3];

        if (parts.length > 2) {
            path = parts.slice(2).join('/');
        }

        return {
            type: 'github',
            owner,
            repo,
            version,
            path
        };
    }

    private parseJsrSource(source: string): EsmShSource | null {
        const withoutPrefix = source.substring(EsmShService.JSR_PREFIX.length);
        
        if (!withoutPrefix.startsWith('@')) {
            return null;
        }

        const parts = withoutPrefix.split('/');
        if (parts.length < 2) {
            return null;
        }

        const scope = parts[0];
        const packageWithVersion = parts[1];
        
        let packageName: string;
        let version: string | undefined;
        let path: string | undefined;

        const versionMatch = packageWithVersion.match(/^(.+?)(@(.+))?$/);
        if (!versionMatch) {
            return null;
        }

        packageName = `${scope}/${versionMatch[1]}`;
        version = versionMatch[3];

        if (parts.length > 2) {
            path = parts.slice(2).join('/');
        }

        return {
            type: 'jsr',
            package: packageName,
            version,
            path
        };
    }

    private parsePrSource(source: string): EsmShSource | null {
        const withoutPrefix = source.substring(EsmShService.PR_PREFIX.length);
        const parts = withoutPrefix.split('/');
        
        if (parts.length < 2) {
            return null;
        }

        const owner = parts[0];
        const repoWithCommit = parts[1];
        
        let repo: string;
        let commit: string | undefined;

        const commitMatch = repoWithCommit.match(/^(.+?)@(.+)$/);
        if (commitMatch) {
            repo = commitMatch[1];
            commit = commitMatch[2];
        } else {
            repo = repoWithCommit;
        }

        return {
            type: 'pr',
            owner,
            repo,
            commit
        };
    }

    private parseNpmSource(source: string): EsmShSource | null {
        const parts = source.split('/');
        const firstPart = parts[0];
        
        let packageName: string;
        let version: string | undefined;
        let path: string | undefined;

        const versionMatch = firstPart.match(/^(.+?)(@(.+))?$/);
        if (!versionMatch) {
            return null;
        }

        packageName = versionMatch[1];
        version = versionMatch[3];

        if (parts.length > 1) {
            path = parts.slice(1).join('/');
        }

        return {
            type: 'npm',
            package: packageName,
            version,
            path
        };
    }

    buildEsmShUrl(source: EsmShSource, options?: EsmShOptions): string {
        let url = EsmShService.ESM_SH_BASE;

        switch (source.type) {
            case 'npm':
                url += `/${source.package}`;
                if (source.version) {
                    url += `@${source.version}`;
                }
                if (source.path) {
                    url += `/${source.path}`;
                }
                break;

            case 'github':
                url += `/${EsmShService.GITHUB_PREFIX}${source.owner}/${source.repo}`;
                if (source.version) {
                    url += `@${source.version}`;
                }
                if (source.path) {
                    url += `/${source.path}`;
                }
                break;

            case 'jsr':
                url += `/${EsmShService.JSR_PREFIX}${source.package}`;
                if (source.version) {
                    url += `@${source.version}`;
                }
                if (source.path) {
                    url += `/${source.path}`;
                }
                break;

            case 'pr':
                url += `/${EsmShService.PR_PREFIX}${source.owner}/${source.repo}`;
                if (source.commit) {
                    url += `@${source.commit}`;
                }
                break;
        }

        const queryParams: string[] = [];

        if (options?.deps) {
            const depsString = Object.entries(options.deps)
                .map(([pkg, version]) => `${pkg}@${version}`)
                .join(',');
            queryParams.push(`deps=${encodeURIComponent(depsString)}`);
        }

        if (options?.target) {
            queryParams.push(`target=${encodeURIComponent(options.target)}`);
        }

        if (options?.dev) {
            queryParams.push('dev');
        }

        if (options?.bundle === false) {
            queryParams.push('bundle=false');
        } else if (options?.bundle === true) {
            queryParams.push('bundle');
        }

        if (queryParams.length > 0) {
            url += `?${queryParams.join('&')}`;
        }

        return url;
    }

    normalizeToEsmSh(source: string, options?: EsmShOptions): string {
        if (this.isEsmShUrl(source)) {
            return source;
        }

        if (this.isHttpUrl(source)) {
            return source;
        }

        const parsed = this.parseSource(source);
        if (!parsed) {
            logger.warn(`Could not parse source identifier: ${source}`);
            return source;
        }

        return this.buildEsmShUrl(parsed, options);
    }

    extractPackageName(source: string): string | null {
        const parsed = this.parseSource(source);
        if (!parsed) {
            return null;
        }

        switch (parsed.type) {
            case 'npm':
                return parsed.package || null;
            case 'github':
                return `${parsed.owner}/${parsed.repo}`;
            case 'jsr':
                return parsed.package || null;
            case 'pr':
                return `${parsed.owner}/${parsed.repo}`;
        }
    }

    isGitHubUrl(url: string): boolean {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname === 'github.com' || urlObj.hostname === 'www.github.com';
        } catch {
            return url.startsWith('https://github.com/') || url.startsWith('http://github.com/');
        }
    }

    convertGitHubUrlToSource(githubUrl: string): string {
        try {
            const urlObj = new URL(githubUrl);
            const pathParts = urlObj.pathname.split('/').filter(p => p);
            
            if (pathParts.length < 2) {
                throw new Error('Invalid GitHub URL format');
            }
            
            const owner = pathParts[0];
            let repo = pathParts[1].replace(/\.git$/, '');
            let ref: string | undefined;
            let filePath: string | undefined;
            
            if (pathParts.length > 2) {
                if (pathParts[2] === 'blob' || pathParts[2] === 'tree') {
                    ref = pathParts[3] || 'main';
                    if (pathParts[2] === 'blob' && pathParts.length > 4) {
                        filePath = pathParts.slice(4).join('/');
                    }
                } else if (pathParts[2] === 'commit') {
                    ref = pathParts[3];
                } else {
                    filePath = pathParts.slice(2).join('/');
                }
            }
            
            let ghUrl = `${EsmShService.GITHUB_PREFIX}${owner}/${repo}`;
            if (ref) {
                ghUrl += `@${ref}`;
            }
            if (filePath) {
                ghUrl += `/${filePath}`;
            }
            
            return ghUrl;
        } catch {
            const urlMatch = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
            if (urlMatch) {
                return `${EsmShService.GITHUB_PREFIX}${urlMatch[1]}/${urlMatch[2].replace(/\.git$/, '')}`;
            }
            return githubUrl;
        }
    }

    async fetchGitHubPackageJson(source: EsmShSource): Promise<any> {
        if (source.type !== 'github') {
            throw new Error('Source must be a GitHub source');
        }

        const owner = source.owner!;
        const repo = source.repo!;
        const ref = source.version || 'main';
        
        const packageJsonUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/package.json`;
        
        const response = await fetch(packageJsonUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch package.json: ${response.statusText}`);
        }
        
        return await response.json();
    }
}

export const esmShService = new EsmShService();
rootContext.put("esmShService", esmShService);