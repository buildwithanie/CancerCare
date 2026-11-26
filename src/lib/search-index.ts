import { copy, type Language } from '@/content';
import { caregiverCopy } from '@/content-caregivers';
import { pagesCopy } from '@/content-pages';
import { navigation, getInvolved } from '@/data/navigation';
import { topics } from '../../shared/assistant.js';

// href 'ask:' opens the assistant with the search words instead of a page.
export type SearchEntry = { title: string; text: string; href: string; kind: string; keywords?: string };

const kinds = {
  en: { page: 'Page', answer: 'Answer', assistant: 'Assistant answer', myth: 'Myth or fact', leaflet: 'Leaflet', caregiver: 'Caregiver corner', guide: 'Screening guide', question: 'Visit question', awareness: 'Awareness' },
  sw: { page: 'Ukurasa', answer: 'Jibu', assistant: 'Jibu la msaidizi', myth: 'Dhana au ukweli', leaflet: 'Kipeperushi', caregiver: 'Kona ya walezi', guide: 'Mwongozo wa uchunguzi', question: 'Swali la ziara', awareness: 'Uhamasishaji' },
};

const cache = new Map<Language, SearchEntry[]>();

export function searchIndex(language: Language): SearchEntry[] {
  const cached = cache.get(language);
  if (cached) return cached;
  const text = copy[language];
  const pages = pagesCopy[language];
  const care = caregiverCopy[language];
  const kind = kinds[language];
  const entries: SearchEntry[] = [
    ...navigation.flatMap(group => group.items.map(item => ({ title: item.label[language], text: item.description[language], href: item.href, kind: `${kind.page} · ${group.label[language]}` }))),
    { title: getInvolved.label[language], text: text.getInvolvedPage.description, href: getInvolved.href, kind: kind.page },
    ...text.learn.items.map(item => ({ title: item.question, text: item.answer, href: `/learn/#${item.id ?? 'learn'}`, kind: kind.answer })),
    ...text.screening.paths.map(path => ({ title: path.label, text: `${path.heading} ${path.explanation} ${path.questions.join(' ')}`, href: '/learn/#screening', kind: kind.guide })),
    ...text.myths.items.map(item => ({ title: item.myth, text: item.fact, href: '/learn/#myths', kind: kind.myth })),
    ...text.visitPlanner.groups.flatMap(group => group.questions.map(question => ({ title: question, text: group.title, href: '/learn/#visit-questions', kind: kind.question }))),
    ...text.awareness.items.map(item => ({ title: item.title, text: `${item.when}. ${item.text}`, href: '/#awareness', kind: kind.awareness })),
    ...pages.resources.leaflets.map(leaflet => ({ title: leaflet.title, text: [leaflet.intro, ...leaflet.signs, ...leaflet.prevent, ...leaflet.act].join(' '), href: `/resources/#${leaflet.id}`, kind: kind.leaflet })),
    ...care.sections.map(section => ({ title: section.title, text: [section.intro, ...section.points].join(' '), href: `/caregivers/#${section.id}`, kind: kind.caregiver })),
    { title: care.urgentTitle, text: care.urgentText, href: '/caregivers/', kind: kind.caregiver },
    ...pages.privacy.privacy.map(section => ({ title: section.title, text: section.body.join(' '), href: '/privacy/#privacy', kind: pages.nav.privacy })),
    ...pages.privacy.terms.map(section => ({ title: section.title, text: section.body.join(' '), href: '/privacy/#terms', kind: pages.nav.privacy })),
    { title: text.howPage.title, text: `${text.howPage.description} ${text.howPage.steps.map(step => `${step.title} ${step.description}`).join(' ')}`, href: '/how-it-works/', kind: kind.page },
    { title: text.findCarePage.title, text: `${text.findCarePage.description} ${text.directory.description}`, href: '/find-care/', kind: kind.page },
    ...topics.filter(topic => !topic.smallTalk).map(topic => {
      const answer = topic.answer[language];
      const first = answer.split(/(?<=[.!?])\s/)[0];
      return { title: first.length > 90 ? `${first.slice(0, 87)}…` : first, text: answer, href: 'ask:', kind: kind.assistant, keywords: topic.keywords.join(' ') };
    }),
    { title: pages.about.title, text: `${pages.about.description} ${pages.about.values.map(value => `${value.title} ${value.text}`).join(' ')}`, href: '/about/', kind: kind.page },
  ];
  cache.set(language, entries);
  return entries;
}

export function normalize(value: string) {
  return value.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}

export type SearchResult = SearchEntry & { score: number; snippet: string };

export function search(query: string, language: Language, limit = 12): SearchResult[] {
  const terms = normalize(query).split(' ').filter(term => term.length >= 2);
  if (!terms.length) return [];
  const results: SearchResult[] = [];
  for (const entry of searchIndex(language)) {
    const title = ` ${normalize(entry.title)}`;
    const body = ` ${normalize(entry.text)} ${normalize(entry.keywords ?? '')}`;
    let score = 0;
    let every = true;
    for (const term of terms) {
      const inTitle = title.includes(term);
      const inBody = body.includes(term);
      if (!inTitle && !inBody) { every = false; break; }
      score += (entry.href === 'ask:' ? -1 : 0) + (inTitle ? 4 : 0) + (title.includes(` ${term}`) ? 2 : 0) + (inBody ? 1 : 0) + (body.includes(` ${term}`) ? 1 : 0);
    }
    if (!every) continue;
    results.push({ ...entry, score, snippet: snippetFor(entry.text, terms) });
  }
  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}

function snippetFor(text: string, terms: string[]) {
  const lower = text.toLowerCase();
  const at = terms.map(term => lower.indexOf(term)).filter(index => index >= 0).sort((a, b) => a - b)[0] ?? 0;
  const start = Math.max(0, at - 50);
  const end = Math.min(text.length, start + 150);
  return `${start > 0 ? '…' : ''}${text.slice(start, end).trim()}${end < text.length ? '…' : ''}`;
}
