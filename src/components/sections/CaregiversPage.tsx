import { useRef } from 'react';
import { AlertTriangle, Baby, Check, HeartHandshake, MessageCircle, MessagesSquare, Phone, Printer, Soup, Sprout } from 'lucide-react';
import { askAssistant } from '@/components/ChatWidget';
import { ReadAloudButton } from '@/components/ReadAloud';
import type { Language } from '@/content';
import type { CaregiverCopy } from '@/content-caregivers';
import type { PagesCopy } from '@/content-pages';
import { printOnly } from '@/lib/print';
import { pageContainer } from '@/lib/site-styles';
import { cn } from '@/lib/utils';
import { PageIntro } from './PageIntro';

const icons = { practical: Soup, emotional: HeartHandshake, 'self-care': Sprout, children: Baby, 'care-team': MessagesSquare } as const;

export function CaregiversPage({ content, language, speech }: { content: CaregiverCopy; language: Language; speech: PagesCopy['speech'] }) {
  const body = useRef<HTMLDivElement>(null);
  return <>
    <PageIntro eyebrow={content.eyebrow} title={content.title} description={content.description} backHome={content.backHome}>
      <nav aria-label={content.jump} className="mt-7 flex flex-wrap gap-2">
        {content.sections.map(section => <a key={section.id} href={`#${section.id}`} className="rounded-full border border-forest/25 bg-white/80 px-3.5 py-2 text-[12px] font-bold text-forest hover:border-forest hover:bg-white">{section.title}</a>)}
      </nav>
    </PageIntro>

    <section className="bg-white py-10 md:py-14">
      <div ref={body} className={cn(pageContainer, 'grid gap-8 lg:grid-cols-[1fr_320px] lg:gap-12')}>
        <div className="space-y-5">
          <aside role="note" className="flex gap-3 rounded-[18px] border border-[#f1b8ac] bg-[#fff4f1] p-5 text-[#7a1d0f]">
            <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            <div>
              <h2 className="text-[16px] font-bold">{content.urgentTitle}</h2>
              <p className="mt-1 text-[13px] leading-[1.6]">{content.urgentText}</p>
              <span className="mt-3 flex gap-2 print:hidden">{['999', '112'].map(number => <a key={number} href={`tel:${number}`} className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-[#b3261e] px-3.5 text-[12px] font-bold text-white"><Phone className="size-3.5" aria-hidden="true" />{number}</a>)}</span>
            </div>
          </aside>
          {content.sections.map(section => {
            const Icon = icons[section.id as keyof typeof icons] ?? HeartHandshake;
            return <article key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-6 rounded-[20px] border border-line bg-[#f8faf6] p-6 sm:p-7">
              <div className="flex flex-wrap items-start gap-4">
                <span aria-hidden="true" className="grid size-12 shrink-0 place-items-center rounded-full bg-forest text-white"><Icon className="size-6" /></span>
                <div className="min-w-0 flex-1">
                  <h2 id={`${section.id}-title`} className="text-[clamp(22px,2.2vw,28px)] leading-[1.15] font-bold tracking-[-.035em]">{section.title}</h2>
                  <p className="mt-1.5 text-[14px] text-copy">{section.intro}</p>
                </div>
                <span className="print:hidden"><ReadAloudButton text={[section.title, section.intro, ...section.points].join('. ')} language={language} labels={speech} /></span>
              </div>
              <ul className="mt-5 grid gap-2.5">{section.points.map(point => <li key={point} className="flex gap-2.5 text-[14px] leading-[1.55] text-ink"><Check className="mt-0.5 size-4 shrink-0 text-forest" aria-hidden="true" />{point}</li>)}</ul>
            </article>;
          })}
          <p className="text-[11px] text-copy">{content.review}</p>
        </div>
        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start print:hidden">
          <div className="rounded-[20px] bg-forest p-6 text-white">
            <MessageCircle className="size-6" aria-hidden="true" />
            <h2 className="mt-3 text-[19px] font-bold tracking-[-.02em]">{content.askTitle}</h2>
            <p className="mt-2 text-[13px] leading-[1.6] text-white/85">{content.askText}</p>
            <button type="button" onClick={() => askAssistant(content.askQuestion)} className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full bg-white px-4 text-[12px] font-bold text-forest hover:bg-mist">{content.askAction}</button>
          </div>
          <button type="button" onClick={() => printOnly(body.current)} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-forest px-4 text-[13px] font-bold text-forest hover:bg-mist"><Printer className="size-4" aria-hidden="true" />{content.printAction}</button>
        </aside>
      </div>
    </section>
  </>;
}
