// Parse a human-readable duration like "1h30m" or "45s" into milliseconds.
//
// Supported units: s (seconds), m (minutes), h (hours), d (days), w (weeks).
// A string may combine several parts, e.g. "1h30m15s".

const UNITS = {
  s: 1_000,
  m: 60_000,
  h: 3_600_000,
  d: 86_400_000,
  w: 604_800_000,
};

/**
 * @param {string} input e.g. "1h30m"
 * @returns {number} the duration in milliseconds
 */
export function parseDuration(input) {
  if (typeof input !== "string" || input.trim() === "") {
    throw new TypeError("parseDuration: expected a non-empty string");
  }

  // Sticky regex: each match must start exactly where the previous one ended,
  // so the whole string has to be a sequence of "<number><unit>" parts.
  // Anything left over (decimals, signs, stray words) is rejected rather than
  // silently dropped.
  const re = /(\d+)\s*([a-z])\s*/giy;
  const trimmed = input.trim();
  let total = 0;
  let pos = 0;
  let m;
  while ((m = re.exec(trimmed)) !== null) {
    const unit = m[2].toLowerCase();
    const ms = UNITS[unit];
    if (ms === undefined) {
      throw new RangeError(`parseDuration: unknown unit "${unit}"`);
    }
    total += Number(m[1]) * ms;
    pos = re.lastIndex;
  }

  if (pos !== trimmed.length) {
    throw new RangeError(`parseDuration: invalid duration "${input}"`);
  }
  return total;
}
