import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const LanguageContext = createContext();

const defaultLanguage = 'en';
const supportedLanguages = ['en', 'es', 'ca'];

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return supportedLanguages.includes(saved) ? saved : defaultLanguage;
  });

  const [translations, setTranslations] = useState({});

  const loadTranslations = useCallback(async (lang) => {
    try {
      // TODO: Implement dynamic import of translation files
      const response = await fetch(`/locales/${lang}.json`);
      const data = await response.json();
      setTranslations(data);
    } catch (error) {
      console.error(`Error loading translations for ${lang}:`, error);
    }
  }, []);

  const changeLanguage = useCallback(async (lang) => {
    if (supportedLanguages.includes(lang)) {
      setCurrentLanguage(lang);
      localStorage.setItem('language', lang);
      await loadTranslations(lang);
    } else {
      console.error(`Language ${lang} is not supported`);
    }
  }, [loadTranslations]);

  const translate = useCallback((key, params = {}) => {
    let text = translations[key] || key;
    
    // Replace parameters in the translation string
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(`{${param}}`, value);
    });
    
    return text;
  }, [translations]);

  useEffect(() => {
    loadTranslations(currentLanguage);
  }, [currentLanguage, loadTranslations]);

  const value = {
    language: currentLanguage,
    supportedLanguages,
    changeLanguage,
    translate,
    t: translate // Alias for translate
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
