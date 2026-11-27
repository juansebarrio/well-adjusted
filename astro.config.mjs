import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import rehypeRaw from 'rehype-raw';
import rehypeExhibits from './src/plugins/rehype-exhibits.mjs';

// metadataBase. The apex moves to this project at launch (see README).
const SITE = 'https://welladjustedbb.com';

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [sitemap()],
  // rehype-raw first, so the author's hand-written <figure> blocks are real elements
  // by the time the exhibits plugin looks for them.
  markdown: { rehypePlugins: [rehypeRaw, rehypeExhibits] },
  // No base64 fonts inside the CSS: every font stays a separate, cacheable file.
  vite: { plugins: [tailwindcss()], build: { assetsInlineLimit: 0 } },
});
