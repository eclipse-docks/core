import { beforeEach, describe, expect, it } from 'vitest';
import {
  clearToasts,
  enterToastQuiet,
  listToasts,
  toastCounts,
  toastError,
  toastInfo,
} from '../../src/core/toast';

describe('toast quiet mode', () => {
  beforeEach(() => {
    clearToasts();
  });

  it('records a popup toast as emitted and a quiet toast as pending', () => {
    toastInfo('saved');
    const leave = enterToastQuiet();
    toastError('missing');
    toastInfo('again');
    leave();
    toastInfo('after');

    expect(toastCounts()).toEqual({ pending: 2, emitted: 2 });
    expect(listToasts().map((entry) => [entry.message, entry.state])).toEqual([
      ['after', 'emitted'],
      ['again', 'pending'],
      ['missing', 'pending'],
      ['saved', 'emitted'],
    ]);
  });

  it('stays quiet until the last nested hold ends', () => {
    const outer = enterToastQuiet();
    const inner = enterToastQuiet();
    inner();
    toastError('still held');
    expect(toastCounts().pending).toBe(1);
    outer();
    toastInfo('shown');
    expect(toastCounts()).toEqual({ pending: 1, emitted: 1 });
  });

  it('clear removes the log', () => {
    toastInfo('one');
    clearToasts();
    expect(listToasts()).toEqual([]);
    expect(toastCounts()).toEqual({ pending: 0, emitted: 0 });
  });
});
