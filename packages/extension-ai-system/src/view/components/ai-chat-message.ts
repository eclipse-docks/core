import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { when } from 'lit/directives/when.js';
import { marked } from 'marked';
import type { ChatMessage } from '../../core/types';

@customElement('docks-ai-chat-message')
export class AIChatMessage extends LitElement {
    @property({ type: Object, attribute: false })
    public message?: ChatMessage;

    @property({ type: Boolean })
    public isStreaming = false;

    @property({ type: Boolean })
    public showHeader = true;

    @property({ type: Number, attribute: false })
    public messageIndex?: number;

    protected updated(_changedProperties: Map<PropertyKey, unknown>) {
        super.updated(_changedProperties);
        if (_changedProperties.has('message') || !this.hasAttribute('data-is-user')) {
            this.updateAlignment();
        }
    }

    private updateAlignment() {
        if (this.message) {
            this.setAttribute('data-is-user', String(this.message.role === 'user'));
        }
    }

    private copyToClipboard(text: string) {
        navigator.clipboard.writeText(text).catch(err => console.error('Failed to copy:', err));
    }

    private processMarkdownContent(markdownHtml: string): string {
        if (markdownHtml.includes('code-blocwrapper')) return markdownHtml;
        return markdownHtml.replace(/<pre><code([^>]*)>([\s\S]*?)<\/code><\/pre>/gi, (_, attrs, codeText) => `
            <div class="code-blocwrapper">
                <div class="code-blocheader">
                    <wa-copy-button value="${this.escapeHtmlAttribute(codeText.trim())}" size="s" label="Copy code"></wa-copy-button>
                </div>
                <div class="code-bloccontent">
                    <pre><code${attrs}>${codeText}</code></pre>
                </div>
            </div>`);
    }

    private escapeHtmlAttribute(text: string): string {
        return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    private handleResend(e?: Event) {
        e?.preventDefault();
        e?.stopPropagation();
        if (!this.message) return;
        this.dispatchEvent(new CustomEvent('resend', {
            detail: { message: this.message, messageIndex: this.messageIndex },
            bubbles: true, composed: true
        }));
    }

    render() {
        if (!this.message) return html``;

        const message = this.message;
        const isUser = message.role === 'user';

        return html`
            <div class="message-wrapper ${isUser ? 'user' : 'assistant'} ${this.isStreaming ? 'streaming' : ''}">
                ${when(this.showHeader && !isUser, () => html`
                    <div class="message-header">
                        <div class="message-meta">
                            <wa-icon name="robot" label="${message.role}"></wa-icon>
                            <span class="role-name">${message.role}</span>
                        </div>
                    <div class="message-actions">
                        <wa-button variant="neutral" appearance="plain" size="s" title="Copy"
                            @click="${() => this.copyToClipboard(message.content)}">
                            <wa-icon slot="label" name="copy" label="Copy"></wa-icon>
                        </wa-button>
                    </div>
                    </div>
                `)}
                <div class="message-content-wrapper ${isUser ? 'user' : ''}">
                    <div class="message-content">
                        ${unsafeHTML(this.processMarkdownContent(marked.parse(message.content || '') as string))}
                        ${when(this.isStreaming, () => html`<span class="streaming-cursor">▋</span>`)}
                    </div>
                    ${when(isUser, () => html`
                        <wa-button variant="neutral" appearance="plain" size="s" title="Copy"
                            @click="${() => this.copyToClipboard(message.content)}">
                            <wa-icon name="copy" label="Copy"></wa-icon>
                        </wa-button>
                        <wa-button variant="neutral" appearance="plain" size="s" title="Resend"
                            @click="${(e: Event) => this.handleResend(e)}">
                            <wa-icon name="rotate-right" label="Resend"></wa-icon>
                        </wa-button>
                    `)}
                </div>
            </div>
        `;
    }

    static styles = css`
        :host {
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 85%;
            box-sizing: border-box;
            animation: slideIn 0.2s ease-out;
        }

        :host([data-is-user="true"]) { align-self: flex-end; }
        :host([data-is-user="false"]) { align-self: flex-start; }

        @keyframes slideIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .message-wrapper {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            width: 100%;
            box-sizing: border-box;
        }

        .message-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0.5rem;
            padding: 0 0.5rem;
        }

        .message-meta {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.875rem;
            color: var(--wa-color-text-quiet);
        }

        .role-name { text-transform: capitalize; }

        .message-actions {
            display: flex;
            gap: 0.25rem;
            opacity: 0;
            transition: opacity 0.2s;
        }

        .message-wrapper:hover .message-actions,
        :host:hover .message-actions { opacity: 1; }

        .message-content-wrapper {
            display: flex;
            align-items: flex-start;
            gap: 0.5rem;
            width: 100%;
        }

        .message-content-wrapper.user {
            flex-direction: row;
            align-items: center;
        }

        .message-content {
            padding: 0.5rem 0.75rem;
            border-radius: 0.25rem;
            background-color: var(--wa-color-surface-default);
            word-break: breaword;
            overflow-wrap: breaword;
            max-width: 100%;
            box-sizing: border-box;
            line-height: 1.3;
            font-size: 0.9rem;
        }

        .message-content-wrapper.user .message-content {
            padding: 0.0625rem 0.75rem;
            background-color: var(--wa-color-brand-fill-quiet);
            color: var(--wa-color-text-normal);
            line-height: 1.4;
            flex: 1;
        }

        .message-content p { margin: 0; padding: 0; }
        .message-content ul, .message-content ol { margin: 0.25rem 0; padding-left: 1.25rem; }
        .message-content li { margin: 0.125rem 0; padding: 0; line-height: 1.3; }
        .message-content :first-child { margin-top: 0; padding-top: 0; }
        .message-content :last-child { margin-bottom: 0; padding-bottom: 0; }

        .message-content pre {
            white-space: pre-wrap;
            word-break: breaall;
            max-width: 100%;
            box-sizing: border-box;
            overflow-x: auto;
            margin: 0;
        }

        .message-content code {
            font-family: 'Courier New', monospace;
            background-color: var(--wa-color-surface-lowered);
            padding: 0.125rem 0.25rem;
            border-radius: 0.125rem;
        }

        .message-content pre code { background-color: transparent; padding: 0; display: block; }

        .code-blocwrapper {
            margin: 0.75rem 0;
            border: solid var(--wa-border-width-s) var(--wa-color-neutral-border-loud);
            border-radius: var(--wa-border-radius-m);
            background-color: var(--wa-color-surface-lowered);
            overflow: hidden;
        }

        .code-blocheader {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 0.375rem 0.5rem;
            border-bottom: solid var(--wa-border-width-s) var(--wa-color-neutral-border-loud);
            background-color: var(--wa-color-surface-default);
        }

        .code-bloccontent { padding: 0.75rem; overflow-x: auto; }
        .code-bloccontent pre { margin: 0; background-color: transparent; }
        .code-bloccontent code { background-color: transparent; padding: 0; }

        .streaming-cursor {
            display: inline-block;
            animation: blink 1s infinite;
            color: var(--wa-color-brand-50);
        }

        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'docks-ai-chat-message': AIChatMessage;
    }
}
