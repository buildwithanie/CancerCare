import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { pageContainer, sectionKicker } from '@/lib/site-styles';
import { cn } from '@/lib/utils';

export function PageIntro({ eyebrow, title, description, backHome, children }: { eyebrow: string; title: string; description: string; backHome: string; children?: ReactNode }) {
  return <section className="relative overflow-hidden bg-[#eaf4e9] py-12 md:py-16 print:hidden">
    <div aria-hidden="true" className="pointer-events-none absolute -right-36 -top-48 size-[580px] rounded-full border-[90px] border-white/35" />
    <div className={cn(pageContainer, 'relative')}>
      <a href="/" className="mb-8 inline-flex items-center gap-2 text-[12px] font-semibold text-forest hover:underline"><ArrowLeft className="size-4" aria-hidden="true" />{backHome}</a>
      <p className={cn(sectionKicker, 'mb-4')}>{eyebrow}</p>
      <h1 className="max-w-[820px] text-[clamp(40px,5vw,68px)] leading-[1] font-bold tracking-[-.06em] text-ink">{title}</h1>
      <p className="mt-6 max-w-[680px] text-[15px] leading-[1.7] text-copy md:text-[17px]">{description}</p>
      {children}
    </div>
  </section>;
}
