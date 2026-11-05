// @vitest-environment jsdom
import { html } from 'lit';
import { afterEach, describe, expect, it } from 'vitest';
import { customElement } from 'lit/decorators.js';
import { DocksPart } from '../../src/parts/part';
import { contributionRegistry } from '../../src/core/contributionregistry';
import {
    FLOATING_PANEL_CONTRIBUTION_TARGET,
    floatingPanelService,
    type FloatingPanelContribution,
} from '../../src/core/floatingpanelservice';

@customElement('docks-float-part-test')
class FloatPart extends DocksPart {}

function close(panel: HTMLElement): void {
    panel.dispatchEvent(new CustomEvent('floating-close', { bubbles: true }));
}

describe('floatingPanelService', () => {
    afterEach(() => {
        contributionRegistry.unregisterContribution(FLOATING_PANEL_CONTRIBUTION_TARGET, 'test.floating.registered');
        contributionRegistry.unregisterContribution(FLOATING_PANEL_CONTRIBUTION_TARGET, 'test.floating.invalid');
        while (document.body.firstChild) {
            document.body.firstChild.remove();
        }
    });

    it('opens a contribution and removes the panel on close', () => {
        const contribution: FloatingPanelContribution = {
            id: 'sample',
            label: 'Sample',
            persistKey: 'sample-panel',
            component: (state?: { close?: () => void }) => html`<p class="body">${String(typeof state?.close)}</p>`,
        };

        const panel = floatingPanelService.open(contribution, { note: 'keep' });

        expect(panel.label).toBe('Sample');
        expect(panel.persistKey).toBe('sample-panel');
        expect(panel.isConnected).toBe(true);
        expect(panel.querySelector('.body')?.textContent).toBe('function');
        expect(document.body.contains(panel)).toBe(true);

        close(panel);

        expect(panel.isConnected).toBe(false);
        expect(panel.querySelector('.body')).toBeNull();
    });

    it('opens a registered contribution by id and ignores invalid ones', async () => {
        contributionRegistry.registerContribution(FLOATING_PANEL_CONTRIBUTION_TARGET, {
            id: 'registered',
            name: 'test.floating.registered',
            label: 'Registered',
            component: () => html`<span class="reg">ok</span>`,
        });
        contributionRegistry.registerContribution(FLOATING_PANEL_CONTRIBUTION_TARGET, {
            name: 'test.floating.invalid',
            label: 'Invalid',
        } as FloatingPanelContribution);

        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(floatingPanelService.hasPanel('registered')).toBe(true);
        expect(floatingPanelService.getPanelIds()).toContain('registered');
        expect(floatingPanelService.hasPanel('test.floating.invalid')).toBe(false);

        const panel = floatingPanelService.open('registered');
        expect(panel.querySelector('.reg')?.textContent).toBe('ok');
        close(panel);

        expect(() => floatingPanelService.open('missing')).toThrow('Floating panel "missing" not found');
    });

    it('moves a part into a panel and restores its original parent on close', async () => {
        const host = document.createElement('div');
        const before = document.createElement('span');
        const part = new FloatPart();
        part.id = 'files';
        part.tabContribution = { name: 'files', label: 'Files', icon: 'folder' };
        part.style.width = '200px';
        const after = document.createElement('span');
        host.append(before, part, after);
        document.body.append(host);

        const panel = floatingPanelService.toPanel(part);

        expect(panel.label).toBe('Files');
        expect(panel.icon).toBe('folder');
        expect(part.parentElement).toBe(panel);
        expect(host.contains(part)).toBe(false);
        expect(part.style.width).toBe('100%');
        expect(part.style.height).toBe('100%');
        await panel.updateComplete;
        const frame = panel.shadowRoot?.querySelector('.panel') as HTMLElement;
        expect(frame.style.width).toBe('240px');
        expect(frame.style.height).toBe('360px');
        expect(floatingPanelService.toPanel(part)).toBe(panel);

        close(panel);

        expect(panel.isConnected).toBe(false);
        expect(part.parentElement).toBe(host);
        expect(part.previousElementSibling).toBe(before);
        expect(part.nextElementSibling).toBe(after);
        expect(part.style.width).toBe('200px');
        expect(part.style.height).toBe('');
    });

    it('reopens a part at the position and size it had when docked back', async () => {
        Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1200 });
        Object.defineProperty(window, 'innerHeight', { configurable: true, value: 800 });
        const part = new FloatPart();
        part.tabContribution = { name: 'notes', label: 'Notes' };
        document.body.append(part);

        const first = floatingPanelService.toPanel(part);
        first.place(180, 220);
        first.size(520, 410);
        close(first);

        const again = floatingPanelService.toPanel(part);
        await again.updateComplete;
        const frame = again.shadowRoot?.querySelector('.panel') as HTMLElement;
        expect(frame.style.left).toBe('180px');
        expect(frame.style.top).toBe('220px');
        expect(frame.style.width).toBe('520px');
        expect(frame.style.height).toBe('410px');
        close(again);
    });

    it('restores a part that lived in a shadow root', () => {
        const wrapper = document.createElement('div');
        const shadow = wrapper.attachShadow({ mode: 'open' });
        const part = new FloatPart();
        shadow.append(part);
        document.body.append(wrapper);

        const panel = floatingPanelService.toPanel(part);
        expect(part.parentNode).toBe(panel);

        close(panel);

        expect(part.parentNode).toBe(shadow);
        expect(part.isConnected).toBe(true);
    });
});
