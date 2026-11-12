import { getCollection } from 'astro:content';
import { SHOW_DRAFTS } from './config';

/** Essays in index order. Drafts are included outside production only. */
export async function getEssays() {
  const all = await getCollection('essays', ({ data }) => SHOW_DRAFTS || !data.draft);
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** An essay gets its own page when its Markdown file has a body. */
export const hasBody = (entry: { body?: string }) => (entry.body ?? '').trim().length > 0;

/** Typographic quotes and apostrophes for text typed with straight ones. */
export const typo = (text: string | undefined) =>
  (text ?? '')
    .replace(/(^|[\s(\[])"/g, '$1\u201c')
    .replace(/"/g, '\u201d')
    .replace(/(^|[\s(\[])'/g, '$1\u2018')
    .replace(/'/g, '\u2019');
