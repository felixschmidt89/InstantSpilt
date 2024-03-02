import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const useDynamicTranslation = (translationFile) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const loadTranslation = async () => {
      try {
        const languageCode = i18n.language.split("-")[0]; // Extract the language code
        const filePath = `/${translationFile}.${languageCode}.json`; // Construct the file path
        const translation = await import(`../hooks${filePath}`); // Dynamically import the correct translation file based on the language code
        i18n.addResourceBundle(
          i18n.language,
          "translation",
          translation.default,
          true,
          true
        );
      } catch (error) {
        console.error(`Error loading translation file ${filePath}:`, error);
      }
    };

    loadTranslation();

    return () => {
      // Cleanup function
      i18n.removeResourceBundle(i18n.language, "translation");
    };
  }, [i18n.language, translationFile]);
};

export default useDynamicTranslation;
