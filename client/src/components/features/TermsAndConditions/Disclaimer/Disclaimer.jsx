// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Styles
import styles from "./Disclaimer.module.css";

/**
 * Component for rendering a terms and conditions disclaimer.
 * @returns {JSX.Element} React component. */
const Disclaimer = () => {
  const { t } = useTranslation();

  const lastUpdateDate = new Date("05.03.2024").toLocaleDateString();

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
