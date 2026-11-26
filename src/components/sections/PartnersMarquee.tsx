import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import type { Copy } from '@/content';
import { organisations, type Organisation } from '@/data/partners';
import { pageContainer, sectionKicker } from '@/lib/site-styles';
import { cn } from '@/lib/utils';

function Mark({ organisation }: { organisation: Organisation }) {
  const body = <>
    {organisation.logo
      ? <img src={organisation.logo} alt="" className="h-8 w-auto max-w-[90px] object-contain" />
      : <span aria-hidden="true" className="grid h-10 min-w-10 place-items-center rounded-full bg-forest px-2 text-[11px] font-extrabold tracking-[.04em] text-white">{organisation.short ?? organisation.name.slice(0, 2)}</span>}
    <span className="text-[14px] font-bold whitespace-nowrap text-ink">{organisation.name}</span>
    {organisation.url && <ArrowUpRight className="size-3.5 text-forest opacity-0 transition group-hover:opacity-100" aria-hidden="true" />}
  </>;
  const className = 'group flex items-center gap-3 rounded-full border border-line bg-white py-2 pr-5 pl-2 shadow-[0_6px_18px_#07533108] transition hover:border-leaf hover:shadow-[0_10px_24px_#07533114]';
  return organisation.url
    ? <a href={organisation.url} target="_blank" rel="noopener noreferrer" className={className}>{body}</a>
    : <span className={className}>{body}</span>;
}

export function PartnersMarquee({ content }: { content: Copy['partners'] }) {
  const [paused, setPaused] = useState(false);
  const partners = organisations.filter(item => item.kind === 'partner');
  const showPartners = partners.length > 0;
  const list = showPartners ? partners : organisations;

  return <section id="partners" aria-labelledby="partners-title" className="scroll-mt-4 border-y border-line bg-[#f6faf4] py-10 md:py-12">
    <div className={cn(pageContainer, 'flex flex-wrap items-end justify-between gap-4')}>
      <div>
        <p className={cn(sectionKicker, 'mb-2')}>{showPartners ? content.partnersKicker : content.sourcesKicker}</p>
        <h2 id="partners-title" className="text-[clamp(22px,2.4vw,32px)] leading-[1.15] font-bold tracking-[-.04em]">{showPartners ? content.partnersTitle : content.sourcesTitle}</h2>
      </div>
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? content.play : content.pause} title={paused ? content.play : content.pause} className="grid size-10 place-items-center rounded-full border border-line bg-white text-forest hover:bg-mist">{paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}</button>
        <a href="/get-involved/" className="inline-flex min-h-10 items-center gap-2 rounded-full bg-forest px-4 text-[12px] font-bold text-white hover:bg-ink">{content.becomePartner}<ArrowRight className="size-4" aria-hidden="true" /></a>
      </div>
    </div>
    <div className={cn('marquee mt-7', paused && 'is-paused')}>
      <ul className="marquee-track" aria-label={showPartners ? content.partnersKicker : content.sourcesKicker}>
        {list.map(item => <li key={item.name}><Mark organisation={item} /></li>)}
      </ul>
      <ul className="marquee-track" aria-hidden="true">
        {list.map(item => <li key={item.name} inert><Mark organisation={item} /></li>)}
      </ul>
    </div>
  </section>;
}
