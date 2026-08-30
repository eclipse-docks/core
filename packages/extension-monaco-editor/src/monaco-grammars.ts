import {
  contributionRegistry,
  subscribe,
  TOPIC_CONTRIBUTEIONS_CHANGED,
  type ContributionChangeEvent,
} from '@eclipse-docks/core';
import * as monaco from 'monaco-editor';

import {
  MONACO_GRAMMARS,
  type MonacoGrammarContribution,
} from './monaco-grammar-api';

const appliedGrammarIds = new Set<string>();

/**
 * Apply contributed Monarch grammars to this package's Monaco module.
 * Safe to call repeatedly; each language id is registered at most once.
 */
export function ensureContributedGrammars(): void {
  const contributions =
    contributionRegistry.getContributions<MonacoGrammarContribution>(MONACO_GRAMMARS);

  for (const contribution of contributions) {
    const id = contribution.name;
    if (!id || appliedGrammarIds.has(id)) continue;

    const alreadyKnown = monaco.languages.getLanguages().some((lang) => lang.id === id);
    if (!alreadyKnown) {
      monaco.languages.register({
        id,
        extensions: contribution.extensions,
        aliases: contribution.aliases,
        mimetypes: contribution.mimetypes,
      });
    }

    if (contribution.conf) {
      monaco.languages.setLanguageConfiguration(id, contribution.conf);
    }
    monaco.languages.setMonarchTokensProvider(id, contribution.language);
    appliedGrammarIds.add(id);
  }
}

let listening = false;

export function watchContributedGrammars(): void {
  if (listening) return;
  listening = true;
  subscribe(TOPIC_CONTRIBUTEIONS_CHANGED, (event: ContributionChangeEvent) => {
    if (event.target !== MONACO_GRAMMARS) return;
    ensureContributedGrammars();
  });
}
