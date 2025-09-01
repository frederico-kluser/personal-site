import { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Import all language specific data
import enAbout from '../i18n/translations/about/en';
import ptAbout from '../i18n/translations/about/pt';
import esAbout from '../i18n/translations/about/es';

import enBlog from '../i18n/translations/blog/en';
import ptBlog from '../i18n/translations/blog/pt';
import esBlog from '../i18n/translations/blog/es';

import enServices from '../i18n/translations/services/en';
import ptServices from '../i18n/translations/services/pt';
import esServices from '../i18n/translations/services/es';

// Create the context
const LanguageContext = createContext();

// Data organized by language and section
const languageData = {
  en: {
    about: enAbout,
    blog: enBlog,
    services: enServices
  },
  pt: {
    about: ptAbout,
    blog: ptBlog,
    services: ptServices
  },
  es: {
    about: esAbout,
    blog: esBlog,
    services: esServices
  }
};

export function LanguageProvider({ children }) {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language.substring(0, 2));
  const [contentData, setContentData] = useState({
    about: languageData.en.about,
    blog: languageData.en.blog,
    services: languageData.en.services
  });

  // Update the data when the language changes
  useEffect(() => {
    const lang = i18n.language.substring(0, 2);
    setCurrentLanguage(lang);
    
    // Use the language data if it exists, otherwise fallback to English
    const langData = languageData[lang] || languageData.en;
    
    setContentData({
      about: langData.about,
      blog: langData.blog,
      services: langData.services
    });
  }, [i18n.language]);

  return (
    <LanguageContext.Provider value={{ contentData, currentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguageContext() {
  return useContext(LanguageContext);
}