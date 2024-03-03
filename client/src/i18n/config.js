// Config file for i18next
import i18n from "i18next";
import HttpApi from "i18next-http-backend";

// Bindings for React: allow components to
// re-render when language changes.
import { initReactI18next } from "react-i18next";

export const supportedLanguages = {
  en: "🇬🇧",
  de: "🇩🇪",
};

i18n
  .use(HttpApi)
  .use(initReactI18next)
  // Initialize the i18next instance.
  .init({
    // Config options
    // default language (locale)
    lng: "de",
    // fallback locale
    fallbackLng: "en",
    supportedLngs: Object.keys(supportedLanguages),

    // Enable useful output in the browser’s dev console.
    debug: true,
    // React does escaping itself
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
