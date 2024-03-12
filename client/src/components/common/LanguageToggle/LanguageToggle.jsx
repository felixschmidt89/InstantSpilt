//React and Third Party Libraries
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

// Styles
import styles from "./LanguageToggle.module.css";

// Language flags
import deFlag from "../../../../assets/flags/de.svg";
import enFlag from "../../../../assets/flags/gb.svg";

/**
 * Component for changing and persisting the language using react-i18next.
 * @returns {JSX.Element} React component.
 */
const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("language") || "de"
  );

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "de" ? "en" : "de";
    setCurrentLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  // Determine flag to render
  const flag = currentLanguage === "de" ? enFlag : deFlag;
  const altText = currentLanguage === "de" ? "English flag" : "German flag";

  return (
    <div className={styles.container}>
      <div className={styles.languageFlag} onClick={toggleLanguage}>
        <img src={flag} alt={altText} />
      </div>
    </div>
  );
};

export default LanguageToggle;
