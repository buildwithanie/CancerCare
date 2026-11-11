import { ArrowRight } from 'lucide-react';
import type { Copy } from '@/content';
import { pageContainer } from '@/lib/site-styles';
import { cn } from '@/lib/utils';

export function HeroSection({ hero }: { hero: Copy['hero'] }) {
  return <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden bg-[#e6f5e9] bg-cover bg-center" style={{ backgroundImage: "url('/hero-mint-background.jpg')" }}>
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/60 via-white/20 to-transparent" />
    <div className={cn(pageContainer, 'relative grid items-center gap-0 lg:min-h-[490px] lg:grid-cols-[.94fr_1.06fr]')}>
      <div className="relative z-[1] py-12 sm:py-14 lg:py-16">
        <p className="mb-5 flex items-center gap-2 text-[10px] font-extrabold tracking-[.15em] text-forest uppercase"><span className="size-1.5 rounded-full bg-leaf" aria-hidden="true" />{hero.eyebrow}</p>
        <h1 id="hero-title" className="max-w-[650px] text-[clamp(44px,5vw,72px)] leading-[.98] font-bold tracking-[-.065em] text-ink">{hero.title}<br /><span className="text-forest">{hero.emphasis}</span></h1>
        <p className="mt-6 max-w-[515px] text-[15px] leading-[1.65] text-copy sm:text-[17px]">{hero.description}</p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a href="#work" className="inline-flex min-h-11 items-center gap-3 rounded-full bg-forest px-5 text-[13px] font-bold text-white shadow-[0_9px_22px_#0b563226] hover:bg-ink">{hero.primaryAction}<ArrowRight className="size-4" aria-hidden="true" /></a>
          <a href="/how-it-works/" className="inline-flex min-h-11 items-center gap-3 rounded-full border border-forest bg-white px-5 text-[13px] font-bold text-forest hover:bg-mist">{hero.secondaryAction}<ArrowRight className="size-4" aria-hidden="true" /></a>
        </div>
      </div>
      <figure className="relative -mx-[18px] h-[310px] overflow-hidden sm:-mx-[24px] sm:h-[390px] lg:-mr-[max(18px,calc((100vw-1284px)/2))] lg:ml-0 lg:h-full lg:min-h-[490px]">
        <img src="/hero-care-cutout.png" alt={hero.imageAlt} width="2058" height="764" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-[50%_bottom]" />
        <figcaption className="absolute right-3 bottom-3 rounded-md bg-white/90 px-2.5 py-1 text-[10px] text-ink sm:right-5">{hero.imageCaption}</figcaption>
      </figure>
    </div>
  </section>;
}
