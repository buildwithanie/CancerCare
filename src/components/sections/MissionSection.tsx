import type { Copy } from '@/content';
import { pageContainer, sectionKicker } from '@/lib/site-styles';
import { cn } from '@/lib/utils';

export function MissionSection({ mission }: { mission: Copy['mission'] }) {
  return <section id="mission" aria-labelledby="mission-title" className="bg-white py-10 md:py-14">
    <div className={cn(pageContainer, 'grid items-center gap-8 md:grid-cols-[.92fr_1.08fr] md:gap-12')}>
      <figure>
        <img src="/cancer-care-mission.jpg" alt={mission.imageAlt} width="1672" height="941" loading="lazy" className="aspect-[1.95] w-full rounded-[20px] object-cover object-center" />
      </figure>
      <div className="border-l border-leaf/50 pl-6 md:pl-10">
        <p className={cn(sectionKicker, 'mb-3')}>{mission.kicker}</p>
        <h2 id="mission-title" className="max-w-[590px] text-[clamp(32px,3.3vw,51px)] leading-[1.08] font-bold tracking-[-.05em] text-ink">{mission.title}</h2>
        <p className="mt-4 max-w-[570px] text-[14px] leading-[1.7] text-copy md:text-[16px]">{mission.description}</p>
      </div>
    </div>
  </section>;
}
