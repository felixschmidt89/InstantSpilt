import React from "react";
import Logo from "../../components/singleComponents/Logo/Logo";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <Logo />
    </header>
  );
}

export default Header;
