export interface WebDAVConnectionInfo {
    url: string;
    username?: string;
    password?: string;
}

export interface WebDAVResource {
    href: string;
    displayName: string;
    isDirectory: boolean;
    contentType?: string;
    contentLength?: number;
    lastModified?: Date;
    etag?: string;
}

export class WebDAVClient {
    private baseUrl: string;
    private authHeader?: string;

    constructor(connectionInfo: WebDAVConnectionInfo) {
        this.baseUrl = connectionInfo.url;
        if (connectionInfo.username !== undefined) {
            const raw = `${connectionInfo.username}:${connectionInfo.password ?? ''}`;
            this.authHeader = `Basic ${btoa(raw)}`;
        }
    }

    async propfind(path: string, depth: number = 1): Promise<WebDAVResource[]> {
        const requestBody = `<?xml version="1.0" encoding="UTF-8"?>
            <d:propfind xmlns:d="DAV:">
                <d:prop>
                    <d:displayname/>
                    <d:resourcetype/>
                    <d:getcontenttype/>
                    <d:getcontentlength/>
                    <d:getlastmodified/>
                    <d:getetag/>
                </d:prop>
            </d:propfind>`;

        const response = await fetch(new URL(path, this.baseUrl).href, {
            method: 'PROPFIND',
            headers: this.buildHeaders({
                'Depth': depth.toString(),
                'Content-Type': 'application/xml'
            }),
            body: requestBody
        });

        if (!response.ok) {
            throw new Error(`WebDAV PROPFIND failed with status ${response.status}`);
        }

        const xml = await response.text();
        return this.parseMultiStatus(xml);
    }

    async getFile(path: string): Promise<Blob> {
        const response = await fetch(new URL(path, this.baseUrl).href, {
            method: 'GET',
            headers: this.buildHeaders()
        });
        if (!response.ok) {
            throw new Error(`WebDAV GET failed with status ${response.status}`);
        }
        return await response.blob();
    }

    async putFile(path: string, content: string | Blob | ArrayBuffer | ReadableStream): Promise<void> {
        let body: Blob | ArrayBuffer | string;
        if (content instanceof ReadableStream) {
            const res = new Response(content);
            body = await res.blob();
        } else {
            body = typeof content === 'string' ? new Blob([content]) : content;
        }
        const response = await fetch(new URL(path, this.baseUrl).href, {
            method: 'PUT',
            headers: this.buildHeaders({
                'Content-Type': 'application/octet-stream'
            }),
            body
        });
        if (!response.ok) {
            throw new Error(`WebDAV PUT failed with status ${response.status}`);
        }
    }

    async deleteResource(path: string): Promise<void> {
        const response = await fetch(new URL(path, this.baseUrl).href, {
            method: 'DELETE',
            headers: this.buildHeaders()
        });
        if (!response.ok) {
            throw new Error(`WebDAV DELETE failed with status ${response.status}`);
        }
    }

    async createDirectory(path: string): Promise<void> {
        const response = await fetch(new URL(path, this.baseUrl).href, {
            method: 'MKCOL',
            headers: this.buildHeaders()
        });
        if (!response.ok) {
            throw new Error(`WebDAV MKCOL failed with status ${response.status}`);
        }
    }

    async moveResource(fromPath: string, toPath: string): Promise<void> {
        const destination = new URL(toPath, this.baseUrl).href;
        const response = await fetch(new URL(fromPath, this.baseUrl).href, {
            method: 'MOVE',
            headers: this.buildHeaders({
                'Destination': destination,
                'Overwrite': 'F'
            })
        });
        if (!response.ok) {
            throw new Error(`WebDAV MOVE failed with status ${response.status}`);
        }
    }

    async copyResource(fromPath: string, toPath: string): Promise<void> {
        const destination = new URL(toPath, this.baseUrl).href;
        const response = await fetch(new URL(fromPath, this.baseUrl).href, {
            method: 'COPY',
            headers: this.buildHeaders({
                'Destination': destination,
                'Overwrite': 'F'
            })
        });
        if (!response.ok) {
            throw new Error(`WebDAV COPY failed with status ${response.status}`);
        }
    }

    private buildHeaders(extra?: Record<string, string>): HeadersInit {
        const headers: Record<string, string> = { ...(extra ?? {}) };
        if (this.authHeader) {
            headers['Authorization'] = this.authHeader;
        }
        return headers;
    }

    private parseMultiStatus(xml: string): WebDAVResource[] {
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, 'text/xml');
        const responses = doc.querySelectorAll('response');
        
        const resources: WebDAVResource[] = [];
        responses.forEach(response => {
            const hrefText = response.querySelector('href')?.textContent || '';
            const href = new URL(hrefText, this.baseUrl).href;
            const displayName = response.querySelector('displayname')?.textContent || '';
            const resourceType = response.querySelector('resourcetype');
            const isDirectory = !!resourceType?.querySelector('collection');
            const contentType = response.querySelector('getcontenttype')?.textContent || undefined;
            const contentLengthStr = response.querySelector('getcontentlength')?.textContent;
            const contentLength = contentLengthStr ? parseInt(contentLengthStr) : undefined;
            const lastModifiedStr = response.querySelector('getlastmodified')?.textContent;
            const lastModified = lastModifiedStr ? new Date(lastModifiedStr) : undefined;
            const etag = response.querySelector('getetag')?.textContent || undefined;

            resources.push({
                href,
                displayName: displayName || href.split('/').filter(Boolean).pop() || '',
                isDirectory,
                contentType,
                contentLength,
                lastModified,
                etag
            });
        });

        return resources;
    }

    getBaseUrl(): string {
        return this.baseUrl;
    }
}


