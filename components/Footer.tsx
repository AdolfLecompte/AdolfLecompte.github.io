import Link from "next/link";

export function Footer({ version }: { version: string }) {
  return (
    <footer className="foot">
      <div className="wrap cols">
        <div>
          <img src="/logo.png" alt="Ashen: a ghost in the shell" className="foot-logo" />
          <p className="dim">Version {version} · GPL-3.0-or-later</p>
        </div>
        <div>
          <h4>Docs</h4>
          <Link href="/docs/installation/">Installation</Link>
          <Link href="/docs/getting-started/">Getting started</Link>
          <Link href="/docs/customize/">Customize</Link>
          <Link href="/docs/supported/">Supported systems</Link>
        </div>
        <div>
          <h4>Project</h4>
          <Link href="/features/">Features</Link>
          <Link href="/changelog/">Changelog</Link>
          <a href="https://github.com/AdolfLecompte/ashen/releases">Releases</a>
          <a href="https://github.com/AdolfLecompte/ashen/issues">Issues</a>
        </div>
        <div>
          <h4>Source</h4>
          <a href="https://github.com/AdolfLecompte/ashen">GitHub</a>
          <a href="https://github.com/AdolfLecompte/ashen/blob/main/LICENSE">License</a>
          <a href="https://hyprland.org">Hyprland</a>
          <a href="https://quickshell.org">Quickshell</a>
        </div>
      </div>
    </footer>
  );
}
