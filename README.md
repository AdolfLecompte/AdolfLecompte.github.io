# adolflecompte.github.io

The website of [Ashen](https://github.com/AdolfLecompte/ashen): a landing, the docs and the changelog.
Next.js, exported as static files and published by GitHub Pages at <https://adolflecompte.github.io/>.

It reads three things from the shell's repo when it is built: `CHANGELOG.md` (the changelog page and
the version), the logo in `README.md`, and the install line. Keep that repo next to this one
(`../ashen`), or point `ASHEN_REPO` at it.

```sh
npm install
npm run dev          # http://localhost:3000
npm test             # also checks that the Requirements and Hooks pages follow the shell
npm run build        # static files in out/
tools/make-logo.sh   # redraws public/logo*.png and the favicon from the shell's logo
```

Screenshots go in `public/shots/` and in the list in `lib/shots.ts`. Blur the wifi's name and the
city first: this is a public page.
