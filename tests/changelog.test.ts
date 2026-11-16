import { test } from "node:test";
import assert from "node:assert/strict";
import { parseChangelog } from "../lib/changelog.ts";

test("keeps only numbered releases, in file order", () => {
  const md = "# Changelog\n\n## Unreleased\nx\n\n## 3.9.0\n### Added\n- a\n\n## 3.8.0\nb";
  const r = parseChangelog(md);
  assert.deepEqual(r.map((x) => x.version), ["3.9.0", "3.8.0"]);
  assert.ok(r[0].body.includes("- a"));
  assert.ok(!r[0].body.includes("3.8.0"));
});

test("empty input gives no releases", () => {
  assert.deepEqual(parseChangelog(""), []);
});
