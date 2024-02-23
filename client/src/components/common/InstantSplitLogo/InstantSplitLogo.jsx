// React and Third-Party Libraries
import React from "react";
import { Link } from "react-router-dom";

// Styles
import styles from "./InstantSplitLogo.module.css";

/**
 * InstantSplitLogo component representing the application logo.
 * @param {Object} props - The component props.
 * @param {number} [props.width=50] - Width of the logo in percent units.
 * @param {boolean} [props.linkToInstantSplitPage=true] - Whether to render the link to /instant-split page. Defaults to true.
 * @returns {JSX.Element} React component.
 */
const InstantSplitLogo = ({ width = 25, linkToInstantSplitPage = true }) => {
  const logoStyle = {
    width: `${width}rem`,
    maxWidth: "30rem",
    minWidth: "20rem",
  };

  // Conditionally render the Link component based on linkToInstantSplitPage prop
  const logoContent = linkToInstantSplitPage ? (
    <Link to='/instant-split' className={styles.logoLink}>
      <img
        src='/logo_coloured.svg'
        alt='Logo'
        className={styles.logoImage}
        style={logoStyle}
      />
    </Link>
  ) : (
    <img
      src='/logo_coloured.svg'
      alt='Logo'
      className={styles.logoImage}
      style={logoStyle}
    />
  );

  return logoContent;
};

export default InstantSplitLogo;
