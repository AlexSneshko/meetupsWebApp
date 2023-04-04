import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import I18NextHttpBackend from 'i18next-http-backend';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(I18NextHttpBackend)
  .init({
    debug: false,
    fallbackLng: ["en", "ru"],
    interpolation: {
      escapeValue: false, 
    }
  });

export default i18n;