// A bump of height around the pointer: 1 under it, the base far away, a smooth
// fall between (a gaussian). `center` and `pointer` are in the same units (px).
export function waveScale(center: number, pointer: number | null, base = 0.3, sigma = 110): number {
  if (pointer === null) return base;
  const d = (center - pointer) / sigma;
  return base + (1 - base) * Math.exp(-d * d);
}
