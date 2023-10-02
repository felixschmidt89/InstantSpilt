import React from "react";
import {
  faRightFromBracket,
  faShareNodes,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import NavigateIcon from "../NavigateIcon/NavigateIcon";
import styles from "./UserActionsComponent.module.css";

const UserActionsContainer = ({ groupCode, groupName }) => {
  // TODO: Test Web Share Api component and conditionally render on mobile devices
  return (
    <div className={styles.container}>
      {/* <InviteGroupMembers groupCode={groupCode} groupName={groupName} /> */}
      <NavigateIcon
        icon={faShareNodes}
        route={`/share-group/${groupName}/${groupCode}`}
        tooltip='Invite & share group'
      />
      <NavigateIcon
        icon={faCircleInfo}
        route={`/instant-split/`}
        tooltip={`GroupCode: ${groupCode}`}
      />
      <NavigateIcon
        icon={faRightFromBracket}
        route={`/leave-group/${groupName}/${groupCode}`}
        tooltip='Leave group'
      />
    </div>
  );
};

export default UserActionsContainer;
