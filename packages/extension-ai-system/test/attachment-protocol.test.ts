import { describe, expect, it } from 'vitest';
import {
  formatAttachmentRefForModel,
  toFileRefPart,
  toSessionAttachment,
  userContentFromParts,
} from '../src/runtime/attachments/attachments';
import {
  attachmentUri,
  attachmentWorkspacePath,
  toWorkspaceToolPath,
} from '../src/runtime/attachments/attachment-paths';

describe('in-memory session attachment paths', () => {
  it('maps in-memory:// URIs to workspace paths', () => {
    expect(toWorkspaceToolPath('in-memory://sess-1/shot.png')).toBe('in-memory/sess-1/shot.png');
    expect(toWorkspaceToolPath('in-memory/sess-1/shot.png')).toBe('in-memory/sess-1/shot.png');
    expect(toWorkspaceToolPath('in-memory://')).toBe('in-memory');
    expect(attachmentWorkspacePath('sess-1', { id: 'att-1', name: 'New Scene.jpg' })).toBe(
      'in-memory/sess-1/att-1-New Scene.jpg',
    );
    expect(attachmentUri('sess-1', { id: 'att-1', name: 'New Scene.jpg' })).toBe(
      'in-memory://sess-1/att-1-New Scene.jpg',
    );
  });

  it('publishes workspace_read hints with in-memory paths', () => {
    const stored = toSessionAttachment({
      name: 'dash.png',
      kind: 'image',
      dataUrl: 'data:image/png;base64,aa',
    });
    const withPath = { ...stored, path: attachmentUri('sess-9', stored) };
    const ref = toFileRefPart(withPath);
    expect(ref.path?.startsWith('in-memory://')).toBe(true);
    const line = formatAttachmentRefForModel(ref);
    expect(line).toContain('workspace_read');
    expect(line).toContain(ref.path!);

    const content = userContentFromParts([{ type: 'text', text: 'replicate' }, ref]);
    expect(content as string).toContain('in-memory');
    expect(content as string).toContain('workspace_list');
  });
});
