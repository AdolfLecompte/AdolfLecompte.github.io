import type { CSSProperties } from "react";

type Logo = { file: string; color: string };

export type Support = {
  name: string;
  kind: "distro" | "wm";
  status: "supported" | "not-yet";
  note: string;
  logos: Logo[];
  tested?: Logo[];
};

const missing = "Needs a port of the Hyprland-specific services and an installer for this package manager.";

// Logos are the CC0 SVGs of simple-icons (the marks belong to their owners);
// colours are each project's brand colour.
const L = {
  arch: { file: "archlinux", color: "#1793D1" },
  fedora: { file: "fedora", color: "#51A2DA" },
  nixos: { file: "nixos", color: "#5277C3" },
  debian: { file: "debian", color: "#A81D33" },
  ubuntu: { file: "ubuntu", color: "#E95420" },
  hyprland: { file: "hyprland", color: "#58E1FF" },
  niri: { file: "niri", color: "#D55C44" },
  sway: { file: "sway", color: "#68751C" },
  manjaro: { file: "manjaro", color: "#35BFA4" },
  cachyos: { file: "cachyos", color: "#00AA88" },
  endeavour: { file: "endeavouros", color: "#7F7FFF" },
  garuda: { file: "garudalinux", color: "#8839EF" },
};

export const support: Support[] = [
  {
    name: "Arch Linux", kind: "distro", status: "supported", logos: [L.arch],
    note: "And the Arch-based distros already tested.",
    tested: [L.manjaro, L.cachyos, L.endeavour, L.garuda],
  },
  { name: "Hyprland", kind: "wm", status: "supported", logos: [L.hyprland], note: "The compositor Ashen is written for." },
  { name: "Fedora", kind: "distro", status: "not-yet", logos: [L.fedora], note: missing },
  { name: "NixOS", kind: "distro", status: "not-yet", logos: [L.nixos], note: missing },
  { name: "Debian / Ubuntu", kind: "distro", status: "not-yet", logos: [L.debian, L.ubuntu], note: missing },
  { name: "Niri", kind: "wm", status: "not-yet", logos: [L.niri], note: missing },
  { name: "Sway", kind: "wm", status: "not-yet", logos: [L.sway], note: missing },
];

function Mark({ logo, small = false, title }: { logo: Logo; small?: boolean; title?: string }) {
  const style = { "--src": `url(/logos/${logo.file}.svg)`, "--brand": logo.color } as CSSProperties;
  return <span className={small ? "mark small" : "mark"} style={style} role="img" aria-label={title ?? logo.file} />;
}

function Group({ title, kind }: { title: string; kind: Support["kind"] }) {
  return (
    <section>
      <h3>{title}</h3>
      <div className="cards">
        {support.filter((s) => s.kind === kind).map((s) => (
          <div key={s.name} className={`card ${s.status}`}>
            <div className="marks">
              {s.logos.map((l) => <Mark key={l.file} logo={l} title={s.name} />)}
            </div>
            <strong>{s.name}</strong>
            <span>{s.status === "supported" ? "supported" : "not yet"}</span>
            <p>{s.note}</p>
            {s.tested && (
              <div className="marks tested" aria-label="Tested derivatives">
                {s.tested.map((l) => <Mark key={l.file} logo={l} small />)}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function SupportGrid() {
  return (
    <>
      <Group title="Distributions" kind="distro" />
      <Group title="Window managers" kind="wm" />
    </>
  );
}
