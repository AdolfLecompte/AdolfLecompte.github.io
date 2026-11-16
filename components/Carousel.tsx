"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { reduced } from "./motion";
import { setAccent } from "./accent";
import type { Shot } from "../lib/shots";

const MS = 5500;

// How far slide k is from the one on show, going the short way round.
function offsetOf(k: number, i: number, n: number) {
  let d = (((k - i) % n) + n) % n;
  if (d > n / 2) d -= n;
  return d;
}

// Where a slide stands: the one on show in the middle, its two neighbours peeking
// out at the sides smaller and dimmer, the rest out of sight behind them.
// `x` is a percentage of the slide's own width.
function pose(d: number) {
  if (d === 0) return { x: 0, s: 1, o: 1, z: 3 };
  if (Math.abs(d) === 1) return { x: d * 66, s: 0.82, o: 0.5, z: 2 };
  return { x: Math.sign(d) * 70, s: 0.7, o: 0, z: 1 };
}

export function Carousel({ shots }: { shots: Shot[] }) {
  const n = shots.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const slides = useRef<(HTMLButtonElement | null)[]>([]);
  const bar = useRef<HTMLDivElement>(null);
  const go = useCallback((k: number) => setI(((k % n) + n) % n), [n]);

  // The page wears the palette of the wallpaper on show.
  useEffect(() => {
    setAccent(shots[i].accent);
  }, [i, shots]);
  useEffect(() => () => setAccent(null), []);

  useEffect(() => {
    const still = reduced();
    slides.current.forEach((el, k) => {
      if (!el) return;
      const p = pose(offsetOf(k, i, n));
      el.style.zIndex = String(p.z);
      el.style.pointerEvents = Math.abs(offsetOf(k, i, n)) === 1 ? "auto" : "none";
      if (still) {
        el.style.transform = `translateX(${p.x}%) scale(${p.s})`;
        el.style.opacity = String(p.o);
      } else {
        animate(el, { translateX: `${p.x}%`, scale: p.s, opacity: p.o, duration: 750, ease: "outExpo" });
      }
    });
  }, [i, n]);

  // The progress bar is the clock: when it fills, the next slide comes.
  useEffect(() => {
    if (paused || !bar.current || reduced()) return;
    const a = animate(bar.current, {
      width: ["0%", "100%"],
      duration: MS,
      ease: "linear",
      onComplete: () => setI((v) => (v + 1) % n),
    });
    return () => {
      a.cancel();
    };
  }, [i, paused, n]);

  return (
    <div
      className="cwrap"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(i + 1);
        if (e.key === "ArrowLeft") go(i - 1);
      }}
      aria-roledescription="carousel"
    >
      <button type="button" className="arrow left" onClick={() => go(i - 1)} aria-label="Previous">‹</button>

      <div className="cstage">
        {shots.map((s, k) => {
          // Initial poses are those of slide 0 on show and never change here: after
          // that anime moves them, and React must not write over its styles.
          const p = pose(offsetOf(k, 0, n));
          return (
            <button
              key={s.src}
              type="button"
              className="slide"
              ref={(el) => {
                slides.current[k] = el;
              }}
              style={{ transform: `translateX(${p.x}%) scale(${p.s})`, opacity: p.o, zIndex: p.z }}
              onClick={() => go(k)}
              aria-label={`Show screenshot ${k + 1}`}
              tabIndex={-1}
            >
              <img src={s.src} alt={s.alt} draggable={false} />
            </button>
          );
        })}
      </div>

      <button type="button" className="arrow right" onClick={() => go(i + 1)} aria-label="Next">›</button>

      <div className="cunder">
        <div className="progress"><div ref={bar} /></div>
        <div className="dots">
          {shots.map((s, k) => (
            <button
              key={s.src}
              type="button"
              className={k === i ? "on" : ""}
              onClick={() => go(k)}
              aria-label={`Show screenshot ${k + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
