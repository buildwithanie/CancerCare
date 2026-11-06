import { ArrowRight, ChartNoAxesColumnIncreasing, Ear, ShieldCheck } from 'lucide-react';
import type { Copy } from '@/content';
import { pageContainer, sectionKicker } from '@/lib/site-styles';
import { cn } from '@/lib/utils';

const icons = [Ear, ShieldCheck, ChartNoAxesColumnIncreasing] as const;

export function PilotSection({ pilot }: { pilot: Copy['pilot'] }) {
  return <section id="pilot" aria-labelledby="pilot-title" className="bg-white pb-9 md:pb-12">
    <div className={pageContainer}>
      <div className="grid gap-8 rounded-[24px] bg-mist px-6 py-8 md:px-8 lg:grid-cols-[1.05fr_.85fr_.92fr] lg:items-center lg:gap-8 lg:py-10">
        <div>
          <p className={cn(sectionKicker, 'mb-3')}>{pilot.kicker}</p>
          <h2 id="pilot-title" className="max-w-[430px] text-[clamp(29px,3vw,43px)] leading-[1.08] font-bold tracking-[-.05em]">{pilot.title}</h2>
          <p className="mt-4 max-w-[400px] text-[13px] leading-[1.6] text-copy">{pilot.description}</p>
          <a href="#directory" className="mt-5 inline-flex min-h-10 items-center gap-3 rounded-full border border-forest bg-white px-4 text-[12px] font-bold text-forest hover:bg-[#f2f9f0]">{pilot.action}<ArrowRight className="size-4" aria-hidden="true" /></a>
        </div>
        <figure className="border-y border-leaf/25 py-5 lg:border-y-0 lg:border-x lg:px-5 lg:py-0">
          <img src="/embu-county-map.svg" alt={pilot.mapAlt} width="560" height="300" loading="lazy" className="mx-auto aspect-[1.25] max-h-[240px] w-full object-contain" />
          <figcaption className="mt-1 text-center text-[10px] text-copy">{pilot.mapSource} <a href="https://www.geoboundaries.org/" className="underline underline-offset-2">geoBoundaries</a></figcaption>
        </figure>
        <div>
          <p className={cn(sectionKicker, 'mb-4')}>{pilot.mapKicker}</p>
          <ol className="space-y-4">
            {pilot.steps.map((step, index) => { const Icon = icons[index] ?? Ear; return <li key={step.title} className="flex items-start gap-3"><span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full bg-[#d9ecd8] text-forest"><Icon className="size-5" /></span><div><h3 className="text-[16px] font-bold leading-[1.2]">{step.title}</h3><p className="mt-1 text-[11px] leading-[1.5] text-copy">{step.description}</p></div></li>; })}
          </ol>
        </div>
      </div>
    </div>
  </section>;
}
