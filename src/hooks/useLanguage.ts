import { useEffect, useState } from 'react';
import { copy, type Language } from '@/content';

const languageStorageKey = 'cancercare.language';

function initialLanguage(): Language {
  try {
    return window.localStorage.getItem(languageStorageKey) === 'sw' ? 'sw' : 'en';
  } catch {
    return 'en';
  }
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === 'sw'
      ? 'CancerCare — Njia ya kupata huduma'
      : 'CancerCare — A clearer path to care';

    try {
      window.localStorage.setItem(languageStorageKey, language);
    } catch {
      // The switch still works when browser storage is unavailable.
    }
  }, [language]);

  return { language, setLanguage, text: copy[language] };
}

