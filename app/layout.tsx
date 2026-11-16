import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { readChangelog } from "../lib/changelog";

export const metadata: Metadata = {
  title: "Ashen",
  description: "A Hyprland + Quickshell rice for Arch, coloured by your wallpaper.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const version = readChangelog()[0]?.version ?? "";
  return (
    <html lang="en">
      <body>
        <noscript>
          <style>{".rv,.rv-each>*{opacity:1!important}"}</style>
        </noscript>
        <Nav version={version} />
        {children}
        <Footer version={version} />
      </body>
    </html>
  );
}
