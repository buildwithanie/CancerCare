import { ArrowLeft, Clock3, FileSearch, MessageSquare, ShieldCheck } from 'lucide-react';
import type { Copy, Language } from '@/content';
import { DirectorySection } from '@/components/sections/DirectorySection';
import { pageContainer, sectionKicker } from '@/lib/site-styles';
import { cn } from '@/lib/utils';

const stepIcons = [FileSearch, MessageSquare, ShieldCheck] as const;

export function FindCarePage({ content, directory, pilot, language }: { content: Copy['findCarePage']; directory: Copy['directory']; pilot: Copy['pilot']; language: Language }) {
  return <>
    <section className="relative overflow-hidden bg-[#eaf4e9] py-12 md:py-16">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-44 size-[540px] rounded-full border-[90px] border-white/35" />
      <div className={cn(pageContainer, 'relative grid items-center gap-9 md:grid-cols-[1.1fr_.9fr] md:gap-14')}>
        <div>
          <a href="/" className="mb-8 inline-flex items-center gap-2 text-[12px] font-semibold text-forest hover:underline"><ArrowLeft className="size-4" aria-hidden="true" />{content.backHome}</a>
          <p className={cn(sectionKicker, 'mb-4')}>{content.eyebrow}</p>
          <h1 className="max-w-[690px] text-[clamp(42px,5vw,67px)] leading-[1] font-bold tracking-[-.06em] text-ink">{content.title}</h1>
          <p className="mt-6 max-w-[620px] text-[15px] leading-[1.7] text-copy md:text-[17px]">{content.description}</p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-forest/20 bg-white/80 px-4 py-2 text-[12px] font-bold text-forest"><Clock3 className="size-4" aria-hidden="true" />{content.status}</p>
        </div>
        <figure className="rounded-[22px] border border-white/70 bg-white/75 p-5 shadow-[0_20px_45px_#0753310c] sm:p-7">
          <img src="/embu-county-map.svg" alt={pilot.mapAlt} width="560" height="300" className="mx-auto aspect-[1.45] w-full object-contain" />
          <figcaption className="mt-3 border-t border-line pt-3 text-[11px] leading-[1.5] text-copy">{pilot.mapSource} <a href="https://www.geoboundaries.org/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">geoBoundaries</a></figcaption>
        </figure>
      </div>
    </section>
    <DirectorySection directory={directory} language={language} />
    <section aria-labelledby="verification-title" className="bg-[#f3f8f2] py-12 md:py-16">
      <div className={pageContainer}>
        <div className="max-w-[720px]">
          <p className={cn(sectionKicker, 'mb-3')}>{directory.status}</p>
          <h2 id="verification-title" className="text-[clamp(31px,3.5vw,48px)] leading-[1.08] font-bold tracking-[-.05em]">{content.processTitle}</h2>
          <p className="mt-4 text-[14px] leading-[1.7] text-copy">{content.processIntro}</p>
        </div>
        <ol className="mt-8 grid gap-3 md:grid-cols-3">
          {content.steps.map((step, index) => { const Icon = stepIcons[index] ?? FileSearch; return <li key={step.title} className="rounded-[17px] border border-line bg-white p-6"><div className="flex items-center justify-between"><span aria-hidden="true" className="grid size-11 place-items-center rounded-full bg-mist text-forest"><Icon className="size-5" /></span><span className="text-[11px] font-extrabold text-leaf">0{index + 1}</span></div><h3 className="mt-5 text-[21px] font-bold tracking-[-.035em]">{step.title}</h3><p className="mt-2 text-[13px] leading-[1.6] text-copy">{step.description}</p></li>; })}
        </ol>
      </div>
    </section>
  </>;
}
