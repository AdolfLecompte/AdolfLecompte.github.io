"use client";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { reduced } from "./motion";

// The README's terminal logo: rows slide in, a light sweeps across, and now
// and then one row glitches sideways.
export function Logo({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const pre = ref.current;
    if (!pre || reduced()) return;
    const rows = Array.from(pre.querySelectorAll<HTMLElement>(".ll"));
    animate(rows, {
      opacity: [0, 1],
      translateX: [-18, 0],
      delay: stagger(70),
      duration: 800,
      ease: "outExpo",
    });
    const sweep = animate(rows, {
      backgroundPositionX: ["0%", "200%"],
      duration: 7000,
      ease: "linear",
      loop: true,
    });
    const glitch = setInterval(() => {
      const row = rows[Math.floor(Math.random() * rows.length)];
      animate(row, { translateX: [0, (Math.random() > 0.5 ? 1 : -1) * 6, 0], duration: 220, ease: "inOutQuad" });
    }, 3500);
    return () => {
      sweep.cancel();
      clearInterval(glitch);
    };
  }, []);

  return (
    <pre ref={ref} className="logo" aria-label="Ashen — a ghost in the shell">
      {lines.map((l, i) => (
        <span key={i} className="ll" aria-hidden="true">
          {l}
        </span>
      ))}
    </pre>
  );
}
