/** Max bytes loaded into the hex editor when content is detected as binary (UI/memory guard). */
export const BINARY_HEX_VIEW_MAX_BYTES = 8 * 1024;

/** Same cap as hex view: detection only needs a prefix (NUL / UTF-8 validity). */
const SAMPLE_MAX = BINARY_HEX_VIEW_MAX_BYTES;

/** Bytes per row in the hex view / dump layout. */
export const HEX_BYTES_PER_LINE = 16;

/**
 * Heuristic: binary if NUL in sample or UTF-8 strict decode fails on the sample.
 */
export async function detectBinaryBlob(blob: Blob): Promise<boolean> {
  if (blob.size === 0) {
    return false;
  }
  const n = Math.min(blob.size, SAMPLE_MAX);
  const buf = new Uint8Array(await blob.slice(0, n).arrayBuffer());
  for (let i = 0; i < buf.length; i++) {
    if (buf[i] === 0) {
      return true;
    }
  }
  try {
    new TextDecoder('utf-8', { fatal: true }).decode(buf);
    return false;
  } catch {
    return true;
  }
}

function byteToPreviewChar(b: number): string {
  if (b >= 0x20 && b <= 0x7e) {
    return String.fromCharCode(b);
  }
  return '.';
}

/** Printable ASCII for one row of the hex preview column (typical hex dump). */
export function asciiPreview(slice: Uint8Array): string {
  let s = '';
  for (let i = 0; i < slice.length; i++) {
    s += byteToPreviewChar(slice[i]!);
  }
  return s.padEnd(HEX_BYTES_PER_LINE, ' ');
}

/** "aa bb cc ..." with extra gap after 8th byte */
export function formatHexBytes(slice: Uint8Array): string {
  const pairs: string[] = [];
  for (let i = 0; i < slice.length; i++) {
    pairs.push(slice[i]!.toString(16).padStart(2, '0'));
  }
  const half = HEX_BYTES_PER_LINE / 2;
  if (pairs.length <= half) {
    return pairs.join(' ');
  }
  return `${pairs.slice(0, half).join(' ')}  ${pairs.slice(half).join(' ')}`;
}

export function parseHexFlexible(text: string): Uint8Array {
  const hex = text.replace(/[^0-9a-fA-F]/g, '');
  const len = Math.floor(hex.length / 2);
  const out = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

/** Parse one line of hex pairs (HEX_BYTES_PER_LINE or fewer bytes). */
export function parseHexLine(line: string): number[] {
  const hex = line.replace(/[^0-9a-fA-F]/g, '');
  const bytes: number[] = [];
  for (let i = 0; i + 1 < hex.length; i += 2) {
    bytes.push(parseInt(hex.slice(i, i + 2), 16));
  }
  return bytes;
}

const HEX_CHAR = /[0-9a-fA-F]/;

function findNextHexSlot(line: string, from: number): number {
  for (let i = Math.max(0, from); i < line.length; i++) {
    if (HEX_CHAR.test(line[i]!)) return i;
  }
  return -1;
}

function findPrevHexSlot(line: string, from: number): number {
  for (let i = Math.min(from, line.length - 1); i >= 0; i--) {
    if (HEX_CHAR.test(line[i]!)) return i;
  }
  return -1;
}

/** If `pos` is not on a hex digit, snap to the next hex slot, else the previous. */
function snapToHexSlot(line: string, pos: number): number {
  if (line.length === 0) return -1;
  if (pos >= line.length) return findPrevHexSlot(line, line.length - 1);
  if (pos < 0) return findNextHexSlot(line, 0);
  if (HEX_CHAR.test(line[pos]!)) return pos;
  const next = findNextHexSlot(line, pos);
  if (next >= 0) return next;
  return findPrevHexSlot(line, pos);
}

function firstHexSlotInRange(line: string, start: number, end: number): number {
  const lo = Math.min(start, end);
  const hi = Math.max(start, end);
  for (let i = lo; i < hi && i < line.length; i++) {
    if (HEX_CHAR.test(line[i]!)) return i;
  }
  return findNextHexSlot(line, lo);
}

function caretAfterOverwrite(line: string, replacedAt: number): number {
  const next = findNextHexSlot(line, replacedAt + 1);
  return next >= 0 ? next : line.length;
}

/**
 * Overwrite a single hex digit at the caret (never changes string length).
 * Returns null if there is no hex slot to write.
 */
export function applyHexDigitOverwrite(
  line: string,
  selectionStart: number,
  selectionEnd: number,
  digit: string,
): { line: string; caret: number } | null {
  const d = digit.toLowerCase();
  if (!/^[0-9a-f]$/.test(d)) return null;

  let pos =
    selectionStart !== selectionEnd
      ? firstHexSlotInRange(line, selectionStart, selectionEnd)
      : snapToHexSlot(line, selectionStart);

  if (pos < 0) return null;
  if (!HEX_CHAR.test(line[pos]!)) {
    pos = findNextHexSlot(line, pos);
    if (pos < 0) return null;
  }

  const chars = [...line];
  chars[pos] = d;
  const newLine = chars.join('');
  return { line: newLine, caret: caretAfterOverwrite(newLine, pos) };
}

/** Move caret to the previous hex digit (for Backspace navigation). */
export function hexLineCaretPrev(line: string, caret: number): number {
  const prev = findPrevHexSlot(line, caret - 1);
  return prev >= 0 ? prev : caret;
}

/** Move caret to the next hex digit (for Delete / Space navigation). */
export function hexLineCaretNext(line: string, caret: number): number {
  const pos = caret >= line.length ? line.length - 1 : caret;
  const next = findNextHexSlot(line, HEX_CHAR.test(line[pos]!) ? pos + 1 : pos);
  return next >= 0 ? next : caret;
}

export function hexRowCountForByteLength(byteLength: number): number {
  if (byteLength === 0) return 1;
  return Math.ceil(byteLength / HEX_BYTES_PER_LINE);
}

/**
 * Replace the row at `byteOffset` (one row = up to {@link HEX_BYTES_PER_LINE} bytes)
 * with bytes parsed from a hex line input string.
 */
export function mergeHexLineAtOffset(
  bytes: Uint8Array,
  byteOffset: number,
  lineText: string,
): Uint8Array {
  const parsed = parseHexLine(lineText).slice(0, HEX_BYTES_PER_LINE);
  const before = bytes.subarray(0, byteOffset);
  const oldRowByteCount = Math.min(HEX_BYTES_PER_LINE, Math.max(0, bytes.length - byteOffset));
  const after = bytes.subarray(byteOffset + oldRowByteCount);
  const newRow = Uint8Array.from(parsed);
  const merged = new Uint8Array(before.length + newRow.length + after.length);
  merged.set(before, 0);
  merged.set(newRow, before.length);
  merged.set(after, before.length + newRow.length);
  return merged;
}

/** Multi-line text dump (offset + hex + ASCII), for consumers / debugging. */
export function formatHexDump(bytes: Uint8Array): string {
  const lines: string[] = [];
  for (let i = 0; i < bytes.length; i += HEX_BYTES_PER_LINE) {
    const slice = bytes.subarray(i, Math.min(i + HEX_BYTES_PER_LINE, bytes.length));
    const addr = i.toString(16).padStart(8, '0');
    lines.push(`${addr}h  ${formatHexBytes(slice)}  |${asciiPreview(slice)}`);
  }
  if (bytes.length === 0) {
    lines.push(`${(0).toString(16).padStart(8, '0')}h  ${''}  |${asciiPreview(new Uint8Array(0))}`);
  }
  return lines.join('\n');
}
