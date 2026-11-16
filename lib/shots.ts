export type Shot = { src: string; alt: string; accent: string; carousel?: boolean };

// `carousel: false` keeps a picture out of the landing's carousel: it is for a feature.
// `accent` is the colour of the shell's own active pill in that screenshot, so
// the page can take the palette of the wallpaper on show, as the rice does.
export const shots: Shot[] = [
  { src: "/shots/01.webp", accent: "#ffb4ab", alt: "Pills bar on top, a music card and a ring visualiser over a warm wallpaper" },
  { src: "/shots/02.webp", accent: "#f6d6ab", alt: "A bar down the left edge, with system, music, calendar and clock widgets" },
  { src: "/shots/03.webp", accent: "#ffb59d", alt: "Pac-Man workspace dots on a side bar, beside calendar, music and visualiser widgets" },
  { src: "/shots/04.webp", accent: "#81d3de", alt: "A teal palette pulled from a manga wallpaper, with an analogue clock widget" },
  { src: "/shots/05.webp", accent: "#ffaede", alt: "A pink palette: visualiser, music card, analogue clock and battery widgets" },
  { src: "/shots/06.webp", accent: "#ffb0ca", alt: "The same pink palette with the bar's utility pills and the dock at the bottom" },
  { src: "/shots/07.webp", accent: "#ffb5a1", alt: "The dock on the left, a ring visualiser and floating lyrics" },
  { src: "/shots/08.webp", accent: "#80d4db", alt: "Settings, System tab: default apps, power profile and language" },
  { src: "/shots/09.webp", accent: "#fcbc00", alt: "The wallpaper picker: perspective cards, static and animated tabs, an amber palette" },
  { src: "/shots/10.webp", accent: "#ffb4a8", alt: "A translucent terminal with fastfetch and the Ashen mark" },
  { src: "/shots/11.webp", accent: "#77d7c4", alt: "The music panel with lyrics, screen time and calendar widgets on a purple and green palette" },
  { src: "/shots/12.webp", accent: "#d0d8e6", alt: "Arranging the desktop widgets: weather, clock, music and calendar, with the toolbar on top" },
  { src: "/shots/13.webp", accent: "#d0d8e6", alt: "The process monitor: CPU, memory, temperatures, GPU, network and storage drawn as ticks" },
  { src: "/shots/14.webp", accent: "#ffb2ba", alt: "The timer panel with the pomodoro, over the music, calendar and system widgets" },
  { src: "/shots/15.webp", accent: "#ffb2ba", carousel: false, alt: "Settings, Screen tab: the monitors on a three-by-three grid" },
  { src: "/shots/16.webp", accent: "#ffb2ba", carousel: false, alt: "Game mode on: a bare desktop and a notice that says so" },
  { src: "/shots/17.webp", accent: "#ffb2ba", carousel: false, alt: "Settings, System tab: choosing the language" },
  { src: "/shots/18.webp", accent: "#ffb4ab", alt: "The lock screen at rest: the time and nothing else" },
  { src: "/shots/19.webp", accent: "#ffb4ab", alt: "The lock screen once asked: the face, the name and the password on one plate between the widgets" },
  { src: "/shots/20.webp", accent: "#ffb4ab", alt: "The screen-time panel: today's total, the apps, the week and the month" },
];

export const accentOf = (src: string) => shots.find((s) => s.src === src)?.accent;
