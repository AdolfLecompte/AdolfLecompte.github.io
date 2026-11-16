import { test } from "node:test";
import assert from "node:assert/strict";
import { summarize } from "../lib/changelog.ts";

test("counts top-level bullets under each ### heading", () => {
  const body = "### Added\n- a\n- b\n  continued\n  - nested\n\n### Fixed\n- c";
  assert.deepEqual(summarize(body), [
    { kind: "Added", count: 2 },
    { kind: "Fixed", count: 1 },
  ]);
});

test("a release with no ### headings has no summary", () => {
  assert.deepEqual(summarize("- loose bullet"), []);
});
