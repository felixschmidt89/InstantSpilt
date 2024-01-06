import React from "react";
import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <Link to='/' className={styles.logoLink}>
      <img src='/logo.png' alt='Logo' className={styles.logoImage} />
    </Link>
  );
};

export default Logo;
