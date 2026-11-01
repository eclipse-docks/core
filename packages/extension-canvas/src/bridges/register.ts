export interface CanvasRuntime {
    lit?: object;
    webawesome?: object;
    core?: object;
    subpaths: Record<string, object>;
}

const runtime = ((globalThis as { __docksCanvas?: CanvasRuntime }).__docksCanvas ??= { subpaths: {} });

export function registerCanvasBridge(key: 'lit' | 'webawesome' | 'core', namespace: object, subpath?: string): void {
    runtime[key] = namespace;
    if (subpath) runtime.subpaths[subpath] = namespace;
}

export function registerCanvasSubpath(subpath: string, namespace: object): void {
    runtime.subpaths[subpath] = namespace;
}
