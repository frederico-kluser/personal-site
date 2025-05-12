import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';

function LanguageSelector() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  
  // Update state when language changes
  useEffect(() => {
    setCurrentLang(i18n.language);
  }, [i18n.language]);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
  };

  return (
    <motion.div 
      className="language-selector"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <div className="current-language">
        <span className="language-label">{languages.find(lang => lang.code === currentLang.substring(0, 2))?.flag || '🌐'}</span>
      </div>
      <motion.ul className="language-dropdown">
        {languages.map((language) => (
          <motion.li 
            key={language.code}
            className={`language-option ${language.code === currentLang.substring(0, 2) ? 'active' : ''}`}
            onClick={() => changeLanguage(language.code)}
            whileHover={{
              scale: 1.05,
              color: 'var(--matrix-green)',
              transition: { duration: 0.2 }
            }}
          >
            <span className="language-flag">{language.flag}</span>
            <span className="language-name">{language.name}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

export default LanguageSelector;