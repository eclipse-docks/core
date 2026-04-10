import { signal, Signal } from '@lit-labs/signals';
import { appSettings, TOPIC_SETTINGS_CHANGED } from "./settingsservice";
import { subscribe } from "./events";

/**
 * Why this custom i18n layer exists (instead of directly using @lit/localize):
 *
 * - Architecture fit: this system localizes not only Lit templates, but also
 *   runtime metadata (for example extension names/descriptions) that can be
 *   consumed outside component render paths.
 * - Plugin ergonomics: each feature can ship co-located locale JSON files and
 *   load them lazily via import.meta.glob.
 * - Low process overhead: simple JSON dictionaries are easy to maintain and
 *   work well with AI-assisted translation workflows without XLIFF tooling.
 *
 * Trade-offs versus Lit Localize:
 *
 * - We do not get Lit Localize's extraction/build pipeline and XLIFF workflow
 *   out of the box.
 * - We own validation/consistency guarantees (key parity, placeholder parity,
 *   locale completeness) and must enforce them in our own checks.
 * - Message interpolation is intentionally simple ({param} replacement), which
 *   is less expressive than template-aware localization APIs.
 */
export const SETTINGS_KEY_LANGUAGE = 'language';

export const DEFAULT_LANGUAGE = 'en';

function replaceParameters(text: string, params?: Record<string, string>): string {
    if (!params) return text;
    return text.replace(/\{(\w+)\}/g, (match, paramKey) =>
        params[paramKey] !== undefined ? params[paramKey] : match
    );
}

const supportedLocales = new Set<string>([DEFAULT_LANGUAGE]);
export const supportedLocalesSignal: Signal.State<Set<string>> = signal(supportedLocales);

let languageFromSettings: string | null = null;

function addSupportedLocales(locales: string[]): void {
    let changed = false;
    for (const loc of locales) {
        const normalized = loc.toLowerCase().replace('-', '_');
        if (!supportedLocales.has(normalized)) {
            supportedLocales.add(normalized);
            changed = true;
        }
    }
    if (changed) {
        supportedLocalesSignal.set(new Set(supportedLocales));
        if (languageFromSettings === null) {
            const preferred = getPreferredBrowserLanguage();
            if (preferred !== currentLanguageSignal.get()) currentLanguageSignal.set(preferred);
        }
    }
}

function getPreferredBrowserLanguage(): string {
    const list = navigator.languages?.length ? navigator.languages : [navigator.language || DEFAULT_LANGUAGE];
    const supported = supportedLocalesSignal.get();
    for (const raw of list) {
        const primary = raw.split('-')[0].toLowerCase();
        if (supported.has(primary)) return primary;
    }
    return DEFAULT_LANGUAGE;
}

export const currentLanguageSignal: Signal.State<string> = signal(getPreferredBrowserLanguage());

async function updateLanguageFromSettings(): Promise<void> {
    const settingsLanguage = await appSettings.get(SETTINGS_KEY_LANGUAGE);
    languageFromSettings = settingsLanguage ?? null;
    currentLanguageSignal.set(settingsLanguage || getPreferredBrowserLanguage());
}

subscribe(TOPIC_SETTINGS_CHANGED, (settings: any) => {
    languageFromSettings = settings?.[SETTINGS_KEY_LANGUAGE] ?? null;
    currentLanguageSignal.set(settings?.[SETTINGS_KEY_LANGUAGE] || getPreferredBrowserLanguage());
});

updateLanguageFromSettings();

export interface LazyLabel {
    toString(): string;
    valueOf(): string;
    [Symbol.toPrimitive](hint?: string): string;
    toJSON?(): string;
}

export type UILabel = string | LazyLabel;

export function createLazyLabel(getter: () => string): LazyLabel {
    return {
        toString: () => getter(),
        valueOf: () => getter(),
        [Symbol.toPrimitive]: () => getter(),
        toJSON: () => getter(),
    };
}

type Messages = Record<string, string>;

type I18nHandle<TKeys extends string> = {
    [K in TKeys]: string & ((params?: Record<string, string>) => string);
};

export async function i18n<F extends Record<string, () => Promise<any>>>(files: F, reactive = false) {
    const byLocale: Record<string, Messages> = {};

    await Promise.all(
        Object.entries(files).map(async ([path, loader]) => {
            const mod = await loader();
            const messages: Messages = (mod && 'default' in mod ? (mod as any).default : mod) as Messages;
            const match = path.match(/\.([a-zA-Z-_]+)\.json$/);
            const rawLocale = match?.[1] ?? DEFAULT_LANGUAGE;
            const normalizedLocale = rawLocale.toLowerCase().replace('-', '_');
            byLocale[normalizedLocale] = messages;
        }),
    );

    addSupportedLocales(Object.keys(byLocale));

    type AllKeys = keyof (typeof byLocale)[keyof typeof byLocale] & string;
    type Handle = I18nHandle<AllKeys>;

    const getMessage = (key: string): string => {
        const current = currentLanguageSignal.get();
        const normalized = current.toLowerCase().replace('-', '_');
        const [lang, region] = normalized.split('_');
        const candidates: string[] = region ? [`${lang}_${region}`, lang] : [lang];
        candidates.push(DEFAULT_LANGUAGE);
        for (const loc of candidates) {
            const dict = byLocale[loc];
            if (dict && key in dict) return dict[key]!;
        }
        return key;
    };

    const target = Object.assign({} as Handle, { then: undefined, catch: undefined, finally: undefined });

    const handler: ProxyHandler<Handle> = {
        get(t, key: string) {
            if (key in t) return (t as Record<string, unknown>)[key];
            const base = getMessage(key);
            const fn = ((params?: Record<string, string>) =>
                replaceParameters(getMessage(key), params)) as unknown as Handle[typeof key];
            (fn as any).toString = () => (reactive ? getMessage(key) : base);
            (fn as any).valueOf = () => (reactive ? getMessage(key) : base);
            (fn as any)[Symbol.toPrimitive] = () => (reactive ? getMessage(key) : base);
            if (reactive) (fn as any).toJSON = () => getMessage(key);
            return fn;
        },
    };

    return new Proxy(target, handler);
}
