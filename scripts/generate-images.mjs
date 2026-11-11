// Generates the responsive image variants served from public/images/.
//
// Source photos live in src/assets/images/. For every source and every width
// in WIDTHS this writes public/images/<name>-<width>.webp (never upscaled: a
// source narrower than a width is written at its own size under that name, so
// the image loader can always rely on every width existing). It also writes
// the Open Graph card public/og.jpg.
//
// Run `npm run images` after adding or replacing a source photo, then commit
// the output. WIDTHS must match images.deviceSizes + images.imageSizes in
// next.config.ts.
import { mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export const WIDTHS = [480, 768, 1080, 1536];
const SRC = path.resolve("src/assets/images");
const OUT = path.resolve("public/images");
const OG_SOURCE = "kitchen.webp";

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const sources = (await readdir(SRC)).filter((f) => f.endsWith(".webp"));
for (const file of sources) {
  const name = path.basename(file, ".webp");
  for (const width of WIDTHS) {
    const info = await sharp(path.join(SRC, file))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 74, effort: 6, smartSubsample: true })
      .toFile(path.join(OUT, `${name}-${width}.webp`));
    console.log(
      `${name}-${width}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`,
    );
  }
}

const og = await sharp(path.join(SRC, OG_SOURCE))
  .resize({ width: 1200, height: 630, fit: "cover", position: "right" })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(path.resolve("public/og.jpg"));
console.log(`og.jpg  ${og.width}x${og.height}  ${(og.size / 1024).toFixed(0)} KB`);
