/**
 * App Loader Service
 * 
 * Provides a clean separation between the framework and applications built on it.
 * This allows the framework (k-* components and core services) to be published
 * as a reusable npm package, while applications like `my-app` can be loaded
 * dynamically.
 * 
 * Architecture:
 * - Framework: Core services, k-* components (publishable as npm package)
 * - Application: App-specific code, gs-* components, contributions
 * - App Loader: Bridge between framework and application
 */

import { render, TemplateResult, html } from "lit";
import { rootContext } from "./di";
import { createLogger } from "./logger";
import { extensionRegistry, Extension } from "./extensionregistry";
import { contributionRegistry, Contribution, LayoutContribution, TOPIC_CONTRIBUTEIONS_CHANGED } from "./contributionregistry";
import { SYSTEM_LAYOUTS } from "./contribution-targets";
import { appSettings } from "./settingsservice";
import { marketplaceRegistry } from "./marketplaceregistry";
import { contributionTargetMappingRegistry, type ContributionNameRemap } from "./contribution-mapping";
import { publish } from "./events";


const logger = createLogger('AppLoader');

/** Layout reference: layout id string, or id + optional props read by the layout on init. */
export type LayoutDescriptor = string | { id: string; props?: Record<string, string | boolean> };

function getLayoutIdFromApp(app: AppDefinition | undefined): string {
    const layout = app?.layout ?? 'standard';
    return typeof layout === 'object' ? layout.id : layout;
}

/**
 * Extracts error message from an error object.
 */
function getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
}

/**
 * Extracts the first path segment from the current page URL.
 * This allows loading apps by path, e.g., /my-app loads the my-app app.
 */
function extractAppIdFromPath(): string | undefined {
    const pathname = window.location.pathname;
    const pathSegments = pathname.split('/').filter(Boolean);
    
    if (pathSegments.length === 0) {
        return undefined;
    }
    
    const firstSegment = pathSegments[0];
    
    if (!firstSegment || firstSegment === 'index.html' || firstSegment.endsWith('.html')) {
        return undefined;
    }
    
    return firstSegment;
}

/**
 * Application contributions interface.
 * Declaratively defines all contributions for an application.
 */
export interface AppContributions {
    /** UI contributions (tabs, toolbars, commands, etc.) */
    ui?: Contribution[];
    
    /** App-specific extensions to register */
    extensions?: Extension[];
}

/**
 * Represents a single release entry in the release history.
 * Compatible with GitHub release format but with optional html_url.
 */
export interface ReleaseEntry {
    /** Release tag name (e.g., "v1.0.0") */
    tag_name: string;
    
    /** Human-readable release name */
    name: string;
    
    /** Release notes/description (markdown supported) */
    body: string;
    
    /** ISO 8601 timestamp when the release was published */
    published_at: string;
    
    /** Optional URL to the release page */
    html_url?: string;
    
    /** Whether this is a pre-release */
    prerelease?: boolean;
    
    /** Whether this release is a draft */
    draft?: boolean;
}

/**
 * Release history can be provided as:
 * - A static array of releases
 * - A function that returns releases asynchronously
 * This allows apps to either provide pre-loaded releases or fetch them dynamically.
 */
export type ReleaseHistory = ReleaseEntry[];

/** Descriptor for rendering a single custom element as the app root (no lit required). */
export interface RenderDescriptor {
    tag: string;
    attributes?: Record<string, string>;
}

/**
 * Application definition interface.
 * Applications implement this interface to integrate with the framework.
 */
export interface AppDefinition {
    /** Application name (from package.json). Unique key; set by hostConfig resolution when omitted. */
    name?: string;

    /** Application version. Set by hostConfig resolution from package.json when omitted. */
    version?: string;

    /** Application description. Set by hostConfig resolution from package.json when omitted. */
    description?: string;

    /** Optional URL path segment for routing (e.g. "my-app"). When absent, name is used for lookup. */
    path?: string;
    
    /**
     * Custom application metadata (optional).
     * Apps can define any custom metadata here for their own use.
     * The framework may read certain metadata keys (e.g., `metadata.github` for release checking).
     */
    metadata?: Record<string, any>;
    
    /**
     * Core framework extensions required by the application.
     * The app loader will enable these extensions when loading the app
     * and disable them when unloading.
     */
    extensions?: string[];
    
    /**
     * Application contributions (tabs, toolbars, commands, app extensions).
     * The app loader will register these contributions automatically.
     */
    contributions?: AppContributions;
    
    /**
     * Application initialization function.
     * Called after extensions are enabled and contributions are registered.
     * Use this for custom initialization logic that can't be expressed declaratively.
     */
    initialize?: () => void | Promise<void>;
    
    /**
     * Optional release history for the application.
     * Can be a static array of releases or a callback function that returns releases (synchronously or asynchronously).
     * If not provided, the version-info command will attempt to fetch releases from GitHub
     * (if metadata.github is configured).
     */
    releaseHistory?: ReleaseHistory | (() => ReleaseHistory | Promise<ReleaseHistory>);

    /**
     * Layout: id (string) or { id, props }. The layout component reads props on init (e.g. panel visibility).
     * Defaults to 'standard' when omitted.
     */
    layout?: LayoutDescriptor;

    /**
     * Optional cleanup function.
     * Called when the app is being unloaded, before extensions are disabled.
     */
    dispose?: () => void | Promise<void>;

    /** Resolved dependency versions (e.g. from build plugin). Shown in About / version info. */
    dependencies?: Record<string, string>;

    /** Marketplace catalog URLs for this app. Registered when the app is registered. */
    marketplaceCatalogUrls?: string[];

    /**
     * Optional contribution remaps for this application.
     * Allows apps to declaratively remap contributions to different targets.
     */
    remaps?: ContributionNameRemap[];
}

/**
 * Options for registering an application with the apploader.
 */
export interface RegisterAppOptions {
    /** Default app name when URL routing (?appId= or path) does not select an app. If not specified, the first registered app is loaded. */
    defaultAppName?: string;
    
    /** 
     * Whether to automatically start the apploader after registration.
     * If true, the apploader will start immediately after the app is registered.
     * Defaults to false.
     */
    autoStart?: boolean;
    
    /** 
     * DOM element to render the app into.
     * Defaults to document.body.
     */
    container?: HTMLElement;

    /**
     * When true, fill name, version, description, dependencies, marketplaceCatalogUrls from __RESOLVED_PACKAGE_INFO__ only when not already set on the app.
     */
    hostConfig?: boolean;
}

/**
 * App Loader Service
 * 
 * Manages application lifecycle:
 * 1. Register app definitions
 * 2. Initialize apps
 * 3. Render apps to DOM
 * 4. Manage app lifecycle
 */
class AppLoaderService {
    private apps: Map<string, AppDefinition> = new Map();
    private currentApp?: AppDefinition;
    private started: boolean = false;
    private defaultAppName?: string;
    private container: HTMLElement = document.body;
    private systemRequiredExtensions: Set<string> = new Set();
    private static readonly PREFERRED_APP_KEY = 'preferredAppName';
    
    /**
     * Register an application with the framework.
     * Optionally starts the apploader automatically after registration.
     * 
     * @param app - Application definition
     * @param options - Optional configuration for registration and auto-starting
     */
    registerApp(app: AppDefinition, options?: RegisterAppOptions): void {
        if (options?.hostConfig === true && typeof __RESOLVED_PACKAGE_INFO__ !== 'undefined') {
            const resolved = __RESOLVED_PACKAGE_INFO__;
            if (app.name === undefined) app.name = resolved.name;
            if (app.version === undefined) app.version = resolved.version;
            if (app.description === undefined) app.description = resolved.description;
            if (app.dependencies === undefined) app.dependencies = resolved.dependencies;
            if (app.marketplaceCatalogUrls === undefined) app.marketplaceCatalogUrls = resolved.marketplaceCatalogUrls;
        }
        app.name = app.name ?? 'app';
        app.version = app.version ?? '0.0.0';
        app.layout = app.layout ?? 'standard';

        if (this.apps.has(app.name)) {
            logger.warn(`App '${app.name}' is already registered. Overwriting.`);
        }
        if (app.marketplaceCatalogUrls?.length) {
            marketplaceRegistry.addCatalogUrls(app.marketplaceCatalogUrls).catch(() => {});
        }

        this.apps.set(app.name, app);

        if (options?.defaultAppName) {
            this.defaultAppName = options.defaultAppName;
        }
        
        if (options?.container) {
            this.container = options.container;
        }
        
        if (options?.autoStart && !this.started) {
            this.start();
        }
    }

    registerSystemRequiredExtension(extensionId: string) {
        this.systemRequiredExtensions.add(extensionId);
    }

    /**
     * Start the application loader.
     * Resolves which registered app to load from URL hints (?appId=, path) and settings, then loads it.
     * This method is idempotent - calling it multiple times only starts once.
     */
    async start(): Promise<void> {
        if (this.started) {
            logger.debug('AppLoader already started');
            return;
        }
        
        this.started = true;

        const urlParams = new URLSearchParams(window.location.search);
        const appIdFromUrl = urlParams.get('appId');
        const appIdFromPath = extractAppIdFromPath();

        if (appIdFromPath) {
            logger.info(`Extracted app ID from current page path: ${appIdFromPath}`);
        }

        const appToLoad = await this.selectAppToLoad({
            appIdFromUrl,
            appIdFromPath
        });
        
        if (!appToLoad) {
            throw new Error('No apps registered');
        }
        
        await this.loadApp(appToLoad, this.container);
    }

    /**
     * Resolve a path/URL segment to an app name (map key). Matches app.path, app.name, or name ending with /segment.
     */
    private findAppNameBySegment(segment: string): string | undefined {
        if (this.apps.has(segment)) return segment;
        for (const app of this.apps.values()) {
            if (app.path === segment || (app.name && app.name.endsWith('/' + segment))) return app.name ?? undefined;
        }
        return undefined;
    }

    /**
     * Load and initialize an application.
     * @param appName - Application name (must be already registered)
     * @param container - Optional DOM element to render into (if provided, auto-renders after loading)
     */
    private dispatchLoadProgress(message: string): void {
        window.dispatchEvent(new CustomEvent('app-load-progress', { detail: { message } }));
    }

    async loadApp(appName: string, container?: HTMLElement): Promise<void> {
        const app = this.apps.get(appName);
        if (!app) {
            throw new Error(`App '${appName}' not found. Make sure it's registered.`);
        }

        this.dispatchLoadProgress('Starting…');

        // Dispose current app if exists
        if (this.currentApp) {
            logger.info(`Disposing current app: ${this.currentApp.name}`);
            
            // Call app's dispose method
            if (this.currentApp.dispose) {
                await this.currentApp.dispose();
            }
            
            // Disable current app's extensions (but not system-required ones)
            if (this.currentApp.extensions && this.currentApp.extensions.length > 0) {
                logger.info(`Disabling ${this.currentApp.extensions.length} extensions...`);
                this.currentApp.extensions.forEach(extId => {
                    extensionRegistry.disable(extId);
                });
            }
        }
        
        // Apply app-level contribution remaps before registering contributions
        contributionTargetMappingRegistry.applyAppNameRemaps(app.remaps);
        if (app.remaps?.length) {
            const remappedTargets = new Set<string>();
            for (const r of app.remaps) {
                for (const t of r.targets) remappedTargets.add(t);
            }
            for (const target of remappedTargets) {
                const contributions = contributionRegistry.getContributions(target);
                publish(TOPIC_CONTRIBUTEIONS_CHANGED, { target, contributions });
            }
        }

        // Register app contributions
        if (app.contributions) {
            logger.info('Registering app contributions...');
            
            // Register UI contributions (tabs, toolbars, commands, etc.)
            if (app.contributions.ui) {
                app.contributions.ui.forEach(contribution => {
                    const target = contribution.target;
                    if (target) {
                        contributionRegistry.registerContribution(target, contribution);
                    }
                });
                logger.info(`Registered ${app.contributions.ui.length} UI contributions`);
            }
            
            // Register app-specific extensions
            if (app.contributions.extensions) {
                app.contributions.extensions.forEach(extension => {
                    extensionRegistry.registerExtension(extension);
                });
                logger.info(`Registered ${app.contributions.extensions.length} app extensions`);
            }
        }
        
        const extensionsSet = new Set<string>(app.extensions || []);
        this.systemRequiredExtensions.forEach(extId => extensionsSet.add(extId));
        app.extensions = Array.from(extensionsSet);

        // Enable and load app extensions first so declared dependencies 
        // are loaded before persisted settings extensions run.
        if (app.extensions.length > 0) {
            this.dispatchLoadProgress('Enabling extensions…');
            await Promise.all(
                app.extensions.map((extId) =>
                    extensionRegistry.enableAsync(extId).catch((e) => {
                        logger.error(`Failed to load extension ${extId}: ${getErrorMessage(e)}`);
                    })
                )
            );
        }

        // Load any additional extensions marked as enabled in settings (including
        // persisted external extensions).
        this.dispatchLoadProgress('Loading extensions…');
        await extensionRegistry.loadEnabledExtensions();

        // Initialize new app
        if (app.initialize) {
            this.dispatchLoadProgress('Initializing…');
            logger.info(`Initializing ${app.name}...`);
            await app.initialize();
        }

        this.currentApp = app;
        logger.info(`App ${app.name} loaded successfully`);
        this.updateDocumentMetadata(app);
        if (container) {
            this.dispatchLoadProgress('Rendering layout…');
            this.renderApp(container);
        }

        // Dispatch event for components to react to app changes
        window.dispatchEvent(new CustomEvent('app-loaded', { detail: { appName: app.name } }));
    }
    
    /**
     * Updates document title and favicon from app metadata
     */
    private updateDocumentMetadata(app: AppDefinition): void {
        document.title = app.name ?? '';
        
        // Set favicon if provided in metadata
        if (app.metadata?.favicon) {
            const faviconPath = app.metadata.favicon;
            let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.head.appendChild(link);
            }
            link.type = 'image/svg+xml';
            link.href = faviconPath;
        }
    }
    
    /**
     * Render the current application to the DOM.
     * Resolves the layout by layoutId (default 'standard'), renders its component, then calls layout.onShow if defined.
     *
     * @param container - DOM element to render into
     */
    renderApp(container: HTMLElement): void {
        if (!this.currentApp) {
            throw new Error('No app loaded. Call loadApp() first.');
        }

        const layoutId = getLayoutIdFromApp(this.currentApp);
        const layouts = contributionRegistry.getContributions<LayoutContribution>(SYSTEM_LAYOUTS);
        let layout = layouts.find((c) => c.id === layoutId);
        if (!layout) {
            logger.warn(`Layout '${layoutId}' not found, falling back to 'standard'`);
            layout = layouts.find((c) => c.id === 'standard');
        }
        if (!layout) {
            throw new Error(`No layout found for layoutId '${layoutId}' and no 'standard' layout registered.`);
        }

        const r = layout.component;
        let effectiveAttributes: Record<string, string> = {};
        if (r && typeof r === 'object' && 'tag' in r && r.attributes) {
            effectiveAttributes = { ...r.attributes };
        }

        container.innerHTML = '';
        if (typeof r === 'string') {
            const el = document.createElement(r);
            for (const [key, value] of Object.entries(effectiveAttributes)) {
                el.setAttribute(key, value);
            }
            container.appendChild(el);
        } else if (r && typeof r === 'object' && 'tag' in r) {
            const el = document.createElement(r.tag);
            for (const [key, value] of Object.entries(effectiveAttributes)) {
                el.setAttribute(key, value);
            }
            container.appendChild(el);
        } else if (typeof r === 'function') {
            render(r(), container);
        } else {
            throw new Error(`Layout '${layout.id}' has invalid component.`);
        }

        if (layout.onShow) {
            requestAnimationFrame(() => {
                void Promise.resolve(layout!.onShow!()).catch((err) =>
                    logger.error(`Layout onShow failed for '${layout!.id}': ${getErrorMessage(err)}`)
                );
            });
        }
    }
    
    /**
     * Get the currently loaded application.
     */
    getCurrentApp(): AppDefinition | undefined {
        return this.currentApp;
    }
    
    /**
     * Get all registered applications.
     */
    getRegisteredApps(): AppDefinition[] {
        return Array.from(this.apps.values());
    }
    
    /**
     * Get the preferred app ID from settings.
     */
    async getPreferredAppId(): Promise<string | undefined> {
        try {
            return await appSettings.get(AppLoaderService.PREFERRED_APP_KEY);
        } catch (error) {
            logger.debug(`Failed to get preferred app ID from settings: ${getErrorMessage(error)}`);
            return undefined;
        }
    }
    
    /**
     * Set the preferred app ID and persist it to settings.
     */
    async setPreferredAppId(appId: string): Promise<void> {
        if (!this.apps.has(appId)) {
            throw new Error(`App '${appId}' not found. Make sure it's registered.`);
        }
        try {
            await appSettings.set(AppLoaderService.PREFERRED_APP_KEY, appId);
            this.defaultAppName = appId;
            logger.info(`Set preferred app to: ${appId}`);
        } catch (error) {
            logger.error(`Failed to persist preferred app: ${getErrorMessage(error)}`);
            throw error;
        }
    }

    getRegisteredLayouts(): LayoutContribution[] {
        return contributionRegistry.getContributions<LayoutContribution>(SYSTEM_LAYOUTS);
    }

    getCurrentLayoutId(): string {
        return getLayoutIdFromApp(this.currentApp);
    }
    
    /**
     * Select which app to load based on priority:
     * 1. appId URL parameter (?appId=...)
     * 2. App from current page URL path (/my-app)
     * 3. Preferred app from settings
     * 4. Default app
     * 5. First registered app
     */
    private async selectAppToLoad(options: {
        appIdFromUrl: string | null;
        appIdFromPath: string | undefined;
    }): Promise<string | undefined> {
        const { appIdFromUrl, appIdFromPath } = options;

        if (appIdFromUrl) {
            const name = this.findAppNameBySegment(appIdFromUrl) ?? appIdFromUrl;
            if (this.apps.has(name)) {
                logger.info(`Loading app specified by URL parameter 'appId': ${name}`);
                return name;
            }
            logger.warn(`App '${appIdFromUrl}' from URL parameter not found`);
        }

        if (appIdFromPath) {
            const name = this.findAppNameBySegment(appIdFromPath);
            if (name) {
                logger.info(`Loading app from URL path: ${appIdFromPath}`);
                return name;
            }
            logger.debug(`App for path '${appIdFromPath}' not found, continuing search`);
        }

        const preferred = await this.getPreferredAppId();
        if (preferred && this.apps.has(preferred)) {
            logger.info(`Loading preferred app from settings: ${preferred}`);
            return preferred;
        }

        if (this.defaultAppName && this.apps.has(this.defaultAppName)) {
            return this.defaultAppName;
        }
        if (this.defaultAppName) {
            logger.warn(`Default app '${this.defaultAppName}' not found`);
        }

        const registeredApps = this.getRegisteredApps();
        if (registeredApps.length > 0) {
            const app = registeredApps[0];
            return app.name;
        }

        return undefined;
    }
}

export const appLoaderService = new AppLoaderService();
rootContext.put("appLoaderService", appLoaderService);

