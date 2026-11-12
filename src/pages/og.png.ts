import type { APIRoute } from 'astro';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { site, home } from '../copy';

/** The share image: the masthead on paper. Drawn once, at build time. */

const font = (pkg: string, file: string) => readFile(join(process.cwd(), 'node_modules', pkg, 'files', file));

type Node = { type: string; props: Record<string, unknown> };
const el = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style, children },
});

const PAPER = '#F4F1EA';
const INK = '#141311';
const BLUE = '#4F67B1';
const LIME = '#D4F23A';

export const GET: APIRoute = async () => {
  const [bodoni, bodoniItalic, mono] = await Promise.all([
    font('@fontsource/libre-bodoni', 'libre-bodoni-latin-400-normal.woff'),
    font('@fontsource/libre-bodoni', 'libre-bodoni-latin-400-italic.woff'),
    font('@fontsource/jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff'),
  ]);

  const monoLine = { fontFamily: 'Mono', fontSize: 20, letterSpacing: 0.5 };

  const tree = el(
    'div',
    {
      width: 1200,
      height: 630,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: PAPER,
      color: INK,
      padding: '56px 72px',
    },
    [
      el(
        'div',
        { display: 'flex', flexDirection: 'column', width: '100%' },
        [
          el('div', { ...monoLine, display: 'flex', width: '100%', justifyContent: 'space-between', color: '#55514A' }, [
            el('div', { display: 'flex' }, home.notice[0]),
            el('div', { display: 'flex' }, home.issue),
          ]),
          el('div', { display: 'flex', width: '100%', height: 1, backgroundColor: BLUE, marginTop: 18 }),
        ],
      ),
      el('div', { display: 'flex', flexDirection: 'column' }, [
        el('div', { display: 'flex', fontFamily: 'Bodoni', fontSize: 132, letterSpacing: -5, lineHeight: 1 }, [
          el('div', { display: 'flex' }, site.mastheadLead),
          el('div', { display: 'flex', color: BLUE, marginLeft: 30 }, site.mastheadMark),
        ]),
        el(
          'div',
          { display: 'flex', alignItems: 'center', fontFamily: 'Bodoni', fontStyle: 'italic', fontSize: 44, marginTop: 36 },
          [
            el('div', { display: 'flex' }, site.tagline),
            el('div', { display: 'flex', backgroundColor: LIME, padding: '2px 12px 6px', marginLeft: 12 }, site.taglineMarked),
          ],
        ),
      ]),
      el('div', { ...monoLine, display: 'flex', color: BLUE }, 'welladjustedbb.com · an institute of one'),
    ],
  );

  const svg = await satori(tree as never, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Bodoni', data: bodoni, weight: 400, style: 'normal' },
      { name: 'Bodoni', data: bodoniItalic, weight: 400, style: 'italic' },
      { name: 'Mono', data: mono, weight: 400, style: 'normal' },
    ],
  });

  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
