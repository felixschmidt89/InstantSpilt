import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // Import Helmet from react-helmet-async

import styles from "./InstantSplitLogo.module.css";

const InstantSplitLogo = ({ width = 25, linkToInstantSplitPage = true }) => {
  const logoStyle = {
    width: `${width}rem`,
    maxWidth: "30rem",
    minWidth: "20rem",
  };

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

  return (
    <>
      {/* Preload the logo image */}
      <Helmet>
        <link rel='preload' href='/logo_coloured.svg' as='image' />
      </Helmet>
      {logoContent}
    </>
  );
};

export default InstantSplitLogo;
