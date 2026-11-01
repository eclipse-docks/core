import { describe, expect, it } from 'vitest';
import {
  formatAttachmentRefForModel,
  IMAGE_PRESENT_KEY,
  MAX_ATTACHMENT_CHARS,
  readImageAttachment,
  readPromptAttachmentFromFile,
  readTextAttachment,
  toFileRefPart,
  toSessionAttachment,
  userContentFromParts,
} from '../src/runtime/attachments';
import { historyToProviderMessages } from '../src/runtime/specialists/loop';
import type { ChatMessage } from '../src/runtime/types';

describe('attachments', () => {
  it('stores payloads on the session entry and publishes lightweight refs', () => {
    const stored = toSessionAttachment({
      name: 'main.ts',
      path: 'src/main.ts',
      text: 'export const x = 1;',
    });
    expect(stored.kind).toBe('text');
    expect(stored.text).toContain('export const x');

    const withPath = {
      ...stored,
      path: `in-memory://sess-1/${stored.id}-main.ts`,
    };
    const ref = toFileRefPart(withPath);
    expect(ref.type).toBe('file');
    expect(ref.id).toBe(stored.id);
    expect(ref.name).toBe('main.ts');
    expect(ref.path).toBe(withPath.path);
    expect(ref.kind).toBe('text');
    expect(formatAttachmentRefForModel(ref)).toContain(withPath.path);
    expect(formatAttachmentRefForModel(ref)).toContain('workspace_read');
    expect(formatAttachmentRefForModel(ref)).not.toContain('export const');
  });

  it('truncates oversized text when storing', () => {
    const stored = toSessionAttachment({
      name: 'big.txt',
      text: 'a'.repeat(MAX_ATTACHMENT_CHARS + 50),
    });
    expect(stored.text).toHaveLength(MAX_ATTACHMENT_CHARS);
    expect(stored.truncated).toBe(true);
  });

  it('publishes attachment refs in provider user content without payloads', () => {
    const stored = toSessionAttachment({
      name: 'a.ts',
      kind: 'text',
      text: 'const a = 1;',
    });
    const withPath = { ...stored, path: `in-memory://sess-1/${stored.id}-a.ts` };
    const content = userContentFromParts([
      { type: 'text', text: 'Please review' },
      toFileRefPart(withPath),
    ]);
    expect(typeof content).toBe('string');
    expect(content as string).toContain('Please review');
    expect(content as string).toContain(withPath.path);
    expect(content as string).toContain('workspace_read');
    expect(content as string).not.toContain('const a = 1;');
  });

  it('does not inline image bytes into history provider content', () => {
    const stored = toSessionAttachment({
      name: 'scene.jpg',
      kind: 'image',
      mime: 'image/jpeg',
      dataUrl: 'data:image/jpeg;base64,/9j/4AAQ',
    });
    const content = userContentFromParts([
      { type: 'text', text: 'What is this?' },
      toFileRefPart(stored),
    ]);
    expect(typeof content).toBe('string');
    expect(content as string).toContain('kind=image');
    expect(content as string).not.toContain('data:image');
  });

  it('reads text and presents images via attachment helpers', () => {
    const text = toSessionAttachment({ name: 'a.ts', text: 'hello world' });
    const textRead = readTextAttachment(text, { limit: 5 });
    expect(textRead.ok).toBe(true);
    if (textRead.ok) {
      expect(textRead.output.content).toBe('hello');
      expect(textRead.output.truncated).toBe(true);
    }

    const image = toSessionAttachment({
      name: 'scene.jpg',
      kind: 'image',
      dataUrl: 'data:image/jpeg;base64,abc',
    });
    const imageRead = readImageAttachment(image);
    expect(imageRead.ok).toBe(true);
    if (imageRead.ok) {
      expect(imageRead.output[IMAGE_PRESENT_KEY]).toBe(true);
      expect(imageRead.output.dataUrl).toContain('data:image/jpeg');
    }
  });

  it('keeps historyToProviderMessages free of attachment payloads', () => {
    const stored = toSessionAttachment({
      name: 'bug.ts',
      kind: 'text',
      text: 'secret payload',
    });
    const history: ChatMessage[] = [
      {
        id: '1',
        role: 'user',
        createdAt: 1,
        parts: [{ type: 'text', text: 'fix this' }, toFileRefPart(stored)],
      },
    ];
    const messages = historyToProviderMessages('sys', history);
    expect(messages).toHaveLength(2);
    expect(messages[1]?.content).toContain('bug.ts');
    expect(messages[1]?.content).not.toContain('secret payload');
  });

  it('reads browser files into prompt attachments', async () => {
    const textFile = new File(['hello world'], 'note.txt', { type: 'text/plain' });
    const ok = await readPromptAttachmentFromFile(textFile);
    expect(ok.ok).toBe(true);
    if (ok.ok) expect(ok.attachment.text).toBe('hello world');

    const image = new File([new Uint8Array([1, 2, 3])], 'New Scene.jpg', { type: 'image/jpeg' });
    const img = await readPromptAttachmentFromFile(image);
    expect(img.ok).toBe(true);
    if (img.ok) {
      expect(img.attachment.kind).toBe('image');
      expect(img.attachment.dataUrl?.startsWith('data:image/jpeg')).toBe(true);
    }
  });

  it('accepts svg and ico as visual attachments', async () => {
    const svgSource = '<svg xmlns="http://www.w3.org/2000/svg"><circle r="4"/></svg>';
    const svg = new File([svgSource], 'logo.svg', { type: 'image/svg+xml' });
    const svgResult = await readPromptAttachmentFromFile(svg);
    expect(svgResult.ok).toBe(true);
    if (svgResult.ok) {
      expect(svgResult.attachment.kind).toBe('image');
      expect(svgResult.attachment.mime).toBe('image/svg+xml');
      expect(svgResult.attachment.text).toContain('<svg');
      expect(svgResult.attachment.dataUrl?.startsWith('data:image/svg+xml')).toBe(true);
    }

    const storedSvg = toSessionAttachment(svgResult.ok ? svgResult.attachment : { name: 'x' });
    const readSvg = readImageAttachment(storedSvg);
    expect(readSvg.ok).toBe(true);
    if (readSvg.ok) {
      expect(readSvg.output.content).toContain('<circle');
      expect(readSvg.output[IMAGE_PRESENT_KEY]).toBeUndefined();
    }

    const ico = new File([new Uint8Array([0, 0, 1, 0])], 'app.ico', { type: 'image/x-icon' });
    const icoResult = await readPromptAttachmentFromFile(ico);
    expect(icoResult.ok).toBe(true);
    if (icoResult.ok) {
      expect(icoResult.attachment.kind).toBe('image');
      expect(icoResult.attachment.mime).toBe('image/x-icon');
      expect(icoResult.attachment.dataUrl?.startsWith('data:image/x-icon')).toBe(true);
    }
  });
});
