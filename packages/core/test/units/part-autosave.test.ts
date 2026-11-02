// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { customElement } from 'lit/decorators.js';
import { DocksPart } from '../../src/parts/part';

@customElement('docks-autosave-part-test')
class AutoSavePart extends DocksPart {
    protected autoSave = true;
    protected autoSaveDelay = 200;
    saves = 0;

    override save() {
        this.saves += 1;
        this.markDirty(false);
    }
}

@customElement('docks-manual-save-part-test')
class ManualSavePart extends DocksPart {
    saves = 0;

    override save() {
        this.saves += 1;
        this.markDirty(false);
    }
}

describe('DocksPart auto-save', () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it('saves once after edits go quiet', () => {
        vi.useFakeTimers();
        const part = new AutoSavePart();
        part.markDirty(true);
        vi.advanceTimersByTime(100);
        part.markDirty(true);
        vi.advanceTimersByTime(199);
        expect(part.saves).toBe(0);
        vi.advanceTimersByTime(1);
        expect(part.saves).toBe(1);
        expect(part.isDirty()).toBe(false);
    });

    it('leaves a part alone when autoSave is off', () => {
        vi.useFakeTimers();
        const part = new ManualSavePart();
        part.markDirty(true);
        vi.advanceTimersByTime(5000);
        expect(part.saves).toBe(0);
        expect(part.isDirty()).toBe(true);
    });

    it('saves a dirty part immediately on close', () => {
        vi.useFakeTimers();
        const part = new AutoSavePart();
        part.markDirty(true);
        part.close();
        expect(part.saves).toBe(1);
        vi.advanceTimersByTime(1000);
        expect(part.saves).toBe(1);
    });
});
