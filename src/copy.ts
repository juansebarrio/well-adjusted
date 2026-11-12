/**
 * Every word of interface text lives here.
 * Lines marked // DRAFT were written as placeholders in the client's register
 * and are waiting for her to approve, rewrite or bin them.
 * Lines without the mark came from the brief and should stay verbatim.
 */

import { MASTHEAD_LOWERCASE } from './config';

export const site = {
  /** Plain name, for titles and metadata. */
  name: 'well adjusted, bb.',
  mastheadLead: MASTHEAD_LOWERCASE ? 'well adjusted,' : 'Well adjusted,',
  mastheadMark: 'bb.',
  tagline: 'Think Fairuz meets Freud.',
  taglineMarked: 'No one gets along.',
  whatItIs:
    'An institute of one, studying psychology, migration, identity and the general absurdity of being alive.',
  description:
    'An independent journal published by a very small institute. Psychology, migration, identity and the general absurdity of being alive.', // DRAFT
};

export const nav = [
  { href: '/the-thinking', label: 'Think' }, // DRAFT (labels)
  { href: '/projects', label: 'Take part' }, // DRAFT
  { href: '/read-something', label: 'Read something' },
  { href: '/say-hello', label: 'Say hello' },
];

export const bb = {
  caption: 'fig. 1 — bb., resident',
  alt: 'bb., a rounded figure with two eyes. It lives here.', // DRAFT
};

export const home = {
  title: 'well adjusted, bb. — The Institute Journal',
  notice: ['Notice no. 0001', 'Issued: today, probably', 'Valid until further notice'],
  issue: 'The Institute Journal · Issue 00',
  filedLabel: 'Filed',
  filed: [
    { field: 'Dept.', value: 'of Adjustment' },
    { field: 'Staff', value: '1' },
    { field: 'Funding', value: 'none' },
    { field: 'Peer review', value: 'the neighbour' },
  ],
  stamp: 'Received',
  specimensLabel: 'Specimens 01–03',
  specimensLede: 'Things the Institute runs, or intends to.', // DRAFT
  specimensAll: 'See the full register',
  closing: 'This notice was not approved. It was, however, printed.',
  notes: [
    'She was not asked. She reviews regardless.', // DRAFT
    'Intention is recorded as progress.', // DRAFT
  ],
};

export const enrolment = {
  field: 'Field 01 — Enrolment',
  heading: 'Enrol in the journal', // DRAFT
  lede: 'Essays from the Institute, sent by post that is not really post.', // DRAFT
  placeholder: 'your@address, bb.',
  inputLabel: 'Your email address',
  consent: 'I understand this is a newsletter, not a diagnosis.',
  button: 'Enrol me',
  micro: 'Opens Substack with your address filled in. Nothing is kept here.', // DRAFT
  repeated: 'Repeated, in case you skipped it',
  unset: 'Notice: the enrolment desk is not connected yet (SUBSTACK_URL).',
};

export const thinking = {
  title: 'The thinking',
  description: 'The manifesto of the Institute, such as it is.', // DRAFT
  formRef: 'Form WA-1/M',
  eyebrow: 'Statement of position',
  draftStamp: 'Draft',
  draftNotice: 'Placeholder text. The real statement is with the author.',
};

export const projects = {
  title: 'Projects',
  description: 'Specimens kept by the Institute: one open, the rest opening when they open.', // DRAFT
  formRef: 'Register WA-3/P',
  heading: 'The register of specimens', // DRAFT
  lede: 'Each project is an experiment in being a person near other people. Results vary.', // DRAFT
  live: 'Live',
  coming: 'Coming',
  comingLine: 'Opens when it opens.',
  back: 'Back to the register',
  placeholderNotice: 'Placeholder text. The author has not signed this off.',
};

export const letterOffice = {
  signupField: 'Field 02 — The Letter Office',
  signupHeading: 'Put your name down', // DRAFT
  formTitle: 'The Letter Office sign-up form',
  addressLabel: 'Re: your postal address',
  addressNote:
    'It is used to send you letters and for nothing else. It is held by the form provider, not on this site. It is not sold, shared or admired. Write and ask, and it is removed.', // DRAFT — confirm against how addresses are really handled
  unset: 'Notice: the sign-up form is not connected yet (TALLY_LETTER_OFFICE_URL).',
};

export const read = {
  title: 'Read something',
  description: 'Selected essays from the Institute Journal.', // DRAFT
  formRef: 'Index WA-7',
  heading: 'Read something', // DRAFT
  lede: 'Chosen essays. The rest live on Substack, where they were born.', // DRAFT
  empty: 'Nothing has been filed yet. The selection committee (staff: 1) is deliberating.', // DRAFT
  filedUnder: 'Filed under',
  readingTime: 'Reading time',
  readHere: 'Read it here',
  readOnSubstack: 'Read on Substack',
  draftLabel: 'Draft — not shown in production',
};

export const essay = {
  formRef: 'Form WA-7/E',
  stamp: 'Approved by no one',
  continue: 'Continue reading on Substack',
  back: 'Back to the index',
  notesHeading: 'Notes',
};

export const hello = {
  title: 'Say hello',
  description: 'How to reach the Institute. It reads everything.', // DRAFT
  formRef: 'Form WA-9/H',
  line: 'Write to the Institute. It reads everything, and answers most of it.', // DRAFT
  emailLabel: 'Direct line',
  emailMicro: 'Goes to a person. The only one.', // DRAFT
  formField: 'Field 03 — Correspondence',
  formTitle: 'The correspondence form',
  formMicro: 'Or use the form. Same desk, different drawer.', // DRAFT
  hours: 'Reply times: variable. Complaints: welcome, filed.', // DRAFT
  unsetEmail: 'Notice: no address on file yet (CONTACT_EMAIL).',
  unsetForm: 'Notice: the correspondence form is not connected yet (TALLY_CONTACT_URL).',
};

export const notFound = {
  title: 'Form not found',
  line: 'This page was requested. It was not located.', // DRAFT
  micro: 'Ref. 404 · Possibly misfiled · Possibly never existed', // DRAFT
  back: 'Return to the front desk', // DRAFT
};

export const footer = {
  line: 'well adjusted, bb. · an institute of one',
  substack: 'Substack',
  instagram: 'Instagram',
  /** One per page, picked by page path. All six are drafts. */
  rotating: [
    'Not approved. Printed anyway.', // DRAFT
    'Peer review pending since 2019.', // DRAFT
    'Funding: none. Morale: variable.', // DRAFT
    'The neighbour has been informed.', // DRAFT
    'Visiting hours: none.', // DRAFT
    'Staff: 1. Opinions: several.', // DRAFT
  ],
};

export const a11y = {
  skip: 'Skip to the content',
  navLabel: 'Sections',
  notesLabel: 'Notes',
  noteRef: 'Note',
};
