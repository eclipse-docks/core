/** True when an AbortSignal has already been aborted. */
export function isAborted(signal?: AbortSignal | null): boolean {
  return Boolean(signal?.aborted);
}

/** True for DOMException / Error abort failures from fetch and friends. */
export function isAbortError(err: unknown): boolean {
  if (!err || typeof err !== 'object') return false;
  const name = (err as { name?: string }).name;
  return name === 'AbortError';
}
