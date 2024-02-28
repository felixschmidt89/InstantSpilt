import React from "react";
import styles from "./RenderInstallPwaCta.module.css";
import InstallPwaFirefox from "../InstallPwaFirefox/InstallPwaFirefox";
import InstallPwaSafari from "../InstallPwaSafari/InstallPwaSafari";
import InstallPwaSamsungBrowser from "../InstallPwaSamsungBrowser/InstallPwaSamsungBrowser";

const RenderInstallPwaCta = ({
  displayPrompt,
  closePrompt,
  setIsCtaModalVisible,
}) => {
  // Determine which component to render based on the value of displayPrompt
  const Prompt = () => {
    let component;
    switch (displayPrompt) {
      case "firefox":
        component = <InstallPwaFirefox closePrompt={closePrompt} />;
        break;
      case "iPadIPhone":
        component = <InstallPwaSafari closePrompt={closePrompt} />;
        break;
      case "samsung":
        component = <InstallPwaSamsungBrowser closePrompt={closePrompt} />;
        break;
      default:
        component = null; // If displayPrompt doesn't match any case, render nothing
    }
    return <>{component}</>;
  };

  return (
    <>
      {displayPrompt !== "" && (
        <div className={styles.container}>
          <Prompt />
        </div>
      )}
    </>
  );
};

export default RenderInstallPwaCta;
