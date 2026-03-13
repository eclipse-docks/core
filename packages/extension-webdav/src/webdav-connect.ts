import { customElement, state } from "lit/decorators.js";
import { LyraDialogContent } from "@eclipse-lyra/core";
import { html } from "lit";
import { workspaceService } from "@eclipse-lyra/core";
import type { WebDAVConnectionInfo } from "./webdav-client";
import { createLogger } from "@eclipse-lyra/core";

const logger = createLogger('WebDAV');

@customElement('lyra-webdav-connect')
export class LyraWebDAVConnect extends LyraDialogContent {
    
    @state()
    private url = '';
    
    @state()
    private username = '';
    
    @state()
    private password = '';
    
    @state()
    private connecting = false;

    @state()
    private showHelp = false;

    public override getResult(): any {
        return this;
    }

    public async handleConnect(): Promise<boolean> {
        if (!this.url) {
            logger.error('Please provide a URL');
            return false;
        }

        // Validate URL format
        try {
            new URL(this.url);
        } catch {
            logger.error('Invalid URL format');
            return false;
        }

        this.connecting = true;
        
        try {
            let connectionInfo: WebDAVConnectionInfo;

            // Check if it's a Nextcloud/ownCloud public share URL
            const shareMatch = this.url.match(/^(https?:\/\/[^\/]+)\/(?:index\.php\/)?s\/([A-Za-z0-9]+)/);

            if (shareMatch) {
                const server = shareMatch[1];
                const token = shareMatch[2];

                connectionInfo = {
                    url: `${server}/public.php/webdav/`,
                    username: token,
                    password: this.password || ''
                };
            } else {
                // Direct WebDAV endpoint URL - use optional username/password fields
                connectionInfo = {
                    url: this.url,
                    ...(this.username && this.password && {
                        username: this.username,
                        password: this.password
                    })
                };
            }

            await workspaceService.connectWorkspace(connectionInfo);
            logger.info('Successfully connected to WebDAV workspace');
            
            this.dispatchEvent(new CustomEvent('connected', {
                bubbles: true,
                composed: true
            }));
            return true;
        } catch (error) {
            if (error instanceof Error) {
                logger.error(`Connection failed: ${error.message}`);
            } else {
                logger.error('Failed to connect to WebDAV server');
            }
            return false;
        } finally {
            this.connecting = false;
        }
    }

    public toggleHelp() {
        this.showHelp = !this.showHelp;
    }

    protected render() {
        return html`
            <style>
                .webdav-connect-dialog {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    max-width: 500px;
                    padding: 1.5rem;
                    height: 420px;
                    box-sizing: border-box;
                    overflow-y: auto;
                }
                
                .webdav-connect-dialog h2 {
                    margin: 0 0 1rem 0;
                    font-size: 1.5rem;
                }
                
                .password-warning {
                    font-size: 0.8rem;
                    color: var(--wa-color-neutral-400);
                    margin: 0.25rem 0 0.5rem 0;
                }
                
                .help-text {
                    background: var(--wa-color-neutral-50);
                    padding: 1rem;
                    border-radius: 4px;
                    font-size: 0.875rem;
                    margin-top: 1rem;
                }
                
                .help-text h3 {
                    margin-top: 0;
                    font-size: 1rem;
                }
                
                .help-text p {
                    margin: 0.5rem 0;
                }
                
                .help-text code {
                    display: block;
                    background: var(--wa-color-neutral-100);
                    padding: 0.5rem;
                    border-radius: 3px;
                    margin: 0.5rem 0;
                    font-family: monospace;
                    word-break: breaall;
                }
                
                .help-toggle {
                    cursor: pointer;
                    color: var(--wa-color-primary-600);
                    font-size: 0.875rem;
                    text-decoration: underline;
                }
            </style>
            
            <div class="webdav-connect-dialog">
                <wa-input
                    label="WebDAV URL"
                    placeholder="https://cloud.example.com/remote.php/dav/files/username/"
                    .value=${this.url}
                    @input=${(e: Event) => this.url = (e.target as any).value}
                    required
                    help-text="The full WebDAV endpoint URL">
                </wa-input>
                
                <wa-input
                    label="Username (optional)"
                    placeholder="username"
                    .value=${this.username}
                    @input=${(e: Event) => this.username = (e.target as any).value}
                    help-text="Leave empty for public/shared folders">
                </wa-input>
                
                <wa-input
                    type="password"
                    label="Password (optional)"
                    placeholder="Password or App Password"
                    .value=${this.password}
                    @input=${(e: Event) => this.password = (e.target as any).value}
                    help-text="Leave empty for public/shared folders. Use an app password if 2FA is enabled.">
                </wa-input>
                <p class="password-warning">
                    Passwords are stored locally in this browser (base64 encoded). Only use this on machines you trust.
                </p>
                
                ${this.showHelp ? html`
                    <div class="help-text">
                        <h3>WebDAV Connection Help</h3>
                        
                        <p><strong>Public/Shared Folders:</strong></p>
                        <p>For publicly shared WebDAV folders, just enter the URL and leave username/password empty.</p>
                        
                        <p><strong>Nextcloud Public Shares:</strong></p>
                        <p>For Nextcloud public shares (e.g., https://cloud.example.com/s/TOKEN):</p>
                        <ul>
                            <li><strong>URL:</strong> You can paste the share link directly into the URL field.</li>
                            <li><strong>Username:</strong> Will be filled automatically from the share token.</li>
                            <li><strong>Password:</strong> Leave empty (or enter the share password if the link is protected).</li>
                        </ul>
                        
                        <p><strong>Nextcloud Personal Files:</strong></p>
                        <p>Your WebDAV URL should look like:</p>
                        <code>https://your-cloud.com/remote.php/dav/files/USERNAME/</code>
                        
                        <p><strong>ownCloud:</strong></p>
                        <code>https://your-owncloud.com/remote.php/dav/files/USERNAME/</code>
                        
                        <p><strong>Two-Factor Authentication:</strong></p>
                        <p>If you have 2FA enabled:</p>
                        <ol>
                            <li>Go to your account settings</li>
                            <li>Find "Security" or "App passwords"</li>
                            <li>Generate a new app password</li>
                            <li>Use that password here instead of your regular password</li>
                        </ol>
                        
                        <p><strong>CORS Issues:</strong></p>
                        <p>If connection fails, your WebDAV server may need CORS configuration. 
                        Contact your administrator or check the server documentation.</p>
                        
                        <p><strong>Security note:</strong> Connection details (including password, if provided) are stored locally in this browser using base64 encoding. Only use this on machines and profiles you trust.</p>
                    </div>
                ` : ''}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'lyra-webdav-connect': LyraWebDAVConnect;
    }
}
