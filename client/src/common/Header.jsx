import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <Link to='/' style={{ textDecoration: "none" }}>
        InstantSplit
      </Link>
    </header>
  );
}

export default Header;
