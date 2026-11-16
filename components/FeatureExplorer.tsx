"use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { setAccent } from "./accent";
import { reduced } from "./motion";
import { TickField } from "./TickField";
import { accentOf } from "../lib/shots";
import type { Feature } from "../lib/features";

const MS = 6500;

export function FeatureExplorer({ features }: { features: Feature[] }) {
  const n = features.length;
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true); // a click on the list ends the autoplay
  const [hover, setHover] = useState(false);
  const list = useRef<HTMLDivElement>(null);
  const ind = useRef<HTMLSpanElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const f = features[i];

  const pick = useCallback((k: number, manual = false) => {
    setI(((k % n) + n) % n);
    if (manual) setAuto(false);
  }, [n]);

  // The sliding pill under the active entry.
  useLayoutEffect(() => {
    const btn = list.current?.children[i + 1] as HTMLElement | undefined;
    if (!btn || !ind.current) return;
    const to = { top: btn.offsetTop, left: btn.offsetLeft, width: btn.offsetWidth, height: btn.offsetHeight };
    if (reduced()) Object.assign(ind.current.style, { top: `${to.top}px`, left: `${to.left}px`, width: `${to.width}px`, height: `${to.height}px` });
    else animate(ind.current, { ...to, duration: 450, ease: "outQuint" });
  }, [i]);

  // The stage: palette, picture and text arrive on every change.
  useEffect(() => {
    setAccent((f.shot && accentOf(f.shot)) || null);
    const el = stage.current;
    if (!el || reduced()) return;
    animate(el.querySelectorAll(".pic"), { opacity: [0, 1], scale: [1.06, 1], duration: 900, ease: "outExpo" });
    animate(el.querySelectorAll(".in"), { opacity: [0, 1], translateY: [14, 0], delay: stagger(80, { start: 120 }), duration: 600, ease: "outQuad" });
  }, [f]);
  useEffect(() => () => setAccent(null), []);

  // Autoplay: the bar fills, then the next one.
  useEffect(() => {
    if (!auto || hover || !bar.current || reduced()) return;
    const a = animate(bar.current, { width: ["0%", "100%"], duration: MS, ease: "linear", onComplete: () => setI((v) => (v + 1) % n) });
    return () => {
      a.cancel();
    };
  }, [i, auto, hover, n]);

  return (
    <div
      className="explorer"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowDown") { e.preventDefault(); pick(i + 1, true); }
        if (e.key === "ArrowUp") { e.preventDefault(); pick(i - 1, true); }
      }}
    >
      <div className="elist" ref={list} role="tablist" aria-orientation="vertical">
        <span className="eind" ref={ind} aria-hidden="true" />
        {features.map((x, k) => (
          <button key={x.id} type="button" role="tab" aria-selected={k === i} className={k === i ? "on" : ""} onClick={() => pick(k, true)}>
            <span className="n">{String(k + 1).padStart(2, "0")}</span> {x.title}
          </button>
        ))}
      </div>
      <div className="stage" ref={stage} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <div className="visual">
          {f.shot ? <img className="pic" src={f.shot} alt="" /> : <TickField />}
        </div>
        <div className="detail">
          <h3 className="in">{f.title}</h3>
          <p className="in lead2">{f.text}</p>
          <ul>{f.points.map((p) => <li key={p} className="in">{p}</li>)}</ul>
        </div>
        <div className="eprog"><div ref={bar} /></div>
      </div>
    </div>
  );
}
