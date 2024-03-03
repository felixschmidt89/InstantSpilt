import { useTranslation } from "react-i18next";
import { supportedLanguages } from "../../../i18n/config";
import styles from "./LocaleSwitcher.module.css";

const LocaleSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <div className={styles.container}>
      <select
        value={i18n.resolvedLanguage}
        onChange={(e) => i18n.changeLanguage(e.target.value)}>
        {Object.entries(supportedLanguages).map(([code, name]) => (
          <option value={code} key={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default LocaleSwitcher;
