/**
 * App Loader Service
 * 
 * Provides a clean separation between the framework and applications built on it.
 * This allows the framework (k-* components and core services) to be published
 * as a reusable npm package, while applications like geospace can be loaded
 * dynamically.
 * 
 * Architecture:
 * - Framework: Core services, k-* components (publishable as npm package)
 * - Application: App-specific code, gs-* components, contributions
 * - App Loader: Bridge between framework and application
 */

import {render, TemplateResult, html} from "lit";
import {rootContext} from "./di";
import {createLogger} from "./logger";
import {extensionRegistry, Extension} from "./extensionregistry";
import {contributionRegistry, Contribution, LayoutContribution} from "./contributionregistry";
import {SYSTEM_LAYOUTS} from "./constants";
import {appSettings} from "./settingsservice";
import { marketplaceRegistry } from "./marketplaceregistry";


const logger = createLogger('AppLoader');

/**
 * Extracts error message from an error object.
 */
function getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
}

/**
 * Extracts the last path segment from a URL string.
 */
function extractLastPathSegment(urlString: string): string | undefined {
    try {
        const url = new URL(urlString);
        const pathSegments = url.pathname.split('/').filter(Boolean);
        return pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : undefined;
    } catch {
        const pathSegments = urlString.split('/').filter(Boolean);
        return pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : undefined;
    }
}

/**
 * Extracts the first path segment from the current page URL.
 * This allows loading apps by path, e.g., /geospace loads the geospace app.
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

    /** Optional URL path segment for routing (e.g. "geospace"). When absent, name is used for lookup. */
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
     * Id of a layout registered to the system.layouts contribution slot.
     * The app root is always the chosen layout's component. Defaults to 'standard' when omitted.
     */
    layoutId?: string;

    /**
     * Optional cleanup function.
     * Called when the app is being unloaded, before extensions are disabled.
     */
    dispose?: () => void | Promise<void>;

    /** Resolved dependency versions (e.g. from build plugin). Shown in About / version info. */
    dependencies?: Record<string, string>;

    /** Marketplace catalog URLs for this app. Registered when the app is registered. */
    marketplaceCatalogUrls?: string[];
}

/**
 * Options for registering an application with the apploader.
 */
export interface RegisterAppOptions {
    /** Default app name to load if no app URL parameter is provided. If not specified, the first registered app is loaded. */
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
    private static readonly PREFERRED_LAYOUT_KEY = 'preferredLayoutId';
    private preferredLayoutId?: string;
    
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

        if (this.apps.has(app.name)) {
            logger.warn(`App '${app.name}' is already registered. Overwriting.`);
        }
        if (app.marketplaceCatalogUrls?.length) {
            app.marketplaceCatalogUrls.forEach((url) => marketplaceRegistry.addCatalogUrl(url).catch(() => {}));
        }

        this.apps.set(app.name, app);
        logger.info(`Registered app: ${app.name} v${app.version}`);

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
     * Load an application definition from a URL.
     * The module at the URL must export an AppDefinition as the default export.
     * 
     * @param url - URL to the app definition module
     * @returns Promise that resolves to the loaded AppDefinition
     */
    async loadAppFromUrl(url: string): Promise<AppDefinition> {
        logger.info(`Loading app from URL: ${url}...`);
        
        try {
            const module = await import(/* @vite-ignore */ url);
            
            if (!module.default) {
                throw new Error(`Module at ${url} does not have a default export`);
            }
            
            const app = module.default as AppDefinition;
            
            if (!app.name || !app.version) {
                throw new Error(`Module at ${url} does not export a valid AppDefinition (name and version required)`);
            }
            logger.info(`Successfully loaded app definition from URL: ${app.name}`);
            return app;
        } catch (error) {
            logger.error(`Failed to load app from URL ${url}: ${getErrorMessage(error)}`);
            throw error;
        }
    }

    /**
     * Start the application loader.
     * Checks URL parameters for app=URL, loads that extension or app if found.
     * URL parameter has higher precedence than defaultAppName.
     * Then loads the default app or first registered app.
     * This method is idempotent - calling it multiple times only starts once.
     */
    async start(): Promise<void> {
        if (this.started) {
            logger.debug('AppLoader already started');
            return;
        }
        
        this.started = true;
        logger.info('Starting AppLoader...');
        
        const urlParams = new URLSearchParams(window.location.search);
        const appUrl = urlParams.get('app');
        const appIdFromUrl = urlParams.get('appId');
        const appIdFromPath = extractAppIdFromPath();
        const appsBeforeExtension = this.apps.size;
        
        let appIdFromAppUrl: string | undefined;
        if (appUrl) {
            appIdFromAppUrl = extractLastPathSegment(appUrl);
            if (appIdFromAppUrl) {
                logger.info(`Extracted app ID from URL path: ${appIdFromAppUrl}`);
            }
        }
        
        if (appIdFromPath) {
            logger.info(`Extracted app ID from current page path: ${appIdFromPath}`);
        }
        
        if (appUrl) {
            try {
                logger.info(`URL parameter 'app' found: ${appUrl}, attempting to load extension or app`);
                
                try {
                    await extensionRegistry.loadExtensionFromUrl(appUrl);
                    logger.info(`Successfully loaded extension from URL: ${appUrl}`);
                } catch (extensionError) {
                    logger.info(`Failed to load as extension, trying as app definition: ${getErrorMessage(extensionError)}`);
                    
                    try {
                        const app = await this.loadAppFromUrl(appUrl);
                        this.registerApp(app);
                        if (!app.name) throw new Error('App from URL has no name after registration');
                        await this.loadApp(app.name, this.container);
                        logger.info(`Successfully loaded app from URL: ${appUrl}`);
                        return;
                    } catch (appError) {
                        logger.error(`Failed to load from URL as both extension and app: ${getErrorMessage(appError)}`);
                        throw appError;
                    }
                }
            } catch (error) {
                logger.error(`Failed to load from URL parameter, falling back to default app: ${getErrorMessage(error)}`);
            }
        }
        
        const appToLoad = await this.selectAppToLoad({
            appIdFromUrl,
            appIdFromPath,
            appIdFromAppUrl,
            appsBeforeExtension
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
    async loadApp(appName: string, container?: HTMLElement): Promise<void> {
        const app = this.apps.get(appName);
        if (!app) {
            throw new Error(`App '${appName}' not found. Make sure it's registered.`);
        }
        
        logger.info(`Loading app: ${app.name}...`);
        
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
        
        // Enable new app's extensions (after contributions are registered)
        if (app.extensions.length > 0) {
            logger.info(`Enabling ${app.extensions.length} extensions...`);
            app.extensions.forEach(extId => {
                extensionRegistry.enable(extId);
            });
        }
        
        // Initialize new app
        if (app.initialize) {
            logger.info(`Initializing ${app.name}...`);
            await app.initialize();
        }
        
        this.currentApp = app;
        logger.info(`App ${app.name} loaded successfully`);
        this.preferredLayoutId = await this.getPreferredLayoutId();
        this.updateDocumentMetadata(app);
        if (container) {
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

        const layoutId = this.preferredLayoutId ?? this.currentApp.layoutId ?? 'standard';
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
        container.innerHTML = '';
        if (typeof r === 'string') {
            container.appendChild(document.createElement(r));
        } else if (r && typeof r === 'object' && 'tag' in r) {
            const el = document.createElement(r.tag);
            for (const [key, value] of Object.entries(r.attributes ?? {})) {
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
        logger.info(`Rendered ${this.currentApp.name}`);
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
        return this.preferredLayoutId ?? this.currentApp?.layoutId ?? 'standard';
    }

    async getPreferredLayoutId(): Promise<string | undefined> {
        try {
            return await appSettings.get(AppLoaderService.PREFERRED_LAYOUT_KEY);
        } catch (error) {
            logger.debug(`Failed to get preferred layout ID: ${getErrorMessage(error)}`);
            return undefined;
        }
    }

    async setPreferredLayoutId(layoutId: string): Promise<void> {
        const layouts = this.getRegisteredLayouts();
        if (!layouts.some((l) => l.id === layoutId)) {
            throw new Error(`Layout '${layoutId}' not found.`);
        }
        try {
            await appSettings.set(AppLoaderService.PREFERRED_LAYOUT_KEY, layoutId);
            this.preferredLayoutId = layoutId;
            logger.info(`Set preferred layout to: ${layoutId}`);
            if (this.currentApp && this.container) {
                this.renderApp(this.container);
            }
            window.dispatchEvent(new CustomEvent('layout-changed', { detail: { layoutId } }));
        } catch (error) {
            logger.error(`Failed to persist preferred layout: ${getErrorMessage(error)}`);
            throw error;
        }
    }
    
    /**
     * Select which app to load based on priority:
     * 1. appId URL parameter (?appId=...)
     * 2. App from current page URL path (/geospace)
     * 3. App from app URL parameter (?app=...)
     * 4. App registered by extension
     * 5. Preferred app from settings
     * 6. Default app
     * 7. First registered app
     */
    private async selectAppToLoad(options: {
        appIdFromUrl: string | null;
        appIdFromPath: string | undefined;
        appIdFromAppUrl: string | undefined;
        appsBeforeExtension: number;
    }): Promise<string | undefined> {
        const { appIdFromUrl, appIdFromPath, appIdFromAppUrl, appsBeforeExtension } = options;

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

        if (appIdFromAppUrl) {
            const name = this.findAppNameBySegment(appIdFromAppUrl) ?? appIdFromAppUrl;
            if (this.apps.has(name)) {
                logger.info(`Loading app using segment from app URL path: ${name}`);
                return name;
            }
        }

        if (this.apps.size > appsBeforeExtension) {
            const newlyRegisteredApps = Array.from(this.apps.values()).slice(appsBeforeExtension);
            if (newlyRegisteredApps.length > 0) {
                const app = newlyRegisteredApps[0];
                logger.info(`Loading app registered by extension: ${app.name}`);
                return app.name;
            }
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
            logger.info(`Loading first registered app: ${app.name}`);
            return app.name;
        }

        return undefined;
    }
}

export const appLoaderService = new AppLoaderService();
rootContext.put("appLoaderService", appLoaderService);

