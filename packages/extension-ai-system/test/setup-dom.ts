import 'fake-indexeddb/auto';

const prototype = globalThis.CSSStyleSheet?.prototype as (CSSStyleSheet & { replaceSync?: (css: string) => void }) | undefined;
if (prototype && typeof prototype.replaceSync !== 'function') {
    prototype.replaceSync = function replaceSync() {
        return undefined;
    };
}

if (typeof document !== 'undefined') {
    for (const target of [document, Document.prototype, ShadowRoot.prototype]) {
        const sheets = (target as { adoptedStyleSheets?: CSSStyleSheet[] }).adoptedStyleSheets;
        if (sheets) continue;
        Object.defineProperty(target, 'adoptedStyleSheets', {
            configurable: true,
            writable: true,
            value: [],
        });
    }
}
