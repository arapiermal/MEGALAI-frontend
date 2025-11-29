import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { STRINGS, SupportedLang } from './strings';

interface I18nContextValue {
  lang: SupportedLang;
  setLang: (lang: SupportedLang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const LANG_KEY = 'megalai_lang';

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<SupportedLang>('en');

  useEffect(() => {
    const stored = localStorage.getItem(LANG_KEY) as SupportedLang | null;
    if (stored && (stored === 'en' || stored === 'sq')) {
      setLangState(stored);
    }
  }, []);

  const setLang = (next: SupportedLang) => {
    setLangState(next);
    localStorage.setItem(LANG_KEY, next);
  };

  const t = useMemo(() => {
    return (key: string) => {
      const value = STRINGS[lang][key as keyof (typeof STRINGS)['en']];
      return value || key;
    };
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return ctx;
};
