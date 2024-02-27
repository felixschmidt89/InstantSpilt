// React and Third Party Libraries
import React from "react";

// Hooks
import useUserAgent from "../../hooks/useUserAgent";

// Components
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

// Styles
import styles from "./ClientDevicePage.module.css";

/**
 * Component for displaying client device information for debugging.
 * @returns {JSX.Element} React component.
 */
const ClientDevicePage = () => {
  const { isMobile, userAgent, isIOS, isStandalone, userAgentString } =
    useUserAgent();

  return (
    <main>
      <InAppNavigationBar home={true} />
      <h1>Client Device</h1>
      <div className={styles.container}>
        <ul>
          <li>
            <strong>isMobile:</strong> {isMobile ? "true" : "false"}
          </li>
          <li>
            <strong>userAgent:</strong> {userAgent}
          </li>
          <li>
            <strong>isIOS:</strong> {isIOS ? "true" : "false"}
          </li>
          <li>
            <strong>isStandalone:</strong> {isStandalone ? "true" : "false"}
          </li>
          <li>
            <strong>userAgentString:</strong> {userAgentString}
          </li>
        </ul>
      </div>
    </main>
  );
};

export default ClientDevicePage;
