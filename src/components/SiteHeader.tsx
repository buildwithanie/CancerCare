import { MapPin } from 'lucide-react';
import { Brand } from '@/components/Brand';
import type { Copy, Language } from '@/content';
import { pageContainer } from '@/lib/site-styles';
import { cn } from '@/lib/utils';

export function SiteHeader({ language, onLanguageChange, text }: { language: Language; onLanguageChange: (language: Language) => void; text: Copy }) {
  const links = [
    { href: '#mission', label: text.navigation.mission },
    { href: '#learn', label: text.navigation.work },
    { href: '#directory', label: text.navigation.directory },
    { href: '#pilot', label: text.navigation.pilot },
    { href: '#plan', label: text.navigation.plan },
  ];

  return <>
    <a href="#main" className="fixed -top-16 left-5 z-50 rounded bg-white px-4 py-3 focus:top-3">{language === 'sw' ? 'Ruka hadi maudhui' : 'Skip to content'}</a>
    <div className="bg-forest text-white">
      <div className={cn(pageContainer, 'flex min-h-8 items-center justify-between gap-3 text-[11px] font-medium')}>
        <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5" aria-hidden="true" />{language === 'sw' ? 'Kaunti ya Embu, Kenya' : 'Embu County, Kenya'}</span>
        <span className="font-semibold tracking-[.04em] uppercase">{text.status}</span>
      </div>
    </div>
    <header className="relative z-10 border-b border-line bg-white">
      <div className={cn(pageContainer, 'flex min-h-[72px] flex-wrap items-center justify-between gap-x-5 gap-y-2 py-3 lg:flex-nowrap lg:py-0')}>
        <a href="#home" aria-label={language === 'sw' ? 'Ukurasa wa mwanzo wa CancerCare' : 'CancerCare home'}><Brand /></a>
        <nav aria-label={language === 'sw' ? 'Uelekezaji mkuu' : 'Main navigation'} className="order-3 flex w-full flex-wrap items-center gap-x-5 gap-y-0 text-[12px] font-semibold text-ink lg:order-none lg:w-auto lg:flex-nowrap lg:justify-center lg:gap-7">
          {links.map(link => <a key={link.href} href={link.href} className="shrink-0 whitespace-nowrap py-2 hover:text-leaf">{link.label}</a>)}
        </nav>
        <div role="group" aria-label="Language / Lugha" className="flex shrink-0 items-center rounded-full border border-line bg-sand p-1 text-[11px] font-bold">
          {(['en', 'sw'] as const).map(option => <button key={option} type="button" lang={option} aria-pressed={language === option} onClick={() => onLanguageChange(option)} className={cn('grid size-8 place-items-center rounded-full text-copy', language === option && 'bg-forest text-white')}>{option.toUpperCase()}</button>)}
        </div>
      </div>
    </header>
  </>;
}
