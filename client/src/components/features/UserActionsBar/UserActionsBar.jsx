// React and Third-Party Libraries
import React from "react";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoHelpCircleOutline } from "react-icons/io5";
import { IoEnterOutline } from "react-icons/io5";

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
          iconSize={2.1}
          translateY={0.2}
        />
      </span>
      <span className={styles.icon}>
        {/* Icon navigating to tutorial page */}
        <ReactIconNavigate
          icon={IoHelpCircleOutline}
          tooltip='Tutorial'
          route={`/tutorial/${groupName}/${groupCode}`}
        />
      </span>
      <span className={styles.icon}>
        {/* Icon navigating to leave group page */}
        <ReactIconNavigate
          icon={IoEnterOutline}
          tooltip='Leave group'
          route={`/leave-group/${groupName}/${groupCode}`}
        />
      </span>
    </div>
  );
};

export default UserActionsBar;
