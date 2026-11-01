import 'fake-indexeddb/auto';

const prototype = CSSStyleSheet.prototype as CSSStyleSheet & { replaceSync?: (css: string) => void };
if (typeof prototype.replaceSync !== 'function') {
    prototype.replaceSync = function replaceSync() {
        return undefined;
    };
}

const internals = ElementInternals.prototype as ElementInternals & { setValidity?: (...args: unknown[]) => void };
if (typeof internals.setValidity !== 'function') {
    internals.setValidity = () => undefined;
}

for (const target of [document, Document.prototype, ShadowRoot.prototype]) {
    const sheets = (target as { adoptedStyleSheets?: CSSStyleSheet[] }).adoptedStyleSheets;
    if (sheets) continue;
    Object.defineProperty(target, 'adoptedStyleSheets', {
        configurable: true,
        writable: true,
        value: [],
    });
}
