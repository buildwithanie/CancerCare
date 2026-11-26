import { useRef } from 'react';
import { Check, Phone, Printer, Send, ShieldCheck } from 'lucide-react';
import { Brand } from '@/components/Brand';
import { ReadAloudButton } from '@/components/ReadAloud';
import type { Language } from '@/content';
import type { PagesCopy } from '@/content-pages';
import { printOnly } from '@/lib/print';
import { pageContainer } from '@/lib/site-styles';
import { cn } from '@/lib/utils';
import { PageIntro } from './PageIntro';

type Leaflet = PagesCopy['resources']['leaflets'][number];

function leafletText(leaflet: Leaflet) {
  return [leaflet.title, leaflet.intro, `${leaflet.signsTitle}:`, ...leaflet.signs.map(item => `- ${item}`), `${leaflet.preventTitle}:`, ...leaflet.prevent.map(item => `- ${item}`), `${leaflet.actTitle}:`, ...leaflet.act.map(item => `- ${item}`)].join('\n');
}

function LeafletCard({ leaflet, content, language, speech }: { leaflet: Leaflet; content: PagesCopy['resources']; language: Language; speech: PagesCopy['speech'] }) {
  const sheet = useRef<HTMLElement>(null);
  const url = `${window.location.origin}/resources/#${leaflet.id}`;
  const list = (title: string, items: string[], tone: string) => <div>
    <h3 className={cn('text-[11px] font-extrabold tracking-[.1em] uppercase', tone)}>{title}</h3>
    <ul className="mt-2.5 space-y-2">{items.map(item => <li key={item} className="flex gap-2 text-[13px] leading-[1.45] text-ink"><Check className="mt-0.5 size-4 shrink-0 text-forest" aria-hidden="true" />{item}</li>)}</ul>
  </div>;

  return <li id={leaflet.id} className="scroll-mt-6">
    <article ref={sheet} aria-labelledby={`${leaflet.id}-title`} className="leaflet flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-white shadow-[0_14px_34px_#0753310d]">
      <header className="bg-forest px-6 py-5 text-white">
        <div className="flex items-center justify-between gap-3"><Brand light /><span className="text-[10px] font-bold tracking-[.1em] uppercase opacity-80">cancercare · Embu</span></div>
        <h2 id={`${leaflet.id}-title`} className="mt-4 text-[28px] leading-[1.1] font-bold tracking-[-.04em]">{leaflet.title}</h2>
      </header>
      <div className="flex flex-1 flex-col gap-5 p-6">
        <p className="text-[14px] leading-[1.6] text-copy">{leaflet.intro}</p>
        <div className="grid gap-5 sm:grid-cols-2">
          {list(leaflet.signsTitle, leaflet.signs, 'text-[#9a3b1e]')}
          <div className="space-y-5">{list(leaflet.preventTitle, leaflet.prevent, 'text-forest')}{list(leaflet.actTitle, leaflet.act, 'text-leaf')}</div>
        </div>
        <footer className="mt-auto flex items-start gap-2 rounded-[12px] bg-mist p-3 text-[11px] leading-[1.5] text-copy">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-forest" aria-hidden="true" />
          <span>{content.footer} <strong className="inline-flex items-center gap-1 text-ink"><Phone className="size-3" aria-hidden="true" />999 / 112</strong></span>
        </footer>
      </div>
    </article>
    <div className="mt-3 flex flex-wrap gap-2 print:hidden">
      <button type="button" onClick={() => printOnly(sheet.current)} className="inline-flex min-h-10 items-center gap-2 rounded-full bg-forest px-4 text-[12px] font-bold text-white hover:bg-ink"><Printer className="size-4" aria-hidden="true" />{content.print}</button>
      <a href={`https://wa.me/?text=${encodeURIComponent(`${leaflet.title} — CancerCare\n${url}`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#e7f6ea] px-4 text-[12px] font-bold text-forest hover:bg-mist"><Send className="size-4" aria-hidden="true" />{content.share}</a>
      <ReadAloudButton text={leafletText(leaflet)} language={language} labels={speech} className="min-h-10 px-4 text-[12px]" />
    </div>
  </li>;
}

export function ResourcesPage({ content, language, speech }: { content: PagesCopy['resources']; language: Language; speech: PagesCopy['speech'] }) {
  return <>
    <PageIntro eyebrow={content.eyebrow} title={content.title} description={content.description} backHome={content.backHome} />
    <section className="bg-[#f6faf4] py-12 md:py-16">
      <ul className={cn(pageContainer, 'grid gap-8 lg:grid-cols-2')}>
        {content.leaflets.map(leaflet => <LeafletCard key={leaflet.id} leaflet={leaflet} content={content} language={language} speech={speech} />)}
      </ul>
    </section>
  </>;
}
