import { ArrowRight } from 'lucide-react';
import type { Copy } from '@/content';
import { pageContainer } from '@/lib/site-styles';
import { cn } from '@/lib/utils';

export function NotFoundPage({ content }: { content: Copy['notFound'] }) {
  return <section aria-labelledby="not-found-title" className="bg-[#eef6ee] py-20 md:py-28">
    <div className={cn(pageContainer, 'max-w-[760px] text-center')}>
      <p className="text-[64px] leading-none font-bold tracking-[-.08em] text-forest/25 md:text-[96px]">404</p>
      <h1 id="not-found-title" className="mt-4 text-[clamp(32px,4vw,52px)] leading-[1.08] font-bold tracking-[-.05em]">{content.title}</h1>
      <p className="mx-auto mt-4 max-w-[520px] text-[15px] leading-[1.7] text-copy">{content.description}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a href="/" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-forest px-5 text-[13px] font-bold text-white hover:bg-ink">{content.home}<ArrowRight className="size-4" aria-hidden="true" /></a>
        <a href="/learn/" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-forest bg-white px-5 text-[13px] font-bold text-forest hover:bg-mist">{content.learn}</a>
      </div>
    </div>
  </section>;
}
