import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import type { Copy } from '@/content';
import { pageContainer, sectionKicker } from '@/lib/site-styles';
import { cn } from '@/lib/utils';

const kenyaGuideline = 'https://www.afro.who.int/sites/default/files/2025-03/National%20Cancer%20Screening%20Guidelines%202024.pdf';
const whoFactSheet = 'https://www.who.int/news-room/fact-sheets/detail/cancer';

export function ScreeningGuideSection({ screening }: { screening: Copy['screening'] }) {
  const [selectedId, setSelectedId] = useState<Copy['screening']['paths'][number]['id']>('considering');
  const selected = screening.paths.find(path => path.id === selectedId) ?? screening.paths[0];

  return <section id="screening" aria-labelledby="screening-title" className="bg-white py-12 md:py-16">
    <div className={pageContainer}>
      <div className="grid gap-6 md:grid-cols-[.85fr_1.15fr] md:gap-12">
        <div>
          <p className={cn(sectionKicker, 'mb-3')}>{screening.kicker}</p>
          <h2 id="screening-title" className="max-w-[530px] text-[clamp(32px,3.4vw,48px)] leading-[1.08] font-bold tracking-[-.05em]">{screening.title}</h2>
          <p className="mt-4 max-w-[500px] text-[14px] leading-[1.7] text-copy">{screening.introduction}</p>
          <p className="mt-4 max-w-[500px] text-[12px] font-medium text-copy">{screening.privacyNote}</p>
        </div>
        <div>
          <div role="group" aria-label={screening.title} className="grid gap-2 sm:grid-cols-3">
            {screening.paths.map(path => <button key={path.id} type="button" aria-pressed={selectedId === path.id} onClick={() => setSelectedId(path.id)} className={cn('min-h-20 rounded-[15px] border px-4 py-3 text-left text-[13px] leading-[1.35] font-bold transition-colors', selectedId === path.id ? 'border-forest bg-forest text-white' : 'border-line bg-[#f8faf7] text-ink hover:border-leaf hover:bg-mist')}>{path.label}</button>)}
          </div>
          <div role="region" aria-live="polite" className="mt-3 rounded-[18px] border border-line bg-[#f3f8f2] p-6 sm:p-7">
            <h3 className="text-[clamp(23px,2.3vw,32px)] leading-[1.15] font-bold tracking-[-.04em]">{selected.heading}</h3>
            <p className="mt-3 max-w-[680px] text-[14px] leading-[1.7] text-copy">{selected.explanation}</p>
            <div className="mt-5 border-t border-line pt-5">
              <h4 id="screening-questions" className="scroll-mt-6 text-[12px] font-extrabold tracking-[.08em] text-forest uppercase">{screening.questionsTitle}</h4>
              <ul className="mt-3 grid gap-2">{selected.questions.map(question => <li key={question} className="flex items-start gap-2 text-[13px] leading-[1.5] text-ink"><Check className="mt-0.5 size-4 shrink-0 text-forest" aria-hidden="true" />{question}</li>)}</ul>
            </div>
            <a href="/find-care/" className="mt-6 inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 text-[12px] font-bold text-forest ring-1 ring-forest hover:bg-mist">{screening.directoryAction}<ArrowRight className="size-4" aria-hidden="true" /></a>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 text-[11px] leading-[1.5] text-copy">
        <span>{screening.reviewStatus}</span>
        <span className="font-bold text-forest">{screening.sourcesTitle}:</span>
        <a href={kenyaGuideline} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-forest">{screening.kenyaSource}<ArrowUpRight className="size-3" aria-hidden="true" /></a>
        <a href={whoFactSheet} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-forest">{screening.whoSource}<ArrowUpRight className="size-3" aria-hidden="true" /></a>
      </div>
    </div>
  </section>;
}
