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

import { workspaceService, createLogger, contributionRegistry } from '@eclipse-lyra/core';

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
import { LyraWebDAVConnect } from "./webdav-connect";

// Import commands (registers themselves)
import './webdav-commands';

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
        const rootResource: WebDAVResource = {
            href: input.url,
            displayName: extractWorkspaceNameFromUrl(input.url),
            isDirectory: true
        };
        return new WebDAVDirectoryResource(client, rootResource, undefined, input);
    },
    
    async restore(data: WebDAVConnectionInfo) {
        if (!data || !data.url) {
            return undefined;
        }

        try {
            const restored: WebDAVConnectionInfo = {
                url: data.url,
                username: data.username,
                password: data.password ? decodePassword(data.password) : undefined
            };

            const client = new WebDAVClient(restored);
            const rootResource: WebDAVResource = {
                href: data.url,
                displayName: extractWorkspaceNameFromUrl(data.url),
                isDirectory: true
            };
            return new WebDAVDirectoryResource(client, rootResource, undefined, restored);
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
        html`<lyra-webdav-connect></lyra-webdav-connect>`,
    onButton: async (id: string, result: any, state?: WebDAVDialogState) => {
        const component = result as LyraWebDAVConnect | undefined;

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