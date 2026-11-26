import { CalendarHeart, MessageCircle } from 'lucide-react';
import { askAssistant } from '@/components/ChatWidget';
import type { Copy } from '@/content';
import { pageContainer, sectionKicker } from '@/lib/site-styles';
import { cn } from '@/lib/utils';

export function AwarenessSection({ content }: { content: Copy['awareness'] }) {
  const month = new Date().getMonth() + 1;
  return <section id="awareness" aria-labelledby="awareness-title" className="bg-white py-12 md:py-16">
    <div className={pageContainer}>
      <p className={cn(sectionKicker, 'mb-3')}>{content.kicker}</p>
      <h2 id="awareness-title" className="text-[clamp(32px,3.4vw,48px)] leading-[1.08] font-bold tracking-[-.05em]">{content.title}</h2>
      <p className="mt-3 max-w-[620px] text-[14px] leading-[1.7] text-copy">{content.introduction}</p>
      <ol className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {content.items.map(item => {
          const current = item.month === month;
          return <li key={item.title}>
            <button type="button" onClick={() => askAssistant(item.question)} className={cn('group flex h-full w-full flex-col rounded-[18px] border p-5 text-left transition hover:-translate-y-1', current ? 'border-forest bg-forest text-white shadow-[0_16px_34px_#07533130]' : 'border-line bg-[#f8faf6] hover:border-leaf hover:bg-mist')}>
              <span className="flex items-center justify-between gap-2">
                <span className={cn('inline-flex items-center gap-1.5 text-[11px] font-extrabold tracking-[.08em] uppercase', current ? 'text-[#c3e7bc]' : 'text-leaf')}><CalendarHeart className="size-4" aria-hidden="true" />{item.when}</span>
                {current && <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-forest">{content.nowLabel}</span>}
              </span>
              <span className="mt-3 text-[16px] leading-[1.25] font-bold tracking-[-.02em]">{item.title}</span>
              <span className={cn('mt-2 flex-1 text-[12px] leading-[1.55]', current ? 'text-white/85' : 'text-copy')}>{item.text}</span>
              <span className={cn('mt-4 inline-flex items-center gap-1.5 text-[12px] font-bold', current ? 'text-white' : 'text-forest')}><MessageCircle className="size-3.5" aria-hidden="true" />{content.askAction}</span>
            </button>
          </li>;
        })}
      </ol>
    </div>
  </section>;
}
