/**
 * WebDAV Extension for geo!space
 * 
 * This extension enables connecting to WebDAV servers (Nextcloud, ownCloud, etc.)
 * as workspace folders, providing cloud storage integration.
 * 
 * Features:
 * - Connect to WebDAV servers
 * - Full file/directory operations
 * - Nextcloud and ownCloud support
 * - Seamless integration with existing workspace API
 * 
 * Usage:
 * Import this file to register the WebDAV extension and its commands.
 */

import { workspaceService, createLogger, contributionRegistry } from '@eclipse-docks/core';

const logger = createLogger('WebDAVExtension');
import { WebDAVClient, type WebDAVConnectionInfo } from './webdav-client';
import { WebDAVDirectoryResource } from './webdav-filesys';
import type { WebDAVResource } from './webdav-client';

// Export all WebDAV types and classes
export { WebDAVClient, type WebDAVConnectionInfo, type WebDAVResource } from './webdav-client';
export { WebDAVFileResource, WebDAVDirectoryResource } from './webdav-filesys';

// Import UI component (registers itself)
import './webdav-connect';
import { html } from "lit";
import { DocksWebDAVConnect } from "./webdav-connect";

// Import commands (registers themselves)
import './webdav-commands';

/** Turn a PROPFIND display name into a workspace folder label, ignoring generic DAV endpoints. */
function folderNameFromDisplayName(displayName: string | undefined, url: string): string | undefined {
    const cleaned = displayName?.replace(/[\\/]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!cleaned || cleaned === '.' || cleaned === '..') {
        return undefined;
    }
    const leaf = extractWorkspaceNameFromUrl(url);
    if (cleaned.toLowerCase() === leaf.toLowerCase() && /^(webdav|dav)$/i.test(leaf)) {
        return undefined;
    }
    return cleaned;
}

async function usedFolderNames(): Promise<Set<string>> {
    const folders = await workspaceService.getFolders();
    return new Set(folders.map((folder) => folder.name));
}

async function allocateFolderName(preferred?: string): Promise<string> {
    const used = await usedFolderNames();
    if (preferred && !used.has(preferred)) {
        return preferred;
    }
    if (!preferred) {
        let n = 1;
        while (used.has(`webdav${n}`)) {
            n += 1;
        }
        return `webdav${n}`;
    }
    let n = 2;
    while (used.has(`${preferred} ${n}`)) {
        n += 1;
    }
    return `${preferred} ${n}`;
}

async function resolveConnectionName(client: WebDAVClient, input: WebDAVConnectionInfo): Promise<string> {
    const explicit = input.name?.trim();
    if (explicit) {
        return explicit;
    }
    try {
        const [root] = await client.propfind(input.url, 0);
        const detected = folderNameFromDisplayName(root?.displayName, input.url);
        return await allocateFolderName(detected);
    } catch (error) {
        logger.debug('Could not read WebDAV root name', error);
        return await allocateFolderName();
    }
}

// Register WebDAV as a workspace contribution
workspaceService.registerContribution({
    type: 'webdav',
    name: 'webdav',

    canHandle(input: any): boolean {
        // Accept any connection info with a URL (credentials are optional for public/shared folders)
        return input && typeof input === 'object' && 'url' in input && typeof input.url === 'string';
    },

    async connect(input: WebDAVConnectionInfo) {
        const client = new WebDAVClient(input);
        const name = await resolveConnectionName(client, input);
        const rootResource: WebDAVResource = {
            href: input.url,
            displayName: name,
            isDirectory: true
        };
        return new WebDAVDirectoryResource(client, rootResource, undefined, { ...input, name });
    },

    async restore(data: WebDAVConnectionInfo & { name?: string }) {
        if (!data || !data.url) {
            return undefined;
        }

        try {
            const restored: WebDAVConnectionInfo = {
                url: data.url,
                username: data.username,
                password: data.password ? decodePassword(data.password) : undefined
            };
            const name =
                typeof data.name === 'string' && data.name.trim().length > 0
                    ? data.name.trim()
                    : await allocateFolderName();

            const client = new WebDAVClient(restored);
            const rootResource: WebDAVResource = {
                href: data.url,
                displayName: extractWorkspaceNameFromUrl(data.url),
                isDirectory: true
            };
            return new WebDAVDirectoryResource(client, rootResource, undefined, { ...restored, name });
        } catch (error) {
            logger.error('Failed to restore WebDAV workspace:', error);
            return undefined;
        }
    },

    async persist(workspace) {
        if (workspace instanceof WebDAVDirectoryResource) {
            const connectionInfo = workspace.getConnectionInfo();
            if (!connectionInfo) {
                return null;
            }

            return {
                url: connectionInfo.url,
                name: workspace.getName(),
                ...(connectionInfo.username !== undefined ? { username: connectionInfo.username } : {}),
                ...(connectionInfo.password !== undefined ? { password: encodePassword(connectionInfo.password) } : {})
            };
        }
        return null;
    }
});

interface WebDAVDialogState {
    close?: () => void;
}

contributionRegistry.registerContribution("dialogs", {
    label: "Connect to WebDAV / NextCloud",
    icon: "cloud",
    name: "dialog.webdav.connect",
    id: "webdav-connect-dialog",
    buttons: [
        { id: "help", label: "Show help", variant: "neutral" },
        { id: "cancel", label: "Cancel", variant: "default" },
        { id: "connect", label: "Connect", variant: "primary" }
    ],
    component: (_state?: WebDAVDialogState) =>
        html`<docks-webdav-connect></docks-webdav-connect>`,
    onButton: async (id: string, result: any, state?: WebDAVDialogState) => {
        const component = result as DocksWebDAVConnect | undefined;

        if (id === "help") {
            component?.toggleHelp();
            return false;
        }

        if (id === "connect") {
            if (component?.handleConnect) {
                const ok = await component.handleConnect();
                if (ok) {
                    state?.close?.();
                    return true;
                }
                return false;
            }
            return true;
        }

        if (id === "cancel") {
            state?.close?.();
            return true;
        }

        return true;
    }
} as any);

function extractWorkspaceNameFromUrl(url: string): string {
    try {
        const urlObj = new URL(url);
        const pathParts = urlObj.pathname.split('/').filter(Boolean);
        return pathParts[pathParts.length - 1] || 'workspace';
    } catch {
        return 'workspace';
    }
}

function encodePassword(password: string): string {
    try {
        const encoder = new TextEncoder();
        const bytes = encoder.encode(password);
        let binary = '';
        for (const b of bytes) {
            binary += String.fromCharCode(b);
        }
        return btoa(binary);
    } catch {
        return password;
    }
}

function decodePassword(encoded: string): string {
    try {
        const binary = atob(encoded);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        const decoder = new TextDecoder();
        return decoder.decode(bytes);
    } catch {
        // If it's not valid base64 (e.g. older plain-text entries), return as-is
        return encoded;
    }
}