"use client";
import { useEffect, useRef } from "react";
import { reduced } from "./motion";
import { waveScale } from "../lib/wave";

const BASE = 0.3;
const SIGMA = 110;
const SWEEP_MS = 1300;

// A row of ticks (the shell's meters). The ticks rise like a wave around the
// pointer and settle back when it leaves; on first scroll into view a wave runs
// through the row once, left to right.
export function Ticks({ count = 56 }: { count?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const bars = Array.from(el.children) as HTMLElement[];
    if (reduced()) {
      bars.forEach((b) => (b.style.transform = "scaleY(0.6)"));
      return;
    }
    const cur = bars.map(() => BASE);
    let centers: number[] = [];
    let pointer: number | null = null;
    let sweepStart = 0;
    let raf = 0;

    // Relative to the row itself, in the same coordinates as the pointer
    // (offsetLeft would be relative to whichever ancestor is positioned).
    const measure = () => {
      const left = el.getBoundingClientRect().left;
      centers = bars.map((b) => {
        const r = b.getBoundingClientRect();
        return r.left - left + r.width / 2;
      });
    };

    const frame = (now: number) => {
      raf = 0;
      // The intro wave is a pretend pointer travelling along the row.
      let virtual: number | null = null;
      if (sweepStart) {
        const t = (now - sweepStart) / SWEEP_MS;
        if (t >= 1) sweepStart = 0;
        else virtual = -SIGMA + t * (el.clientWidth + 2 * SIGMA);
      }
      const at = pointer ?? virtual;
      let moving = false;
      for (let i = 0; i < bars.length; i++) {
        const target = waveScale(centers[i], at, BASE, SIGMA);
        cur[i] += (target - cur[i]) * 0.2; // eases both ways: no tick jumps
        if (Math.abs(target - cur[i]) > 0.003) moving = true;
        bars[i].style.transform = `scaleY(${cur[i].toFixed(3)})`;
      }
      if (moving || at !== null) raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const move = (e: PointerEvent) => {
      pointer = e.clientX - el.getBoundingClientRect().left;
      kick();
    };
    const leave = () => {
      pointer = null;
      kick();
    };
    measure();
    bars.forEach((b) => (b.style.transform = `scaleY(${BASE})`));
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    window.addEventListener("resize", measure);

    const io = new IntersectionObserver((e) => {
      if (!e[0].isIntersecting) return;
      io.disconnect();
      sweepStart = performance.now();
      kick();
    });
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={ref} className="ticks" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => <i key={i} style={{ transform: `scaleY(${BASE})` }} />)}
    </div>
  );
}
