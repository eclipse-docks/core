import type { Contribution } from '@eclipse-docks/core';
import type { languages } from 'monaco-editor';

/** Contribution target collected by `docks-monaco-widget` before creating models. */
export const MONACO_GRAMMARS = 'monaco.grammars';

/**
 * Register a Monarch grammar for the Monaco instance owned by `docks-monaco-widget`.
 * Extensions must contribute here instead of importing `monaco-editor` directly —
 * a separate import would register against a different Monaco module instance.
 */
export interface MonacoGrammarContribution extends Contribution {
  /** Monaco language id (e.g. `lisp`). */
  name: string;
  label: string;
  extensions?: string[];
  aliases?: string[];
  mimetypes?: string[];
  conf?: languages.LanguageConfiguration;
  language: languages.IMonarchLanguage;
}
