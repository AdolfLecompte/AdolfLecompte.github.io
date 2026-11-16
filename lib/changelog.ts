import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ashenRepo } from "./source.ts";

export type Release = { version: string; body: string };

// Only `## <n.n.n>` headings count: "Unreleased" and prose headings are skipped.
export function parseChangelog(md: string): Release[] {
  const out: Release[] = [];
  let cur: Release | null = null;
  for (const line of md.split("\n")) {
    const m = /^## (\d+\.\d+\.\d+)\s*$/.exec(line);
    if (m) {
      cur = { version: m[1], body: "" };
      out.push(cur);
    } else if (/^## /.test(line)) {
      cur = null;
    } else if (cur) {
      cur.body += line + "\n";
    }
  }
  return out.map((r) => ({ ...r, body: r.body.trim() }));
}

export function readChangelog(): Release[] {
  return parseChangelog(readFileSync(join(ashenRepo, "CHANGELOG.md"), "utf8"));
}

export type Kind = { kind: string; count: number };

// How many entries each `### Added / Changed / Fixed` block holds (top-level
// bullets only; nested ones belong to their parent).
export function summarize(body: string): Kind[] {
  const out: Kind[] = [];
  for (const line of body.split("\n")) {
    const h = /^### (.+?)\s*$/.exec(line);
    if (h) out.push({ kind: h[1], count: 0 });
    else if (out.length && /^- /.test(line)) out[out.length - 1].count++;
  }
  return out;
}
