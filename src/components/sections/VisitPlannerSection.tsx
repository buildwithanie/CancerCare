import { useRef, useState, type FormEvent } from 'react';
import { printOnly } from '@/lib/print';
import { Check, ClipboardCopy, Plus, Printer, Send, X } from 'lucide-react';
import type { Copy } from '@/content';
import { pageContainer, sectionKicker } from '@/lib/site-styles';
import { cn } from '@/lib/utils';

export function VisitPlannerSection({ planner }: { planner: Copy['visitPlanner'] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [custom, setCustom] = useState<string[]>([]);
  const [draft, setDraft] = useState('');
  const [copied, setCopied] = useState(false);
  const card = useRef<HTMLDivElement>(null);
  const list = [...selected, ...custom];
  const listText = `${planner.listHeading}\n\n${list.map((question, index) => `${index + 1}. ${question}`).join('\n')}`;

  function toggle(question: string) {
    setSelected(current => current.includes(question) ? current.filter(item => item !== question) : [...current, question]);
  }

  function addCustom(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = draft.trim().slice(0, 160);
    if (question && !list.includes(question)) setCustom(current => [...current, question]);
    setDraft('');
  }

  function remove(question: string) {
    setSelected(current => current.filter(item => item !== question));
    setCustom(current => current.filter(item => item !== question));
  }

  async function copyList() {
    try {
      await navigator.clipboard.writeText(listText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch { /* clipboard unavailable */ }
  }

  const actionClass = 'inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-[12px] font-bold transition disabled:pointer-events-none disabled:opacity-40';

  return <section id="visit-questions" aria-labelledby="visit-title" className="scroll-mt-4 bg-[#f3f8f2] py-12 md:py-16">
    <div className={cn(pageContainer, 'grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-12')}>
      <div className="print:hidden">
        <p className={cn(sectionKicker, 'mb-3')}>{planner.kicker}</p>
        <h2 id="visit-title" className="max-w-[560px] text-[clamp(32px,3.4vw,48px)] leading-[1.08] font-bold tracking-[-.05em]">{planner.title}</h2>
        <p className="mt-4 max-w-[560px] text-[14px] leading-[1.7] text-copy">{planner.introduction}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {planner.groups.map(group => <fieldset key={group.title} className="rounded-[16px] border border-line bg-white p-4">
            <legend className="sr-only">{group.title}</legend>
            <p aria-hidden="true" className="text-[11px] font-extrabold tracking-[.08em] text-forest uppercase">{group.title}</p>
            <div className="mt-3 grid gap-2">{group.questions.map(question => {
              const checked = selected.includes(question);
              return <label key={question} className={cn('flex cursor-pointer items-start gap-2.5 rounded-[10px] p-2 text-[13px] leading-[1.45] transition', checked ? 'bg-mist text-ink' : 'hover:bg-sand')}>
                <input type="checkbox" checked={checked} onChange={() => toggle(question)} className="peer sr-only" />
                <span aria-hidden="true" className={cn('mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-[5px] border transition peer-focus-visible:ring-2 peer-focus-visible:ring-leaf', checked ? 'border-forest bg-forest text-white' : 'border-input bg-white')}>{checked && <Check className="size-3.5" />}</span>
                {question}
              </label>;
            })}</div>
          </fieldset>)}
        </div>
        <form onSubmit={addCustom} className="mt-4 flex flex-wrap items-end gap-2">
          <label className="min-w-[220px] flex-1 text-[12px] font-bold text-ink">{planner.customLabel}
            <input value={draft} onChange={event => setDraft(event.target.value)} maxLength={160} placeholder={planner.customPlaceholder} className="mt-1.5 block min-h-11 w-full rounded-[12px] border border-input bg-white px-3.5 text-[14px] font-normal outline-none focus:border-forest focus:ring-2 focus:ring-forest/20" />
          </label>
          <button type="submit" disabled={!draft.trim()} className={cn(actionClass, 'min-h-11 bg-forest text-white hover:bg-ink')}><Plus className="size-4" aria-hidden="true" />{planner.addAction}</button>
        </form>
      </div>

      <div ref={card} className="rounded-[20px] border border-forest/25 bg-white p-6 shadow-[0_16px_40px_#07533112] lg:sticky lg:top-6 lg:self-start">
        <h3 className="text-[20px] font-bold tracking-[-.03em]"><span className="print:hidden">{planner.selectedTitle}</span><span className="hidden print:inline">{planner.listHeading}</span></h3>
        <p className="mt-1 text-[11px] text-copy print:hidden">{planner.privacyNote}</p>
        {list.length === 0
          ? <p className="mt-5 rounded-[14px] border border-dashed border-input bg-sand p-5 text-center text-[13px] text-copy">{planner.emptySelection}</p>
          : <ol className="mt-5 space-y-2" aria-live="polite">{list.map((question, index) => <li key={question} className="flex items-start gap-3 rounded-[12px] bg-sand px-3 py-2.5 text-[13px] leading-[1.45]">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-forest text-[11px] font-bold text-white">{index + 1}</span>
            <span className="flex-1 pt-0.5">{question}</span>
            <button type="button" onClick={() => remove(question)} aria-label={`${planner.remove}: ${question}`} className="grid size-6 shrink-0 place-items-center rounded-full text-copy hover:bg-line print:hidden"><X className="size-3.5" aria-hidden="true" /></button>
          </li>)}</ol>}
        <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5 print:hidden">
          <button type="button" disabled={!list.length} onClick={() => printOnly(card.current)} className={cn(actionClass, 'bg-forest text-white hover:bg-ink')}><Printer className="size-4" aria-hidden="true" />{planner.printAction}</button>
          <button type="button" disabled={!list.length} onClick={() => void copyList()} className={cn(actionClass, 'bg-white text-forest ring-1 ring-forest hover:bg-mist')}>{copied ? <Check className="size-4" aria-hidden="true" /> : <ClipboardCopy className="size-4" aria-hidden="true" />}<span aria-live="polite">{copied ? planner.copiedLabel : planner.copyAction}</span></button>
          <a href={`https://wa.me/?text=${encodeURIComponent(listText)}`} target="_blank" rel="noopener noreferrer" aria-disabled={!list.length} onClick={event => { if (!list.length) event.preventDefault(); }} className={cn(actionClass, 'bg-[#e7f6ea] text-forest hover:bg-mist', !list.length && 'pointer-events-none opacity-40')}><Send className="size-4" aria-hidden="true" />{planner.whatsappAction}</a>
        </div>
      </div>
    </div>
  </section>;
}
