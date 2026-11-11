import { ArrowRight, UsersRound } from 'lucide-react';
import type { Copy } from '@/content';
import { pageContainer } from '@/lib/site-styles';

export function CollaborationSection({ participation }: { participation: Copy['participation'] }) {
  return <section id="plan" aria-labelledby="participation-title" className="bg-white pb-5 md:pb-7">
    <div className={pageContainer}>
      <div className="relative grid items-center gap-5 overflow-hidden rounded-[22px] bg-forest px-7 py-8 text-white sm:grid-cols-[auto_1fr] md:grid-cols-[150px_1fr_auto] md:gap-8 md:px-10">
        <div aria-hidden="true" className="absolute -right-16 -bottom-28 size-48 rounded-full border-[30px] border-[#56915d]/65" />
        <span aria-hidden="true" className="grid size-20 place-items-center rounded-full bg-white/10 text-[#c4e6bb] md:size-28"><UsersRound className="size-12 md:size-16" strokeWidth={1.6} /></span>
        <div className="relative sm:border-l sm:border-white/35 sm:pl-7">
          <h2 id="participation-title" className="text-[clamp(27px,3vw,39px)] leading-[1.1] font-bold tracking-[-.045em]">{participation.title}</h2>
          <p className="mt-2 max-w-[660px] text-[13px] leading-[1.55] text-white/85">{participation.description}</p>
          <p className="mt-2 text-[11px] text-white/70">{participation.note}</p>
        </div>
        <a href="/get-involved/" className="relative inline-flex min-h-10 w-fit items-center gap-4 rounded-full bg-white px-5 text-[12px] font-bold text-forest hover:bg-mist sm:col-start-2 sm:ml-7 md:col-auto md:ml-0">{participation.action}<ArrowRight className="size-4" aria-hidden="true" /></a>
      </div>
    </div>
  </section>;
}
