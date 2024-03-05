//React and Third Party Libraries
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

// Constants and Utils
import { supportedLanguages } from "../../../i18n/config";

// Styles
import styles from "./LanguageSelect.module.css";

/**
 * Component for selecting, changing and persisting the language using react-i18next.
 * @returns {JSX.Element} React component.
 */
const LanguageSelect = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || i18n.resolvedLanguage
  );

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <div className={styles.container}>
      <select value={language} onChange={handleLanguageChange}>
        {Object.entries(supportedLanguages).map(([code, name]) => (
          <option value={code} key={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default LanguageSelect;
