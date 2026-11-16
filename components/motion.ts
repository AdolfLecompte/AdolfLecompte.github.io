// Users who ask for less motion get the final state at once.
export function reduced(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
