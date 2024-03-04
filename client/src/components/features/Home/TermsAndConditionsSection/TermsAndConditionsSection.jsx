// React and Third-Party Libraries
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { setRouteInLocalStorage } from "../../../../utils/localStorageUtils";

// Styles
import styles from "./TermsAndConditionsSection.module.css";

/**
 * Component for rendering the terms and conditions section on the home page.
 *
 * @returns {JSX.Element} React component. */
const TermsAndConditionsSection = () => {
  const { t } = useTranslation();
  // Ensure that T&C page routes back to group invitation page
  const handleLinkClick = () => {
    setRouteInLocalStorage(window.location.pathname, "previousRoute");
  };

  return (
    <p className={styles.terms}>
      {t("terms-and-conditions-section-text")}{" "}
      <span>
        <Link to='/terms-and-conditions/' onClick={handleLinkClick}>
          {t("terms-and-conditions-section-tnc")}
        </Link>
        {t("terms-and-conditions-section-append")}.
      </span>
    </p>
  );
};

export default TermsAndConditionsSection;
