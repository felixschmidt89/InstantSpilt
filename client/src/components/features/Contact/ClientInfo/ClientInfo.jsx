// React and Third Party Libraries
import React from "react";
import { usePWAInstall } from "react-use-pwa-install";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { devLog } from "../../../../utils/errorUtils";

// Hooks
import useGetClientDeviceAndPwaInfo from "../../../../hooks/useGetClientDeviceAndPwaInfo";

// Styles
import styles from "./ClientInfo.module.css";

/**
 * Accordion component for rendering client device and PWA information for debugging.
 * @returns {JSX.Element} React component.
 */
const ClientInfo = () => {
  const { t } = useTranslation();

  // use library to check if PWA install prompt is available
  const isPWAInstallPromptAvailable = usePWAInstall();
  devLog("isPWAInstallPromptAvailable", isPWAInstallPromptAvailable);

  const { isPwa, isMobile, isAndroid, isMobileSafari, isIOS, browserName } =
    useGetClientDeviceAndPwaInfo();

  return (
    <div className={styles.clientAccordionContainer}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1-content'
          id='panel1-header'
          className={styles.accordionSummary}>
          {" "}
          {t("client-info-accordion-title")}
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <ul className={styles.clientInfoList}>
              <li>mobile: {isMobile ? "Yes" : "No"}</li>
              <li>browser: {browserName}</li>
              <li>mobile safari: {isMobileSafari ? "Yes" : "No"}</li>
              <li>iOS: {isIOS ? "Yes" : "No"}</li>
              <li>Android: {isAndroid ? "Yes" : "No"}</li>
              <li>Pwa: {isPwa ? "Yes" : "No"} </li>
              <li>
                PWAPromptAvailable: {isPWAInstallPromptAvailable ? "Yes" : "No"}
              </li>
            </ul>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ClientInfo;
