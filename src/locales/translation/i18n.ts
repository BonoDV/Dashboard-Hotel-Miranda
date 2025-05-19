import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "./en.json";
import esTranslation from "./es.json";
import vaTranslation from "./va.json";

const resources = {
  en: { translation: enTranslation },
  es: { translation: esTranslation },
  va: { translation: vaTranslation },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en", // Idioma por defecto
    supportedLngs: ["en", "es", "va"], // Idiomas soportados
    detection: {
      order: ["localStorage", "navigator"], // Orden de detección
      caches: [], // Solo usar localStorage para cachear
      lookupLocalStorage: "i18nextLng", // Clave específica
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
