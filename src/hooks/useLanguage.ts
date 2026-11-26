import { useEffect, useState } from 'react';
import { copy, type Language } from '@/content';
import type { PageId } from '@/lib/pages';

const languageStorageKey = 'cancercare.language';

function initialLanguage(): Language {
  try {
    return window.localStorage.getItem(languageStorageKey) === 'sw' ? 'sw' : 'en';
  } catch {
    return 'en';
  }
}

export function useLanguage(page: PageId = 'home') {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = page === 'learn'
      ? language === 'sw' ? 'Jifunze kuhusu saratani — CancerCare' : 'Learn about cancer — CancerCare'
      : page === 'find-care'
        ? language === 'sw' ? 'Tafuta huduma — CancerCare' : 'Find care — CancerCare'
        : page === 'how-it-works'
          ? language === 'sw' ? 'Inavyofanya kazi — CancerCare' : 'How it works — CancerCare'
          : page === 'get-involved'
            ? language === 'sw' ? 'Shiriki — CancerCare' : 'Get involved — CancerCare'
            : page === 'not-found'
              ? language === 'sw' ? 'Ukurasa haukupatikana — CancerCare' : 'Page not found — CancerCare'
        : language === 'sw' ? 'CancerCare — Njia ya kupata huduma' : 'CancerCare — A clearer path to care';

    try {
      window.localStorage.setItem(languageStorageKey, language);
    } catch {
      // The switch still works when browser storage is unavailable.
    }
  }, [language, page]);

  return { language, setLanguage, text: copy[language] };
}

