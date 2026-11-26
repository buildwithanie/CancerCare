import { useEffect, useRef, useState } from 'react';
import { Contrast, RotateCcw, Type } from 'lucide-react';
import type { Language } from '@/content';
import { applyReading, loadReading, type Reading } from '@/lib/reading';
import { cn } from '@/lib/utils';

const labels = {
  en: { button: 'Text size', title: 'Reading options', size: 'Text size', sizes: ['Normal', 'Large', 'Larger'], contrast: 'High contrast', reset: 'Reset' },
  sw: { button: 'Ukubwa wa herufi', title: 'Chaguo za kusoma', size: 'Ukubwa wa herufi', sizes: ['Kawaida', 'Kubwa', 'Kubwa zaidi'], contrast: 'Rangi zenye utofauti mkubwa', reset: 'Rudisha' },
};

export function ReadingControls({ language }: { language: Language }) {
  const [reading, setReading] = useState<Reading>(loadReading);
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const text = labels[language];

  useEffect(() => applyReading(reading), [reading]);
  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => { if (!wrapper.current?.contains(event.target as Node)) setOpen(false); };
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('pointerdown', onPointer);
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('pointerdown', onPointer); window.removeEventListener('keydown', onKey); };
  }, [open]);

  return <div ref={wrapper} className="relative">
    <button type="button" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls="reading-options" className="inline-flex min-h-7 items-center gap-1.5 rounded-full px-2.5 font-semibold hover:bg-white/15">
      <Type className="size-3.5" aria-hidden="true" /><span>{text.button}</span>
    </button>
    <div id="reading-options" hidden={!open} role="group" aria-label={text.title} className="absolute top-full right-0 z-40 mt-2 w-[260px] rounded-[18px] border border-line bg-white p-4 text-ink shadow-[0_20px_50px_#15352c30]">
      <p className="text-[11px] font-extrabold tracking-[.08em] text-forest uppercase">{text.size}</p>
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {text.sizes.map((label, index) => <button key={label} type="button" aria-pressed={reading.size === index} onClick={() => setReading(current => ({ ...current, size: index as Reading['size'] }))} className={cn('flex min-h-14 flex-col items-center justify-center rounded-[12px] border text-[11px] font-semibold', reading.size === index ? 'border-forest bg-forest text-white' : 'border-line hover:bg-mist')}>
          <span aria-hidden="true" className="font-bold" style={{ fontSize: 14 + index * 4 }}>A</span>{label}
        </button>)}
      </div>
      <button type="button" role="switch" aria-checked={reading.contrast} onClick={() => setReading(current => ({ ...current, contrast: !current.contrast }))} className="mt-3 flex min-h-11 w-full items-center justify-between gap-3 rounded-[12px] border border-line px-3 text-[13px] font-semibold hover:bg-mist">
        <span className="inline-flex items-center gap-2"><Contrast className="size-4 text-forest" aria-hidden="true" />{text.contrast}</span>
        <span aria-hidden="true" className={cn('relative h-6 w-10 rounded-full transition', reading.contrast ? 'bg-forest' : 'bg-line')}><span className={cn('absolute top-1 size-4 rounded-full bg-white transition-all', reading.contrast ? 'left-5' : 'left-1')} /></span>
      </button>
      <button type="button" onClick={() => setReading({ size: 0, contrast: false })} className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-semibold text-copy hover:text-forest"><RotateCcw className="size-3.5" aria-hidden="true" />{text.reset}</button>
    </div>
  </div>;
}
