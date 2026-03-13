/**
 * Commands for WebDAV workspace integration
 */

import { registerAll, workspaceService, createLogger, dialogService } from "@eclipse-lyra/core";
import type { WebDAVConnectionInfo } from "./webdav-client";

const logger = createLogger('WebDAV');

/**
 * Universal WebDAV connection command
 * Handles Nextcloud shares, direct WebDAV URLs, and more
 */
registerAll({
    command: {
        "id": "workspace.connect.webdav",
        "name": "WebDAV / NextCloud",
        "description": "Connect to WebDAV servers, Nextcloud shares, ownCloud, and other cloud storage",
        "parameters": [
            {
                "name": "url",
                "type": "string",
                "description": "WebDAV URL: share link (https://cloud.example.com/s/TOKEN) or direct endpoint",
                "required": false
            },
            {
                "name": "password",
                "type": "string",
                "description": "Password (if required)",
                "required": false
            }
        ]
    },
    handler: {
        execute: async (context) => {
            const url = context.parameters?.url as string;
            const password = context.parameters?.password as string;

            // If no parameters provided, open the shared WebDAV connect dialog
            if (!url) {
                await dialogService.open("webdav-connect-dialog");
                return;
            }

            try {
                let connectionInfo: WebDAVConnectionInfo;
                
                // Check if it's a Nextcloud/ownCloud share URL format
                const shareMatch = url.match(/^(https?:\/\/[^\/]+)\/(?:index\.php\/)?s\/([A-Za-z0-9]+)/);
                
                if (shareMatch) {
                    // It's a share URL - convert to WebDAV endpoint
                    const server = shareMatch[1];
                    const token = shareMatch[2];
                    
                    connectionInfo = {
                        url: `${server}/public.php/webdav/`,
                        username: token,
                        password: password || ''
                    };
                } else {
                    // It's a direct WebDAV URL - use as-is
                    connectionInfo = {
                        url,
                        ...(password && {
                            username: '',
                            password
                        })
                    };
                }

                await workspaceService.connectWorkspace(connectionInfo);
                logger.info('Connected to WebDAV workspace');
            } catch (error) {
                if (error instanceof Error) {
                    logger.error(`Failed to connect: ${error.message}`);
                } else {
                    logger.error('Failed to connect to WebDAV workspace');
                }
            }
        }
    },
    contribution: {
        target: "filebrowser.connections",
        name: "filebrowser.connections.webdav",
        label: "WebDAV / NextCloud",
        icon: "cloud"
    }
});
