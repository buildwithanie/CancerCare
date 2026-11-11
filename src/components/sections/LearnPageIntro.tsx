import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Copy, Language } from '@/content';
import { pageContainer, sectionKicker } from '@/lib/site-styles';
import { cn } from '@/lib/utils';

const destinations = ['#learn', '#screening', '#screening-questions'] as const;

export function LearnPageIntro({ content, language }: { content: Copy['learnPage']; language: Language }) {
  return <section className="relative overflow-hidden bg-[#eaf4e9] py-12 md:py-16">
    <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-40 size-[510px] rounded-full border-[90px] border-white/35" />
    <div className={cn(pageContainer, 'relative grid items-center gap-9 md:grid-cols-[1.1fr_.9fr] md:gap-14')}>
      <div>
        <a href="/" className="mb-8 inline-flex items-center gap-2 text-[12px] font-semibold text-forest hover:underline"><ArrowLeft className="size-4" aria-hidden="true" />{content.backHome}</a>
        <p className={cn(sectionKicker, 'mb-4')}>{content.eyebrow}</p>
        <h1 className="max-w-[680px] text-[clamp(43px,5.2vw,70px)] leading-[.98] font-bold tracking-[-.065em] text-ink">{content.title}</h1>
        <p className="mt-6 max-w-[620px] text-[15px] leading-[1.7] text-copy md:text-[17px]">{content.description}</p>
      </div>
      <nav aria-label={language === 'sw' ? 'Hatua za kujifunza' : 'Learning steps'} className="rounded-[22px] border border-white/70 bg-white/75 p-5 shadow-[0_20px_45px_#0753310c] sm:p-7">
        <ol className="relative space-y-3 before:absolute before:bottom-8 before:left-[21px] before:top-8 before:w-px before:bg-line">
          {content.steps.map((step, index) => <li key={step} className="relative"><a href={destinations[index]} className="group flex min-h-16 items-center gap-4 rounded-[14px] border border-line bg-white px-4 py-3 hover:border-leaf hover:bg-mist"><span aria-hidden="true" className="relative z-[1] grid size-11 shrink-0 place-items-center rounded-full bg-forest text-[12px] font-bold text-white">0{index + 1}</span><span className="flex-1 text-[15px] font-bold text-ink">{step}</span><ArrowRight className="size-4 shrink-0 text-forest transition-transform group-hover:translate-x-1" aria-hidden="true" /></a></li>)}
        </ol>
      </nav>
    </div>
  </section>;
}
