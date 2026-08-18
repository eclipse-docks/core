import { describe, expect, it } from 'vitest';
import { html } from 'lit';
import { contributionRegistry, type HTMLContribution } from '../../src/core/contributionregistry';
import { ABOUT_TABS, SYSTEM_ATTRIBUTIONS } from '../../src/core/contribution-targets';
import { ABOUT_TAB_ATTRIBUTIONS, ABOUT_TAB_PACKAGES, ABOUT_TAB_RELEASE, ATTRIBUTION_ECLIPSE_DOCKS } from '../../src/core/contribution-names';
import '../../src/contributions/default-ui-contributions';

describe('about tabs', () => {
  it('registers default TabContributions on ABOUT_TABS', () => {
    const names = contributionRegistry.getContributions(ABOUT_TABS).map((tab) => tab.name);
    expect(names).toEqual([ABOUT_TAB_ATTRIBUTIONS, ABOUT_TAB_RELEASE, ABOUT_TAB_PACKAGES]);
  });

  it('registers a default Eclipse Docks attribution', () => {
    const names = contributionRegistry
      .getContributions<HTMLContribution>(SYSTEM_ATTRIBUTIONS)
      .map((contribution) => contribution.name);
    expect(names).toContain(ATTRIBUTION_ECLIPSE_DOCKS);
  });

  it('collects HTMLContributions on SYSTEM_ATTRIBUTIONS', () => {
    const name = `attribution.test-${Math.random()}`;
    contributionRegistry.registerContribution<HTMLContribution>(SYSTEM_ATTRIBUTIONS, {
      name,
      label: 'Test Lib',
      component: () => html`<p>Test notice</p>`,
    });

    const labels = contributionRegistry
      .getContributions<HTMLContribution>(SYSTEM_ATTRIBUTIONS)
      .map((contribution) => contribution.name);
    expect(labels).toContain(name);
  });
});
