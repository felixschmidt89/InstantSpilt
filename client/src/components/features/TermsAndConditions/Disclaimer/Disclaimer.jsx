// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Styles
import styles from "./Disclaimer.module.css";

/**
 * Component for rendering a terms and conditions disclaimer.
 * @param {string} lastUpdateDate - The last time, the Terms and Conditions have been updated
 * @returns {JSX.Element} React component. */
const Disclaimer = ({ lastUpdateDate }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h2>{t("disclaimer-header")}</h2>
      <p className={styles.disclaimer}>
        {t("disclaimer-copy")} <strong>{lastUpdateDate}</strong>.
      </p>
    </div>
  );
};

export default Disclaimer;
