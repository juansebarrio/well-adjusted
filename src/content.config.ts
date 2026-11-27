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
    /** The label of the piece: "Field Report No. 002". */
    kind: z.enum(['Bulletin', 'Field Report', 'Case Study']),
    /** Kept as text so "002" keeps its zeros. Quote it in the file. */
    number: z.string(),
    /** The form reference printed in the meta line: "WA-7/E". */
    form: z.string(),
    filedUnder: z.string(),
    readingTime: z.string(),
    /** final → published. draft → visible in dev and previews only. */
    status: z.enum(['draft', 'final']).default('draft'),
    order: z.number().default(100),
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
  }),
});

/** about.md is the /the-thinking page. home.md holds the home page's own lines. */
const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/pages' }),
  schema: z.object({
    title: z.string().optional(),
    deck: z.string().optional(),
    form: z.string().optional(),
    status: z.enum(['draft', 'final']).optional(),
    /** Path under /public of the image shown beside the About text. */
    portrait: z.string().optional(),
    // home.md
    lede: z.string().optional(),
    question: z.string().optional(),
    motto: z.string().optional(),
    institute_name: z.string().optional(),
  }),
});

export const collections = { essays, projects, pages };
