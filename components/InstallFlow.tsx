"use client";
import { useCallback, useEffect, useRef } from "react";
import { animate, createTimeline } from "animejs";
import { reduced } from "./motion";
import { Reveal } from "./Reveal";

const STEPS = [
  ["01", "One line", "It checks this is Arch, then clones the repo into ~/ashen."],
  ["02", "Three questions", "Language of the shell, keyboard layout, system language."],
  ["03", "Five steps", "Packages, dotfiles, login screen, services, folders. Sudo is asked once."],
] as const;

export function InstallFlow({ command }: { command: string }) {
  const term = useRef<HTMLDivElement>(null);
  const tl = useRef<ReturnType<typeof createTimeline> | null>(null);

  const play = useCallback(() => {
    const t = term.current;
    if (!t) return;
    const q = (s: string) => t.querySelector<HTMLElement>(s)!;
    const all = Array.from(t.querySelectorAll<HTMLElement>(".tl"));
    all.forEach((l) => (l.style.opacity = "0"));
    t.querySelectorAll<HTMLElement>(".mk").forEach((m) => {
      m.textContent = m.dataset.idle ?? "·";
      m.classList.remove("ok");
    });
    q(".fill.pk").style.width = "0%";
    q(".n.pk").textContent = "0/62";
    q(".n.dt").textContent = "";
    tl.current?.cancel();

    const pk = { v: 0 };
    const dt = { v: 0 };
    const tick = (sel: string) => () => {
      const m = q(sel);
      m.textContent = "✓";
      m.classList.add("ok");
    };
    const line = { opacity: [0, 1], translateY: [6, 0], duration: 260, ease: "outQuad" } as const;
    const tlx = createTimeline({ defaults: { ease: "outQuad" } });
    tlx
      .add(q(".l-cmd"), line, 0)
      .add(q(".l-arch"), line, 500)
      .call(tick(".l-arch .mk"), 500)
      .add(q(".l-clone"), line, 800)
      .call(tick(".l-clone .mk"), 800)
      .add(q(".l-q1"), line, 1200)
      .add(q(".l-q2"), line, 1500)
      .add(q(".l-q3"), line, 1800)
      .add(q(".l-pk"), line, 2300)
      .add(q(".fill.pk"), { width: ["0%", "100%"], duration: 1800, ease: "inOutQuad" }, 2300)
      .add(pk, { v: 62, duration: 1800, ease: "inOutQuad", onUpdate: () => (q(".n.pk").textContent = `${Math.round(pk.v)}/62`) }, 2300)
      .call(tick(".l-pk .mk"), 4100)
      .add(q(".l-dt"), line, 4200)
      .add(dt, { v: 35, duration: 900, onUpdate: () => (q(".n.dt").textContent = `${Math.round(dt.v)} files linked`) }, 4200)
      .call(tick(".l-dt .mk"), 5100)
      .add(q(".l-ls"), line, 5200)
      .call(tick(".l-ls .mk"), 5500)
      .add(q(".l-sv"), line, 5600)
      .call(tick(".l-sv .mk"), 5900)
      .add(q(".l-fd"), line, 6000)
      .call(tick(".l-fd .mk"), 6300)
      .add(q(".l-done"), line, 6700);
    tl.current = tlx;
  }, []);

  useEffect(() => {
    const t = term.current;
    if (!t) return;
    if (reduced()) {
      t.querySelectorAll<HTMLElement>(".tl").forEach((l) => (l.style.opacity = "1"));
      t.querySelectorAll<HTMLElement>(".mk[data-idle]").forEach((m) => {
        m.textContent = "✓";
        m.classList.add("ok");
      });
      t.querySelector<HTMLElement>(".fill.pk")!.style.width = "100%";
      t.querySelector<HTMLElement>(".n.pk")!.textContent = "62/62";
      t.querySelector<HTMLElement>(".n.dt")!.textContent = "35 files linked";
      return;
    }
    const io = new IntersectionObserver((e) => {
      if (!e[0].isIntersecting) return;
      io.disconnect();
      play();
    }, { threshold: 0.4 });
    io.observe(t);
    return () => {
      io.disconnect();
      tl.current?.cancel();
    };
  }, [play]);

  return (
    <div className="flow">
      <Reveal each className="steps">
        {STEPS.map(([n, h, p]) => (
          <div key={n} className="step">
            <span className="num">{n}</span>
            <h3>{h}</h3>
            <p>{p}</p>
          </div>
        ))}
      </Reveal>
      <div className="term" ref={term}>
        <div className="bar"><i /><i /><i /><b>install/run.sh</b></div>
        <div className="body">
          <div className="tl l-cmd"><span className="p">$</span> {command}</div>
          <div className="tl l-arch"><span className="mk" data-idle="·">·</span> this is Arch</div>
          <div className="tl l-clone"><span className="mk" data-idle="·">·</span> cloned into ~/ashen</div>
          <div className="tl l-q1"><span className="q">?</span> language <em>English</em></div>
          <div className="tl l-q2"><span className="q">?</span> keyboard <em>latam</em></div>
          <div className="tl l-q3"><span className="q">?</span> system language <em>es_MX</em></div>
          <div className="tl l-pk"><span className="mk" data-idle="▸">▸</span> packages <span className="track"><span className="fill pk" /></span> <span className="n pk">0/62</span></div>
          <div className="tl l-dt"><span className="mk" data-idle="▸">▸</span> dotfiles <span className="n dt" /></div>
          <div className="tl l-ls"><span className="mk" data-idle="·">·</span> login screen</div>
          <div className="tl l-sv"><span className="mk" data-idle="·">·</span> services</div>
          <div className="tl l-fd"><span className="mk" data-idle="·">·</span> folders</div>
          <div className="tl l-done">done. reboot when asked.</div>
        </div>
        <button type="button" className="replay" onClick={play}>replay</button>
      </div>
    </div>
  );
}
