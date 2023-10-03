import React from "react";
import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to='/' className={styles.logoLink}>
      <img src='/logo.png' alt='Logo' className={styles.logoImage} />
    </Link>
  );
}

export default Logo;
