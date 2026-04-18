import type { Locator, Page } from '@playwright/test';

/**
 * Helpers for `story-*.spec.ts`: coverage E2E by default; with `E2E_STORY=1`, pair with `test.use({ video: 'on' })` in the spec for clips.
 * Pacing applies only when `E2E_STORY=1`; otherwise `storyboardPaceMs` / `storyPaceExtraMs` are 0.
 *
 * Recording pace: `STORYBOARD_PACE_MS=0` for a quick clip; set a number to change ms between beats.
 *
 * Optional **captions** on `beat` / `dwell`: when `E2E_STORY=1`, a centered overlay explains the next step, stays for the same delay, then closes.
 */

const STORY_CAPTION_LAYER_ID = '__docks_e2e_story_caption__';

/** Minimum time a caption stays visible when pace would otherwise be 0. */
export const STORY_CAPTION_MIN_MS = 900;

const STORY_CLICK_LAYER_ID = '__docks_e2e_click_layer__';

/**
 * When `E2E_STORY=1`, register page init script that draws brief rings at click coordinates:
 * cyan per primary-button press, amber for double-clicks. Uses **mousedown** / **dblclick** on `window`
 * (capture) so rings show for Playwright/CDP input even when `click` does not bubble past web components.
 * No-op when not in story mode.
 */
export async function installStoryClickVisualization(page: Page): Promise<void> {
    if (process.env.E2E_STORY !== '1') {
        return;
    }
    type InitArg = { layerId: string };

    await page.addInitScript(({ layerId }: InitArg) => {
        const w = window as unknown as { __docksE2eClickViz?: boolean };
        if (w.__docksE2eClickViz) {
            return;
        }
        w.__docksE2eClickViz = true;

        const styleId = '__docks_e2e_click_viz_style__';
        if (!document.getElementById(styleId)) {
            const s = document.createElement('style');
            s.id = styleId;
            s.textContent = `
@keyframes docksE2eClickRing {
  0% { transform: scale(0.4); opacity: 1; }
  100% { transform: scale(2.25); opacity: 0; }
}`;
            document.head.appendChild(s);
        }

        function getLayer(): HTMLElement {
            let el = document.getElementById(layerId) as HTMLElement | null;
            if (!el) {
                el = document.createElement('div');
                el.id = layerId;
                el.setAttribute('aria-hidden', 'true');
                el.style.cssText =
                    'position:fixed;inset:0;pointer-events:none;z-index:2147483644;overflow:hidden;';
                document.documentElement.appendChild(el);
            }
            return el;
        }

        function showRipple(x: number, y: number, kind: 'single' | 'double'): void {
            if (!Number.isFinite(x) || !Number.isFinite(y)) {
                return;
            }
            const host = getLayer();
            const isDouble = kind === 'double';
            const size = isDouble ? 36 : 26;
            const ring = document.createElement('div');
            ring.style.cssText = [
                'position:absolute',
                `left:${x - size / 2}px`,
                `top:${y - size / 2}px`,
                `width:${size}px`,
                `height:${size}px`,
                'border-radius:50%',
                'box-sizing:border-box',
                isDouble
                    ? 'border:3px solid rgba(251,191,36,0.95)'
                    : 'border:2.5px solid rgba(56,189,248,0.92)',
                'box-shadow:0 0 0 1px rgba(255,255,255,0.18)',
                'animation:docksE2eClickRing 0.55s ease-out forwards',
                'pointer-events:none',
            ].join(';');
            host.appendChild(ring);
            window.setTimeout(() => ring.remove(), 600);
        }

        let lastMdAt = 0;
        let lastMdX = 0;
        let lastMdY = 0;

        /** CDP/Playwright drive Chromium with mouse events; `click` may not reach `window` after stopPropagation in shadow/UI. */
        window.addEventListener(
            'mousedown',
            (e: MouseEvent) => {
                if (e.button !== 0) {
                    return;
                }
                const x = e.clientX;
                const y = e.clientY;
                lastMdAt = e.timeStamp;
                lastMdX = x;
                lastMdY = y;
                const d = e.detail;
                if (d === 2) {
                    showRipple(x, y, 'double');
                    return;
                }
                showRipple(x, y, 'single');
            },
            true,
        );

        window.addEventListener(
            'dblclick',
            (e: MouseEvent) => {
                const x = e.clientX;
                const y = e.clientY;
                if (!Number.isFinite(x) || !Number.isFinite(y)) {
                    return;
                }
                if (e.timeStamp - lastMdAt < 80 && Math.abs(x - lastMdX) < 3 && Math.abs(y - lastMdY) < 3) {
                    return;
                }
                showRipple(x, y, 'double');
            },
            true,
        );

        /** Keyboard activation (e.g. Space) can produce `click` without a meaningful `mousedown` position. */
        window.addEventListener(
            'click',
            (e: MouseEvent) => {
                if (e.clientX !== 0 || e.clientY !== 0) {
                    return;
                }
                const t = e.target;
                if (!(t instanceof Element)) {
                    return;
                }
                if (e.timeStamp - lastMdAt < 120) {
                    return;
                }
                const r = t.getBoundingClientRect();
                showRipple(r.left + r.width / 2, r.top + r.height / 2, 'single');
            },
            true,
        );
    }, { layerId: STORY_CLICK_LAYER_ID });
}

export function storyboardPaceMs(): number {
    if (process.env.E2E_STORY !== '1') {
        return 0;
    }
    const raw = process.env.STORYBOARD_PACE_MS;
    if (raw === '0') {
        return 0;
    }
    return raw !== undefined ? Number(raw) : 1500;
}

/** Base story pace plus extra ms; 0 when not `E2E_STORY=1` (avoids `beat(page, storyboardPaceMs() + N)` delays in CI). */
export function storyPaceExtraMs(extra: number): number {
    if (process.env.E2E_STORY !== '1') {
        return 0;
    }
    return storyboardPaceMs() + extra;
}

async function showStoryCaption(page: Page, message: string): Promise<void> {
    await page.evaluate(
        ({ id, text }) => {
            document.getElementById(id)?.remove();
            const backdrop = document.createElement('div');
            backdrop.id = id;
            backdrop.setAttribute('aria-hidden', 'true');
            backdrop.style.cssText = [
                'position:fixed',
                'inset:0',
                'z-index:2147483646',
                'display:flex',
                'align-items:center',
                'justify-content:center',
                'padding:max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(1rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left))',
                'pointer-events:none',
                'background:rgba(15,23,42,0.5)',
                'backdrop-filter:blur(6px)',
                '-webkit-backdrop-filter:blur(6px)',
            ].join(';');

            const card = document.createElement('div');
            card.setAttribute('role', 'dialog');
            card.setAttribute('aria-modal', 'true');
            card.setAttribute('aria-label', 'Next step');
            card.style.cssText = [
                'max-width:min(92vw, 28rem)',
                'padding:1.35rem 1.65rem',
                'border-radius:16px',
                'text-align:center',
                'color:#f8fafc',
                'font-family:system-ui,-apple-system,sans-serif',
                'border:1px solid rgba(255,255,255,0.14)',
                'background:linear-gradient(165deg, rgba(51,65,85,0.97) 0%, rgba(15,23,42,0.98) 55%, rgba(15,23,42,0.99) 100%)',
                'box-shadow:',
                '0 0 0 1px rgba(255,255,255,0.06),',
                '0 4px 6px -1px rgba(0,0,0,0.2),',
                '0 28px 56px -12px rgba(0,0,0,0.55),',
                '0 0 100px -20px rgba(56,189,248,0.35)',
            ].join('');

            const nextLabel = document.createElement('div');
            nextLabel.textContent = 'Next';
            nextLabel.style.cssText = [
                'font-size:0.68rem',
                'font-weight:700',
                'letter-spacing:0.14em',
                'text-transform:uppercase',
                'color:#7dd3fc',
                'margin-bottom:0.65rem',
            ].join(';');

            const line = document.createElement('div');
            line.textContent = text;
            line.style.cssText = [
                'font-size:1.125rem',
                'font-weight:600',
                'line-height:1.45',
                'letter-spacing:-0.01em',
                'text-wrap:balance',
            ].join(';');

            card.appendChild(nextLabel);
            card.appendChild(line);
            backdrop.appendChild(card);
            document.body.appendChild(backdrop);
        },
        { id: STORY_CAPTION_LAYER_ID, text: message },
    );
}

async function hideStoryCaption(page: Page): Promise<void> {
    await page.evaluate((id) => {
        document.getElementById(id)?.remove();
    }, STORY_CAPTION_LAYER_ID);
}

/**
 * Pause between actions. With `caption` and `E2E_STORY=1`, shows a “Next” overlay for the wait duration, then removes it.
 * Pass `ms` explicitly when you need a duration without using the default story pace (e.g. `beat(page, undefined, '…')`).
 */
export async function beat(page: Page, ms?: number, caption?: string): Promise<void> {
    const t = ms ?? storyboardPaceMs();
    if (caption && process.env.E2E_STORY === '1') {
        const waitMs = Math.max(t, STORY_CAPTION_MIN_MS);
        await showStoryCaption(page, caption);
        try {
            await page.waitForTimeout(waitMs);
        } finally {
            await hideStoryCaption(page);
        }
        return;
    }
    if (t > 0) {
        await page.waitForTimeout(t);
    }
}

/**
 * Longer hold for panels/menus. With `caption` and `E2E_STORY=1`, shows the overlay for the dwell duration, then removes it.
 */
export async function dwell(page: Page, ms?: number, caption?: string): Promise<void> {
    if (caption && process.env.E2E_STORY === '1') {
        let t: number;
        if (ms !== undefined) {
            t = ms;
        } else {
            t = storyboardPaceMs() === 0 ? STORY_CAPTION_MIN_MS : Math.max(storyboardPaceMs() * 1.6, 2200);
        }
        const waitMs = Math.max(t, STORY_CAPTION_MIN_MS);
        await showStoryCaption(page, caption);
        try {
            await page.waitForTimeout(waitMs);
        } finally {
            await hideStoryCaption(page);
        }
        return;
    }
    if (ms === undefined && storyboardPaceMs() === 0) {
        return;
    }
    const t = ms ?? Math.max(storyboardPaceMs() * 1.6, 2200);
    if (t > 0) {
        await page.waitForTimeout(t);
    }
}

export async function dismissOpenPromptDialogs(page: Page): Promise<void> {
    for (let i = 0; i < 6; i++) {
        const open = page.locator('wa-dialog[open]');
        if ((await open.count()) === 0) {
            return;
        }
        const cancel = open.locator('.dialog-service-footer wa-button').filter({ hasText: 'Cancel' });
        if (await cancel.first().isVisible()) {
            await cancel.first().click();
        } else {
            await page.keyboard.press('Escape');
        }
    }
}

/** Create-menu entry once the dropdown is open (role matches Web Awesome wa-dropdown-item). */
export function jupyterNotebookCreateMenuItem(fileBrowser: Locator): Locator {
    return fileBrowser.getByRole('menuitem', { name: 'Jupyter Notebook' });
}
