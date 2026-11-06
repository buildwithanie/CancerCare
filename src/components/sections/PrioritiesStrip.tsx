import { BookOpenText, HeartHandshake, MapPin } from 'lucide-react';
import type { Copy, Language } from '@/content';
import { pageContainer } from '@/lib/site-styles';
import { cn } from '@/lib/utils';

const icons = [BookOpenText, MapPin, HeartHandshake] as const;

type PrioritiesStripProps = {
  language: Language;
  principles: Copy['principles'];
};

export function PrioritiesStrip({ language, principles }: PrioritiesStripProps) {
  return (
    <div aria-label={language === 'sw' ? 'Vipaumbele vyetu' : 'Our priorities'} className="border-y border-line bg-mist">
      <div className={cn(pageContainer, 'grid md:grid-cols-3')}>
        {principles.map((principle, index) => {
          const Icon = icons[index] ?? HeartHandshake;
          return (
            <div key={principle} className="flex min-h-[76px] items-center gap-4 border-b border-line py-3 last:border-b-0 md:min-h-[92px] md:border-r md:border-b-0 md:px-6 md:first:pl-0 md:last:border-r-0">
              <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full bg-paper text-leaf ring-1 ring-line"><Icon className="size-[19px]" strokeWidth={1.75} /></span>
              <strong className="text-[13px] leading-[1.4] font-semibold text-ink sm:text-sm">{principle}</strong>
            </div>
          );
        })}
      </div>
    </div>
  );
}


