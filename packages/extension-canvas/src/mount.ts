import type { CanvasHost } from './host';

export interface CanvasViewElement extends HTMLElement {
    canvasHost?: CanvasHost;
}

export type MountResult =
    | { ok: true; element: CanvasViewElement; dispose: () => void }
    | { ok: false; error: string };

let tagSequence = 0;
const constructorTags = new WeakMap<CustomElementConstructor, string>();

function constructElement(Ctor: CustomElementConstructor): MountResult {
    let tag = constructorTags.get(Ctor);
    if (!tag) {
        tag = `docks-canvas-compiled-${++tagSequence}`;
        customElements.define(tag, Ctor);
        constructorTags.set(Ctor, tag);
    }
    const caught: unknown[] = [];
    const onError = (event: ErrorEvent) => {
        caught.push(event.error ?? event.message);
        event.preventDefault();
    };
    window.addEventListener('error', onError);
    let element: CanvasViewElement;
    try {
        element = document.createElement(tag) as CanvasViewElement;
    } catch (err) {
        return { ok: false, error: err instanceof Error ? err.message : String(err) };
    } finally {
        window.removeEventListener('error', onError);
    }
    if (!(element instanceof Ctor)) {
        const reason = caught[0];
        const message = reason instanceof Error ? reason.message : String(reason ?? 'Canvas element failed to construct');
        return { ok: false, error: message };
    }
    return { ok: true, element, dispose: () => element.remove() };
}

export function elementFromConstructor(Ctor: CustomElementConstructor): CanvasViewElement {
    let tag = constructorTags.get(Ctor);
    if (!tag) {
        tag = `docks-canvas-live-${++tagSequence}`;
        customElements.define(tag, Ctor);
        constructorTags.set(Ctor, tag);
    }
    return document.createElement(tag) as CanvasViewElement;
}

export async function mountCompiled(code: string): Promise<MountResult> {
    const url = `data:text/javascript;charset=utf-8,${encodeURIComponent(code)}`;
    try {
        const mod = await import(/* @vite-ignore */ url);
        const Ctor = mod.default;
        if (typeof Ctor !== 'function' || !(Ctor.prototype instanceof HTMLElement)) {
            return { ok: false, error: 'Canvas default export must be an HTMLElement subclass' };
        }
        const constructed = constructElement(Ctor);
        if (!constructed.ok) return constructed;
        const element = constructed.element;
        return {
            ok: true,
            element,
            dispose: () => {
                element.remove();
            },
        };
    } catch (err) {
        return { ok: false, error: err instanceof Error ? err.message : String(err) };
    }
}
