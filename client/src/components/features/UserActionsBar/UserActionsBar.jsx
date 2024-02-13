// React and Third-Party Libraries
import React from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoEnterOutline } from "react-icons/io5";
import { PiUserSwitchLight } from "react-icons/pi";
import { IoChatboxOutline } from "react-icons/io5";

// Components
import ReactIconNavigate from "../../common/InAppNavigation/ReactIconNavigate/ReactIconNavigate";

// Styles
import styles from "./UserActionsBar.module.css";

/**
 * UserActionsBar component rendering tutorial, feedback and group management function icons.
 *
 * @param {Object} props - The component props.
 * @param {string} props.groupCode - The group code.
 *  @param {string} props.groupName - The initial group name.
 * @param {string} props.initialGroupName - The initial group name.
 * @returns {JSX.Element} UserActionsBar component.
 */
const UserActionsBar = ({ groupCode, initialGroupName, groupName }) => {
  return (
    <div className={styles.container}>
      <ReactIconNavigate
        icon={IoInformationCircleOutline}
        containerHeight='7'
        containerWidth='6'
        explanationText='tutorial'
        tooltip='show explanation of main functions'
        route={`/tutorial/${initialGroupName}/${groupCode}`}
        iconSize={3.5}
        iconScale={1.1}
      />
      <ReactIconNavigate
        icon={IoChatboxOutline}
        containerHeight='7'
        containerWidth='7'
        explanationText='feedback'
        tooltip='contact InstantSplit team'
        route={`/contact/${groupCode}`}
        iconSize={3.5}
      />
      <ReactIconNavigate
        icon={IoPersonAddOutline}
        containerHeight='7'
        containerWidth='9'
        explanationText='invite to group'
        tooltip='share access to this group'
        route={`/share-group/${initialGroupName}/${groupCode}`}
        iconSize={3.5}
        iconScale={0.9}
      />
      <ReactIconNavigate
        icon={PiUserSwitchLight}
        containerHeight='7'
        containerWidth='9'
        explanationText='switch/create group'
        tooltip='switch, create or join other groups'
        route={`/manage-groups`}
        iconSize={3.5}
      />
      <ReactIconNavigate
        icon={IoEnterOutline}
        containerHeight='7'
        containerWidth='5'
        explanationText='leave group'
        tooltip='leave this group'
        route={`/leave-group/${groupName}/${groupCode}`}
        iconSize={3.5}
      />
    </div>
  );
};

export default UserActionsBar;
