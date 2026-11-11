// Custom next/image loader for the static export. Every photo in
// src/assets/images/ is pre-rendered by scripts/generate-images.mjs at the
// widths below, so `/images/kitchen` + width 768 -> /images/kitchen-768.webp.
const WIDTHS = [480, 768, 1080, 1536];

export default function imageLoader({ src, width }: { src: string; width: number }) {
  const best = WIDTHS.find((w) => w >= width) ?? WIDTHS[WIDTHS.length - 1];
  return `${src}-${best}.webp`;
}
