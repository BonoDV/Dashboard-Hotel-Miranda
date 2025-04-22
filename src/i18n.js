import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/translation/en.json';
import esTranslation from './locales/translation/es.json';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// Translations
const resources = {
    en: { translation: enTranslation },
    es: { translation: esTranslation }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en', // Default language
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // React already safes from XSS
        }
    });


export default i18n;