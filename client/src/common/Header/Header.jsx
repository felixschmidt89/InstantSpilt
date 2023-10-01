import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import Logo from "../../components/Logo/Logo";

function Header() {
  return (
    <header className={styles.header}>
      <Logo />
    </header>
  );
}

export default Header;
