// React and Third-Party Libraries
import React from "react";
import { Link } from "react-router-dom";
import LocaleSwitcher from "../LocaleSwitcher/LocaleSwitcher";

// Styles
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <LocaleSwitcher />

      {/* GitHub repository */}
      <a
        href='https://github.com/felixschmidt89/InstantSpilt'
        target='_blank'
        rel='noopener noreferrer'
        className={styles.link}>
        GitHub
      </a>
      {/* Legal Notice */}
      <Link to='/legal-notice' className={styles.link}>
        Legal Notice
      </Link>
      {/* Terms and Conditions */}
      <Link to='/terms-and-conditions' className={styles.link}>
        T&C
      </Link>
    </footer>
  );
};

export default Footer;
