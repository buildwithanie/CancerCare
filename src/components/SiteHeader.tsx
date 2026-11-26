import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, MapPin, Menu, X } from 'lucide-react';
import { Brand } from '@/components/Brand';
import { SearchButton } from '@/components/SearchDialog';
import { ReadingControls } from '@/components/ReadingControls';
import type { Copy, Language } from '@/content';
import { getInvolved, navigation, type NavGroup } from '@/data/navigation';
import type { PageId } from '@/lib/pages';
import { pageContainer } from '@/lib/site-styles';
import { cn } from '@/lib/utils';

type Props = { language: Language; onLanguageChange: (language: Language) => void; text: Copy; currentPage: PageId };

function isCurrent(href: string) {
  const [path, hash] = href.split('#');
  return window.location.pathname === path && (hash ? window.location.hash === `#${hash}` : !window.location.hash);
}

function LanguageSwitch({ language, onLanguageChange }: Pick<Props, 'language' | 'onLanguageChange'>) {
  return <div role="group" aria-label="Language / Lugha" className="flex shrink-0 items-center rounded-full border border-line bg-sand p-1 text-[11px] font-bold">
    {(['en', 'sw'] as const).map(option => <button key={option} type="button" lang={option} aria-pressed={language === option} onClick={() => onLanguageChange(option)} className={cn('grid size-8 place-items-center rounded-full text-copy', language === option && 'bg-forest text-white')}>{option.toUpperCase()}</button>)}
  </div>;
}

function MenuLinks({ group, language, onNavigate, compact = false }: { group: NavGroup; language: Language; onNavigate: () => void; compact?: boolean }) {
  return <ul className={cn('grid gap-1', !compact && group.items.length > 3 && 'sm:grid-cols-2')}>
    {group.items.map(item => {
      const Icon = item.icon;
      const current = isCurrent(item.href);
      return <li key={item.href}>
        <a href={item.href} onClick={onNavigate} aria-current={current ? 'page' : undefined} className={cn('group flex items-start gap-3 rounded-[14px] p-3 transition hover:bg-mist', current && 'bg-mist')}>
          <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-[#e6f1e7] text-forest transition group-hover:bg-forest group-hover:text-white"><Icon className="size-[18px]" /></span>
          <span className="min-w-0">
            <span className="block text-[14px] font-bold text-ink">{item.label[language]}</span>
            <span className="mt-0.5 block text-[12px] leading-[1.4] font-normal text-copy">{item.description[language]}</span>
          </span>
        </a>
      </li>;
    })}
  </ul>;
}

function DesktopMenu({ language, currentPage }: { language: Language; currentPage: PageId }) {
  const [open, setOpen] = useState<string | null>(null);
  const nav = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        nav.current?.querySelector<HTMLButtonElement>(`[data-menu="${open}"]`)?.focus();
        setOpen(null);
      }
    }
    function onPointer(event: PointerEvent) {
      if (!nav.current?.contains(event.target as Node)) setOpen(null);
    }
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointer);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('pointerdown', onPointer); };
  }, [open]);

  const hoverOpen = (id: string) => { window.clearTimeout(closeTimer.current); setOpen(id); };
  const hoverClose = () => { closeTimer.current = window.setTimeout(() => setOpen(null), 160); };

  return <nav ref={nav} aria-label={language === 'sw' ? 'Uelekezaji mkuu' : 'Main navigation'} className="hidden items-center gap-1 lg:flex">
    {navigation.map(group => {
      const expanded = open === group.id;
      const active = group.pages.includes(currentPage);
      return <div key={group.id} className="relative" onPointerEnter={event => { if (event.pointerType === 'mouse') hoverOpen(group.id); }} onPointerLeave={event => { if (event.pointerType === 'mouse') hoverClose(); }}>
        <button type="button" data-menu={group.id} aria-expanded={expanded} aria-controls={`menu-${group.id}`} onClick={() => setOpen(expanded ? null : group.id)} className={cn('inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-[13px] font-semibold text-ink transition hover:bg-mist', (expanded || active) && 'text-forest', expanded && 'bg-mist')}>
          {group.label[language]}
          <ChevronDown className={cn('size-4 transition-transform', expanded && 'rotate-180')} aria-hidden="true" />
          {active && <span aria-hidden="true" className="absolute bottom-1 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-forest" />}
        </button>
        <div id={`menu-${group.id}`} hidden={!expanded} className={cn('menu-panel absolute top-full left-1/2 z-30 -translate-x-1/2 pt-3', group.items.length > 3 ? 'w-[580px]' : 'w-[340px]')}>
          <div className="rounded-[20px] border border-line bg-white p-2.5 shadow-[0_24px_60px_#15352c24]">
            <MenuLinks group={group} language={language} onNavigate={() => setOpen(null)} />
          </div>
        </div>
      </div>;
    })}
  </nav>;
}

function MobileMenu({ language, onLanguageChange, currentPage, onClose }: Pick<Props, 'language' | 'onLanguageChange' | 'currentPage'> & { onClose: () => void }) {
  const [section, setSection] = useState<string | null>(() => navigation.find(group => group.pages.includes(currentPage))?.id ?? null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButton.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  return <div id="mobile-menu" role="dialog" aria-modal="true" aria-label={language === 'sw' ? 'Menyu' : 'Menu'} className="mobile-menu fixed inset-0 z-[60] flex flex-col bg-white lg:hidden">
    <div className={cn(pageContainer, 'flex min-h-[72px] items-center justify-between gap-3 border-b border-line')}>
      <a href="/" onClick={onClose} aria-label={language === 'sw' ? 'Ukurasa wa mwanzo wa CancerCare' : 'CancerCare home'}><Brand /></a>
      <button ref={closeButton} type="button" onClick={onClose} aria-label={language === 'sw' ? 'Funga menyu' : 'Close menu'} className="grid size-11 place-items-center rounded-full border border-line text-ink hover:bg-mist"><X className="size-5" aria-hidden="true" /></button>
    </div>
    <nav aria-label={language === 'sw' ? 'Uelekezaji mkuu' : 'Main navigation'} className={cn(pageContainer, 'flex-1 overflow-y-auto py-4')}>
      <a href="/" onClick={onClose} aria-current={currentPage === 'home' ? 'page' : undefined} className={cn('flex min-h-14 items-center border-b border-line px-1 text-[18px] font-bold', currentPage === 'home' ? 'text-forest' : 'text-ink')}>{language === 'sw' ? 'Mwanzo' : 'Home'}</a>
      {navigation.map(group => {
        const expanded = section === group.id;
        return <div key={group.id} className="border-b border-line">
          <button type="button" aria-expanded={expanded} aria-controls={`mobile-${group.id}`} onClick={() => setSection(expanded ? null : group.id)} className={cn('flex min-h-14 w-full items-center justify-between px-1 text-left text-[18px] font-bold', group.pages.includes(currentPage) ? 'text-forest' : 'text-ink')}>
            {group.label[language]}
            <ChevronDown className={cn('size-5 transition-transform', expanded && 'rotate-180')} aria-hidden="true" />
          </button>
          <div id={`mobile-${group.id}`} hidden={!expanded} className="pb-3"><MenuLinks group={group} language={language} onNavigate={onClose} compact /></div>
        </div>;
      })}
    </nav>
    <div className={cn(pageContainer, 'flex items-center justify-between gap-3 border-t border-line py-4')}>
      <LanguageSwitch language={language} onLanguageChange={onLanguageChange} />
      <a href={getInvolved.href} onClick={onClose} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-forest px-5 text-[14px] font-bold text-white hover:bg-ink">{getInvolved.label[language]}<ArrowRight className="size-4" aria-hidden="true" /></a>
    </div>
  </div>;
}

export function SiteHeader({ language, onLanguageChange, text, currentPage }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const closeMenu = useRef(() => { setMenuOpen(false); menuButton.current?.focus(); }).current;

  return <>
    <a href="#main" className="fixed -top-16 left-5 z-50 rounded bg-white px-4 py-3 focus:top-3">{language === 'sw' ? 'Ruka hadi maudhui' : 'Skip to content'}</a>
    <div className="relative z-30 bg-forest text-white">
      <div className={cn(pageContainer, 'flex min-h-8 items-center justify-between gap-3 text-[11px] font-medium')}>
        <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5" aria-hidden="true" />{language === 'sw' ? 'Kaunti ya Embu, Kenya' : 'Embu County, Kenya'}</span>
        <span className="flex items-center gap-3"><ReadingControls language={language} /><span className="hidden font-semibold tracking-[.04em] uppercase sm:inline">{text.status}</span></span>
      </div>
    </div>
    <header className="relative z-20 border-b border-line bg-white">
      <div className={cn(pageContainer, 'flex min-h-[72px] items-center justify-between gap-4')}>
        <a href="/" aria-label={language === 'sw' ? 'Ukurasa wa mwanzo wa CancerCare' : 'CancerCare home'}><Brand /></a>
        <DesktopMenu language={language} currentPage={currentPage} />
        <div className="flex items-center gap-1.5 sm:gap-3">
          <SearchButton language={language} />
          <LanguageSwitch language={language} onLanguageChange={onLanguageChange} />
          <a href={getInvolved.href} aria-current={currentPage === 'get-involved' ? 'page' : undefined} className="hidden min-h-11 items-center gap-2 rounded-full bg-forest px-5 text-[13px] font-bold text-white shadow-[0_8px_20px_#07533126] transition hover:bg-ink lg:inline-flex">{getInvolved.label[language]}<ArrowRight className="size-4" aria-hidden="true" /></a>
          <button ref={menuButton} type="button" onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={language === 'sw' ? 'Fungua menyu' : 'Open menu'} className="grid size-11 place-items-center rounded-full border border-line text-ink hover:bg-mist lg:hidden"><Menu className="size-5" aria-hidden="true" /></button>
        </div>
      </div>
    </header>
    {menuOpen && <MobileMenu language={language} onLanguageChange={onLanguageChange} currentPage={currentPage} onClose={closeMenu} />}
  </>;
}
