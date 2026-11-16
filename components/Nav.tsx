"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { animate } from "animejs";
import { Icon } from "./Icon";
import { links as where } from "../lib/links";
import { reduced } from "./motion";

const pages = [
  ["/features/", "Features"],
  ["/docs/installation/", "Docs"],
  ["/changelog/", "Changelog"],
] as const;

const socials = [
  ["github", "GitHub", where.github],
  ["reddit", "Reddit", where.reddit],
  ["tiktok", "TikTok", where.tiktok],
] as const;

export function Nav({ version }: { version: string }) {
  const path = usePathname() ?? "/";
  const box = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const dark = useRef<HTMLDivElement>(null);
  const at = useRef({ left: 0, width: 0 });
  const active = pages.findIndex(([href]) => path.startsWith(href.slice(0, -1)));

  // One driver for both: the light pill and the clip that lets the dark text show
  // only where the pill is, so a word changes colour exactly as the pill passes
  // under it -- never dark on the dark bar, nor light on the light pill.
  const paint = () => {
    const b = box.current, p = pill.current, d = dark.current;
    if (!b || !p || !d) return;
    const { left, width } = at.current;
    p.style.left = `${left}px`;
    p.style.width = `${width}px`;
    d.style.clipPath = `inset(0 ${Math.max(0, b.offsetWidth - left - width)}px 0 ${left}px round 999px)`;
  };

  useLayoutEffect(() => {
    const b = box.current, p = pill.current, d = dark.current;
    if (!b || !p || !d) return;
    // No tab is active on the home page: children[0] would be the pill itself.
    const a = active >= 0 ? (b.children[active + 1] as HTMLElement | undefined) : undefined;
    if (!a) {
      at.current = { left: 0, width: 0 };
      p.style.opacity = "0";
      d.style.clipPath = "inset(0 100% 0 0)";
      return;
    }
    p.style.opacity = "1";
    const to = { left: a.offsetLeft, width: a.offsetWidth };
    if (reduced() || at.current.width === 0) {
      at.current = to;
      paint();
    } else {
      animate(at.current, { ...to, duration: 450, ease: "outQuint", onUpdate: paint });
    }
  }, [active]);

  return (
    <header className="topnav">
      <nav className="bar" aria-label="Main">
        <Link href="/" className="brand" aria-label="Ashen">
          {/* The letters of the real logo, with no ornaments. */}
          <img src="/logo-letters.png" alt="Ashen" />
        </Link>

        <div className="links" ref={box}>
          <span className="navpill" ref={pill} aria-hidden="true" />
          {pages.map(([href, label], k) => (
            <Link key={href} href={href} aria-current={k === active ? "page" : undefined}>{label}</Link>
          ))}
          {/* The same words in the dark colour, shown only where the pill is. */}
          <div className="dark" ref={dark} aria-hidden="true">
            {pages.map(([href, label]) => <span key={href}>{label}</span>)}
          </div>
        </div>

        <span className="grow" />
        <Link href="/changelog/" className="pill">v{version}</Link>
        <div className="socials">
          {socials.map(([name, label, href]) => (
            <a key={name} href={href} className="soc" aria-label={label} title={label} target="_blank" rel="noopener noreferrer">
              <Icon name={name} />
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
