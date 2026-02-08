import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import fr from './fr';

const getSavedLanguage = (): string => {
  try {
    const settings = JSON.parse(localStorage.getItem('taskflow-settings') || '{}');
    return settings?.state?.language || 'en';
  } catch {
    return 'en';
  }
};

i18n.use(initReactI18next).init({
  resources: { en, fr },
  lng: getSavedLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
