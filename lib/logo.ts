import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ashenRepo } from "./source.ts";

// The terminal logo is the first <pre> block of the README: one source for both.
export function extractLogo(readme: string): string[] {
  const m = /<pre>\n([\s\S]*?)<\/pre>/.exec(readme);
  if (!m) throw new Error("README.md has no <pre> logo block");
  return m[1].replace(/\n+$/, "").split("\n");
}

export function readLogo(): string[] {
  return extractLogo(readFileSync(join(ashenRepo, "README.md"), "utf8"));
}
