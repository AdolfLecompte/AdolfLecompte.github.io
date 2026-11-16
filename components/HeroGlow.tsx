"use client";
import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { reduced } from "./motion";

// Two slow blobs of the accent colour drifting behind the hero.
export function HeroGlow() {
  const a = useRef<HTMLDivElement>(null);
  const b = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduced() || !a.current || !b.current) return;
    const x = animate(a.current, { translateX: [-60, 80], translateY: [0, 50], duration: 11000, alternate: true, loop: true, ease: "inOutSine" });
    const y = animate(b.current, { translateX: [70, -60], translateY: [40, -30], duration: 14000, alternate: true, loop: true, ease: "inOutSine" });
    return () => {
      x.cancel();
      y.cancel();
    };
  }, []);
  return (
    <div className="glow" aria-hidden="true">
      <div ref={a} className="blob one" />
      <div ref={b} className="blob two" />
    </div>
  );
}
