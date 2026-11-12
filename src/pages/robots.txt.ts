import type { APIRoute } from 'astro';
import { IS_PRODUCTION } from '../config';

// Previews are kept out of search engines; production is open.
export const GET: APIRoute = ({ site }) => {
  const body = IS_PRODUCTION
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', site).href}\n`
    : `User-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
