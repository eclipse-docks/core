import type { MessagePart, PromptAttachment, SessionAttachment } from './types';
import type { ProviderContent } from './models/types';
import { toWorkspaceToolPath } from './attachment-paths';

/** Soft cap per attached text file when stored / returned via workspace_read. */
export const MAX_ATTACHMENT_CHARS = 100_000;

/** Soft cap for visual media attachments (bytes). */
export const MAX_IMAGE_BYTES = 4_000_000;

/** Max files accepted on a single user turn. */
export const MAX_ATTACHMENTS = 8;

/** Default max characters returned when reading text attachments. */
export const DEFAULT_READ_CHARS = 40_000;

type MediaMode = 'raster' | 'svg';

interface MediaType {
  mime: string;
  mode: MediaMode;
  /** Prefer presenting bytes to vision models on workspace_read. */
  vision: boolean;
}

/** Well-known visual media types (raster icons/images + SVG). */
const MEDIA_BY_MIME = new Map<string, MediaType>([
  ['image/jpeg', { mime: 'image/jpeg', mode: 'raster', vision: true }],
  ['image/jpg', { mime: 'image/jpeg', mode: 'raster', vision: true }],
  ['image/pjpeg', { mime: 'image/jpeg', mode: 'raster', vision: true }],
  ['image/png', { mime: 'image/png', mode: 'raster', vision: true }],
  ['image/x-png', { mime: 'image/png', mode: 'raster', vision: true }],
  ['image/gif', { mime: 'image/gif', mode: 'raster', vision: true }],
  ['image/webp', { mime: 'image/webp', mode: 'raster', vision: true }],
  ['image/bmp', { mime: 'image/bmp', mode: 'raster', vision: true }],
  ['image/x-ms-bmp', { mime: 'image/bmp', mode: 'raster', vision: true }],
  ['image/avif', { mime: 'image/avif', mode: 'raster', vision: true }],
  ['image/tiff', { mime: 'image/tiff', mode: 'raster', vision: false }],
  ['image/tif', { mime: 'image/tiff', mode: 'raster', vision: false }],
  ['image/x-icon', { mime: 'image/x-icon', mode: 'raster', vision: true }],
  ['image/vnd.microsoft.icon', { mime: 'image/x-icon', mode: 'raster', vision: true }],
  ['image/ico', { mime: 'image/x-icon', mode: 'raster', vision: true }],
  ['image/svg+xml', { mime: 'image/svg+xml', mode: 'svg', vision: false }],
  ['image/svg', { mime: 'image/svg+xml', mode: 'svg', vision: false }],
]);

const MEDIA_BY_EXT = new Map<string, MediaType>([
  ['jpg', MEDIA_BY_MIME.get('image/jpeg')!],
  ['jpeg', MEDIA_BY_MIME.get('image/jpeg')!],
  ['jpe', MEDIA_BY_MIME.get('image/jpeg')!],
  ['jfif', MEDIA_BY_MIME.get('image/jpeg')!],
  ['png', MEDIA_BY_MIME.get('image/png')!],
  ['gif', MEDIA_BY_MIME.get('image/gif')!],
  ['webp', MEDIA_BY_MIME.get('image/webp')!],
  ['bmp', MEDIA_BY_MIME.get('image/bmp')!],
  ['avif', MEDIA_BY_MIME.get('image/avif')!],
  ['tif', MEDIA_BY_MIME.get('image/tiff')!],
  ['tiff', MEDIA_BY_MIME.get('image/tiff')!],
  ['ico', MEDIA_BY_MIME.get('image/x-icon')!],
  ['cur', MEDIA_BY_MIME.get('image/x-icon')!],
  ['svg', MEDIA_BY_MIME.get('image/svg+xml')!],
  ['svgz', MEDIA_BY_MIME.get('image/svg+xml')!],
]);

/** File picker `accept` list for visual media + common text sources. */
export const ATTACHMENT_FILE_ACCEPT = [
  'image/*',
  '.svg',
  '.svgz',
  '.ico',
  '.cur',
  '.bmp',
  '.tif',
  '.tiff',
  '.avif',
  'text/*',
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.json',
  '.md',
  '.css',
  '.html',
  '.py',
  '.rs',
  '.go',
  '.sql',
  '.yml',
  '.yaml',
  '.toml',
  '.txt',
  '.csv',
].join(',');

export function fileExtension(name: string): string {
  const base = name.includes('/') ? name.slice(name.lastIndexOf('/') + 1) : name;
  const dot = base.lastIndexOf('.');
  return dot >= 0 ? base.slice(dot + 1).toLowerCase() : '';
}

export function resolveMediaType(input: {
  name: string;
  mime?: string;
}): MediaType | null {
  const mime = (input.mime || '').toLowerCase().trim();
  if (mime && MEDIA_BY_MIME.has(mime)) return MEDIA_BY_MIME.get(mime)!;
  const ext = fileExtension(input.name);
  return MEDIA_BY_EXT.get(ext) ?? null;
}

export function isImageAttachment(
  part: Pick<PromptAttachment, 'kind' | 'mime' | 'dataUrl' | 'name'>,
): boolean {
  if (part.kind === 'image') return true;
  if (part.dataUrl?.startsWith('data:image/')) return true;
  return resolveMediaType({ name: part.name, mime: part.mime }) != null;
}

export function isSvgAttachment(
  part: Pick<PromptAttachment, 'mime' | 'name' | 'text'>,
): boolean {
  const media = resolveMediaType({ name: part.name, mime: part.mime });
  return media?.mode === 'svg' || Boolean(part.text && part.mime?.includes('svg'));
}

export function newAttachmentId(): string {
  return `att-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Persistable session entry holding the full payload (not sent in chat history). */
export function toSessionAttachment(
  attachment: PromptAttachment,
  opts: { id?: string; messageId?: string } = {},
): SessionAttachment {
  const kind = isImageAttachment(attachment) ? 'image' : 'text';
  if (kind === 'image') {
    let text = attachment.text;
    let truncated = Boolean(attachment.truncated);
    if (text && text.length > MAX_ATTACHMENT_CHARS) {
      text = text.slice(0, MAX_ATTACHMENT_CHARS);
      truncated = true;
    }
    return {
      id: opts.id ?? newAttachmentId(),
      name: attachment.name,
      path: attachment.path,
      mime: attachment.mime,
      kind: 'image',
      text,
      dataUrl: attachment.dataUrl,
      byteLength: attachment.byteLength,
      truncated: text ? truncated : attachment.truncated,
      createdAt: Date.now(),
      messageId: opts.messageId,
    };
  }

  let text = attachment.text ?? '';
  let truncated = Boolean(attachment.truncated);
  if (text.length > MAX_ATTACHMENT_CHARS) {
    text = text.slice(0, MAX_ATTACHMENT_CHARS);
    truncated = true;
  }
  return {
    id: opts.id ?? newAttachmentId(),
    name: attachment.name,
    path: attachment.path,
    mime: attachment.mime,
    kind: 'text',
    text,
    byteLength: attachment.byteLength,
    truncated,
    createdAt: Date.now(),
    messageId: opts.messageId,
  };
}

/** Lightweight history/UI reference — no payload (path is an in-memory workspace path/URI). */
export function toFileRefPart(stored: SessionAttachment): Extract<MessagePart, { type: 'file' }> {
  return {
    type: 'file',
    id: stored.id,
    name: stored.name,
    path: stored.path,
    mime: stored.mime,
    kind: stored.kind,
    byteLength: stored.byteLength,
  };
}

/** One-line catalog entry published into the user turn for the model. */
export function formatAttachmentRefForModel(part: Extract<MessagePart, { type: 'file' }>): string {
  const display = part.path || part.name;
  const toolPath = toWorkspaceToolPath(display);
  const kind = part.kind ?? 'file';
  const bytes = part.byteLength != null ? ` bytes=${part.byteLength}` : '';
  return `[Attachment published: ${display} kind=${kind}${part.mime ? ` mime=${part.mime}` : ''}${bytes}] → workspace_read path="${toolPath}"`;
}

/**
 * Build provider user content from history parts.
 * File parts are references only — payloads live under the in-memory workspace root.
 */
export function userContentFromParts(parts: MessagePart[]): ProviderContent {
  const texts: string[] = [];
  const refs: string[] = [];
  for (const part of parts) {
    if (part.type === 'text' && part.text.trim()) texts.push(part.text);
    if (part.type === 'file') refs.push(formatAttachmentRefForModel(part));
  }
  const body = [...texts, ...refs].join('\n').trim();
  if (!refs.length) return body;
  const hint =
    'Session attachments are files under the in-memory workspace root. List with workspace_list, read with workspace_read. Do not connect storage backends to find them.';
  return [body, hint].filter(Boolean).join('\n');
}

export function attachmentMeta(stored: SessionAttachment) {
  return {
    id: stored.id,
    name: stored.name,
    path: stored.path,
    mime: stored.mime,
    kind: stored.kind,
    byteLength: stored.byteLength,
    truncated: stored.truncated,
  };
}

export function readTextAttachment(
  stored: SessionAttachment,
  opts: { offset?: number; limit?: number } = {},
): { ok: true; output: Record<string, unknown> } | { ok: false; error: string } {
  if (stored.kind !== 'text' && !(stored.kind === 'image' && stored.text)) {
    return { ok: false, error: `${stored.name} is not a text attachment` };
  }
  const full = stored.text ?? '';
  const offset = Math.max(0, opts.offset ?? 0);
  const limit = Math.max(1, opts.limit ?? DEFAULT_READ_CHARS);
  const slice = full.slice(offset, offset + limit);
  return {
    ok: true,
    output: {
      ...attachmentMeta(stored),
      offset,
      length: slice.length,
      totalLength: full.length,
      truncated: offset + slice.length < full.length,
      content: slice,
    },
  };
}

/** Marker field: specialist loop presents image bytes in a follow-up multimodal message. */
export const IMAGE_PRESENT_KEY = '_presentImage' as const;

export function readImageAttachment(
  stored: SessionAttachment,
  opts: { offset?: number; limit?: number } = {},
): { ok: true; output: Record<string, unknown> } | { ok: false; error: string } {
  if (stored.kind !== 'image') {
    return { ok: false, error: `${stored.name} is not an image attachment` };
  }

  // SVG and other source-backed visuals: return markup/text (vision APIs rarely accept SVG).
  if (stored.text != null && isSvgAttachment(stored)) {
    return readTextAttachment(stored, opts);
  }

  if (!stored.dataUrl) {
    return { ok: false, error: `${stored.name} has no image payload` };
  }

  const media = resolveMediaType({ name: stored.name, mime: stored.mime });
  const present = media?.vision !== false;

  return {
    ok: true,
    output: {
      ...attachmentMeta(stored),
      ...(present
        ? {
            [IMAGE_PRESENT_KEY]: true,
            dataUrl: stored.dataUrl,
            note: 'Image bytes will be provided to the model in the next message for vision inspection.',
          }
        : {
            dataUrlOmitted: true,
            note: 'This media type is stored for preview; vision presentation is skipped. Ask for a raster export if needed.',
          }),
    },
  };
}

export function stripAttachmentToolOutput(output: unknown): unknown {
  if (!output || typeof output !== 'object') return output;
  const copy = { ...(output as Record<string, unknown>) };
  delete copy.dataUrl;
  delete copy[IMAGE_PRESENT_KEY];
  return copy;
}

export function looksBinaryText(sample: string): boolean {
  return sample.includes('\0');
}

export type ReadAttachmentResult =
  | { ok: true; attachment: PromptAttachment }
  | { ok: false; error: string };

function bytesToBase64(bytes: Uint8Array): string {
  const chunk = 0x8000;
  let binary = '';
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

function textToBase64(text: string): string {
  // UTF-8 safe base64 for SVG source.
  const bytes = new TextEncoder().encode(text);
  return bytesToBase64(bytes);
}

async function readFileAsDataUrl(file: File, mime: string): Promise<string> {
  const buffer = await file.arrayBuffer();
  return `data:${mime};base64,${bytesToBase64(new Uint8Array(buffer))}`;
}

function svgDataUrl(text: string): string {
  return `data:image/svg+xml;base64,${textToBase64(text)}`;
}

/** Read a browser `File` into a prompt attachment (payload kept until publish). */
export async function readPromptAttachmentFromFile(file: File): Promise<ReadAttachmentResult> {
  const mime = file.type || 'application/octet-stream';
  const media = resolveMediaType({ name: file.name, mime });

  if (media) {
    if (file.size > MAX_IMAGE_BYTES) {
      return {
        ok: false,
        error: `${file.name}: media is larger than ${Math.round(MAX_IMAGE_BYTES / 1_000_000)}MB`,
      };
    }

    if (media.mode === 'svg') {
      try {
        const text = await file.text();
        if (!text.trim()) {
          return { ok: false, error: `${file.name}: empty SVG` };
        }
        let storedText = text;
        let truncated = false;
        if (storedText.length > MAX_ATTACHMENT_CHARS) {
          storedText = storedText.slice(0, MAX_ATTACHMENT_CHARS);
          truncated = true;
        }
        return {
          ok: true,
          attachment: {
            name: file.name,
            mime: media.mime,
            kind: 'image',
            text: storedText,
            dataUrl: svgDataUrl(storedText),
            byteLength: file.size,
            truncated,
          },
        };
      } catch (err) {
        return {
          ok: false,
          error: `${file.name}: ${err instanceof Error ? err.message : String(err)}`,
        };
      }
    }

    try {
      const dataUrl = await readFileAsDataUrl(file, media.mime);
      return {
        ok: true,
        attachment: {
          name: file.name,
          mime: media.mime,
          kind: 'image',
          dataUrl,
          byteLength: file.size,
        },
      };
    } catch (err) {
      return {
        ok: false,
        error: `${file.name}: ${err instanceof Error ? err.message : String(err)}`,
      };
    }
  }

  if (mime.startsWith('audio/') || mime.startsWith('video/')) {
    return { ok: false, error: `${file.name}: audio/video attachments are not supported` };
  }
  if (mime.startsWith('image/')) {
    return {
      ok: false,
      error: `${file.name}: unsupported image type (try jpeg, png, gif, webp, svg, ico, bmp, avif)`,
    };
  }
  if (file.size > 2_000_000) {
    return { ok: false, error: `${file.name}: file is larger than 2MB` };
  }

  let text: string;
  try {
    text = await file.text();
  } catch (err) {
    return {
      ok: false,
      error: `${file.name}: ${err instanceof Error ? err.message : String(err)}`,
    };
  }

  if (looksBinaryText(text.slice(0, 2048))) {
    return { ok: false, error: `${file.name}: binary files are not supported` };
  }

  let truncated = false;
  if (text.length > MAX_ATTACHMENT_CHARS) {
    text = text.slice(0, MAX_ATTACHMENT_CHARS);
    truncated = true;
  }

  return {
    ok: true,
    attachment: {
      name: file.name,
      mime,
      kind: 'text',
      text,
      byteLength: file.size,
      truncated,
    },
  };
}
