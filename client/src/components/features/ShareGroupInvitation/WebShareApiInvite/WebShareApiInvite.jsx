// React and Third-Party Libraries
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShareIcon from "@mui/icons-material/Share";
import { Button } from "@mui/material";

// Constants and Utils
import { devLog } from "../../../../utils/errorUtils";

// Styles
import styles from "./WebShareApiInvite.module.css";
import { buttonStyles } from "../../../../constants/stylesConstants";

// BASE URL
const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

/**
 * WebShareApiInvite component for inviting users to join the group via the Web Share API.
 *
 * @param {string} groupCode - The groupCode identifying the group.
 * @param {string} groupName - The name of the group.
 * @param {string} initialGroupName - The group name set during group creation.
 * @returns {JSX.Element} React component. */
const WebShareApiInvite = ({ groupCode, groupName, initialGroupName }) => {
  const title = "Invitation to InstantSplit";
  const text = `Join ${groupName} to manage and settle our expenses.`;
  const url = `${baseUrl}/join-instantsplit-group/${initialGroupName}/${groupCode}`;

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
        share
      </Button>
    </span>
  );
};

export default WebShareApiInvite;
