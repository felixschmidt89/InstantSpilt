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
 * @param {string} props.groupName - The name of the group.
 * @returns {JSX.Element} React component. */
const UserActionsBar = ({ groupCode, groupName }) => {
  return (
    <div className={styles.container}>
      <span className={styles.icon}>
        {/* Icon navigating to share group page */}
        <ReactIconNavigate
          icon={IoPersonAddOutline}
          tooltip='Invite & share group'
          route={`/share-group/${groupName}/${groupCode}`}
          iconSize={3.5}
          translateY={0.3}
          marginRight={0.3}
        />
      </span>
      <span className={styles.icon}>
        {/* Icon navigating to switch group page */}
        <ReactIconNavigate
          icon={PiUserSwitchLight}
          tooltip='Switch group'
          route={`/manage-groups`}
          iconSize={4.2}
          marginRight={0.3}
        />
      </span>
      <span className={styles.icon}>
        {/* Icon navigating to tutorial page */}
        <ReactIconNavigate
          icon={IoHelpCircleOutline}
          tooltip='Tutorial'
          route={`/tutorial/${groupName}/${groupCode}`}
          marginRight={0.3}
          iconSize={4.2}
        />
      </span>
      <span className={styles.icon}>
        {/* Icon navigating to contact developer page */}
        <ReactIconNavigate
          icon={BiMessageError}
          tooltip='Contact'
          route={`/contact/${groupCode}`}
          iconSize={3.9}
          translateY={0.2}
        />
      </span>

      <span className={styles.icon}>
        {/* Icon navigating to leave group page */}
        <ReactIconNavigate
          icon={IoEnterOutline}
          tooltip='Leave group'
          route={`/leave-group/${groupName}/${groupCode}`}
          iconSize={4}
        />
      </span>
      <span className={styles.icon}></span>
    </div>
  );
};

export default UserActionsBar;
