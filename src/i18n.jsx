import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import JSON translations
import en from "./locales/en/translation.json";
import fr from "./locales/fr/translation.json";
import es from "./locales/es/translation.json"; // added Spanish

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      es: { translation: es }, // Spanish resource
    },
    lng: "en", // default language
    fallbackLng: "en", // fallback language
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    debug: true, // enables console logs for debugging
  });

export default i18n;
