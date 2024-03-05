// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Styles
import styles from "./InstantSplitIntroSection.module.css";

/**
 * Component for rendering the introductory section explaining what InstantSplit is about.
 * @param {boolean} isInvitation - If true, the sentence about retaining data and opting out will be hidden.
 * @returns {JSX.Element} React component. */
const InstantSplitIntroSection = ({ isInvitation = false }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.introContainer}>
      {isInvitation ? (
        <p className={styles.introText}>
          {t("intro-section-invitation-intro-text")}:
        </p>
      ) : (
        <p className={styles.introText}>
          {t("intro-section-regular-intro-text")}:
        </p>
      )}
      <ul className={styles.list}>
        <li className={styles.listItem}>
          {t("intro-section-bullet-points-user-registration")}
        </li>{" "}
        <li className={styles.listItem}>
          {t("intro-section-bullet-points-app-installation")}
        </li>{" "}
        <li className={styles.listItem}>
          {t("intro-section-bullet-points-cookies")}
        </li>{" "}
        <li className={styles.listItem}>
          {t("intro-section-bullet-points-user-tracking")}
        </li>{" "}
        <li className={styles.listItem}>
          {t("intro-section-bullet-points-data-purge")}
        </li>{" "}
      </ul>
    </div>
  );
};

export default InstantSplitIntroSection;
