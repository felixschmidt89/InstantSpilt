// React and Third-Party Libraries
import React from "react";
import { Button } from "@mui/material";
import { usePWAInstall } from "react-use-pwa-install";

// Constants and Utils
import { buttonStyles } from "../../../../constants/stylesConstants";

// Styles
import styles from "./InstallPwaPrompt.module.css";

/**
 * Renders instructions for installing PWA via Chrome Android app.
 * @returns {JSX.Element} React component.
 */

const InstallPwaPrompt = () => {
  // use library to install PWA
  const handleInstallPWA = usePWAInstall();
  return (
    <div className={styles.container}>
      <p className={styles.text}>For the best experience:</p>
      <Button
        style={buttonStyles}
        variant='contained'
        onClick={handleInstallPWA}>
        install our app
      </Button>
    </div>
  );
};

export default InstallPwaPrompt;
