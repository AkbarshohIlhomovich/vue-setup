// src/plugins/i18n/index.js
const STORAGE_KEY = 'locale';

// Import all translation files using Vite's import.meta.glob
const translationFiles = import.meta.glob('./translations/*.json', { eager: true });

// Extract available languages from the translation files
const languages = Object.keys(translationFiles).map(file => {
  const match = file.match(/\.\/translations\/(\w+)\.json/);
  return match ? match[1] : null;
}).filter(Boolean);

export const i18nPlugin = {
  install: (app) => {
    // Initialize translations cache
    const translationsCache = {};

    // Load translations from the imported files
    Object.entries(translationFiles).forEach(([path, module]) => {
      const match = path.match(/\.\/translations\/(\w+)\.json/);
      if (match) {
        const lang = match[1];
        translationsCache[lang] = module.default || module;
      }
    });

    // Get initial language
    const getInitialLanguage = () => {
      const storedLanguage = localStorage.getItem(STORAGE_KEY);
      if (storedLanguage && languages.includes(storedLanguage)) {
        return storedLanguage;
      }

      const browserLanguage = navigator.language.split('-')[0];
      if (languages.includes(browserLanguage)) {
        return browserLanguage;
      }

      return 'en'; // Fallback language
    };

    // Set initial language
    app.config.globalProperties.$language = getInitialLanguage();

    // Translation function
    app.config.globalProperties.$l = function(key, fallback = '') {
      const language = this.$language;
      const translations = translationsCache[language];

      if (!translations) {
        console.warn(`Translations for language ${language} not found`);
        return fallback || key;
      }

      return translations[key] || fallback || key;
    };

    // Language switcher function
    app.config.globalProperties.$setLanguage = function(language) {
      if (languages.includes(language)) {
        this.$language = language;
        localStorage.setItem(STORAGE_KEY, language);
      } else {
        console.warn(`Language ${language} not supported`);
      }
    };

    // Expose available languages
    app.config.globalProperties.$availableLanguages = languages;
  }
};