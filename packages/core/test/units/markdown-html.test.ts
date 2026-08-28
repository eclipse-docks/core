// @vitest-environment jsdom

import { describe, expect, it } from 'vitest';
import { parseMarkdownHtml, sanitizeHtml } from '../../src/core/markdown-html';

describe('markdown-html', () => {
    it('preserves safe markdown output', () => {
        const html = parseMarkdownHtml('# Title\n\n**bold** and [link](https://example.com)');
        expect(html).toContain('<h1');
        expect(html).toContain('<strong>bold</strong>');
        expect(html).toContain('href="https://example.com"');
    });

    it('strips script tags and event handlers from raw HTML', () => {
        const html = parseMarkdownHtml('<img src=x onerror=alert(1)><svg onload=alert(1)></svg>');
        expect(html).not.toMatch(/onerror/i);
        expect(html).not.toMatch(/onload/i);
        expect(html).not.toContain('<script');
    });

    it('blocks javascript: URLs in links', () => {
        const html = parseMarkdownHtml('[click me](javascript:alert(1))');
        expect(html).not.toContain('javascript:');
    });

    it('sanitizes pre-rendered HTML', () => {
        expect(sanitizeHtml('<a href="javascript:alert(1)">x</a>')).not.toContain('javascript:');
    });
});
