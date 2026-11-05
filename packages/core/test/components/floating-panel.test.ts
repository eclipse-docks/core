// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest';

const dialogSettings = new Map<string, unknown>();

vi.mock('../../src/core/settingsservice', () => ({
    appSettings: {
        getDialogSetting: vi.fn(async (key: string) => dialogSettings.get(key)),
        setDialogSetting: vi.fn(async (key: string, value: unknown) => {
            dialogSettings.set(key, value);
        }),
    },
}));

import '../../src/widgets/floating-panel';
import type { DocksFloatingPanel } from '../../src/widgets/floating-panel';

function frameOf(panel: DocksFloatingPanel): HTMLElement {
    const frame = panel.shadowRoot?.querySelector('.panel');
    if (!(frame instanceof HTMLElement)) {
        throw new Error('missing frame');
    }
    return frame;
}

function headerOf(panel: DocksFloatingPanel): HTMLElement {
    const header = panel.shadowRoot?.querySelector('.panel-header');
    if (!(header instanceof HTMLElement)) {
        throw new Error('missing header');
    }
    return header;
}

function button(panel: DocksFloatingPanel, title: string): HTMLElement {
    const element = panel.shadowRoot?.querySelector(`wa-button[title="${title}"]`);
    if (!(element instanceof HTMLElement)) {
        throw new Error(`missing ${title} button`);
    }
    return element;
}

function stubFrame(panel: DocksFloatingPanel, width = 400, height = 300): HTMLElement {
    const frame = frameOf(panel);
    Object.defineProperty(frame, 'offsetWidth', { configurable: true, value: width });
    Object.defineProperty(frame, 'offsetHeight', { configurable: true, value: height });
    frame.getBoundingClientRect = () => {
        const left = Number.parseFloat(frame.style.left) || 0;
        const top = Number.parseFloat(frame.style.top) || 0;
        return new DOMRect(left, top, width, height);
    };
    return frame;
}

async function mount(label = 'HowTo Workflows'): Promise<DocksFloatingPanel> {
    const panel = document.createElement('docks-floating-panel') as DocksFloatingPanel;
    panel.label = label;
    panel.innerHTML = '<p class="caller-body">Body</p>';
    document.body.append(panel);
    await panel.updateComplete;
    stubFrame(panel);
    return panel;
}

function pointer(type: string, x: number, y: number): MouseEvent {
    return new MouseEvent(type, { bubbles: true, button: 0, clientX: x, clientY: y });
}

describe('docks-floating-panel', () => {
    beforeEach(() => {
        while (document.body.firstChild) {
            document.body.firstChild.remove();
        }
        dialogSettings.clear();
        Object.defineProperty(window, 'innerWidth', { configurable: true, value: 800 });
        Object.defineProperty(window, 'innerHeight', { configurable: true, value: 600 });
    });

    it('moves a preview while dragging and commits it on mouseup', async () => {
        const panel = await mount();
        const frame = frameOf(panel);
        expect(frame.style.left).toBe('100px');

        headerOf(panel).dispatchEvent(pointer('mousedown', 150, 140));
        document.dispatchEvent(pointer('mousemove', 300, 240));
        await panel.updateComplete;

        const preview = panel.shadowRoot?.querySelector('.drag-preview');
        expect(preview).toBeInstanceOf(HTMLElement);
        expect((preview as HTMLElement).style.left).toBe('250px');
        expect((preview as HTMLElement).style.top).toBe('200px');
        expect(frame.classList.contains('dragging')).toBe(true);
        expect(frame.style.left).toBe('100px');

        document.dispatchEvent(pointer('mouseup', 300, 240));
        await panel.updateComplete;

        expect(panel.shadowRoot?.querySelector('.drag-preview')).toBeNull();
        expect(frame.style.left).toBe('250px');
        expect(frame.style.top).toBe('200px');
        expect(dialogSettings.size).toBe(0);
    });

    it('does not start a drag from minimize or close', async () => {
        const panel = await mount();

        button(panel, 'Minimize').dispatchEvent(pointer('mousedown', 700, 110));
        document.dispatchEvent(pointer('mousemove', 20, 20));
        await panel.updateComplete;
        expect(panel.shadowRoot?.querySelector('.drag-preview')).toBeNull();

        button(panel, 'Close').dispatchEvent(pointer('mousedown', 740, 110));
        document.dispatchEvent(pointer('mousemove', 10, 10));
        await panel.updateComplete;
        expect(panel.shadowRoot?.querySelector('.drag-preview')).toBeNull();

        button(panel, 'Minimize').click();
        await panel.updateComplete;
        expect(panel.minimized).toBe(true);
        expect(panel.shadowRoot?.querySelector('.panel-body')?.hasAttribute('hidden')).toBe(true);
        expect(panel.querySelector('.caller-body')).not.toBeNull();
    });

    it('clamps a position past the viewport edge', async () => {
        const panel = await mount();
        panel.place(5000, -40);
        await panel.updateComplete;

        const frame = frameOf(panel);
        expect(frame.style.left).toBe('400px');
        expect(frame.style.top).toBe('0px');

        headerOf(panel).dispatchEvent(pointer('mousedown', 420, 20));
        document.dispatchEvent(pointer('mousemove', 5000, 5000));
        await panel.updateComplete;
        const preview = panel.shadowRoot?.querySelector('.drag-preview') as HTMLElement;
        expect(preview.style.left).toBe('400px');
        expect(preview.style.top).toBe('300px');

        document.dispatchEvent(pointer('mouseup', 5000, 5000));
        await panel.updateComplete;
        expect(frame.style.left).toBe('400px');
        expect(frame.style.top).toBe('300px');
    });

    it('keeps two panels with the same label as two elements', async () => {
        const first = await mount('Shared');
        const second = await mount('Shared');

        expect(first).not.toBe(second);
        expect(document.querySelectorAll('docks-floating-panel')).toHaveLength(2);
        expect(first.shadowRoot?.querySelector('.header-title')?.textContent).toBe('Shared');
        expect(second.shadowRoot?.querySelector('.header-title')?.textContent).toBe('Shared');

        headerOf(first).dispatchEvent(pointer('mousedown', 110, 110));
        expect(document.body.lastElementChild).toBe(first);

        document.dispatchEvent(pointer('mousemove', 160, 150));
        document.dispatchEvent(pointer('mouseup', 160, 150));
        await first.updateComplete;
        expect(frameOf(first).style.left).toBe('150px');
        expect(frameOf(first).style.top).toBe('140px');
    });

    it('dispatches floating-close and leaves the element connected', async () => {
        const panel = await mount();
        const received: Event[] = [];
        document.body.addEventListener('floating-close', (event) => received.push(event));

        button(panel, 'Close').click();

        expect(received).toHaveLength(1);
        expect(received[0].bubbles).toBe(true);
        expect(received[0].type).toBe('floating-close');
        expect(panel.isConnected).toBe(true);
        expect(document.body.contains(panel)).toBe(true);
    });

    it('restores a committed position from dialog settings', async () => {
        dialogSettings.set('howto-panel', { visible: true, position: { x: 12, y: 18 } });
        const panel = document.createElement('docks-floating-panel') as DocksFloatingPanel;
        panel.persistKey = 'howto-panel';
        document.body.append(panel);
        await panel.updateComplete;
        await new Promise((resolve) => setTimeout(resolve, 0));
        await panel.updateComplete;
        stubFrame(panel);

        headerOf(panel).dispatchEvent(pointer('mousedown', 40, 30));
        document.dispatchEvent(pointer('mousemove', 180, 90));
        document.dispatchEvent(pointer('mouseup', 180, 90));
        await panel.updateComplete;
        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(dialogSettings.get('howto-panel')).toEqual({
            visible: true,
            position: { x: 152, y: 78 },
        });

        panel.remove();
        const restored = document.createElement('docks-floating-panel') as DocksFloatingPanel;
        restored.persistKey = 'howto-panel';
        document.body.append(restored);
        await restored.updateComplete;
        await new Promise((resolve) => setTimeout(resolve, 0));
        await restored.updateComplete;

        const frame = frameOf(restored);
        expect(frame.style.left).toBe('152px');
        expect(frame.style.top).toBe('78px');
    });

    it('resizes from the edges and restores the size', async () => {
        dialogSettings.set('howto-panel', { visible: true, position: { x: 100, y: 100 } });
        const panel = document.createElement('docks-floating-panel') as DocksFloatingPanel;
        panel.persistKey = 'howto-panel';
        document.body.append(panel);
        await panel.updateComplete;
        await new Promise((resolve) => setTimeout(resolve, 0));
        await panel.updateComplete;
        stubFrame(panel);

        const southeast = panel.shadowRoot?.querySelector('.resize-handle.se');
        if (!(southeast instanceof HTMLElement)) throw new Error('missing resize handle');
        southeast.dispatchEvent(pointer('mousedown', 500, 400));
        document.dispatchEvent(pointer('mousemove', 580, 450));
        await panel.updateComplete;

        const frame = frameOf(panel);
        expect(frame.style.width).toBe('480px');
        expect(frame.style.height).toBe('350px');
        expect(panel.shadowRoot?.querySelector('.drag-preview')).toBeNull();

        document.dispatchEvent(pointer('mouseup', 580, 450));
        await panel.updateComplete;
        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(dialogSettings.get('howto-panel')).toEqual({
            visible: true,
            position: { x: 100, y: 100 },
            size: { width: 480, height: 350 },
        });

        const west = panel.shadowRoot?.querySelector('.resize-handle.w');
        if (!(west instanceof HTMLElement)) throw new Error('missing west handle');
        west.dispatchEvent(pointer('mousedown', 100, 200));
        document.dispatchEvent(pointer('mousemove', 40, 200));
        document.dispatchEvent(pointer('mouseup', 40, 200));
        await panel.updateComplete;

        expect(frame.style.left).toBe('40px');
        expect(frame.style.width).toBe('540px');

        panel.minimized = true;
        await panel.updateComplete;
        expect(panel.shadowRoot?.querySelector('.resize-handle')).toBeNull();
        expect(frame.style.height).toBe('');
    });

    it('removes document listeners when disconnected', async () => {
        const add = vi.spyOn(document, 'addEventListener');
        const remove = vi.spyOn(document, 'removeEventListener');
        const panel = await mount();

        const move = add.mock.calls.filter((call) => call[0] === 'mousemove').map((call) => call[1]);
        const up = add.mock.calls.filter((call) => call[0] === 'mouseup').map((call) => call[1]);
        expect(move).toHaveLength(1);
        expect(up).toHaveLength(1);

        panel.remove();

        expect(remove).toHaveBeenCalledWith('mousemove', move[0]);
        expect(remove).toHaveBeenCalledWith('mouseup', up[0]);
        add.mockRestore();
        remove.mockRestore();
    });
});
