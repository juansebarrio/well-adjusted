import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// metadataBase. The apex moves to this project at launch (see README).
const SITE = 'https://welladjustedbb.com';

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      // Drafts are noindex and only exist outside production; keep them out anyway.
      filter: (page) => !page.includes('/placeholder'),
    }),
  ],
  // No base64 fonts inside the CSS: every font stays a separate, cacheable file.
  vite: { plugins: [tailwindcss()], build: { assetsInlineLimit: 0 } },
});
