import { BookOpen, BadgeCheck, ClipboardList, FileText, HandCoins, Handshake, HelpCircle, Info, MapPinned, Route, ScanSearch, Shield, type LucideIcon } from 'lucide-react';
import type { Language } from '@/content';
import type { PageId } from '@/lib/pages';

type Text = Record<Language, string>;
export type NavItem = { href: string; label: Text; description: Text; icon: LucideIcon };
export type NavGroup = { id: string; label: Text; pages: PageId[]; items: NavItem[] };

// The main menu and the footer are both built from this list.
export const navigation: NavGroup[] = [
  {
    id: 'learn',
    label: { en: 'Learn', sw: 'Jifunze' },
    pages: ['learn', 'resources'],
    items: [
      { href: '/learn/#learn', icon: BookOpen, label: { en: 'Cancer basics', sw: 'Misingi ya saratani' }, description: { en: 'What cancer is, common cancers in Kenya', sw: 'Saratani ni nini, saratani za kawaida Kenya' } },
      { href: '/learn/#screening', icon: ScanSearch, label: { en: 'Screening guide', sw: 'Mwongozo wa uchunguzi' }, description: { en: 'Find what fits your question', sw: 'Pata kinacholingana na swali lako' } },
      { href: '/learn/#visit-questions', icon: ClipboardList, label: { en: 'Questions for your visit', sw: 'Maswali ya ziara yako' }, description: { en: 'Build and print your list', sw: 'Andaa na uchapishe orodha yako' } },
      { href: '/learn/#myths', icon: HelpCircle, label: { en: 'Myths and facts', sw: 'Dhana na ukweli' }, description: { en: 'Check what you have heard', sw: 'Kagua ulichosikia' } },
      { href: '/resources/', icon: FileText, label: { en: 'Printable leaflets', sw: 'Vipeperushi vya kuchapisha' }, description: { en: 'English and Kiswahili, ready to share', sw: 'Kiingereza na Kiswahili, tayari kushiriki' } },
    ],
  },
  {
    id: 'find-care',
    label: { en: 'Find care', sw: 'Tafuta huduma' },
    pages: ['find-care'],
    items: [
      { href: '/find-care/', icon: MapPinned, label: { en: 'Care directory', sw: 'Orodha ya huduma' }, description: { en: 'Verified services in Embu', sw: 'Huduma zilizothibitishwa Embu' } },
      { href: '/find-care/#verification', icon: BadgeCheck, label: { en: 'How listings are checked', sw: 'Jinsi vituo vinavyokaguliwa' }, description: { en: 'Our verification steps', sw: 'Hatua zetu za uthibitisho' } },
      { href: '/learn/#paying-for-care', icon: HandCoins, label: { en: 'Paying for care', sw: 'Kulipia huduma' }, description: { en: 'SHA cover explained', sw: 'Bima ya SHA imeelezwa' } },
    ],
  },
  {
    id: 'about',
    label: { en: 'About', sw: 'Kuhusu' },
    pages: ['about', 'how-it-works', 'privacy'],
    items: [
      { href: '/about/', icon: Info, label: { en: 'About us', sw: 'Kuhusu sisi' }, description: { en: 'Who we are and our values', sw: 'Sisi ni nani na maadili yetu' } },
      { href: '/how-it-works/', icon: Route, label: { en: 'How it works', sw: 'Inavyofanya kazi' }, description: { en: 'The Embu pilot plan', sw: 'Mpango wa majaribio wa Embu' } },
      { href: '/about/#partners', icon: Handshake, label: { en: 'Partners and sources', sw: 'Washirika na vyanzo' }, description: { en: 'Who we work with and rely on', sw: 'Tunaoshirikiana nao na kuwategemea' } },
      { href: '/privacy/', icon: Shield, label: { en: 'Privacy and terms', sw: 'Faragha na masharti' }, description: { en: 'How we handle your information', sw: 'Jinsi tunavyoshughulikia taarifa zako' } },
    ],
  },
];

export const getInvolved = { href: '/get-involved/', label: { en: 'Get involved', sw: 'Shiriki' } };
