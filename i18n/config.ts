import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import zh from './zh';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh }
    },
    lng: 'zh', // Changed from 'en' to 'zh'
    fallbackLng: 'zh', // Changed from 'en' to 'zh'
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;