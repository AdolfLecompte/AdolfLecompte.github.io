import Link from "next/link";
import { Carousel } from "../components/Carousel";
import { Ticks } from "../components/Ticks";
import { shots } from "../lib/shots";
import { CopyCommand } from "../components/CopyCommand";
import { CountUp } from "../components/CountUp";
import { HeroGlow } from "../components/HeroGlow";
import { InstallFlow } from "../components/InstallFlow";
import { Logo } from "../components/Logo";
import { Reveal } from "../components/Reveal";
import { SupportGrid } from "../components/SupportGrid";
import { readChangelog } from "../lib/changelog";
import { readInstallLine } from "../lib/installLine";
import { readLogo } from "../lib/logo";
// To add a screenshot: copy it to site/public/shots/ and add a line in lib/shots.ts.
import { existsSync } from "node:fs";
import { join } from "node:path";

const showcase = [
  { label: "01 / Bar", title: "Bar", text: "On any edge, in four shapes. Drag every capsule.", src: "/shots/02.webp", alt: "A bar down the left edge with widgets over the wallpaper" },
  { label: "02 / Panels", title: "Panels", text: "Every pill opens a panel that grows out of it.", src: "/shots/11.webp", alt: "The music panel with lyrics beside screen time and calendar widgets" },
  { label: "03 / Wallpapers", title: "Wallpapers", text: "Pick one and the whole shell takes its palette.", src: "/shots/09.webp", alt: "The wallpaper picker with perspective cards" },
  { label: "04 / Settings", title: "Settings", text: "One place for everything, with a search that takes you to the row.", src: "/shots/08.webp", alt: "Settings, System tab" },
  { label: "05 / Dock", title: "Dock", text: "Apps, pills and shortcuts, on the edge you choose.", src: "/shots/06.webp", alt: "The dock at the bottom over a pink palette" },
];

const stats: [number, string][] = [
  [15, "desktop widgets"],
  [5, "workspace styles"],
  [4, "bar shapes"],
  [4, "languages"],
];

export default function Home() {
  for (const s of shots) {
    if (!existsSync(join(process.cwd(), "public", s.src))) {
      throw new Error(`Gallery image missing: public${s.src}`);
    }
  }
  const version = readChangelog()[0]?.version ?? "";
  const command = readInstallLine();
  return (
    <main>
      <section className="hero">
        <HeroGlow />
        <div className="wrap heroin">
          <Link href="/changelog/" className="pill big">v{version} · latest</Link>
          <Logo lines={readLogo()} />
          <p className="cta">
            <Link href="/docs/installation/" className="btn primary">Get started</Link>
            <Link href="/features/" className="btn">See what's in it</Link>
          </p>
          <Carousel shots={shots.filter((s) => s.carousel !== false)} />
          <CopyCommand command={command} />
        </div>
      </section>

      <Ticks />
      <section className="wrap sect">
        <Reveal><h2>How it installs</h2></Reveal>
        <InstallFlow command={command} />
      </section>

      <Ticks />
      <section className="wrap sect">
        <Reveal><h2>What you get</h2></Reveal>
        <Reveal each className="stats">
          {stats.map(([n, l]) => (
            <div key={l}><strong><CountUp to={n} /></strong><span className="lbl">{l}</span></div>
          ))}
        </Reveal>
        {showcase.map((x, i) => (
          <Reveal key={x.title} className={`show${i % 2 ? " flip" : ""}`}>
            <div className="txt">
              <span className="eyebrow">{x.label}</span>
              <h3>{x.title}</h3>
              <p>{x.text}</p>
            </div>
            <div className="shot"><img src={x.src} alt={x.alt} loading="lazy" /></div>
          </Reveal>
        ))}
        <p style={{ textAlign: "center" }}><Link href="/features/" className="btn">All features →</Link></p>
      </section>

      <Ticks />
      <section className="wrap sect">
        <Reveal><h2>Where it runs</h2></Reveal>
        <Reveal><SupportGrid /></Reveal>
      </section>

      <section className="wrap sect final">
        <Reveal>
          <h2>One line, one reboot.</h2>
          <CopyCommand command={command} />
        </Reveal>
      </section>
    </main>
  );
}
