// React and Third-Party Libraries
import React from "react";
import { Link } from "react-router-dom";
import { usePWAInstall } from "react-use-pwa-install";

// Styles
import styles from "./Footer.module.css";

const Footer = () => {
  // PWA install hook
  const install = usePWAInstall();

  return (
    <footer className={styles.footer}>
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
      {/* Renders PWA install button if is not installed yet. Rendered by Brave and Chrome Browser on all OS except for iOS, hidden on rest  */}
      {install && (
        <a href='#' className={styles.installAppCta} onClick={install}>
          Install App
        </a>
      )}
    </footer>
  );
};

export default Footer;
