// React and Third-Party Libraries
import React from "react";
import { Link } from "react-router-dom";

// Styles
import styles from "./HeaderLogo.module.css";

/**
 * Header Logo component representing the application logo.
 * @returns {JSX.Element} React component. */
const HeaderLogo = () => {
  return (
    <Link to='/' className={styles.logoLink}>
      <img src='/logo.png' alt='Logo' className={styles.logoImage} />
    </Link>
  );
};

export default HeaderLogo;
