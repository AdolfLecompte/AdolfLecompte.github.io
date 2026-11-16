"use client";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { reduced } from "./motion";

// The stage for a feature with no screenshot: ticks breathing out of the centre.
export function TickField() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    const a = animate(Array.from(el.children), {
      scaleY: [0.15, 1],
      delay: stagger(45, { from: "center" }),
      duration: 1100,
      alternate: true,
      loop: true,
      ease: "inOutSine",
    });
    return () => {
      a.cancel();
    };
  }, []);
  return (
    <div ref={ref} className="tickfield" aria-hidden="true">
      {Array.from({ length: 41 }, (_, i) => <i key={i} />)}
    </div>
  );
}
