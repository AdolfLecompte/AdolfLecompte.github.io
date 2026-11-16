"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { animate } from "animejs";
import { docs } from "../lib/docs";
import { reduced } from "./motion";

// Lives in the docs layout, so the pill slides from page to page.
export function DocsSidebar() {
  const path = usePathname() ?? "";
  const box = useRef<HTMLElement>(null);
  const ind = useRef<HTMLSpanElement>(null);
  const active = docs.findIndex((d) => path.startsWith(`/docs/${d.slug}`));

  useLayoutEffect(() => {
    const a = box.current?.children[active + 1] as HTMLElement | undefined;
    if (!a || !ind.current) return;
    const to = { top: a.offsetTop, left: a.offsetLeft, width: a.offsetWidth, height: a.offsetHeight };
    if (reduced()) Object.assign(ind.current.style, { top: `${to.top}px`, left: `${to.left}px`, width: `${to.width}px`, height: `${to.height}px` });
    else animate(ind.current, { ...to, duration: 450, ease: "outQuint" });
  }, [active]);

  return (
    <aside className="dside" ref={box}>
      <span className="eind" ref={ind} aria-hidden="true" />
      {docs.map((d, k) => (
        <Link key={d.slug} href={`/docs/${d.slug}/`} aria-current={k === active ? "page" : undefined}>{d.title}</Link>
      ))}
    </aside>
  );
}
