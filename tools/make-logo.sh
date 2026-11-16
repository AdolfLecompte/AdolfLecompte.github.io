#!/usr/bin/env bash
# Draws the pictures of the logo the site uses, all from the README's first <pre>:
#   public/logo.png          the whole logo, ornaments and motto included (footer)
#   public/logo-letters.png  only the five letters ASHEN (nav)
#   app/icon.png, apple-icon.png, favicon.ico   the A alone, on a dark rounded square
#   tools/make-logo.sh          (the shell's repo is ../ashen, or $ASHEN_REPO)
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
site="$(cd "$here/.." && pwd)"
shell="${ASHEN_REPO:-$site/../ashen}"
tmp="$(mktemp -d)"; trap 'rm -rf "$tmp"' EXIT

python3 - "$shell" "$here" "$tmp" <<'PY'
import io, json, re, subprocess, sys, os
shell, here, tmp = sys.argv[1:4]
readme = io.open(f"{shell}/README.md", encoding="utf-8").read()
m = re.search(r"<pre>\n(.*?)</pre>", readme, re.S)
if not m:
    sys.exit(f"{shell}/README.md has no <pre> logo block")
rows = m.group(1).rstrip("\n").split("\n")
width = max(map(len, rows))
rows = [r.ljust(width) for r in rows]

# Rows 2..7 are the letters; the ornaments, the dotted row and the motto are the
# other rows and the columns outside 9..52. The A is the first letter: 9..16.
LETTERS = [r[9:53] for r in rows[2:8]]
A_ONLY = [r[9:17] for r in rows[2:8]]
variants = {
    "full": (rows, 36),
    "letters": (LETTERS, 40),
    "a": (A_ONLY, 90),
}
tpl = io.open(f"{here}/logo.qml", encoding="utf-8").read()
for name, (rs, size) in variants.items():
    q = tpl.replace("@LOGO@", json.dumps(rs, ensure_ascii=False)).replace("@SIZE@", str(size)).replace("@OUT@", f"{tmp}/{name}.png")
    io.open(f"{tmp}/{name}.qml", "w", encoding="utf-8").write(q)
    env = dict(os.environ, QT_QPA_PLATFORM="offscreen")
    subprocess.run(["timeout", "60", "qml6", f"{tmp}/{name}.qml"], env=env, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if not os.path.exists(f"{tmp}/{name}.png"):
        sys.exit(f"qml6 drew nothing for {name}")
PY

# Cut each to its letters, keep the alpha.
magick "$tmp/full.png"    -trim +repage -resize 700x -strip "$site/public/logo.png"
magick "$tmp/letters.png" -trim +repage -resize 560x -strip "$site/public/logo-letters.png"

# The favicon: the A on a dark rounded square, as tall as the square allows.
magick -size 512x512 xc:none -fill '#0e1415' -draw 'roundrectangle 0,0 511,511 112,112' \
    \( "$tmp/a.png" -trim +repage -resize x410 \) -gravity center -composite "$tmp/icon512.png"
magick "$tmp/icon512.png" -resize 192x192 -strip "$site/app/icon.png"
magick "$tmp/icon512.png" -resize 180x180 -strip "$site/app/apple-icon.png"
magick "$tmp/icon512.png" -define icon:auto-resize=48,32,16 "$site/app/favicon.ico"
rm -f "$site/app/icon.svg"   # the old hand-drawn A; icon.png is the real one

for f in public/logo.png public/logo-letters.png app/icon.png app/apple-icon.png app/favicon.ico; do
    printf '  %-26s %s  %s\n' "$f" "$(identify -format '%wx%h' "$site/$f[0]")" "$(du -h "$site/$f" | cut -f1)"
done
