import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ashenRepo } from "../lib/source.ts";

// The pages that list what the shell needs and what it fires are written by hand, so they can
// drift from the shell. These read the shell's own sources and fail when a page falls behind.

const page = (name: string) => readFileSync(join("content", "docs", `${name}.mdx`), "utf8");

function installerList(name: string): string[] {
  const out = execFileSync("bash", ["-c", `source install/lib/pkgs.sh; echo "\${${name}[@]}"`], {
    cwd: ashenRepo,
    encoding: "utf8",
  });
  return out.trim().split(/\s+/).filter(Boolean);
}

test("the Requirements page lists every package the installer installs", () => {
  const requirements = page("requirements");
  const packages = [...installerList("PKGS_OFFICIAL"), ...installerList("PKGS_AUR")];
  assert.ok(packages.length > 20, `read only ${packages.length} packages from ${ashenRepo}`);
  const missing = packages.filter((p) => !requirements.includes(p));
  assert.deepEqual(missing, [], `Requirements does not list: ${missing.join(" ")}`);
});

test("the Hooks page documents every event the shell fires", () => {
  const qml = readFileSync(join(ashenRepo, "quickshell/.config/quickshell/ashen/services/Hooks.qml"), "utf8");
  const block = /readonly property var events[\s\S]*?\]/.exec(qml)?.[0] ?? "";
  const events = [...block.matchAll(/"([a-z-]+)"/g)].map((m) => m[1]);
  assert.ok(events.length > 3, `read only ${events.length} events from Hooks.qml`);
  const hooks = page("hooks");
  const missing = events.filter((e) => !hooks.includes("`" + e + "`"));
  assert.deepEqual(missing, [], `Hooks does not document: ${missing.join(" ")}`);
});
