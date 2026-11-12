/**
 * Margin notes. On wide screens with a pointer, a note appears in the right
 * margin, level with its reference, while the reference is hovered or focused.
 * Everywhere else (and without JavaScript) the notes are plain footnotes.
 */
const wide = window.matchMedia('(min-width: 70rem) and (hover: hover)');
const refs = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[data-footnote-ref]'));

if (refs.length > 0) {
  document.documentElement.classList.add('notes-on');

  const slip = document.createElement('aside');
  slip.className = 'margin-slip';
  slip.setAttribute('aria-hidden', 'true'); // the reference already describes itself via aria-describedby
  document.body.append(slip);

  const hide = () => slip.classList.remove('is-on');

  for (const ref of refs) {
    const id = decodeURIComponent(ref.hash.slice(1));
    const note = document.getElementById(id);
    if (!note) continue;
    // Markdown footnotes point this at the section heading; point it at the note itself.
    ref.setAttribute('aria-describedby', id);

    const show = () => {
      if (!wide.matches) return;
      const column = ref.closest<HTMLElement>('[data-notes-column]') ?? ref.parentElement!;
      const box = column.getBoundingClientRect();
      const left = box.right + window.scrollX + 40;
      if (left + 216 > document.documentElement.clientWidth - 16) return;
      const copy = note.cloneNode(true) as HTMLElement;
      copy.querySelectorAll('[data-footnote-backref]').forEach((el) => el.remove());
      slip.textContent = copy.textContent?.trim() ?? '';
      slip.dataset.n = `Note ${ref.textContent?.trim() ?? ''}`;
      slip.style.left = `${left}px`;
      slip.style.top = `${ref.getBoundingClientRect().top + window.scrollY - 6}px`;
      slip.classList.add('is-on');
    };

    const annotated = ref.closest('sup')?.previousElementSibling;
    const targets: Element[] = [ref];
    if (annotated?.hasAttribute('data-annot')) targets.push(annotated);
    for (const el of targets) {
      el.addEventListener('mouseenter', show);
      el.addEventListener('mouseleave', hide);
    }
    ref.addEventListener('focus', show);
    ref.addEventListener('blur', hide);
    ref.addEventListener('click', (event) => {
      // In the margin layout the foot-of-page list may be hidden; don't jump to nowhere.
      if (wide.matches && note.offsetParent === null) event.preventDefault();
    });
  }

  window.addEventListener('keydown', (event) => event.key === 'Escape' && hide());
  wide.addEventListener('change', hide);
}
