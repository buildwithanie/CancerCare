import { ArrowRight, MapPin } from 'lucide-react';
import { Brand } from '@/components/Brand';
import { ShareLinks } from '@/components/ShareLinks';
import { InstallButton } from '@/components/InstallButton';
import type { Copy, Language } from '@/content';
import { pageContainer } from '@/lib/site-styles';
import type { PageId } from '@/lib/pages';
import { cn } from '@/lib/utils';
import { getInvolved, navigation } from '@/data/navigation';
import { pagesCopy } from '@/content-pages';

export function SiteFooter({ language, text }: { language: Language; text: Copy; currentPage?: PageId }) {
  const nav = pagesCopy[language].nav;
  return <footer className="bg-forest text-white">
    <div className={cn(pageContainer, 'grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]')}>
      <div>
        <Brand light />
        <p className="mt-3 max-w-[280px] text-[12px] leading-[1.5] text-white/80">{text.footer.line}</p>
        <p className="mt-3 flex items-start gap-2 text-[12px] text-white/85"><MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />{language === 'sw' ? 'Kaunti ya Embu, Kenya' : 'Embu County, Kenya'} · <span className="font-semibold text-[#c3e7bc]">{text.status}</span></p>
        <div className="mt-5"><ShareLinks share={text.share} /></div>
        <div className="mt-3"><InstallButton language={language} /></div>
      </div>
      {navigation.map(group => <nav key={group.id} aria-label={group.label[language]} className="text-[12px]">
        <strong className="mb-3 block text-[13px]">{group.label[language]}</strong>
        <ul className="space-y-2">{group.items.map(item => <li key={item.href}><a href={item.href} className="text-white/85 hover:text-white hover:underline">{item.label[language]}</a></li>)}</ul>
        {group.id === 'about' && <a href={getInvolved.href} className="mt-4 inline-flex min-h-9 items-center gap-1.5 rounded-full bg-white px-4 text-[12px] font-bold text-forest hover:bg-mist">{getInvolved.label[language]}<ArrowRight className="size-3.5" aria-hidden="true" /></a>}
      </nav>)}
    </div>
    <div className="border-t border-white/20"><div className={cn(pageContainer, 'flex flex-wrap justify-between gap-3 py-4 pb-24 text-[10px] leading-[1.5] text-white/70')}><span>{text.footer.notice}</span><span className="flex gap-4"><a href="/privacy/" className="hover:underline">{nav.privacy}</a><a href="/privacy/#terms" className="hover:underline">{language === 'sw' ? 'Masharti' : 'Terms'}</a><span>© {new Date().getFullYear()} CancerCare</span></span></div></div>
  </footer>;
}
