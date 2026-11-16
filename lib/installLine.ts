import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ashenRepo } from "./source.ts";

export function extractInstallLine(readme: string): string {
  const m = /^bash -c ".*curl -fsSL .*"$/m.exec(readme);
  if (!m) throw new Error("README.md has no `bash -c \"$(curl -fsSL ...)\"` install line");
  return m[0];
}

// The line is kept in content/install-line.txt too, so a README edit that
// changes the install command fails the build until the site is updated.
export function readInstallLine(): string {
  const root = process.cwd();
  const fromReadme = extractInstallLine(readFileSync(join(ashenRepo, "README.md"), "utf8"));
  const fromSite = readFileSync(join(root, "content", "install-line.txt"), "utf8").trim();
  if (fromReadme !== fromSite) {
    throw new Error(
      `Install line differs: README.md has\n  ${fromReadme}\nbut site/content/install-line.txt has\n  ${fromSite}`,
    );
  }
  return fromSite;
}
