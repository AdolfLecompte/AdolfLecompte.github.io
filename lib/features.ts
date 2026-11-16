export type Feature = {
  id: string;
  title: string;
  text: string;
  points: string[];
  shot?: string; // a screenshot that shows it; without one the stage plays ticks
};

// Short on purpose: the README has the long version.
export const features: Feature[] = [
  { id: "bar", title: "Bar", shot: "/shots/02.webp",
    text: "On any edge, in four shapes. Drag every capsule.",
    points: ["Pills, island, solid or docked", "Each capsule: full, compact or icon", "Five workspace styles, Pac-Man and kanji included"] },
  { id: "panels", title: "Panels", shot: "/shots/11.webp",
    text: "Every pill opens a panel that grows out of it.",
    points: ["One language: tinted plates, one radius", "Leaves the same way it came", "Or opens like a window from the bar's edge"] },
  { id: "dock", title: "Dock", shot: "/shots/06.webp",
    text: "Pinned and running apps, plus pills and shortcuts.",
    points: ["Click launches, focuses or hides", "Right-click pins", "Lock, game mode or a command of your own"] },
  { id: "widgets", title: "Desktop widgets", shot: "/shots/12.webp",
    text: "Fifteen of them over the wallpaper.",
    points: ["Clock, weather, music, lyrics, visualiser, battery…", "Drag by any part; right-click for shapes and sizes", "Arrange with SUPER + SHIFT + D"] },
  { id: "colour", title: "Dynamic colour", shot: "/shots/09.webp",
    text: "Pick a wallpaper and everything takes its palette.",
    points: ["Shell, terminal and prompt follow it", "Seven light palettes too", "Stills and video, a different one per screen"] },
  { id: "settings", title: "Settings", shot: "/shots/08.webp",
    text: "One place, with a search that takes you to the row.",
    points: ["Every shortcut can be changed", "Seven tabs", "Language switches on the spot"] },
  { id: "lock", title: "Lock and login", shot: "/shots/19.webp",
    text: "A lock screen with your widgets, and a login that matches.",
    points: ["Its own session-lock surface, PAM auth", "Music, notifications and the machine in three columns", "An SDDM theme in the palette of your wallpaper"] },
  { id: "screens", title: "Two screens", shot: "/shots/15.webp",
    text: "Arrange them on a grid, mirror one, or spread workspaces.",
    points: ["Each bar shows its own", "Widgets and wallpapers per screen", "The layout returns when a screen is plugged back in"] },
  { id: "time", title: "Screen time", shot: "/shots/20.webp",
    text: "How long each app had you, only while you are there.",
    points: ["Today and across the week", "A panel, a pill and a widget", "The numbers never leave your machine"] },
  { id: "timer", title: "Timer", shot: "/shots/14.webp",
    text: "Stopwatch, countdown and pomodoro in one panel.",
    points: ["25 minutes of focus, 5 of break, a long one every fourth", "A card heads the notifications while it runs", "SUPER + SHIFT + T"] },
  { id: "game", title: "Game mode", shot: "/shots/16.webp",
    text: "One key flattens the compositor and quiets the shell.",
    points: ["No animations, blur, shadows, rounding or gaps", "Then puts everything back as it was", "Your screen layout included"] },
  { id: "process", title: "Process monitor", shot: "/shots/13.webp",
    text: "CPU, GPU and traffic as the last minute of samples.",
    points: ["Memory, drives and temperatures as levels", "Drawn as ticks", "SUPER + SHIFT + P"] },
  { id: "lang", title: "Four languages", shot: "/shots/17.webp",
    text: "English, Español, Deutsch, Русский.",
    points: ["Switched on the spot", "Shortcut list, welcome and release notes follow", "Notes fall back to English"] },
];
