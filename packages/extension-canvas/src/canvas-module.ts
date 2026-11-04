import { publish as publishEvent, subscribe as subscribeEvent, unsubscribe as unsubscribeEvent } from '@eclipse-docks/core/core/events';
import { LitElement } from '@eclipse-docks/core/externals/lit';
import '@eclipse-docks/core/externals/webawesome';
import type { CanvasHost } from './host';

/** Superclass for a `.canvas.js` default export. The host registers the tag. */
export class CanvasView extends LitElement {
    canvasHost?: CanvasHost;
    private eventTokens: string[] = [];

    getState(key: string, fallback?: unknown): unknown {
        const host = this.canvasHost;
        if (!host) return fallback;
        return host.getState(key, fallback);
    }

    setState(key: string, value: unknown): void {
        this.canvasHost?.setState(key, value);
    }

    openFile(path: string): void {
        this.canvasHost?.openFile(path);
    }

    subscribe(topic: string, callback: (data: unknown) => void): string {
        const token = subscribeEvent(topic, callback);
        this.eventTokens.push(token);
        return token;
    }

    unsubscribe(token: string): void {
        unsubscribeEvent(token);
        this.eventTokens = this.eventTokens.filter(item => item !== token);
    }

    publish(topic: string, data: unknown): boolean {
        return publishEvent(topic, data);
    }

    override connectedCallback(): void {
        super.connectedCallback();
        this.onConnect();
    }

    override disconnectedCallback(): void {
        this.onDisconnect();
        for (const token of this.eventTokens) unsubscribeEvent(token);
        this.eventTokens = [];
        super.disconnectedCallback();
    }

    /** Read persisted state and start work. The host is already attached. */
    protected onConnect(): void {}

    /** Release resources. Called while this element is leaving the document. */
    protected onDisconnect(): void {}
}
