// React and Third-Party Libraries
import React from "react";
import ShareIcon from "@mui/icons-material/Share";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

// Constants and Utils
import { devLog } from "../../../../utils/errorUtils";

// Styles
import styles from "./WebShareApiInvite.module.css";
import { buttonStyles } from "../../../../constants/stylesConstants";

/**
 * WebShareApiInvite component for inviting users to join the group via the Web Share API.
 *
 * @param {Object} props - The component props.
 * @param {string} props.groupName - The name of the group.
 * @param {string} props.invitationLink - The group's invitation link.
 * @returns {JSX.Element} React component.
 */
const WebShareApiInvite = ({ groupName, invitationLink }) => {
  const { t } = useTranslation();
  const title = t("web-share-api-invite-title", { groupName });
  const text = t("web-share-api-invite-text", { groupName });
  const url = invitationLink;

  const handleShareClick = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text,
          url,
        });
        devLog("Invite shared successfully via WebShareApi.");
      }
    } catch (error) {
      devLog("Error sharing invite via WebShareApi:", error);
    }
  };

  return (
    <span className={styles.icon} onClick={handleShareClick}>
      <Button
        variant='contained'
        style={buttonStyles}
        startIcon={<ShareIcon />}
        onClick={handleShareClick}>
        {t("web-share-api-invite-button")}
      </Button>
    </span>
  );
};

export default WebShareApiInvite;
