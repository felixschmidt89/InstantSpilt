import React from "react";
import {
  faRightFromBracket,
  faShareNodes,
  faCircleInfo,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import NavigateFontAwesomeIcon from "../NavigateFontAwesomeIcon/NavigateFontAwesomeIcon";
import styles from "./UserActionsComponent.module.css";

const UserActionsContainer = ({ groupCode, groupName }) => {
  // TODO: Test Web Share Api component and conditionally render on mobile devices
  return (
    <div className={styles.container}>
      {/* <InviteGroupMembers groupCode={groupCode} groupName={groupName} /> */}
      <NavigateFontAwesomeIcon
        icon={faShareNodes}
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
        route={`/feedback/${groupName}/${groupCode}`}
        tooltip={"Feedback"}
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
