import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { translations, Language } from '@/i18n/translations';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

export const useLanguage = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: 'en',
      setLanguage: (lang: Language) => set({ language: lang }),
      t: (key: keyof typeof translations.en) => {
        const { language } = get();
        return translations[language][key] || translations.en[key] || key;
      }
    }),
    {
      name: 'language-storage'
    }
  )
);
