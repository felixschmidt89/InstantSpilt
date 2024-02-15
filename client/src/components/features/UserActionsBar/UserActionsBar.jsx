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
const UserActionsBar = ({
  groupCode,
  initialGroupName,
  groupName,
  switchToTopBar,
}) => {
  return (
    <div className={styles.container}>
      <ReactIconNavigate
        icon={IoInformationCircleOutline}
        containerHeight='5.8'
        containerWidth='9'
        explanationText='tutorial'
        route={`/tutorial/${initialGroupName}/${groupCode}`}
        iconSize={3}
        iconScale={1.05}
      />
      <ReactIconNavigate
        icon={IoChatboxOutline}
        containerHeight='5.8'
        containerWidth='9'
        explanationText='feedback'
        route={`/contact/${groupCode}`}
        iconSize={3}
        iconScale={0.95}
      />
      <ReactIconNavigate
        icon={PiUserSwitchLight}
        containerHeight='5.8'
        containerWidth='9'
        explanationText='switch/create group'
        route={`/manage-groups`}
        iconSize={3}
        iconScale={1.05}
      />
      <ReactIconNavigate
        icon={IoPersonAddOutline}
        containerHeight='5.8'
        containerWidth='9'
        explanationText='invite to group'
        route={`/share-group/${initialGroupName}/${groupCode}`}
        iconSize={3}
        iconScale={0.9}
      />
      <ReactIconNavigate
        icon={IoEnterOutline}
        containerHeight='5.8'
        containerWidth='9'
        explanationText='leave group'
        route={`/leave-group/${groupName}/${groupCode}`}
        iconSize={3}
        iconScale={0.95}
        translateX={-0.3}
      />
    </div>
  );
};

export default UserActionsBar;
