import Markdown from "react-markdown";
import { ChangelogRail } from "../../components/ChangelogRail";
import { Reveal } from "../../components/Reveal";
import { Ticks } from "../../components/Ticks";
import { readChangelog, summarize } from "../../lib/changelog";

export const metadata = { title: "Changelog · Ashen" };

const OPEN = 2; // the newest releases start open, the rest folded

function Entry({ version, body, latest }: { version: string; body: string; latest: boolean }) {
  const kinds = summarize(body);
  return (
    <>
      <span className="ver">{version}</span>
      {latest && <span className="pill">latest</span>}
      {kinds.map((k) => (
        <span key={k.kind} className={`count ${k.kind.toLowerCase()}`}>{k.count} {k.kind.toLowerCase()}</span>
      ))}
    </>
  );
}

export default function Changelog() {
  const releases = readChangelog();
  return (
    <main className="wrap cl">
      <ChangelogRail versions={releases.map((r) => r.version)} />
      <div>
        <h1>Changelog</h1>
        <p className="sub">{releases.length} releases, newest first.</p>
        <Ticks count={40} />
        <Reveal each step={60}>
        {releases.map((r, i) => (
          <details key={r.version} id={`v${r.version}`} className="rel" open={i < OPEN}>
            <summary>
              <Entry version={r.version} body={r.body} latest={i === 0} />
              <span className="chev" aria-hidden="true">›</span>
            </summary>
            <div className="bodyc">
              <Markdown
                components={{
                  h3: ({ children }) => <h3 className={String(children).toLowerCase()}>{children}</h3>,
                }}
              >
                {r.body}
              </Markdown>
            </div>
          </details>
        ))}
        </Reveal>
      </div>
    </main>
  );
}
