import {appSettings} from "./settingsservice";
import {publish} from "./events";
import {createLogger} from "./logger";
import {extensionRegistry, Extension} from "./extensionregistry";
import {rootContext} from "./di";

const logger = createLogger('MarketplaceRegistry');

export const TOPIC_MARKETPLACE_CHANGED = "events/marketplaceregistry/changed";

export interface MarketplaceCatalog {
    name?: string;
    description?: string;
    extensions?: Extension[];
}

const KEY_CATALOG_URLS = "marketplace.catalogUrls";

class MarketplaceRegistry {
    private catalogUrls: string[] = [];
    private loadingPromises: Map<string, Promise<MarketplaceCatalog>> = new Map();

    constructor() {
        // Load catalog URLs and refresh catalogs
        this.loadCatalogUrls().then(() => {
            this.refreshCatalogs().catch(err => {
                logger.error(`Failed to refresh catalogs on init: ${err.message}`);
            });
        });
    }

    private async loadCatalogUrls(): Promise<void> {
        try {
            const urls = await appSettings.get(KEY_CATALOG_URLS);
            this.catalogUrls = Array.isArray(urls) ? urls : [];
        } catch (error) {
            logger.error(`Failed to load catalog URLs: ${error}`);
            this.catalogUrls = [];
        }
    }

    private async saveCatalogUrls(): Promise<void> {
        await appSettings.set(KEY_CATALOG_URLS, this.catalogUrls);
        publish(TOPIC_MARKETPLACE_CHANGED, {type: 'catalogs', urls: this.catalogUrls});
    }

    async addCatalogUrl(url: string): Promise<void> {
        if (!this.isValidUrl(url)) {
            throw new Error(`Invalid catalog URL: ${url}`);
        }

        if (this.catalogUrls.includes(url)) {
            logger.debug(`Catalog URL already exists: ${url}`);
            return;
        }

        this.catalogUrls.push(url);
        await this.saveCatalogUrls();
        logger.debug(`Added catalog URL: ${url}`);

        try {
            await this.refreshCatalogs();
        } catch (error) {
            logger.warn(`Failed to refresh catalogs immediately after adding: ${error}`);
        }
    }

    async addCatalogUrls(urls: string[]): Promise<void> {
        let added = 0;
        for (const url of urls) {
            if (!this.isValidUrl(url)) {
                logger.warn(`Skipping invalid catalog URL: ${url}`);
                continue;
            }
            if (this.catalogUrls.includes(url)) continue;
            this.catalogUrls.push(url);
            logger.debug(`Added catalog URL: ${url}`);
            added++;
        }
        if (added === 0) return;
        await this.saveCatalogUrls();
        try {
            await this.refreshCatalogs();
        } catch (error) {
            logger.warn(`Failed to refresh catalogs after adding URLs: ${error}`);
        }
    }

    async removeCatalogUrl(url: string): Promise<void> {
        const index = this.catalogUrls.indexOf(url);
        if (index === -1) {
            return;
        }

        this.catalogUrls.splice(index, 1);
        await this.saveCatalogUrls();
        logger.info(`Removed catalog URL: ${url}`);
    }

    getCatalogUrls(): string[] {
        return [...this.catalogUrls];
    }

    private isValidUrl(url: string): boolean {
        try {
            const parsed = new URL(url);
            return parsed.protocol === 'http:' || parsed.protocol === 'https:';
        } catch {
            return false;
        }
    }

    private async fetchCatalog(url: string): Promise<MarketplaceCatalog> {
        const existingPromise = this.loadingPromises.get(url);
        if (existingPromise) {
            return existingPromise;
        }

        const fetchPromise = (async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const data = await response.json() as MarketplaceCatalog;

                if (!data.extensions || !Array.isArray(data.extensions)) {
                    throw new Error('Invalid catalog format: extensions array is required');
                }

                const catalog: MarketplaceCatalog = {
                    name: data.name,
                    description: data.description,
                    extensions: data.extensions || [],
                };

                return catalog;
            } catch (error) {
                logger.error(`Failed to fetch catalog from ${url}: ${error}`);
                throw error;
            } finally {
                this.loadingPromises.delete(url);
            }
        })();

        this.loadingPromises.set(url, fetchPromise);
        return fetchPromise;
    }

    async refreshCatalogs(): Promise<void> {
        const promises = this.catalogUrls.map(url =>
            this.fetchCatalog(url).catch(error => {
                logger.warn(`Failed to refresh catalog ${url}: ${error.message}`);
                return null;
            })
        );

        const catalogs = await Promise.allSettled(promises);
        let registeredCount = 0;

        catalogs.forEach((result) => {
            if (result.status === 'fulfilled' && result.value) {
                const catalog = result.value;
                if (catalog.extensions) {
                    catalog.extensions.forEach(marketplaceExt => {
                        if (!extensionRegistry.getExtensions().find(e => e.id === marketplaceExt.id)) {
                            const extension: Extension = {
                                ...marketplaceExt,
                                external: true
                            };
                            extensionRegistry.registerExtension(extension);
                            registeredCount++;
                        }
                    });
                }
            }
        });

        logger.debug(`Refreshed ${this.catalogUrls.length} catalogs, ${registeredCount} extensions registered`);
        if (registeredCount > 0) {
            logger.info(`Marketplace: ${registeredCount} new extension(s) available`);
        }
        publish(TOPIC_MARKETPLACE_CHANGED, {type: 'refreshed'});
    }

    getMarketplaceExtension(extensionId: string): Extension | undefined {
        // Check if extension is registered in extensionRegistry and is external
        const extension = extensionRegistry.getExtensions().find(e => e.id === extensionId);
        if (extension && extension.external) {
            return extension;
        }
        return undefined;
    }

    isMarketplaceExtension(extensionId: string): boolean {
        const extension = extensionRegistry.getExtensions().find(e => e.id === extensionId);
        return extension !== undefined && extension.external === true;
    }
}

export const marketplaceRegistry = new MarketplaceRegistry();
rootContext.put("marketplaceRegistry", marketplaceRegistry);

