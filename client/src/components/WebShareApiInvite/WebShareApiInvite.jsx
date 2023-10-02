import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

const WebShareApiInvite = ({ groupCode, groupName }) => {
  const title = "InstantSplit invitation to settle group expenses";
  const text = `You've been invited to join ${groupName}`;
  const url = `${baseUrl}/groups/join/${groupCode}`;

  const handleShareClick = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text,
          url,
        });
        console.log("Successfully shared.");
      } else {
        console.log("Web Share API is not supported on this device.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <button onClick={handleShareClick}>
      <FontAwesomeIcon icon={faShareNodes} />
    </button>
  );
};

export default WebShareApiInvite;