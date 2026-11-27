import { getCollection, getEntry } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { SHOW_DRAFTS } from './config';

/** Essays in index order. Drafts (status: draft) are included outside production only. */
export async function getEssays() {
  const all = await getCollection('essays', ({ data }) => SHOW_DRAFTS || data.status === 'final');
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** "Field Report No. 002" */
export const essayLabel = (entry: CollectionEntry<'essays'>) => `${entry.data.kind} No. ${entry.data.number}`;

/** The home page's own lines, from content/pages/home.md. */
export async function getHome() {
  const entry = await getEntry('pages', 'home');
  if (!entry) throw new Error('content/pages/home.md is missing');
  const { lede, question, motto, institute_name } = entry.data;
  if (!lede || !question || !motto || !institute_name) {
    throw new Error('content/pages/home.md needs lede, question, motto and institute_name');
  }
  return { lede, question, motto, instituteName: institute_name };
}

/** Typographic quotes and apostrophes for text typed with straight ones. */
export const typo = (text: string | undefined) =>
  (text ?? '')
    .replace(/(^|[\s(\[])"/g, '$1“')
    .replace(/"/g, '”')
    .replace(/(^|[\s(\[])'/g, '$1‘')
    .replace(/'/g, '’');
