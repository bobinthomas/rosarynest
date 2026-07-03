// One-off build-time helper — NOT a runtime dependency. Uses `sharp`, which is
// already present in node_modules as a transitive dependency of Next.js itself,
// so this doesn't add anything new to package.json.
//
// Converts every referenced JPG/PNG in public/images to a same-named .webp
// sibling, generates a few smaller responsive widths, and writes a manifest
// to src/lib/image-manifest.json that <SiteImage> reads at build time for
// width/height, the WebP fallback, and a srcset so mobile doesn't download
// desktop-resolution files.
import sharp from "sharp";
import { readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const imagesDir = path.resolve("public/images");
const manifestPath = path.resolve("src/lib/image-manifest.json");

// Only generate a breakpoint if the source is meaningfully larger than it —
// no point creating an "800w" variant that's just the 820px original again.
const BREAKPOINTS = [480, 800, 1200];

const files = (await readdir(imagesDir)).filter((f) => /\.(jpe?g|png)$/i.test(f));

const manifest = {};
let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const inputPath = path.join(imagesDir, file);
  const base = file.replace(/\.(jpe?g|png)$/i, "");
  const outputFile = `${base}.webp`;
  const outputPath = path.join(imagesDir, outputFile);

  const image = sharp(inputPath);
  const meta = await image.metadata();
  const before = (await stat(inputPath)).size;

  await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
  const after = (await stat(outputPath)).size;

  totalBefore += before;
  totalAfter += after;

  const srcsetParts = [];
  for (const width of BREAKPOINTS) {
    if (!meta.width || meta.width <= width * 1.15) continue; // don't upscale or near-duplicate
    const variantFile = `${base}-${width}w.webp`;
    await sharp(inputPath).resize({ width }).webp({ quality: 80 }).toFile(path.join(imagesDir, variantFile));
    srcsetParts.push(`/images/${variantFile} ${width}w`);
  }
  srcsetParts.push(`/images/${outputFile} ${meta.width}w`);

  manifest[`/images/${file}`] = {
    width: meta.width,
    height: meta.height,
    webp: `/images/${outputFile}`,
    srcset: srcsetParts.join(", "),
  };

  console.log(
    `${file}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB (+${srcsetParts.length - 1} responsive variant(s))`
  );
}

await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(
  `\nDone. ${files.length} images. Total ${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB (full-size webp only; responsive variants add a bit more on disk, none are ever downloaded together).`
);
console.log(`Manifest written to ${manifestPath}`);
