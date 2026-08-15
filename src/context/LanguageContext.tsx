'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { tr } from '../i18n/tr';
import { en } from '../i18n/en';

type Language = 'tr' | 'en';
type Dictionary = typeof tr;

interface LanguageContextType {
  lang: Language;
  t: Dictionary;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('tr');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('uzayrox_lang') as Language;
    if (savedLang === 'en' || savedLang === 'tr') {
      setLang(savedLang);
    }
    setMounted(true);
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('uzayrox_lang', newLang);
  };

  const toggleLang = () => {
    handleSetLang(lang === 'tr' ? 'en' : 'tr');
  };

  const t = lang === 'tr' ? tr : en;

  // Prevent hydration mismatch by rendering default or nothing until mounted
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ lang: 'tr', t: tr, setLang: handleSetLang, toggleLang }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ lang, t, setLang: handleSetLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
