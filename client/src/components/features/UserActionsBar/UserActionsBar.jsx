// React and Third-Party Libraries
import React from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoHelpCircleOutline } from "react-icons/io5";
import { IoEnterOutline } from "react-icons/io5";
import { PiUserSwitchLight } from "react-icons/pi";
import { BiMessageError } from "react-icons/bi";

// Components
import ReactIconNavigate from "../../common/InAppNavigation/ReactIconNavigate/ReactIconNavigate";

// Styles
import styles from "./UserActionsBar.module.css";

/**
 * Renders a bar with icons for user-related actions:
 * - Invite others to join the group
 * - View tutorial
 * - Forget group on device
 *
 * @param {Object} props - The component props.
 * @param {string} props.groupCode - The code associated with the group.
 * @param {string} props.initialGroupName - The group name set during group creation.
 * @returns {JSX.Element} React component. */
const UserActionsBar = ({ groupCode, initialGroupName }) => {
  return (
    <div className={styles.container}>
      <span className={styles.icon}>
        {/* Icon navigating to contact developer page */}
        <ReactIconNavigate
          icon={BiMessageError}
          tooltip='contact'
          route={`/contact/${groupCode}`}
          iconSize={3.7}
          translateY={0.2}
        />
      </span>
      <span className={styles.icon}>
        {/* Icon navigating to leave group page */}
        <ReactIconNavigate
          icon={IoEnterOutline}
          tooltip='leave group'
          route={`/leave-group/${initialGroupName}/${groupCode}`}
          iconSize={4}
          marginRight={0.4}
        />
      </span>
      <span className={styles.icon}>
        {/* Icon navigating to switch group page */}
        <ReactIconNavigate
          icon={PiUserSwitchLight}
          tooltip='switch group'
          route={`/manage-groups`}
          iconSize={4.2}
          marginRight={0.1}
        />
      </span>
      <span className={styles.icon}>
        {/* Icon navigating to tutorial page */}
        <ReactIconNavigate
          icon={IoHelpCircleOutline}
          tooltip='tutorial'
          route={`/tutorial/${initialGroupName}/${groupCode}`}
          iconSize={4.2}
        />
      </span>
      <span className={styles.icon}>
        {/* Icon navigating to share group page */}
        <ReactIconNavigate
          icon={IoPersonAddOutline}
          tooltip='invite & share group'
          route={`/share-group/${initialGroupName}/${groupCode}`}
          iconSize={3.5}
          translateY={0.3}
        />
      </span>
    </div>
  );
};

export default UserActionsBar;
