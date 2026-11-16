"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { reduced } from "./motion";

// Version list that follows the scroll; the pill slides to the release on show.
export function ChangelogRail({ versions }: { versions: string[] }) {
  const [active, setActive] = useState(0);
  const box = useRef<HTMLElement>(null);
  const ind = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const els = versions.map((v) => document.getElementById(`v${v}`)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(versions.indexOf(e.target.id.slice(1)));
        }
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [versions]);

  useLayoutEffect(() => {
    const a = box.current?.children[active + 1] as HTMLElement | undefined;
    if (!a || !ind.current) return;
    const to = { top: a.offsetTop, height: a.offsetHeight, width: a.offsetWidth };
    if (reduced()) Object.assign(ind.current.style, { top: `${to.top}px`, height: `${to.height}px`, width: `${to.width}px` });
    else animate(ind.current, { ...to, duration: 350, ease: "outQuint" });
  }, [active]);

  return (
    <nav className="rail" ref={box} aria-label="Versions">
      <span className="eind" ref={ind} aria-hidden="true" />
      {versions.map((v, k) => (
        <a
          key={v}
          href={`#v${v}`}
          className={k === active ? "on" : ""}
          onClick={() => {
            const d = document.getElementById(`v${v}`) as HTMLDetailsElement | null;
            if (d) d.open = true;
          }}
        >
          {v}
        </a>
      ))}
    </nav>
  );
}
