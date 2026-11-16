import { test } from "node:test";
import assert from "node:assert/strict";
import { extractInstallLine } from "../lib/installLine.ts";

test("throws when the README has no install line", () => {
  assert.throws(() => extractInstallLine("# nothing here"));
});

test("finds the curl line in a sh fence", () => {
  const readme = '## Install\n\n```sh\nbash -c "$(curl -fsSL https://x/boot.sh)"\n```\n';
  assert.match(extractInstallLine(readme), /^bash -c "\$\(curl -fsSL/);
});
