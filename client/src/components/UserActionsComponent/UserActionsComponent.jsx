//DONE adding only meaningful necessary comments

import React from "react";
import {
  faRightFromBracket,
  faUserPlus,
  faCircleInfo,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./UserActionsComponent.module.css";
import WebShareApiInvite from "../WebShareApiInvite/WebShareApiInvite";
import NavigateFontAwesomeIcon from "../reuseableComponents/NavigateFontAwesomeIcon/NavigateFontAwesomeIcon";

/**
 * Container to hold and render all user related actions:
 * Checks if Web Share API is supported on client's device, if so: renders WebShareApiInvite.
 * Always renders Icon based links to 1) invite users, 2) copy groupCode, 3) send feedback, 4) delete groupCode from device
 *
 * @param {string} props.groupCode - The code of the group.
 * @param {string} props.groupName - The name of the group.
 */
const UserActionsContainer = ({ groupCode, groupName }) => {
  // Check if Web Share API is supported on client's device
  const isWebShareAPISupported = navigator.share !== undefined;

  return (
    <div className={styles.container}>
      {isWebShareAPISupported && (
        <div className={styles.WebShare}>
          <WebShareApiInvite groupCode={groupCode} groupName={groupName} />
        </div>
      )}
      <NavigateFontAwesomeIcon
        icon={faUserPlus}
        route={`/share-group/${groupName}/${groupCode}`}
        tooltip='Invite & share group'
      />
      <NavigateFontAwesomeIcon
        icon={faCircleInfo}
        route={`/copy-groupcode/${groupName}/${groupCode}`}
        tooltip={`GroupCode: ${groupCode}`}
      />
      <NavigateFontAwesomeIcon
        icon={faMessage}
        route={`/feedback/${groupCode}`}
        tooltip='Feedback'
      />
      <NavigateFontAwesomeIcon
        icon={faRightFromBracket}
        route={`/leave-group/${groupName}/${groupCode}`}
        tooltip='Leave group'
      />
    </div>
  );
};

export default UserActionsContainer;
