/**
 * Build-time configuration. Everything here is read once, when the site is built.
 * Nothing is stored anywhere and nothing reaches the browser except what the pages print.
 */

const clean = (value: string | undefined) => (value ?? '').trim().replace(/\/+$/, '');

export const SITE_URL = 'https://welladjustedbb.com';
export const SITE_DOMAIN = 'welladjustedbb.com';

/**
 * The masthead is set in lowercase: "well adjusted, bb."
 * Flip to false for an initial capital ("Well adjusted, bb.") if the client asks.
 */
export const MASTHEAD_LOWERCASE = true;

/**
 * 'custom' → the institute's own form, which hands the address to Substack.
 * 'embed'  → Substack's official iframe (components/SubstackEmbed.astro). Ready, switched off.
 */
export const ENROLMENT_MODE: 'custom' | 'embed' = 'custom';

export const SUBSTACK_URL = clean(process.env.SUBSTACK_URL ?? import.meta.env.SUBSTACK_URL);
export const INSTAGRAM_URL = clean(process.env.INSTAGRAM_URL ?? import.meta.env.INSTAGRAM_URL);
export const CONTACT_EMAIL = clean(process.env.CONTACT_EMAIL ?? import.meta.env.CONTACT_EMAIL);
export const TALLY_LETTER_OFFICE_URL = clean(
  process.env.TALLY_LETTER_OFFICE_URL ?? import.meta.env.TALLY_LETTER_OFFICE_URL,
);
export const TALLY_CONTACT_URL = clean(
  process.env.TALLY_CONTACT_URL ?? import.meta.env.TALLY_CONTACT_URL,
);
export const PLAUSIBLE_SRC = clean(process.env.PLAUSIBLE_SRC ?? import.meta.env.PLAUSIBLE_SRC);

/** True only on the Vercel production deployment (the apex domain). */
export const IS_PRODUCTION = process.env.VERCEL_ENV === 'production';

/** Drafts (draft: true) exist in dev and in previews, never in production. */
export const SHOW_DRAFTS = !IS_PRODUCTION;

/** Plausible loads in production only, and only if a script URL was given. */
export const ANALYTICS_ON = IS_PRODUCTION && PLAUSIBLE_SRC !== '';
