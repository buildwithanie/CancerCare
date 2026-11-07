import { ArrowRight, BookOpen, HeartHandshake, Hospital, Signpost } from 'lucide-react';
import type { Copy } from '@/content';
import { pageContainer } from '@/lib/site-styles';
import { cn } from '@/lib/utils';

const icons = [BookOpen, Hospital, Signpost, HeartHandshake] as const;
const hrefs = ['#learn', '#directory', '#pilot', '#plan'] as const;

export function FocusSection({ work }: { work: Copy['work'] }) {
  return <section id="work" aria-labelledby="work-title" className="bg-white py-5 md:py-6">
    <div className={pageContainer}>
      <h2 id="work-title" className="sr-only">{work.title}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {work.programs.map((program, index) => {
          const Icon = icons[index] ?? BookOpen;
          return <a key={program.title} href={hrefs[index] ?? '#mission'} className="group relative flex min-h-[198px] flex-col rounded-[17px] border border-line bg-[#fafbf9] p-5 transition-colors hover:border-leaf hover:bg-mist">
            <span aria-hidden="true" className="grid size-11 place-items-center rounded-full bg-[#e5f2e3] text-forest"><Icon className="size-6" strokeWidth={2} /></span>
            <h3 className="mt-4 text-[19px] leading-[1.15] font-bold tracking-[-.035em] text-ink">{program.title}</h3>
            <p className="mt-2 max-w-[230px] pr-5 text-[12px] leading-[1.5] text-copy">{program.description}</p>
            <span aria-hidden="true" className="absolute right-4 bottom-4 grid size-8 place-items-center rounded-full bg-[#e5f2e3] text-forest group-hover:bg-forest group-hover:text-white"><ArrowRight className="size-4" /></span>
            <span className={cn('sr-only')}>{program.label}</span>
          </a>;
        })}
      </div>
    </div>
  </section>;
}
