// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";

// Components
import ActiveGroupBar from "../../ActiveGroupBar/ActiveGroupBar";

// Styles
import styles from "./ActiveGroupBarExplanation.module.css";

/**
 * Component for rendering ActiveGroupBar explanation.
 * @returns {JSX.Element} React component.
 */
const ActiveGroupBarExplanation: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.container}>
        <h2>{t("tutorial-active-group-bar-header")}</h2>
      </div>
      <div className={styles.bar}>
        <ActiveGroupBar applyBottomMargin={false} />
      </div>
    </>
  );
};

export default ActiveGroupBarExplanation;
