// React and Third-Party Libraries
import React from "react";

// Components
import HeaderLogo from "../HeaderLogo/HeaderLogo";

// Styles
import styles from "./Header.module.css";

/**
 * Application header component rendering a logo.
 * @returns {JSX.Element} React component. */
const Header = () => {
  return (
    <header className={styles.header}>
      <HeaderLogo />
    </header>
  );
};

export default Header;
