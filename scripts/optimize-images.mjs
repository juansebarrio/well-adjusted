/**
 * Optimises the images under public/essays in place.
 *
 *   node scripts/optimize-images.mjs
 *
 * For every PNG or JPG: caps the width at 1200px, recompresses the file under the
 * same name (the fallback), and writes a .webp next to it (the modern format).
 * The site serves both through <picture>; see src/plugins/rehype-exhibits.mjs.
 * Safe to run again: files that already have an up-to-date .webp are skipped.
 */
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const ROOT = 'public/essays';
const MAX_WIDTH = 1200;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

const kb = (n) => `${Math.round(n / 1024)} kB`;
let before = 0;
let after = 0;

for await (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;
  const webp = file.slice(0, -ext.length) + '.webp';
  const [src, done] = await Promise.all([stat(file), stat(webp).catch(() => null)]);
  if (done && done.mtimeMs >= src.mtimeMs) continue;

  const input = await readFile(file);
  const resized = () => sharp(input).rotate().resize({ width: MAX_WIDTH, withoutEnlargement: true });
  const fallback =
    ext === '.png'
      ? await resized().png({ palette: true, quality: 85, effort: 10, compressionLevel: 9 }).toBuffer()
      : await resized().jpeg({ quality: 80, mozjpeg: true }).toBuffer();
  const modern = await resized().webp({ quality: 80, effort: 6 }).toBuffer();

  const kept = Math.min(fallback.length, input.length);
  if (fallback.length < input.length) await writeFile(file, fallback);
  await writeFile(webp, modern);
  before += input.length;
  after += modern.length;
  console.log(`${file}: ${kb(input.length)} → ${kb(kept)} (${ext.slice(1)}), ${kb(modern.length)} (webp)`);
}
console.log(before ? `Total: ${kb(before)} → ${kb(after)} as webp` : 'Nothing to do.');
