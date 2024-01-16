// React and Third-Party Libraries
import React from "react";

// Components
import LinkToPage from "../../../common/InAppNavigation/LinkToPage/LinkToPage";

// Styles
import styles from "./ShowTermsAndConditions.module.css";

/**
 * Component to mention and link to terms and conditions.
 *
 * @component
 * @returns {JSX.Element} - Rendered component.
 */

const ShowTermsAndConditions = () => {
  return (
    <p className={styles.terms}>
      By using InstantSplit you agree to our{" "}
      <span className={styles.noWrap}>
        <LinkToPage to={"/terms-and-conditions"} setPreviousRoute={true}>
          terms and conditions
        </LinkToPage>
      </span>
    </p>
  );
};

export default ShowTermsAndConditions;
