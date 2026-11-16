import { notFound } from "next/navigation";
import { docs } from "../../../lib/docs";
import { Pager } from "../../../components/Pager";
import { Reveal } from "../../../components/Reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return docs.map((d) => ({ slug: d.slug }));
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!docs.some((d) => d.slug === slug)) notFound();
  const { default: Content } = await import(`../../../content/docs/${slug}.mdx`);
  return (
    <>
      <Reveal each step={28} className="prose">
        <Content />
      </Reveal>
      <Pager slug={slug} />
    </>
  );
}
