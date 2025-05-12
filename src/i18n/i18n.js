import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  // Load translations from /public/locales
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    // Default language
    fallbackLng: 'en',
    // Debug mode in development
    debug: import.meta.env.DEV,
    // Allow keys to be used as fallbacks if value is missing
    defaultNS: 'common',
    // Namespace separator
    nsSeparator: ':',
    // Enable pluralization
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    // Language detection options
    detection: {
      // Order and from where user language should be detected
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      // Keys or params to lookup language from
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      lookupSessionStorage: 'i18nextLng',
      // Cache user language
      caches: ['localStorage', 'cookie'],
      // Optional expiration time for language cache
      cookieExpirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      // Optional domain for cookie
      cookieDomain: 'localhost',
    },
    // Preload languages
    preload: ['en', 'pt', 'es'],
    // Allow empty translations to return the key instead
    returnEmptyString: false,
    react: {
      useSuspense: true,
    },
  });

export default i18n;