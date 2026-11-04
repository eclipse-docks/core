export interface CanvasRuntime {
    [name: string]: object;
}

const runtime: CanvasRuntime = (globalThis as { __docksCanvas?: CanvasRuntime }).__docksCanvas ??= {};
const hrefs: Record<string, string> = {};

export function registerCanvasBridge(namespace: object, href: string, location: string): void {
    runtime[location] = namespace;
    hrefs[location] = href;
}

export function bridgeHref(location: string): string | undefined {
    return hrefs[location];
}
