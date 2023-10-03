import React from "react";
import {
  faRightFromBracket,
  faShareNodes,
  faCircleInfo,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import NavigateFontAwesomeIcon from "../NavigateFontAwesomeIcon/NavigateFontAwesomeIcon";
import styles from "./UserActionsComponent.module.css";
import WebShareApiInvite from "../WebShareApiInvite/WebShareApiInvite";

const UserActionsContainer = ({ groupCode, groupName }) => {
  // Check if Web Share API is supported
  const isWebShareAPISupported = navigator.share !== undefined;

  return (
    <div className={styles.container}>
      {isWebShareAPISupported ? (
        <WebShareApiInvite groupCode={groupCode} groupName={groupName} />
      ) : (
        <>
          <NavigateFontAwesomeIcon
            icon={faShareNodes}
            route={`/share-group/${groupName}/${groupCode}`}
            tooltip="Invite & share group"
          />
          <NavigateFontAwesomeIcon
            icon={faCircleInfo}
            route={`/copy-groupcode/${groupName}/${groupCode}`}
            tooltip={`GroupCode: ${groupCode}`}
          />
          <NavigateFontAwesomeIcon
            icon={faMessage}
            route={`/feedback/${groupCode}`}
            tooltip="Feedback"
          />
          <NavigateFontAwesomeIcon
            icon={faRightFromBracket}
            route={`/leave-group/${groupName}/${groupCode}`}
            tooltip="Leave group"
          />
        </>
      )}
    </div>
  );
};

export default UserActionsContainer;
