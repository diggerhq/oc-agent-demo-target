import { test } from "node:test";
import assert from "node:assert/strict";
import { parseDuration } from "../src/duration.js";

test("parses single units", () => {
  assert.equal(parseDuration("45s"), 45_000);
  assert.equal(parseDuration("10m"), 600_000);
  assert.equal(parseDuration("2h"), 7_200_000);
  assert.equal(parseDuration("1w"), 604_800_000);
});

test("parses combined units", () => {
  assert.equal(parseDuration("1h30m"), 5_400_000);
  assert.equal(parseDuration("1h30m15s"), 5_415_000);
  assert.equal(parseDuration("2w1h"), 1_213_200_000);
});

test("rejects bad input", () => {
  assert.throws(() => parseDuration(""), TypeError);
  assert.throws(() => parseDuration("nope"), RangeError);
  assert.throws(() => parseDuration("5x"), RangeError);
});
