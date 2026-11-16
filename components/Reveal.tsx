"use client";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { reduced } from "./motion";

// Fades its content up when it scrolls into view. `each` staggers the children.
export function Reveal({
  children,
  each = false,
  step = 90,
  className = "",
}: {
  children: React.ReactNode;
  each?: boolean;
  step?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = each ? Array.from(el.children) : [el];
    const show = () => targets.forEach((t) => ((t as HTMLElement).style.opacity = "1"));
    if (reduced()) return show();
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        animate(targets, {
          opacity: [0, 1],
          translateY: [28, 0],
          delay: each ? stagger(step) : 0,
          duration: 800,
          ease: "outExpo",
        });
      },
      { threshold: each ? 0 : 0.15 }, // a tall list never shows 15% of itself
    );
    io.observe(el);
    return () => io.disconnect();
  }, [each, step]);

  return (
    <div ref={ref} className={`${each ? "rv-each" : "rv"} ${className}`}>
      {children}
    </div>
  );
}
