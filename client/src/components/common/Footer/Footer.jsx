// React and Third-Party Libraries
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// Components
import LocaleSwitcher from "../LocaleSwitcher/LocaleSwitcher";

// Styles
import styles from "./Footer.module.css";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <span className={styles.localeSwitcher}>
        <LocaleSwitcher />
      </span>
      {/* GitHub repository */}
      <a
        href='https://github.com/felixschmidt89/InstantSpilt'
        target='_blank'
        rel='noopener noreferrer'
        className={styles.link}>
        {t("footer-github-link")}
      </a>
      {/* Legal Notice */}
      <Link to='/legal-notice' className={styles.link}>
        {t("footer-legal-notice-link")}
      </Link>
      {/* Terms and Conditions */}
      <Link to='/terms-and-conditions' className={styles.link}>
        {t("footer-t&c-link")}
      </Link>
    </footer>
  );
};

export default Footer;
