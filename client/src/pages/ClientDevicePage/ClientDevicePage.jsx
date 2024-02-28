// React and Third Party Libraries
import React from "react";

// Hooks
import useGetClientDeviceAndPwaInfo from "../../hooks/useGetClientDeviceAndPwaInfo";

// Components
import InAppNavigationBar from "../../components/common/InAppNavigation/InAppNavigationBar/InAppNavigationBar";

// Styles
import styles from "./ClientDevicePage.module.css";

/**
 * Page for rendering client device information for debugging.
 * @returns {JSX.Element} React component.
 */
const ClientDevicePage = () => {
  const { isPwa, isMobile, isAndroid, isMobileSafari, isIOS, browserName } =
    useGetClientDeviceAndPwaInfo();

  return (
    <main>
      <InAppNavigationBar home={true} />
      <h1>client info</h1>
      <div className={styles.container}>
        <div>
          <h2>debug info</h2>
          <ul>
            <li>is Mobile: {isMobile ? "Yes" : "No"}</li>
            <li>Browser: {browserName}</li>
            <li>is Mobile Safari: {isMobileSafari ? "Yes" : "No"}</li>
            <li>is iOS: {isIOS ? "Yes" : "No"}</li>
            <li>is Android: {isAndroid ? "Yes" : "No"}</li>
            <li>isPwa: {isPwa ? "Yes" : "No"} </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default ClientDevicePage;
