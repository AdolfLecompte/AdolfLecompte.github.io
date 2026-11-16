import Link from "next/link";
import { docs } from "../lib/docs";

export function Pager({ slug }: { slug: string }) {
  const i = docs.findIndex((d) => d.slug === slug);
  const prev = docs[i - 1];
  const next = docs[i + 1];
  return (
    <div className="pager">
      {prev ? <Link href={`/docs/${prev.slug}/`} className="btn">← {prev.title}</Link> : <span />}
      {next ? <Link href={`/docs/${next.slug}/`} className="btn primary">{next.title} →</Link> : <span />}
    </div>
  );
}
