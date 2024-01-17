// React and Third-Party Libraries
import React from "react";
import { Link } from "react-router-dom";

// Styles
import styles from "./HomeTermsAndConditionsSection.module.css";

/**
 * Component for rendering the terms and conditions section on the home page.
 *
 * @returns {JSX.Element} React component. */
const HomeTermsAndConditionsSection = () => {
  return (
    <p className={styles.terms}>
      By using InstantSplit you agree to our{" "}
      <span className={styles.noWrap}>
        <Link to='/terms-and-conditions/'>terms and conditions</Link>.
      </span>
    </p>
  );
};

export default HomeTermsAndConditionsSection;
