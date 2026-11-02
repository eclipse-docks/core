import type { ToolBroker } from './broker';

const DEFAULT_MAX_BYTES = 512_000;
const DEFAULT_MAX_CHARS = 120_000;
const DEFAULT_TIMEOUT_MS = 20_000;

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
}

function parseUrl(raw: string): URL | { error: string } {
  const trimmed = raw.trim();
  if (!trimmed) return { error: 'Missing url' };
  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return { error: `Invalid url: ${trimmed}` };
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return { error: `Only http(s) URLs are allowed (got ${parsed.protocol})` };
  }
  return parsed;
}

function isTextualContentType(contentType: string): boolean {
  const type = contentType.split(';')[0]?.trim().toLowerCase() ?? '';
  if (!type) return true;
  if (type.startsWith('text/')) return true;
  return (
    type.includes('json') ||
    type.includes('xml') ||
    type.includes('javascript') ||
    type.includes('svg') ||
    type.includes('markdown') ||
    type.includes('yaml') ||
    type.includes('csv')
  );
}

/** Registers a read-only HTTP(S) fetch tool for remote documentation and text content. */
export function registerFetchTools(broker: ToolBroker): void {
  broker.register(
    {
      name: 'fetch',
      description:
        'Fetch a remote http(s) URL and return text content (HTML, Markdown, JSON, etc.). Use for docs and references (e.g. Web Awesome agent skills on jsDelivr). Binary responses return metadata only.',
      parameters: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description: 'Absolute http(s) URL to fetch',
          },
          max_chars: {
            type: 'number',
            description: `Max characters of body text to return (default ${DEFAULT_MAX_CHARS})`,
          },
        },
        required: ['url'],
      },
    },
    async (call) => {
      const args = asRecord(call.arguments);
      const parsed = parseUrl(String(args.url ?? ''));
      if ('error' in parsed) {
        return { id: call.id, name: call.name, ok: false, output: null, error: parsed.error };
      }

      const maxCharsRaw = Number(args.max_chars);
      const maxChars =
        Number.isFinite(maxCharsRaw) && maxCharsRaw > 0
          ? Math.min(Math.floor(maxCharsRaw), DEFAULT_MAX_CHARS * 2)
          : DEFAULT_MAX_CHARS;

      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);
      try {
        const response = await fetch(parsed.href, {
          method: 'GET',
          redirect: 'follow',
          signal: controller.signal,
          headers: { Accept: 'text/*, application/json, application/xml, */*;q=0.1' },
        });
        const contentType = response.headers.get('content-type') ?? '';
        const buffer = new Uint8Array(await response.arrayBuffer());
        const truncatedBytes = buffer.byteLength > DEFAULT_MAX_BYTES;
        const slice = truncatedBytes ? buffer.subarray(0, DEFAULT_MAX_BYTES) : buffer;

        if (!isTextualContentType(contentType) && !looksLikeUtf8Text(slice)) {
          return {
            id: call.id,
            name: call.name,
            ok: response.ok,
            output: {
              url: response.url || parsed.href,
              status: response.status,
              contentType,
              byteLength: buffer.byteLength,
              binary: true,
              note: 'Response is not text; body omitted. Prefer documentation or raw text URLs.',
            },
            error: response.ok ? undefined : `HTTP ${response.status}`,
          };
        }

        const decoded = new TextDecoder('utf-8', { fatal: false }).decode(slice);
        const truncatedChars = decoded.length > maxChars;
        const body = truncatedChars ? decoded.slice(0, maxChars) : decoded;

        return {
          id: call.id,
          name: call.name,
          ok: response.ok,
          output: {
            url: response.url || parsed.href,
            status: response.status,
            contentType,
            byteLength: buffer.byteLength,
            truncated: truncatedBytes || truncatedChars,
            body,
          },
          error: response.ok ? undefined : `HTTP ${response.status}`,
        };
      } catch (err) {
        const message =
          err instanceof Error && err.name === 'AbortError'
            ? `Timed out after ${DEFAULT_TIMEOUT_MS}ms`
            : err instanceof Error
              ? err.message
              : String(err);
        return { id: call.id, name: call.name, ok: false, output: null, error: message };
      } finally {
        clearTimeout(timer);
      }
    },
  );
}

function looksLikeUtf8Text(bytes: Uint8Array): boolean {
  if (!bytes.length) return true;
  const sample = bytes.subarray(0, Math.min(bytes.length, 512));
  let odd = 0;
  for (const b of sample) {
    if (b === 0) return false;
    if (b < 7 || (b > 13 && b < 32)) odd += 1;
  }
  return odd / sample.length < 0.1;
}
