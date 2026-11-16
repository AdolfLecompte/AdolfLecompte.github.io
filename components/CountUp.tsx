"use client";
import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { reduced } from "./motion";

export function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;
    el.textContent = "0";
    const io = new IntersectionObserver((e) => {
      if (!e[0].isIntersecting) return;
      io.disconnect();
      const o = { v: 0 };
      animate(o, { v: to, duration: 1600, ease: "outExpo", onUpdate: () => (el.textContent = String(Math.round(o.v))) });
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{to}</span>;
}
