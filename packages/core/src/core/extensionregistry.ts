import {appSettings, TOPIC_SETTINGS_CHANGED} from "./settingsservice";
import {publish, subscribe} from "./events";
import {toastError, toastInfo} from "./toast";
import {taskService} from "./taskservice";
import {rootContext, uiContext} from "./di";
import logger from "./logger";
import {esmShService} from "./esmsh-service";

export const TOPIC_EXTENSIONS_CHANGED = "events/extensionsregistry/extensionsConfigChanged"
const KEY_EXTENSIONS_CONFIG = "extensions"
const KEY_EXTERNAL_EXTENSIONS = "extensions.external"

/**
 * Extension definition for the extension registry.
 * 
 * @example
 * ```typescript
 * extensionRegistry.registerExtension({
 *     id: "system.myextension",
 *     name: "My Extension",
 *     description: "An example extension",
 *     loader: () => import("./my-extension.ts"),
 *     icon: "puzzle-piece",
 *     dependencies: ["system.dependency1", "system.dependency2"]
 * })
 * ```
 */
import { UILabel } from "./i18n";

export interface Extension {
    /** Unique identifier for the extension (e.g., "@eclipse-docks/extension-notebook") */
    id: string;
    
    /** Human-readable name of the extension */
    name: UILabel;
    
    /** Optional description of what the extension does */
    description?: UILabel;
    
    /** Optional URL to load the extension module from */
    url?: string;
    
    /** Function that dynamically imports the extension module */
    loader?: () => any;
    
    /** Optional icon identifier (FontAwesome or custom icon) */
    icon?: string;
    
    /** Whether this extension is marked as experimental */
    experimental?: boolean;
    
    /** Optional extension version */
    version?: string;
    
    /** Optional extension author */
    author?: string;
    
    /** Whether this extension is from an external source (marketplace) */
    external?: boolean;
    
    /**
     * Optional list of extension IDs that must be loaded before this extension.
     * Dependencies are loaded recursively and automatically when this extension is loaded.
     * The system includes circular dependency detection.
     * 
     * @example
     * ```typescript
     * dependencies: ["@eclipse-docks/extension-python-runtime"]
     * ```
     */
    dependencies?: string[];
}

export interface ExtensionSetting {
    id: string;
    enabled: boolean;
}

export type ExtensionsConfig = ExtensionSetting[]

class ExtensionRegistry {
    private extensionsSettings?: ExtensionsConfig;
    private extensions: { [key: string]: Extension } = {}
    private loadedExtensions: Set<string> = new Set()
    private loadingPromises: Map<string, Promise<void>> = new Map()

    constructor() {
        subscribe(TOPIC_SETTINGS_CHANGED, () => {
            this.extensionsSettings = undefined
            this.checkExtensionsConfig().then()
        })

        // Initialize settings and load metadata for persisted external extensions.
        // Actual extension loading is triggered by the app loader (app.extensions)
        // and explicit calls to enable()/load(), so we avoid eagerly loading any
        // extensions before an app has started.
        this.loadPersistedExternalExtensions().then(() => {
            this.checkExtensionsConfig().then()
        })
    }

    private async loadPersistedExternalExtensions(): Promise<void> {
        try {
            const persisted = await appSettings.get(KEY_EXTERNAL_EXTENSIONS)
            if (persisted && Array.isArray(persisted)) {
                persisted.forEach((ext: Extension) => {
                    this.extensions[ext.id] = ext
                })
            }
        } catch (error) {
            logger.error(`Failed to load persisted external extensions: ${error}`)
        }
    }

    private async savePersistedExternalExtensions(): Promise<void> {
        try {
            const externalExtensions = Object.values(this.extensions).filter(ext => ext.external)
            await appSettings.set(KEY_EXTERNAL_EXTENSIONS, externalExtensions)
        } catch (error) {
            logger.error(`Failed to save persisted external extensions: ${error}`)
        }
    }

    private async checkExtensionsConfig() {
        if (!this.extensionsSettings) {
            this.extensionsSettings = await appSettings.get(KEY_EXTENSIONS_CONFIG)
            if (!this.extensionsSettings) {
                await appSettings.set(KEY_EXTENSIONS_CONFIG, [])
                this.extensionsSettings = await appSettings.get(KEY_EXTENSIONS_CONFIG)
            }
            publish(TOPIC_EXTENSIONS_CHANGED, this.extensionsSettings)
        }
    }


    registerExtension(extension: Extension): void {
        this.extensions[extension.id] = extension;
        logger.debug(`Registered extension: ${extension.id}`);

        // Persist external extensions
        if (extension.external) {
            this.savePersistedExternalExtensions().catch(err => {
                logger.error(`Failed to persist external extension: ${err}`)
            })
        }
        
        publish(TOPIC_EXTENSIONS_CHANGED, this.extensionsSettings);
    }

    /**
     * Load an extension from a URL and register it.
     * The module at the URL must export a default function that receives uiContext.
     * The extension will register its contributions when loaded.
     * 
     * Supports:
     * - Direct URLs (http/https)
     * - esm.sh URLs
     * - Source identifiers (npm packages, GitHub repos, JSR packages, PR packages)
     *   Examples: 'react@18', 'gh/user/repo', 'jsr/@std/encoding@1.0.0', 'pr/owner/repo@commit'
     * 
     * @param url - URL or source identifier to the extension module
     * @param extensionId - Optional extension ID. If not provided, generates one from the URL.
     * @returns Promise that resolves to the extension ID when the extension is loaded
     */
    async loadExtensionFromUrl(url: string, extensionId?: string): Promise<string> {
        logger.info(`Loading extension from URL: ${url}...`);
        
        try {
            let finalUrl = url;
            let extensionName = `Extension from ${url}`;

            if (esmShService.isSourceIdentifier(url)) {
                const packageName = esmShService.extractPackageName(url);
                if (packageName) {
                    extensionName = `Extension: ${packageName}`;
                }
                finalUrl = esmShService.normalizeToEsmSh(url);
                logger.debug(`Converted source identifier to esm.sh URL: ${url} -> ${finalUrl}`);
            }
            
            const id = extensionId || `url:${finalUrl}`;
            
            if (this.isEnabled(id)) {
                logger.info(`Extension from URL ${finalUrl} is already enabled`);
                return id;
            }
            
            // Check if extension is already registered
            if (!this.extensions[id]) {
                const extension: Extension = {
                    id: id,
                    name: extensionName,
                    description: `Extension loaded from: ${url}`,
                    url: finalUrl
                };
                
                this.registerExtension(extension);
                logger.info(`Registered extension from URL: ${id}`);
            }
            
            await this.enableAsync(id, false);

            logger.info(`Successfully enabled extension from URL: ${finalUrl}`);
            return id;
        } catch (error) {
            logger.error(`Failed to load extension from URL ${url}: ${error}`);
            throw error;
        }
    }

    getExtensions(): Extension[] {
        return Object.values(this.extensions)
    }

    /**
     * Load all extensions that are currently marked as enabled in settings.
     * This is intended to be called by the app loader once an app has started,
     * after all extension modules have had a chance to register themselves.
     */
    public async loadEnabledExtensions(): Promise<void> {
        await this.checkExtensionsConfig();
        const settings = this.extensionsSettings ?? [];
        const loadPromises = settings
            // Only attempt to load extensions that are:
            // - marked as enabled, and
            // - already registered in this.extensions (either built-in or persisted external).
            .filter(setting => this.isEnabled(setting.id) && this.extensions[setting.id])
            .map(setting =>
                this.load(setting.id).catch(e => {
                    toastError("Extension could not be loaded: " + e.message);
                }),
            );

        await Promise.all(loadPromises);
    }

    public isEnabled(extensionId: string) {
        this.checkExtensionsConfig()
        return !!this.extensionsSettings?.find((setting) => setting.id === extensionId && setting.enabled)
    }

    public isLoaded(extensionId: string) {
        return this.loadedExtensions.has(extensionId)
    }

    public enable(extensionId: string, informUser: boolean = false) {
        if (this.isEnabled(extensionId)) {
            return
        }
        logger.debug(`Loading extension: ${extensionId}`)
        this.load(extensionId)
            .then(() => this.updateEnablementAsync(extensionId, true, informUser))
            .catch(_e => {
                logger.error(`Could not load extension: ${extensionId}: ${_e}`)
            })
    }

    /** Like enable() but returns a Promise that resolves when the extension is loaded. Use when the caller must wait for commands/contributions to be registered (e.g. before rendering the app). */
    public async enableAsync(extensionId: string, informUser: boolean = false): Promise<void> {
        if (this.isEnabled(extensionId)) {
            if (!this.isLoaded(extensionId)) {
                logger.debug(
                    `Extension ${extensionId} is enabled in settings but not loaded; loading now`,
                );
                try {
                    await this.load(extensionId);
                } catch (e) {
                    logger.error(`Could not load extension: ${extensionId}: ${e}`);
                    throw e;
                }
            }
            return;
        }
        logger.debug(`Loading extension: ${extensionId}`)
        try {
            await this.load(extensionId)
            await this.updateEnablementAsync(extensionId, true, informUser)
        } catch (e) {
            logger.error(`Could not load extension: ${extensionId}: ${e}`)
            throw e
        }
    }

    /**
     * Loads an extension and all its dependencies.
     * 
     * Features:
     * - Automatically loads all dependencies recursively before loading the extension
     * - Ensures each extension is loaded only once (idempotent)
     * - Dependencies are loaded in the order they are declared
     * - If an extension is already being loaded, waits for that load to complete
     * - Detects circular dependencies in the dependency chain
     * 
     * @param extensionId - The ID of the extension to load
     * @param loadingChain - Internal parameter to track the dependency chain for circular detection
     * @throws Error if the extension is not found or if a circular dependency is detected
     * 
     * @example
     * ```typescript
     * // This will automatically load @eclipse-docks/extension-python-runtime first
     * await extensionRegistry.load('@eclipse-docks/extension-notebook')
     * ```
     */
    public async load(extensionId: string, loadingChain: string[] = []): Promise<void> {
        // Already loaded, return immediately
        if (this.loadedExtensions.has(extensionId)) {
            return
        }
        
        // Currently loading by another call chain, wait for that promise to complete
        const existingPromise = this.loadingPromises.get(extensionId)
        if (existingPromise) {
            return existingPromise
        }
        
        // Check for circular dependency
        if (loadingChain.includes(extensionId)) {
            const chain = [...loadingChain, extensionId].join(' → ')
            throw new Error(`Circular dependency detected: ${chain}`)
        }
        
        const extension = this.extensions[extensionId]
        if (!extension) {
            throw new Error("Extension not found: " + extensionId)
        }
        
        const loadingPromise = (async () => {
            try {
                logger.debug(`Loading extension: ${extensionId}`);
                if (extension.dependencies && extension.dependencies.length > 0) {
                    const newChain = [...loadingChain, extensionId]
                    for (const depId of extension.dependencies) {
                        await this.load(depId, newChain)
                        // Enable the dependency if it's not already enabled
                        if (!this.isEnabled(depId)) {
                            await this.updateEnablementAsync(depId, true, false)
                            logger.debug(`Auto-enabled dependency: ${depId}`)
                        }
                    }
                }
                
                const module = await taskService.runAsync("Loading extension: " + extension.name, async () => {
                    if (extension.loader) {
                        return extension.loader()
                    } else if (extension.url) {
                        let finalUrl = extension.url;
                        if (esmShService.isSourceIdentifier(extension.url)) {
                            finalUrl = esmShService.normalizeToEsmSh(extension.url);
                            logger.debug(`Normalized extension URL: ${extension.url} -> ${finalUrl}`);
                        }
                        return import(/* @vite-ignore */ finalUrl)
                    }
                })

                if (module?.default instanceof Function) {
                    try {
                        const activationResult = module.default(uiContext.getProxy())
                        await Promise.resolve(activationResult)
                    } catch (error) {
                        logger.error(`Error executing extension function for ${extensionId}: ${error}`)
                        throw error
                    }
                }

                this.loadedExtensions.add(extensionId)
                
            } catch (error) {
                // If loading failed, remove from loaded set
                this.loadedExtensions.delete(extensionId)
                throw error
            } finally {
                // Always clean up the promise
                this.loadingPromises.delete(extensionId)
            }
        })()
        
        this.loadingPromises.set(extensionId, loadingPromise)
        return loadingPromise
    }

    public disable(extensionId: string, informUser: boolean = false) {
        if (!this.isEnabled(extensionId)) {
            return
        }
        void this.updateEnablementAsync(extensionId, false, informUser).catch((e) => {
            logger.error(`Could not persist disable for extension ${extensionId}: ${e}`)
        })
    }

    private async updateEnablementAsync(extensionId: string, enabled: boolean, informUser: boolean) {
        await this.checkExtensionsConfig()
        const extension = this.extensionsSettings?.find(e => e.id == extensionId)
        if (extension) {
            extension.enabled = enabled
        } else {
            this.extensionsSettings?.push({id: extensionId, enabled: enabled})
        }
        await appSettings.set(KEY_EXTENSIONS_CONFIG, this.extensionsSettings)
        if (informUser) {
            const extObj = this.extensions[extensionId]
            if (enabled) {
                toastInfo(extObj.name + " enabled.")
            } else {
                toastInfo(extObj.name + " disabled " + " - Please restart to take effect")
            }
        }
        publish(TOPIC_EXTENSIONS_CHANGED, this.extensionsSettings)
    }
}

export const extensionRegistry = new ExtensionRegistry()
rootContext.put("extensionRegistry", extensionRegistry)