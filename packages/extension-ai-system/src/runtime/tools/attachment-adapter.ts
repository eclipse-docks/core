import type { SessionAttachment } from '../types';
import {
  attachmentMeta,
  readImageAttachment,
  readTextAttachment,
} from '../attachments';
import type { ToolBroker } from './broker';

export type AttachmentLookup = (sessionId: string, attachmentId?: string) => SessionAttachment[];

/** Registers read-only session attachment tools. */
export function registerAttachmentTools(broker: ToolBroker, lookup: AttachmentLookup): void {
  broker.register(
    {
      name: 'attachment_list',
      description:
        'List chat-session attachments (id, name, kind, mime, size). Use this for files the user attached in chat — not workspace/canvas files. Payloads are omitted; call attachment_read to inspect one.',
      parameters: {
        type: 'object',
        properties: {},
      },
    },
    async (call, sessionId) => {
      const items = lookup(sessionId).map(attachmentMeta);
      return { id: call.id, name: call.name, ok: true, output: { count: items.length, attachments: items } };
    },
  );

  broker.register(
    {
      name: 'attachment_read',
      description:
        'Inspect a chat-session attachment by id from the user message or attachment_list. Prefer this whenever the user asks about an attached screenshot/file. Text returns content (optional offset/limit). Images are presented for vision inspection.',
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'Attachment id from attachment_list or the user message' },
          offset: { type: 'number', description: 'Text start offset (characters)' },
          limit: { type: 'number', description: 'Max text characters to return' },
        },
        required: ['id'],
      },
    },
    async (call, sessionId) => {
      const id = String(call.arguments.id ?? '').trim();
      if (!id) {
        return { id: call.id, name: call.name, ok: false, output: null, error: 'id is required' };
      }
      const stored = lookup(sessionId, id)[0];
      if (!stored) {
        return { id: call.id, name: call.name, ok: false, output: null, error: `Unknown attachment: ${id}` };
      }
      if (stored.kind === 'image') {
        const result = readImageAttachment(stored, {
          offset: typeof call.arguments.offset === 'number' ? call.arguments.offset : undefined,
          limit: typeof call.arguments.limit === 'number' ? call.arguments.limit : undefined,
        });
        if (!result.ok) {
          return { id: call.id, name: call.name, ok: false, output: null, error: result.error };
        }
        return { id: call.id, name: call.name, ok: true, output: result.output };
      }
      const result = readTextAttachment(stored, {
        offset: typeof call.arguments.offset === 'number' ? call.arguments.offset : undefined,
        limit: typeof call.arguments.limit === 'number' ? call.arguments.limit : undefined,
      });
      if (!result.ok) {
        return { id: call.id, name: call.name, ok: false, output: null, error: result.error };
      }
      return { id: call.id, name: call.name, ok: true, output: result.output };
    },
  );
}
