import { describe, expect, it } from 'vitest';
import '../src/bridges/canvas';
import { CanvasView } from '../src/canvas-module';
import type { CanvasHost } from '../src/host';

class StateCanvas extends CanvasView {}

if (!customElements.get('state-canvas-test')) customElements.define('state-canvas-test', StateCanvas);

describe('CanvasView host helpers', () => {
    it('exposes Lit and Web Awesome exports next to CanvasView', () => {
        const canvas = (globalThis as { __docksCanvas?: { canvas?: Record<string, unknown> } }).__docksCanvas?.canvas;
        expect(canvas?.CanvasView).toBe(CanvasView);
        expect(typeof canvas?.html).toBe('function');
        expect(typeof canvas?.css).toBe('function');
        expect(canvas?.nothing).toBeDefined();
        expect(typeof canvas?.repeat).toBe('function');
        expect(typeof canvas?.classMap).toBe('function');
        expect(typeof canvas?.registerIconLibrary).toBe('function');
    });

    it('returns the fallback until a host is attached, then delegates', () => {
        const store: Record<string, unknown> = { n: 1, empty: null };
        const opened: string[] = [];
        const host: CanvasHost = {
            getState(key, fallback) {
                return store[key] === undefined ? fallback : store[key];
            },
            setState(key, value) {
                store[key] = value;
            },
            openFile(path) {
                opened.push(path);
            },
        };
        const element = document.createElement('state-canvas-test') as StateCanvas;

        expect(element.getState('n', 0)).toBe(0);
        element.setState('n', 2);
        element.openFile('notes/a.md');
        expect(store.n).toBe(1);
        expect(opened).toEqual([]);

        element.canvasHost = host;
        expect(element.getState('n', 0)).toBe(1);
        expect(element.getState('missing', 'fb')).toBe('fb');
        expect(element.getState('empty', 'fb')).toBeNull();
        element.setState('n', 2);
        element.openFile('notes/a.md');
        expect(store.n).toBe(2);
        expect(opened).toEqual(['notes/a.md']);
    });

    it('runs onConnect after the host is attached and onDisconnect on removal', () => {
        const seen: string[] = [];
        class LifecycleCanvas extends CanvasView {
            protected override onConnect(): void {
                seen.push(`connect:${String(this.getState('label', ''))}`);
            }

            protected override onDisconnect(): void {
                seen.push('disconnect');
            }
        }
        if (!customElements.get('lifecycle-canvas-test')) customElements.define('lifecycle-canvas-test', LifecycleCanvas);
        const element = document.createElement('lifecycle-canvas-test') as LifecycleCanvas;
        element.canvasHost = {
            getState: (key, fallback) => (key === 'label' ? 'saved' : fallback),
            setState: () => undefined,
            openFile: () => undefined,
        };
        document.body.append(element);
        element.remove();
        expect(seen).toEqual(['connect:saved', 'disconnect']);
    });

    it('publishes on the app bus and drops subscriptions when removed', async () => {
        const element = document.createElement('state-canvas-test') as StateCanvas;
        const seen: unknown[] = [];
        const token = element.subscribe('canvas-view-events', (data) => seen.push(data));
        element.publish('canvas-view-events', 1);
        await new Promise((resolve) => queueMicrotask(resolve));
        expect(seen).toEqual([1]);

        element.unsubscribe(token);
        element.publish('canvas-view-events', 2);
        await new Promise((resolve) => queueMicrotask(resolve));
        expect(seen).toEqual([1]);

        element.subscribe('canvas-view-events', (data) => seen.push(data));
        document.body.append(element);
        element.remove();
        element.publish('canvas-view-events', 3);
        await new Promise((resolve) => queueMicrotask(resolve));
        expect(seen).toEqual([1]);
    });
});
