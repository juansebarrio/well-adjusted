import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Content lives in /content as Markdown. One file = one essay, project or page.
 * The file name (without .md) becomes the URL slug.
 */

const essays = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/essays' }),
  schema: z.object({
    title: z.string(),
    deck: z.string(),
    filedUnder: z.string(),
    readingTime: z.string(),
    substackUrl: z.url().optional(),
    excerpt: z.string().optional(),
    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/projects' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['live', 'coming']),
    ref: z.string(),
    blurb: z.string().optional(),
    cta: z.string().optional(),
    order: z.number().default(100),
    /** false → listed in the register, but no page of its own yet. */
    page: z.boolean().default(true),
    /** true → the page shows a "placeholder text" notice. */
    placeholder: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/pages' }),
  schema: z.object({
    title: z.string(),
    deck: z.string().optional(),
    /** true → the page carries a DRAFT stamp and a notice. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { essays, projects, pages };
