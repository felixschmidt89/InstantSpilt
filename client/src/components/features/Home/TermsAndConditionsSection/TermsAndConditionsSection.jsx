// React and Third-Party Libraries
import React from "react";
import { Link } from "react-router-dom";

// Constants and Utils
import { setRouteInLocalStorage } from "../../../../utils/localStorageUtils";

// Styles
import styles from "./TermsAndConditionsSection.module.css";

/**
 * Component for rendering the terms and conditions section on the home page.
 *
 * @returns {JSX.Element} React component. */
const TermsAndConditionsSection = () => {
  // Ensure that T&C page routes back to group invitation page
  const handleLinkClick = () => {
    setRouteInLocalStorage(window.location.pathname, "previousRoute");
  };

  return (
    <p className={styles.terms}>
      By using InstantSplit you agree to our{" "}
      <span>
        <Link to='/terms-and-conditions/' onClick={handleLinkClick}>
          terms and conditions
        </Link>
        .
      </span>
    </p>
  );
};

export default TermsAndConditionsSection;
