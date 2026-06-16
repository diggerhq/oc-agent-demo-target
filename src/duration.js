// Parse a human-readable duration like "1h30m" or "45s" into milliseconds.
//
// Supported units: s (seconds), m (minutes), h (hours), w (weeks).
// A string may combine several parts, e.g. "1h30m15s".

const UNITS = {
  s: 1_000,
  m: 60_000,
  h: 3_600_000,
  w: 604_800_000, // 7 days
};

/**
 * @param {string} input e.g. "1h30m"
 * @returns {number} the duration in milliseconds
 */
export function parseDuration(input) {
  if (typeof input !== "string" || input.trim() === "") {
    throw new TypeError("parseDuration: expected a non-empty string");
  }

  const re = /(\d+)\s*([a-z])/gi;
  let total = 0;
  let matched = false;
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
  }

  if (!matched) {
    throw new RangeError(`parseDuration: no duration found in "${input}"`);
  }
  return total;
}
