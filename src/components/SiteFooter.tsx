import { MapPin } from 'lucide-react';
import { Brand } from '@/components/Brand';
import type { Copy, Language } from '@/content';
import { pageContainer } from '@/lib/site-styles';
import { cn } from '@/lib/utils';

export function SiteFooter({ language, text }: { language: Language; text: Copy }) {
  return <footer className="bg-forest text-white">
    <div className={cn(pageContainer, 'grid gap-7 py-9 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr]')}>
      <div><Brand light /><p className="mt-3 max-w-[260px] text-[12px] leading-[1.5] text-white/80">{text.footer.line}</p></div>
      <nav aria-label={language === 'sw' ? 'Chunguza' : 'Explore'} className="flex flex-col items-start gap-2 text-[12px]"><strong className="mb-1 text-[13px]">{language === 'sw' ? 'Chunguza' : 'Explore'}</strong><a href="#mission" className="hover:underline">{text.navigation.mission}</a><a href="#learn" className="hover:underline">{text.navigation.work}</a><a href="#directory" className="hover:underline">{text.navigation.directory}</a></nav>
      <nav aria-label={language === 'sw' ? 'Mradi' : 'Project'} className="flex flex-col items-start gap-2 text-[12px]"><strong className="mb-1 text-[13px]">{language === 'sw' ? 'Mradi' : 'Project'}</strong><a href="#pilot" className="hover:underline">{text.navigation.pilot}</a><a href="#plan" className="hover:underline">{text.navigation.plan}</a></nav>
      <div className="text-[12px]"><strong className="mb-3 block text-[13px]">CancerCare</strong><p className="flex items-start gap-2 text-white/85"><MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />{language === 'sw' ? 'Kaunti ya Embu, Kenya' : 'Embu County, Kenya'}</p><p className="mt-3 font-semibold text-[#c3e7bc]">{text.status}</p></div>
    </div>
    <div className="border-t border-white/20"><div className={cn(pageContainer, 'flex flex-wrap justify-between gap-3 py-4 text-[10px] leading-[1.5] text-white/70')}><span>{text.footer.notice}</span><span>© {new Date().getFullYear()} CancerCare</span></div></div>
  </footer>;
}
