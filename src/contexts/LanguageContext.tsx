import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useGoogleTranslate, hideGoogleTranslateBanner } from '@/hooks/useGoogleTranslate';

export type Language = 'pt' | 'es' | 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  pt: {
    // Menu items
    'menu.home': 'Home',
    'menu.about': 'Sobre',
    'menu.business': 'Negócios',
    'menu.people': 'Pessoas',
    'menu.news': 'Notícias',
    'menu.sustainability': 'Sustentabilidade',
    'menu.contact': 'Contacto',
    'menu.workWithUs': 'Trabalhe Connosco',
    // Language names
    'lang.pt': 'Português',
    'lang.es': 'Español',
    'lang.en': 'English',
    'lang.fr': 'Français',
  },
  es: {
    'menu.home': 'Inicio',
    'menu.about': 'Sobre',
    'menu.business': 'Negocios',
    'menu.people': 'Personas',
    'menu.news': 'Noticias',
    'menu.sustainability': 'Sostenibilidad',
    'menu.contact': 'Contacto',
    'menu.workWithUs': 'Trabaja Con Nosotros',
    'lang.pt': 'Português',
    'lang.es': 'Español',
    'lang.en': 'English',
    'lang.fr': 'Français',
  },
  en: {
    'menu.home': 'Home',
    'menu.about': 'About',
    'menu.business': 'Business',
    'menu.people': 'People',
    'menu.news': 'News',
    'menu.sustainability': 'Sustainability',
    'menu.contact': 'Contact',
    'menu.workWithUs': 'Work With Us',
    'lang.pt': 'Português',
    'lang.es': 'Español',
    'lang.en': 'English',
    'lang.fr': 'Français',
  },
  fr: {
    'menu.home': 'Accueil',
    'menu.about': 'À propos',
    'menu.business': 'Affaires',
    'menu.people': 'Personnes',
    'menu.news': 'Actualités',
    'menu.sustainability': 'Durabilité',
    'menu.contact': 'Contact',
    'menu.workWithUs': 'Travailler Avec Nous',
    'lang.pt': 'Português',
    'lang.es': 'Español',
    'lang.en': 'English',
    'lang.fr': 'Français',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Recuperar idioma do localStorage ou usar português como padrão
    const saved = localStorage.getItem('language') as Language;
    return saved && ['pt', 'es', 'en', 'fr'].includes(saved) ? saved : 'pt';
  });

  // Integrar com Google Translate
  useGoogleTranslate(language);
  hideGoogleTranslateBanner();

  useEffect(() => {
    // Salvar idioma no localStorage quando mudar
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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

