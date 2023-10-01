import React from "react";
import {
  faRightFromBracket,
  faShareNodes,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import NavigateIcon from "../NavigateIcon/NavigateIcon";
import styles from "./UserActionsComponent.module.css";

const UserActionsContainer = ({ groupCode, groupName }) => {
  console.log(groupCode);

  return (
    <div className={styles.container}>
      <NavigateIcon
        icon={faShareNodes}
        route={`/invite-users/${groupName}/${groupCode}`}
        tooltip='Invite group members'
      />
      <NavigateIcon icon={faCircleInfo} tooltip={`GroupCode: ${groupCode}`} />
      <NavigateIcon
        icon={faRightFromBracket}
        route={`/leave-group/${groupName}/${groupCode}`}
        tooltip='Leave group'
      />
    </div>
  );
};

export default UserActionsContainer;
