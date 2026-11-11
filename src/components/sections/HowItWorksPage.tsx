import { ArrowLeft, ArrowRight, BookOpen, Ear, RefreshCw, ShieldCheck } from 'lucide-react';
import type { Copy } from '@/content';
import { pageContainer, sectionKicker } from '@/lib/site-styles';
import { cn } from '@/lib/utils';

const stepIcons = [Ear, ShieldCheck, RefreshCw] as const;

export function HowItWorksPage({ content, pilot }: { content: Copy['howPage']; pilot: Copy['pilot'] }) {
  return <>
    <section className="relative overflow-hidden bg-[#eaf4e9] py-12 md:py-16">
      <div aria-hidden="true" className="pointer-events-none absolute -right-36 -top-48 size-[580px] rounded-full border-[90px] border-white/35" />
      <div className={cn(pageContainer, 'relative grid gap-10 lg:grid-cols-[1fr_.82fr] lg:items-center lg:gap-16')}>
        <div>
          <a href="/" className="mb-8 inline-flex items-center gap-2 text-[12px] font-semibold text-forest hover:underline"><ArrowLeft className="size-4" aria-hidden="true" />{content.backHome}</a>
          <p className={cn(sectionKicker, 'mb-4')}>{content.eyebrow}</p>
          <h1 className="max-w-[680px] text-[clamp(43px,5vw,70px)] leading-[.98] font-bold tracking-[-.065em] text-ink">{content.title}</h1>
          <p className="mt-6 max-w-[610px] text-[15px] leading-[1.7] text-copy md:text-[17px]">{content.description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="/learn/" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-forest px-5 text-[12px] font-bold text-white hover:bg-ink"><BookOpen className="size-4" aria-hidden="true" />{content.exploreLearn}<ArrowRight className="size-4" aria-hidden="true" /></a>
            <a href="/find-care/" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-forest px-5 text-[12px] font-bold text-forest hover:bg-white">{content.exploreCare}<ArrowRight className="size-4" aria-hidden="true" /></a>
          </div>
        </div>
        <aside aria-labelledby="pilot-state-title" className="overflow-hidden rounded-[23px] border border-white/80 bg-white shadow-[0_20px_45px_#0753310c]">
          <div className="bg-[#f6faf5] px-6 pt-5 sm:px-7">
            <h2 id="pilot-state-title" className="text-[21px] font-bold tracking-[-.035em]">{content.stateTitle}</h2>
            <figure className="mt-2">
              <img src="/embu-county-map.svg" alt={pilot.mapAlt} width="560" height="300" className="mx-auto aspect-[1.7] max-h-[210px] w-full object-contain" />
              <figcaption className="pb-3 text-[10px] text-copy">{pilot.mapSource} <a href="https://www.geoboundaries.org/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">geoBoundaries</a></figcaption>
            </figure>
          </div>
          <dl className="divide-y divide-line px-6 sm:px-7">
            <div className="py-4"><dt className="text-[11px] font-bold tracking-[.1em] text-leaf uppercase">{content.availableLabel}</dt><dd className="mt-1 text-[13px] leading-[1.55] text-ink">{content.availableText}</dd></div>
            <div className="py-4"><dt className="text-[11px] font-bold tracking-[.1em] text-leaf uppercase">{content.pendingLabel}</dt><dd className="mt-1 text-[13px] leading-[1.55] text-ink">{content.pendingText}</dd></div>
          </dl>
        </aside>
      </div>
    </section>

    <section aria-labelledby="pilot-process-title" className="bg-white py-14 md:py-20">
      <div className={pageContainer}>
        <p className={cn(sectionKicker, 'mb-3')}>{content.processKicker}</p>
        <div className="grid gap-4 md:grid-cols-[.85fr_1fr] md:gap-12">
          <h2 id="pilot-process-title" className="max-w-[510px] text-[clamp(36px,4.2vw,58px)] leading-[1.02] font-bold tracking-[-.055em]">{content.processTitle}</h2>
          <p className="max-w-[540px] text-[15px] leading-[1.7] text-copy md:pt-2">{content.processIntro}</p>
        </div>
        <ol className="mt-9 border-t border-line">
          {content.steps.map((step, index) => { const Icon = stepIcons[index] ?? Ear; return <li key={step.title} className="grid gap-4 border-b border-line py-7 md:grid-cols-[70px_minmax(180px,.65fr)_1fr_auto] md:items-start md:gap-6 md:py-9">
            <span aria-hidden="true" className="grid size-12 place-items-center rounded-full bg-mist text-forest"><Icon className="size-6" /></span>
            <h3 className="text-[24px] leading-[1.12] font-bold tracking-[-.04em] md:pt-2">{step.title}</h3>
            <p className="max-w-[580px] text-[14px] leading-[1.7] text-copy md:pt-2">{step.description}</p>
            <span className="w-fit rounded-full border border-line bg-[#f7faf6] px-3 py-1.5 text-[10px] font-bold tracking-[.06em] text-forest uppercase md:mt-2">{content.stepStates[index]}</span>
          </li>; })}
        </ol>
      </div>
    </section>

    <section aria-labelledby="readiness-title" className="bg-[#f3f8f2] py-14 md:py-18">
      <div className={pageContainer}>
        <div className="grid gap-8 rounded-[23px] bg-forest p-7 text-white md:grid-cols-[.85fr_1fr] md:gap-12 md:p-12">
          <div>
            <p className="text-[11px] font-bold tracking-[.13em] text-[#c5e8bf] uppercase">{content.readinessKicker}</p>
            <h2 id="readiness-title" className="mt-3 max-w-[440px] text-[clamp(32px,3.5vw,48px)] leading-[1.08] font-bold tracking-[-.05em]">{content.readinessTitle}</h2>
            <p className="mt-4 max-w-[430px] text-[14px] leading-[1.65] text-white/80">{content.readinessIntro}</p>
          </div>
          <ul className="divide-y divide-white/20 border-t border-white/20 md:border-t-0">
            {content.checks.map((check, index) => <li key={check.title} className="grid grid-cols-[32px_1fr] gap-3 py-4"><span aria-hidden="true" className="pt-0.5 text-[11px] font-bold text-[#c5e8bf]">0{index + 1}</span><div><h3 className="text-[17px] font-bold">{check.title}</h3><p className="mt-1 text-[12px] leading-[1.6] text-white/80">{check.description}</p></div></li>)}
          </ul>
        </div>
      </div>
    </section>
  </>;
}
