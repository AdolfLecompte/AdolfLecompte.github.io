"use client";
import { useRef, useState } from "react";

export function CopyCommand({ command }: { command: string }) {
  const ref = useRef<HTMLElement>(null);
  const [done, setDone] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setDone(true);
      setTimeout(() => setDone(false), 1500);
    } catch {
      // No clipboard (http, old browser): select the text so Ctrl+C works.
      const sel = window.getSelection();
      if (ref.current && sel) {
        sel.selectAllChildren(ref.current);
      }
    }
  }

  return (
    <div className="copycmd">
      <pre><code ref={ref}>{command}</code></pre>
      <button type="button" onClick={copy} className="btn">{done ? "copied" : "copy"}</button>
    </div>
  );
}
