import { describe, expect, it } from 'vitest';
import { contentWithPackagesLine, PACKAGES_COMMENT_PREFIX, parsePackagesFromContent } from '../src/editor-python-run';

describe('parsePackagesFromContent', () => {
  it('reads a comma-separated list from the first line only', () => {
    expect(parsePackagesFromContent('# @py-packages: numpy, pandas, scipy\nprint(1)\n')).toEqual([
      'numpy',
      'pandas',
      'scipy',
    ]);
  });

  it('trims names and drops empty entries', () => {
    expect(parsePackagesFromContent('# @py-packages:  numpy , ,pandas  \n')).toEqual(['numpy', 'pandas']);
  });

  it('accepts a missing space and any capitalization', () => {
    expect(parsePackagesFromContent('#@py-packages: numpy\n')).toEqual(['numpy']);
    expect(parsePackagesFromContent('#  @PY-PACKAGES: Numpy\n')).toEqual(['Numpy']);
  });

  it('returns an empty list when the directive has no names', () => {
    expect(parsePackagesFromContent('# @py-packages:\nprint(1)\n')).toEqual([]);
    expect(parsePackagesFromContent('# @py-packages:   \n')).toEqual([]);
  });

  it('ignores the directive unless it is the first line', () => {
    expect(parsePackagesFromContent('print(1)\n# @py-packages: numpy\n')).toEqual([]);
    expect(parsePackagesFromContent('')).toEqual([]);
    expect(parsePackagesFromContent('# not a directive: numpy\n')).toEqual([]);
  });

  it('keeps duplicate names', () => {
    expect(parsePackagesFromContent('# @py-packages: numpy, numpy\n')).toEqual(['numpy', 'numpy']);
  });
});

describe('contentWithPackagesLine', () => {
  it('inserts the directive as the first line', () => {
    expect(contentWithPackagesLine('print(1)\n', ['numpy', 'pandas'])).toBe(
      `${PACKAGES_COMMENT_PREFIX} numpy, pandas\nprint(1)\n`,
    );
  });

  it('replaces an existing directive and leaves the rest of the file', () => {
    const content = '# @py-packages: old\nprint(1)\n# @py-packages: ignored\n';
    expect(contentWithPackagesLine(content, ['numpy'])).toBe(
      '# @py-packages: numpy\nprint(1)\n# @py-packages: ignored\n',
    );
  });

  it('removes the directive when no packages remain', () => {
    expect(contentWithPackagesLine('# @py-packages: numpy\nprint(1)\n', [])).toBe('print(1)\n');
  });

  it('leaves content unchanged when there is nothing to remove', () => {
    expect(contentWithPackagesLine('print(1)\n', [])).toBe('print(1)\n');
  });

  it('keeps a trailing newline when the file was empty', () => {
    expect(contentWithPackagesLine('', ['numpy'])).toBe('# @py-packages: numpy\n');
  });

  it('round-trips through the parser', () => {
    const next = contentWithPackagesLine('x = 1\n', ['a', 'b']);
    expect(parsePackagesFromContent(next)).toEqual(['a', 'b']);
    expect(parsePackagesFromContent(contentWithPackagesLine(next, []))).toEqual([]);
  });
});
