import { useState } from 'react';
import { ArrowUpRight, RefreshCw } from 'lucide-react';
import type { Copy } from '@/content';
import { pageContainer, sectionKicker } from '@/lib/site-styles';
import { cn } from '@/lib/utils';

export function MythsSection({ myths }: { myths: Copy['myths'] }) {
  const [revealed, setRevealed] = useState<number[]>([]);

  function toggle(index: number) {
    setRevealed(current => current.includes(index) ? current.filter(item => item !== index) : [...current, index]);
  }

  return <section id="myths" aria-labelledby="myths-title" className="scroll-mt-4 bg-white py-12 md:py-16">
    <div className={pageContainer}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className={cn(sectionKicker, 'mb-3')}>{myths.kicker}</p>
          <h2 id="myths-title" className="text-[clamp(32px,3.4vw,48px)] leading-[1.08] font-bold tracking-[-.05em]">{myths.title}</h2>
          <p className="mt-3 text-[14px] text-copy">{myths.introduction}</p>
        </div>
        <p className="text-[12px] font-semibold text-forest" aria-live="polite">{revealed.length} / {myths.items.length}</p>
      </div>
      <ul className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {myths.items.map((item, index) => {
          const isFact = revealed.includes(index);
          return <li key={item.myth} className="myth-card h-[250px]">
            <button type="button" onClick={() => toggle(index)} aria-pressed={isFact} aria-label={`${isFact ? myths.factLabel : myths.mythLabel}: ${isFact ? item.fact : item.myth}. ${isFact ? myths.hide : myths.reveal}`} className={cn('myth-card-inner relative h-full w-full text-left', isFact && 'is-flipped')}>
              <span aria-hidden="true" className="myth-face absolute inset-0 flex flex-col rounded-[20px] border border-line bg-[#f6f2ea] p-6">
                <span className="w-fit rounded-full bg-[#ead9c4] px-3 py-1 text-[10px] font-extrabold tracking-[.12em] text-[#6b4a2b] uppercase">{myths.mythLabel}</span>
                <span className="mt-4 flex-1 text-[19px] leading-[1.3] font-bold tracking-[-.03em] text-ink">“{item.myth}”</span>
                <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-forest"><RefreshCw className="size-3.5" />{myths.reveal}</span>
              </span>
              <span aria-hidden="true" className="myth-face myth-back absolute inset-0 flex flex-col rounded-[20px] bg-forest p-6 text-white">
                <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-[10px] font-extrabold tracking-[.12em] uppercase">{myths.factLabel}</span>
                <span className="mt-4 flex-1 text-[14px] leading-[1.6]">{item.fact}</span>
                <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#c3e7bc]"><RefreshCw className="size-3.5" />{myths.hide}</span>
              </span>
            </button>
          </li>;
        })}
      </ul>
      <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-copy">{myths.reviewStatus}<a href="https://www.who.int/news-room/fact-sheets/detail/cancer" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-forest underline underline-offset-2">WHO<ArrowUpRight className="size-3" aria-hidden="true" /></a></p>
    </div>
  </section>;
}
