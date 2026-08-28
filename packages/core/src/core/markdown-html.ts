import DOMPurify from 'dompurify';
import { marked, type MarkedOptions } from 'marked';

export function sanitizeHtml(html: string): string {
    return DOMPurify.sanitize(html);
}

export function parseMarkdownHtml(markdown: string, options?: MarkedOptions): string {
    const html = marked.parse(markdown, { async: false, ...options }) as string;
    return sanitizeHtml(html);
}
