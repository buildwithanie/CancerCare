import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import type { Copy } from '@/content';
import { pageContainer, sectionKicker } from '@/lib/site-styles';
import { cn } from '@/lib/utils';

export function LearnSection({ learn }: { learn: Copy['learn'] }) {
  return <section id="learn" aria-labelledby="learn-title" className="bg-[#f3f8f2] py-12 md:py-16">
    <div className={cn(pageContainer, 'grid gap-7 lg:grid-cols-[.7fr_1.3fr] lg:gap-14')}>
      <div>
        <p className={cn(sectionKicker, 'mb-3')}>{learn.kicker}</p>
        <h2 id="learn-title" className="max-w-[460px] text-[clamp(32px,3.4vw,48px)] leading-[1.08] font-bold tracking-[-.05em]">{learn.title}</h2>
        <p className="mt-4 max-w-[470px] text-[13px] leading-[1.65] text-copy">{learn.introduction}</p>
        <p className="mt-5 w-fit rounded-full border border-line bg-white px-3 py-1.5 text-[11px] font-semibold text-forest">{learn.reviewStatus}</p>
      </div>
      <div>
        <div className="space-y-3">
          {learn.items.map((item, index) => <details key={item.question} open={index === 0} className="group rounded-[16px] border border-line bg-white px-5 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-bold tracking-[-.025em] marker:hidden [&::-webkit-details-marker]:hidden"><span>{item.question}</span><Plus aria-hidden="true" className="size-5 shrink-0 text-forest transition-transform group-open:rotate-45" /></summary>
            <p className="mt-3 max-w-[650px] border-t border-line pt-3 text-[13px] leading-[1.7] text-copy">{item.answer}</p>
            {item.source && <a href={item.source.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-forest underline underline-offset-2">{item.source.label}<ArrowUpRight className="size-3" aria-hidden="true" /></a>}
          </details>)}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <a href="#screening" className="inline-flex min-h-10 items-center gap-2 rounded-full bg-forest px-4 text-[12px] font-bold text-white hover:bg-ink">{learn.guideAction}<ArrowRight className="size-4" aria-hidden="true" /></a>
          <a href="https://www.who.int/news-room/fact-sheets/detail/cancer" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[12px] font-bold text-forest underline underline-offset-4">{learn.sourceLabel}<ArrowUpRight className="size-4" aria-hidden="true" /></a>
        </div>
      </div>
    </div>
  </section>;
}
