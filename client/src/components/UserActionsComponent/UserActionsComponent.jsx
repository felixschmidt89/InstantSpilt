import React from "react";
import {
  faRightFromBracket,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import NavigateIcon from "../NavigateIcon/NavigateIcon";

const UserActionsContainer = ({ groupCode, groupName }) => {
  console.log(groupCode);

  return (
    <>
      <NavigateIcon
        icon={faShareNodes}
        route={`/invite-users/${groupName}/${groupCode}`}
        tooltip='Invite group members'
      />
      <NavigateIcon
        icon={faRightFromBracket}
        route={`/leave-group/${groupName}/${groupCode}`}
        tooltip='Leave group'
      />
    </>
  );
};

export default UserActionsContainer;
