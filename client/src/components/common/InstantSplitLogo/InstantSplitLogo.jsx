// React and Third-Party Libraries
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// Styles
import styles from "./InstantSplitLogo.module.css";

const InstantSplitLogo = ({ linkToInstantSplitPage = true }) => {
  return (
    <>
      {/* Preload the logo image */}
      <Helmet>
        <link rel='preload' href='/logo_coloured.svg' as='image' />
      </Helmet>
      {linkToInstantSplitPage ? (
        <Link to='/instant-split' className={styles.logoLink}>
          <img
            src='/logo_coloured.svg'
            alt='Logo'
            className={styles.logoImage}
          />
        </Link>
      ) : (
        <img src='/logo_coloured.svg' alt='Logo' className={styles.logoImage} />
      )}
    </>
  );
};

export default InstantSplitLogo;
