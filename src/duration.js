// Parse a human-readable duration like "1h30m" or "45s" into milliseconds.
//
// Supported units: s (seconds), m (minutes), h (hours).
// A string may combine several parts, e.g. "1h30m15s".

const UNITS = {
  s: 1_000,
  m: 60_000,
  h: 3_600_000,
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
  // so the *entire* string has to be a sequence of valid "<number><unit>"
  // parts. This rejects garbage like "1hello", "5s nope", or "1.5h" instead
  // of silently parsing a subset of it.
  const re = /\s*(\d+)\s*([a-z])\s*/giy;
  let total = 0;
  let matched = false;
  let pos = 0;
  let m;
  while ((m = re.exec(input)) !== null) {
    const value = Number(m[1]);
    const unit = m[2].toLowerCase();
    const ms = UNITS[unit];
    if (ms === undefined) {
      throw new RangeError(`parseDuration: unknown unit "${unit}"`);
    }
    total += value * ms;
    matched = true;
    pos = re.lastIndex;
  }

  if (!matched || pos !== input.length) {
    throw new RangeError(`parseDuration: invalid duration "${input}"`);
  }
  return total;
}
