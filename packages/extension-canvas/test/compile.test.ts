import { describe, expect, it } from 'vitest';
import tasksSource from '../src/canvases/tasks.canvas.js?raw';
import { registerCanvasBridge } from '../src/bridges/register';
import { compileCanvas, type CanvasFileBytes } from '../src/compile';
import { mountCompiled } from '../src/mount';

const canvasHref = 'https://bridges.example/canvas.js';
const coreHref = 'https://bridges.example/core.js';

registerCanvasBridge({}, coreHref, 'core');
registerCanvasBridge({}, canvasHref, 'canvas');

function files(map: Record<string, string | Uint8Array>) {
    return async (path: string): Promise<CanvasFileBytes | null> => {
        const value = map[path];
        if (value === undefined) return null;
        if (typeof value === 'string') return { text: value };
        return { bytes: value };
    };
}

describe('compileCanvas', () => {
    it('inlines workspace modules and resources and rewrites docks imports', async () => {
        const result = await compileCanvas({
            entryPath: 'app.canvas.js',
            entrySource: `
import { label } from "./helper.js";
import rows from "./rows.json";
import "./view.css";
import logo from "./logo.png";
import { LitElement } from "docks/lit";
import { subscribe } from "@eclipse-docks/core/core/events";
import extra from "some-pkg";
export default class extends HTMLElement {
  connectedCallback() {
    this.textContent = label + rows[0].n + logo.slice(0, 5);
    this.dataset.extra = String(extra);
    this.dataset.lit = String(LitElement);
    this.dataset.registry = String(subscribe);
  }
}
`,
            read: files({
                'helper.js': 'export const label = "from-helper";',
                'rows.json': '[{"n":1}]',
                'view.css': 'h2{color:red}',
                'logo.png': new Uint8Array([137, 80, 78, 71]),
            }),
        });
        expect(result.ok).toBe(true);
        if (!result.ok) return;
        expect(result.code).toContain('from-helper');
        expect(result.code).toContain('"n":1');
        expect(result.code).toContain('h2{color:red}');
        expect(result.code).toContain('data:image/png;base64,');
        expect(result.code).not.toContain('./helper.js');
        expect(result.code).not.toContain('./rows.json');
        expect(result.code).not.toContain('./view.css');
        expect(result.code).not.toContain('./logo.png');
        expect(result.code).toContain(canvasHref);
        expect(result.code).toContain(coreHref);
        expect(result.code).toContain('some-pkg');
    });

    it('mounts an inlined module that imports workspace json', async () => {
        const result = await compileCanvas({
            entryPath: 'app.canvas.js',
            entrySource: `
import { label } from "./helper.js";
import rows from "./rows.json";
export default class extends HTMLElement {
  connectedCallback() {
    this.textContent = label + rows[0].n;
  }
}
`,
            read: files({
                'helper.js': 'export const label = "from-helper";',
                'rows.json': '[{"n":1}]',
            }),
        });
        expect(result.ok).toBe(true);
        if (!result.ok) return;
        const mounted = await mountCompiled(result.code);
        expect(mounted.ok).toBe(true);
        if (!mounted.ok) return;
        mounted.element.canvasHost = { getState: () => undefined, setState: () => undefined, openFile: () => undefined };
        document.body.append(mounted.element);
        expect(mounted.element.textContent).toBe('from-helper1');
        mounted.dispose();
    });

    it('names a missing workspace file', async () => {
        const result = await compileCanvas({
            entryPath: 'app.canvas.js',
            entrySource: 'import "./missing.js";\nexport default class extends HTMLElement {}',
            read: files({}),
        });
        expect(result.ok).toBe(false);
        if (result.ok) return;
        expect(result.error).toContain('missing.js');
    });

    it('returns a thrown mount error', async () => {
        const result = await compileCanvas({
            entryPath: 'bad.canvas.js',
            entrySource: `
export default class extends HTMLElement {
  constructor() {
    super();
    throw new Error("canvas-boom");
  }
}
`,
            read: files({}),
        });
        expect(result.ok).toBe(true);
        if (!result.ok) return;
        const mounted = await mountCompiled(result.code);
        expect(mounted.ok).toBe(false);
        if (mounted.ok) return;
        expect(mounted.error).toContain('canvas-boom');
    });

    it('compiles the registered tasks canvas', async () => {
        const result = await compileCanvas({
            entryPath: 'tasks.canvas.js',
            entrySource: tasksSource,
            read: files({}),
        });
        expect(result.ok).toBe(true);
        if (!result.ok) return;
        expect(result.code).toContain('__docksCanvas.canvas');
        expect(result.code).toContain('Today, with intention.');
    });
});
