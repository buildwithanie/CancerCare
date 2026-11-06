import { ArrowRight, Search } from 'lucide-react';
import type { Copy } from '@/content';
import { pageContainer } from '@/lib/site-styles';
import { cn } from '@/lib/utils';

export function HeroSection({ hero }: { hero: Copy['hero'] }) {
  return <section id="home" aria-labelledby="hero-title" className="overflow-hidden bg-sand">
    <div className={cn(pageContainer, 'grid items-center gap-8 py-8 md:gap-10 md:py-11 lg:min-h-120 lg:grid-cols-[.93fr_1.07fr] lg:gap-2 lg:py-0')}>
      <div className="relative z-1 py-4 lg:py-12">
        <p className="mb-5 flex items-center gap-2 text-[10px] font-extrabold tracking-[.15em] text-forest uppercase"><span className="size-1.5 rounded-full bg-leaf" aria-hidden="true" />{hero.eyebrow}</p>
        <h1 id="hero-title" className="max-w-162.5 text-[clamp(44px,5vw,72px)] leading-[.98] font-bold tracking-[-.065em] text-ink">{hero.title}<br /><span className="text-forest">{hero.emphasis}</span></h1>
        <p className="mt-6 max-w-128.75 text-[15px] leading-[1.65] text-copy sm:text-[17px]">{hero.description}</p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a href="#work" className="inline-flex min-h-11 items-center gap-3 rounded-full bg-forest px-5 text-[13px] font-bold text-white shadow-[0_9px_22px_#0b563226] hover:bg-ink"><Search className="size-4" aria-hidden="true" />{hero.primaryAction}<ArrowRight className="size-4" aria-hidden="true" /></a>
          <a href="#pilot" className="inline-flex min-h-11 items-center gap-3 rounded-full border border-forest bg-white px-5 text-[13px] font-bold text-forest hover:bg-mist">{hero.secondaryAction}<ArrowRight className="size-4" aria-hidden="true" /></a>
        </div>
      </div>
      <figure className="relative -mx-4.5 sm:mx-0 lg:-mr-[max(18px,calc((100vw-1284px)/2))] lg:h-full">
        <div className="relative h-72.5 overflow-hidden rounded-tl-[110px] bg-mist sm:h-100 sm:rounded-tl-[190px] lg:h-full lg:min-h-120 lg:rounded-tl-[260px]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-1 w-4 rounded-tl-[260px] bg-[#cae3c5]/80 sm:w-5" />
          <img src="/cancer-care-hero-v2.jpg" alt={hero.imageAlt} width="1774" height="887" fetchPriority="high" className="h-full w-full object-cover object-center" />
        </div>
       
      </figure>
    </div>
  </section>;
}
