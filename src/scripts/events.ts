/**
 * Plausible custom events. No content, no addresses: only names and slugs.
 *   enrol_click {page} · project_open {slug} · essay_open {slug, destination}
 *   letter_office_signup · contact_open
 * Markup opts in with data-event="name" and optional data-props='{"k":"v"}'.
 * Outside production there is no Plausible script and these calls do nothing.
 */
type Plausible = (name: string, options?: { props?: Record<string, string> }) => void;
const send: Plausible = (name, options) => (window as unknown as { plausible?: Plausible }).plausible?.(name, options);

const fire = (el: HTMLElement) => {
  const name = el.dataset.event;
  if (!name) return;
  const props = el.dataset.props ? (JSON.parse(el.dataset.props) as Record<string, string>) : undefined;
  send(name, props ? { props } : undefined);
};

document.addEventListener('click', (event) => {
  const el = (event.target as Element | null)?.closest<HTMLElement>('[data-event]:not([data-event-on])');
  if (el) fire(el);
});

document.addEventListener('submit', (event) => {
  const el = event.target as HTMLElement | null;
  if (el?.matches('[data-event][data-event-on="submit"]')) fire(el);
});

// Tally announces a completed form with a postMessage from its iframe.
window.addEventListener('message', (event) => {
  if (typeof event.data !== 'string' || !event.data.includes('Tally.FormSubmitted')) return;
  for (const frame of document.querySelectorAll<HTMLIFrameElement>('iframe[data-tally-event]')) {
    if (frame.contentWindow === event.source && frame.dataset.tallyEvent) send(frame.dataset.tallyEvent);
  }
});
