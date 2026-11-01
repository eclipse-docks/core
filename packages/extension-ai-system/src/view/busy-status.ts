/** Shown immediately when waiting on a model turn. */
export const INITIAL_BUSY_STATUS = 'Thinking…';

/**
 * Rotating wait copy (Cursor / Copilot style). Picked at random after the initial message.
 * Keep these light and short — they appear in the composer while busy.
 */
export const BUSY_STATUS_MESSAGES: readonly string[] = [
  'Bribing the hamster…',
  'Consulting the rubber duck…',
  'Untangling the spaghetti…',
  'Herding tokens…',
  'Warming up the crystals…',
  'Counting electric sheep…',
  'Negotiating with the compiler…',
  'Teaching frogs to code…',
  'Aligning the bits…',
  'Feeding the GPU snacks…',
  'Looking under the couch…',
  'Summoning a specialist…',
  'Checking the manual twice…',
  'Reticulating splines…',
  'Sharpening pencils…',
  'Pedaling harder…',
  'Buffering brilliance…',
  'Reversing the polarity…',
  'Convincing the bits to cooperate…',
  'Dusting off the playbook…',
  'Whispering to the model…',
  'Calibrating optimism…',
  'Unfolding the roadmap…',
  'Polishing ones and zeros…',
  'Asking politely…',
];

const ROTATE_MS_MIN = 3_000;
const ROTATE_MS_MAX = 12_000;

/** Random delay until the next busy-status line (3–12s). */
export function busyStatusRotateMs(): number {
  return ROTATE_MS_MIN + Math.floor(Math.random() * (ROTATE_MS_MAX - ROTATE_MS_MIN + 1));
}

/** Next status, avoiding an immediate repeat of `current`. */
export function nextBusyStatus(current: string): string {
  const pool = BUSY_STATUS_MESSAGES.filter((m) => m !== current);
  if (!pool.length) return INITIAL_BUSY_STATUS;
  return pool[Math.floor(Math.random() * pool.length)]!;
}
