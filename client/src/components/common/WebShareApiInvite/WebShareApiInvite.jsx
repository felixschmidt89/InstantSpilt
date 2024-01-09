import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import styles from "./WebShareApiInvite.module.css";
import { devLog } from "../../../utils/errorUtils";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const WebShareApiInvite = ({ groupCode, groupName }) => {
  const title = "InstantSplit invitation to settle group expenses";
  const text = `Hi! You're invited to join our InstantSplit group ${groupName} to manage and settle expenses.`;
  const url = `${baseUrl}/join/${groupName}/${groupCode}`;

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
    <div className={styles.icon} onClick={handleShareClick}>
      <FontAwesomeIcon icon={faShareNodes} />
    </div>
  );
};

export default WebShareApiInvite;
