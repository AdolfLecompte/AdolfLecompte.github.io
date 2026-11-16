import { test } from "node:test";
import assert from "node:assert/strict";
import { waveScale } from "../lib/wave.ts";

test("with no pointer a tick stands at its base", () => {
  assert.equal(waveScale(300, null, 0.3), 0.3);
});

test("the tick under the pointer reaches full height", () => {
  assert.equal(waveScale(300, 300, 0.3, 110), 1);
});

test("ticks fall away on both sides, the same on each", () => {
  const near = waveScale(300 + 60, 300, 0.3, 110);
  assert.ok(near < 1 && near > 0.3);
  assert.equal(waveScale(300 + 60, 300, 0.3, 110), waveScale(300 - 60, 300, 0.3, 110));
});

test("far from the pointer a tick is back at its base", () => {
  assert.ok(waveScale(300 + 600, 300, 0.3, 110) - 0.3 < 0.001);
});
