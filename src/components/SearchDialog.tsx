import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowRight, CornerDownLeft, MessageCircle, Search, X } from 'lucide-react';
import { askAssistant } from '@/components/ChatWidget';
import type { Language } from '@/content';
import { normalize, search } from '@/lib/search-index';
import { cn } from '@/lib/utils';

const labels = {
  en: { open: 'Search the site', placeholder: 'Search: breast, screening, SHA, leaflets…', close: 'Close search', empty: 'No matches yet. Try another word, or ask the assistant.', ask: 'Ask the assistant', hint: 'Try:', tips: ['HPV vaccine', 'warning signs', 'SHA', 'children', 'leaflet'], results: 'results' },
  sw: { open: 'Tafuta kwenye tovuti', placeholder: 'Tafuta: matiti, uchunguzi, SHA, vipeperushi…', close: 'Funga utafutaji', empty: 'Hakuna matokeo bado. Jaribu neno jingine, au muulize msaidizi.', ask: 'Muulize msaidizi', hint: 'Jaribu:', tips: ['chanjo ya HPV', 'dalili', 'SHA', 'watoto', 'kipeperushi'], results: 'matokeo' },
};

function Highlight({ text, query }: { text: string; query: string }) {
  const terms = normalize(query).split(' ').filter(term => term.length >= 2).map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (!terms.length) return <>{text}</>;
  const pattern = new RegExp(`(${terms.join('|')})`, 'gi');
  return <>{text.split(pattern).map((part, index) => index % 2 === 1 ? <mark key={index} className="rounded bg-[#d9f0d4] px-0.5 text-ink">{part}</mark> : part)}</>;
}

export function SearchButton({ language, className }: { language: Language; className?: string }) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const text = labels[language];

  useEffect(() => {
    function onKey(event: globalThis.KeyboardEvent) {
      const target = event.target as HTMLElement;
      if (event.key === '/' && !open && !/input|textarea|select/i.test(target.tagName) && !target.isContentEditable) {
        event.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return <>
    <button ref={button} type="button" onClick={() => setOpen(true)} aria-label={text.open} title={`${text.open} (/)`} aria-haspopup="dialog" className={cn('grid size-11 shrink-0 place-items-center rounded-full border border-line text-ink transition hover:bg-mist', className)}><Search className="size-[18px]" aria-hidden="true" /></button>
    {open && <SearchDialog language={language} onClose={() => { setOpen(false); button.current?.focus(); }} />}
  </>;
}

function SearchDialog({ language, onClose }: { language: Language; onClose: () => void }) {
  const text = labels[language];
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const results = useMemo(() => search(query, language), [query, language]);

  useEffect(() => {
    input.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, []);
  useEffect(() => setActive(0), [query]);

  function go(href: string) {
    onClose();
    if (href === 'ask:') askAssistant(query.trim());
    else window.location.href = href;
  }

  function ask() {
    onClose();
    askAssistant(query.trim());
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const count = results.length + (query.trim() ? 1 : 0);
    if (event.key === 'Escape') { event.preventDefault(); onClose(); }
    else if (event.key === 'ArrowDown' && count) { event.preventDefault(); setActive(index => (index + 1) % count); }
    else if (event.key === 'ArrowUp' && count) { event.preventDefault(); setActive(index => (index - 1 + count) % count); }
    else if (event.key === 'Enter' && count) {
      event.preventDefault();
      if (active < results.length) go(results[active].href); else ask();
    }
  }

  return <div className="fixed inset-0 z-[70] flex items-start justify-center bg-ink/40 p-3 pt-[8vh] backdrop-blur-[2px] sm:p-6 sm:pt-[12vh]" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div role="dialog" aria-modal="true" aria-label={text.open} onKeyDown={onKeyDown} className="search-panel flex max-h-[80vh] w-full max-w-[640px] flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_30px_80px_#15352c40]">
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search className="size-5 shrink-0 text-forest" aria-hidden="true" />
        <input ref={input} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={text.placeholder} aria-label={text.open} aria-controls="search-results" aria-activedescendant={query ? `search-option-${active}` : undefined} role="combobox" aria-expanded={Boolean(query)} autoComplete="off" className="min-h-16 flex-1 bg-transparent text-[16px] outline-none placeholder:text-copy/70" />
        <button type="button" onClick={onClose} aria-label={text.close} className="grid size-9 place-items-center rounded-full text-copy hover:bg-mist"><X className="size-5" aria-hidden="true" /></button>
      </div>
      <div className="overflow-y-auto p-2">
        {!query.trim() ? <div className="flex flex-wrap items-center gap-2 p-3 text-[12px] text-copy">
          <span className="font-semibold">{text.hint}</span>
          {text.tips.map(tip => <button key={tip} type="button" onClick={() => setQuery(tip)} className="rounded-full bg-mist px-3 py-1.5 font-semibold text-forest hover:bg-line">{tip}</button>)}
        </div> : <>
          <p className="sr-only" aria-live="polite">{results.length} {text.results}</p>
          {results.length === 0 && <p className="p-4 text-[13px] text-copy">{text.empty}</p>}
          <ul id="search-results" role="listbox" aria-label={text.open}>
            {results.map((result, index) => <li key={`${result.href}-${result.title}-${index}`} id={`search-option-${index}`} role="option" aria-selected={active === index}>
              <a href={result.href === 'ask:' ? '#' : result.href} onClick={event => { event.preventDefault(); go(result.href); }} onMouseEnter={() => setActive(index)} className={cn('flex items-start gap-3 rounded-[14px] p-3', active === index && 'bg-mist')}>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-extrabold tracking-[.1em] text-leaf uppercase">{result.kind}</span>
                  <span className="mt-0.5 block text-[14px] font-bold text-ink"><Highlight text={result.title} query={query} /></span>
                  <span className="mt-0.5 line-clamp-2 block text-[12px] leading-[1.45] text-copy"><Highlight text={result.snippet} query={query} /></span>
                </span>
                {active === index ? <CornerDownLeft className="mt-5 size-4 shrink-0 text-forest" aria-hidden="true" /> : <ArrowRight className="mt-5 size-4 shrink-0 text-copy/50" aria-hidden="true" />}
              </a>
            </li>)}
            <li id={`search-option-${results.length}`} role="option" aria-selected={active === results.length}>
              <button type="button" onClick={ask} onMouseEnter={() => setActive(results.length)} className={cn('flex w-full items-center gap-3 rounded-[14px] p-3 text-left', active === results.length && 'bg-mist')}>
                <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-forest text-white"><MessageCircle className="size-4" /></span>
                <span className="text-[13px] font-bold text-forest">{text.ask}: <span className="font-normal text-ink">“{query.trim()}”</span></span>
              </button>
            </li>
          </ul>
        </>}
      </div>
    </div>
  </div>;
}
