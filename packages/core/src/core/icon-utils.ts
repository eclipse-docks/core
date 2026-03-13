export interface ParsedIconSpec {
    name: string;
    library?: string;
}

/**
 * Parses an icon spec string into `{ library, name }` for use with `wa-icon`.
 *
 * Icon specs support an optional icon library prefix followed by the icon name,
 * separated by whitespace, e.g. `"lyra mark-github"`.
 *
 * - When the spec contains **no whitespace**, it is treated as the icon name only
 *   and `library` is omitted so the default Web Awesome / Font Awesome library is used.
 * - When the spec contains **whitespace**, the **last segment** is treated as
 *   the icon name and every prior segment (joined by a single space) becomes `library`.
 *
 * This allows call sites to pass a single string (e.g. contribution `icon` fields
 * or `lyra-icon`'s `name` prop) while still rendering plain `<wa-icon>` elements.
 * Some Web Awesome internals look specifically for `wa-icon` tags and cannot
 * handle wrapper components, so we normalize everything through this helper.
 */
export function parseIconSpec(spec: string): ParsedIconSpec {
    const trimmed = (spec ?? '').trim();
    if (!trimmed) return { name: '' };
    const parts = trimmed.split(/\s+/);
    if (parts.length <= 1) return { name: trimmed };
    const name = parts.pop()!;
    const library = parts.join(' ');
    return { name, library };
}
