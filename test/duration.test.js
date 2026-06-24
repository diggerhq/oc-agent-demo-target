import { test } from "node:test";
import assert from "node:assert/strict";
import { parseDuration } from "../src/duration.js";

test("parses single units", () => {
  assert.equal(parseDuration("45s"), 45_000);
  assert.equal(parseDuration("10m"), 600_000);
  assert.equal(parseDuration("2h"), 7_200_000);
});

test("parses combined units", () => {
  assert.equal(parseDuration("1h30m"), 5_400_000);
  assert.equal(parseDuration("1h30m15s"), 5_415_000);
});

test("tolerates surrounding and internal whitespace", () => {
  assert.equal(parseDuration("  1h 30m  "), 5_400_000);
});

test("rejects bad input", () => {
  assert.throws(() => parseDuration(""), TypeError);
  assert.throws(() => parseDuration("nope"), RangeError);
  assert.throws(() => parseDuration("5x"), RangeError);
});

test("rejects input that is not fully consumed", () => {
  // Previously these were silently mis-parsed instead of rejected.
  assert.throws(() => parseDuration("1hgarbage"), RangeError); // trailing junk
  assert.throws(() => parseDuration("1.5h"), RangeError); // decimals unsupported
  assert.throws(() => parseDuration("-5m"), RangeError); // sign unsupported
  assert.throws(() => parseDuration("h30m"), RangeError); // leading bare unit
  assert.throws(() => parseDuration("1h foo 30m"), RangeError); // junk between parts
});
