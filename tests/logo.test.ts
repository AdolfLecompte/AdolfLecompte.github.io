import { test } from "node:test";
import assert from "node:assert/strict";
import { extractLogo } from "../lib/logo.ts";

test("takes the rows of the first <pre> block", () => {
  const lines = extractLogo("<div>\n<pre>\n ░▒ A \n ░▒ B \n</pre>\n</div><pre>\nx\n</pre>");
  assert.deepEqual(lines, [" ░▒ A ", " ░▒ B "]);
});

test("throws when the README has no logo block", () => {
  assert.throws(() => extractLogo("# no logo"));
});
