/**
 * Exhibits are the <figure class="exhibit"> blocks the author places by hand in an essay.
 * This plugin, at build time:
 *   - wraps each exhibit image in <picture> with the .webp made by scripts/optimize-images.mjs,
 *     keeping the original file as the fallback;
 *   - writes width and height so the page does not jump while images load;
 *   - loads an exhibit that opens the piece eagerly, and every other one lazily;
 *   - drops HTML comments, so the author's working notes stay in the Markdown file.
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const PUBLIC = join(process.cwd(), 'public');

const hasClass = (node, name) => {
  const cls = node.properties?.className;
  return Array.isArray(cls) ? cls.includes(name) : typeof cls === 'string' && cls.split(/\s+/).includes(name);
};

export default function rehypeExhibits() {
  return async (tree) => {
    const images = [];

    const walk = (node, inExhibit) => {
      if (!node.children) return;
      node.children = node.children.filter((child) => child.type !== 'comment');
      for (const child of node.children) {
        const exhibit = inExhibit || (child.type === 'element' && child.tagName === 'figure' && hasClass(child, 'exhibit'));
        if (exhibit && child.type === 'element' && child.tagName === 'img') images.push({ img: child, parent: node });
        walk(child, exhibit);
      }
    };
    walk(tree, false);

    // Only an exhibit that opens the piece is loaded eagerly.
    const opener = tree.children.find((node) => node.type === 'element');
    let first = Boolean(opener && opener.tagName === 'figure' && hasClass(opener, 'exhibit'));
    for (const { img, parent } of images) {
      const src = String(img.properties.src ?? '');
      const file = join(PUBLIC, src);
      if (!src.startsWith('/') || !existsSync(file)) {
        throw new Error(`Exhibit image not found in /public: ${src}`);
      }
      const { width, height } = await sharp(file).metadata();
      Object.assign(img.properties, {
        width,
        height,
        alt: img.properties.alt ?? '',
        decoding: 'async',
        loading: first ? 'eager' : 'lazy',
        ...(first ? { fetchpriority: 'high' } : {}),
      });
      first = false;

      const webp = src.replace(/\.(png|jpe?g)$/i, '.webp');
      if (webp === src || !existsSync(join(PUBLIC, webp))) continue;
      const picture = {
        type: 'element',
        tagName: 'picture',
        properties: {},
        children: [{ type: 'element', tagName: 'source', properties: { srcset: webp, type: 'image/webp' }, children: [] }, img],
      };
      parent.children[parent.children.indexOf(img)] = picture;
    }
  };
}
