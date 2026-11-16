// The page takes the palette of the wallpaper on show; null gives it back.
export function setAccent(color: string | null) {
  const root = document.documentElement;
  if (color) root.style.setProperty("--ghost", color);
  else root.style.removeProperty("--ghost");
}
