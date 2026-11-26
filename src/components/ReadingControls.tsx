import { useEffect, useRef, useState } from 'react';
import { Minus, Plus, RotateCcw, SlidersHorizontal } from 'lucide-react';
import type { Language } from '@/content';
import { applyReading, defaultReading, loadReading, scaleRange, type Reading, type Theme } from '@/lib/reading';
import { cn } from '@/lib/utils';

const labels = {
  en: {
    button: 'Display', title: 'Display options', size: 'Text size', smaller: 'Smaller text', larger: 'Larger text', presets: 'Quick sizes',
    preview: 'Clear information. Closer care.', colours: 'Colours',
    themes: { standard: 'Standard', contrast: 'High contrast', dark: 'Dark', soft: 'Soft' } as Record<Theme, string>,
    themeHints: { standard: 'Site colours', contrast: 'Strongest text', dark: 'Easy at night', soft: 'Warm, less glare' } as Record<Theme, string>,
    spacing: 'Wider line spacing', calm: 'Pause animations', reset: 'Reset all',
  },
  sw: {
    button: 'Mwonekano', title: 'Chaguo za mwonekano', size: 'Ukubwa wa herufi', smaller: 'Herufi ndogo zaidi', larger: 'Herufi kubwa zaidi', presets: 'Ukubwa wa haraka',
    preview: 'Taarifa zilizo wazi. Huduma karibu.', colours: 'Rangi',
    themes: { standard: 'Kawaida', contrast: 'Utofauti mkubwa', dark: 'Giza', soft: 'Laini' } as Record<Theme, string>,
    themeHints: { standard: 'Rangi za tovuti', contrast: 'Maandishi makali', dark: 'Rahisi usiku', soft: 'Joto, mng\'ao mdogo' } as Record<Theme, string>,
    spacing: 'Nafasi pana kati ya mistari', calm: 'Simamisha michoro inayosonga', reset: 'Rudisha yote',
  },
};

const swatches: Record<Theme, { bg: string; fg: string; accent: string }> = {
  standard: { bg: '#fbfcf9', fg: '#15352c', accent: '#075331' },
  contrast: { bg: '#ffffff', fg: '#000000', accent: '#003d20' },
  dark: { bg: '#111a16', fg: '#e8f1ea', accent: '#7fd19b' },
  soft: { bg: '#f6efe0', fg: '#3a3127', accent: '#5f6b3a' },
};

const presets = [100, 120, 140];

function Switch({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return <button type="button" role="switch" aria-checked={checked} onClick={onChange} className="flex min-h-11 w-full items-center justify-between gap-3 rounded-[12px] border border-line px-3 text-left text-[13px] font-semibold hover:bg-mist">
    {label}
    <span aria-hidden="true" className={cn('relative h-6 w-10 shrink-0 rounded-full transition', checked ? 'bg-forest' : 'bg-line')}><span className={cn('absolute top-1 size-4 rounded-full bg-white shadow transition-all', checked ? 'left-5' : 'left-1')} /></span>
  </button>;
}

export function ReadingControls({ language }: { language: Language }) {
  const [reading, setReading] = useState<Reading>(loadReading);
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const text = labels[language];
  const update = (change: Partial<Reading>) => setReading(current => ({ ...current, ...change }));
  const changed = JSON.stringify(reading) !== JSON.stringify(defaultReading);

  useEffect(() => applyReading(reading), [reading]);
  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => { if (!wrapper.current?.contains(event.target as Node)) setOpen(false); };
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('pointerdown', onPointer);
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('pointerdown', onPointer); window.removeEventListener('keydown', onKey); };
  }, [open]);

  const step = (direction: 1 | -1) => update({ scale: Math.min(scaleRange.max, Math.max(scaleRange.min, reading.scale + direction * scaleRange.step)) });
  const fill = ((reading.scale - scaleRange.min) / (scaleRange.max - scaleRange.min)) * 100;

  return <div ref={wrapper} className="relative">
    <button type="button" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls="display-options" className="inline-flex min-h-7 items-center gap-1.5 rounded-full px-2.5 font-semibold hover:bg-white/15">
      <SlidersHorizontal className="size-3.5" aria-hidden="true" />
      <span>{text.button}</span>
      {reading.scale !== 100 && <span className="rounded-full bg-white/20 px-1.5 text-[10px]">{reading.scale}%</span>}
      {changed && <span aria-hidden="true" className="size-1.5 rounded-full bg-[#8fd19e]" />}
    </button>

    <div id="display-options" hidden={!open} role="group" aria-label={text.title} className="display-panel absolute top-full right-0 z-40 mt-2 w-[min(330px,calc(100vw-24px))] rounded-[20px] border border-line bg-white p-4 text-ink shadow-[0_22px_60px_#15352c33]">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-extrabold tracking-[.08em] text-forest uppercase">{text.size}</p>
        <output aria-live="polite" className="rounded-full bg-mist px-2.5 py-0.5 text-[13px] font-extrabold text-forest tabular-nums">{reading.scale}%</output>
      </div>
      <div className="mt-3 flex items-center gap-2.5">
        <button type="button" onClick={() => step(-1)} disabled={reading.scale <= scaleRange.min} aria-label={text.smaller} className="grid size-10 shrink-0 place-items-center rounded-full border border-line hover:bg-mist disabled:opacity-35"><Minus className="size-4" aria-hidden="true" /></button>
        <input type="range" min={scaleRange.min} max={scaleRange.max} step={scaleRange.step} value={reading.scale} onChange={event => update({ scale: Number(event.target.value) })} aria-label={text.size} aria-valuetext={`${reading.scale}%`} className="display-range h-2 flex-1 cursor-pointer appearance-none rounded-full" style={{ background: `linear-gradient(90deg, #075331 ${fill}%, #dce8dc ${fill}%)` }} />
        <button type="button" onClick={() => step(1)} disabled={reading.scale >= scaleRange.max} aria-label={text.larger} className="grid size-10 shrink-0 place-items-center rounded-full border border-line hover:bg-mist disabled:opacity-35"><Plus className="size-4" aria-hidden="true" /></button>
      </div>
      <div className="mt-2.5 flex items-center gap-1.5" role="group" aria-label={text.presets}>
        {presets.map(value => <button key={value} type="button" aria-pressed={reading.scale === value} onClick={() => update({ scale: value })} className={cn('flex-1 rounded-full border py-1.5 text-[12px] font-bold tabular-nums', reading.scale === value ? 'border-forest bg-forest text-white' : 'border-line hover:bg-mist')}>{value}%</button>)}
      </div>
      <p aria-hidden="true" className="mt-3 truncate rounded-[12px] bg-sand px-3 py-2 font-semibold text-ink" style={{ fontSize: `${(14 * reading.scale) / 100}px` }}>{text.preview}</p>

      <p className="mt-4 text-[11px] font-extrabold tracking-[.08em] text-forest uppercase">{text.colours}</p>
      <div className="mt-2 grid grid-cols-2 gap-2" role="radiogroup" aria-label={text.colours}>
        {(Object.keys(swatches) as Theme[]).map(theme => {
          const swatch = swatches[theme];
          const selected = reading.theme === theme;
          return <button key={theme} type="button" role="radio" aria-checked={selected} onClick={() => update({ theme })} className={cn('flex items-center gap-2.5 rounded-[14px] border p-2 text-left transition', selected ? 'border-forest ring-2 ring-forest/25' : 'border-line hover:bg-mist')}>
            <span aria-hidden="true" className="swatch grid size-10 shrink-0 place-items-center rounded-[10px] border text-[15px] font-extrabold" style={{ background: swatch.bg, color: swatch.fg, borderColor: `${swatch.fg}33` }}>A<span className="ml-0.5 size-1.5 rounded-full" style={{ background: swatch.accent }} /></span>
            <span className="min-w-0"><span className="block text-[12px] leading-tight font-bold">{text.themes[theme]}</span><span className="block text-[10px] leading-tight text-copy">{text.themeHints[theme]}</span></span>
          </button>;
        })}
      </div>

      <div className="mt-3 space-y-2">
        <Switch checked={reading.spacing} onChange={() => update({ spacing: !reading.spacing })} label={text.spacing} />
        <Switch checked={reading.calm} onChange={() => update({ calm: !reading.calm })} label={text.calm} />
      </div>
      <button type="button" onClick={() => setReading(defaultReading)} disabled={!changed} className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-copy hover:text-forest disabled:opacity-40"><RotateCcw className="size-3.5" aria-hidden="true" />{text.reset}</button>
    </div>
  </div>;
}
