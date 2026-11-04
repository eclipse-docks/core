import { bridgeHref } from './bridges/register';

export interface CanvasFileBytes {
    text?: string;
    bytes?: Uint8Array;
}

export type CanvasFileReader = (path: string) => Promise<CanvasFileBytes | null>;

export interface CompileCanvasInput {
    entryPath: string;
    entrySource: string;
    read: CanvasFileReader;
}

export type CompileCanvasResult = { ok: true; code: string } | { ok: false; error: string };

interface GraphModule {
    path: string;
    kind: "js" | "json" | "text" | "binary";
    text?: string;
    bytes?: Uint8Array;
    mime?: string;
}

interface SpecRef {
    spec: string;
    start: number;
    end: number;
    raw: string;
    form: "import" | "export-from" | "dynamic" | "asset-url";
}

const TEXT_EXT = new Set(["js", "mjs", "css", "json", "svg", "txt", "md", "html", "csv"]);
const MIME: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    webp: "image/webp",
    ico: "image/x-icon",
    woff: "font/woff",
    woff2: "font/woff2",
    pdf: "application/pdf",
    wasm: "application/wasm",
    svg: "image/svg+xml",
};

export function resolveWorkspacePath(fromFile: string, spec: string): string {
    const base = fromFile.split("/").filter(Boolean);
    base.pop();
    for (const part of spec.split("/")) {
        if (part === "" || part === ".") continue;
        if (part === "..") base.pop();
        else base.push(part);
    }
    return base.join("/");
}

export function isRelativeSpecifier(spec: string): boolean {
    return spec.startsWith("./") || spec.startsWith("../");
}

function usesCanvasNamespace(spec: string): boolean {
    return spec === "docks/canvas"
        || spec === "docks/lit"
        || spec === "docks/webawesome"
        || spec === "@eclipse-docks/core/externals/lit"
        || spec === "@eclipse-docks/core/externals/webawesome"
        || spec === "docks/core/externals/lit"
        || spec === "docks/core/externals/webawesome";
}

function usesCoreNamespace(spec: string): boolean {
    return spec === "docks/core"
        || spec === "@eclipse-docks/core"
        || spec === "docks/core/core/events"
        || spec === "@eclipse-docks/core/core/events";
}

export function bridgeRuntime(spec: string): string | null {
    if (usesCanvasNamespace(spec)) return "__docksCanvas.canvas";
    if (usesCoreNamespace(spec)) return "__docksCanvas.core";
    return null;
}

export function rewriteBridgeSpecifier(spec: string): string {
    if (usesCanvasNamespace(spec)) return bridgeHref("canvas") ?? "";
    if (usesCoreNamespace(spec)) return bridgeHref("core") ?? "";
    return spec;
}

function extensionOf(path: string): string {
    const base = path.split("/").pop() ?? path;
    const dot = base.lastIndexOf(".");
    return dot >= 0 ? base.slice(dot + 1).toLowerCase() : "";
}

function isJavaScript(path: string): boolean {
    const ext = extensionOf(path);
    return ext === "js" || ext === "mjs" || path.endsWith(".canvas.js");
}

function toBase64(bytes: Uint8Array): string {
    const bufferCtor = (globalThis as { Buffer?: { from(data: Uint8Array): { toString(encoding: string): string } } }).Buffer;
    if (bufferCtor) return bufferCtor.from(bytes).toString("base64");
    let binary = "";
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return btoa(binary);
}

function findRefs(code: string): SpecRef[] {
    const patterns: Array<{ form: SpecRef["form"]; re: RegExp }> = [
        { form: "asset-url", re: /new\s+URL\(\s*(['"])([^'"]+)\1\s*,\s*import\.meta\.url\s*\)/g },
        { form: "dynamic", re: /\bimport\(\s*(['"])([^'"]+)\1\s*\)/g },
        { form: "export-from", re: /\bexport\s+(?:type\s+)?(?:\*\s+as\s+\w+|\*|\{[^}]*\})\s+from\s*(['"])([^'"]+)\1/g },
        { form: "import", re: /\bimport\s+(?:type\s+)?(?:[^'";]*?\s+from\s+)?(['"])([^'"]+)\1/g },
    ];
    const refs: SpecRef[] = [];
    for (const { form, re } of patterns) {
        for (const match of code.matchAll(re)) {
            const spec = match[2];
            if (!spec || match.index === undefined) continue;
            refs.push({
                spec,
                start: match.index,
                end: match.index + match[0].length,
                raw: match[0],
                form,
            });
        }
    }
    refs.sort((a, b) => a.start - b.start || b.end - a.end);
    const kept: SpecRef[] = [];
    let cursor = -1;
    for (const ref of refs) {
        if (ref.start < cursor) continue;
        kept.push(ref);
        cursor = ref.end;
    }
    return kept;
}

function rewriteLocalExports(code: string): string {
    let out = code.replace(/export\s+default\s+/g, "__exports.default = ");
    out = out.replace(/export\s+(async\s+)?function\s+(\w+)/g, (_all, asyncKw: string | undefined, name: string) => {
        return `__exports.${name} = ${asyncKw ?? ""}function ${name}`;
    });
    out = out.replace(/export\s+class\s+(\w+)/g, "__exports.$1 = class $1");
    out = out.replace(/export\s+(const|let|var)\s+(\w+)\s*=/g, "$1 $2 = __exports.$2 =");
    out = out.replace(/export\s*\{([^}]+)\}\s*;?/g, (_all, inner: string) => {
        return inner.split(",").map(part => {
            const [from, alias] = part.split(/\s+as\s+/).map(piece => piece.trim());
            if (!from) return "";
            return `__exports.${alias || from} = ${from};`;
        }).join("\n");
    });
    return out;
}

interface ExternalImport {
    line: string;
    local: string;
    imported: string;
}

function externalBinding(specUrl: string, imported: string, externals: ExternalImport[], seq: { n: number }): string {
    const existing = externals.find(item => item.line.includes(JSON.stringify(specUrl)) && item.imported === imported);
    if (existing) return existing.local;
    const local = `__ext_${seq.n++}`;
    if (imported === "*") {
        externals.push({ local, imported, line: `import * as ${local} from ${JSON.stringify(specUrl)};` });
    } else if (imported === "side") {
        externals.push({ local, imported, line: `import ${JSON.stringify(specUrl)};` });
    } else {
        externals.push({
            local,
            imported,
            line: `import { ${imported} as ${local} } from ${JSON.stringify(specUrl)};`,
        });
    }
    return local;
}

function importPrelude(raw: string, load: string): string {
    const clause = raw.replace(/\s+/g, " ").trim();
    if (/^import\s+['"]/.test(clause)) return `await ${load};`;
    const named = clause.match(/\{([^}]*)\}/);
    const namespace = clause.match(/\*\s+as\s+(\w+)/);
    const defaultName = clause.match(/^import\s+(?!type\b)(\w+)\s*(?:,|from)/);
    const lines: string[] = [];
    if (defaultName) lines.push(`const ${defaultName[1]} = (await ${load}).default;`);
    if (namespace) lines.push(`const ${namespace[1]} = await ${load};`);
    if (named) {
        const pairs = named[1].split(",").map(part => part.trim()).filter(Boolean).map(part => {
            const [imported, alias] = part.split(/\s+as\s+/).map(piece => piece.trim());
            return alias ? `${imported}: ${alias}` : imported;
        });
        if (pairs.length) lines.push(`const { ${pairs.join(", ")} } = await ${load};`);
    }
    return lines.join("\n");
}

function exportFromPrelude(raw: string, load: string): string {
    if (/\*\s+as\s+(\w+)/.test(raw)) {
        const name = raw.match(/\*\s+as\s+(\w+)/)?.[1] ?? "ns";
        return `const ${name} = await ${load};\nObject.assign(__exports, { ${name} });`;
    }
    if (raw.includes("*")) {
        return `Object.assign(__exports, await ${load});\ndelete __exports.default;`;
    }
    const inner = raw.match(/\{([^}]*)\}/)?.[1] ?? "";
    const lines = inner.split(",").map(part => part.trim()).filter(Boolean).map(part => {
        const [imported, alias] = part.split(/\s+as\s+/).map(piece => piece.trim());
        return `__exports.${alias || imported} = (await ${load}).${imported};`;
    });
    return lines.join("\n");
}

export async function compileCanvas(input: CompileCanvasInput): Promise<CompileCanvasResult> {
    const modules: GraphModule[] = [];
    const indexByPath = new Map<string, number>();
    const stack: string[] = [];

    const addModule = async (path: string, source?: string): Promise<number | string> => {
        const known = indexByPath.get(path);
        if (known !== undefined) return known;
        if (stack.includes(path)) return `Circular workspace import: ${[...stack, path].join(" -> ")}`;
        stack.push(path);
        const ext = extensionOf(path);
        let mod: GraphModule;
        if (source !== undefined) {
            mod = { path, kind: "js", text: source };
        } else if (isJavaScript(path)) {
            const file = await input.read(path);
            if (!file?.text && file?.text !== "") return missing(path);
            mod = { path, kind: "js", text: file?.text ?? "" };
        } else if (ext === "json" || TEXT_EXT.has(ext)) {
            const file = await input.read(path);
            if (file?.text === undefined) return missing(path);
            mod = { path, kind: ext === "json" ? "json" : "text", text: file.text };
        } else {
            const file = await input.read(path);
            const bytes = file?.bytes ?? (file?.text !== undefined ? new TextEncoder().encode(file.text) : undefined);
            if (!bytes) return missing(path);
            mod = { path, kind: "binary", bytes, mime: MIME[ext] ?? "application/octet-stream" };
        }
        const id = modules.length;
        modules.push(mod);
        indexByPath.set(path, id);
        if (mod.kind === "js" && mod.text !== undefined) {
            for (const ref of findRefs(mod.text)) {
                if (!isRelativeSpecifier(ref.spec)) continue;
                const resolved = resolveWorkspacePath(path, ref.spec);
                const child = await addModule(resolved);
                if (typeof child === "string") return child;
            }
        }
        stack.pop();
        return id;
    };

    const missing = (path: string) => `Cannot find workspace file "${path}"`;

    const entryId = await addModule(input.entryPath, input.entrySource);
    if (typeof entryId === "string") return { ok: false, error: entryId };

    const externals: ExternalImport[] = [];
    const seq = { n: 0 };
    const factories: string[] = [];

    for (const mod of modules) {
        if (mod.kind === "json") {
            try {
                const value = JSON.parse(mod.text ?? "");
                factories.push(`async () => ({ default: ${JSON.stringify(value)} })`);
            } catch (err) {
                return { ok: false, error: `Invalid JSON in ${mod.path}: ${err instanceof Error ? err.message : String(err)}` };
            }
            continue;
        }
        if (mod.kind === "text") {
            const cssInject = extensionOf(mod.path) === "css"
                ? `const __css = ${JSON.stringify(mod.text ?? "")};
const __cssId = ${JSON.stringify(`docks-canvas-css-${mod.path}`)};
if (typeof document !== "undefined" && !document.getElementById(__cssId)) {
  const __style = document.createElement("style");
  __style.id = __cssId;
  __style.textContent = __css;
  document.head.append(__style);
}
return { default: __css };`
                : `return { default: ${JSON.stringify(mod.text ?? "")} };`;
            factories.push(`async () => { ${cssInject} }`);
            continue;
        }
        if (mod.kind === "binary") {
            const href = `data:${mod.mime};base64,${toBase64(mod.bytes ?? new Uint8Array())}`;
            factories.push(`async () => ({ default: ${JSON.stringify(href)} })`);
            continue;
        }

        const refs = findRefs(mod.text ?? "").sort((a, b) => b.start - a.start);
        let body = mod.text ?? "";
        const preludes: string[] = [];
        for (const ref of refs) {
            const resolvedUrl = rewriteBridgeSpecifier(ref.spec);
            let replacement = "";
            if (ref.form === "asset-url") {
                if (!isRelativeSpecifier(ref.spec)) {
                    replacement = ref.raw;
                } else {
                    const assetPath = resolveWorkspacePath(mod.path, ref.spec);
                    const assetId = indexByPath.get(assetPath);
                    if (assetId === undefined) return { ok: false, error: missing(assetPath) };
                    replacement = `(await __req(${assetId})).default`;
                }
            } else if (isRelativeSpecifier(ref.spec)) {
                const depPath = resolveWorkspacePath(mod.path, ref.spec);
                const depId = indexByPath.get(depPath);
                if (depId === undefined) return { ok: false, error: missing(depPath) };
                const load = `__req(${depId})`;
                if (ref.form === "dynamic") replacement = load;
                else if (ref.form === "export-from") preludes.push(exportFromPrelude(ref.raw, load));
                else preludes.push(importPrelude(ref.raw, load));
            } else if (ref.form === "dynamic") {
                const runtime = bridgeRuntime(ref.spec);
                replacement = runtime ? `Promise.resolve(${runtime})` : `import(${JSON.stringify(resolvedUrl)})`;
                if (runtime) externalBinding(resolvedUrl, "side", externals, seq);
            } else {
                const runtime = bridgeRuntime(ref.spec);
                if (runtime) {
                    externalBinding(resolvedUrl, "side", externals, seq);
                    if (ref.form === "import" && !/^import\s+['"]/.test(ref.raw.trim())) {
                        preludes.push(runtimeImportPrelude(ref.raw, runtime));
                    } else if (ref.form === "export-from") {
                        preludes.push(runtimeExportFromPrelude(ref.raw, runtime));
                    } else if (ref.form === "import") {
                        preludes.push(`void ${runtime};`);
                    }
                } else {
                    const localFor = (imported: string) => externalBinding(resolvedUrl, imported, externals, seq);
                    if (ref.form === "import" && /^import\s+['"]/.test(ref.raw.trim())) {
                        externalBinding(resolvedUrl, "side", externals, seq);
                    } else if (ref.form === "import") {
                        preludes.push(externalImportPrelude(ref.raw, localFor));
                    } else if (ref.form === "export-from") {
                        preludes.push(externalExportFromPrelude(ref.raw, localFor));
                    }
                }
            }
            if (ref.form === "import" || ref.form === "export-from") replacement = "";
            body = body.slice(0, ref.start) + replacement + body.slice(ref.end);
        }
        body = rewriteLocalExports(body);
        factories.push(`async () => {
  const __exports = {};
  ${preludes.join("\n")}
  ${body}
  return __exports;
}`);
    }

    const uniqueLines = [...new Set(externals.map(item => item.line))];
    const code = `${uniqueLines.join("\n")}
const __factories = [
${factories.join(",\n")}
];
const __cache = new Map();
async function __req(id) {
  if (__cache.has(id)) return __cache.get(id);
  const pending = __factories[id]();
  __cache.set(id, pending);
  return pending;
}
const __entry = await __req(${entryId});
export default __entry.default;
`;
    return { ok: true, code };
}

function runtimeImportPrelude(raw: string, runtime: string): string {
    const clause = raw.replace(/\s+/g, " ").trim();
    const lines: string[] = [];
    const defaultName = clause.match(/^import\s+(?!type\b)(\w+)\s*(?:,|from)/);
    const namespace = clause.match(/\*\s+as\s+(\w+)/);
    const named = clause.match(/\{([^}]*)\}/);
    if (defaultName) lines.push(`const ${defaultName[1]} = ${runtime}.default;`);
    if (namespace) lines.push(`const ${namespace[1]} = ${runtime};`);
    if (named) {
        for (const part of named[1].split(",").map(piece => piece.trim()).filter(Boolean)) {
            const [imported, alias] = part.split(/\s+as\s+/).map(piece => piece.trim());
            lines.push(`const ${alias || imported} = ${runtime}.${imported};`);
        }
    }
    return lines.join("\n");
}

function runtimeExportFromPrelude(raw: string, runtime: string): string {
    if (raw.includes("*") && !raw.includes("{")) {
        return `Object.assign(__exports, ${runtime});\ndelete __exports.default;`;
    }
    const inner = raw.match(/\{([^}]*)\}/)?.[1] ?? "";
    return inner.split(",").map(part => part.trim()).filter(Boolean).map(part => {
        const [imported, alias] = part.split(/\s+as\s+/).map(piece => piece.trim());
        return `__exports.${alias || imported} = ${runtime}.${imported};`;
    }).join("\n");
}

function externalImportPrelude(raw: string, localFor: (imported: string) => string): string {
    const clause = raw.replace(/\s+/g, " ").trim();
    const lines: string[] = [];
    const defaultName = clause.match(/^import\s+(?!type\b)(\w+)\s*(?:,|from)/);
    const namespace = clause.match(/\*\s+as\s+(\w+)/);
    const named = clause.match(/\{([^}]*)\}/);
    if (defaultName) lines.push(`const ${defaultName[1]} = ${localFor("default")};`);
    if (namespace) lines.push(`const ${namespace[1]} = ${localFor("*")};`);
    if (named) {
        for (const part of named[1].split(",").map(piece => piece.trim()).filter(Boolean)) {
            const [imported, alias] = part.split(/\s+as\s+/).map(piece => piece.trim());
            lines.push(`const ${alias || imported} = ${localFor(imported)};`);
        }
    }
    return lines.join("\n");
}

function externalExportFromPrelude(raw: string, localFor: (imported: string) => string): string {
    if (raw.includes("*") && !raw.includes("{")) {
        return `Object.assign(__exports, ${localFor("*")});\ndelete __exports.default;`;
    }
    const inner = raw.match(/\{([^}]*)\}/)?.[1] ?? "";
    return inner.split(",").map(part => part.trim()).filter(Boolean).map(part => {
        const [imported, alias] = part.split(/\s+as\s+/).map(piece => piece.trim());
        return `__exports.${alias || imported} = ${localFor(imported)};`;
    }).join("\n");
}
